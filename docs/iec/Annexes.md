61400-1  IEC:2005 
− 69 − 
In summary, the three parameters required in the Mann model are given by 
1
1
3,9
0,55
0,8
iso
l
γ
σ
σ
=
=
=
Λ
(B.12) 
where σ1 and Λ1 are specified in 6.3. 
For three dimensional turbulent velocity simulations, the velocity components are determined 
from a decomposition of the spectral tensor and an approximation by the discrete Fourier 
transform. Thus, the three-dimensional spatial domain is divided into equally spaced discrete 
points and the velocity vector at each point is given by  
,
,
( , , )
( ,
,
)
( , , )
( ,
,
)
( ,
,
)
( , , )
( ,
,
)
1
2
3
1
2
3
1
1
1
2
3
2
1
2
3
2
1
2
3
3
3
1
2
3
e
xk
yk
zk
i
k k
k
u x y z
n k k
k
u
x y z
C k k
k
n k k
k
u
x y z
n k k
k
+
+










=















∑
l
(B.13) 
where 
(
)
(
)
















−
−
−
−
−
+
−
≈










0
2
,
,
2
1
2
0
2
2
2
0
1
2
1
1
3
2
2
2
1
1
1
3
1
2
4
0
3
3
2
1
0
3
2
iso
3
2
1
k
k
k
k
k
k
k
k
k
k
k
k
k
k
k
k
k
∆
N
N
N
k
E
k
k
k
C
ζ
β
ζ
β
ζ
ζ
π
σ
l
3
2
1
,
,
u
u
u
= complex vector components whose real and imaginary parts are independent 
realizations of the turbulent velocity field, 
3
2
1
,
,
n
n
n
= complex Gaussian random values that are independent for each different 
wave number and have real and imaginary parts with unit variance, 
z
y
x
,
,
= coordinates of the spatial grid points, 
3
2
1
,
,
N
N
N
= the number of spatial grid points in the three directions, and 
∆ 
= the spatial grid resolution. 
In this expression, the notation ∑
3
2
1
,
,
k
k
k
 means the summation over all dimensionless wave 
numbers in the grid and may be accomplished using FFT techniques. In cases when the spatial 
domain is smaller than l
8  in any dimension, an adjustment is recommended for the spectral 
tensor factorization, 
(
)
[
]
3
2
1
,
,
k
k
k
C
. This procedure is detailed in Mann (1998). 
Page 71
– 70 – 
61400-1  IEC:2005 
B.2 
Kaimal (1972)19 spectrum and exponential coherence model 
The component power spectral densities are given in non-dimensional form by the equation: 
(
)
/
( )
/
k
f L
V
f S
f
f L
V
σ
=
k
hub
k
2
53
k
hub
4
1+6  
(B.14) 
where 
f 
is the frequency in Hertz, 
k 
is the index referring to the velocity component direction (i.e. 1 = longitudinal, 2 = lateral, 
and 3 = upward); 
Sk is the single-sided velocity component spectrum; 
k
σ is the velocity component standard deviation (see equation (B.2)); 
Lk is the velocity component integral scale parameter, 
and with 
( )
k
k
 = 
S
f df
2
0
σ
∞
∫
(B.15) 
The turbulence spectral parameters are given in Table B.1. 
Table B.1 – Turbulence spectral parameters for the Kaimal model 
Velocity component index (k) 
1 
2 
3 
Standard deviation σk 
σ1 
0,8 σ1 
0,5 σ1 
Integral scale, Lk 
8,1 Λ1 
2,7 Λ1 
0,66 Λ1 
where σ1 and Λ1 are the standard deviation and scale parameters, respectively, of the 
turbulence as specified in 6.3. 
The following exponential coherence model may be used in conjunction with the Kaimal 
autospectrum to account for the spatial correlation structure of the longitudinal velocity 
component: 
(
)
(
)
(
)
,
( ,
)
exp
/
,
/
r f
f r V
r L


=
−
⋅
+




