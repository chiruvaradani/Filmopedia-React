import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import Store from './Store/store';
import swDev from './swDev'

window.document.body.style.backgroundColor = '#000'
const styleLink = document.createElement("link");

// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);

window.document.body.style.cursor = 'url(https://th.bing.com/th/id/OIP.oQ0mPfX2LYndOG6S_k8A7wHaHa?pid=ImgDet&rs=1)'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={Store}>
   <SkeletonTheme baseColor="#313131" highlightColor="#525252" >
    <BrowserRouter basename="/FilmopediaDB">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </SkeletonTheme>
 </Provider>
);

swDev()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
