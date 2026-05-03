61400-1  IEC:2005 
− 23 − 
The wind conditions include a constant mean flow combined, in many cases, with either a 
varying deterministic gust profile or with turbulence. In all cases, the influence of an inclination 
of the mean flow with respect to a horizontal plane of up to 8º shall be considered. This flow 
inclination angle shall be assumed to be invariant with height. 
The expression "turbulence" denotes random variations in the wind velocity from 10 min. 
averages. The turbulence model, when used, shall include the effects of varying wind speed, 
shears and direction and allow rotational sampling through varying shears. The three vector 
components of the turbulent wind velocity are defined as:  
– 
longitudinal – along the direction of the mean wind velocity;  
– 
lateral – horizontal and normal to the longitudinal direction, and  
– 
upward – normal to both the longitudinal and lateral directions, i.e. tilted from the vertical by 
the mean flow inclination angle.  
For the standard wind turbine classes, the random wind velocity field for the turbulence models 
shall satisfy the following requirements:  
a) the turbulence standard deviation, σ1, with values given in the following subclauses, shall 
be assumed to be invariant with height. The components normal to the mean wind direction 
shall have the following minimum standard deviations3: 
– 
lateral component – 
1
2
7,0 σ
σ ≥
– 
upward component – 
1
3
5,0 σ
σ ≥
b) the longitudinal turbulence scale parameter, Λ1, at hub height z shall be given by 
1
0,7
60
42
60
z
z
m
m
z
m
≤

Λ = 
≥

(5) 
The power spectral densities of the three orthogonal components, S1(f), S2(f), and S3(f) shall 
asymptotically approach the following forms as the frequency in the inertial sub-range 
increases: 
( )
,
(
/
)
S
f
V
f
σ
−
−
=
Λ
5
23
3
2
1
1
1
hub
0 05
(6) 
4
2
3
1
3
( )
( )
( )
S
f
S
f
S
f
=
=
(7) 
c) a recognized model for the coherence, defined as the magnitude of the co-spectrum divided 
by the auto-spectrum for the longitudinal velocity components at spatially separated points 
in a plane normal to the longitudinal direction, shall be used. 
The recommended turbulence model that satisfies these requirements is the Mann uniform 
shear turbulence model in Annex B. Another frequently used model that satisfy these 
requirements is also given in Annex B. Other models should be used with caution, as the 
choice may affect the loads significantly. 
___________ 
3  The actual values may depend on the choice of turbulence model and the requirements in b). 
Page 25
– 24 – 
61400-1  IEC:2005 
6.3.1 
Normal wind conditions 
6.3.1.1 
Wind speed distribution  
The wind speed distribution is significant for wind turbine design because it determines the 
frequency of occurrence of individual load conditions for the normal design situations. The 
mean value of the wind speed over a time period of 10 min shall be assumed to follow a 
Rayleigh distribution at hub height given by 
(
)
(
)
exp
/
P V
V
V
π


= −
−


2
R
hub
hub
ave
1
2
(8)  
where, in the standard wind turbine classes, Vave shall be chosen as 
,
V
V
=
ave
ref
0 2
(9) 
6.3.1.2 
The normal wind profile model (NWP) 
The wind profile, V(z), denotes the average wind speed as a function of height, z, above the 
ground. In the case of the standard wind turbine classes, the normal wind speed profile shall 
be given by the power law: 
(
)α
z
z/
V 
=
V(z)
hub
hub
(10) 
The power law exponent, α, shall be assumed to be 0,2. 
The assumed wind profile is used to define the average vertical wind shear across the rotor 
swept area. 
6.3.1.3 
Normal turbulence model (NTM) 
For the normal turbulence model, the representative value of the turbulence standard deviation, 
1
σ , shall be given by the 90 % quantile4 for the given hub height wind speed. This value for the 
standard wind turbine classes shall be given by 
(
)
s
m/
6,5
;
75
,0
hub
ref
1
=
+
=
b
b
V
I
σ
(11) 
Values for the turbulence standard deviation σ1 and the turbulence intensity 
hub
1 V
σ
are shown 
in Figures 1a and 1b.  
Values for Iref are given in Table 1.  
___________ 
4  Note, if other quantiles are desired for additional optional load calculations, they may be approximated for the 
standard classes by assuming a log-normal distribution and 
(
)
(
)
(
)
,
;
,
,
E
V
I
V
c
c
Var
V
I
σ
σ
=
+
=
=
1
hub
ref
hub
2
1
hub
ref
0 75
3 8 m/s
1 4 m/s
Page 26
61400-1  IEC:2005 
− 25 − 
0 
1 
2 
3 
4 
5 
0 
5 
10
15
20 
25
30 
Vhub   m/s
σ1   m/s 
Class A
Class B
Class C
IEC   1246/05 
Figure 1a –Turbulence standard deviation for the normal turbulence model (NTM)  
0 
0,1 
0,2 
0,3 
0,4 
0,5 
0 
5
10
15 
20
25 
30 
Vhub   m/s
Turbulence 
intensity 
Class A 
Class B 
Class C 
IEC   1247/05 
Figure 1b – Turbulence intensity for the normal turbulence model (NTM) 
Figure 1 – Normal turbulence model (NTM) 
6.3.2 
Extreme wind conditions 
The extreme wind conditions include wind shear events, as well as peak wind speeds due to 
storms and rapid changes in wind speed and direction.  
6.3.2.1 
Extreme wind speed model (EWM) 
The EWM shall be either a steady or a turbulent wind model. The wind models shall be based 
on the reference wind speed, Vref, and a fixed turbulence standard deviation, σ1. 
For the steady extreme wind model, the extreme wind speed, Ve50, with a recurrence period of 
50 years, and the extreme wind speed, Ve1, with a recurrence period of 1 year, shall be 
computed as a function of height, z, using the following equations: 
,
( )
,
z
V
z
V
z


=




0 11
e50
ref
hub
1 4
(12) 
Page 27
– 26 – 
61400-1  IEC:2005 
and 
( )
,
( )
V
z
V
z
=
e1
e50
0 8
(13) 
In the steady extreme wind model, allowance for short-term deviations from the mean wind 
direction shall be made by assuming constant yaw misalignment in the range of ±15º. 
For the turbulent extreme wind speed model, the 10 min average wind speeds as functions of z 
with recurrence periods of 50 years and 1 year, respectively, shall be given by 
,
( )
(
)
z
V
z
V
z
=
0 11
50
ref
hub
(14) 
( )
,
( )
V z
V
z
=
1
50
0 8
(15) 
The longitudinal turbulence standard deviation5 shall be: 
hub
1
11
,0
V
=
σ
(16) 
6.3.2.2 
Extreme operating gust (EOG) 
The hub height gust magnitude Vgust6 shall be given for the standard wind turbine classes by 
the following relationship: 
,
(
);
,
, (
)
D
V
V
V
σ
Λ






=
−






+






1
1
gust
e1
hub
Min
1 35
3 3 1 0 1
(17) 
where 
1
σ  is given in equation (11); 
Λ1  is the turbulence scale parameter, according to equation (5); 
D  is the rotor diameter. 
The wind speed shall be defined by the equation: 
(
)
( )
,
sin(
/ )
cos(
/
)
( , )
( )
V z
V
t T
t T
t
T
V z t
V z
π
π
−
−
≤≤

= 

gust
0 37
3
1
2
for 0
otherwise
(18) 
where 
V(z) is defined in equation (10) 
T = 10,5 s. 
An example of the extreme operating gust (Vhub = 25 m/s, Class IA, D = 42 m) is shown in 
Figure 2: 
___________ 
5  The turbulence standard deviation for the turbulent extreme wind model is not related to the normal (NTM) or 
the extreme turbulence model (ETM). The steady extreme wind model is related to the turbulent extreme wind 
model by a peak factor of approximately 3,5. 
6  The gust magnitude was calibrated to together with the probability of an operation event such as starts and 
stops to give a recurrence period of 50 years. 
Page 28
61400-1  IEC:2005 
− 27 − 
20 
22 
24 
26 
28 
30 
32 
34 
36 
0 
2
4
6
8
10 
Time t   s 
EOG Wind speed in hub height 
IEC   1248/05  
Figure 2 – Example of extreme operating gust  
6.3.2.3 
Extreme turbulence model (ETM)  
The extreme turbulence model shall use the normal wind profile model in 6.3.1.2 and 
turbulence with longitudinal component standard deviation given by 
,
;
.
V
V
c I
c
c
c
σ





=
+
−
+
=










ave
hub
1
ref 0 072
3
4
10
2 m/s  
(19) 
6.3.2.4 
Extreme direction change (EDC) 
The extreme direction change magnitude, θe, shall be calculated using the following 
relationship: 
arctan
,
D
V
σ
θ






= ±








+








Λ






1
e
hub
1
4
1 0 1
(20) 
where 
1
σ  is given by equation (11) for the NTM; 
θe  is limited to the interval ±180°; 
Λ1  is the turbulence scale parameter, according to equation (5); and 
D  is the rotor diameter. 
The extreme direction change transient, θ(t), shall be given by 
( )
,
(
cos(
/
))
t
t
t T
t
T
t
T
θ
θ
π
θ

<

= ±
−
≤≤


>

o
e
e
0
for
0
0 5
1
for 0
for
(21) 
where T = 6 s is the duration of the extreme direction change. The sign shall be chosen so that 
the worst transient loading occurs. At the end of the direction change transient, the direction is 
assumed to remain unchanged. The wind speed shall follow the normal wind profile model in 
6.3.1.2. 
Page 29
– 28 – 
61400-1  IEC:2005 
As an example, the magnitude of the extreme direction change with turbulence category A, 
D = 42 m, zhub = 30 m is shown in Figure 3 for varying Vhub. The corresponding transient for 
Vhub = 25 m/s is shown in Figure 4. 
–200 
–100 
0 
100 
200 
0 
10 
20
30 
40 
Wind speed Vhub   m/s 
EDC change θe   deg. 
IEC   1249/05  
0
10
20
30 
40
–5
0
5 
10
Time t   s  
EDC Wind direction 
change 
θ(t)   deg. 
IEC   1250/05
Figure 3 – Example of extreme direction 
change magnitude  
Figure 4 – Example of extreme direction 
change  
6.3.2.5 
Extreme coherent gust with direction change (ECD) 
The extreme coherent gust with direction change shall have a magnitude of 
Vcg = 15 m/s 
(22) 
The wind speed shall be defined by 
(
)
( )
( , )
( )
,
cos(
/
)
( )
V z
t
V z t
V z
V
t T
t
T
V z
V
t
T
π