C
0 5
2
2
hub
Coh
12
0 12
(B.16) 
where 
Coh(r,f) 
is the coherence function defined by the complex magnitude of the cross-spectral 
density of the longitudinal wind velocity components at two spatially separated 
points divided by the autospectrum function; 
r 
is the magnitude of the projection of the separation vector between the two points 
on to a plane normal to the average wind direction; 
___________ 
19  Note that the turbulence component variance ratios in Table B.1 and the equation form for the upward velocity 
component differ somewhat from the original Kaimal spectral model. The longitudinal scale has been chosen to 
approximate the original Kaimal spectrum and, for the lateral and upward scales, to satisfy the spectral 
requirements in 6.3 for the asymptotic inertial subrange and the variance ratios given in Table B.1. 
Page 72
61400-1  IEC:2005 
− 71 − 
f 
is the frequency in Hertz;  
Lc = 8,1Λ1  is the coherence scale parameter. 
B.3 
Reference documents 
J.C. Kaimal, J.C. Wyngaard, Y. Izumi, and O.R. Cote, Spectral characteristics of surface-layer 
turbulence, Q.J.R. Meteorol. Soc., v. 98, 1972, pp. 563-598. 
T. von Karman, Progress in the statistical theory of turbulence, Proc. Nat. Acad. Sci., v. 34, 
1948, pp. 530-539. 
J. Mann, The spatial structure of neutral atmospheric surface-layer turbulence, J. of Fluid 
Mech., v. 273, 1994, pp. 141-168. 
J. Mann, Wind field simulation, Prob. Engng. Mech., v. 13, n. 4, 1998, pp. 269-282. 
Page 73
– 72 – 
61400-1  IEC:2005 
Annex C  
(informative)  
Assessment of earthquake loading 
A simplified, conservative method for the calculation of seismic load is presented here for use 
when the need for a complex analysis cannot be readily established.  
The principal simplifications are the ignoring of vibration modes higher than the first tower 
bending mode, and the assumption that the whole structure is subject to the same 
acceleration. Ignoring the second mode is a significant non-conservative simplification and is 
compensated for here by incorporating tower mass with the tower head mass and applying a 
conservative aerodynamic load.  
The method for deriving the ground acceleration must still be consistent with 11.6. In the 
absence of detailed site data, conservative assumptions shall be made. ISO 3010 has been 
used as the basis of the terminology here.  
The procedure includes the following steps: 
• 
Evaluate or estimate the site and soil conditions required by the relevant local standard. 
• 
Use the normalised design response spectrum and the seismic hazard-zoning factor to 
establish the acceleration at the first tower bending eigen-frequency assuming a damping of 
1 % of critical damping. 
• 
Calculate the load for a system subject to the above acceleration in which the total rotor, 
nacelle and 50 % of the tower mass is concentrated at the tower head.  
• 
Add the result to the characteristic loads calculated for an emergency stop at rated wind 
speed. 
• 
Compare the result against the design loads or the design resistance for the wind turbine 
If the tower can sustain the resulting combined loading, no further investigation is needed. 
Otherwise, a thorough investigation shall be carried out according to 11.6. 
Page 74
61400-1  IEC:2005 
− 73 − 
Annex D  
(informative) 
Wake and wind farm turbulence 
D.1 
Wake effects 
Wake effects from neighbouring wind turbines may be taken into account during normal 
operation for fatigue calculation by an effective turbulence intensity Ieff,, Frandsen (2003). The 
effective turbulence intensity – conditioned on hub height mean wind speed – may be defined as 
m
m
d
V
I
V
p
V
I
1
2
0
hub
hub
hub
eff
)
(
)
(
)
(






= ∫
π
θ
θ
θ
(D.1) 
where  
p is the probability density function of wind direction; 
I is the turbulence intensity combined of ambient and wake flow from wind direction θ , and  
m is the Wöhler (SN-curve) exponent for the considered material. 
In the following a uniform distribution 
(
)
hub
p
V
θ
 is assumed. It is also acceptable to adjust the 
formulas for other than uniform distribution20. No reduction in mean wind speed inside the wind 
farm shall be assumed. 
if min{dI } ≥ 10 D:  
ˆ
I
V
σ
=
eff
hub
(D.2) 
if min{dI } < 10 D:  
ˆ
ˆ
ˆ
(
)
(
)
;
,
N
m
m
m
i
i
I
N p
p
d
p
V
V
σ
σ
σ
=


=
=
−
+
=




∑
1
eff
eff
w
w
T
w
1
hub
hub
1
1
0 06  
(D.3) 
where 
ˆσ  
is the ambient estimated turbulence standard deviation; 
,
ˆ
ˆ
( ,
,
/ )
V
d
V
c
σ
σ
=
+
+
2
2
hub
T
2
i
hub
0 9
1 5
0 3
is the maximum centre-wake, hub height turbulence standard 
deviation; 
di  
is the distance, normalised by rotor diameter, to neighbouring wind turbine no. i; 
___________ 
20  In the case of non-uniform wind direction distribution pw may be adjusted by a factor equal to the ratio of the 
actual probability of the wind direction in the direction of the neighbouring turbines and the probability 
associated with uniform wind direction distribution. 
Page 75
– 74 – 
61400-1  IEC:2005 
c  
is a constant equal to 1 m/s; 
Ieff  
is the effective turbulence intensity;  
N  
is the number of neighbouring wind turbines, and 
m 
 is the Wöhler curve exponent corresponding to the material of the considered 
structural component. 
Wake effects from wind turbines “hidden” behind other machines need not be considered, for 
example in a row, only wakes from the two units closest to the machine in question are to be 
taken into account. Depending on the wind farm configuration, the number of nearest wind 
turbines to be included in the calculation of Ieff is given in the table below. 
The wind farm configurations are illustrated in figure D.1 below for the case “Inside a wind farm 
with more than 2 rows”. 
Wind farm configuration 
N 
2 wind turbines 
1 
1 row 
2 
2 rows 
5 
Inside a wind farm with more than 2 rows 
8 
Inside large wind farms, the wind turbines tend to generate their own ambient turbulence. Thus, 
when  
a) the number of wind turbines from the considered unit to the “edge” of the wind farm is more 
than 5, or 
b) the spacing in the rows perpendicular to the predominant wind direction is less than 3D  
then the following ambient turbulence shall be assumed: 
(
)
'ˆ
ˆ
ˆ
ˆ
σ
σ
σ
σ
=
+
+
2
2
1
w
2
(D.4) 
where  
,
ˆ
,
d d
C
V
σ
=
+
r
f
T
hub
w
0 36
1 0 2
(D.5) 
CT is the thrust coefficient, dr and df are separations in rotor diameters in rows and separation 
between rows, respectively.  
Page 76
61400-1  IEC:2005 
− 75 − 
Figure D.1 – Configuration – Inside a wind farm with more than 2 rows 
D.2 
Reference documents 
S. Frandsen (2003) Turbulence and turbulence generated fatigue in wind turbine clusters, Risø 
report R-1188. 
IEC   1256/05 
Page 77
– 76 – 
61400-1  IEC:2005 
Annex E   
(informative)  
Prediction of wind distribution for wind turbine sites by measure-
correlate-predict (MCP) methods 
The assessment of the suitability of a wind turbine for a specific site requires the evaluation of 
the design-critical wind speed parameters at a site. Frequently, there is insufficient data even 
at a single point within a wind farm to carry out the evaluation. However, the extended data 
record can be synthesised by extrapolation based on a long-term record for another location. 
The MCP methods are a means to create that extended record. The following explanation is 
taken from “Prediction of extreme wind speed at wind energy sites, a set of guidelines prepared 
under ETSU contract W/11/00427/00” by National Wind Power and Climatic Research Unit of 
the University of East Anglia. 
E.1 
Measure-correlate-predict (MCP) 
The MCP method takes a number of forms in which the averaging period and directional nature 
of the data vary. One version is described here, based upon the concurrent hourly data from 
the wind turbine site and a nearby reference meteorological station (Met. Station). These data 
are cross-plotted and used to derive sector-wise linear regression equations; the sectors being 
consistent with those used by the Met. Station, typically 30° sectors. The data sets used for 
deriving the regression equations should be as long as possible, at least conservatively 
covering the conservative part of any seasonal variations.  
E.2 
Application to annual mean wind speed and distribution 
The above regression equations are applied to the long-term Met. Station record sector by 
sector, for a period sufficiently long to eliminate short-term variations, probably at least 7 years. 
The result is an hourly mean record for the site, which may be processed into a probability 
distribution for site assessment. 
E.3 
 Application to extreme wind speed 
