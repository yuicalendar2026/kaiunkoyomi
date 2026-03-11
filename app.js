const rokuyo=["先勝","友引","先負","仏滅","大安","赤口"]

const colors={
1:"金",
2:"黒",
3:"青",
4:"緑",
5:"黄",
6:"白",
7:"赤",
8:"茶",
9:"紫"
}

const flowers=["桜","百合","蘭","椿","菊"]
const items=["財布","香水","本","鏡","アクセサリー"]

function moonAge(date){

let lp=2551443
let new_moon=new Date(1970,0,7,20,35,0)

let phase=(date-new_moon)/1000%lp

return Math.floor(phase/(24*3600))

}

function fortuneDay(date){

let list=[]

if(date.getDate()%10==0) list.push("💰一粒万倍日")

if(date.getDate()==5) list.push("💎天赦日")

if(date.getDate()%12==3) list.push("🐯寅の日")

if(date.getDate()%12==6) list.push("🐍巳の日")

return list.join(" ")

}

function generateCalendar(){

let today=new Date()

let year=today.getFullYear()
let month=today.getMonth()

let last=new Date(year,month+1,0).getDate()

for(let i=1;i<=last;i++){

let date=new Date(year,month,i)

let div=document.createElement("div")
div.className="day"

let moon=moonAge(date)

let moonIcon=""

if(moon==0) moonIcon="🌑"
if(moon==14) moonIcon="🌕"

div.innerHTML=`

<b>${i}</b>
<div class="event">${rokuyo[i%6]}</div>
<div class="event">${moonIcon}</div>
<div class="event">${fortuneDay(date)}</div>

`

div.onclick=()=>openDetail(date)

calendar.appendChild(div)

}

}

function openDetail(date){

detail.style.display="block"

dateTitle.innerText=date.toDateString()

let star=(date.getFullYear()+date.getMonth()+date.getDate())%9+1

let color=colors[star]

let flower=flowers[Math.floor(Math.random()*flowers.length)]

let item=items[Math.floor(Math.random()*items.length)]

fortune.innerHTML=`

🎨ラッキーカラー：${color}<br>
🌸ラッキーフラワー：${flower}<br>
🍀ラッキーアイテム：${item}<br>
🧭吉方位：東南

`

memo.value=localStorage.getItem(date)||""

showShrine()

}

function showShrine(){

navigator.geolocation.getCurrentPosition(pos=>{

let lat=pos.coords.latitude
let lon=pos.coords.longitude

shrine.innerHTML=`<br>
<a target="_blank"
href="https://www.google.com/maps/search/神社/@${lat},${lon},12z">
⛩ 吉方位の神社を探す
</a>
`

})

}

function closeDetail(){
detail.style.display="none"
}

function saveMemo(){

localStorage.setItem(dateTitle.innerText,memo.value)

alert("保存しました")

}

generateCalendar()