≤

=
+
−
≤
≤


+
≥

cg
cg
for
0
0 5
1
for
0
for
(23) 
where T = 10 s is the rise time and the wind speed V(z) is given by the normal wind profile 
model in 6.3.1.2. The rise in wind speed during the extreme coherent gust is illustrated in 
Figure 5 for Vhub = 25 m/s. 
Page 30
61400-1  IEC:2005 
− 29 − 
0 
10 
20 
30 
40 
50 
–2 
0 
2 
4
6
8
10
12 
14 
Time t   s 
Wind speed V(z, t)   m/s 
IEC   1251/05 
Figure 5 – Example of extreme coherent gust amplitude for ECD  
The rise in wind speed shall be assumed to occur simultaneously with the direction change θ 
from 0º up to and including θcg, where the magnitudeθcg is defined by 
(
)
V
V
V
V
V
θ

<

= 
<
<

o
o
hub
cg
hub
hub
ref
hub
180
for
4m/s
720 m/s
for 4m/s
(24) 
The simultaneous direction change is then given by 
(
)
( )
,
cos(
/
)
t
t
t T
t
T
t
T
θ
θ
π
θ

<

= ±
−
≤≤


±
>

o
cg
cg
0
for
0
0 5
1
for
0
for
(25) 
where T = 10 s is the rise time.  
The direction change magnitude, θcg, and the direction change ( )t
θ
are shown in Figures 6 and 
7, as a function of Vhub and as a function of time for Vhub = 25 m/s, respectively.  
Page 31
– 30 – 
61400-1  IEC:2005 
0 
50 
100 
150 
200 
0 
10 
20 
30 
40 
Wind speed Vhub   m/s  
Direction change θcg   deg. 
IEC   1252/05 
0
5
10
15
20
25
30
22
0
2
4
6 
8 
10 
12
Time t   m/s  
Direction change   
d
IEC   1253/05  
Figure 6 – Direction change for ECD 
Figure 7 – Example of direction change 
transient  
6.3.2.6 
Extreme wind shear (EWS) 
The extreme wind shear shall be accounted for using the following wind speed transients. 
Transient (positive and negative) vertical shear:  
(
)
(
)
,
,
cos
/
( , )
z
z
z
D
V
t T
t
T
z
D
V z t
z
V
z
α
α
βσ
π







−





±
+
−
≤≤









Λ









= 










14
hub
hub
1
hub
1
hub
hub
2 5 0 2
1
2
for 0
otherwise
(26) 
Transient horizontal shear: 
(
)
(
)
,
,
cos
/
( , , )
z
y
D
V
t T
t
T
z
D
V y z t
z
V
z
α
α
βσ
π












±
+
−
≤≤









Λ









= 










14
hub
1
hub
1
hub
hub
2 5
0 2
1
2
for 0
otherwise
(27) 
where for both vertical and horizontal shear: 
α = 0,2; β = 6,4; T = 12 s; 
1
σ  is given by equation (11) for the NTM; 
Λ1 is the turbulence scale parameter, according to (5); and 
D is the rotor diameter. 
The sign for the horizontal wind shear transient shall be chosen so that the worst transient 
loading occurs. The two extreme wind shears are not applied simultaneously. 
Page 32
61400-1  IEC:2005 
− 31 − 
0,0 
0,5 
1,0 
1,5 
2,0 
0 
10 
20 
30
40
Wind speed V(z, t)   m/s  
z/zhub 
for t = 0, 
 positive for t = T/2 
 negative for t = T/2