The classical method for the prediction of the extreme wind speed is a Gumbel analysis 
modified to improve accuracy (e.g. Best Leiblein Unbiased Estimators (BLUE) method 
described in “The designers guide to wind loading of building structures”, N J Cook, 
Butterworths, 1995.). The minimum recommended length of data set is ten years.  
It is also possible to apply the method of independent storms (MIS), a derivative of the Gumbel 
method, which utilises more than one data point per year from a data set, also described by 
Cook. This method can be used for data sets that are as short as seven years. MIS selects 
individual storms peak wind speeds by application of thresholds and time filters to ensure that 
all values are from independent events. 
The sector-specific regression coefficients are applied to a table of the maximum hourly wind 
speed at the Met. Station, by year for basic Gumbel and by storm event for MIS, and by sector. 
A similar table is therefore built up for the wind turbine site. The maximum value in each year 
for the candidate site is extracted for use in a Gumbel analysis. 
Page 78
61400-1  IEC:2005 
− 77 − 
The use of the coefficients is appropriate here since they have been formed from hourly mean 
data and are being applied to hourly mean data. In this method, there is no assumption that the 
maximum value at the candidate site occurs in the same sector as the maximum at the 
reference site. By using the sector-specific regression coefficients, the maximum at the 
candidate site can be more accurately determined, taking account of the inter-site 
relationships. 
The selection of the relevant recurrence period in the extreme value analysis should account 
for the number of events per annum. 
The gust factors should be estimated from the site-measured data, or by theoretical methods. 
E.4 
Reference documents 
N J Cook, The designers guide to wind loading of building structures, Butterworths, 1995. 
National Wind Power and Climatic Research Unit of the University of East Anglia, Prediction of 
extreme wind speed at wind energy sites, a set of guidelines prepared under ETSU contract 
W/11/00427/00.  
R I Harris, Gumbel re-visited – a new look at extreme value statistics applied to wind speeds, 
Journal of Wind Engineering and Industrial Aerodynamics, Volume 59 (1996) pp 1-22. 
D C Quarton Wind Farms in Hostile Terrain, Final Report, A report prepared under ETSU 
contract W/43/00501/00/00,, July 1999.  
R I Harris, The accuracy of design values predicted from extreme value analysis, Journal of 
Wind Engineering and Industrial Aerodynamics, 89 (2001) pp 153-164. 
Page 79
– 78 – 
61400-1  IEC:2005 
Annex F  
(informative)  
Statistical extrapolation of loads for ultimate strength analysis 
F.1 
Statistical extrapolation of loads 
Failure of a structure occurs when the stress at a critical location exceeds the resistance 
capacity of the material. Assuming that local stresses are related to the loading so that the 
stress progressively increases with increased loading, the strength of a structural component 
can be defined in terms of an ultimate load that causes failure. Given the service loading, one 
can assess the suitability of the structure by comparing the extreme values of the loading with 
the ultimate load resistance, applying suitable factors of safety. 
For wind turbines, the loading depends on the turbulent wind inflow for a variety of wind 
conditions. Thus, it is necessary to analyse the extreme values of the loading on a statistical 
basis in order to determine a suitable characteristic load. For a given wind condition, it is 
reasonable to model the short-term load response as a stationary random process. Further 
assuming that the largest load values occur at widely separated times and are thus statistically 
independent, the probability that the largest load Fext exceeds a given load F in the observation 
time T is given by (see Gumbel, 1958, and Cramer, 1966) 
(
)
(
)
(
)
(
)
,
,
E nV T
F
F
V T
F
F V
≥
= −
ext
max
Prob
1
(F.1) 
where 
(
)
max
F
F V
 is the short-term probability distribution function of the local maxima for the 
