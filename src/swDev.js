export default function swDev(){
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`

navigator.serviceWorker.register(swUrl).then( (registration) =>{
    // Service worker registration successful.
    console.log('Service Worker registered with scope:', registration.scope);
}).catch( (error)=> {
    // Service worker registration failed.
    console.error('Service Worker registration failed:', error);
});

}