IEC   1254/05 
0
10
20
30
40
–2 0
2
4
6
8 10 12 14 
Time t   m/s  
Wind speed V(z, t)  
Rotor top 
Rotor bottom 
IEC   1255/05 
Figure 8 – Examples of extreme positive and 
negative vertical wind shear, wind profile 
before onset (t = 0, dashed line) and at 
maximum shear (t = 6 s, full line). 
Figure 9 – Example of wind speeds at 
rotor top and bottom, respectively, 
illustrate the transient positive wind 
shear  
As an example, the extreme vertical wind shear (turbulence category A, zhub = 30 m, 
Vhub = 25 m/s, D = 42 m) is illustrated in Figure 8, which shows the wind profiles before onset 
of the extreme event (t = 0 s) and at maximum shear (t = 6 s). Figure 9 shows the wind speeds 
at the top and the bottom of the rotor, to illustrate the time development of the shear 
(assumptions as in Figure 8). 
6.4 
Other environmental conditions 
Environmental (climatic) conditions other than wind can affect the integrity and safety of wind 
turbines, by thermal, photochemical, corrosive, mechanical, electrical or other physical action. 
Moreover, combinations of climatic conditions may increase their effects.  
The following other environmental conditions, at least, shall be taken into account and the 
resulting action stated in the design documentation: 
• 
temperature; 
• 
humidity; 
• 
air density; 
• 
solar radiation; 
• 
rain, hail, snow and ice; 
• 
chemically active substances; 
• 
mechanically active particles; 
• 
salinity; 
• 
lightning; 
• 
earthquakes. 
An offshore environment requires additional consideration. 
Page 33
– 32 – 
61400-1  IEC:2005 
The climatic conditions taken into account shall be defined in terms of either representative 
values or limits of the variable conditions. The probability of simultaneous occurrence of 
climatic conditions shall be taken into account when the design values are selected. 
Variations in climatic conditions within the normal limits corresponding to a 1-year recurrence 
period shall not interfere with the designed normal operation of a wind turbine.  
Unless correlation exists, other extreme environmental conditions according to 6.4.2 shall be 
combined with normal wind conditions according to 6.3.1. 
6.4.1 
Normal other environmental conditions 
The normal other environmental condition values that shall be taken into account, are:  
• 
ambient temperature range of –10 °C to +40 °C; 
• 
relative humidity up to 95 %; 
• 
atmospheric content equivalent to that of a non-polluted inland atmosphere (see 
IEC 60721-2-1); 
• 
solar radiation intensity of 1 000 W/m2; 
• 
air density of 1,225 kg/m3. 
When additional external conditions are specified by the designer, the parameters and their 
values shall be stated in the design documentation and shall conform to the requirements of 
IEC 60721-2-1. 
6.4.2 
Extreme other environmental conditions 
The extreme other environmental conditions that shall be considered for wind turbine design 
are temperature, lightning, ice and earthquakes (see 11.6 for assessment of earthquake 
conditions).  
6.4.2.1 
Temperature  
The extreme temperature range for the standard wind turbine classes shall be at least –20 °C 
to +50 °C. 
6.4.2.2 
Lightning 
The provisions of lightning protection required in 10.6, may be considered as adequate for 
turbine designs for the standard wind turbine classes. 
6.4.2.3 
Ice 
No minimum ice requirements are given for the standard wind turbine classes. 
6.4.2.4 
Earthquakes 
No minimum earthquake requirements are given for the standard wind turbine classes. For 
consideration of earthquake conditions and effects see 11.6 and Annex C. 
6.5 
Electrical power network conditions 
The normal conditions at the wind turbine terminals to be considered are listed below.  
Page 34
61400-1  IEC:2005 
− 33 − 
Normal electrical power network conditions apply when the following parameters fall within the 
ranges stated below.  
• 
Voltage – nominal value (according to IEC 60038) ± 10 %. 
• 
Frequency – nominal value ± 2 %. 
• 
Voltage imbalance – the ratio of the negative-sequence component of voltage not 
exceeding 2 %. 
• 
Auto-reclosing cycles – auto-reclosing cycle periods of 0,1 to 5 s for the first reclosure and 
10 s to 90 s for a second reclosure shall be considered. 
• 
Outages – electrical network outages shall be assumed to occur 20 times per year. An 
outage of up to 6 h7 shall be considered a normal condition. An outage of up to 1 week 
shall be considered an extreme condition. 
7 
Structural design 
7.1 
General 
The integrity of the load-carrying components of the wind turbine structure shall be verified and 
an acceptable safety level shall be ascertained. The ultimate and fatigue strength of structural 
members shall be verified by calculations and/or tests to demonstrate the structural integrity of 
a wind turbine with the appropriate safety level. 
The structural analysis shall be based on ISO 2394. 
Calculations shall be performed using appropriate methods. Descriptions of the calculation 
methods shall be provided in the design documentation. The descriptions shall include 
evidence of the validity of the calculation methods or references to suitable verification studies. 
The load level in any test for strength verification shall correspond with the safety factors 
appropriate for the characteristic loads according to 7.6.  
7.2 
Design methodology 
It shall be verified that limit states are not exceeded for the wind turbine design. Model testing 
and prototype tests may also be used as a substitute for calculation to verify the structural 
design, as specified in ISO 2394. 
7.3 
Loads 
Loads described in 7.3.1 through 7.3.4, shall be considered for the design calculations. 
7.3.1 
Gravitational and inertial loads 
Gravitational and inertial loads are static and dynamic loads that result from gravity, vibration, 
rotation and seismic activity. 
7.3.2 
Aerodynamic loads 
Aerodynamic loads are static and dynamic loads that are caused by the airflow and its 
interaction with the stationary and moving parts of wind turbines. 
The airflow is dependent upon the average wind speed and turbulence across the rotor plane, 
the rotational speed of the rotor, the density of the air, and the aerodynamic shapes of the wind 
turbine components and their interactive effects, including aero elastic effects. 
___________ 
7  Six hours of operation is assumed to correspond to the duration of the severest part of a storm. 
Page 35
– 34 – 
61400-1  IEC:2005 
7.3.3 
Actuation loads 
Actuation loads result from the operation and control of wind turbines. They are in several 
categories including torque control from a generator/inverter, yaw and pitch actuator loads and 
mechanical braking loads. In each case, it is important in the calculation of response and 
loading to consider the range of actuator forces available. In particular, for mechanical brakes, 
the range of friction, spring force or pressure as influenced by temperature and ageing shall be 
taken into account in checking the response and the loading during any braking event. 
7.3.4 
Other loads 
Other loads such as wake loads, impact loads, ice loads, etc. may occur and shall be included 
where appropriate, see 11.4. 
7.4 
Design situations and load cases 
This subclause describes the design load cases for a wind turbine and specifies a minimum 
number to be considered.  
For design purposes, the life of a wind turbine can be represented by a set of design situations 
covering the most significant conditions that the wind turbine may experience. 
The load cases shall be determined from the combination of operational modes or other design 
situations, such as specific assembly, erection or maintenance conditions, with the external 
conditions. All relevant load cases with a reasonable probability of occurrence shall be 
considered, together with the behaviour of the control and protection system. The design load 
cases used to verify the structural integrity of a wind turbine shall be calculated by combining: 
• 
normal design situations and appropriate normal or extreme external conditions; 
• 
fault design situations and appropriate external conditions; 
• 
transportation, installation and maintenance design situations and appropriate external 
conditions. 
If correlation exists between an extreme external condition and a fault situation, a realistic 
combination of the two shall be considered as a design load case. 
Within each design situation several design load cases shall be considered. As a minimum the 
design load cases in Table 2 shall be considered. In that table, the design load cases are 
specified for each design situation by the description of the wind, electrical and other external 
conditions.  
If the wind turbine controller could, during design load cases with a deterministic wind model, 
cause the wind turbine to shutdown prior to reaching maximum yaw angle and/or wind speed, 
then it must be shown that the turbine can reliably shutdown under turbulent conditions with the 
same deterministic wind condition change. 
Other design load cases shall be considered, if relevant to the structural integrity of the specific 
wind turbine design. 
For each design load case, the appropriate type of analysis is stated by “F” and “U” in Table 2. 
“F” refers to analysis of fatigue loads, to be used in the assessment of fatigue strength. “U” 
refers to the analysis of ultimate loads, with reference to material strength, blade tip deflection 
and structural stability.  
The design load cases indicated with “U”, are classified as normal (N), abnormal (A), or 
transport and erection (T). Normal design load cases are expected to occur frequently within 
the lifetime of a turbine. The turbine is in a normal state or may have experienced minor faults 
or abnormalities. Abnormal design situations are less likely to occur. They usually correspond 
to design situations with severe faults that result in the activation of system protection 
functions. The type of design situation, N, A, or T, determines the partial safety factor γf to be 
applied to the ultimate loads. These factors are given in Table 3. 
Page 36
61400-1  IEC:2005 
− 35 − 
Table 2 – Design load cases 
Design situation 
DL
C 
Wind condition 
Other conditions 
Type of 
analysis 
Partial 
safety 
factors 
1.1 
NTM 
Vin < Vhub < Vout 
For extrapolation of 
extreme events 
U 
N 
1.2 
NTM 
Vin < Vhub < Vout 
F 
* 
1.3 
ETM 
Vin < Vhub < Vout 
U 
N 
1.4 
ECD 
Vhub = Vr – 2 m/s, Vr, 
Vr +2 m/s 
U 
N 
1) Power production 
1.5 
EWS Vin < Vhub < Vout 
U 
N 
2.1 
NTM 
Vin < Vhub < Vout 
Control system fault or 
loss of electrical network  
U 
N 
2.2 
NTM 
Vin < Vhub < Vout 
Protection system or 
preceding internal 
electrical fault 
U 
A 
2.3 
EOG 
Vhub = Vr±2 m/s and 
Vout 
External or internal 
electrical fault including 
loss of electrical network  
U 
A 
2) Power production 
plus occurrence of 
fault  
2.4 
NTM 
Vin < Vhub < Vout 
Control, protection, or 
electrical system faults 
including loss of 
electrical network  
F 
* 
3) Start up 
3.1 
NWP Vin < Vhub < Vout 
F 
* 
3.2 
EOG 
Vhub = Vin, Vr ± 2 m/s 
and Vout 
U 
N 
3.3 
EDC 
Vhub = Vin, Vr ± 2 m/s 
and Vout 
U 
N 
4) Normal shut down 
4.1 
NWP Vin < Vhub < Vout 
F 
* 
4.2 
EOG 
Vhub = Vr ± 2 m/s and 
Vout 
U 
N 
5) Emergency shut 
down 
5.1 
NTM 
Vhub = Vr ± 2 m/s and 
Vout 
U 
N 
6) Parked (standing 
still or idling) 
6.1 
EWM 50-year recurrence 
period 
U 
N 
6.2 
EWM 50-year recurrence 
period 
Loss of electrical 
network connection 
U 
A 
6.3 
EWM 1-year recurrence 
period 
Extreme yaw 
misalignment 
U 
N 
6.4 
NTM Vhub < 0,7 Vref 
F 
* 
7) Parked and fault 
conditions 
7.1 
EWM 1-year recurrence 
period 
U 
A 
8) Transport, 
assembly, 
maintenance and 
repair 
8.1 
NTM 
Vmaint to be stated by 
the manufacturer 
U 
T 
8.2 
EWM 1-year recurrence 
period 
U 
A 
Page 37
– 36 – 
61400-1  IEC:2005 
The following abbreviations are used in Table 2: 
DLC 
Design load case 
ECD 
Extreme coherent gust with direction change (see 6.3.2.5) 
EDC 
Extreme direction change (see 6.3.2.4) 
EOG 
Extreme operating gust (see 6.3.2.2) 
EWM 
Extreme wind speed model (see 6.3.2.1) 
EWS 
Extreme wind shear (see 6.3.2.6)  
NTM 
Normal turbulence model (see 6.3.1.3) 
ETM 
Extreme turbulence model (see 6.3.2.3) 
NWP 
Normal wind profile model (see 6.3.1.2) 
Vr±2 m/s 
Sensitivity to all wind speeds in the range shall be analysed 
F 
Fatigue (see 7.6.3) 
U 
Ultimate strength (see 7.6.2) 
N 
Normal  
A 
Abnormal 
T 
Transport and erection 
* 
Partial safety for fatigue (see 7.6.3) 
When a wind speed range is indicated in Table 2, wind speeds leading to the most adverse 
condition for wind turbine design shall be considered. The range of wind speeds may be 
represented by a set of discrete values, in which case the resolution shall be sufficient to 
assure accuracy of the calculation8. In the definition of the design load cases reference is 
made to the wind conditions described in Clause 6. 
7.4.1 
Power production (DLC 1.1 – 1.5) 
In this design situation, a wind turbine is running and connected to the electric load. The 
assumed wind turbine configuration shall take into account rotor imbalance. The maximum 
mass and aerodynamic imbalances (e.g. blade pitch and twist deviations) specified for rotor 
manufacture shall be used in the design calculations. 
In addition, deviations from theoretical optimum operating situations such as yaw misalignment 
and control system tracking errors shall be taken into account in the analyses of operational 
loads.  
Design load cases (DLC) 1.1 and 1.2 embody the requirements for loads resulting from 
atmospheric turbulence that occurs during normal operation of a wind turbine throughout its 
lifetime (NTM). DLC 1.3 embodies the requirements for ultimate loading resulting from extreme 
turbulence conditions. DLC 1.4 and 1.5 specify transient cases that have been selected as 
potentially critical events in the life of a wind turbine.  
The statistical analysis of DLC 1.1 simulation data shall include at least the calculation of 
extreme values of the blade root in-plane moment and out-of-plane moment and tip deflection. 
If the extreme design values of these parameters are exceeded by the extreme design values 
derived for DLC 1.3, the further analysis of DLC 1.1 may be omitted.  
If the extreme design values of these parameters are not exceeded by the extreme design 
values derived for DLC 1.3, the factor c in equation (19) for the extreme turbulence model used 
in DLC 1.3 may be increased until the extreme design values computed in DLC 1.3 are equal or 
exceed the extreme design values of these parameters computed in DLC 1.1.  
___________ 
8  In general a resolution of 2 m/s is considered sufficient. 
Page 38
61400-1  IEC:2005 
− 37 − 
7.4.2 
Power production plus occurrence of fault or loss of electrical network 
connection (DLC 2.1 – 2.4) 
This design situation involves a transient event triggered by a fault or the loss of electrical 
network connection while the turbine is producing power. Any fault in the control and protection 
system, or internal fault in the electrical system, significant for wind turbine loading (such as 
generator short circuit) shall be considered. For DLC 2.1 the occurrence of faults relating to 
control functions or loss of electrical network connection shall be considered as normal events. 
For DLC 2.2, rare events, including faults relating to the protection functions or internal 
electrical systems shall be considered as abnormal. For DLC 2.3 the potentially significant wind 
event, EOG, is combined with an internal or external electrical system fault (including loss of 
electrical network connection) and considered as an abnormal event. In this case, the timing of 
these two events shall be chosen to achieve the worst loading. If a fault or loss of electrical 
network connection does not cause an immediate shutdown and the subsequent loading can 
lead to significant fatigue damage, the likely duration of this situation along with the resulting 
fatigue damage in normal turbulence conditions (NTM) shall be evaluated in DLC 2.4.  
7.4.3 
Start up (DLC 3.1 – 3.3) 
This design situation includes all the events resulting in loads on a wind turbine during the 
transients from any standstill or idling situation to power production. The number of 
occurrences shall be estimated based on the control system behaviour. 
7.4.4 
Normal shut down (DLC 4.1 – 4.2) 
This design situation includes all the events resulting in loads on a wind turbine during normal 
transient situations from a power production situation to a standstill or idling condition. The 
number of occurrences shall be estimated based on the control system behaviour. 
7.4.5 
Emergency shut down (DLC 5.1) 
Loads arising from emergency shut down shall be considered. 
7.4.6 
Parked (standstill or idling) (DLC 6.1 – 6.4) 
In this design situation, the rotor of a parked wind turbine is either in a standstill or idling 
condition. In DLC 6.1, 6.2 and 6.3 this situation shall be considered with the extreme wind 
speed model (EWM). For DLC 6.4, the normal turbulence model (NTM) shall be considered. 
For design load cases, where the wind conditions are defined by EWM, either the steady 
extreme wind model or the turbulent extreme wind model may be used. If the turbulent extreme 
wind model is used, the response shall be estimated using either a full dynamic simulation or a 
quasi-steady analysis with appropriate corrections for gusts and dynamic response using the 
formulation in ISO 4354. If the steady extreme wind model is used, the effects of resonant 
response shall be estimated from the quasi-steady analysis above. If the ratio of resonant to 
background response (R/B) is less than 5 %, a static analysis using the steady extreme wind 
model may be used. If slippage in the wind turbine yaw system can occur at the characteristic 
load, the largest possible unfavourable slippage shall be added to the mean yaw misalignment. 
If the wind turbine has a yaw system where yaw movement is expected in the extreme wind 
situations (e.g. free yaw, passive yaw or semi-free yaw), the turbulent wind model shall be used 
and the yaw misalignment will be governed by the turbulent wind direction changes and the 
turbine yaw dynamic response. Also, if the wind turbine is subject to large yaw movements or 
change of equilibrium during a wind speed increase from normal operation to the extreme 
situation, this behaviour shall be included in the analysis. 
Page 39
– 38 – 
61400-1  IEC:2005 
In DLC 6.1, for a wind turbine with an active yaw system, a yaw misalignment of up to ± 15º 
using the steady extreme wind model or a mean yaw misalignment of ± 8º using the turbulent 
extreme wind model shall be imposed, provided restraint against slippage in the yaw system 
can be assured.  
In DLC 6.2 a loss of the electrical power network at an early stage in a storm containing the 
extreme wind situation, shall be assumed. Unless power back-up is provided for the control 
and yaw system with a capacity for yaw alignment for a period of at least 6 h , the effect of a 
wind direction change of up to ± 180º shall be analysed. 
In DLC 6.3, the extreme wind with a 1-year recurrence period shall be combined with an 
extreme yaw misalignment. An extreme yaw misalignment of up to ± 30º using the steady 
extreme wind model or a mean yaw misalignment of ± 20º using the turbulent wind model shall 
be assumed. 
In DLC 6.4, the expected number of hours of non-power production time at a fluctuating load 
appropriate for each wind speed where significant fatigue damage can occur to any 
components (e.g. from the weight of idling blades) shall be considered. 
7.4.7 
Parked plus fault conditions (DLC 7.1) 
Deviations from the normal behaviour of a parked wind turbine, resulting from faults on the 
electrical network or in the wind turbine, shall require analysis. If any fault other than a loss of 
electrical power network produces deviations from the normal behaviour of the wind turbine in 
parked situations, the possible consequences shall be the subject of analysis. The fault 
condition shall be combined with EWM for a recurrence period of one year. Those conditions 
shall be either turbulent or quasi-steady with correction for gusts and dynamic response. 
In case of a fault in the yaw system, yaw misalignment of ± 180º shall be considered. For any 
other fault, yaw misalignment shall be consistent with DLC 6.1. 
If slippage in the yaw system can occur at the characteristic load found in DLC 7.1, the largest 
unfavourable slippage possible shall be considered. 
7.4.8 
Transport, assembly, maintenance and repair (DLC 8.1 – 8.2) 
For DLC 8.1, the manufacturer shall state all the wind conditions and design situations 
assumed for transport, assembly on site, maintenance and repair of a wind turbine. The 
maximum stated wind conditions shall be considered in the design if they can produce 
significant loading on the turbine. The manufacturer shall allow sufficient margin between the 
stated conditions and the wind conditions considered in design to give an acceptable safety 
level. Sufficient margin may be obtained by adding 5 m/s to the stated wind condition. 
In addition, DLC 8.2 shall include all transport, assembly, maintenance and repair turbine 
states which may persist for longer than one week. This shall, when relevant, include a partially 
completed tower, the tower standing without the nacelle and the turbine without one or more 
blades. It may be assumed that all blades are installed simultaneously. It shall be assumed that 
the electrical network is not connected in any of these states. Measures may be taken to 
reduce the loads during any of these states as long as these measures do not require the 
electrical network connection.  
Blocking devices shall be able to sustain the loads arising from relevant situations in DLC 8.1. 
In particular, application of maximum design actuator forces shall be taken into account. 
Page 40
61400-1  IEC:2005 
− 39 − 
7.5 
Load calculations 
Loads as described in 7.3.1 through 7.3.4 shall be taken into account for each design load 
case. Where relevant, the following shall also be taken into account: 
• 
wind field perturbations due to the wind turbine itself (wake induced velocities, tower 
shadow, etc.); 
• 
the influence of three dimensional flow on the blade aerodynamic characteristics (e.g. three 
dimensional stall and aerodynamic tip loss); 
• 
unsteady aerodynamic effects; 
• 
structural dynamics and the coupling of vibration modes; 
• 
aero elastic effects; 
• 
the behaviour of the control and protection system of the wind turbine. 
Dynamic simulations utilizing a structural dynamics model are usually used to calculate wind 
turbine loads. Certain load cases have a turbulent wind input. The total period of load data, for 
these cases, shall be long enough to ensure statistical reliability of the estimate of the 
characteristic load. At least six 10-min stochastic realizations (or a continuous 60 min period) 
shall be required for each mean, hub-height wind speed used in the simulations. However, for 
DLC 2.1, 2.2 and 5.1 at least 12 simulations shall be carried out for each event at the given 
wind speed. Since the initial conditions used for the dynamic simulations typically have an 
effect on the load statistics during the beginning of the simulation period, the first 5 s of data 
(or longer if necessary) shall be eliminated from consideration in any analysis interval involving 
turbulent wind input. 
In many cases, the local strains or stresses for critical locations in a given wind turbine 
component are governed by simultaneous multi-axial loading. In this case, time series of 
orthogonal loads that are output from simulations are sometimes used to specify design loads. 
When such orthogonal component time series are used to calculate fatigue and ultimate loads, 
they shall be combined to preserve both phase and magnitude. Thus, the direct method is 
based on the derivation of the significant stress as a time history. Extreme and fatigue 
prediction methods can then be applied to this single signal, avoiding load combination issues. 
Ultimate load components may also be combined in a conservative manner assuming the 
extreme component values occur simultaneously. 
7.6 
Ultimate limit state analysis 
7.6.1 
Method 
Partial safety factors account for the uncertainties and variability in loads and materials, the 
uncertainties in the analysis methods and the importance of structural components with respect 
to the consequences of failure. 
7.6.1.1 
Partial safety factors for loads and materials 
To assure safe design values for the uncertainties and variability in loads and materials are 
taken into account by partial safety factors as defined in equations (28) and (29).  
F
F
γ
=
d
f
k  
(28) 
where 
Fd is the design value for the aggregated internal load or load response to multiple 
simultaneous load components from various sources for the given design load case; 
Page 41
– 40 – 
61400-1  IEC:2005 
γf  
is the partial safety factor for loads; and 
Fk  
is the characteristic value for the load.  
1
f
f
γ
=
d
k
m
(29) 
where 
fd are the design values for materials; 
γm are the partial safety factors for materials; and 
fk are the characteristic values of material properties. 
 The partial safety factors for loads used in this standard take account of 
