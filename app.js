const calendar = document.getElementById("calendar")

/* 六曜 */

const rokuyo = [
"先勝","友引","先負","仏滅","大安","赤口"
]

function getRokuyo(date){

const base = new Date(2020,0,1)

const diff = Math.floor((date-base)/86400000)

return rokuyo[(diff+2)%6]

}


/* 月齢 */

function moonAge(date){

const lp = 2551443
const newMoon = new Date(1970,0,7,20,35,0)

const phase = (date-newMoon)/1000%lp

return Math.floor(phase/(24*3600))

}


/* 干支 */

const eto=[
"子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"
]

function etoDay(date){

const base=new Date(2020,0,1)

const diff=Math.floor((date-base)/86400000)

return eto[diff%12]

}


/* 開運日 */

function luckyDay(date){

let list=[]

const eto=etoDay(date)

if(eto=="寅") list.push("🐯寅の日")

if(eto=="巳") list.push("🐍巳の日")

/* 簡易 一粒万倍日 */

if(date.getDate()%9==0) list.push("💰一粒万倍日")

/* 天赦日（年数回） */

if(
(date.getMonth()==2 && date.getDate()==5) ||
(date.getMonth()==7 && date.getDate()==12)
){
list.push("💎天赦日")
}

return list.join(" ")

}


/* カレンダー */

function generateCalendar(){

const now=new Date()

const year=now.getFullYear()
const month=now.getMonth()

const last=new Date(year,month+1,0).getDate()

for(let i=1;i<=last;i++){

const date=new Date(year,month,i)

const div=document.createElement("div")

div.className="day"

const r=getRokuyo(date)

const moon=moonAge(date)

let moonIcon=""

if(moon==0) moonIcon="🌑"
if(moon==14) moonIcon="🌕"

const lucky=luckyDay(date)

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

fortune.innerHTML=`
ラッキーカラー：金<br>
ラッキーフラワー：桜<br>
ラッキーアイテム：財布
`

memo.value=localStorage.getItem(date)||""

}


function saveMemo(){

localStorage.setItem(dateTitle.innerText,memo.value)

alert("保存")

}


function closeDetail(){

detail.style.display="none"

}

generateCalendar()
