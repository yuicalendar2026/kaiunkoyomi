const calendar=document.getElementById("calendar")

/* 六曜 */

const rokuyo=["先勝","友引","先負","仏滅","大安","赤口"]

const baseDate=new Date("2026-03-05")
const baseIndex=4

function getRokuyo(date){

let diff=Math.floor((date-baseDate)/86400000)

let index=(baseIndex+diff)%6

if(index<0) index+=6

return rokuyo[index]

}


/* 月齢 */

function moonAge(date){

const lp=2551443
const newMoon=new Date(1970,0,7,20,35,0)

const phase=(date-newMoon)/1000%lp

return Math.floor(phase/(24*3600))

}


/* 開運日データ */

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


/* ラッキー */

const colors=["金","白","紫","青","赤"]
const flowers=["桜","薔薇","蘭","椿","百合"]
const items=["財布","アクセサリー","本","鏡","香水"]


function generateCalendar(){

const now=new Date()

const year=now.getFullYear()
const month=now.getMonth()

const last=new Date(year,month+1,0).getDate()

for(let i=1;i<=last;i++){

const date=new Date(year,month,i)

const y=date.getFullYear()
const m=(date.getMonth()+1).toString().padStart(2,"0")
const d=i.toString().padStart(2,"0")

const key=`${y}-${m}-${d}`

const div=document.createElement("div")
div.className="day"

const r=getRokuyo(date)

const moon=moonAge(date)

let moonIcon=""

if(moon==0) moonIcon="🌑"
if(moon==14) moonIcon="🌕"

let lucky=luckyDays[key]?luckyDays[key].join(" "):""

div.innerHTML=`
<b>${i}</b>
<div class="event">${r}</div>
<div class="event">${moonIcon}</div>
<div class="event">${lucky}</div>
`

div.onclick=()=>openDetail(date)

calendar.appendChild(div)

}

}


function openDetail(date){

detail.style.display="block"

dateTitle.innerText=date.toDateString()

let color=colors[Math.floor(Math.random()*colors.length)]

let flower=flowers[Math.floor(Math.random()*flowers.length)]

let item=items[Math.floor(Math.random()*items.length)]

fortune.innerHTML=`

🎨ラッキーカラー：${color}<br>
🌸ラッキーフラワー：${flower}<br>
🍀ラッキーアイテム：${item}<br>
🧭吉方位：東南

`

memo.value=localStorage.getItem(dateTitle.innerText)||""

showShrine()

}


function saveMemo(){

localStorage.setItem(dateTitle.innerText,memo.value)

alert("保存しました")

}


function closeDetail(){
detail.style.display="none"
}


/* 神社検索 */

function showShrine(){

navigator.geolocation.getCurrentPosition(pos=>{

let lat=pos.coords.latitude
let lon=pos.coords.longitude

shrine.innerHTML=`
<br>
<a target="_blank"
href="https://www.google.com/maps/search/神社/@${lat},${lon},12z">
⛩ 吉方位の神社を探す
</a>
`

})

}

generateCalendar()
