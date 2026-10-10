let D=0;function v(t){const e=(r,i,s,c=".38",d=".32",f=".75")=>`<radialGradient id="${t}${r}" cx="${c}" cy="${d}" r="${f}"><stop offset="0" stop-color="${i}"/><stop offset="1" stop-color="${s}"/></radialGradient>`,l=(r,i,s,c="0",d="1")=>`<linearGradient id="${t}${r}" x1="0" y1="0" x2="${c}" y2="${d}"><stop offset="0" stop-color="${i}"/><stop offset="1" stop-color="${s}"/></linearGradient>`;return`<defs>
    <radialGradient id="${t}bg" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="#1A2B5C"/><stop offset=".65" stop-color="#0C1533"/><stop offset="1" stop-color="#070C1F"/></radialGradient>
    <radialGradient id="${t}hot"><stop offset="0" stop-color="#FF3355" stop-opacity=".9"/><stop offset=".45" stop-color="#FF3355" stop-opacity=".35"/><stop offset="1" stop-color="#FF3355" stop-opacity="0"/></radialGradient>
    <radialGradient id="${t}amb"><stop offset="0" stop-color="#FFB547" stop-opacity=".85"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
    <radialGradient id="${t}cy"><stop offset="0" stop-color="#5BE7FF" stop-opacity=".6"/><stop offset="1" stop-color="#5BE7FF" stop-opacity="0"/></radialGradient>
    ${e("skin","#9A6A4A","#4E2E1C")}
    ${l("skinL","#A0704E","#5A3622","1","1")}
    ${e("heart","#E8606A","#7E1426")}
    ${e("lung","#F6B4BC","#B0566A")}
    ${e("liver","#B9483F","#561716")}
    ${e("stom","#F4B0A4","#B95A55")}
    ${e("gut","#F7C2AE","#C0645A")}
    ${e("kid","#C9545A","#5F1820")}
    ${e("blad","#F6DA92","#B9893A")}
    ${e("brain","#F6CBD2","#B9707F")}
    ${e("uter","#F3A3B6","#A9456A")}
    ${e("ovary","#FAD9C9","#C98C78")}
    ${l("bone","#FFF8EA","#CDBB94","1","1")}
    ${l("disc","#9DB6D9","#4C6A99")}
    ${l("enamel","#FFFFFF","#D7DEE8","1","1")}
    ${l("dentin","#F7E7C4","#D8BE8A")}
    ${e("pulp","#FF8FA0","#B22A47")}
    ${l("gum","#EE9AA3","#B65464")}
    ${e("iris","#7A4A22","#2B1608",".5",".5",".55")}
    ${l("epi","#C08A62","#8E5E3E")}
    ${l("derm","#F2B9AE","#D98C86")}
    ${e("fat","#FFE6A6","#E0B45C")}
    ${l("glass","#E9F6FF","#9CC3DD","1","0")}
    ${l("shirt","#3BA7C9","#1D5E80","1","1")}
    ${l("shirt2","#B48CFF","#5B3FA8","1","1")}
    ${l("pants","#2B3555","#141A2E")}
    ${l("water","#9BE9FF","#3AA8E0")}
    ${l("blood","#E3263F","#8E0F22")}
    <filter id="${t}sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity=".45"/></filter>
    <filter id="${t}soft"><feGaussianBlur stdDeviation="1.2"/></filter>
  </defs>`}function a(t,e,l=[]){const r="a"+ ++D,i=c=>`url(#${r}${c})`,s=l.map(([c,d,f,h="hot"],y)=>`<circle cx="${c}" cy="${d}" r="${f}" fill="${i(h)}" class="pulse" style="animation-delay:${y*.4}s"/>`).join("");return`<svg class="art" viewBox="0 0 200 200" role="img" aria-label="${t}">${v(r)}
  <rect width="200" height="200" fill="${i("bg")}"/>
  <g class="grid">${[40,80,120,160].map(c=>`<line x1="${c}" y1="0" x2="${c}" y2="200"/><line x1="0" y1="${c}" x2="200" y2="${c}"/>`).join("")}</g>
  <g filter="${i("sh")}">${e(i,r)}</g>${s}</svg>`}function C(t,e,l,r,i,s){const c=Math.atan2(r-e,l-t),d=c+Math.PI/2,f=(h,y,u,m)=>`${(h+Math.cos(d)*u*m).toFixed(1)} ${(y+Math.sin(d)*u*m).toFixed(1)}`;return`M${f(t,e,i,1)} L${f(l,r,s,1)} A${s} ${s} 0 0 0 ${f(l,r,s,-1)} L${f(t,e,i,-1)} A${i} ${i} 0 0 0 ${f(t,e,i,1)}Z`}function L(t,e,{shirt:l="shirt",s:r=1,face:i=1}={}){const s=(M,$,w,g,A,B="")=>`<path d="${C(M[0],M[1],$[0],$[1],w*r,g*r)}" fill="${A}" ${B}/>`,c=(M,$,w,g="")=>`<circle cx="${M[0]}" cy="${M[1]}" r="${$*r}" fill="${w}" ${g}/>`,d='style="filter:brightness(.6)"',f=(M,$,w="")=>{const g=Math.atan2($[1]-M[1],$[0]-M[0])+Math.PI/2,A=Math.cos(g)*5*i,B=Math.sin(g)*5*i;return`<ellipse cx="${$[0]+A}" cy="${$[1]+B}" rx="${7*r}" ry="${3.6*r}" transform="rotate(${g*180/Math.PI} ${$[0]+A} ${$[1]+B})" fill="#14141c" ${w}/>`};let h="";e.ground&&(h+=`<ellipse cx="${e.ground[0]}" cy="${e.ground[1]}" rx="${e.ground[2]}" ry="4" fill="#000" opacity=".35"/>`),e.farLeg&&(h+=s(e.hip,e.farLeg[0],8.2,6.6,t("pants"),d)+c(e.farLeg[0],6.4,t("pants"),d)+s(e.farLeg[0],e.farLeg[1],6.4,4.4,t("pants"),d)+f(e.farLeg[0],e.farLeg[1],d)),e.farArm&&(h+=s(e.shoulder,e.farArm[0],5.6,4.6,t(l),d)+s(e.farArm[0],e.farArm[1],4.3,3.4,t("skinL"),d)+c(e.farArm[1],4.4,t("skinL"),d));const y=e.hip[0]-e.shoulder[0],u=e.hip[1]-e.shoulder[1],m=Math.hypot(y,u),x=-u/m,k=y/m,b=[e.shoulder[0]+y*.3+x*13*r*i,e.shoulder[1]+u*.3+k*13*r*i],Z=[e.shoulder[0]+y*.4-x*12*r*i,e.shoulder[1]+u*.4-k*12*r*i];h+=`<path d="M${e.shoulder[0]-x*9*i} ${e.shoulder[1]-k*9*i} Q${Z[0]} ${Z[1]} ${e.hip[0]-x*10*r*i} ${e.hip[1]-k*10*r*i} L${e.hip[0]+x*10*r*i} ${e.hip[1]+k*10*r*i} Q${b[0]} ${b[1]} ${e.shoulder[0]+x*9*i} ${e.shoulder[1]+k*9*i} Z" fill="${t(l)}"/>`,h+=s(e.shoulder,e.hip,11.5,10,t(l)),h+=`<path d="M${e.hip[0]-x*10.5*r} ${e.hip[1]-k*10.5*r} L${e.hip[0]+x*10.5*r} ${e.hip[1]+k*10.5*r}" stroke="#3a2a1a" stroke-width="${3*r}" stroke-linecap="round"/>`,h+=s(e.hip,e.leg[0],8.6,6.9,t("pants"))+c(e.leg[0],6.8,t("pants"))+s(e.leg[0],e.leg[1],6.8,4.6,t("pants")),h+=f(e.leg[0],e.leg[1]);const o=(e.headR||11)*r;h+=s(e.neck||e.shoulder,e.head,4.4,4.2,t("skinL")),h+=`<circle cx="${e.head[0]}" cy="${e.head[1]}" r="${o}" fill="${t("skin")}"/>`;const p=e.head[0],n=e.head[1];return e.faceUp?(h+=`<path d="M${p-o} ${n+1} A${o} ${o} 0 0 1 ${p-o*.2} ${n-o*.98} L${p-o*.5} ${n+o*.3}Z" fill="#17100c"/>`,h+=`<circle cx="${p+o*.2}" cy="${n-o}" r="${o*.22}" fill="${t("skinL")}"/>`):(h+=`<path d="M${p-o*i} ${n+o*.2} C${p-o*1.05*i} ${n-o*.9} ${p+o*.9*i} ${n-o*1.25} ${p+o*.95*i} ${n-o*.35} C${p+o*.5*i} ${n-o*.6} ${p-o*.2*i} ${n-o*.5} ${p-o*.55*i} ${n+o*.15} Z" fill="#17100c"/>`,h+=`<circle cx="${p+o*.98*i}" cy="${n+o*.12}" r="${o*.2}" fill="${t("skinL")}"/>`,h+=`<circle cx="${p+o*.5*i}" cy="${n-o*.08}" r="${o*.09}" fill="#0b0705"/>`,h+=`<ellipse cx="${p-o*.25*i}" cy="${n+o*.12}" rx="${o*.16}" ry="${o*.24}" fill="#3a2214"/>`),h+=`<ellipse cx="${p-o*.3}" cy="${n-o*.35}" rx="${o*.35}" ry="${o*.2}" fill="#fff" opacity=".12"/>`,h+=s(e.shoulder,e.arm[0],6,4.8,t(l))+c(e.arm[0],4.6,t(l))+s(e.arm[0],e.arm[1],4.4,3.5,t("skinL")),h+=`<ellipse cx="${e.arm[1][0]}" cy="${e.arm[1][1]}" rx="${4.8*r}" ry="${4*r}" fill="${t("skinL")}"/>`,h}const F="M70 178 C68 162 64 150 57 140 C45 124 40 104 42 84 C44 50 70 26 104 26 C138 26 160 48 160 76 C160 86 158 92 161 99 L171 115 C173 119 171 122 167 123 L163 124 C164 127 165 131 163 133 C165 137 164 141 159 143 C159 149 157 153 151 154 L137 156 C131 157 129 163 129 178 Z",E="M54 88 C52 60 74 40 104 40 C134 40 152 58 152 80 C152 96 140 106 122 106 C110 106 104 102 94 104 C74 108 56 104 54 88 Z";export const ART={tete:()=>a("Maux de t\xEAte : cr\xE2ne et cerveau",(t,e)=>`
    <path d="${F}" fill="${t("skin")}"/>
    <path d="M151 154 C150 144 152 138 160 134" fill="none" stroke="#2a1810" stroke-width="1.3" opacity=".6"/>
    <ellipse cx="92" cy="118" rx="7.5" ry="12" fill="#3f2416"/>
    <path d="M140 88 C146 86 152 88 156 92" stroke="#1a1210" stroke-width="2.4" fill="none"/>
    <path d="M144 98 C148 96 152 97 155 100" stroke="#1a0f0a" stroke-width="2" fill="none"/>
    <path d="M48 86 C46 54 72 32 104 32 C136 32 158 52 158 80 C158 98 146 110 124 112 C108 114 98 110 86 112 C66 114 50 108 48 86Z" fill="${t("bone")}" opacity=".95"/>
    <clipPath id="${e}cb"><path d="${E}"/></clipPath>
    <path d="${E}" fill="${t("brain")}"/>
    <g clip-path="url(#${e}cb)" fill="none" stroke="#9A4E60" stroke-width="1.6" opacity=".7">
      ${[0,1,2,3,4,5,6].map(l=>`<path d="M${50+l*15} 40 C${60+l*15} 52 ${44+l*15} 62 ${58+l*15} 72 C${70+l*15} 80 ${54+l*15} 92 ${66+l*15} 104"/>`).join("")}
      <path d="M54 72 C70 66 82 76 98 70 C114 64 128 74 150 68"/><path d="M60 92 C76 86 90 96 106 90 C120 86 134 94 148 90"/>
    </g>
    <path d="M100 41 C96 60 102 80 98 104" stroke="#8A3E52" stroke-width="1.4" fill="none" opacity=".5"/>
    <ellipse cx="74" cy="104" rx="16" ry="8" fill="${t("brain")}" stroke="#9A4E60" stroke-width="1"/>
    <path d="M62 104 L86 104 M64 100 L84 100 M65 108 L83 108" stroke="#9A4E60" stroke-width=".9" opacity=".7"/>
    <ellipse cx="118" cy="52" rx="20" ry="7" fill="#fff" opacity=".18"/>`,[[132,66,26],[70,64,20,"amb"]]),yeux:()=>a("\u0152il rouge ou irrit\xE9",(t,e)=>`
    <path d="M8 100 C40 40 160 40 192 100 C160 160 40 160 8 100Z" fill="${t("skin")}"/>
    <clipPath id="${e}ey"><path d="M22 100 C52 62 148 62 178 100 C148 138 52 138 22 100Z"/></clipPath>
    <path d="M22 100 C52 62 148 62 178 100 C148 138 52 138 22 100Z" fill="#FFF4F0"/>
    <g clip-path="url(#${e}ey)">
      <rect x="0" y="0" width="200" height="200" fill="url(#${e}hot)" opacity=".35"/>
      ${[[24,96,62,88,70,100],[26,106,56,112,66,104],[176,96,146,86,136,98],[174,108,148,116,134,106],[40,84,56,80,64,92],[160,118,150,126,138,116]].map(([l,r,i,s,c,d])=>`<path d="M${l} ${r} Q${i} ${s} ${c} ${d}" stroke="#D2263F" stroke-width="1.2" fill="none" opacity=".85"/>`).join("")}
      <circle cx="100" cy="100" r="31" fill="${t("iris")}"/>
      ${Array.from({length:48},(l,r)=>{const i=r/48*Math.PI*2;return`<line x1="${100+Math.cos(i)*13}" y1="${100+Math.sin(i)*13}" x2="${100+Math.cos(i)*30}" y2="${100+Math.sin(i)*30}" stroke="${r%2?"#A8743F":"#4A2810"}" stroke-width=".8" opacity=".7"/>`}).join("")}
      <circle cx="100" cy="100" r="31" fill="none" stroke="#1a0c04" stroke-width="2.5"/>
      <circle cx="100" cy="100" r="13" fill="#050505"/>
      <ellipse cx="90" cy="89" rx="7" ry="5" fill="#fff" opacity=".9"/>
      <path d="M22 100 C52 62 148 62 178 100" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="10"/>
    </g>
    <path d="M22 100 C52 62 148 62 178 100" fill="none" stroke="#1a0f0a" stroke-width="3"/>
    ${Array.from({length:16},(l,r)=>{const i=.12+r*.05,s=22+156*i,c=100-Math.sin(i*Math.PI)*38;return`<path d="M${s} ${c} q${(i-.5)*14} -10 ${(i-.5)*18} -16" stroke="#120a06" stroke-width="1.6" fill="none"/>`}).join("")}`,[[40,100,20],[160,100,20]]),dent:()=>a("Coupe d'une dent : \xE9mail, dentine, pulpe et nerf",t=>`
    <path d="M0 116 C40 108 160 108 200 116 L200 200 L0 200Z" fill="#C9B489" opacity=".55"/>
    <path d="M0 124 C40 116 160 116 200 124 L200 200 L0 200Z" fill="none" stroke="#8D7650" stroke-width=".8" stroke-dasharray="3 3"/>
    <path d="M52 52 C52 30 74 22 88 30 C94 34 106 34 112 30 C126 22 148 30 148 52 C148 76 140 92 136 112 C132 136 132 160 122 182 C118 190 108 188 108 176 C108 160 104 140 100 140 C96 140 92 160 92 176 C92 188 82 190 78 182 C68 160 68 136 64 112 C60 92 52 76 52 52Z" fill="${t("dentin")}"/>
    <path d="M52 52 C52 30 74 22 88 30 C94 34 106 34 112 30 C126 22 148 30 148 52 C148 70 144 82 140 94 C120 86 80 86 60 94 C56 82 52 70 52 52Z" fill="${t("enamel")}"/>
    <path d="M78 58 C78 50 122 50 122 58 L118 96 C114 116 110 136 106 166 L100 168 L94 166 C90 136 86 116 82 96Z" fill="${t("pulp")}"/>
    <path d="M100 60 L100 168 M90 70 C92 90 96 120 96 166 M110 70 C108 90 104 120 104 166" stroke="#FFE1E6" stroke-width="1" fill="none" opacity=".8"/>
    <path d="M0 100 C30 92 50 96 62 110 L64 120 C50 110 24 112 0 118Z M200 100 C170 92 150 96 138 110 L136 120 C150 110 176 112 200 118Z" fill="${t("gum")}"/>
    <path d="M118 36 C126 32 134 40 130 50 C126 58 114 56 114 46 C114 42 116 38 118 36Z" fill="#2B1A12"/>
    <path d="M120 40 C124 38 128 42 126 46" stroke="#5a3a28" fill="none"/>
    <ellipse cx="74" cy="44" rx="10" ry="6" fill="#fff" opacity=".7"/>`,[[100,110,36],[122,46,14,"amb"]]),respiratoire:()=>a("Appareil respiratoire : trach\xE9e, bronches et poumons",t=>`
    <path d="M90 18 L110 18 L110 70 L90 70Z" fill="#E7D9D2"/>
    ${[22,29,36,43,50,57,64].map(e=>`<rect x="89" y="${e}" width="22" height="4" rx="2" fill="#F8EEE8" stroke="#BBA9A0" stroke-width=".6"/>`).join("")}
    <path d="M92 70 C80 70 50 84 38 120 C28 152 36 182 62 184 C80 186 90 172 92 152 C94 128 96 96 92 70Z" fill="${t("lung")}"/>
    <path d="M108 70 C120 70 150 84 162 120 C172 152 164 182 140 184 C126 186 116 178 112 166 C124 156 122 140 110 134 C110 112 106 92 108 70Z" fill="${t("lung")}"/>
    <path d="M44 132 C58 126 72 126 88 118 M44 156 C58 148 74 150 90 140 M156 128 C142 124 128 130 114 124" stroke="#A04A5E" stroke-width="1.2" fill="none" opacity=".7"/>
    <g stroke="#FCE7EA" stroke-linecap="round" fill="none" opacity=".9">
      <path d="M100 70 C96 80 86 86 76 94 C64 104 60 118 56 134" stroke-width="5"/><path d="M100 70 C104 80 114 86 124 94 C134 104 140 118 142 132" stroke-width="5"/>
      <path d="M76 94 C70 110 72 128 70 148 M66 104 C56 110 50 120 46 130 M70 148 C62 156 58 164 54 172 M70 148 C76 158 78 168 80 176" stroke-width="2.5"/>
      <path d="M124 94 C130 110 128 128 132 148 M134 104 C144 110 150 120 154 130 M132 148 C140 156 144 164 148 172 M132 148 C126 158 124 166 122 172" stroke-width="2.5"/>
    </g>
    <ellipse cx="66" cy="104" rx="10" ry="18" fill="#fff" opacity=".18"/><ellipse cx="136" cy="104" rx="10" ry="18" fill="#fff" opacity=".18"/>`,[[100,40,16],[66,140,26,"amb"],[138,140,26,"amb"]]),coeur:()=>a("Le c\u0153ur et ses vaisseaux",t=>`
    <path d="M112 76 C112 46 120 30 140 28 C158 26 168 38 166 56 L154 58 C154 46 148 40 140 41 C128 42 126 56 126 78Z" fill="${t("heart")}"/>
    <path d="M128 34 L128 18 M140 30 L142 16 M152 34 L156 20" stroke="#B92A3A" stroke-width="6" stroke-linecap="round"/>
    <path d="M96 80 C92 62 82 50 66 48 L62 60 C74 62 82 70 84 84Z" fill="#8E5BB0"/>
    <path d="M58 52 L44 48 M60 62 L46 66" stroke="#7B4B9C" stroke-width="5" stroke-linecap="round"/>
    <rect x="70" y="56" width="12" height="40" rx="5" fill="#4C6FD6"/>
    <path d="M72 96 C64 78 82 66 100 72 C118 64 144 72 150 94 C156 122 140 154 112 176 C104 182 96 180 92 170 C76 146 66 122 72 96Z" fill="${t("heart")}"/>
    <path d="M104 74 C100 100 104 140 98 172" stroke="#F2C14E" stroke-width="2" fill="none" opacity=".75"/>
    <path d="M104 92 C118 98 130 112 136 132 M104 120 C92 128 86 140 84 152" stroke="#C8203F" stroke-width="2.4" fill="none"/>
    <path d="M110 84 C124 92 140 104 146 120 M96 106 C86 116 80 128 80 140" stroke="#3B5BDB" stroke-width="1.6" fill="none" opacity=".85"/>
    <ellipse cx="92" cy="96" rx="12" ry="16" fill="#fff" opacity=".22" transform="rotate(-20 92 96)"/>
    <path class="ecg" d="M10 188 L52 188 L60 178 L66 196 L74 160 L82 194 L88 188 L190 188"/>`,[[112,120,40]]),digestif:()=>a("Appareil digestif : foie, estomac et intestins",t=>`
    <path d="M100 8 C100 24 104 36 112 46" stroke="#E79C8F" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M28 58 C50 38 104 40 112 56 C108 76 84 90 56 88 C34 86 22 72 28 58Z" fill="${t("liver")}"/>
    <path d="M60 86 C64 94 72 96 76 90 C78 84 72 80 66 82Z" fill="#5FA35A"/>
    <path d="M108 46 C128 38 158 48 162 70 C166 92 148 106 126 106 C112 106 102 98 106 86 C108 78 116 72 108 46Z" fill="${t("stom")}"/>
    <path d="M118 60 C132 66 140 80 138 94 M126 54 C142 62 150 76 150 90" stroke="#B8564F" stroke-width="1" fill="none" opacity=".6"/>
    <path d="M52 182 L52 122 C52 110 62 106 74 106 L130 106 C142 106 150 112 150 124 L150 170 C150 180 142 186 130 186" fill="none" stroke="${t("gut")}" stroke-width="18" stroke-linecap="round"/>
    <path d="M52 182 L52 122 C52 110 62 106 74 106 L130 106 C142 106 150 112 150 124 L150 170 C150 180 142 186 130 186" fill="none" stroke="#B8604F" stroke-width="18" stroke-dasharray="1.5 9" stroke-linecap="butt" opacity=".55"/>
    <path d="M52 182 C50 190 46 194 42 192" stroke="#E7A08F" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M72 128 C84 118 98 136 110 126 C122 116 132 132 132 126 C134 144 120 140 108 146 C96 152 84 138 74 148 C66 158 82 164 94 162 C106 160 118 172 130 166" stroke="${t("gut")}" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M72 128 C84 118 98 136 110 126 C122 116 132 132 132 126 C134 144 120 140 108 146 C96 152 84 138 74 148 C66 158 82 164 94 162 C106 160 118 172 130 166" stroke="#B8604F" stroke-width="1" fill="none" opacity=".7"/>
    <ellipse cx="54" cy="60" rx="16" ry="6" fill="#fff" opacity=".2"/><ellipse cx="132" cy="62" rx="12" ry="6" fill="#fff" opacity=".25"/>`,[[132,76,26],[100,146,30,"amb"]]),reproducteur:()=>a("Ut\xE9rus, trompes et ovaires",t=>`
    <path d="M80 80 C66 64 46 62 34 72 C26 78 24 88 30 94" stroke="#E79BB0" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M120 80 C134 64 154 62 166 72 C174 78 176 88 170 94" stroke="#E79BB0" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${[-1,1].map(e=>[0,1,2,3,4].map(l=>`<path d="M${100+e*70} 94 q${e*(4-l*2)} ${6+l} ${e*(2-l*3)} ${10+l}" stroke="#E79BB0" stroke-width="2" fill="none" stroke-linecap="round"/>`).join("")).join("")}
    <ellipse cx="46" cy="100" rx="15" ry="10" fill="${t("ovary")}"/><ellipse cx="154" cy="100" rx="15" ry="10" fill="${t("ovary")}"/>
    <circle cx="42" cy="98" r="3.5" fill="#fff" opacity=".7"/><circle cx="50" cy="103" r="2.5" fill="#fff" opacity=".5"/><circle cx="158" cy="98" r="4" fill="#fff" opacity=".7"/>
    <path d="M74 84 C74 62 126 62 126 84 C126 110 114 128 108 138 L108 150 L92 150 L92 138 C86 128 74 110 74 84Z" fill="${t("uter")}"/>
    <path d="M86 86 C86 76 114 76 114 86 C114 104 106 118 100 126 C94 118 86 104 86 86Z" fill="#B23A62" opacity=".8"/>
    <path d="M92 150 L92 186 C92 192 108 192 108 186 L108 150" fill="${t("uter")}" opacity=".85"/>
    <ellipse cx="88" cy="76" rx="9" ry="5" fill="#fff" opacity=".25"/>
    <path d="M100 178 C96 186 96 192 100 194 C104 192 104 186 100 178Z" fill="${t("blood")}"/>`,[[100,100,38]]),urinaire:()=>a("Appareil urinaire : reins, uret\xE8res et vessie",t=>`
    <rect x="94" y="10" width="6" height="150" rx="3" fill="#C8203F" opacity=".7"/><rect x="102" y="10" width="7" height="150" rx="3" fill="#3B5BDB" opacity=".7"/>
    <path d="M54 34 C34 34 26 58 30 80 C34 100 52 104 62 94 C56 84 56 66 66 58 C70 46 66 34 54 34Z" fill="${t("kid")}"/>
    <path d="M146 34 C166 34 174 58 170 80 C166 100 148 104 138 94 C144 84 144 66 134 58 C130 46 134 34 146 34Z" fill="${t("kid")}"/>
    <path d="M60 60 C66 66 66 82 60 88 C56 80 56 68 60 60Z M140 60 C134 66 134 82 140 88 C144 80 144 68 140 60Z" fill="#F2D08A"/>
    <path d="M62 62 L96 66 M62 86 L94 90 M138 62 L104 66 M138 86 L106 90" stroke="#C8203F" stroke-width="2" opacity=".6"/>
    <path d="M62 80 C74 106 82 132 88 150 M138 80 C126 106 118 132 112 150" stroke="#F0C27A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M72 158 C72 138 128 138 128 158 C128 178 116 186 100 186 C84 186 72 178 72 158Z" fill="${t("blad")}"/>
    <path d="M96 186 L96 196 L104 196 L104 186" fill="${t("blad")}"/>
    <ellipse cx="44" cy="50" rx="6" ry="10" fill="#fff" opacity=".22"/><ellipse cx="88" cy="152" rx="10" ry="5" fill="#fff" opacity=".3"/>`,[[100,166,28],[100,196,10,"amb"]]),dos:()=>a("Colonne vert\xE9brale de profil",t=>`
    ${Array.from({length:12},(e,l)=>{const r=l/11,i=92+Math.sin(r*Math.PI*1.6+.4)*12,s=16+l*14.2,c=22+l*1.4;return`<path d="M${i} ${s} l${c} 0 l2 10 l-${c+4} 0 Z" fill="${t("bone")}" rx="3"/>
        <path d="M${i+c} ${s+4} l${12+l*.6} ${5+l*.4}" stroke="${t("bone")}" stroke-width="6" stroke-linecap="round"/>
        <rect x="${i-1}" y="${s+10.5}" width="${c+3}" height="3.5" rx="1.5" fill="${t("disc")}"/>`}).join("")}
    <path d="M70 186 C78 172 120 168 134 180 C128 194 84 198 70 186Z" fill="${t("bone")}"/>
    <path d="M40 30 C34 80 44 130 40 180" stroke="#5BE7FF" stroke-width="1" stroke-dasharray="3 4" fill="none" opacity=".5"/><text x="20" y="20" class="lbl sm">avant</text><text x="160" y="20" class="lbl sm">arri\xE8re</text>`,[[100,150,30]]),peau:()=>a("Coupe de la peau",t=>`
    <path d="M0 60 C40 54 160 64 200 56 L200 82 L0 84Z" fill="${t("epi")}"/>
    <path d="M0 84 L200 82 L200 140 L0 140Z" fill="${t("derm")}"/>
    <path d="M0 140 L200 140 L200 200 L0 200Z" fill="#F7D79A"/>
    ${[[20,160],[52,168],[86,158],[120,170],[154,160],[186,168],[36,188],[104,192],[170,190]].map(([e,l])=>`<ellipse cx="${e}" cy="${l}" rx="17" ry="13" fill="${t("fat")}" stroke="#D7A955" stroke-width=".8"/>`).join("")}
    <path d="M52 20 C54 40 56 60 58 120" stroke="#1a1210" stroke-width="2.2" fill="none"/>
    <path d="M52 86 C46 96 46 114 54 122 C62 126 66 118 64 110 C62 96 60 90 58 86Z" fill="#E59F95" stroke="#B66A62"/>
    <path d="M136 82 L134 112 C128 118 126 126 132 130 C140 134 146 126 142 118 C138 112 146 108 140 104 C134 100 140 94 136 90" stroke="#8F7BD8" stroke-width="2.2" fill="none"/>
    <path d="M0 132 C40 118 70 138 100 126 C130 114 160 134 200 122" stroke="#C8203F" stroke-width="3" fill="none"/>
    <path d="M0 138 C40 126 70 146 100 134 C130 122 160 142 200 130" stroke="#3B5BDB" stroke-width="3" fill="none"/>
    <text x="196" y="74" class="lbl sm" text-anchor="end">\xC9piderme</text><text x="196" y="100" class="lbl sm" text-anchor="end">Derme</text><text x="196" y="156" class="lbl sm" text-anchor="end">Hypoderme</text>`,[[100,72,28]]),brulure:()=>a("Br\xFBlure : refroidir 15 \xE0 20 minutes",t=>`
    <path d="M0 120 C40 112 160 128 200 118 L200 200 L0 200Z" fill="${t("skin")}"/>
    <path d="M58 118 C76 108 126 108 144 120 C128 130 76 132 58 118Z" fill="#E0405A" opacity=".85"/>
    <ellipse cx="86" cy="114" rx="11" ry="7" fill="#FFE3D6" opacity=".85" stroke="#F7B7A8"/><ellipse cx="116" cy="116" rx="8" ry="5.5" fill="#FFE3D6" opacity=".85" stroke="#F7B7A8"/>
    <ellipse cx="83" cy="111" rx="4" ry="2" fill="#fff" opacity=".9"/>
    <path d="M78 14 L122 14 L122 28 L110 28 L110 38 L90 38 L90 28 L78 28Z" fill="${t("bone")}" opacity=".9"/>
    <path d="M90 40 C88 70 84 96 76 114 L124 114 C116 96 112 70 110 40Z" fill="${t("water")}" opacity=".55"/>
    ${[0,1,2,3,4,5].map(e=>`<path class="water" style="animation-delay:${e*.2}s" d="M${92+e*3.4} 42 L${86+e*5.6} 108"/>`).join("")}
    <text x="100" y="172" class="lbl" text-anchor="middle">15\u201320 min \xB7 eau ti\xE8de</text>`,[[100,118,34]]),plaie:()=>a("Coupure : comprimer puis couvrir",t=>`
    <path d="M0 96 C40 86 160 100 200 92 L200 200 L0 200Z" fill="${t("skin")}"/>
    <path d="M68 104 C86 112 112 110 134 102" stroke="#6E0F1E" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M68 104 C86 112 112 110 134 102" stroke="#E3263F" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M90 110 C88 118 88 124 92 126 C96 124 96 118 90 110Z" fill="${t("blood")}"/>
    <g transform="rotate(-6 100 56)">
      <rect x="44" y="36" width="112" height="40" rx="14" fill="#E9C9A6"/>
      ${Array.from({length:10},(e,l)=>`<circle cx="${52+l%5*4}" cy="${44+Math.floor(l/5)*8+8}" r="1" fill="#B8956C"/><circle cx="${136+l%5*4}" cy="${44+Math.floor(l/5)*8+8}" r="1" fill="#B8956C"/>`).join("")}
      <rect x="78" y="42" width="44" height="28" rx="4" fill="#FBFBF7" stroke="#DCD6CA"/>
    </g>
    <path class="arrow" d="M100 6 L100 26 M92 18 L100 28 L108 18"/>`,[[100,106,30]]),allergie:()=>a("Allergie, plaques et piq\xFBre de moustique",t=>`
    <path d="M0 112 C40 104 160 120 200 110 L200 200 L0 200Z" fill="${t("skin")}"/>
    ${[[58,128,13],[88,120,17],[122,126,14],[150,122,10],[100,150,11],[70,156,9],[134,154,12]].map(([e,l,r])=>`<ellipse cx="${e}" cy="${l}" rx="${r}" ry="${r*.7}" fill="#C9475B" opacity=".55"/><ellipse cx="${e-r*.25}" cy="${l-r*.2}" rx="${r*.4}" ry="${r*.22}" fill="#fff" opacity=".2"/>`).join("")}
    <g transform="translate(118 50) rotate(28)">
      <path d="M0 -26 L-1 -48" stroke="#2a2a2a" stroke-width="1.4"/>
      <ellipse cx="0" cy="-20" rx="4.5" ry="5" fill="#3a3a3a"/>
      <ellipse cx="0" cy="-8" rx="5" ry="8" fill="#4a4a4a"/>
      <ellipse cx="0" cy="12" rx="4" ry="15" fill="#5a4a3a"/>
      ${[0,1,2,3,4,5].map(e=>`<path d="M0 ${12+e*4} l8 0" stroke="#d8c8a8" stroke-width="1" opacity=".6" transform="translate(-4 -4)"/>`).join("")}
      <path d="M-4 -10 C-30 -26 -38 -6 -6 -4Z M4 -10 C30 -26 38 -6 6 -4Z" fill="#cfe6f5" opacity=".45" stroke="#9fb8c8" stroke-width=".6"/>
      <path d="M-4 -4 L-22 10 L-30 30 M4 -4 L22 10 L30 30 M-4 -8 L-26 -2 L-40 6 M4 -8 L26 -2 L40 6 M-3 -2 L-14 18 L-16 40 M3 -2 L14 18 L16 40" stroke="#2a2a2a" stroke-width="1" fill="none"/>
    </g>`,[[98,132,40,"amb"]]),articulation:()=>a("Entorse de la cheville : os et ligaments",t=>`
    <path d="M70 0 L76 108 C70 128 56 144 40 152 C22 162 22 186 44 188 L160 188 C180 188 186 172 170 164 L138 148 C126 140 120 124 124 104 L126 0Z" fill="${t("skin")}" opacity=".55"/>
    <path d="M84 0 L86 112 L110 112 L112 0Z" fill="${t("bone")}"/>
    <path d="M114 0 L116 118 L124 118 L122 0Z" fill="${t("bone")}"/>
    <path d="M82 114 C84 106 116 104 120 116 C122 128 110 134 98 134 C86 134 80 124 82 114Z" fill="${t("bone")}"/>
    <path d="M62 150 C64 134 84 132 98 138 C108 142 106 158 96 166 C84 172 60 170 62 150Z" fill="${t("bone")}"/>
    ${[0,1,2,3].map(e=>`<path d="${C(110+e*3,140+e*3,160+e*4,168+e*3,5,4)}" fill="${t("bone")}"/>`).join("")}
    <path d="M118 116 C128 124 134 132 138 142" stroke="#E3263F" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M128 126 l4 -3 M133 132 l4 -2" stroke="#fff" stroke-width="1.5"/>`,[[128,128,30]]),fievre:()=>a("Fi\xE8vre : thermom\xE8tre et moustique du paludisme",t=>`
    <rect x="62" y="16" width="26" height="130" rx="13" fill="${t("glass")}" opacity=".9"/>
    <rect x="66" y="20" width="6" height="120" rx="3" fill="#fff" opacity=".6"/>
    <rect x="71" y="54" width="8" height="98" rx="4" fill="${t("blood")}" class="mercury"/>
    <circle cx="75" cy="160" r="20" fill="${t("blood")}"/><circle cx="68" cy="153" r="6" fill="#fff" opacity=".5"/>
    ${[30,44,58,72,86,100,114,128].map((e,l)=>`<path d="M88 ${e} L${l%2?94:98} ${e}" stroke="#DDEBF5" stroke-width="1.4"/>`).join("")}
    <text x="102" y="60" class="lbl">39,5 \xB0C</text>
    <g transform="translate(150 120) rotate(-20)">
      <path d="M0 -24 L-3 -50" stroke="#2a2a2a" stroke-width="1.4"/>
      <ellipse cx="0" cy="-19" rx="4" ry="4.5" fill="#3a3a3a"/><ellipse cx="0" cy="-8" rx="4.5" ry="7" fill="#4a4a4a"/><ellipse cx="0" cy="12" rx="3.5" ry="15" fill="#5a4a3a"/>
      <path d="M-4 -10 C-28 -24 -34 -6 -6 -4Z M4 -10 C28 -24 34 -6 6 -4Z" fill="#cfe6f5" opacity=".45" stroke="#9fb8c8" stroke-width=".6"/>
      <path d="M-4 -4 L-20 10 L-28 30 M4 -4 L20 10 L28 30 M-4 -8 L-24 -2 L-36 6 M4 -8 L24 -2 L36 6" stroke="#2a2a2a" stroke-width="1" fill="none"/>
    </g>`,[[75,158,32]]),stress:()=>a("Stress et angoisse",t=>`
    <path d="${F}" fill="${t("skin")}"/>
    <ellipse cx="92" cy="118" rx="7.5" ry="12" fill="#3f2416"/>
    <path d="M140 88 C146 86 152 88 156 92" stroke="#1a1210" stroke-width="2.4" fill="none"/>
    <path d="${E}" fill="#7A6BE0" opacity=".45"/>
    <circle cx="104" cy="74" r="10" fill="#B9A9FF"/>
    <circle cx="104" cy="74" r="22" fill="none" stroke="#B9A9FF" stroke-opacity=".7" class="ring"/>
    <circle cx="104" cy="74" r="36" fill="none" stroke="#B9A9FF" stroke-opacity=".4" class="ring" style="animation-delay:.6s"/>`,[[104,74,24,"cy"]]),rcp:()=>a("Massage cardiaque : bras tendus, au centre de la poitrine",t=>`
    <rect x="0" y="168" width="200" height="32" fill="#141C38"/>
    ${L(t,{faceUp:!0,ground:[100,170,80],head:[26,154],neck:[38,156],shoulder:[48,156],hip:[104,158],leg:[[140,158],[172,160],[180,152]],farLeg:[[140,162],[172,164]],arm:[[72,162],[96,164]]},{shirt:"shirt2"})}
    ${L(t,{face:-1,head:[70,58],neck:[70,70],shoulder:[70,78],hip:[86,122],leg:[[94,166],[132,168],[142,166]],farLeg:[[100,166],[138,170]],arm:[[66,112],[62,144]],farArm:[[68,112],[64,144]]})}
    <ellipse cx="62" cy="148" rx="9" ry="4" fill="${t("skinL")}"/>
    <path class="arrow" d="M30 96 L30 132 M22 124 L30 134 L38 124"/>
    <text x="30" y="90" class="lbl sm" text-anchor="middle">5\u20136 cm</text>
    <text x="164" y="40" class="lbl" text-anchor="middle">100\u2013120</text><text x="164" y="54" class="lbl sm" text-anchor="middle">par minute</text>`,[[62,150,20]]),etouffement:()=>a("\xC9touffement : compressions abdominales",t=>`
    <rect x="0" y="186" width="200" height="14" fill="#141C38"/>
    ${L(t,{ground:[120,188,24],head:[128,40],neck:[124,52],shoulder:[122,60],hip:[116,118],leg:[[118,152],[120,186],[132,186]],farLeg:[[112,152],[112,186]],arm:[[136,84],[146,70]],farArm:[[132,86],[140,74]]},{shirt:"shirt2"})}
    ${L(t,{ground:[86,188,24],head:[92,38],neck:[92,50],shoulder:[92,58],hip:[86,120],leg:[[84,154],[82,186],[94,186]],farLeg:[[78,154],[72,186]],arm:[[108,90],[124,98]],farArm:[[104,88],[118,96]]})}
    <circle cx="124" cy="98" r="6" fill="${t("skinL")}"/>
    <path class="arrow" d="M160 112 L134 100 M140 96 L132 100 L138 106"/>
    <path class="arrow" d="M150 128 L138 108"/>`,[[124,98,20]]),pls:()=>a("Position lat\xE9rale de s\xE9curit\xE9",t=>`
    <rect x="0" y="160" width="200" height="40" fill="#141C38"/>
    ${L(t,{face:-1,ground:[100,162,80],head:[36,140],neck:[48,142],shoulder:[56,140],hip:[118,144],leg:[[146,126],[170,150],[178,154]],farLeg:[[150,156],[182,158]],arm:[[50,126],[34,128]],farArm:[[72,154],[96,158]]})}
    <path class="arrow" d="M22 160 C18 168 22 174 28 174"/>
    <text x="110" y="40" class="lbl" text-anchor="middle">Sur le c\xF4t\xE9</text><text x="110" y="56" class="lbl sm" text-anchor="middle">bouche vers le sol</text>`,[]),nez:()=>a("Saignement de nez : t\xEAte pench\xE9e en avant, pincer 10 minutes",t=>`
    <g transform="rotate(16 100 110)"><path d="${F}" fill="${t("skin")}"/><ellipse cx="92" cy="118" rx="7.5" ry="12" fill="#3f2416"/>
    <path d="M140 88 C146 86 152 88 156 92" stroke="#1a1210" stroke-width="2.4" fill="none"/></g>
    <path d="${C(120,196,138,150,9,7)}" fill="${t("skinL")}"/>
    <path d="${C(138,150,152,136,6,4.5)}" fill="${t("skinL")}"/><path d="${C(140,156,160,146,6,4.5)}" fill="${t("skinL")}"/>
    <path d="M150 156 C148 166 148 172 152 174 C156 172 156 166 150 156Z" fill="${t("blood")}"/>
    <text x="40" y="34" class="lbl">10 min</text>`,[[150,142,18]]),hemorragie:()=>a("Saignement abondant : appuyer fort",t=>`
    <path d="${C(0,140,200,128,26,22)}" fill="${t("skin")}"/>
    <path d="M86 126 C96 118 112 118 122 124" stroke="#6E0F1E" stroke-width="5" fill="none"/>
    <path d="M70 150 C72 160 72 168 76 170 C80 168 80 160 76 150Z M128 146 C130 156 130 162 134 164 C138 162 138 156 134 146Z" fill="${t("blood")}"/>
    <rect x="72" y="104" width="62" height="30" rx="6" fill="#F8F7F2"/>
    <path d="M78 112 L128 112 M78 120 L128 120 M78 128 L128 128" stroke="#DDD6C8"/>
    <path d="${C(64,30,82,94,9,8)}" fill="${t("shirt")}"/><path d="${C(140,30,124,94,9,8)}" fill="${t("shirt")}"/>
    <path d="M70 98 C70 82 136 82 136 98 L134 110 L72 110Z" fill="${t("skinL")}"/>
    ${[0,1,2,3].map(e=>`<path d="${C(80+e*13,100,82+e*13,112,4.5,4)}" fill="${t("skinL")}"/>`).join("")}
    <path class="arrow" d="M100 18 L100 60 M90 48 L100 62 L110 48"/>`,[[103,124,30]]),convulsion:()=>a("Convulsions : prot\xE9ger la t\xEAte, chronom\xE9trer",t=>`
    <rect x="0" y="170" width="200" height="30" fill="#141C38"/>
    <rect x="10" y="150" width="46" height="18" rx="9" fill="#5B6FB0"/>
    ${L(t,{faceUp:!0,ground:[100,168,80],head:[32,140],neck:[44,144],shoulder:[54,146],hip:[112,152],leg:[[146,150],[180,156],[188,150]],farLeg:[[146,158],[178,162]],arm:[[74,132],[92,124]]})}
    <circle cx="156" cy="70" r="28" fill="#0E1733" stroke="#FFB547" stroke-width="3"/>
    <path d="M156 70 L156 50 M156 70 L170 78" stroke="#FFB547" stroke-width="3" stroke-linecap="round"/>
    <text x="150" y="122" class="lbl" text-anchor="middle">+ de 5 min ?</text><text x="150" y="136" class="lbl sm" text-anchor="middle">appeler</text><text x="150" y="148" class="lbl sm" text-anchor="middle">les secours</text>`,[]),malaise:()=>a("Malaise : allonger, jambes sur\xE9lev\xE9es",t=>`
    <rect x="0" y="170" width="200" height="30" fill="#141C38"/>
    <rect x="128" y="124" width="52" height="8" rx="3" fill="#8A6A48"/><rect x="132" y="132" width="6" height="38" fill="#6E5236"/><rect x="170" y="132" width="6" height="38" fill="#6E5236"/>
    ${L(t,{faceUp:!0,ground:[90,170,70],head:[24,158],neck:[36,160],shoulder:[46,160],hip:[104,160],leg:[[130,132],[166,118],[176,110]],farLeg:[[132,136],[170,122]],arm:[[70,166],[92,166]]})}
    <path class="arrow" d="M150 96 L150 70 M142 78 L150 68 L158 78"/>`,[]),serpent:()=>a("Morsure de serpent : immobiliser, pas de garrot",t=>`
    <path d="M66 0 L72 132 C74 154 64 166 50 176 L150 176 C138 166 126 152 128 132 L134 0Z" fill="${t("skin")}"/>
    <rect x="56" y="40" width="10" height="130" rx="3" fill="#B08A5A"/><rect x="134" y="40" width="10" height="130" rx="3" fill="#B08A5A"/>
    ${[60,104,148].map(e=>`<rect x="54" y="${e}" width="92" height="9" rx="3" fill="#F3EEE2" opacity=".9"/>`).join("")}
    <circle cx="94" cy="128" r="3.2" fill="#7A0F1E"/><circle cx="106" cy="130" r="3.2" fill="#7A0F1E"/>
    <path d="M10 40 C24 24 40 52 54 36 C60 30 56 20 48 22" stroke="#6B7A2A" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M158 16 L182 40 M182 16 L158 40" stroke="#FF4D6D" stroke-width="4" stroke-linecap="round"/><text x="170" y="56" class="lbl sm" text-anchor="middle">pas de</text><text x="170" y="67" class="lbl sm" text-anchor="middle">garrot</text>`,[[100,129,22]]),intox:()=>a("Produit aval\xE9 : ne pas faire vomir, garder l'emballage",t=>`
    <path d="M84 20 L116 20 L116 44 C134 52 142 68 142 86 L142 172 C142 182 134 188 124 188 L76 188 C66 188 58 182 58 172 L58 86 C58 68 66 52 84 44Z" fill="${t("glass")}" opacity=".85"/>
    <rect x="80" y="10" width="40" height="14" rx="3" fill="#E34B4B"/>
    <path d="M58 110 L142 110 L142 160 L58 160Z" fill="#FFB547"/>
    <path d="M100 118 L122 152 L78 152Z" fill="none" stroke="#141414" stroke-width="3" stroke-linejoin="round"/><path d="M100 130 L100 142 M100 146 L100 148" stroke="#141414" stroke-width="3" stroke-linecap="round"/>
    <rect x="66" y="56" width="10" height="44" rx="5" fill="#fff" opacity=".5"/>`,[[100,135,30,"amb"]]),chaleur:()=>a("Coup de chaleur : \xE0 l'ombre, rafra\xEEchir",t=>`
    <circle cx="164" cy="34" r="18" fill="#FFC447"/>
    ${Array.from({length:10},(e,l)=>{const r=l*Math.PI/5;return`<path d="M${164+Math.cos(r)*25} ${34+Math.sin(r)*25} L${164+Math.cos(r)*34} ${34+Math.sin(r)*34}" stroke="#FFC447" stroke-width="3" stroke-linecap="round"/>`}).join("")}
    <rect x="0" y="176" width="200" height="24" fill="#1F3A2A"/>
    <rect x="30" y="76" width="10" height="102" fill="#6E4E32"/>
    <ellipse cx="36" cy="66" rx="40" ry="30" fill="#2E7D4F"/><ellipse cx="20" cy="74" rx="22" ry="18" fill="#3C9A62"/>
    ${L(t,{face:-1,head:[48,112],neck:[52,122],shoulder:[56,128],hip:[74,162],leg:[[102,166],[128,170],[134,164]],farLeg:[[100,172],[124,176]],arm:[[70,146],[82,158]]})}
    ${[0,1,2].map(e=>`<path class="water" style="animation-delay:${e*.3}s" d="M${40+e*9} 88 L${38+e*9} 100"/>`).join("")}`,[]),moustique:()=>a("Moustique anoph\xE8le : il pique la nuit",t=>`
    <circle cx="150" cy="44" r="18" fill="#F4E9C8" opacity=".9"/>
    <path d="M18 176 C60 164 140 168 186 178" stroke="#3B5BDB" stroke-width="1" opacity=".5" fill="none"/>
    <g transform="translate(100 108) rotate(-28)">
      <path d="M-6 -12 C-58 -64 -88 -40 -70 -18 C-58 -4 -28 -6 -6 -6Z" fill="#DCEEFA" opacity=".42" stroke="#A9C6DA" stroke-width=".8"/>
      <path d="M6 -12 C58 -64 88 -40 70 -18 C58 -4 28 -6 6 -6Z" fill="#DCEEFA" opacity=".42" stroke="#A9C6DA" stroke-width=".8"/>
      <path d="M-30 -30 C-46 -40 -60 -36 -66 -26 M30 -30 C46 -40 60 -36 66 -26" stroke="#9AB4C7" stroke-width=".6" fill="none" opacity=".8"/>
      <g stroke="#2b2620" stroke-width="1.4" fill="none" stroke-linecap="round">
        <path d="M-4 0 L-26 18 L-36 52 M4 0 L26 18 L38 52 M-5 -4 L-30 -2 L-50 18 M5 -4 L30 -2 L52 16 M-5 4 L-18 34 L-16 64 M5 4 L18 34 L18 64"/>
      </g>
      <ellipse cx="0" cy="-26" rx="6" ry="6.5" fill="#3a332b"/><circle cx="-2.5" cy="-28" r="2" fill="#7a2a2a"/>
      <path d="M0 -32 L0 -66" stroke="#2b2620" stroke-width="1.6"/><path d="M-2 -32 L-12 -56 M2 -32 L12 -56" stroke="#4a4238" stroke-width="1"/>
      <ellipse cx="0" cy="-10" rx="7" ry="11" fill="#5a4f42"/><ellipse cx="-2" cy="-14" rx="2.5" ry="5" fill="#fff" opacity=".18"/>
      <path d="M0 2 C6 18 6 40 0 62 C-6 40 -6 18 0 2Z" fill="#7A5A3A"/>
      ${[10,18,26,34,42,50].map(e=>`<path d="M-4 ${e} L4 ${e}" stroke="#3A2A1A" stroke-width="1.6"/>`).join("")}
      <path d="M0 40 C4 46 4 54 0 60" stroke="#C8203F" stroke-width="3" opacity=".7"/>
    </g>
    <text x="14" y="30" class="lbl sm">ANOPH\xC8LE \xB7 NUIT</text>`,[[100,140,22]]),virus:()=>a("Virus et bact\xE9ries vus au microscope",t=>`
    <circle cx="100" cy="100" r="86" fill="none" stroke="#5BE7FF" stroke-opacity=".25" stroke-width="2"/>
    <circle cx="100" cy="100" r="80" fill="#0C1A3A" opacity=".55"/>
    ${[...Array(14)].map((e,l)=>{const r=l/14*Math.PI*2,i=92+Math.cos(r)*30,s=96+Math.sin(r)*30,c=92+Math.cos(r)*44,d=96+Math.sin(r)*44;return`<path d="M${i.toFixed(1)} ${s.toFixed(1)} L${c.toFixed(1)} ${d.toFixed(1)}" stroke="#E0607A" stroke-width="3"/><circle cx="${c.toFixed(1)}" cy="${d.toFixed(1)}" r="4.5" fill="#FF8FA6"/>`}).join("")}
    <circle cx="92" cy="96" r="31" fill="${t("heart")}"/>
    ${[[82,86,5],[100,92,4],[88,108,4.5],[104,108,3.5],[94,78,3]].map(([e,l,r])=>`<circle cx="${e}" cy="${l}" r="${r}" fill="#7E1426" opacity=".6"/>`).join("")}
    <ellipse cx="82" cy="84" rx="10" ry="7" fill="#fff" opacity=".2"/>
    <g transform="translate(148 148) rotate(30)"><rect x="-20" y="-8" width="40" height="16" rx="8" fill="#6FD3A6"/><rect x="-16" y="-5" width="18" height="5" rx="2.5" fill="#fff" opacity=".25"/>
      <path d="M20 0 C30 -6 34 4 44 -2 M-20 0 C-30 6 -34 -4 -44 2" stroke="#4BB98B" stroke-width="1.4" fill="none"/></g>
    <g transform="translate(150 54) rotate(-20)"><rect x="-14" y="-6" width="28" height="12" rx="6" fill="#B48CFF"/><rect x="-10" y="-4" width="12" height="4" rx="2" fill="#fff" opacity=".25"/></g>
    <circle cx="44" cy="150" r="9" fill="#FFB547" opacity=".85"/><circle cx="56" cy="160" r="7" fill="#FFB547" opacity=".7"/><circle cx="40" cy="164" r="6" fill="#FFB547" opacity=".6"/>`,[[92,96,46]]),eau:()=>a("Eau potable et sels de r\xE9hydratation",t=>`
    <path d="M60 40 L140 40 L130 176 C130 182 126 186 120 186 L80 186 C74 186 70 182 70 176Z" fill="${t("glass")}" opacity=".35" stroke="#CFEAFF" stroke-width="1.5"/>
    <path d="M66 92 C84 84 100 100 118 90 C126 86 132 88 134 90 L130 176 C130 182 126 186 120 186 L80 186 C74 186 70 182 70 176Z" fill="${t("water")}" opacity=".85" class="water"/>
    <path d="M74 48 L80 176" stroke="#fff" stroke-width="4" opacity=".35" stroke-linecap="round"/>
    ${[[92,140,4],[108,160,3],[100,118,2.5],[116,130,3.5]].map(([e,l,r])=>`<circle cx="${e}" cy="${l}" r="${r}" fill="#fff" opacity=".5"/>`).join("")}
    <path d="M160 70 C160 70 146 90 146 100 C146 108 152 114 160 114 C168 114 174 108 174 100 C174 90 160 70 160 70Z" fill="${t("water")}"/>
    <ellipse cx="155" cy="98" rx="3" ry="6" fill="#fff" opacity=".5"/>
    <g transform="translate(34 128) rotate(-12)"><rect x="-18" y="-26" width="36" height="52" rx="4" fill="#F5F7FB"/><rect x="-18" y="-26" width="36" height="12" rx="4" fill="#2E8BE6"/>
      <text x="0" y="8" text-anchor="middle" style="font:800 11px var(--font)" fill="#1C4E8A">SRO</text><path d="M-10 16 L10 16" stroke="#9FB6CE" stroke-width="2"/></g>`,[[100,140,34,"cy"]]),glycemie:()=>a("Glyc\xE9mie : lecteur et goutte de sang",t=>`
    <rect x="44" y="40" width="80" height="128" rx="18" fill="#E9EEF6"/><rect x="44" y="40" width="80" height="128" rx="18" fill="none" stroke="#B9C5D6" stroke-width="2"/>
    <rect x="54" y="54" width="60" height="44" rx="8" fill="#0B1838"/>
    <text x="84" y="84" text-anchor="middle" style="font:800 20px var(--font)" fill="#5BE7FF">1,05</text><text x="84" y="94" text-anchor="middle" style="font:700 7px var(--font)" fill="#95A6CB">g/L</text>
    <circle cx="70" cy="122" r="9" fill="#C9D3E2"/><circle cx="98" cy="122" r="9" fill="#C9D3E2"/><rect x="62" y="142" width="44" height="10" rx="5" fill="#C9D3E2"/>
    <rect x="76" y="168" width="16" height="22" rx="2" fill="#F4F0E2" stroke="#C8BE9C"/>
    <path d="M152 92 C152 92 136 116 136 128 C136 138 143 145 152 145 C161 145 168 138 168 128 C168 116 152 92 152 92Z" fill="${t("blood")}"/>
    <ellipse cx="146" cy="124" rx="3.5" ry="7" fill="#fff" opacity=".45"/>
    <path d="M140 160 C150 170 166 170 176 160" stroke="#9A6A4A" stroke-width="10" stroke-linecap="round" fill="none"/>`,[[152,126,24]]),tension:()=>a("Tension art\xE9rielle : brassard et manom\xE8tre",t=>`
    <path d="M24 120 C24 100 40 92 64 92 L120 92 C136 92 146 104 146 120 C146 136 136 148 120 148 L64 148 C40 148 24 140 24 120Z" fill="${t("skinL")}"/>
    <rect x="58" y="90" width="58" height="60" rx="8" fill="#2B3B66"/><path d="M62 98 L112 98 M62 142 L112 142" stroke="#5BE7FF" stroke-width="1.2" opacity=".6"/>
    <path d="M86 90 C86 70 110 60 128 62" stroke="#1C2440" stroke-width="5" fill="none"/>
    <circle cx="148" cy="58" r="34" fill="#EEF2F8"/><circle cx="148" cy="58" r="30" fill="#fff" stroke="#BFCADA" stroke-width="2"/>
    ${[...Array(13)].map((e,l)=>{const r=Math.PI*(.8+l*.1167);return`<path d="M${(148+Math.cos(r)*26).toFixed(1)} ${(58+Math.sin(r)*26).toFixed(1)} L${(148+Math.cos(r)*(l%3?23:20)).toFixed(1)} ${(58+Math.sin(r)*(l%3?23:20)).toFixed(1)}" stroke="#3A4766" stroke-width="1.4"/>`}).join("")}
    <path d="M148 58 L166 44" stroke="#E3263F" stroke-width="2.4"/><circle cx="148" cy="58" r="3.5" fill="#1C2440"/>
    <path d="M150 166 C160 150 180 156 172 172 C168 180 156 182 150 176" fill="#3A4766"/><ellipse cx="146" cy="172" rx="14" ry="16" fill="#2B3555"/>
    <path class="ecg" d="M10 186 L60 186 L66 178 L72 194 L80 168 L88 192 L94 186 L190 186"/>`,[[148,58,38,"cy"]]),sang:()=>a("Globules rouges normaux et en faucille",t=>`
    <path d="M0 70 C60 54 140 54 200 70 L200 150 C140 166 60 166 0 150Z" fill="#5A0E1C" opacity=".55"/>
    ${[[40,96],[84,84],[70,128],[120,104],[30,138]].map(([e,l])=>`<g transform="translate(${e} ${l})"><ellipse rx="17" ry="15" fill="${t("blood")}"/><ellipse rx="8" ry="6.5" fill="#8E0F22" opacity=".65"/><ellipse cx="-6" cy="-6" rx="5" ry="3" fill="#fff" opacity=".25"/></g>`).join("")}
    ${[[160,92,-20],[150,134,30],[176,120,70]].map(([e,l,r])=>`<g transform="translate(${e} ${l}) rotate(${r})"><path d="M-22 4 C-14 -14 14 -14 22 4 C12 -4 -12 -4 -22 4Z" fill="#B3163A"/><path d="M-12 -4 C-4 -9 4 -9 12 -4" stroke="#fff" stroke-width="1.4" opacity=".3" fill="none"/></g>`).join("")}
    <text x="14" y="40" class="lbl sm">NORMAL</text><text x="138" y="40" class="lbl sm">FAUCILLE (SS)</text>
    <path d="M100 30 L100 190" stroke="#5BE7FF" stroke-dasharray="4 5" opacity=".35"/>`,[[160,116,30,"amb"]])},COMPLAINT_ART={tete:"tete",fievre:"fievre",gorge:"respiratoire",ventre:"digestif",diarrhee:"digestif",poitrine:"coeur",regles:"reproducteur",urinaire:"urinaire",dos:"dos",dent:"dent",brulure:"brulure",plaie:"plaie",allergie:"allergie",entorse:"articulation",yeux:"yeux",stress:"stress",constipation:"digestif",nausee:"digestif",mycose:"peau",oreille:"tete",aphtes:"dent",hemorroides:"digestif",vers:"digestif",gale:"peau",poux:"tete",varicelle:"allergie",soleil:"brulure",pertes:"reproducteur",acne:"peau",drepano:"coeur"},AID_ART={rcp:"rcp",etouffement:"etouffement",hemorragie:"hemorragie",pls:"pls",convulsion:"convulsion",brulure:"brulure",nez:"nez",malaise:"malaise",fievre_enfant:"fievre",piqure:"serpent",intox:"intox",chaleur:"chaleur"},art=t=>ART[t]?ART[t]():"";