load process, and 
(
, )
E n V T  is the expected number of local maxima in the observation time 
period. As indicated, these statistical quantities are conditioned on the mean wind speed, V, 
and, where indicated, also depend on the observation time period, T.  
Considering all the operating wind conditions, the long-term exceedance probability is then 
given by integrating overall operating wind speeds, 
(
)
(
) ( )
( , )
,
V
V
F
F
T
P F T
F
F
V T p V dV
≥
≡
=
≥
∫
out
in
ext
e
ext
Prob
Prob
, 
(F.2) 
where 
( )
p V
 is the probability density function for the hub-height wind speed and is prescribed 
for the standard wind turbine classes in 6.3.1.1. The acceptable probability of exceedance is 
the reciprocal of the number of time intervals of length T in the recurrence period Tr associated 
with the characteristic load. The resulting characteristic load, Fk, is then given by solving the 
equation 
(
, )
T
P F T
T
=
e
k
r
. 
(F.3) 
Page 80
61400-1  IEC:2005 
− 79 − 
The function 
(
)
,
F
F V T
≥
ext
Prob
 is determined from response simulations, from which extremes 
are taken in the following way: 
• 
the extracted extremes must be selected so that they may be assumed to be independent; 
• 
the number of extremes must be sufficient to determine the type of distribution (Gumbel, 
Weibull, or other) and provide reliable estimation of the behaviour of the tail; 
• 
the wind speeds, where the highest loads due to turbulence are expected, must be included 
in the simulations. 
The characteristic load may be estimated by the following procedure: 
a) from the simulation data for a given wind speed, 
j
V , extract independent extreme values of 
the load. One method of doing this is to select the largest value between successive 
upcrossings of the mean plus 1,4 times the standard deviation of the load process; 
b) fit a distribution to the selected extreme value data. Guidance for one method for fitting the 
distribution can be found in Moriarty, et. al. (2002). The distribution type selected should be 
checked to see if the fit to the data is acceptable and whether there is sufficient data for 
reliable estimation of the behaviour of the tail compared to the data. A minimum of 300 min 
of time series data distributed over the range of significant wind conditions is 
recommended; 
c) estimate the expected number of maxima for a typical 10 min observation period, T, from 
the equation 
T
n
n T
=
j
s
s
(F.4) 
where Ts is the total time period of all the simulation data for the given wind speed, 
j
V , and 
ns is the total number of maxima extracted from the same simulation data; 
d) compute the long term exceedance probability as a function of load level from the following 
equation (assuming the required Rayleigh wind speed distribution for the standard turbine 
classes given in 6.3.1.1): 
(
)
(
)


