• 
possible unfavourable deviations/uncertainties of the load from the characteristic value; 
• 
uncertainties in the loading model. 
The partial safety factors for materials used in this standard, as in ISO 2394, take account of 
• 
possible unfavourable deviations/uncertainties of the strength of material from the 
characteristic value; 
• 
possible inaccurate assessment of the resistance of sections or load-carrying capacity of 
parts of the structure; 
• 
uncertainties in the geometrical parameters; 
• 
uncertainties in the relation between the material properties in the structure and those 
measured by tests on control specimens; 
• 
uncertainties in conversion factors. 
These different uncertainties are sometimes accounted for by means of individual partial safety 
factors but in this standard as in most others, the load related factors are combined into one 
factor γf and the material related factors into one factor γm.  
7.6.1.2 
Partial safety factor for consequence of failure and component classes 
A consequence of failure factor, γn, is introduced to distinguish between: 
• 
Component class 1: used for "fail-safe" structural components whose failure does not result 
in the failure of a major part of a wind turbine, for example replaceable bearings with 
monitoring. 
• 
Component class 2: used for "non fail-safe" structural components whose failures may lead 
to the failure of a major part of a wind turbine. 
• 
Component class 3: used for “non fail-safe” mechanical components that link actuators and 
brakes to main structural components for the purpose of implementing non-redundant wind 
turbine protection functions described in 8.3. 
For the ultimate limit state analysis of the wind turbine, the following four types of analysis shall 
be performed where relevant: 
• 
analysis of ultimate strength (see 7.6.2); 
• 
analysis of fatigue failure (see 7.6.3);  
• 
stability analysis (buckling, etc.) (see 7.6.4); 
• 
critical deflection analysis (mechanical interference between blade and tower, etc.) (see 
7.6.5). 
Each type of analysis requires a different formulation of the limit state function and deals with 
different sources of uncertainties through the use of safety factors. 
Page 42
61400-1  IEC:2005 
− 41 − 
7.6.1.3 
Application of recognized material codes 
When determining the structural integrity of elements of a wind turbine, national or international 
design codes for the relevant material may be employed. Special care shall be taken when 
partial safety factors from national or international design codes are used together with partial 
safety factors from this standard. It shall be ensured that the resulting safety level is not less 
than the intended safety level in this standard. 
Different codes subdivide the partial safety factors for materials, γM, into several material 
factors accounting for separate types of uncertainty, for example inherent variability of material 
strength, extent of production control or production method. The material factors given in this 
standard correspond to the so-called "general partial safety factors for materials" accounting 
for the inherent variability of the strength parameters. If the code gives partial safety factors or 
uses reduction factors on the characteristic values to account for other uncertainties, these 
shall also be taken into account. 
Individual codes may choose different factorisations of partial safety factors on the load and 
the material parts of the design verification. The division of factors intended here is the one 
defined in ISO 2394. If the division of factors in the code of choice deviates from that of 
ISO 2394, the necessary adjustments in the code of choice shall be taken into account in 
verifications according to this standard. 
7.6.2 
Ultimate strength analysis 
The limit state function can be separated into load and resistance functions S and R so that the 
condition becomes 
(
)
(
)
S F
R f
γ ⋅
≤
n
d
d  
(30) 
The resistance R generally corresponds with the maximum allowable design values of material 
resistance, hence R(fd) = fd, whilst the function S for ultimate strength analysis is usually 
defined as the highest value of the structural response, hence S(Fd)=Fd. The equation then 
becomes 
F
f
γ
γ γ
≤
f
k
k
m
n
1
(31) 
For each wind turbine component assessed and for each load case in Table 2 where ultimate 
strength analysis is appropriate, the limit state condition in equation (31) shall be verified for 
the most critical limit state, identified on the basis of having the least margin.  
In load cases involving turbulent inflow where a range of wind speeds is given, the exceedance 
probability for the characteristic load shall be calculated considering the wind speed distribution 
given in 6.3.1.1. Because many load calculations will involve stochastic simulations of limited 
duration, the characteristic load determined for the required recurrence period may be larger 
than any of the values computed in the simulation. Guidance for the calculation of 
characteristic loads using turbulent inflow is given in Annex F. 
For DLC 1.1 the characteristic value of load shall be determined by a statistical load 
extrapolation and correspond to an exceedance probability, for the largest value in any 10-min 
period, of less than or equal to 3,8 × 10–7, (i.e. a 50-year recurrence period) for normal design 
situations. For guidance see Annex F.  
Page 43
– 42 – 
61400-1  IEC:2005 
For load cases with specified deterministic wind field events, the characteristic value of the 
load shall be the worst case computed transient value. When turbulent inflow is used, the mean 
value among the worst case computed loads for different 10-min stochastic realisations shall 
be taken, except for DLC 2.1, 2.2 and 5.1, where the characteristic value of the load shall be 
the mean value of the largest half of the maximum loads. 
7.6.2.1 
Partial safety factors for loads 
Partial safety factors for loads shall be at least the values specified in Table 3. 
Table 3 – Partial safety factors for loads γf 
Unfavourable loads 
Favourable9 loads 
Type of design situation (see Table 2) 
Normal (N) 
Abnormal (A) 
Transport and erection 
(T) 
All design situations 
1,35* 
1,1 
1,5 
0,9 
* For design load case DLC 1.1, given that loads are determined using statistical load extrapolation at prescribed 
wind speeds between Vin and Vout, the partial load factor for normal design situations shall be γf =1,25. 
If for normal design situations the characteristic value of the load response Fgravity due to gravity can be calculated 
for the design situation in question, and gravity is an unfavourable load, the partial load factor for combined loading 
from gravity and other sources may have the value 
,
,
,
;
;
F
F
F
F
F
F
γ
ϕς
ϕ
ς
=
+

