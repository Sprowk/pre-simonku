// ============================================================
// DATA
// ============================================================
const surprises = {
    // Nedeľa
    0: { title: "Milý tučniačik", poem: "Krok za krokom kráčaš veľmi roztomilo,\npri tebe je mi vždy tak krásne a milo.\nMôj milý tučniačik, si moje zlatíčko,\nzakaždým mi celkom roztopíš srdiečko.", scene: 'penguin' },

    // Pondelok
    1: { title: "Krásna kočka", poem: "Kráčaš s ľahkosťou, sťa padajúca vločka,\npre mňa si tá pravá, dokonalá kočka.\nOči žiaria, úsmev hreje,\npri tebe sa moje srdce len tak smeje.", scene: 'cat' },

    // Utorok
    2: { title: "Vždy rozžiariš", poem: "Si moje slniečko, čo tak krásne žiari,\nzakaždým mi vyčaríš úsmev na tvári.\nPrinášaš svetlo do každého dňa,\ntvoja prítomnosť je to najkrajšie pre mňa.", scene: 'sun' },

    // Streda
    3: { title: "Divoká ako chobotnica", poem: "Účes divý ako chápadlá,\ndo tvojich sietí si ma hneď chytila.\nNa parkete si vtedy riadne žila,\ntvoja energia ma úplne opantala.", scene: 'octopus' },

    // Štvrtok
    4: { title: "Pracovitá ako včielka", poem: "Od rána do večera lietaš,\nsladký med do života mi vpletáš.\nUsilovná, nezastavíš sa snáď,\npreto ťa mám tak veľmi rád.", scene: 'bee' },

    // Piatok
    5: { title: "Moja múdra sovička", poem: "Očká veľké, múdra hlavička,\nsi moja milovaná sovička.\nRozumieš mi aj bez veľkých slov,\ns tebou je život plný krásnych snov.", scene: 'owl' },

    // Sobota
    6: { title: "Magický jednorožec", poem: "Magická, vzácna, úplne iná,\ns tebou je každá chvíľa len nevinná.\nSi môj jednorožec z rozprávky,\nodháňaš preč všetky obavy.", scene: 'unicorn' }
};

// ============================================================
// SCENES (kept from original — abbreviated helpers)
// ============================================================
function makeFlowers(n) {
    const C = [['#FF6B9D', '#FF4081', '#FF80AB'], ['#CE93D8', '#BA68C8', '#E1BEE7'], ['#FFD54F', '#FFB300', '#FFE082'], ['#FF8A65', '#FF5722', '#FFAB91'], ['#81D4FA', '#29B6F6', '#B3E5FC']]; let h = '';// spread flowers evenly but with a little jitter so they don't stack
    const used = []; for (let i = 0; i < n; i++) { const c = C[i % C.length]; let x; do { x = 6 + Math.random() * 88; } while (used.some(u => Math.abs(u - x) < 9)); used.push(x); const ht = 28 + Math.random() * 20, d = (i * 0.4).toFixed(1), dur = (2.5 + Math.random() * 2).toFixed(1); h += `<g transform="translate(${x},${50 - ht})"><g transform-origin="0px ${ht}px"><animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="${dur}s" begin="${d}s" repeatCount="indefinite"/><line x1="0" y1="${ht}" x2="0" y2="0" stroke="#43A047" stroke-width="2.5" stroke-linecap="round"/><circle cx="0" cy="-3" r="6" fill="${c[0]}"/><circle cx="5" cy="2" r="6" fill="${c[1]}"/><circle cx="-5" cy="2" r="6" fill="${c[2]}"/><circle cx="0" cy="2" r="4" fill="#FFC107"/></g></g>` } return h
}
function makeBee() { return `<g><ellipse cx="35" cy="18" rx="14" ry="20" fill="rgba(200,230,255,0.7)" transform="rotate(-20 35 18)"><animate attributeName="ry" values="20;14;20" dur="0.15s" repeatCount="indefinite"/></ellipse><ellipse cx="55" cy="18" rx="14" ry="20" fill="rgba(200,230,255,0.7)" transform="rotate(20 55 18)"><animate attributeName="ry" values="20;14;20" dur="0.15s" repeatCount="indefinite"/></ellipse><ellipse cx="45" cy="42" rx="22" ry="18" fill="#FFC107"/><rect x="28" y="32" width="34" height="5" rx="2" fill="#333"/><rect x="26" y="42" width="38" height="5" rx="2" fill="#333"/><rect x="28" y="52" width="34" height="4" rx="2" fill="#333"/><circle cx="62" cy="35" r="3.5" fill="#333"/><circle cx="62" cy="35" r="1.5" fill="white"/><path d="M38 25 Q32 10 26 8" stroke="#333" stroke-width="2" fill="none"/><circle cx="26" cy="8" r="3" fill="#333"/><path d="M48 25 Q54 10 60 8" stroke="#333" stroke-width="2" fill="none"/><circle cx="60" cy="8" r="3" fill="#333"/></g>` }
const dots = (n, tR, lR, sR, color = 'white') => [...Array(n)].map((_, i) => `<div style="position:absolute;top:${Math.random() * tR}%;left:${Math.random() * lR}%;width:${2 + Math.random() * sR}px;height:${2 + Math.random() * sR}px;background:${color};border-radius:50%;opacity:${0.3 + Math.random() * 0.5};animation:sparkle-pop ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite;"></div>`).join('');