−



−
=










∆
+
−










∆
−
−
∑
2
2
2
2
2
e
ave
2
ave
1
)
(
V
V
v
V
V
V
j
n
j
j
j
j
j
j
e
e
V
F
F
F
P
π
π
max
(F.5) 
where 
j
V  is the wind speed bin centre and 
j
V
∆
is the bin width;  
e) solve for the characteristic load either graphically or by using a numerical root finding 
technique: 
(
)
,
P
F
−
=
×
7
e
k
3 8 10
(F.6) 
for the 50-year recurrence period and the reference period of 10 min. 
In using this procedure, care must be taken that an adequate number and resolution of wind 
speed bins is selected to approximate the integration in equation (F.2). Attention should be 
given to wind speeds around Vr and Vout. The accuracy of the discretization may be estimated 
by neglecting every other bin value and determining the resulting difference in the 
characteristic load.  
Page 81
– 80 – 
61400-1  IEC:2005 
Figure F.1 illustrates how the 1-year and 50-year extremes are determined from the computed 
long-term exceedance probability. The blade bending load has been normalized by the mean 
blade bending load at rated wind speed. Also shown on the plot is the largest computed blade 
bending load for all the simulations at the different mean wind speeds between cut-in and cut-
out. 
Computed long-term 
exceedance probability 
50-year extreme 
Maximum simulated load 
0 
0,5 
1,0 
1,5 
2,0 
2,5 
3,0 
3,5 
4,0 
Normalized bending moment 
100 
10–1 
10–2 
10–3 
10–4 
10–5 
10–6 
10–7 
10–8 
Probability of exceeding normalized 
bending moment 
IEC   1257/05 
Figure F.1 – Exceedance probability for largest out-of-plane blade bending load in 10 min 
(normalized by mean bending load at rated wind speed).  
F.2 
Reference documents 
Cramér, H., On the Intersections Between Trajectories of a Normal Stationary Stochastic 
Process and a High Level, Arkiv för Matematik., v.6, 1966, pp.337-349. 
Gumbel, E.J., Statistics of Extremes, Columbia Univ. Press, 1958, p.73. 
Patrick J. Moriarty, P.J., Holley, W.E. and Butterfield, C.P., Effect of turbulence variation on 
extreme loads prediction for Wind turbines, paper AIAA-2002-0050, 2002. 
Page 82
61400-1  IEC:2005 
− 81 − 
Annex G  
(informative)  
Fatigue analysis using Miner’s rule with load extrapolation 
G.1 
Fatigue analysis 
Fatigue failure results from an accumulation of damage due to fluctuating loads. For this kind 
of macroscopic view of fatigue, there is general agreement that an increment of damage 
results from each hysteresis cycle displayed in the local stress-strain diagram. Thus, each local 
maximum of the load time history is paired with the local minimum that completes a full cycle 
(rain-flow cycle counting, see Matsuishi & Endo, 1968, or Dowling, 1972). Each of these cycles 
is characterized by the paired extreme values (or equivalently by the range and midpoint 
values, i.e. the difference between and the mean of the two paired cycle extremes). If the 
damage accumulates linearly and independently for each cycle (Palmgren, 1924, and Miner, 
1945) then the total damage, D, will be given by21  
(
)
1
i
i
D
N S
=∑
, 
(G.1) 
where 
iS is the load range for the ith cycle, and
(
)
N
⋅
is the number of cycles to failure for a 
constant amplitude loading with the range given by the argument (i.e. the S-N curve). In this 
expression, it has been further assumed that the local stress at the failure location is linearly 
related to the loading. Typically, for fatigue analysis the S-N curve selected for design is 
associated with a given survival probability (often 95 %) and level of confidence (often 95 %) in 
determining the curve from materials data. Thus, the desired minimum level of reliability may 
be expected when the damage sums to unity.  
For the life of a wind turbine, there will be many cycles of varying sizes resulting from a broad 
range of wind conditions. Therefore, for design purposes, a load spectrum must be estimated. 
The largest cycles for this spectrum will be estimated from a smooth fit to the data obtained 
from simulations or testing of a duration that is significantly shorter than the turbine lifetime. 
For each wind condition, it may be assumed that the load is modelled by a stationary random 
process. Thus, the expected damage for a given wind speed, V, and a specific time period, T, 
will be given by 
(
)
( )
,
,
n
S V T
E D V T
dS
N S
∞
= ∫
ST
0
, 
(G.2) 
where 
(
)
,
n
S V T
ST
 is the short term load spectrum defined as a density function for the number 