= 

−
≤

= 

>

2
f
gravity
gravity
k
k
gravity
k
11
0 15
for DLC1.1
0 25
otherwise
1
1
Use of the partial safety factors for loads for normal and abnormal design situations specified 
in Table 3 requires that the load calculation model is validated by load measurements. These 
measurements shall be made on a wind turbine that is similar to the wind turbine design under 
consideration with respect to aerodynamics, control and dynamic response. 
7.6.2.2 
Partial safety factors for materials where recognized design codes are not 
available 
Partial safety factors for materials shall be determined in relation to the adequacy of the 
available material properties test data. The value of the general partial safety factor for 
materials, γm, and accounting for the inherent variability of the strength parameter shall be  
,
γ
≥
m
11 
(32) 
___________ 
9  Pretension and gravity loads that significantly relieve the total load response are considered favourable loads. In 
the case of both favourable and unfavourable loads, equation (30) becomes  
(
)
,
(
)
S
F
F
R f
γ
γ
γ
≤
n
f,unfav
k,unfav
f,fav
k,fav
d
Page 44
61400-1  IEC:2005 
− 43 − 
when applied to characteristic material properties of 95 % survival probability, p, with 95 % 
confidence limit10. This value applies to components with ductile behaviour11 whose failure may 
lead to the failure of a major part of a wind turbine, for example welded tubular tower, tower 
flange connection, welded machine frame or blade connections. Failure modes may comprise: 
• 
yielding of ductile materials; 
• 
bolt rupture in a bolt connection with sufficient number of bolts to provide 1/γm of the 
strength following the failing of a single bolt. 
For “non fail-safe” mechanical/structural components with non-ductile behaviour whose failures 
lead rapidly to the failure of a major part of a wind turbine, the general safety factor for 
materials shall be not less than:  
• 
1,2 for global buckling of curved shells such as tubular towers and blades, and 
• 
1,3 for rupture from exceeding tensile or compression strength. 
To derive the global partial safety factors for materials from this general factor it is necessary 
to account for scale effects, tolerances and degradation due to external actions, for example 
ultraviolet radiation or humidity and defects that would not normally be detected. 
Partial safety factors for consequences of failure: 
Component class 1: γn = 0,9 
Component class 2: γn = 1,0 
Component class 3: γn = 1,3 
7.6.2.3 
Partial safety factors for materials for where recognized design codes are 
available 
The combined partial safety factors for loads, materials and the consequences of failure, γf, γm, 
and γn, shall be not less than those specified in 7.6.2.1 and 7.6.2.2. 
7.6.3 
Fatigue failure 
Fatigue damage shall be estimated using an appropriate fatigue damage calculation. For 
example, in the case of Miner's rule, the limit state is reached when the accumulated damage 
exceeds 1. Thus, in this case, the accumulated damage over the design lifetime of a turbine 
shall be less than or equal to 1. Fatigue damage calculations shall consider the formulation, 
including effects of both cyclic range and mean strain (or stress) levels. All partial safety 
factors (load, material and consequences of failure) shall be applied to the cyclic strain (or 
stress) range for assessing the increment of damage associated with each fatigue cycle. An 
example formulation is given for Miner’s rule in Annex G. 
7.6.3.1 
Partial safety factor for loads 
The partial safety factor for loads, γf, shall be 1,0 for all normal and abnormal design situations. 
___________ 
10  The characteristic strength parameters should be selected as the 95 % fractile (determined with 95 % 
confidence) or the certificate value for materials with established routines for testing of representative samples. 
11 Ductile behaviour includes not only ductile materials but also components which behave like ductile materials 
due to, for example internal redundancy. 
Page 45
– 44 – 
61400-1  IEC:2005 
7.6.3.2 
Partial safety factors for materials where recognized codes are not available 
The partial safety factor for materials γm shall be at least 1,5 provided that the SN curve is 
based on 50 % survival probability and coefficient of variation <15 %. For components with 
large coefficient of variation for fatigue strength12, i.e. 15 % to 20 % (such as for many 
components made of composites, for example reinforced concrete or fibre composites), the 
partial safety factor γm must be increased accordingly and at least to 1,7. 
The fatigue strengths shall be derived from a statistically significant number of tests and the 
derivation of characteristic values shall account for scale effects, tolerances, degradation due 
to external actions, such as ultraviolet radiation, and defects that would not normally be 
detected. 
For welded and structural steel, traditionally the 97,7 % survival probability is used as basis for 
the SN curves. In this case γm may be taken as 1,1. In cases, where it is possible to detect 
critical crack development through introduction of a periodic inspection programme, a lower 
value of γm may be used. In all cases, γm shall be larger than 0,9. 
For fibre composites, the strength distribution shall be established from test data for the actual 
material. The 95 % survival probability with a confidence level of 95 % shall be used as a basis 
for the SN-curve. In that case γm may be taken as 1,2. The same approach may be used for 
other materials. 
Partial safety factors for consequences of failure: 
Component class 1: γn = 1,0 
Component class 2: γn = 1,15 
Component class 3: γn = 1,3. 
7.6.3.3 
Partial material factors where recognized design codes are available 
The combined partial safety factors for loads, materials and consequences of failure shall not 
be less than those specified in 7.6.3.1 and 7.6.3.2, with due consideration of the quantiles 
specified in the code. 
7.6.4 
Stability 
The load-carrying parts of “non fail-safe” components shall not buckle under the design load. 
For all other components, elastic buckling under the design load is acceptable. Buckling shall 
not occur in any component under the characteristic load. 
A minimum value for the partial safety factor for loads, γf, shall be chosen in accordance with 
7.6.2.1 to obtain the design value. The material partial safety factors shall be not less than 
those specified in 7.6.2.2. 
7.6.5 
Critical deflection analysis 
It shall be verified that no deflections affecting structural integrity occur in the design conditions 
detailed in Table 2. One of the most important considerations is to verify that no mechanical 
interference between blade and tower will occur. 
The maximum elastic deflection in the unfavourable direction shall be determined for the load 
cases detailed in Table 2 using the characteristic loads. The resulting deflection is then 
multiplied by the combined partial safety factor for loads, material and consequences of failure. 
___________ 
12  Fatigue strength is defined here as stress ranges associated with given numbers of cycles. 
Page 46
61400-1  IEC:2005 
− 45 − 
Partial safety factor for loads 
The values of γf shall be chosen from Table 3. 
Partial safety factor for the elastic properties of materials 
The value of γm shall be 1,1 except when the elastic properties have been determined by full-
scale testing in which case it may be reduced to 1,0. Particular attention shall be paid to 
geometrical uncertainties and the accuracy of the deflection calculation method. 
Partial safety factor for consequences of failure 
Component class 1: γn = 1,0 
Component class 2: γn = 1,0 
Component class 3: γn = 1,3. 
The elastic deflection shall then be added to the un-deflected position in the most unfavourable 
direction and the resulting position compared to the requirement for non-interference.  
Direct dynamic deflection analysis may also be used. In this case, the characteristic deflection 
is determined in a manner consistent with the characteristic loads determined for each load 
case in Table 2. The exceedance probability in the most unfavourable direction shall be the 
same for the characteristic deflection as for the characteristic load. The characteristic 
deflection is then multiplied by the combined safety factor and added to the un-deflected 
position as described above. 
7.6.6 
Special partial safety factors 
Lower partial safety factors for loads may be used where the magnitudes of loads have been 
established by measurement or by analysis confirmed by measurement to a higher than normal 
degree of confidence. The values of all partial safety factors used shall be stated in the design 
documentation. 
8 
Control and protection system 
8.1 
General 
Wind turbine operation and safety shall be governed by a control and protection system that 
meets the requirements of this clause. 
Manual or automatic intervention shall not compromise the protection functions. Any device 
allowing manual intervention must be clearly visible and identifiable, by appropriate marking 
where necessary. 
Settings of the control and protection system shall be protected against unauthorised 
interference. 
8.2 
Control functions 
The control functions of a wind turbine shall control the operation by active or passive means 
and keep the operating parameters within their normal limits. Where selection of control mode 
can be exercised, for example for maintenance, each mode shall override all other control, with 
the exception of the emergency stop button. Mode selection shall be governed by a selector, 
which can be locked in each position corresponding with a single mode. When certain functions 
are controlled numerically, access codes shall be provided to appropriately select the function. 
Page 47
– 46 – 
61400-1  IEC:2005 
The control functions may govern or otherwise limit functions or parameters such as 
• 
power; 
• 
rotor speed; 
• 
connection of the electrical load; 
• 
start-up and shutdown procedures; 
• 
cable twist; 
• 
alignment to the wind. 
8.3 
Protection functions 
The protection functions shall be activated as a result of failure of the control function or of the 
effects of an internal or external failure or dangerous event. The protection functions shall 
maintain the wind turbine in a safe condition. The activation levels for the protection functions 
shall be set in such a way that the design limits are not exceeded. 
The protection functions shall have higher priority than control functions, but not higher than 
the emergency stop button, in accessing the braking systems and equipment for network 
disconnection when triggered. 
The protection functions shall be activated in such cases as 
• 
overspeed; 
• 
generator overload or fault; 
• 
excessive vibration; 
• 
abnormal cable twist (due to nacelle rotation by yawing). 
The protection functions shall be designed for fail-safe operation. The protection functions shall 
in general be able to protect the wind turbine from any single failure or fault in a power source 
or in any non-safe-life component within the systems implementing the protection functions. 
Any single failure in the sensing or non-safe-life structural parts of the systems implementing 
the control functions shall not lead to malfunction of the protection functions. 
If two or more failures are interdependent or have a common cause, they shall be treated as a 
single failure.  
Measures shall be taken to reduce the risk from dormant failures. Non-safe-life components 
within the systems implementing protection functions shall fail to a safe condition or their 
condition shall be automatically monitored; in either case their failure shall result in a machine 
shutdown. Safe-life designed components shall be inspected at adequate intervals. 
All non-fail-safe components required for implementation of non-redundant protection functions 
shall be considered in component class 3 with an appropriate consequences of failure partial 
safety factor defined in 7.6. All such protection system critical components shall be analysed 
for ultimate strength, fatigue, buckling and critical deflection. 
In cases of conflict, the protection function shall overrule the control function. 
The automatic or remote restart of a wind turbine shall not be possible where the shutdown 
was initiated by an internal fault or trip that is critical to the turbine safety. If such a fault or trip 
is followed by electrical network interruption or loss of load, automatic restart shall not be 
possible after return of electrical network or load.  
Page 48
61400-1  IEC:2005 
− 47 − 
An emergency stop button, which will override the control functions, shall bring the rotor to a 
complete stop in any wind speed less than the wind speed limit defined for maintenance and 
repair, see 7.4.8, and as a minimum to idling mode from any operation condition. In addition, 
activation of the emergency stop button shall de-energise the medium- and the high-voltage 
systems. Emergency stop buttons shall be provided at every major working place (e.g. nacelle 
and tower bottom). Disengagement of any emergency stop button following its use shall require 
an appropriate action. Following disengagement, automatic restart shall only be possible after 
manual clearance. 
8.4 
Braking system 
The braking system shall be able to bring the rotor to idling mode or complete stop from any 
operation condition. Means shall be provided for bringing the rotor to a complete stop from a 
hazardous idling state in any wind speed less than the wind speed limit defined for 
maintenance and repair, see 7.4.8. 
It is recommended that at least one braking system operate on an aerodynamic principle, as 
such acting directly on the rotor. If this recommendation is not met at least one braking system 
shall act on the rotor shaft or on the rotor of the wind turbine. 
Brakes shall be designed to function even if their external power supply fails. A brake shall be 
able to keep the rotor in the full stop position for the defined wind conditions for at least one 
hour after the brake is applied. During longer periods of grid loss, it shall be possible to apply 
the brake by either an auxiliary power supply or by manual operation. 
9 
Mechanical systems 
9.1 
General 
A mechanical system for the purposes of this standard is any system, which does not consist 
solely of static structural components, or electrical components, but uses or transmits relative 
motion through the combination of shafts, links, bearings, slides, gears and other devices. 
Within a wind turbine, these systems may include elements of the drive train such as 
gearboxes, shafts and couplings, and auxiliary items such as brakes, blade pitch controls, yaw 
drives. Auxiliary items may be driven by electrical, hydraulic or pneumatic means. 
All mechanical systems in the drive train and in the control and protection system shall be 
designed according to IEC/ISO standards wherever available. Otherwise, recognized standards 
shall be used. Partial safety factors shall be consistent with component class 2 in 7.6.1.2, 
unless the systems falls into component class 3.  
Particular care shall be taken to ensure that cooling and filtration systems can maintain the 
relevant operating conditions throughout the operating temperature range when the specified 
maintenance procedures are followed. 
The remaining life of any component subject to wear in the brake system shall be monitored 
automatically and subject to regular inspection. The turbine shall be parked when there is 
insufficient material for further emergency stops. All brake devices shall be designed and 
maintained to keep the response time within acceptable levels.  
Load calculation shall be based on simulations including both the mean braking level and a 
minimum braking level that allows for minimum friction and application pressure predicted for 
the design. If the brake is able to slip at the minimum braking level, when the brake is applied, 
it shall be designed to avoid overheating and brake performance impairment and to avoid risk 
of fire. 
Page 49
– 48 – 
61400-1  IEC:2005 
9.2 
Errors of fitting 
Errors likely to be made when fitting or refitting certain parts that could be a source of risk shall 
be made impossible by the design of such parts or, failing this, by information given on the 
parts themselves and/or housings. The same information shall be given on the moving parts 
and/or their housings where the direction of movement must be known to avoid a risk. Any 
further information that may be necessary shall be given in the operator’s instruction and 
maintenance manuals. 
Where a faulty connection can be a source of risk, incorrect connections shall be made 
impossible by the design or, failing this, precautions shall be taken to avoid faulty connection 
by information given on the pipes, hoses and/or connector blocks. 
9.3 
Hydraulic or pneumatic systems 
Where auxiliary items are powered by hydraulic or pneumatic energy the systems must be so 
designed, constructed and equipped as to avoid all potential hazards associated with these 
types of energy. Means of isolating or discharging accumulated energy must be included in 
such systems. All pipes and/or hoses carrying hydraulic oil or compressed air and their 
attachments shall be designed to withstand or be protected from foreseen internal and external 
stresses. Precautions shall be taken to minimize risk of injury arising as a consequence of 
rupture. 
9.4 
Main gearbox 
The main gearbox is to be considered as a class 2 component. 
Gears shall be designed using appropriate calculation methods as described in ISO 6336-1  
to ISO 6336-3. The material strength values shall be derived according to ISO 6336-5 and they 
shall at least correspond to the MQ quality. All relevant manufacturing tolerances and 
displacements shall be combined for the calculation of the face load distribution factor 
according to ISO 6336-1.  
The safety factor SH for pitting shall be calculated according to ISO 6336-2 using either method 
A or B. The direct Miner's rule shall be applied for the fatigue calculation. The calculated safety 
factor SH shall be 1,2. This safety factor SH includes the partial safety factor for consequence, 
material and load.  
The safety factor SF for tooth bending shall be calculated according ISO 6336-3 method A or B. 
The direct Miner's rule shall be used. The calculated safety factor SF shall be at least 1,45. This 
safety factor SF includes the partial safety factor for consequence, material and load. 
For scuffing, fatigue loads have no significance, but even few high transient loads are able to 
initiate this failure especially with insufficient initial surface finish and at high lubricant 
temperature. The safety against scuffing shall be calculated using a relevant method, for 
example as described in ISO/TR 13989-1. The calculated safety factor SS shall be at least 1,3. 
Particular care shall be taken to ensure that the cooling and filtration systems can maintain the 
relevant lubrication state throughout the operating temperature range following the specified 
maintenance procedures. 
Page 50
61400-1  IEC:2005 
− 49 − 
9.5 
Yaw system 
The yaw system may consist of means to maintain a fixed yaw orientation (e.g. hydraulic 
brakes), means to change that orientation (e.g. electric motors, gearboxes and pinions) and 
means to guide the rotation (e.g. a bearing).  
Any motors shall comply with relevant parts of Clause 10. For yaw gear systems with multiple 
yaw drives ensuring sufficient redundancy, the gears may be considered to be in component 
class 1. The safety factors SH and SF may then be reduced to 1,1 and 1,25. Otherwise 
component class 2 shall be used. 
9.6 
Pitch system 
The pitch system may consist of means to adjust blade pitch angle (e.g. hydraulic actuators, 
electric motors, gearboxes, brakes and pinions) and means to guide the rotation (e.g. a 
bearing).  
Any motors shall comply with relevant parts of Clause 10. For pitch systems with individual 
pitch drives/actuators ensuring sufficient redundancy, these may be considered to be in 
component class 2.  
9.7 
Protection function mechanical brakes 
Where mechanical brakes are used for a protection function, they are generally friction devices 
applied by hydraulic or mechanical spring pressure. The remaining life of any wearing 
components, for example friction pads, shall be monitored by the control and protection 
system, which shall place the turbine in parked mode when insufficient material is available for 
a further emergency stop. 
Load calculation shall be based on simulations including an appropriate range of the braking 
level. If the brake is able to slip in the standstill state at the minimum braking level, whenever 
the brake is to maintain the wind turbine in a stationary state, the period of slip in a turbulent 
wind must be sufficiently short to avoid overheating and brake performance impairment and to 
avoid a risk of fire. 
9.8 
Rolling bearings 
The basis of rating analysis of rolling bearings shall be ISO 76 and ISO 281. For shaft 
bearings, for example main shaft, gearbox, the bearing lives (90 % survival probability) shall be 
at least 20 years. The calculation method shall consider the operating conditions. Any 
adjustment factors (i.e. a-factors) according to ISO 281 shall be applied with care.  
Particular care shall be taken to ensure that cooling and filtration systems can maintain the 
relevant operating conditions throughout the operating temperature range with the specified 
maintenance procedures.  
For bearings, design loads shall reflect the loads determined in the various load cases in 7.4 
and appropriate safety factors in 7.6. The bearing design shall consider the expected amount 
of rotation during its lifetime and whether the rotations are continuous as in main shaft bearings 
or oscillating as in pitch and yaw bearings. Furthermore, consideration shall be given to the 
potential effect of insufficient lubrication due to small movement. 
For slew bearings, the ratio of static rating to design load shall be at least 1,0 according to 
ISO 76. The load distribution due to flexibility of the connected parts shall be carefully 
considered.  
Page 51
– 50 – 
61400-1  IEC:2005 
10  Electrical system 
10.1 General 
The electrical system of a wind turbine installation comprises all electrical equipment installed 
in each individual wind turbine up to and including the wind turbine terminals; referred to below 
as the "wind turbine electrical system". 
The power collection system is not covered by this standard. 
10.2 General requirements for the electrical system 
The design of the electrical system shall ensure minimal hazards to people and livestock as 
well as minimal potential damage to the wind turbine and external electrical system during 
operation and maintenance under all normal and extreme external conditions defined in 
Clause 6. 
The electrical system, including all electrical equipment and components, shall comply with the 
relevant IEC standards. Specifically, the design of a wind turbine electrical system shall comply 
with the requirements of IEC 60204-1. For wind turbines that contain circuits at nominal 
voltages greater than 1000 V a.c. or 1500 V d.c. the design of a wind turbine electrical system 
shall comply with the requirements of IEC 60204-11. Fixed installations, not machine 
installations, shall comply with the requirements of IEC 60364. The manufacturer shall state 
the design standard(s) used. The design of the electrical system shall take into account the 
fluctuating nature of power generation from wind turbines. 
10.3 Protective devices 
A wind turbine electrical system shall, in addition to the requirements of IEC 60364, include 
suitable devices that ensure protection against malfunctioning of either the wind turbine or the 
external electrical system that may lead to an unsafe condition or state. 
10.4 Disconnect devices 
It shall be possible to disconnect a wind turbine electrical system from all electrical sources of 
energy as required for maintenance or testing. 
Semiconductor devices shall not be used alone as disconnect devices. 
Where lighting or other electrical systems are necessary for safety during maintenance, 
auxiliary circuits shall be provided with their own disconnect devices, such that these circuits 
may remain energized while all other circuits are de-energized. 
10.5 Earth system 
The design of a wind turbine shall include a local earth electrode system to meet the 
requirements of IEC 60364 (for the correct operation of the electrical installation) and 
IEC 61024-1 (for lightning protection). The range of soil conditions for which the earth 
electrode system is adequate shall be stated in the design documentation, together with 
recommendations should other soil conditions be encountered.  
The choice and installation of the equipment of the earthing arrangement (earth electrodes, 
earthing conductors, main earthing terminals and bars) shall be made in accordance with 
IEC 60364-5-54. 
Page 52
61400-1  IEC:2005 
− 51 − 
Provisions shall be made in any electrical system operating above 1 000 V a.c. or 1 500 V d.c. 
for earthing during maintenance. 
10.6 Lightning protection 
The lightning protection of a wind turbine shall be designed in accordance with IEC 61024-1. It 
is not necessary for protective measures to extend to all parts of the wind turbine, provided 
safety is not compromised. Guidance is given in IEC 61400-24. 
10.7 Electrical cables 
Where there is a probability of rodents or other animals damaging cables, armoured cables or 
conduits shall be used. Underground cables shall be buried at a suitable depth to avoid 
damage by service vehicles or farm equipment. Underground cables shall, if not protected by a 
conduit or duct, be marked by cable covers or suitable marking tape.  
10.8 Self-excitation 
Any electrical system that can alone self-excite a wind turbine shall be disconnected and 
remain safely disconnected in the event of loss of network power.  
If a capacitor bank is connected in parallel with an induction generator (i.e. for power factor 
correction), a suitable switch is required to disconnect the capacitor bank whenever there is a 
loss of network power, to avoid self-excitation of the generator. Alternatively, if capacitors are 
fitted, it shall be sufficient to show that the capacitors cannot cause self-excitation. 
10.9 Protection against lightning electromagnetic impulse 
The over-voltage protection shall be designed in accordance with the requirements of 
IEC 61312-1. 
The limits of the protection shall be so designed that any lightning electromagnetic impulse 
transferred to the electrical equipment will not exceed the limits governed by the equipment 
insulation levels. 
10.10 Power quality 
The power quality characteristics of the wind turbine shall be assessed in accordance with 
IEC 61400-21. 
The procedures in IEC 61400-21 may be used to demonstrate compliance with the 
requirements of the operator of the public distribution or transmission network. 
10.11 Electromagnetic compatibility 
Emissions of conducted disturbances are covered in 10.9. 
Emissions of radiated disturbances shall meet the requirements of IEC 61000-6-4. 
Immunity to conducted disturbances is covered in 10.6. 
Immunity to radiated disturbances shall meet the requirements of IEC 61000-6-1 or IEC 61000-
6-2. The turbine manufacturer shall state which of these two standards applies to the wind 
turbine design. 
Page 53
– 52 – 
61400-1  IEC:2005 
11 Assessment of a wind turbine for site-specific conditions 
11.1 General 
Wind turbines are subject to environmental and electrical conditions including the influence of 
nearby turbines, which may affect their loading, durability and operation. In addition to these 
conditions, account has to be taken of the seismic, topographic and soil conditions at the wind 
turbine site. It shall be shown that the site-specific conditions do not compromise the structural 
integrity. The demonstration requires an assessment of the site complexity, see 11.2, and an 
assessment of the wind conditions at the site, see 11.3. For assessment of structural integrity 
two approaches may be used: 
a)  a demonstration that all these conditions are no more severe than those assumed for the 
design of the wind turbine, see 11.9; 
b)  a demonstration of the structural integrity for conditions, each equal to or more severe than 
those at the site, see 11.10.  
If any conditions are more severe than those assumed in the design, the structural and 
electrical compatibility shall be demonstrated using the second approach. 
The partial safety factors for loads in 7.6.2.1 assumes that the site assessment of the normal 
and extreme wind conditions has been carried out according to the minimum requirements in 
this clause. 
11.2 Assessment of the topographical complexity of the site  
The complexity of the site is characterised by the variations of the terrain topography from a 
plane. A site that fails to conform to all the restrictions of Table 4 is characterised as complex. 
The fitted plane slope, used in Table 4, denotes the slope of a plane that best fits the 
topographic variations within a specific distance from the wind turbine and passes through the 
wind turbine tower base. Accordingly, the terrain variation from the fitted plane denotes the 
distance, along a vertical line, between any surface point and the fitted plane. zhub is the hub 
height of the wind turbine.  
Table 4 – Terrain complexity indicators 
Distance range from wind 
turbine 
Max slope of fitted plane 
Maximum terrain variation from 
a disc with radius 1,3 zhub fitted 
to the terrain 
< 5 zhub 
< 10 zhub 
< 20 zhub 
< 10o 
< 0,3 zhub 
< 0,6 zhub 
< 1,2 zhub 
The resolution of surface grids used for terrain complexity assessment must not exceed zhub. 
11.3 Wind conditions required for assessment 
Values at the wind turbine site of the following parameters shall be estimated: 
• 
the extreme 10-min average wind speed at hub height with a recurrence period of 50 years;  
• 
wind speed probability density function p(Vhub) in the range of Vin to Vout; 
Page 54
61400-1  IEC:2005 
− 53 − 
• 
ambient turbulence standard deviation ˆσ  (estimated as the mean value of the standard 
deviation of the longitudinal component13) and the standard deviation ˆσ
σ
of ˆσ at Vhub 
between Vin and Vout  and Vhub equal to Vref; 
• 
flow inclination;  
• 
wind shear14;  
• 
air density. 
Where there are no site data for the air density, it shall be assumed that the air density is 
consistent with the ISO 2533:1975, suitably corrected for annual average temperature.  
The interval of any wind speed bin used in the above shall be 2 m/s or less, and the wind 
direction sectors shall be 30º or less. All parameters, except air density, shall be available as 
functions of wind direction, given as a 10-min average.  
The site wind parameters15 shall be either 
• 
measured in the range of 0,2 Vref and 0,4 Vref and extrapolated, or  
• 
calculated from monitoring measurements made at the site, long-term records from local 
meteorological stations or from local codes or standards.  
If measurements are used, the site conditions shall be correlated with long-term data from 
available local meteorological stations unless they can otherwise be shown to be conservative. 
The monitoring period shall be sufficient to obtain a minimum of six months of reliable data. 
Where seasonal variations contribute significantly to the wind conditions, the monitoring period 
shall be long enough to conservatively include these effects.  
The value of the standard deviation of the longitudinal component shall be determined using 
appropriate statistical techniques applied to measured and preferably de-trended data. Where 
topographical or other local effects may influence the turbulence intensity, these effects shall 
be represented in the data. The characteristics of the anemometer, sampling rate and 
averaging time used to obtain measured data shall be considered when evaluating the 
turbulence intensity. 
11.4 Assessment of wake effects from neighbouring wind turbines 
Wake effects from neighbouring wind turbines during power production shall be considered. 
The assessment of the suitability of the wind turbine at a site in a wind farm shall take into 
account the deterministic and turbulent flow characteristics associated with single or multiple 
wakes from upwind machines, including the effects of the spacing between the machines, for 
all ambient wind speeds and wind directions relevant to power production.  
The increase in loading generally assumed to result from wake effects may be accounted for by 
the use of an effective turbulence intensity, which shall include adequate representation of the 
effect on loading of ambient turbulence and discrete and turbulent wake effects.  
For fatigue calculations, the effective turbulence intensity Ieff may be derived according to 
Annex D.  
___________ 
13 The longitudinal component of turbulence may be approximated by the horizontal component. 
14 High shear values for extended periods of time have been reported for certain areas in connection with highly 
stratified flow or severe roughness changes. The external conditions in Clause 6 are not intended to cover such 
cases. 
15  Attention should be given to wakes from significant structures within a distance from the wind turbine of 20 
times the characteristic length of the structure. 
Page 55
– 54 – 
61400-1  IEC:2005 
For ultimate loads, Ieff may be assumed to be the maximum of wake turbulence intensities from 
neighbouring wind turbines as defined in Annex D. 
{
}
1
ˆ
max
eff
T
hub
I
V
σ
=
(33) 
It should be noted that for wind turbine spacing less than 3 diameters the validity of such 
models is uncertain and caution shall be exercised. 
11.5 Assessment of other environmental conditions 
The following environmental conditions shall be assessed for comparison with the assumptions 
made in the design of a wind turbine: 
• 
normal and extreme temperature ranges; 
• 
icing, hail and snow; 
• 
humidity; 
• 
lightning; 
• 
solar radiation; 
• 
chemically active substances; 
• 
salinity. 
11.6 Assessment of earthquake conditions 
There are no earthquake resistance requirements for standard class turbines because such 
events are only design driving in a few regions of the world. No earthquake assessment 
analysis is required for sites already excluded by the applicable local seismic code due to their 
weak seismic action. For locations where the seismic load cases described below are critical, 
the engineering integrity shall be demonstrated for the wind turbine site conditions. The 
assessment may be based on Annex C. The evaluation of load shall take account of the 
combination of seismic loading with other significant, frequently occurring operational loads.  
The seismic loading shall depend on ground acceleration and response spectrum requirements 
as defined in local codes. If a local code is not available or does not give the ground 
acceleration and response spectrum, an appropriate evaluation of these parameters shall be 
carried out.  
The ground acceleration shall be evaluated for a 475-year recurrence period. 
The earthquake loading shall be superposed with operational loading that shall be equal to the 
higher of  
a) loads during normal power production by averaging over the lifetime; 
b) loads during emergency shutdown for a wind speed selected so that the loads prior to the 
shutdown are equal to those obtained with a). 
The partial safety factor for load for all load components shall be 1,0.  
The seismic load evaluation may be carried out through frequency domain methods, in which 
case, the operational loads are added directly to the seismic load. 
Page 56
61400-1  IEC:2005 
− 55 − 
The seismic load evaluation may be carried out through time-domain methods, in which case, 
sufficient simulations shall be undertaken to ensure that the operational load is representative 
of the time averaged values referred to above. 
The number of tower natural vibration modes used in either of the above evaluations shall be 
selected in accordance with a recognized seismic code. In the absence of such a code, 
consecutive modes with a total modal mass of 85 % of the total mass shall be used. 
The evaluation of the resistance of the structure may assume elastic response only, or ductile 
energy dissipation. However, it is important that the latter is assessed correctly for the specific 
type of structure in use, in particular for lattice structures and bolted joints.  
A conservative approach to the calculation and the combination of loads on the tower is 
provided in Annex C. This procedure shall not be used if it is possible that seismic action will 
cause significant loading of structures other than the tower. 
11.7 Assessment of electrical network conditions  
The external electrical conditions at the wind turbine terminals at a proposed site shall be 
assessed to ensure compatibility with the electrical design conditions. The external electrical 
conditions shall include the following16:  
• 
normal voltage and range including requirements for remaining connected or disconnecting 
through specified voltage range and duration; 
• 
normal frequency, range and rate of change, including requirements for remaining 
connected or disconnecting through specified frequency range and duration; 
• 
voltage imbalance specified as a percentage negative phase-sequence voltage for 
symmetric and unsymmetrical faults; 
• 
method of neutral grounding; 
• 
method of ground fault detection / protection; 
• 
annual number of network outages; 
• 
auto-reclosing cycles;  
• 
required reactive compensation schedule; 
• 
fault currents and duration; 
• 
phase-phase and phase-ground short-circuit impedance at the wind turbine terminals;  
• 
background harmonic voltage distortion of the network;  
• 
presence of power line carrier signalling if any and frequency of same; 
• 
fault profiles for ride-through requirements; 
• 
power factor control requirements; 
• 
ramp rate requirements; and 
• 
other grid compatibility requirements. 
11.8 Assessment of soil conditions 
The soil properties at a proposed site shall be assessed by a professionally qualified 
geotechnical engineer, with reference to available local building codes. 
___________ 
16  The turbine designer may need to take account of grid compatibility conditions. The above represent a set of 
minimum requirements. Local and national grid compatibility requirements need to be anticipated at the design 
stage. 
Page 57
– 56 – 
61400-1  IEC:2005 
11.9 Assessment of structural integrity by reference to wind data 
It is possible to complete the assessment of structural integrity by comparison of the wind 
parameter values for the site with those used in design. A wind turbine is suitable for a site 
when the following conditions are all satisfied: 
• 
the site estimate of extreme 10-min average wind speed at hub height with a recurrence 
period of 50 years shall be less than Vref17; 
• 
the site value of the probability density function of Vhub shall be less than the design 
probability density function (see 6.3.1.1) at all values of Vhub between the wind speed 
0,2 Vref and 0,4 Vref; 
• 
the representative value of the turbulence standard deviation, σ1, (see equation (11)) shall 
be greater or equal to the site value of the estimated 90 % quantile of the turbulence 
standard deviation at all values of Vhub between the wind speed 0,2 Vref and 0,4 Vref, and 
i.e.  
1
ˆ
ˆ
1,28
σ
σ
σ
σ
≥
+
(34) 
When the terrain is complex, the estimate of the standard deviation of the longitudinal 
component of turbulence shall be increased in order to account for the distortion of the 
turbulent flow18. The site flow inclination, taken as the maximum of all directions, shall be less 
than that specified in 6.3. Where there are no site data or calculations for the flow inclination 
and the terrain is complex, it shall be assumed that the flow is always parallel to the fitted 
plane, see 11.2, within a distance of 5 zhub from the wind turbine. 
The site average vertical wind shear exponent α, for direction shall be less than that specified 
in 6.3.1.2 and larger than zero. Where there are no site data for the wind shear, it shall be 
calculated taking topography and roughness into account. 
The average site air density shall be less than that specified in 6.4.1 for wind speeds greater 
than or equal to Vr. 
An adequate assessment of wake effects can be performed by verifying that the turbulence 
standard deviation σ1 from the normal turbulence model is greater or equal to the estimated 
90 % quantile of the turbulence standard deviation (including both ambient and wake 
turbulence) between the wind speed 0,2 Vref and 0,4 Vref (or when the turbine properties are 
known, between 0,6 Vr and Vout), i.e.: 
ˆ
,
I
V
σ
σ
≥
⋅
+
1
eff
hub
σ
1 28
(35) 
where Ieff for fatigue loads and extreme load calculations follows from 11.4.  
___________ 
17  Alternatively, the wind turbine site central estimate of extreme 3 s average wind speed at hub height with a 
recurrence period of 50 years should be less than Ve50. 
18 The effect of complex terrain may be included by an additional multiplication with a turbulence structure 
correction parameter CCT defined as  
ˆ
ˆ
ˆ
ˆ
(
/
)
(
/
)
,
C
σ
σ
σ
σ
+
+
=
2
2
2
1
3
1
CT
1
1 375
where ratios of the estimated standard deviations, ˆi
σ , correspond to hub height values. Where there are no site 
data for the components of turbulence and the terrain is complex, results of modelling or CCT = 1,15 may be used . 
Page 58
61400-1  IEC:2005 
− 57 − 
11.10 Assessment of structural integrity by load calculations with reference to site 
specific conditions 
The demonstration shall comprise a comparison of loads and deflections calculated for the 
specific wind turbine site conditions with those calculated during design, taking account of the 
reserve margins and the influence of the environment on structural resistance. The calculations 
shall account for variations of wind conditions with mean wind direction and speed, wake 
effects, etc. 
Where there are no site data for the components of turbulence and the terrain is complex, it 
shall be assumed that the longitudinal, lateral and upward turbulence component standard 
deviations are equal. 
In case of wake effects it shall be verified that structural integrity is not compromised for DLC 
1.1 and 1.2 in which σ1 in the normal turbulence model is replaced by the actual wake 
turbulence. This may be estimated by 
ˆ
,
I V
σ
σ
=
+
wake
eff
hub
σ
1 28
(36) 
where Ieff for fatigue load and extreme load calculations follows from 11.4.  
Since for fatigue load calculations, Ieff as defined in Annex D depends on the Wöhler curve 
exponent m of the material of the considered component, the loads on structural components 
with other material properties shall either be recalculated or assessed with the appropriate 
value of m. 
For extreme load calculations, it is permitted to take into account the frequency of the wake 
situations and modify the load extrapolation in DLC 1.1 accordingly. 
12 Assembly, installation and erection 
12.1 General 
The manufacturer of a wind turbine shall provide an installation manual clearly describing 
installation requirements for the wind turbine structure and equipment. The installation of a 
wind turbine shall be performed by personnel trained or instructed in these activities. 
The site of a wind turbine facility shall be prepared, maintained, operated and managed so that 
work can be performed in a safe and efficient manner. This should include procedures to 
prevent unauthorised access where appropriate. The operator should identify and eliminate 
existing and potential hazards. 
Checklists of planned activities shall be prepared and logs of completed work and results of 
that work should be kept.  
When appropriate, installation personnel shall use approved eye, feet, hearing, and head 
protection. All personnel climbing towers, or working above ground or water level, should be 
trained in such work and shall use approved safety belts, safety climbing aids or other safety 
devices. When appropriate, a buoyancy aid should be used around water. 
All equipment shall be kept in good repair and be suitable for the task for which it is intended. 
Cranes, hoists and lifting equipment, including all slings, hooks and other apparatus, shall be 
adequate for safe lifting. 
Page 59
– 58 – 
61400-1  IEC:2005 
Particular consideration should be given to installation of the wind turbine under unusual 
conditions, such as hail, lightning, high winds, earthquake, icing, etc. 
In the case of a tower standing without a nacelle, appropriate means shall be taken to avoid 
critical wind speeds for vortex generated transverse vibrations. The critical wind speeds and 
precaution measures shall be included in the installation manual. 
12.2 Planning 
The assembly, erection and installation of wind turbine and associated equipment shall be 
planned in order that the work is carried out safely and in accordance with local and national 
regulations. In addition to procedures for quality assurance, the planning shall include, where 
appropriate, consideration of the following: 
• 
rules for safe execution of excavation work; 
• 
detailed drawings and specifications of the work and inspection plan; 
• 
rules for the proper handling of embedded items, such as foundations, bolts, anchors and 
reinforcement steel; 
• 
rules for concrete composition, delivery, sampling, pouring, finishing and placement of 
conduits; 
• 
safety rules for blasting; 
• 
procedures for installation of towers and other anchors. 
12.3 Installation conditions 
During the installation of a wind turbine, the site shall be maintained in such a state that it does 
not present safety risks. 
12.4 Site access 
Access to a site shall be safe and the following shall be taken into account: 
• 
barriers and routes of travel; 
• 
traffic; 
• 
road surface; 
• 
road width; 
• 
clearance; 
• 
access weight bearing capacity; 
• 
movement of equipment at the site. 
12.5 Environmental conditions 
During installation, environmental limits specified by the manufacturer shall be observed. Items 
such as the following should be considered: 
• 
wind speed; 
• 
snow and ice;  
• 
ambient temperature; 
• 
blowing sand; 
• 
lightning; 
• 
visibility; 
• 
rain. 
Page 60