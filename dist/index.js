!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ManhattanEssentials=t():e.ManhattanEssentials=t()}(this,function(){return function(e){function __webpack_require__(r){if(t[r])return t[r].exports;var n=t[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,__webpack_require__),n.loaded=!0,n.exports}var t={};return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.p="",__webpack_require__(0)}([function(e,t,r){e.exports=r(1)},function(e,t){var r,n,u,o,i,a,c,s,p=[].indexOf||function(e){for(var t=0,r=this.length;t<r;t++)if(t in this&&this[t]===e)return t;return-1};n=function(e,t){var r,n,u;null==t&&(t={}),r=document.createElement(e);for(n in t)u=t[n],p.call(r,n)>=0?r[n]=u:r.setAttribute(n,u);return r},c=function(e,t){return null==t&&(t=document),Array.prototype.slice.call(t.querySelectorAll(e))},s=function(e,t){return null==t&&(t=document),t.querySelector(e)},u=function(e,t,r){var n,u,o;null==r&&(r={}),n=document.createEvent("Event"),n.initEvent(t,!0,!0);for(u in r)o=r[u],n[u]=o;return e.dispatchEvent(n)},i=function(e,t){var r,n,u,o;o=[];for(n in t)u=t[n],o.push(function(){var t,o,i,a;for(i=n.split(/\s+/),a=[],t=0,o=i.length;t<o;t++)r=i[t],a.push(e.removeEventListener(r,u));return a}());return o},a=function(e,t){var r,n,u,o;o=[];for(n in t)u=t[n],o.push(function(){var t,o,i,a;for(i=n.split(/\s+/),a=[],t=0,o=i.length;t<o;t++)r=i[t],a.push(e.addEventListener(r,u));return a}());return o},r=function(e,t,r,n,u){var o,i,a,c;null==u&&(u="data-"),a=[];for(i in t)c=t[i],e[i]=c,r.hasOwnProperty(i)&&(e[i]=r[i]),n&&(o=u+i.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),n.hasAttribute(o)?"number"==typeof c?a.push(e[i]=parseInt(n.getAttribute(o))):c===!1?a.push(e[i]=!0):a.push(e[i]=n.getAttribute(o)):a.push(void 0));return a},o=function(e){return e.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g,"\\$&")},e.exports={create:n,one:s,many:c,dispatch:u,ignore:i,listen:a,config:r,escapeRegExp:o}}])});