of cycles. In this case, the expected number of cycles in any load range interval (SA,SB) during 
the time period T is given by
(
)
,
S
S
n
S V T dS
∫
B
A
ST
. The expected damage from normal operating 
loads for the whole turbine life is then given by extending the time interval to the full lifetime 
and integrating over the range of operating wind speeds, so that 
( )
(
)
( )
( )
,
,
V
V
V
V
n
S V T
E D
E D V T p V dV
p V dSdV
T
T
N S
∞
=
=
∫
∫∫
out
out
in
in
ST
0
Lifetime
Lifetime
, 
(G.3) 
___________ 
21 For ease of presentation, the effect of variation in the midpoint load level for each cycle is neglected. This 
restriction will be eliminated later when the issue of varying midpoint levels is addressed through the use of an 
equivalent cyclic range. 
Page 83
– 82 – 
61400-1  IEC:2005 
where 
( )
p V  is the probability density function for the hub-height wind speed prescribed for the 
standard wind turbine classes in 6.3.1.1. 
Now, defining the long-term load spectrum,  
( )
(
) ( )
,
V
V
n
S
n
S V T p V dV
T
=
∫
out
in
LT
ST
Lifetime
, 
(G.4) 
then gives 
( )
( )
n
S
E D
dS
N S
∞
= ∫
LT
0
. 
(G.5) 
In many cases, it is convenient, for practical purposes, to divide the ranges of load and wind 
speed values into discrete bins. In this case, the expected damage can be approximated by 
(
)
,
jk
j k
k
n
E D
N S
≈∑
, 
(G.6) 
where 
jk
n
is the expected number of lifetime load cycles in the jth wind speed and the kth load 
bins, and 
kS  is the centre value for the kth load bin. Thus, from the above definition, 
(
) ( )
,
V
S
V
S
V
S
S
V
n
n
S V T p V dSdV
T
∆
∆
∆
∆
+
+
−
−
=
∫
∫
j
k
j
2
k
2
j
k
k
2
j
2
jk
ST
Lifetime
, 
(G.7) 
where 
j
V
∆
 is the width of the jth wind speed bin and 
k
S
∆
 is the width of the kth load bin. 
Utilizing these results, and considering the requirement from 7.6.3 that the safety factors be 
applied to the load, the limit state relation for fatigue analysis becomes 
( )
(
)
n
S
dS
N
S
γ
∞
≤
∫
LT
0
1, 
(G.8) 
where 
n
m
f
γ
γ
γ
=
γ
 is the product of all three general partial safety factors for load, materials, 
and consequences of failure, respectively. In discrete terms this equation results in 
(
)
,
1
jk
j k
k
n
N
S
γ
≤
∑
. 
(G.9) 
In cases where significant damage occurs in more than one load case from Table 2 the 
damage fractions for all the load cases, computed using the left side of equation. (G.9), must 
sum to be less than or equal to one. 
The formulation up to this point has ignored the effect of the variability in the midpoint levels for 
each load cycle. One simple way of dealing with this variability is to define damage equivalent 
load cycles with a fixed midpoint value. In this case, the damage done by the equivalent cycles 
is exactly the same as that done by the cycles with varying midpoints. Thus, failure will occur 
(on average) for the same number of constant amplitude cycles for the equivalent cyclic range, 
eq
S
 as for cycles at any given cyclic range and midpoint value. Thus, defining a family of S-N 
curves for varying midpoint values, 
( ,
)
N S M
, the equivalent damage equation 
(
)
(
)
,
,
N S
M
N S M
=
eq
0
(G.10) 
Page 84
61400-1  IEC:2005 
− 83 − 
is solved for 
eq
S
 given values for S,M and the selected constant midpoint level M0. In 