const scenes = {
    bee: () => `<div class="scene-bg" style="background:linear-gradient(180deg,#81D4FA 0%,#4FC3F7 30%,#C8E6C9 85%,#A5D6A7 100%)"></div><svg style="position:absolute;top:15px;right:15px;width:110px;height:110px" viewBox="0 0 100 100"><g style="animation:spin-slow 25s linear infinite;transform-origin:50px 50px">${[...Array(12)].map((_, i) => `<line x1="50" y1="8" x2="50" y2="22" stroke="#FFD54F" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 30} 50 50)" opacity="0.7"/>`).join('')}</g><circle cx="50" cy="50" r="22" fill="#FDD835"/><circle cx="50" cy="50" r="18" fill="#FFEE58"/><circle cx="43" cy="46" r="3" fill="#F57F17"/><circle cx="57" cy="46" r="3" fill="#F57F17"/><path d="M42 55 Q50 62 58 55" fill="none" stroke="#F57F17" stroke-width="2.5" stroke-linecap="round"/></svg><svg style="position:absolute;bottom:0;left:0;width:100%;height:50%" viewBox="0 0 100 50" preserveAspectRatio="none"><path d="M0 25 Q25 15 50 20 T100 18 L100 50 L0 50Z" fill="#66BB6A"/><path d="M0 30 Q30 22 60 28 T100 24 L100 50 L0 50Z" fill="#4CAF50"/><path d="M0 38 Q40 30 70 36 T100 33 L100 50 L0 50Z" fill="#388E3C"/></svg><svg style="position:absolute;bottom:25%;left:0;width:100%;height:30%" viewBox="0 0 100 50" preserveAspectRatio="xMidYMax meet" overflow="visible">${makeFlowers(7)}</svg><div style="position:absolute;top:20%;left:-100px;width:90px;height:70px;animation:fly-across 7s ease-in-out infinite"><svg viewBox="0 0 90 70" width="100%" height="100%">${makeBee()}</svg></div><div style="position:absolute;top:40%;left:calc(100% + 50px);width:60px;height:50px;animation:fly-across-2 9s ease-in-out infinite 2s"><svg viewBox="0 0 90 70" width="100%" height="100%">${makeBee()}</svg></div>`,

    octopus: () => `<div class="scene-bg" style="background:linear-gradient(180deg,#0d0221 0%,#150734 40%,#0a1628 100%)"></div>${['#FF00FF', '#00FFFF', '#FFFF00', '#FF4444', '#44FF44'].map((c, i) => `<div style="position:absolute;top:-30px;left:${10 + i * 20}%;width:60px;height:120%;background:linear-gradient(${c}44,transparent 70%);transform-origin:top center;animation:disco-light ${2 + i * 0.3}s ease-in-out ${i * 0.4}s infinite;clip-path:polygon(40% 0%,60% 0%,100% 100%,0% 100%);opacity:0.3"></div>`).join('')}${'♪♫♬♩'.split('').map((n, i) => `<div style="position:absolute;top:${10 + i * 20}%;left:${15 + i * 22}%;font-size:${20 + i * 5}px;color:rgba(255,255,255,0.3);animation:float ${3 + i}s ease-in-out ${i * 0.5}s infinite">${n}</div>`).join('')}<svg style="position:absolute;bottom:0;left:0;width:100%;height:15%" viewBox="0 0 100 15" preserveAspectRatio="none"><rect x="0" y="0" width="100" height="15" fill="#1a0a30"/>${[...Array(20)].map((_, i) => `<circle cx="${i * 5 + 2.5}" cy="7" r="2" fill="${['#FF00FF', '#00FFFF', '#FFFF00', '#FF4444'][i % 4]}" opacity="0.6"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="${0.5 + Math.random()}s" repeatCount="indefinite"/></circle>`).join('')}</svg><svg style="position:absolute;top:20%;left:50%;margin-left:-80px;width:160px;height:55%;animation:bob 2s ease-in-out infinite" viewBox="0 0 200 220"><g><path d="M60 140 Q30 160 20 190 Q15 210 35 200" fill="none" stroke="#E040FB" stroke-width="16" stroke-linecap="round" style="animation:wave-tentacle 1.5s ease-in-out 0s infinite;transform-origin:60px 140px"/><path d="M75 145 Q55 185 45 210 Q35 225 55 215" fill="none" stroke="#E040FB" stroke-width="16" stroke-linecap="round" style="animation:wave-tentacle 1.8s ease-in-out 0.2s infinite;transform-origin:75px 145px"/><path d="M100 148 Q95 190 90 220" fill="none" stroke="#E040FB" stroke-width="16" stroke-linecap="round" style="animation:wave-tentacle 1.4s ease-in-out 0.4s infinite;transform-origin:100px 148px"/><path d="M125 145 Q145 185 155 210 Q165 225 145 215" fill="none" stroke="#E040FB" stroke-width="16" stroke-linecap="round" style="animation:wave-tentacle 1.7s ease-in-out 0.1s infinite;transform-origin:125px 145px"/><path d="M140 140 Q170 160 180 190 Q185 210 165 200" fill="none" stroke="#E040FB" stroke-width="16" stroke-linecap="round" style="animation:wave-tentacle 1.6s ease-in-out 0.3s infinite;transform-origin:140px 140px"/></g><path d="M55 140 C55 60 145 60 145 140Z" fill="#CE93D8"/><path d="M65 140 C65 75 135 75 135 140Z" fill="#E040FB"/><path d="M70 68 Q75 40 85 55 Q90 30 100 50 Q110 25 115 55 Q120 35 130 68" fill="none" stroke="#FFEB3B" stroke-width="5" stroke-linecap="round"/><path d="M65 78 Q100 70 135 78" fill="none" stroke="#FF4081" stroke-width="4"/><g style="animation:blink 4s ease-in-out infinite"><circle cx="85" cy="100" r="14" fill="white"/><circle cx="88" cy="98" r="7" fill="#1A237E"/><circle cx="90" cy="96" r="3" fill="white"/></g><g style="animation:blink 4s ease-in-out 0.1s infinite"><circle cx="120" cy="100" r="14" fill="white"/><circle cx="123" cy="98" r="7" fill="#1A237E"/><circle cx="125" cy="96" r="3" fill="white"/></g><path d="M85 120 Q100 140 120 120" fill="#880E4F" stroke="#880E4F" stroke-width="2"/><circle cx="75" cy="115" r="8" fill="#FF80AB" opacity="0.5"/><circle cx="130" cy="115" r="8" fill="#FF80AB" opacity="0.5"/></svg>`,

    cat: () => `<div class="scene-bg" style="background:radial-gradient(ellipse at 50% 60%,#1a0533,#0d0020,#050010)"></div><svg style="position:absolute;top:15px;left:20px;width:70px;height:70px" viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#E8EAF6" opacity="0.9"/><circle cx="62" cy="50" r="30" fill="#0d0020" opacity="0.85"/></svg>${dots(18, 70, 95, 14)}<svg style="position:absolute;bottom:0;left:0;width:100%;height:25%" viewBox="0 0 200 50" preserveAspectRatio="none"><path d="M0 50 L0 30 L15 20 L30 30 L30 15 L45 8 L60 15 L60 25 L80 25 L80 20 L100 12 L120 20 L120 28 L140 22 L170 28 L170 18 L185 12 L200 18 L200 50Z" fill="#0a0015"/></svg><svg style="position:absolute;bottom:15%;left:50%;margin-left:-55px;width:110px;height:45%" viewBox="0 0 120 180"><g style="animation:tail-wag 3s ease-in-out infinite;transform-origin:95px 140px"><path d="M95 140 Q130 120 125 90 Q120 70 135 60" fill="none" stroke="#1a1a2e" stroke-width="10" stroke-linecap="round"/></g><ellipse cx="60" cy="145" rx="35" ry="30" fill="#1a1a2e"/><circle cx="60" cy="95" r="30" fill="#1a1a2e"/><polygon points="38,75 25,40 55,65" fill="#1a1a2e"/><polygon points="82,75 95,40 65,65" fill="#1a1a2e"/><polygon points="40,73 30,48 52,65" fill="#2a1a3e"/><polygon points="80,73 90,48 68,65" fill="#2a1a3e"/><ellipse cx="48" cy="92" rx="10" ry="6" fill="#00E5CC"><animate attributeName="ry" values="6;1;6" dur="4s" repeatCount="indefinite"/></ellipse><ellipse cx="72" cy="92" rx="10" ry="6" fill="#00E5CC"><animate attributeName="ry" values="6;1;6" dur="4s" repeatCount="indefinite"/></ellipse><ellipse cx="48" cy="92" rx="3" ry="6" fill="#0a0015"><animate attributeName="ry" values="6;1;6" dur="4s" repeatCount="indefinite"/></ellipse><ellipse cx="72" cy="92" rx="3" ry="6" fill="#0a0015"><animate attributeName="ry" values="6;1;6" dur="4s" repeatCount="indefinite"/></ellipse><polygon points="57,100 63,100 60,104" fill="#FF8A80"/><line x1="20" y1="98" x2="48" y2="100" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><line x1="18" y1="105" x2="47" y2="103" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><line x1="72" y1="100" x2="100" y2="98" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><line x1="73" y1="103" x2="102" y2="105" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><ellipse cx="42" cy="168" rx="10" ry="6" fill="#1a1a2e"/><ellipse cx="78" cy="168" rx="10" ry="6" fill="#1a1a2e"/></svg>`,

    sun: () => `<div class="scene-bg" style="background:linear-gradient(180deg,#FF8F00 0%,#FFB74D 30%,#FFE0B2 60%,#FFF8E1 100%)"></div><div style="position:absolute;top:50%;left:50%;width:400px;height:400px;margin:-200px 0 0 -200px;animation:spin-slow 40s linear infinite">${[...Array(8)].map((_, i) => `<div style="position:absolute;top:0;left:50%;width:3px;margin-left:-1.5px;height:200px;background:linear-gradient(rgba(255,255,255,0.3),transparent);transform-origin:bottom center;transform:rotate(${i * 45}deg)"></div>`).join('')}</div><svg style="position:absolute;top:50%;left:50%;width:220px;height:220px;margin:-110px 0 0 -110px;animation:bob 3s ease-in-out infinite" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="rgba(255,235,59,0.15)"/><circle cx="100" cy="100" r="75" fill="rgba(255,235,59,0.2)"/><circle cx="100" cy="100" r="60" fill="#FDD835"/><circle cx="100" cy="100" r="55" fill="#FFEE58"/><g style="animation:blink 5s ease-in-out infinite"><circle cx="80" cy="88" r="8" fill="#E65100"/><circle cx="82" cy="86" r="3" fill="white"/><circle cx="120" cy="88" r="8" fill="#E65100"/><circle cx="122" cy="86" r="3" fill="white"/></g><circle cx="68" cy="105" r="9" fill="#FF8A65" opacity="0.5"/><circle cx="132" cy="105" r="9" fill="#FF8A65" opacity="0.5"/><path d="M72 108 Q100 135 128 108" fill="#F57F17" stroke="#E65100" stroke-width="2"/><path d="M78 110 Q100 128 122 110" fill="#FFEE58"/></svg>`,

    owl: () => `<div class="scene-bg" style="background:linear-gradient(180deg,#0D1B2A 0%,#1B2838 30%,#1B3A2A 70%,#1a2e1a 100%)"></div>${dots(20, 50, 100, 3)}<svg style="position:absolute;top:15px;left:20px;width:60px;height:60px" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#FFECB3"/><circle cx="60" cy="45" r="28" fill="#0D1B2A" opacity="0.8"/></svg><svg style="position:absolute;bottom:0;left:50%;margin-left:-100px;width:200px;height:85%" viewBox="0 0 200 300" preserveAspectRatio="xMidYMax meet"><path d="M90 300 L85 180 Q80 150 75 120 L80 100 L90 95 L95 100 L95 80 L100 70 L105 80 L105 100 L110 95 L120 100 L115 120 Q110 150 115 180 L110 300Z" fill="#4E342E"/><path d="M95 300 L92 190 Q90 160 88 130 L92 110 L100 105 L108 110 L112 130 Q110 160 108 190 L105 300Z" fill="#5D4037"/><path d="M80 150 Q50 140 30 120" stroke="#4E342E" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M120 140 Q150 125 170 135" stroke="#4E342E" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="30" cy="115" r="15" fill="#2E7D32" opacity="0.7"/><circle cx="40" cy="80" r="18" fill="#388E3C" opacity="0.6"/><circle cx="170" cy="130" r="16" fill="#2E7D32" opacity="0.7"/></svg><svg style="position:absolute;bottom:38%;left:50%;margin-left:-50px;width:100px;height:120px;animation:float 5s ease-in-out infinite" viewBox="0 0 100 130"><ellipse cx="50" cy="80" rx="32" ry="40" fill="#795548"/><ellipse cx="50" cy="90" rx="22" ry="28" fill="#D7CCC8"/><circle cx="50" cy="42" r="28" fill="#795548"/><polygon points="28,25 15,5 40,18" fill="#795548"/><polygon points="72,25 85,5 60,18" fill="#795548"/><circle cx="38" cy="42" r="16" fill="#D7CCC8"/><circle cx="62" cy="42" r="16" fill="#D7CCC8"/><circle cx="38" cy="42" r="11" fill="#FFC107"/><circle cx="62" cy="42" r="11" fill="#FFC107"/><circle cx="38" cy="42" r="6" fill="#212121"><animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite"/></circle><circle cx="62" cy="42" r="6" fill="#212121"><animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite"/></circle><circle cx="40" cy="40" r="2.5" fill="white"/><circle cx="64" cy="40" r="2.5" fill="white"/><polygon points="46,52 54,52 50,60" fill="#FF8F00"/></svg>`,

    penguin: () => `<div class="scene-bg" style="background:linear-gradient(180deg,#0a1929 0%,#1a3a5c 25%,#4a8db7 50%,#89c4e1 70%,#e8f4f8 100%)"></div>${dots(12, 35, 100, 2)}${[...Array(25)].map((_, i) => `<div style="position:absolute;top:-8px;left:${Math.random() * 100}%;width:${4 + Math.random() * 5}px;height:${4 + Math.random() * 5}px;background:white;border-radius:50%;opacity:${0.5 + Math.random() * 0.4};animation:snow-fall ${4 + Math.random() * 6}s linear ${Math.random() * 6}s infinite"></div>`).join('')}<svg style="position:absolute;bottom:0;left:0;width:100%;height:55%" viewBox="0 0 200 110" preserveAspectRatio="none"><polygon points="-10,110 25,30 60,110" fill="#b3d9e8" opacity="0.4"/><polygon points="30,110 70,20 110,110" fill="#a0cde0" opacity="0.5"/><polygon points="80,110 130,25 180,110" fill="#b3d9e8" opacity="0.35"/><polygon points="25,30 35,40 15,40" fill="white" opacity="0.7"/><polygon points="70,20 82,32 58,32" fill="white" opacity="0.7"/></svg><svg style="position:absolute;bottom:0;left:0;width:100%;height:25%" viewBox="0 0 200 50" preserveAspectRatio="none"><path d="M0 15 Q50 5 100 18 T200 10 L200 50 L0 50Z" fill="#FFFFFF"/><path d="M0 25 Q60 18 120 28 T200 20 L200 50 L0 50Z" fill="#E0F7FA"/></svg><svg style="position:absolute;bottom:12%;left:50%;margin-left:-55px;width:110px;height:50%;animation:bob 1.2s ease-in-out infinite" viewBox="0 0 120 160"><ellipse cx="60" cy="155" rx="35" ry="5" fill="rgba(0,0,0,0.1)"/><ellipse cx="60" cy="95" rx="38" ry="50" fill="#263238"/><ellipse cx="60" cy="100" rx="26" ry="40" fill="#FFFFFF"/><circle cx="60" cy="48" r="28" fill="#263238"/><ellipse cx="60" cy="50" rx="20" ry="18" fill="#ECEFF1"/><g style="animation:blink 5s ease-in-out infinite"><circle cx="50" cy="45" r="5" fill="#FFFFFF"/><circle cx="50" cy="45" r="3" fill="#000"/><circle cx="51" cy="44" r="1" fill="white"/></g><g style="animation:blink 5s ease-in-out 0.15s infinite"><circle cx="70" cy="45" r="5" fill="#FFFFFF"/><circle cx="70" cy="45" r="3" fill="#000"/><circle cx="71" cy="44" r="1" fill="white"/></g><circle cx="44" cy="52" r="5" fill="#FF8A80" opacity="0.5"/><circle cx="76" cy="52" r="5" fill="#FF8A80" opacity="0.5"/><polygon points="55,53 65,53 60,62" fill="#FF8F00"/><g style="animation:sway 1s ease-in-out infinite;transform-origin:22px 85px"><path d="M22 75 Q5 95 15 125 Q20 130 25 120 Q18 100 30 80Z" fill="#37474F"/></g><g style="animation:sway 1s ease-in-out 0.5s infinite;transform-origin:98px 85px"><path d="M98 75 Q115 95 105 125 Q100 130 95 120 Q102 100 90 80Z" fill="#37474F"/></g><ellipse cx="42" cy="143" rx="12" ry="5" fill="#FF8F00"/><ellipse cx="78" cy="143" rx="12" ry="5" fill="#FF8F00"/><polygon points="55,68 60,73 65,68" fill="#F44336"/><polygon points="55,78 60,73 65,78" fill="#F44336"/><circle cx="60" cy="73" r="3" fill="#E53935"/></svg>`,

    unicorn: () => `<div class="scene-bg" style="background:linear-gradient(135deg,#fce4ec 0%,#e1bee7 30%,#d1c4e9 60%,#bbdefb 100%)"></div><svg style="position:absolute;top:5%;left:5%;width:70%;height:60%;opacity:0.5" viewBox="0 0 200 100"><path d="M5 100 A95 95 0 0 1 195 100" fill="none" stroke="#EF5350" stroke-width="6" opacity="0.7"/><path d="M12 100 A88 88 0 0 1 188 100" fill="none" stroke="#FF9800" stroke-width="6" opacity="0.7"/><path d="M19 100 A81 81 0 0 1 181 100" fill="none" stroke="#FFEB3B" stroke-width="6" opacity="0.7"/><path d="M26 100 A74 74 0 0 1 174 100" fill="none" stroke="#66BB6A" stroke-width="6" opacity="0.7"/><path d="M33 100 A67 67 0 0 1 167 100" fill="none" stroke="#42A5F5" stroke-width="6" opacity="0.7"/><path d="M40 100 A60 60 0 0 1 160 100" fill="none" stroke="#AB47BC" stroke-width="6" opacity="0.7"/></svg>${[...Array(15)].map((_, i) => `<div style="position:absolute;top:${10 + Math.random() * 80}%;left:${Math.random() * 95}%;font-size:${10 + Math.random() * 16}px;animation:sparkle-pop ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite;color:${['#FFD54F', '#FF80AB', '#CE93D8', '#80DEEA', '#A5D6A7'][Math.floor(Math.random() * 5)]}">✦</div>`).join('')}<svg style="position:absolute;bottom:0;left:0;width:100%;height:20%" viewBox="0 0 200 40" preserveAspectRatio="none"><ellipse cx="30" cy="30" rx="40" ry="18" fill="white" opacity="0.6"/><ellipse cx="80" cy="25" rx="50" ry="20" fill="white" opacity="0.5"/><ellipse cx="140" cy="30" rx="45" ry="16" fill="white" opacity="0.6"/><ellipse cx="180" cy="28" rx="35" ry="18" fill="white" opacity="0.5"/></svg><svg style="position:absolute;bottom:12%;right:10%;width:180px;height:60%;animation:float 3.5s ease-in-out infinite" viewBox="0 0 160 200"><ellipse cx="80" cy="130" rx="45" ry="35" fill="white"/><rect x="48" y="155" width="12" height="35" rx="6" fill="white"/><rect x="68" y="158" width="12" height="35" rx="6" fill="#F5F5F5"/><rect x="88" y="158" width="12" height="35" rx="6" fill="white"/><rect x="100" y="155" width="12" height="35" rx="6" fill="#F5F5F5"/><ellipse cx="54" cy="192" rx="8" ry="4" fill="#CE93D8"/><ellipse cx="74" cy="195" rx="8" ry="4" fill="#CE93D8"/><ellipse cx="94" cy="195" rx="8" ry="4" fill="#CE93D8"/><ellipse cx="106" cy="192" rx="8" ry="4" fill="#CE93D8"/><path d="M50 130 Q40 90 50 60 Q55 50 65 55 Q70 100 80 120" fill="white"/><ellipse cx="48" cy="55" rx="22" ry="18" fill="white" transform="rotate(-10 48 55)"/><polygon points="48,32 42,35 40,8" fill="#FFD54F" stroke="#FFC107" stroke-width="1"/><circle cx="40" cy="8" r="5" fill="#FFD54F" opacity="0.3"><animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite"/></circle><path d="M55 38 L65 22 L58 40" fill="white" stroke="#E0E0E0" stroke-width="1"/><g style="animation:blink 5s ease-in-out infinite"><circle cx="40" cy="52" r="5" fill="#4A148C"/><circle cx="41" cy="51" r="2" fill="white"/></g><circle cx="30" cy="58" r="2" fill="#E0E0E0"/><path d="M28 62 Q33 66 38 63" fill="none" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/><path d="M60 40 Q72 50 68 70 Q64 85 70 100" fill="#FF80AB" opacity="0.8"><animate attributeName="d" values="M60 40 Q72 50 68 70 Q64 85 70 100;M60 40 Q75 55 68 75 Q60 90 70 95;M60 40 Q72 50 68 70 Q64 85 70 100" dur="3s" repeatCount="indefinite"/></path><path d="M125 125 Q140 110 135 95 Q130 80 145 75" fill="none" stroke="#FF80AB" stroke-width="6" stroke-linecap="round" opacity="0.8"><animate attributeName="d" values="M125 125 Q140 110 135 95 Q130 80 145 75;M125 125 Q145 115 135 100 Q125 85 145 70;M125 125 Q140 110 135 95 Q130 80 145 75" dur="2.5s" repeatCount="indefinite"/></path></svg>`
};

