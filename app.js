const calendar = document.getElementById("calendar")

const rokuyoNames = [
"先勝","友引","先負","仏滅","大安","赤口"
]

function getRokuyo(date){

const qreki = new Qreki(date)

const index = (qreki.month + qreki.day) % 6

return rokuyoNames[index]

}

function generateCalendar(){

calendar.innerHTML=""

const now=new Date()

const year=now.getFullYear()
const month=now.getMonth()

const firstDay=new Date(year,month,1).getDay()
const lastDay=new Date(year,month+1,0).getDate()

for(let i=0;i<firstDay;i++){

const empty=document.createElement("div")
calendar.appendChild(empty)

}

for(let d=1;d<=lastDay;d++){

const date=new Date(year,month,d)

const div=document.createElement("div")

div.className="day"

const rokuyo=getRokuyo(date)

div.innerHTML=`

<b>${d}</b>
<div class="event">${rokuyo}</div>

`

calendar.appendChild(div)

}

}

generateCalendar()