mathematical terms, this can be stated as 
(
)
(
)
,
,
S
N
N S M M
−
=
1
eq
0  
(G.11) 
where the inverse refers to solution for the first argument in the function, N, given the second 
argument. Typically, M0 is chosen to give R values (the ratio of maximum load to minimum 
load) for the equivalent load cycles that are in the middle of the range of values observed 
directly in the load data. Often an acceptable value is the mean load considering all operating 
wind speeds. Fortunately, in most cases where the S-N curves are defined analytically (e.g. 
power law or exponential forms) the equivalent cyclic load range is easily computed. Care must 
be taken, however, as the range becomes large. Depending on the midpoint value, the 
maximum or minimum load value for the given cycle can get close to the static strength, in 
which case, the simple, high-cycle S-N curve may not be applicable. Also, for larger range 
values, the local stress or strain may transition from a compression-compression or tension-
tension dominated case to a tension-compression case, which could have a different analytical 
S-N curve representation. It is important to utilize the proper S-N relation in determining the 
equivalent cyclic range. For a given load time history, the rain flow cycles are first identified. 
Then a set of equivalent constant-midpoint cycles is computed considering the proper S-N 
relation for each cycle. The distribution of these equivalent cycles is then estimated giving a 
new short-term equivalent load spectrum. This new spectrum is then used to define the number 
of cycles used for the damage fraction for each load and wind speed bin. The main advantage 
of using this method is that the estimation of the equivalent spectrum is statistically more 
robust than tracking the midpoint levels as an independent variable. This advantage results 
because many more load cycles are counted from typical time series load data for each load 
and wind speed bin than when midpoint bins are also tracked separately. 
An additional practical issue that arises in determining the short-term load spectrum is the 
large number of small cycles determined by the rain-flow method. These small cycles can often 
occur at nearby points in time and may therefore be correlated. The small cycles can also 
distort the shape of analytical approximations to the tail of the distribution. It is therefore 
recommended to only consider cycles above a threshold when approximating the tail of the 
short-term distribution. A threshold value of at least the 95th percentile typically works well in 
practice. Lower threshold values may be appropriate if the small cycles have been eliminated 
or if the increased number of data points used for the fitting process is expected to yield 
significant additional statistical reliability.  
For practical wind turbine design applications, it is necessary to estimate the short-term 
equivalent load spectrum from dynamic simulation data and then compute the lifetime damage. 
One method of accomplishing this task is given by the following procedure: 
a) select the reference midpoint level as the mean load level considering all wind speeds; 
b) from the simulation data for a given wind speed, extract the sequence of local maxima and 
minima. The sequences of local maxima and minima from multiple time series for the same 
wind conditions may be concatenated into a single series; 
c) use the rain flow method to identify the midpoint and range for each simulated load cycle; 
d) determine the equivalent range for each load cycle in relation to the selected reference 
midpoint level; 
e) determine an analytical fit for the short-term probability distribution of equivalent load 
cycles,
(
)
T
V
S
F
,
ST
 for the data above the selected threshold. Guidance for one method for 
fitting the distribution may be found in Moriarty and Holley, 2003. The distribution type 
selected should be checked to see if the fit to the data is acceptable and whether there is 
sufficient data for reliable estimation of the behaviour of the tail compared to the data;  
Page 85
– 84 – 
61400-1  IEC:2005 
f) determine the expected number of lifetime cycles in each bin using the data when the load 
bin is below the threshold and the fitted load distribution when the load bin is above the 
threshold. This results in 
, 
     (G.12) 
where 
jk
m
 is the number of simulation fatigue cycles counted in the data for the jth wind 
speed bin and kth load bin below the threshold, 
j
M  is the number of fatigue cycles counted 
in the simulation above the threshold, and 
2
2
2
2
V
V
j
j
j
j
ave
ave
V
V
V
V
jP
e
e
π
π
∆
∆




−
+




−
−








=
−
 is the fraction of 
time the wind speed is in bin j for the assumed Rayleigh wind speed distribution. 
1) Sum the damage using the left hand side of equation (G.9). 
2) Sum the total lifetime damage from all fatigue load cases. 
In using this procedure, care must be taken that  
a)  the resolution of the wind speed and load range bins is sufficient for the desired numerical 
precision, and  
b)  sufficiently large values of load range are used to adequately represent the tail of the long-
term load distribution.  
The first issue may be addressed by approximating the error as half the difference between 
results computed by two different bin resolutions skipping data from every other wind speed or 
load range. An alternative would be to compute the damage summation using the endpoints for 
the bin values instead of the central values to bound the result. The second issue may be 
addressed by progressively increasing the highest load range bin value until a negligible 
increase in the lifetime damage is observed. Note because the ratio Lifetime
T
 is a large 
number, the largest required load bin may be significantly larger than the largest cycle 
observed in the simulation data. This results because the total simulated load time history is 
much smaller than the turbine lifetime, and statistical extrapolation is required to accurately 
estimate damage from the tail of the long-term load distribution.  
G.2 
Reference documents 
Dowling, N.E., Fatigue Failure Predictions for Complicated Stress-strain Histories, J. of 
Materials, v.7, n.1, Mar., 1972, pp. 71-87. 
Matsuishi, M. and Endo, T., Fatigue of Metals Subjected to Varying Stress, Proc. Japan Soc. of 
Mech. Engrs., n. 68-2, 1968, pp. 37-40. 
Miner, M.A. Cumulative Damage in Fatigue, J. of Applied Mech., v.12, 1945, pp. A159-A164. 
Moriarty, P. J. and Holley, W. E., Using Probabilistic Models in Wind Turbine Design, Proc. 
ICASP9, San Francisco, CA, July 6-9, 2003. 
Palmgren, A. , Die Lebensdauer von Kugellagern, Zeitschrift der Vereines Deutscher 
Ingenieure, v. 68, n. 14, 1924, pp. 339-341. 
th
th
if 
 is below the j  threshold
