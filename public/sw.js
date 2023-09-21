self.addEventListener('install',(event)=>{
    console.log("SW has installed");
})
self.addEventListener('activate',(event)=>{
    console.log("SW has activated");
})