// ============================================================
// PARTICLES
// ============================================================
function createParticle(container) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 2 + Math.random() * 4;
    const hue = Math.random() > 0.5 ? 270 + Math.random() * 60 : 30 + Math.random() * 30;
    Object.assign(p.style, {
        width: size + 'px', height: size + 'px',
        left: Math.random() * 100 + 'vw', top: '-8px',
        background: `hsla(${hue},80%,75%,${0.3 + Math.random() * 0.4})`,
        boxShadow: `0 0 ${size * 2}px hsla(${hue},80%,75%,0.4)`,
    });
    const dur = 5000 + Math.random() * 7000;
    const sway = (Math.random() - 0.5) * 120;
    p.animate([
        { transform: 'translate(0,0)', opacity: 0 },
        { opacity: 0.8, offset: 0.1 },
        { opacity: 0.6, offset: 0.7 },
        { transform: `translate(${sway}px,100vh)`, opacity: 0 }
    ], { duration: dur, easing: 'linear' });
    container.appendChild(p);
    setTimeout(() => p.remove(), dur);
}

// ============================================================
// MAP CAMERA ENGINE — full rewrite
// ============================================================
class MapCamera {
    constructor(viewport, canvas) {
        this.vp = viewport;
        this.cv = canvas;
        this.scale = 1;
        this.x = 0;
        this.y = 0;
        this.minScale = 1;
        this.maxScale = 4;
        this.animId = null;

        // Drag state
        this.dragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragLastX = 0;
        this.dragLastY = 0;

        // Pinch state
        this.pinching = false;
        this.pinchDist0 = 0;
        this.pinchScale0 = 1;
        this.pinchMidX = 0;
        this.pinchMidY = 0;

        // Inertia state
        this.velocityX = 0;
        this.velocityY = 0;
        this.lastTime = 0;
        this.inertiaId = null;
        this.friction = 0.95; // Higher = more slide

        this._bind();
    }

