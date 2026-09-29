const routes = {
 "กรุงเทพมหานคร": {"เชียงใหม่": 685,"นครราชสีมา": 260,"ขอนแก่น": 450,"ชลบุรี": 150,"ภูเก็ต": 840,"สงขลา": 950},
 "เชียงใหม่": {"กรุงเทพมหานคร": 685,"ขอนแก่น": 540,"นครราชสีมา": 700,"ภูเก็ต": 1520},
 "นครราชสีมา": {"กรุงเทพมหานคร": 260,"ขอนแก่น": 200,"เชียงใหม่": 700,"ชลบุรี": 330},
 "ขอนแก่น": {"กรุงเทพมหานคร": 450,"นครราชสีมา": 200,"เชียงใหม่": 540,"ภูเก็ต": 1100,"อุดรธานี": 120},
 "ชลบุรี": {"กรุงเทพมหานคร": 150,"นครราชสีมา": 330,"ระยอง": 70},
 "ภูเก็ต": {"กรุงเทพมหานคร": 840,"เชียงใหม่": 1520,"ขอนแก่น": 1100,"สงขลา": 420},
 "สงขลา": {"กรุงเทพมหานคร": 950,"ภูเก็ต": 420,"นครศรีธรรมราช": 160},
 "อุดรธานี": {"ขอนแก่น": 120,"กรุงเทพมหานคร": 570},
 "ระยอง": {"ชลบุรี": 70,"กรุงเทพมหานคร": 180},
 "นครศรีธรรมราช": {"สงขลา": 160,"กรุงเทพมหานคร": 780}
};

const provinces = [...new Set([...Object.keys(routes), ...Object.values(routes).flatMap(x=>Object.keys(x))])].sort((a,b)=>a.localeCompare(b,'th'));
const from = document.querySelector('#from'), to = document.querySelector('#to');
function fill(){
  provinces.forEach(p=>{from.add(new Option(p,p));to.add(new Option(p,p));});
  from.value="กรุงเทพมหานคร"; to.value="เชียงใหม่";
}
function getDistance(a,b){
  if(a===b) return 0;
  if(routes[a]?.[b]) return routes[a][b];
  if(routes[b]?.[a]) return routes[b][a];
  return null;
}
document.querySelector('#find').onclick=()=>{
  const a=from.value,b=to.value,d=getDistance(a,b),box=document.querySelector('#result');
  box.classList.remove('hidden');
  if(d===null){box.innerHTML=`<h3>ยังไม่มีข้อมูลเส้นทาง</h3><p>สามารถเพิ่มระยะทางของ ${a} → ${b} ในไฟล์ script.js ได้</p>`;return}
  const hours=(d/55).toFixed(1);
  box.innerHTML=`<h3>${a} → ${b}</h3><div class="distance">${d.toLocaleString()} <small>กิโลเมตร</small></div><div class="route-line">🚌 เวลาประมาณ ${hours} ชั่วโมง · ความเร็วเฉลี่ยสมมติ 55 กม./ชม.</div>`;
};
document.querySelector('#swap').onclick=()=>{[from.value,to.value]=[to.value,from.value];document.querySelector('#find').click()};
const cards=document.querySelector('#routeCards');
const examples=[["กรุงเทพมหานคร","เชียงใหม่"],["กรุงเทพมหานคร","นครราชสีมา"],["กรุงเทพมหานคร","ภูเก็ต"],["กรุงเทพมหานคร","ขอนแก่น"],["ชลบุรี","ระยอง"],["ภูเก็ต","สงขลา"]];
examples.forEach(([a,b])=>{const d=getDistance(a,b);cards.innerHTML+=`<div class="card"><b>🚌 เส้นทาง</b><strong>${a} → ${b}</strong><span>${d?.toLocaleString()||"-"} กม.</span></div>`});
fill();