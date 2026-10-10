const M0="attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }",m0=`
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec3 uRo; uniform vec3 uTa; uniform float uSel; uniform float uHover; uniform float uMode; uniform vec3 uC1; uniform vec3 uC2;

float sdEll(vec3 p, vec3 r){ float k0 = length(p/r); float k1 = length(p/(r*r)); return k0*(k0-1.0)/max(k1, 1e-5); }
float sdCap(vec3 p, vec3 a, vec3 b, float r1, float r2){
  vec3 pa = p-a, ba = b-a; float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
  return length(pa - ba*h) - mix(r1, r2, h);
}
float smin(float a, float b, float k){ float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0); return mix(b, a, h) - k*h*(1.0-h); }
float smax(float a, float b, float k){ return -smin(-a, -b, k); }

// ---------------- Corps (peau) ----------------
float headPart(vec3 p, vec3 q){
  float d = sdEll(p - vec3(0.0,1.677,-0.008), vec3(0.086,0.103,0.098));
  d = smin(d, sdEll(p - vec3(0.0,1.612,0.028), vec3(0.064,0.074,0.072)), 0.035);
  d = smin(d, length(p - vec3(0.0,1.562,0.05)) - 0.028, 0.03);
  d = smin(d, sdCap(p, vec3(0.0,1.655,0.083), vec3(0.0,1.622,0.1), 0.010, 0.016), 0.015);
  d = smin(d, sdEll(q - vec3(0.088,1.64,-0.004), vec3(0.011,0.027,0.017)), 0.012);
  d = smax(d, -(length(q - vec3(0.031,1.657,0.088)) - 0.017), 0.012);
  d = smin(d, sdCap(p, vec3(0.0,1.46,-0.005), vec3(0.0,1.585,-0.005), 0.054, 0.048), 0.035);
  d = smin(d, sdCap(q, vec3(0.0,1.525,-0.03), vec3(0.15,1.445,-0.012), 0.042, 0.03), 0.05);
  return d;
}
float torsoPart(vec3 p, vec3 q){
  float d = sdEll(p - vec3(0.0,1.30,-0.004), vec3(0.165,0.15,0.104));
  d = smin(d, sdEll(p - vec3(0.0,1.19,0.0), vec3(0.148,0.13,0.098)), 0.05);
  d = smin(d, sdEll(q - vec3(0.072,1.305,0.052), vec3(0.074,0.052,0.05)), 0.035);
  d = smin(d, sdEll(p - vec3(0.0,1.06,0.012), vec3(0.128,0.14,0.094)), 0.06);
  d = smin(d, sdEll(p - vec3(0.0,0.935,0.0), vec3(0.152,0.092,0.098)), 0.05);
  d = smin(d, sdEll(q - vec3(0.07,0.895,-0.048), vec3(0.078,0.085,0.07)), 0.04);
  d = smin(d, length(q - vec3(0.188,1.402,-0.004)) - 0.056, 0.04);
  d = smin(d, sdCap(q, vec3(0.2,1.38,-0.006), vec3(0.234,1.10,-0.02), 0.045, 0.034), 0.03);
  d = smin(d, sdEll(q - vec3(0.214,1.255,0.012), vec3(0.034,0.07,0.034)), 0.025);
  d = smin(d, sdCap(q, vec3(0.234,1.10,-0.02), vec3(0.258,0.865,0.03), 0.036, 0.024), 0.02);
  d = smin(d, sdEll(q - vec3(0.24,1.035,-0.002), vec3(0.033,0.062,0.031)), 0.02);
  d = smin(d, sdEll(q - vec3(0.266,0.808,0.036), vec3(0.021,0.044,0.013)), 0.016);
  for (int i = 0; i < 4; i++) {
    float fz = 0.018 + float(i)*0.0105;
    d = smin(d, sdCap(q, vec3(0.267,0.775,fz), vec3(0.27,0.712 + abs(float(i)-1.4)*0.012,fz + 0.004), 0.0072, 0.0058), 0.008);
  }
  d = smin(d, sdCap(q, vec3(0.262,0.825,0.05), vec3(0.258,0.778,0.068), 0.009, 0.007), 0.01);
  return d;
}
float legPart(vec3 p, vec3 q){
  float d = sdEll(p - vec3(0.0,0.935,0.0), vec3(0.152,0.092,0.098));
  d = smin(d, sdEll(q - vec3(0.07,0.895,-0.048), vec3(0.078,0.085,0.07)), 0.04);
  d = smin(d, sdCap(q, vec3(0.084,0.90,0.0), vec3(0.096,0.505,0.012), 0.078, 0.05), 0.05);
  d = smin(d, sdEll(q - vec3(0.092,0.72,0.028), vec3(0.058,0.12,0.05)), 0.04);
  d = smin(d, length(q - vec3(0.097,0.49,0.02)) - 0.047, 0.03);
  d = smin(d, sdCap(q, vec3(0.097,0.48,0.004), vec3(0.1,0.085,-0.01), 0.044, 0.029), 0.025);
  d = smin(d, sdEll(q - vec3(0.1,0.335,-0.03), vec3(0.044,0.1,0.044)), 0.03);
  d = smin(d, length(q - vec3(0.1,0.075,-0.01)) - 0.03, 0.02);
  d = smin(d, sdEll(q - vec3(0.104,0.03,0.04), vec3(0.04,0.027,0.094)), 0.025);
  return d;
}
float body(vec3 p){
  float bound = sdCap(p, vec3(0.0,0.02,0.0), vec3(0.0,1.76,0.0), 0.34, 0.34);
  if (bound > 0.06) return bound;
  vec3 q = vec3(abs(p.x), p.y, p.z);
  float d = 1e3;
  if (p.y > 1.36) d = headPart(p, q);
  if (p.y > 0.66 && p.y < 1.62) d = smin(d, torsoPart(p, q), 0.04);
  if (p.y < 1.02) d = smin(d, legPart(p, q), 0.04);
  return d;
}

// ---------------- Organes ----------------
// r\xE9gions : 1 t\xEAte 2 gorge 3 poitrine 4 ventre 5 bas-ventre 6 dos/reins 7 membres
vec2 organs(vec3 p){
  vec3 q = vec3(abs(p.x), p.y, p.z);
  vec2 r = vec2(1e3, 0.0);
  if (p.y > 1.52) {
    float br = sdEll(q - vec3(0.033,1.69,-0.012), vec3(0.042,0.054,0.079)) + 0.0035*sin(p.x*130.0)*sin(p.y*120.0)*sin(p.z*110.0);
    br = min(br, sdEll(p - vec3(0.0,1.633,-0.058), vec3(0.048,0.024,0.03)));
    r = vec2(br, 1.0);
  }
  if (p.y > 1.36 && p.y < 1.6) {
    float t = sdCap(p, vec3(0.0,1.37,0.022), vec3(0.0,1.53,0.02), 0.011, 0.012) + 0.0018*sin(p.y*300.0);
    if (t < r.x) r = vec2(t, 2.0);
  }
  if (p.y > 0.8 && p.y < 1.45) {
    float beat = 1.0 + 0.07*sin(uTime*7.0)*smoothstep(0.6,1.0,sin(uTime*3.5));
    float lu = sdEll(q - vec3(0.068,1.28,-0.006), vec3(0.058,0.108,0.06));
    lu = smax(lu, -(length(p - vec3(0.032,1.215,0.05)) - 0.052), 0.02);
    if (lu < r.x) r = vec2(lu, 3.0);
    vec3 hp = p - vec3(0.022,1.228,0.042); float a = -0.55; hp.xy = mat2(cos(a),-sin(a),sin(a),cos(a))*hp.xy;
    float he = sdEll(hp/beat, vec3(0.04,0.054,0.037))*beat;
    he = min(he, sdCap(p, vec3(0.006,1.262,0.03), vec3(0.004,1.33,0.008), 0.012, 0.011));
    if (he < r.x) r = vec2(he, 3.5);
    float li = sdEll(p - vec3(-0.048,1.115,0.03), vec3(0.085,0.046,0.062));
    if (li < r.x) r = vec2(li, 4.2);
    float st = smin(sdEll(p - vec3(0.058,1.10,0.034), vec3(0.048,0.034,0.034)), sdEll(p - vec3(0.03,1.07,0.042), vec3(0.04,0.024,0.03)), 0.02);
    if (st < r.x) r = vec2(st, 4.0);
    float lg = min(min(sdCap(p, vec3(-0.086,0.93,0.03), vec3(-0.086,1.03,0.032), 0.016, 0.016), sdCap(p, vec3(-0.086,1.035,0.036), vec3(0.086,1.035,0.036), 0.016, 0.016)), sdCap(p, vec3(0.086,1.03,0.032), vec3(0.078,0.92,0.03), 0.015, 0.014));
    lg += 0.003*sin((p.x+p.y)*170.0);
    if (lg < r.x) r = vec2(lg, 4.6);
    float si = sdEll(p - vec3(0.0,0.975,0.042), vec3(0.068,0.05,0.038)) + 0.006*sin(p.x*150.0+p.y*60.0)*sin(p.y*140.0-p.z*50.0);
    if (si < r.x) r = vec2(si, 4.5);
    float ki = sdEll(q - vec3(0.062,1.035,-0.056), vec3(0.021,0.039,0.017));
    if (ki < r.x) r = vec2(ki, 6.0);
    float bl = sdEll(p - vec3(0.0,0.885,0.042), vec3(0.03,0.026,0.026));
    if (bl < r.x) r = vec2(bl, 5.0);
  }
  return r;
}

// ---------------- Squelette ----------------
float skeleton(vec3 p){
  vec3 q = vec3(abs(p.x), p.y, p.z);
  float d = 1e3;
  if (p.y > 1.52) {
    d = abs(sdEll(p - vec3(0.0,1.677,-0.008), vec3(0.079,0.096,0.09))) - 0.0045;
    d = smax(d, -(length(q - vec3(0.03,1.655,0.08)) - 0.02), 0.006);
    d = min(d, max(abs(sdEll(p - vec3(0.0,1.598,0.024), vec3(0.054,0.042,0.06))) - 0.004, p.y - 1.605));
  }
  d = min(d, sdCap(p, vec3(0.0,0.95,-0.07), vec3(0.0,1.585,-0.045), 0.012, 0.009) + 0.0035*sin(p.y*190.0));
  if (p.y > 1.05 && p.y < 1.46) {
    float rib = abs(sdEll(p - vec3(0.0,1.245,0.0), vec3(0.134,0.152,0.09))) - 0.0042;
    float stripes = abs(fract((p.y + 0.22*p.z)*27.0) - 0.5)/27.0 - 0.0062;
    rib = max(rib, stripes);
    rib = max(rib, abs(p.y - 1.255) - 0.15);
    rib = max(rib, -(0.016 - abs(p.x)) * step(0.03, p.z));
    d = min(d, rib);
    d = min(d, sdCap(p, vec3(0.0,1.18,0.092), vec3(0.0,1.37,0.098), 0.012, 0.01));
    d = min(d, sdCap(q, vec3(0.012,1.415,0.062), vec3(0.168,1.432,0.0), 0.0085, 0.007));
  }
  if (p.y > 0.82 && p.y < 1.02) {
    float pel = max(abs(sdEll(p - vec3(0.0,0.94,-0.012), vec3(0.125,0.068,0.078))) - 0.0035, p.y - 0.99);
    pel = max(pel, -max(0.042 - abs(p.x), p.y - 0.905));
    pel = max(pel, -(sdEll(q - vec3(0.06,0.9,0.05), vec3(0.03,0.025,0.06))));
    d = min(d, pel);
  }
  d = min(d, sdCap(q, vec3(0.205,1.395,-0.005), vec3(0.234,1.11,-0.02), 0.012, 0.009));
  d = min(d, sdCap(q, vec3(0.236,1.09,-0.026), vec3(0.258,0.87,0.022), 0.0075, 0.006));
  d = min(d, sdCap(q, vec3(0.238,1.09,-0.012), vec3(0.262,0.87,0.04), 0.0068, 0.006));
  d = min(d, length(q - vec3(0.08,0.915,0.0)) - 0.02);
  d = min(d, sdCap(q, vec3(0.08,0.915,0.0), vec3(0.097,0.51,0.012), 0.013, 0.011));
  d = min(d, length(q - vec3(0.098,0.49,0.062)) - 0.014);
  d = min(d, sdCap(q, vec3(0.097,0.47,0.006), vec3(0.1,0.09,-0.008), 0.011, 0.009));
  d = min(d, sdCap(q, vec3(0.113,0.46,-0.012), vec3(0.113,0.1,-0.016), 0.0055, 0.005));
  return d;
}

vec3 organColor(float id){
  if (id < 1.5) return vec3(0.95,0.62,0.92);
  if (id < 2.5) return vec3(0.55,0.88,1.0);
  if (id < 3.2) return vec3(1.0,0.55,0.62);
  if (id < 3.7) return vec3(1.0,0.22,0.3);
  if (id < 4.1) return vec3(1.0,0.72,0.42);
  if (id < 4.3) return vec3(0.85,0.32,0.28);
  if (id < 4.55) return vec3(1.0,0.62,0.5);
  if (id < 4.7) return vec3(0.95,0.5,0.62);
  if (id < 5.5) return vec3(1.0,0.86,0.4);
  return vec3(0.9,0.3,0.38);
}
float regionOf(float id){ return id >= 6.0 ? 6.0 : (id >= 4.0 && id < 5.0 ? 4.0 : floor(id + 0.01)); }

vec3 nrm(vec3 p){
  vec2 e = vec2(0.0012, 0.0);
  return normalize(vec3(body(p+e.xyy)-body(p-e.xyy), body(p+e.yxy)-body(p-e.yxy), body(p+e.yyx)-body(p-e.yyx)));
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float line(float v, float w){ return smoothstep(w, 0.0, abs(fract(v) - 0.5) - (0.5 - w)); }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  vec3 ww = normalize(uTa - uRo), uu = normalize(cross(ww, vec3(0.0,1.0,0.0))), vv = cross(uu, ww);
  vec3 rd = normalize(uv.x*uu + uv.y*vv + 1.9*ww);
  vec3 cyan = uC1, violet = uC2;
  vec3 col = vec3(0.0);

  // Lueur douce sous les pieds (sans anneau autour du corps)
  if (rd.y < 0.0) {
    float tp = -uRo.y / rd.y; vec3 pp = uRo + rd*tp; float rr = length(pp.xz);
    col += mix(cyan, violet, 0.5) * 0.10 * smoothstep(0.45,0.0,rr);
  }

  float t = 0.0; bool hit = false;
  for (int i = 0; i < 110; i++) {
    vec3 p = uRo + rd*t; float d = body(p);
    if (d < 0.0006) { hit = true; break; }
    t += d * 0.92; if (t > 9.0) break;
  }
  if (hit) {
    vec3 p = uRo + rd*t; vec3 n = nrm(p);
    float ndv = max(dot(n, -rd), 0.0);
    float fres = pow(1.0 - ndv, 2.4);
    vec3 L = normalize(vec3(0.5, 0.8, 0.6));
    float spec = pow(max(dot(reflect(rd, n), L), 0.0), 36.0);
    float diff = max(dot(n, L), 0.0);
    float skinA = uMode < 0.5 ? 1.0 : 0.45;
    // Maillage anatomique : lignes horizontales et m\xE9ridiens
    float lat = line(p.y*48.0, 0.06);
    float lon = line(atan(p.z, p.x)*5.0/3.1416 + 0.5, 0.05) * smoothstep(0.2, 0.6, ndv);
    float beamY = 0.9 + 0.95*sin(uTime*0.55);
    float beam = exp(-abs(p.y - beamY)*44.0);
    vec3 tint = mix(cyan, violet, smoothstep(0.1, 1.9, p.y + 0.2*n.x) * 0.55);
    vec3 shell = tint * (0.035 + fres*1.5 + diff*0.05 + (lat + lon)*0.09*(0.4 + fres)) * skinA;
    shell += vec3(0.85,0.97,1.0) * (spec*0.35*skinA + beam*0.45);

    // Int\xE9rieur : organes et squelette en volume
    vec3 inner = vec3(0.0); float tt = 0.0;
    float orgK = uMode > 1.5 ? 0.35 : (uMode > 0.5 ? 1.8 : 1.0);
    float bonK = uMode > 1.5 ? 2.2 : (uMode > 0.5 ? 0.25 : 0.5);
    for (int j = 0; j < 40; j++) {
      vec3 q = p + rd*tt;
      vec2 o = organs(q);
      float reg = regionOf(o.y);
      float selB = (abs(reg - uSel) < 0.5 ? 2.4 : 1.0) * (abs(reg - uHover) < 0.5 ? 1.5 : 1.0);
      float dens = exp(-max(o.x, 0.0)*85.0) * (o.x < 0.0 ? 1.4 : 1.0);
      inner += organColor(o.y) * dens * 0.05 * selB * orgK;
      float sk = skeleton(q);
      inner += vec3(0.85,0.95,1.0) * exp(-max(sk, 0.0)*260.0) * 0.045 * bonK;
      tt += 0.0095;
      if (body(q) > 0.003) break;
    }
    col += shell + inner;
    // Effet hologramme : fines lignes de balayage et reflet froid sur les bords
    col *= 0.9 + 0.1 * sin(p.y * 260.0 - uTime * 2.0);
    col += mix(cyan, violet, 0.35) * pow(fres, 3.0) * 0.08;

    if (uSel > 0.5) {
      float zone = 0.0;
      if (abs(uSel-1.0)<0.5) zone = smoothstep(1.5,1.56,p.y);
      else if (abs(uSel-2.0)<0.5) zone = smoothstep(1.39,1.43,p.y)*smoothstep(1.58,1.53,p.y)*smoothstep(0.11,0.08,abs(p.x));
      else if (abs(uSel-3.0)<0.5) zone = smoothstep(1.12,1.17,p.y)*smoothstep(1.45,1.40,p.y)*smoothstep(0.21,0.17,abs(p.x))*smoothstep(-0.04,0.0,p.z);
      else if (abs(uSel-4.0)<0.5) zone = smoothstep(0.94,0.99,p.y)*smoothstep(1.17,1.12,p.y)*smoothstep(0.19,0.15,abs(p.x))*smoothstep(-0.04,0.0,p.z);
      else if (abs(uSel-5.0)<0.5) zone = smoothstep(0.76,0.84,p.y)*smoothstep(0.99,0.94,p.y)*smoothstep(0.19,0.15,abs(p.x))*smoothstep(-0.04,0.0,p.z);
      else if (abs(uSel-6.0)<0.5) zone = smoothstep(0.84,0.9,p.y)*smoothstep(1.48,1.43,p.y)*smoothstep(0.21,0.17,abs(p.x))*smoothstep(0.0,-0.04,p.z);
      else if (abs(uSel-7.0)<0.5) zone = max(smoothstep(0.17,0.2,abs(p.x))*step(0.7,p.y)*step(p.y,1.44), smoothstep(0.82,0.78,p.y)*step(0.015,abs(p.x)));
      col += cyan * zone * (0.22 + 0.18*sin(uTime*4.0)) * (0.4 + fres);
    }
  }

  for (int k = 0; k < 16; k++) {
    float fk = float(k);
    vec3 mp = vec3(sin(fk*3.7 + uTime*0.21)*0.6, mod(fk*0.15 + uTime*0.045, 1.95), cos(fk*2.3 + uTime*0.17)*0.6);
    vec3 w = mp - uRo; float along = dot(w, rd);
    float dist = length(w - rd*along);
    col += mix(cyan, violet, fract(fk*0.37)) * 0.000018 / (dist*dist + 0.00003) * smoothstep(0.0,0.2,mp.y) * smoothstep(1.95,1.6,mp.y);
  }

  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.012;
  col = 1.0 - exp(-col * 1.32);
  col = pow(col, vec3(0.95));
  float a = clamp(max(col.r, max(col.g, col.b)) * 1.25, 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}`,L=(l,r,c)=>Math.hypot(l,r,c);function k(l,r,c,d,p,i){const a=L(l/d,r/p,c/i),n=L(l/(d*d),r/(p*p),c/(i*i));return a*(a-1)/Math.max(n,1e-5)}function z(l,r,c,d,p){const i=[l[0]-r[0],l[1]-r[1],l[2]-r[2]],a=[c[0]-r[0],c[1]-r[1],c[2]-r[2]],n=Math.min(1,Math.max(0,(i[0]*a[0]+i[1]*a[1]+i[2]*a[2])/(a[0]**2+a[1]**2+a[2]**2)));return L(i[0]-a[0]*n,i[1]-a[1]*n,i[2]-a[2]*n)-(d+(p-d)*n)}const b=(l,r,c)=>{const d=Math.min(1,Math.max(0,.5+.5*(r-l)/c));return r+(l-r)*d-c*d*(1-d)};function C0(l,r,c){const d=[l,r,c],p=[Math.abs(l),r,c],i=p[0];let a=k(l,r-1.677,c+.008,.086,.103,.098);return a=b(a,k(l,r-1.612,c-.028,.064,.074,.072),.035),a=b(a,z(d,[0,1.46,-.005],[0,1.585,-.005],.054,.048),.035),a=b(a,z(p,[0,1.525,-.03],[.15,1.445,-.012],.042,.03),.05),a=b(a,k(l,r-1.3,c+.004,.165,.15,.104),.05),a=b(a,k(l,r-1.19,c,.148,.13,.098),.05),a=b(a,k(l,r-1.06,c-.012,.128,.14,.094),.06),a=b(a,k(l,r-.935,c,.152,.092,.098),.05),a=b(a,L(i-.188,r-1.402,c+.004)-.056,.04),a=b(a,z(p,[.2,1.38,-.006],[.234,1.1,-.02],.045,.034),.03),a=b(a,z(p,[.234,1.1,-.02],[.258,.865,.03],.036,.024),.02),a=b(a,k(i-.266,r-.79,c-.036,.024,.07,.02),.016),a=b(a,z(p,[.084,.9,0],[.096,.505,.012],.078,.05),.05),a=b(a,z(p,[.097,.48,.004],[.1,.085,-.01],.044,.029),.025),a=b(a,k(i-.1,r-.335,c+.03,.044,.1,.044),.03),a=b(a,k(i-.104,r-.03,c-.04,.04,.027,.094),.025),a}export const REGION_IDS={tete:1,gorge:2,poitrine:3,ventre:4,basventre:5,dos:6,membres:7};const k0=Object.fromEntries(Object.entries(REGION_IDS).map(([l,r])=>[r,l]));function A0(l,r,c){const d=Math.abs(l);return r>1.555?"tete":r>1.43&&d<.1?"gorge":d>.185&&r>.7&&r<1.44||r<.8?"membres":c<-.025&&r>.84&&r<1.47?"dos":r>1.15?"poitrine":r>.965?"ventre":"basventre"}export const PINS=[{r:"tete",p:[0,1.7,.1],n:[0,.3,1],label:"T\xEAte"},{r:"gorge",p:[0,1.49,.05],n:[0,0,1],label:"Gorge"},{r:"poitrine",p:[-.07,1.29,.1],n:[0,0,1],label:"Poitrine"},{r:"ventre",p:[0,1.06,.1],n:[0,0,1],label:"Ventre"},{r:"basventre",p:[0,.89,.095],n:[0,0,1],label:"Bas-ventre"},{r:"dos",p:[0,1.15,-.1],n:[0,0,-1],label:"Dos"},{r:"membres",p:[.24,1.1,0],n:[1,0,.3],label:"Bras"},{r:"membres",p:[-.1,.42,.04],n:[-.2,0,1],label:"Jambes"}];export function webglAvailable(){try{const l=document.createElement("canvas");return!!(l.getContext("webgl")||l.getContext("experimental-webgl"))}catch{return!1}}export function createBody3D(l,{onPick:r,onReady:c,lite:d=!1,onDemand:p=d}={}){const i=document.createElement("canvas");i.className="holo-canvas",i.setAttribute("role","img"),i.setAttribute("aria-label","Corps humain en 3D. Touche une zone pour voir les probl\xE8mes possibles."),l.append(i);const a=document.createElement("div");a.className="holo-pins",l.append(a);const n=i.getContext("webgl",{premultipliedAlpha:!1,antialias:!1,alpha:!0,powerPreference:"high-performance"});if(!n)return null;const W=(e,s)=>{const o=n.createShader(e);if(n.shaderSource(o,s),n.compileShader(o),!n.getShaderParameter(o,n.COMPILE_STATUS))throw new Error(n.getShaderInfoLog(o));return o},u0=m0.replace("i < 110","i < 70").replace("j < 40","j < 22").replace("tt += 0.0095","tt += 0.017").replace("k < 16","k < 5"),h0=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,h0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);function J(e){const s=n.createProgram();if(n.attachShader(s,W(n.VERTEX_SHADER,M0)),n.attachShader(s,W(n.FRAGMENT_SHADER,e)),n.linkProgram(s),!n.getProgramParameter(s,n.LINK_STATUS))throw new Error("link");const o=u=>n.getUniformLocation(s,u);return{prog:s,loc:n.getAttribLocation(s,"p"),u:{res:o("uRes"),time:o("uTime"),ro:o("uRo"),ta:o("uTa"),sel:o("uSel"),hover:o("uHover"),mode:o("uMode"),c1:o("uC1"),c2:o("uC2")}}}let B,j;try{B=J(u0),j=d?B:J(m0)}catch(e){return console.warn(e),i.remove(),a.remove(),null}let Q=null,E=null;const V=e=>{Q!==e&&(Q=e,E=e.u,n.useProgram(e.prog),n.enableVertexAttribArray(e.loc),n.vertexAttribPointer(e.loc,2,n.FLOAT,!1,0,0))};V(p?B:j);const Z=(e,s)=>(e=(e||"").trim().replace("#",""),e.length!==6?s:[0,2,4].map(o=>parseInt(e.slice(o,o+2),16)/255)),e0=getComputedStyle(document.documentElement);let y0=Z(e0.getPropertyValue("--holo1"),[.36,.91,1]),b0=Z(e0.getPropertyValue("--holo2"),[.64,.55,1]);const x=matchMedia("(max-width: 700px)").matches,F=x?{dist:4.9,ty:.95}:{dist:4.2,ty:.98},X=d?x?.6:.75:x?.85:1,t={tx:0,yaw:.35,pitch:.08,dist:F.dist,ty:F.ty,auto:!0,sel:0,hover:0,scale:d?x?.5:.65:x?.7:.85,vYaw:0,mode:1};let O=0,H=0,q=!0,h=0,g0=performance.now(),N=0,R0=0;const A=[];function I(){const e=l.getBoundingClientRect(),s=Math.min(window.devicePixelRatio||1,2.5),o=Math.max(s*t.scale,.7);O=Math.max(2,Math.round(e.width*o)),H=Math.max(2,Math.round(e.height*o)),i.width=O,i.height=H,i.style.width=e.width+"px",i.style.height=e.height+"px",n.viewport(0,0,O,H)}const t0=new ResizeObserver(()=>{I(),p&&(t.dirty=!0,S=!1,q&&!h&&(h=requestAnimationFrame(T)))});t0.observe(l),I();const o0=()=>{const e=Math.cos(t.pitch),s=Math.cos(t.yaw)*t.tx,o=-Math.sin(t.yaw)*t.tx;return{ro:[s+Math.sin(t.yaw)*e*t.dist,t.ty+Math.sin(t.pitch)*t.dist,o+Math.cos(t.yaw)*e*t.dist],ta:[s,t.ty,o]}};function s0(){const{ro:e,ta:s}=o0();let o=[s[0]-e[0],s[1]-e[1],s[2]-e[2]];const u=L(...o);o=o.map(m=>m/u);let f=[-o[2],0,o[0]];const v=L(...f);f=f.map(m=>m/v);const M=[f[1]*o[2]-f[2]*o[1],f[2]*o[0]-f[0]*o[2],f[0]*o[1]-f[1]*o[0]];return{ro:e,ww:o,uu:f,vv:M}}function a0(e,s){const o=i.getBoundingClientRect(),u=(e-o.left-o.width/2)/o.height,f=-(s-o.top-o.height/2)/o.height,{ro:v,ww:M,uu:m,vv:$}=s0();let C=[0,1,2].map(g=>u*m[g]+f*$[g]+1.9*M[g]);const D=L(...C);C=C.map(g=>g/D);let P=0;for(let g=0;g<140;g++){const Y=v[0]+C[0]*P,p0=v[1]+C[1]*P,f0=v[2]+C[2]*P,v0=C0(Y,p0,f0);if(v0<.002)return A0(Y,p0,f0);if(P+=v0*.9,P>9)break}return null}const x0=PINS.map(e=>{const s=document.createElement("button");return s.type="button",s.className="pin",s.dataset.r=e.r,s.setAttribute("aria-label",e.label),s.innerHTML=`<span class="pin-dot"></span><span class="pin-label">${e.label}</span>`,s.addEventListener("click",o=>{o.stopPropagation(),G(e.r),r?.(e.r)}),a.append(s),s});function w0(){const e=l.getBoundingClientRect(),{ro:s,ww:o,uu:u,vv:f}=s0();PINS.forEach((v,M)=>{const m=[v.p[0]-s[0],v.p[1]-s[1],v.p[2]-s[2]],$=m[0]*o[0]+m[1]*o[1]+m[2]*o[2],C=(m[0]*u[0]+m[1]*u[1]+m[2]*u[2])/$*1.9,D=(m[0]*f[0]+m[1]*f[1]+m[2]*f[2])/$*1.9,P=-(v.n[0]*o[0]+v.n[1]*o[1]+v.n[2]*o[2]),g=x0[M];g.style.transform=`translate(${e.width/2+C*e.height}px, ${e.height/2-D*e.height}px)`;const Y=P>.15;g.classList.toggle("hidden",!Y),g.classList.toggle("on",k0[t.sel]===v.r),g.tabIndex=Y?0:-1,g.classList.toggle("right",C>.02)})}let y=null;const R=new Map;i.addEventListener("pointerdown",e=>{i.setPointerCapture(e.pointerId),R.set(e.pointerId,{x:e.clientX,y:e.clientY}),y={x:e.clientX,y:e.clientY,moved:0,yaw:t.yaw,pitch:t.pitch,t:performance.now()},t.auto=!1,N=performance.now()}),i.addEventListener("pointermove",e=>{if(R.has(e.pointerId)){const s=R.get(e.pointerId);if(R.set(e.pointerId,{x:e.clientX,y:e.clientY}),R.size===2){const[o,u]=[...R.values()],f=[...R.entries()].find(([M])=>M!==e.pointerId)[1],v=Math.hypot(s.x-f.x,s.y-f.y)/Math.max(1,Math.hypot(o.x-u.x,o.y-u.y));t.dist=Math.min(4.8,Math.max(1.2,t.dist*v)),y&&(y.moved=99);return}}if(y){const s=e.clientX-y.x,o=e.clientY-y.y;y.moved=Math.max(y.moved,Math.hypot(s,o));const u=y.yaw-s*.008;t.vYaw=u-t.yaw,t.yaw=u,t.pitch=Math.min(.7,Math.max(-.35,y.pitch+o*.004))}else if(e.pointerType==="mouse"){const s=a0(e.clientX,e.clientY);t.hover=s?REGION_IDS[s]:0,i.style.cursor=s?"pointer":"grab"}});const n0=e=>{if(R.delete(e.pointerId),y&&y.moved<6&&performance.now()-y.t<500){const s=a0(e.clientX,e.clientY);s&&(G(s),r?.(s))}y=null,N=performance.now()};for(const e of["pointerdown","pointermove","wheel","pointerup"])i.addEventListener(e,()=>U(),{passive:!0});i.addEventListener("pointerup",n0),i.addEventListener("pointercancel",n0),i.addEventListener("pointerleave",()=>{t.hover=0}),i.addEventListener("wheel",e=>{e.preventDefault(),t.dist=Math.min(4.8,Math.max(1.2,t.dist*(1+e.deltaY*.001)))},{passive:!1});const E0=(e,s)=>{const o=Math.round((e-s)/(Math.PI*2));return s+o*Math.PI*2};let w=null;function r0(e){U(),w={from:{yaw:t.yaw,ty:t.ty,dist:t.dist,tx:t.tx},to:{tx:0,...e},t:performance.now()}}function G(e){t.sel=e&&REGION_IDS[e]||0;const s={tete:1.6,gorge:1.48,poitrine:1.27,ventre:1.06,basventre:.92,dos:1.15,membres:.95},o=e&&e!=="membres";r0({yaw:E0(t.yaw,e==="dos"?Math.PI:0),ty:(s[e]??F.ty)-(x&&e?.3:0),dist:o?x?2.6:2.3:F.dist,tx:!x&&e?205/l.getBoundingClientRect().height*(o?2.3:F.dist)/1.9:0}),t.auto=!1,N=performance.now()}let i0=0,l0="",_=0,S=!1;const c0=x?.4:.55,q0=d?x?.62:.8:x?.72:.9;p&&(t.scale=c0,t.dirty=!0);function U(){p&&(_=0,S&&(S=!1,t.scale=c0,I()),q&&!h&&(h=requestAnimationFrame(T)))}function T(e){if(h=0,!!q){if(p){if(!(w||y||Math.abs(t.vYaw)>5e-4||t.dirty)){_||(_=e),e-_>220&&!S&&(S=!0,t.scale=q0,I(),V(j),K(e),V(B)),S||(h=requestAnimationFrame(T));return}if(_=0,t.dirty=!1,h=requestAnimationFrame(T),e-i0<33)return;K(e);return}h=requestAnimationFrame(T),K(e)}}function K(e){i0=e;const s=(e-g0)/1e3;if(w){const v=Math.max(0,Math.min(1,(e-w.t)/(w.dur||1e3))),M=1-Math.pow(1-v,3);for(const m of Object.keys(w.to))t[m]=w.from[m]+(w.to[m]-w.from[m])*M;v>=1&&(w=null)}else y||(Math.abs(t.vYaw)>5e-4&&(t.yaw+=t.vYaw,t.vYaw*=.93),!p&&!t.auto&&e-N>6e3&&!t.sel&&(t.auto=!0),t.auto&&!p&&(t.yaw+=.003));const{ro:o,ta:u}=o0();n.uniform2f(E.res,O,H),n.uniform1f(E.time,s),n.uniform3f(E.ro,...o),n.uniform3f(E.ta,...u),n.uniform1f(E.sel,t.sel),n.uniform1f(E.hover,t.hover),n.uniform1f(E.mode,t.mode),n.uniform3f(E.c1,...y0),n.uniform3f(E.c2,...b0),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.drawArrays(n.TRIANGLES,0,3);const f=`${t.yaw.toFixed(3)}|${t.pitch.toFixed(3)}|${t.dist.toFixed(3)}|${t.ty.toFixed(3)}|${t.tx.toFixed(3)}|${t.sel}`;for(f!==l0&&(w0(),l0=f),A.push(e);A.length&&e-A[0]>1500;)A.shift();if(!p&&A.length>12&&s>2){const v=A.length/1.5;d&&v>28&&t.scale>=X,v<(d?22:26)&&t.scale>.35?(t.scale=Math.max(.35,t.scale-.1),I(),A.length=0):v>55&&t.scale<X&&(t.scale=Math.min(X,t.scale+.05),I(),A.length=0)}}if(p){const e=t.yaw;t.yaw=e-1.6,w={from:{yaw:t.yaw,ty:t.ty,dist:t.dist+.8,tx:0},to:{yaw:e,ty:t.ty,dist:t.dist,tx:0},t:performance.now()+150,dur:1700}}h=requestAnimationFrame(T),requestAnimationFrame(()=>c?.());const d0=()=>{document.hidden?(q=!1,cancelAnimationFrame(h),h=0):q||(q=!0,S=!1,h=requestAnimationFrame(T))};return document.addEventListener("visibilitychange",d0),{select:G,setVisible(e){e?!q&&!document.hidden&&(q=!0,S=!1,h=requestAnimationFrame(T)):(q=!1,cancelAnimationFrame(h),h=0)},setMode(e){t.mode=e,t.dirty=!0,U()},reset(){t.sel=0,t.dirty=!0,r0({yaw:t.yaw,ty:F.ty,dist:F.dist}),t.auto=!0},destroy(){q=!1,cancelAnimationFrame(h),t0.disconnect(),document.removeEventListener("visibilitychange",d0),n.getExtension("WEBGL_lose_context")?.loseContext(),i.remove(),a.remove()}}}
