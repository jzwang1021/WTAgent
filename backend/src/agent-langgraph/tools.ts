import { tool } from '@langchain/core/tools';
import { z } from 'zod';

/**
 * Engineering tool definitions for the WTAgent.
 * These are callable by the LLM during ReAct cycles.
 */

// ===== Tower Geometry Tools =====

export const calculateTaperRatio = tool(
  (input: { baseDiameter: number; topDiameter: number }) => {
    const ratio = input.baseDiameter / input.topDiameter;
    return JSON.stringify({
      taperRatio: ratio,
      description: `Taper ratio = D_base/D_top = ${ratio.toFixed(2)}`,
    });
  },
  {
    name: 'calculate_taper_ratio',
    description: 'Calculate the taper ratio of a conical tower section (base diameter / top diameter).',
    schema: z.object({
      baseDiameter: z.number().describe('Base diameter in m'),
      topDiameter: z.number().describe('Top diameter in m'),
    }),
  },
);

export const estimateTowerMass = tool(
  (input: {
    height: number; baseDiameter: number; topDiameter: number;
    thickness: number; density: number;
  }) => {
    const avgDiameter = (input.baseDiameter + input.topDiameter) / 2;
    const crossSection = Math.PI * avgDiameter * input.thickness;
    const volume = crossSection * input.height;
    const mass = volume * input.density;
    return JSON.stringify({ massKg: mass, massTonnes: mass / 1000 });
  },
  {
    name: 'estimate_tower_mass',
    description: 'Estimate tower mass given geometry and steel density (kg/m³).',
    schema: z.object({
      height: z.number().describe('Segment height in m'),
      baseDiameter: z.number().describe('Bottom diameter in m'),
      topDiameter: z.number().describe('Top diameter in m'),
      thickness: z.number().describe('Wall thickness in m'),
      density: z.number().describe('Steel density in kg/m³ (default 7850)'),
    }),
  },
);

export const estimateFirstFrequency = tool(
  (input: { height: number; baseDiameter: number; massTopHead: number; towerMass: number }) => {
    // Simplified beam model for quick frequency estimation
    // f1 ≈ (1/2π) * √(3EI/(H³*(M_tower/3 + M_top)))
    const E = 2.1e11; // Pa, steel modulus
    const I = Math.PI * Math.pow(input.baseDiameter / 2, 3) * 0.02; // rough inertia
    const effectiveMass = input.towerMass / 3 + input.massTopHead;
    const stiffness = (3 * E * I) / Math.pow(input.height, 3);
    const omega = Math.sqrt(stiffness / effectiveMass);
    const freq = omega / (2 * Math.PI);

    return JSON.stringify({
      frequencyHz: Math.round(freq * 100) / 100,
      description: `Estimated 1st bending frequency = ${freq.toFixed(3)} Hz (simplified beam model)`,
    });
  },
  {
    name: 'estimate_first_frequency',
    description: 'Quick estimation of tower first natural frequency using simplified beam model.',
    schema: z.object({
      height: z.number().describe('Total tower height in m'),
      baseDiameter: z.number().describe('Base diameter in m'),
      massTopHead: z.number().describe('Rotor + nacelle mass in kg'),
      towerMass: z.number().describe('Tower mass in kg'),
    }),
  },
);

export const checkFrequencyAvoidance = tool(
  (input: { towerFreq: number; rotorRPM: number }) => {
    const freq1P = input.rotorRPM / 60;
    const freq3P = freq1P * 3;
    const margin1P = ((input.towerFreq - freq1P) / freq1P) * 100;
    const margin3P = ((freq3P - input.towerFreq) / freq3P) * 100;
    const softStiff = input.towerFreq > freq1P * 1.1 && input.towerFreq < freq3P * 0.9;
    const stiffStiff = input.towerFreq > freq3P * 1.1;

    let status: 'pass' | 'fail';
    let description: string;

    if (softStiff) {
      status = 'pass';
      description = `Soft-Stiff design: f_tower=${input.towerFreq.toFixed(3)}Hz ` +
        `(1P=${freq1P.toFixed(3)}Hz, +${margin1P.toFixed(0)}%; 3P=${freq3P.toFixed(3)}Hz, -${margin3P.toFixed(0)}%)`;
    } else if (stiffStiff) {
      status = 'pass';
      description = `Stiff-Stiff design: f_tower=${input.towerFreq.toFixed(3)}Hz > 3P=${freq3P.toFixed(3)}Hz`;
    } else {
      status = 'fail';
      description = `Frequency conflict: f_tower=${input.towerFreq.toFixed(3)}Hz ` +
        `falls in 1P-3P exclusion zone (1P=${freq1P.toFixed(3)}Hz ~ 3P=${freq3P.toFixed(3)}Hz)`;
    }

    return JSON.stringify({
      status,
      freq1P: Math.round(freq1P * 1000) / 1000,
      freq3P: Math.round(freq3P * 1000) / 1000,
      margin1P: Math.round(margin1P * 10) / 10,
      margin3P: Math.round(margin3P * 10) / 10,
      strategy: softStiff ? 'soft-stiff' : (stiffStiff ? 'stiff-stiff' : 'conflict'),
      description,
    });
  },
  {
    name: 'check_frequency_avoidance',
    description: 'Check if tower frequency avoids 1P (rotor) and 3P (blade) excitation bands.',
    schema: z.object({
      towerFreq: z.number().describe('Tower first natural frequency in Hz'),
      rotorRPM: z.number().describe('Rotor rotational speed in RPM'),
    }),
  },
);

export const estimateThrustForce = tool(
  (input: { rotorDiameter: number; windSpeed: number; airDensity?: number }) => {
    const rho = input.airDensity ?? 1.225; // kg/m³
    const area = Math.PI * Math.pow(input.rotorDiameter / 2, 2);
    const Ct = 0.8; // typical thrust coefficient
    const thrust = 0.5 * rho * area * Math.pow(input.windSpeed, 2) * Ct;
    return JSON.stringify({ thrustN: thrust, thrustKN: Math.round(thrust / 1000 * 100) / 100 });
  },
  {
    name: 'estimate_thrust_force',
    description: 'Estimate aerodynamic thrust force on rotor at given wind speed.',
    schema: z.object({
      rotorDiameter: z.number().describe('Rotor diameter in m'),
      windSpeed: z.number().describe('Reference wind speed in m/s'),
      airDensity: z.number().optional().describe('Air density in kg/m³ (default 1.225)'),
    }),
  },
);

// Export all tools for registration
export const engineeringTools = [
  calculateTaperRatio,
  estimateTowerMass,
  estimateFirstFrequency,
  checkFrequencyAvoidance,
  estimateThrustForce,
];