    /* ---------- sizing ---------- */
    // The SVG is 1400x900. We want the canvas to be sized so the
    // village strip is always visible. On mobile portrait the canvas
    // will be wider than the viewport so you can pan left/right.
    layout() {
        const vr = this.vp.getBoundingClientRect();
        const SVG_AR = 1400 / 900;
        const vpAR = vr.width / vr.height;

        let cw, ch;
        if (vpAR >= SVG_AR) {
            // landscape/desktop — width-fill
            cw = vr.width;
            ch = vr.width / SVG_AR;
        } else {
            // portrait/mobile — height-fill, canvas wider than viewport
            ch = vr.height;
            cw = vr.height * SVG_AR;
        }

        this.cv.style.width = cw + 'px';
        this.cv.style.height = ch + 'px';
        this.canvasW = cw;
        this.canvasH = ch;
        this.vpW = vr.width;
        this.vpH = vr.height;
    }

    /* ---------- clamping ---------- */
    // Clamp so the visible area always shows the village (bottom of SVG),
    // never scrolling into empty space. When at scale=1 on mobile, allow
    // horizontal pan across the full village.
    clamp() {
        const sw = this.canvasW * this.scale;
        const sh = this.canvasH * this.scale;

        // X: can pan within canvas width
        const minX = this.vpW - sw;
        const maxX = 0;
        this.x = Math.min(maxX, Math.max(minX, this.x));

        // Y: anchor to bottom. The houses are at the bottom of the SVG.
        // Don't let user scroll up to see too much sky or down past the ground.
        const minY = this.vpH - sh;
        const maxY = 0;
        this.y = Math.min(maxY, Math.max(minY, this.y));
    }

