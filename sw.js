self.addEventListener("install",e=>{

e.waitUntil(

caches.open("kaiun").then(cache=>{

return cache.addAll([
"/",
"/index.html",
"/app.js"
])

})

)

})
