const rokuyoCycle=["先勝","友引","先負","仏滅","大安","赤口"]

/* 正確な六曜計算 */
function getRokuyo(date){

const base=new Date(2024,0,1) // 基準日
const diff=Math.floor((date-base)/86400000)

return rokuyoCycle[(diff+3)%6]

}


/* 2026年 開運日データ */
const luckyDays={

"2026-03-05":[
"💰一粒万倍日",
"💎天赦日",
"🐯寅の日"
],

"2026-03-10":[
"💰一粒万倍日"
],

"2026-03-17":[
"🐍巳の日"
],

"2026-03-22":[
"🐯寅の日"
]

}


/* 月齢計算 */
function moonAge(date){

const lp=2551443
const newMoon=new Date(1970,0,7,20,35,0)

const phase=(date-newMoon)/1000%lp

return Math.floor(phase/(24*3600))

}


function generateCalendar(){

const today=new Date()

const year=today.getFullYear()
const month=today.getMonth()

const last=new Date(year,month+1,0).getDate()

for(let i=1;i<=last;i++){

const date=new Date(year,month,i)

const y=date.getFullYear()
const m=(date.getMonth()+1).toString().padStart(2,"0")
const d=i.toString().padStart(2,"0")

const key=`${y}-${m}-${d}`

const div=document.createElement("div")
div.className="day"

const rokuyo=getRokuyo(date)

const moon=moonAge(date)

let moonIcon=""

if(moon==0) moonIcon="🌑"
if(moon==14) moonIcon="🌕"

const lucky=luckyDays[key] ? luckyDays[key].join(" ") : ""

div.innerHTML=`

<b>${i}</b>
<div class="event">${rokuyo}</div>
<div class="event">${moonIcon}</div>
<div class="event">${lucky}</div>

`

div.onclick=()=>openDetail(date)

calendar.appendChild(div)

}

}