    apply() {
        this.cv.style.transform = `translate(${this.x}px,${this.y}px) scale(${this.scale})`;
    }

    /* ---------- zoom at point ---------- */
    zoomAt(px, py, newScale) {
        newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale));
        const ratio = newScale / this.scale;
        this.x = px - ratio * (px - this.x);
        this.y = py - ratio * (py - this.y);
        this.scale = newScale;
        this.clamp();
        this.apply();
    }

    zoomIn() {
        this.zoomAt(this.vpW / 2, this.vpH / 2, this.scale + 0.4);
    }

    zoomOut() {
        this.zoomAt(this.vpW / 2, this.vpH / 2, this.scale - 0.4);
    }

    /* ---------- reset to home ---------- */
    resetHome(activeMarker) {
        if (activeMarker) {
            this.flyTo(activeMarker, 1.6, 800);
        } else {
            this._animateTo(this._homeX(), this._homeY(), 1, 600);
        }
    }

    _homeX() {
        return -(this.canvasW - this.vpW) / 2;
    }
    _homeY() {
        // Anchor to bottom
        return this.vpH - this.canvasH;
    }

    /* ---------- initial layout + position ---------- */
    initPosition() {
        this.layout();
        this.scale = 1;
        // Start centred horizontally, anchored to bottom
        this.x = this._homeX();
        this.y = this._homeY();
        this.clamp();
        this.apply();
    }

    /* ---------- cinematic fly-in ---------- */
    // Start zoomed out (showing full village from afar), then fly into the active house
    flyIn(targetMarker, delay = 300) {
        // Step 1: show the full village at scale 1 (no border gaps)
        this.layout();
        this.scale = 1;
        this.x = this._homeX();
        this.y = this._homeY();
        this.clamp();
        this.apply();

        // Step 2: after delay, smoothly zoom into the active house
        setTimeout(() => {
            if (targetMarker) {
                this.flyTo(targetMarker, 1.6, 1500);
            } else {
                this._animateTo(this._homeX(), this._homeY(), 1, 1200);
            }
        }, delay);
    }

    /* ---------- fly to element ---------- */
    flyTo(el, targetScale, duration = 800) {
        targetScale = Math.max(this.minScale, Math.min(this.maxScale, targetScale));

        // Get element position relative to canvas (in unscaled coords)
        const cvRect = this.cv.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const elCX = (elRect.left + elRect.width / 2 - cvRect.left) / this.scale;
        const elCY = (elRect.top + elRect.height / 2 - cvRect.top) / this.scale;

        // Target translation to centre the element in the viewport
        let tx = this.vpW / 2 - elCX * targetScale;
        let ty = this.vpH / 2 - elCY * targetScale;

        // Clamp
        const sw = this.canvasW * targetScale;
        const sh = this.canvasH * targetScale;
        tx = Math.min(0, Math.max(this.vpW - sw, tx));
        ty = Math.min(0, Math.max(this.vpH - sh, ty));

        this._animateTo(tx, ty, targetScale, duration);
    }

    _animateTo(tx, ty, ts, dur) {
        this.stopInertia();
        if (this.animId) cancelAnimationFrame(this.animId);
        const sx = this.x, sy = this.y, ss = this.scale;
        const t0 = performance.now();
        const step = (now) => {
            let t = Math.min(1, (now - t0) / dur);
            // easeInOutCubic
            t = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            this.scale = ss + (ts - ss) * t;
            this.x = sx + (tx - sx) * t;
            this.y = sy + (ty - sy) * t;
            this.apply();
            if (t < 1) this.animId = requestAnimationFrame(step);
            else this.animId = null;
        };
        this.animId = requestAnimationFrame(step);
    }

    /* ---------- inertia ---------- */
    stopInertia() {
        if (this.inertiaId) {
            cancelAnimationFrame(this.inertiaId);
            this.inertiaId = null;
        }
    }

    startInertia() {
        this.stopInertia();
        const step = () => {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.velocityX *= this.friction;
            this.velocityY *= this.friction;

            this.clamp();
            this.apply();

            if (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) {
                this.inertiaId = requestAnimationFrame(step);
            } else {
                this.inertiaId = null;
            }
        };
        this.inertiaId = requestAnimationFrame(step);
    }

    /* ---------- event binding ---------- */
    _bind() {
        // Wheel zoom
        this.vp.addEventListener('wheel', e => {
            e.preventDefault();
            const d = e.deltaY > 0 ? -0.15 : 0.15;
            const r = this.vp.getBoundingClientRect();
            this.zoomAt(e.clientX - r.left, e.clientY - r.top, this.scale + d);
        }, { passive: false });

        // Mouse drag
        this.vp.addEventListener('mousedown', e => {
            if (e.target.closest('.day-marker,.zoom-btn')) return;
            this.stopInertia();
            this.dragging = true;
            this.dragStartX = e.clientX - this.x;
            this.dragStartY = e.clientY - this.y;
            this.lastTime = performance.now();
            this.velocityX = 0;
            this.velocityY = 0;
        });
        window.addEventListener('mousemove', e => {
            if (!this.dragging) return;
            const now = performance.now();
            const dt = now - this.lastTime;
            const nextX = e.clientX - this.dragStartX;
            const nextY = e.clientY - this.dragStartY;

            if (dt > 0) {
                this.velocityX = (nextX - this.x) / (dt / 16);
                this.velocityY = (nextY - this.y) / (dt / 16);
            }

            this.x = nextX;
            this.y = nextY;
            this.lastTime = now;
            this.clamp();
            this.apply();
        });
        window.addEventListener('mouseup', () => {
            if (this.dragging) {
                this.dragging = false;
                this.startInertia();
            }
        });

        // Touch: pinch + drag
        this.vp.addEventListener('touchstart', e => {
            if (e.target.closest('.day-marker,.zoom-btn')) return;
            this.stopInertia();
            if (e.touches.length === 2) {
                e.preventDefault();
                this.pinching = true;
                this.dragging = false;
                this.pinchDist0 = this._tDist(e);
                this.pinchScale0 = this.scale;
                const r = this.vp.getBoundingClientRect();
                this.pinchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left;
                this.pinchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top;
            } else if (e.touches.length === 1 && !this.pinching) {
                this.dragging = true;
                this.dragStartX = e.touches[0].clientX - this.x;
                this.dragStartY = e.touches[0].clientY - this.y;
                this.lastTime = performance.now();
                this.velocityX = 0;
                this.velocityY = 0;
            }
        }, { passive: false });

        this.vp.addEventListener('touchmove', e => {
            if (e.touches.length === 2 && this.pinching) {
                e.preventDefault();
                const dist = this._tDist(e);
                const ns = this.pinchScale0 * (dist / this.pinchDist0);
                // Update pinch midpoint as fingers move
                const r = this.vp.getBoundingClientRect();
                const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left;
                const my = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top;
                this.zoomAt(mx, my, ns);
            } else if (e.touches.length === 1 && this.dragging) {
                e.preventDefault();
                const now = performance.now();
                const dt = now - this.lastTime;
                const nextX = e.touches[0].clientX - this.dragStartX;
                const nextY = e.touches[0].clientY - this.dragStartY;

                if (dt > 0) {
                    this.velocityX = (nextX - this.x) / (dt / 16);
                    this.velocityY = (nextY - this.y) / (dt / 16);
                }

                this.x = nextX;
                this.y = nextY;
                this.lastTime = now;
                this.clamp();
                this.apply();
            }
        }, { passive: false });

        this.vp.addEventListener('touchend', e => {
            if (e.touches.length < 2) this.pinching = false;
            if (e.touches.length === 0) {
                if (this.dragging) {
                    this.dragging = false;
                    this.startInertia();
                }
            }
            // When going from 2 fingers to 1, reset drag origin
            if (e.touches.length === 1 && !this.pinching) {
                this.dragging = true;
                this.dragStartX = e.touches[0].clientX - this.x;
                this.dragStartY = e.touches[0].clientY - this.y;
                this.lastTime = performance.now();
                this.velocityX = 0;
                this.velocityY = 0;
            }
        });
    }

    _tDist(e) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().getDay();
    const urlParams = new URLSearchParams(window.location.search);
    const isTestMode = urlParams.has('test');

    const markers = document.querySelectorAll('.day-marker');
    const modal = document.getElementById('surprise-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const backdrop = modal.querySelector('.modal-backdrop');
    const sceneContainer = document.getElementById('scene-container');
    const titleEl = document.getElementById('surprise-title');
    const poemEl = document.getElementById('surprise-poem');
    const viewport = document.getElementById('map-viewport');
    const canvas = document.getElementById('map-canvas');

    // --- Test mode banner ---
    if (isTestMode) {
        document.body.classList.add('test-mode');
        const banner = document.createElement('div');
        banner.className = 'test-banner';
        banner.textContent = '🧪 TEST MODE — Všetky dni sú odomknuté';
        document.body.prepend(banner);
    }

    // --- Particles ---
    const pContainer = document.createElement('div');
    Object.assign(pContainer.style, { position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '1' });
    document.body.appendChild(pContainer);
    setInterval(() => createParticle(pContainer), 400);

    // --- Camera ---
    const cam = new MapCamera(viewport, canvas);

    // --- Position markers to match SVG coordinates ---
    function repositionMarkers() {
        const scaleX = cam.canvasW / 1400;
        const scaleY = cam.canvasH / 900;
        markers.forEach(m => {
            const sx = parseFloat(m.dataset.svgX);
            const sy = parseFloat(m.dataset.svgY);
            m.style.left = (sx * scaleX) + 'px';
            m.style.top = (sy * scaleY) + 'px';
        });
    }

    // Initial setup
    cam.initPosition();
    repositionMarkers();

    window.addEventListener('resize', () => {
        cam.layout();
        cam.clamp();
        cam.apply();
        repositionMarkers();
    });
    window.addEventListener('orientationchange', () => setTimeout(() => {
        cam.layout();
        cam.clamp();
        cam.apply();
        repositionMarkers();
    }, 200));

    // --- Marker logic ---
    let activeMarker = null;
    markers.forEach(marker => {
        const dayNum = parseInt(marker.dataset.day);
        if (dayNum === today || isTestMode) {
            marker.classList.remove('locked');
            marker.classList.add('unlocked');
            if (!activeMarker) activeMarker = marker;
        }

        marker.addEventListener('click', e => {
            e.stopPropagation();
            if (marker.classList.contains('locked')) {
                marker.classList.add('shake');
                setTimeout(() => marker.classList.remove('shake'), 500);
                return;
            }
            openModal(dayNum);
        });
    });

    // --- Zoom controls ---
    document.getElementById('zoom-in').addEventListener('click', () => cam.zoomIn());
    document.getElementById('zoom-out').addEventListener('click', () => cam.zoomOut());
    document.getElementById('zoom-home').addEventListener('click', () => cam.resetHome(activeMarker));

    // --- Cinematic fly-in on load ---
    setTimeout(() => cam.flyIn(activeMarker, 400), 100);

    // --- Slide hints (mobile) ---
    const hintL = document.getElementById('hint-left');
    const hintR = document.getElementById('hint-right');
    if (window.innerWidth < window.innerHeight) {
        // Portrait mode — show hints briefly
        hintL.classList.add('visible');
        hintR.classList.add('visible');
        setTimeout(() => {
            hintL.classList.add('fade-out');
            hintR.classList.add('fade-out');
        }, 4000);
        setTimeout(() => {
            hintL.classList.remove('visible', 'fade-out');
            hintR.classList.remove('visible', 'fade-out');
        }, 5500);
    }

    // --- Audio System ---
    const audioToggle = document.getElementById('audio-toggle');
    const bgAudio = document.getElementById('bg-audio');
    let isAudioEnabled = false;
    let currentSceneAudio = null;
    let hasInteractedForAudio = false;

    bgAudio.volume = 0;

    function fadeAudio(audioEl, targetVol, duration = 1000) {
        if (!audioEl) return;
        if (audioEl._fadeInterval) clearInterval(audioEl._fadeInterval);

        const startVol = audioEl.volume;
        const steps = 25;
        const stepTime = duration / steps;
        const volStep = (targetVol - startVol) / steps;

        if (targetVol > 0 && audioEl.paused) {
            audioEl.volume = 0;
            audioEl.play().catch(e => console.log('Audio autoplay blocked', e));
        }

        let currentStep = 0;
        audioEl._fadeInterval = setInterval(() => {
            currentStep++;
            let newVol = startVol + (volStep * currentStep);
            if (newVol > 1) newVol = 1;
            if (newVol < 0) newVol = 0;
            audioEl.volume = newVol;

            if (currentStep >= steps) {
                clearInterval(audioEl._fadeInterval);
                audioEl.volume = targetVol;
                if (targetVol === 0) audioEl.pause();
            }
        }, stepTime);
    }

    function getTargetSceneVolume(audioEl) {
        if (!audioEl) return 0.4;
        // Day 5 is the Sun scene
        if (audioEl.id === 'scene-audio-5') return 1.0;
        return 0.4; // make other days quieter (from 0.8 to 0.4)
    }

    audioToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        hasInteractedForAudio = true;
        isAudioEnabled = !isAudioEnabled;

        if (isAudioEnabled) {
            audioToggle.classList.remove('muted');
            if (modal.classList.contains('hidden')) {
                fadeAudio(bgAudio, 0.4, 800);
            } else if (currentSceneAudio) {
                fadeAudio(currentSceneAudio, getTargetSceneVolume(currentSceneAudio), 800);
            }
        } else {
            audioToggle.classList.add('muted');
            fadeAudio(bgAudio, 0, 500);
            if (currentSceneAudio) fadeAudio(currentSceneAudio, 0, 500);
            // Explicitly pause after fade
            setTimeout(() => {
                bgAudio.pause();
                if (currentSceneAudio) currentSceneAudio.pause();
            }, 600);
        }
    });

    // Auto-enable audio on first user interaction anywhere if not explicitly muted/unmuted yet
    function handleFirstInteraction() {
        if (!hasInteractedForAudio) {
            hasInteractedForAudio = true;
            isAudioEnabled = true;
            audioToggle.classList.remove('muted');
            if (modal.classList.contains('hidden')) {
                fadeAudio(bgAudio, 0.4, 1000);
            } else if (currentSceneAudio) {
                fadeAudio(currentSceneAudio, getTargetSceneVolume(currentSceneAudio), 1000);
            }
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
    }
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    // --- Modal ---
    function openModal(dayNum) {
        const data = surprises[dayNum];
        if (!data) return;
        titleEl.textContent = data.title;
        poemEl.textContent = data.poem;
        const sceneFn = scenes[data.scene];
        sceneContainer.innerHTML = sceneFn ? sceneFn() : '';
        modal.classList.remove('hidden');

        // Audio logic
        currentSceneAudio = document.getElementById(`scene-audio-${dayNum}`);

        // Safety: pause any other scene audios
        document.querySelectorAll('audio[id^="scene-audio-"]').forEach(audio => {
            if (audio !== currentSceneAudio) {
                fadeAudio(audio, 0, 300);
                setTimeout(() => {
                    if (audio.volume === 0) audio.pause();
                }, 350);
            }
        });

        if (isAudioEnabled) {
            fadeAudio(bgAudio, 0.0, 1500); // Fade out bg slowly
            if (currentSceneAudio) {
                fadeAudio(currentSceneAudio, getTargetSceneVolume(currentSceneAudio), 1000); // Fade in scene music
            }
        }
    }

    function closeModal() {
        modal.classList.add('hidden');
        setTimeout(() => { sceneContainer.innerHTML = ''; }, 500);

        // Audio logic
        if (isAudioEnabled) {
            fadeAudio(bgAudio, 0.4, 1500); // Fade bg back in
            if (currentSceneAudio) {
                fadeAudio(currentSceneAudio, 0, 800);
            }
        } else {
            if (currentSceneAudio) fadeAudio(currentSceneAudio, 0, 300);
        }

        // Ensure paused
        const audioToPause = currentSceneAudio;
        setTimeout(() => {
            if (audioToPause && audioToPause.volume === 0) audioToPause.pause();
        }, 850);

        currentSceneAudio = null;
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
});