,
,
if 
 is above the j  threshold
2
2
jk
k
jk
j
k
k
j
k
j
k
j
k
m
S
Lifetime
n
P
S
S
T
M
F S
V T
F S
V T
S






≈


∆
∆








+
−
−


















Page 86
61400-1  IEC:2005 
− 85 − 
Bibliography 
The following standards are relevant to the design of wind turbines: 
IEC 60034 (all parts), Rotating electrical machines 
IEC 60038, IEC standard voltages 
IEC 60146 (all parts), Semiconductor converters 
IEC 60173:1964, Colours of the cores of flexible cables and cords 
IEC 60227 (all parts), Polyvinyl chloride insulated cables of rated voltages up to and including 
450/750 V 
IEC 60245 (all parts), Rubber insulated cables of rated voltages up to and including 450/750 V  
IEC 60269 (all parts), Low-voltage fuses 
IEC 60287 (all parts), Electric cables – Calculation of the continuous current rating (100 % load 
factor) 
IEC 60439 (all parts), Low voltage switchgear and control gear assemblies 
IEC 60446:1999, Basic and safety principles for man-machine interface, marking and 
identification- Identification of conductors by colours or numerals 
IEC 60529:1989, Degrees of protection provided by enclosures (IP Code) 
IEC 60617, Graphical symbols for diagrams 
IEC 60755:1983, General requirements for residual current-operated protective devices 
IEC 60898:1995, Electrical accessories – Circuit breakers for overcurrent protection for 
household and similar installations 
IEC 61310-1:1995, Safety of machinery – Indication, marking and actuation – Part 1: 
Requirements for visual, auditory and tactile signals 
IEC 61310-2:1995, Safety of machinery – Indication, marking and actuation – Part 2: 
Requirements for marking 
ISO 3010:2001, Basis for design of structures – Seismic actions on structures 
ISO 8930:1993, General principles on reliability for structures – List of equivalent terms 
___________ 
Page 87
Page 88
Standards Survey
The IEC would like to offer you the best quality standards possible. To make sure that we
continue to meet your needs, your feedback is essential. Would you please take a minute
to answer the questions overleaf and fax them to us at +41 22 919 03 00 or mail them to
the address below. Thank you!
Customer Service Centre (CSC)
International Electrotechnical Commission
3, rue de Varembé
1211 Genève 20
Switzerland
or
Fax to: IEC/CSC at +41 22 919 03 00
Thank you for your contribution to the standards-making process.
Non affrancare
No stamp required
Nicht frankieren
Ne pas affranchir
 A  Prioritaire
RÉPONSE PAYÉE
SUISSE
Customer Service Centre (CSC)
International Electrotechnical Commission
3, rue de Varembé
1211  GENEVA 20
Switzerland
Page 89
Q1
Please report on ONE STANDARD and
ONE STANDARD ONLY. Enter the exact
number of the standard: (e.g. 60601-1-1)
.............................................................
Q2
Please tell us in what capacity(ies) you
bought the standard (tick all that apply).
I am the/a:
purchasing agent
R
librarian
R
researcher
R
design engineer
R
safety engineer
R
testing engineer
R
marketing specialist
R
other.....................................................
Q3
I work for/in/as a:
(tick all that apply)
manufacturing 
R
consultant
R
government
R
test/certification facility
R
public utility
R
education
R
military
R
other.....................................................
Q4  
This standard will be used for:
(tick all that apply)
general reference
R
product research
R
product design/development
R
specifications
R
tenders
R
quality assessment 
R
certification
R
technical documentation 
R
thesis 
R
manufacturing
R
other.....................................................
Q5
This standard meets my needs:
(tick one)
not at all
R
nearly
R
fairly well
R
exactly
R
Q6
If you ticked NOT AT ALL in Question 5
the reason is: (tick all that apply)
standard is out of date
R
standard is incomplete 
R
standard is too academic
R
standard is too superficial
R
title is misleading
R
I made the wrong choice
R
other ....................................................
Q7
Please assess the standard in the
following categories, using
the numbers:
(1) unacceptable,
(2) below average,
(3) average,
(4) above average,
(5) exceptional,
(6) not applicable 
timeliness .............................................
quality of writing....................................
technical contents.................................
logic of arrangement of contents ..........
tables, charts, graphs, figures...............
other ....................................................
Q8
I read/use the: (tick one)
French text only
R
English text only
R
both English and French texts
R
Q9
Please share any comment on any
aspect of the IEC that you would like
us to know:
............................................................
............................................................
............................................................
............................................................
............................................................
............................................................
............................................................
............................................................
............................................................
............................................................
............................................................
............................................................
Page 90
Page 91