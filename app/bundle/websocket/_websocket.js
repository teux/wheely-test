var swfobject=function(){function e(){if(!K){try{var e=R.getElementsByTagName("body")[0].appendChild(_("span"));e.parentNode.removeChild(e)}catch(t){return}K=!0;for(var n=P.length,o=0;n>o;o++)P[o]()}}function t(e){K?e():P[P.length]=e}function n(e){if(typeof M.addEventListener!=O)M.addEventListener("load",e,!1);else if(typeof R.addEventListener!=O)R.addEventListener("load",e,!1);else if(typeof M.attachEvent!=O)S(M,"onload",e);else if("function"==typeof M.onload){var t=M.onload;M.onload=function(){t(),e()}}else M.onload=e}function o(){x?a():i()}function a(){var e=R.getElementsByTagName("body")[0],t=_(I);t.setAttribute("type",A);var n=e.appendChild(t);if(n){var o=0;!function(){if(typeof n.GetVariable!=O){var a=n.GetVariable("$version");a&&(a=a.split(" ")[1].split(","),z.pv=[parseInt(a[0],10),parseInt(a[1],10),parseInt(a[2],10)])}else if(10>o)return o++,void setTimeout(arguments.callee,10);e.removeChild(t),n=null,i()}()}else i()}function i(){var e=D.length;if(e>0)for(var t=0;e>t;t++){var n=D[t].id,o=D[t].callbackFn,a={success:!1,id:n};if(z.pv[0]>0){var i=h(n);if(i)if(!b(D[t].swfVersion)||z.wk&&z.wk<312)if(D[t].expressInstall&&s()){var d={};d.data=D[t].expressInstall,d.width=i.getAttribute("width")||"0",d.height=i.getAttribute("height")||"0",i.getAttribute("class")&&(d.styleclass=i.getAttribute("class")),i.getAttribute("align")&&(d.align=i.getAttribute("align"));for(var f={},u=i.getElementsByTagName("param"),p=u.length,v=0;p>v;v++)"movie"!=u[v].getAttribute("name").toLowerCase()&&(f[u[v].getAttribute("name")]=u[v].getAttribute("value"));l(d,f,n,o)}else c(i),o&&o(a);else w(n,!0),o&&(a.success=!0,a.ref=r(n),o(a))}else if(w(n,!0),o){var _=r(n);_&&typeof _.SetVariable!=O&&(a.success=!0,a.ref=_),o(a)}}}function r(e){var t=null,n=h(e);if(n&&"OBJECT"==n.nodeName)if(typeof n.SetVariable!=O)t=n;else{var o=n.getElementsByTagName(I)[0];o&&(t=o)}return t}function s(){return!U&&b("6.0.65")&&(z.win||z.mac)&&!(z.wk&&z.wk<312)}function l(e,t,n,o){U=!0,g=o||null,W={success:!1,id:n};var a=h(n);if(a){"OBJECT"==a.nodeName?(k=d(a),E=null):(k=a,E=n),e.id=F,(typeof e.width==O||!/%$/.test(e.width)&&parseInt(e.width,10)<310)&&(e.width="310"),(typeof e.height==O||!/%$/.test(e.height)&&parseInt(e.height,10)<137)&&(e.height="137"),R.title=R.title.slice(0,47)+" - Flash Player Installation";var i=z.ie&&z.win?"ActiveX":"PlugIn",r="MMredirectURL="+M.location.toString().replace(/&/g,"%26")+"&MMplayerType="+i+"&MMdoctitle="+R.title;if(typeof t.flashvars!=O?t.flashvars+="&"+r:t.flashvars=r,z.ie&&z.win&&4!=a.readyState){var s=_("div");n+="SWFObjectNew",s.setAttribute("id",n),a.parentNode.insertBefore(s,a),a.style.display="none",function(){4==a.readyState?a.parentNode.removeChild(a):setTimeout(arguments.callee,10)}()}f(e,t,n)}}function c(e){if(z.ie&&z.win&&4!=e.readyState){var t=_("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(d(e),t),e.style.display="none",function(){4==e.readyState?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}()}else e.parentNode.replaceChild(d(e),e)}function d(e){var t=_("div");if(z.win&&z.ie)t.innerHTML=e.innerHTML;else{var n=e.getElementsByTagName(I)[0];if(n){var o=n.childNodes;if(o)for(var a=o.length,i=0;a>i;i++)1==o[i].nodeType&&"PARAM"==o[i].nodeName||8==o[i].nodeType||t.appendChild(o[i].cloneNode(!0))}}return t}function f(e,t,n){var o,a=h(n);if(z.wk&&z.wk<312)return o;if(a)if(typeof e.id==O&&(e.id=n),z.ie&&z.win){var i="";for(var r in e)e[r]!=Object.prototype[r]&&("data"==r.toLowerCase()?t.movie=e[r]:"styleclass"==r.toLowerCase()?i+=' class="'+e[r]+'"':"classid"!=r.toLowerCase()&&(i+=" "+r+'="'+e[r]+'"'));var s="";for(var l in t)t[l]!=Object.prototype[l]&&(s+='<param name="'+l+'" value="'+t[l]+'" />');a.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+i+">"+s+"</object>",$[$.length]=e.id,o=h(e.id)}else{var c=_(I);c.setAttribute("type",A);for(var d in e)e[d]!=Object.prototype[d]&&("styleclass"==d.toLowerCase()?c.setAttribute("class",e[d]):"classid"!=d.toLowerCase()&&c.setAttribute(d,e[d]));for(var f in t)t[f]!=Object.prototype[f]&&"movie"!=f.toLowerCase()&&u(c,f,t[f]);a.parentNode.replaceChild(c,a),o=c}return o}function u(e,t,n){var o=_("param");o.setAttribute("name",t),o.setAttribute("value",n),e.appendChild(o)}function p(e){var t=h(e);t&&"OBJECT"==t.nodeName&&(z.ie&&z.win?(t.style.display="none",function(){4==t.readyState?v(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))}function v(e){var t=h(e);if(t){for(var n in t)"function"==typeof t[n]&&(t[n]=null);t.parentNode.removeChild(t)}}function h(e){var t=null;try{t=R.getElementById(e)}catch(n){}return t}function _(e){return R.createElement(e)}function S(e,t,n){e.attachEvent(t,n),G[G.length]=[e,t,n]}function b(e){var t=z.pv,n=e.split(".");return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1}function y(e,t,n,o){if(!z.ie||!z.mac){var a=R.getElementsByTagName("head")[0];if(a){var i=n&&"string"==typeof n?n:"screen";if(o&&(C=null,T=null),!C||T!=i){var r=_("style");r.setAttribute("type","text/css"),r.setAttribute("media",i),C=a.appendChild(r),z.ie&&z.win&&typeof R.styleSheets!=O&&R.styleSheets.length>0&&(C=R.styleSheets[R.styleSheets.length-1]),T=i}z.ie&&z.win?C&&typeof C.addRule==I&&C.addRule(e,t):C&&typeof R.createTextNode!=O&&C.appendChild(R.createTextNode(e+" {"+t+"}"))}}}function w(e,t){if(V){var n=t?"visible":"hidden";K&&h(e)?h(e).style.visibility=n:y("#"+e,"visibility:"+n)}}function m(e){var t=/[\\\"<>\.;]/,n=null!=t.exec(e);return n&&typeof encodeURIComponent!=O?encodeURIComponent(e):e}{var k,E,g,W,C,T,O="undefined",I="object",N="Shockwave Flash",L="ShockwaveFlash.ShockwaveFlash",A="application/x-shockwave-flash",F="SWFObjectExprInst",B="onreadystatechange",M=window,R=document,j=navigator,x=!1,P=[o],D=[],$=[],G=[],K=!1,U=!1,V=!0,z=function(){var e=typeof R.getElementById!=O&&typeof R.getElementsByTagName!=O&&typeof R.createElement!=O,t=j.userAgent.toLowerCase(),n=j.platform.toLowerCase(),o=/win/.test(n?n:t),a=/mac/.test(n?n:t),i=/webkit/.test(t)?parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,r=!1,s=[0,0,0],l=null;if(typeof j.plugins!=O&&typeof j.plugins[N]==I)l=j.plugins[N].description,!l||typeof j.mimeTypes!=O&&j.mimeTypes[A]&&!j.mimeTypes[A].enabledPlugin||(x=!0,r=!1,l=l.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),s[0]=parseInt(l.replace(/^(.*)\..*$/,"$1"),10),s[1]=parseInt(l.replace(/^.*\.(.*)\s.*$/,"$1"),10),s[2]=/[a-zA-Z]/.test(l)?parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof M.ActiveXObject!=O)try{var c=new ActiveXObject(L);c&&(l=c.GetVariable("$version"),l&&(r=!0,l=l.split(" ")[1].split(","),s=[parseInt(l[0],10),parseInt(l[1],10),parseInt(l[2],10)]))}catch(d){}return{w3:e,pv:s,wk:i,ie:r,win:o,mac:a}}();!function(){z.w3&&((typeof R.readyState!=O&&"complete"==R.readyState||typeof R.readyState==O&&(R.getElementsByTagName("body")[0]||R.body))&&e(),K||(typeof R.addEventListener!=O&&R.addEventListener("DOMContentLoaded",e,!1),z.ie&&z.win&&(R.attachEvent(B,function(){"complete"==R.readyState&&(R.detachEvent(B,arguments.callee),e())}),M==top&&!function(){if(!K){try{R.documentElement.doScroll("left")}catch(t){return void setTimeout(arguments.callee,0)}e()}}()),z.wk&&!function(){return K?void 0:/loaded|complete/.test(R.readyState)?void e():void setTimeout(arguments.callee,0)}(),n(e)))}(),function(){z.ie&&z.win&&window.attachEvent("onunload",function(){for(var e=G.length,t=0;e>t;t++)G[t][0].detachEvent(G[t][1],G[t][2]);for(var n=$.length,o=0;n>o;o++)p($[o]);for(var a in z)z[a]=null;z=null;for(var i in swfobject)swfobject[i]=null;swfobject=null})}()}return{registerObject:function(e,t,n,o){if(z.w3&&e&&t){var a={};a.id=e,a.swfVersion=t,a.expressInstall=n,a.callbackFn=o,D[D.length]=a,w(e,!1)}else o&&o({success:!1,id:e})},getObjectById:function(e){return z.w3?r(e):void 0},embedSWF:function(e,n,o,a,i,r,c,d,u,p){var v={success:!1,id:n};z.w3&&!(z.wk&&z.wk<312)&&e&&n&&o&&a&&i?(w(n,!1),t(function(){o+="",a+="";var t={};if(u&&typeof u===I)for(var h in u)t[h]=u[h];t.data=e,t.width=o,t.height=a;var _={};if(d&&typeof d===I)for(var S in d)_[S]=d[S];if(c&&typeof c===I)for(var y in c)typeof _.flashvars!=O?_.flashvars+="&"+y+"="+c[y]:_.flashvars=y+"="+c[y];if(b(i)){var m=f(t,_,n);t.id==n&&w(n,!0),v.success=!0,v.ref=m}else{if(r&&s())return t.data=r,void l(t,_,n,p);w(n,!0)}p&&p(v)})):p&&p(v)},switchOffAutoHideShow:function(){V=!1},ua:z,getFlashPlayerVersion:function(){return{major:z.pv[0],minor:z.pv[1],release:z.pv[2]}},hasFlashPlayerVersion:b,createSWF:function(e,t,n){return z.w3?f(e,t,n):void 0},showExpressInstall:function(e,t,n,o){z.w3&&s()&&l(e,t,n,o)},removeSWF:function(e){z.w3&&p(e)},createCSS:function(e,t,n,o){z.w3&&y(e,t,n,o)},addDomLoadEvent:t,addLoadEvent:n,getQueryParamValue:function(e){var t=R.location.search||R.location.hash;if(t){if(/\?/.test(t)&&(t=t.split("?")[1]),null==e)return m(t);for(var n=t.split("&"),o=0;o<n.length;o++)if(n[o].substring(0,n[o].indexOf("="))==e)return m(n[o].substring(n[o].indexOf("=")+1))}return""},expressInstallCallback:function(){if(U){var e=h(F);e&&k&&(e.parentNode.replaceChild(k,e),E&&(w(E,!0),z.ie&&z.win&&(k.style.display="block")),g&&g(W)),U=!1}}}}();!function(){if(window.WEB_SOCKET_FORCE_FLASH);else{if(window.WebSocket)return;if(window.MozWebSocket)return void(window.WebSocket=MozWebSocket)}var e;return e=window.WEB_SOCKET_LOGGER?WEB_SOCKET_LOGGER:window.console&&window.console.log&&window.console.error?window.console:{log:function(){},error:function(){}},swfobject.getFlashPlayerVersion().major<10?void e.error("Flash Player >= 10.0.0 is required."):("file:"==location.protocol&&e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),window.WebSocket=function(e,t,n,o,a){var i=this;i.__id=WebSocket.__nextId++,WebSocket.__instances[i.__id]=i,i.readyState=WebSocket.CONNECTING,i.bufferedAmount=0,i.__events={},t?"string"==typeof t&&(t=[t]):t=[],i.__createTask=setTimeout(function(){WebSocket.__addTask(function(){i.__createTask=null,WebSocket.__flash.create(i.__id,e,t,n||null,o||0,a||null)})},0)},WebSocket.prototype.send=function(e){if(this.readyState==WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";var t=WebSocket.__flash.send(this.__id,encodeURIComponent(e));return 0>t?!0:(this.bufferedAmount+=t,!1)},WebSocket.prototype.close=function(){return this.__createTask?(clearTimeout(this.__createTask),this.__createTask=null,void(this.readyState=WebSocket.CLOSED)):void(this.readyState!=WebSocket.CLOSED&&this.readyState!=WebSocket.CLOSING&&(this.readyState=WebSocket.CLOSING,WebSocket.__flash.close(this.__id)))},WebSocket.prototype.addEventListener=function(e,t){e in this.__events||(this.__events[e]=[]),this.__events[e].push(t)},WebSocket.prototype.removeEventListener=function(e,t){if(e in this.__events)for(var n=this.__events[e],o=n.length-1;o>=0;--o)if(n[o]===t){n.splice(o,1);break}},WebSocket.prototype.dispatchEvent=function(e){for(var t=this.__events[e.type]||[],n=0;n<t.length;++n)t[n](e);var o=this["on"+e.type];o&&o.apply(this,[e])},WebSocket.prototype.__handleEvent=function(e){"readyState"in e&&(this.readyState=e.readyState),"protocol"in e&&(this.protocol=e.protocol);var t;if("open"==e.type||"error"==e.type)t=this.__createSimpleEvent(e.type);else if("close"==e.type)t=this.__createSimpleEvent("close"),t.wasClean=e.wasClean?!0:!1,t.code=e.code,t.reason=e.reason;else{if("message"!=e.type)throw"unknown event type: "+e.type;var n=decodeURIComponent(e.message);t=this.__createMessageEvent("message",n)}this.dispatchEvent(t)},WebSocket.prototype.__createSimpleEvent=function(e){if(document.createEvent&&window.Event){var t=document.createEvent("Event");return t.initEvent(e,!1,!1),t}return{type:e,bubbles:!1,cancelable:!1}},WebSocket.prototype.__createMessageEvent=function(e,t){if(window.MessageEvent&&"function"==typeof MessageEvent&&!window.opera)return new MessageEvent("message",{view:window,bubbles:!1,cancelable:!1,data:t});if(document.createEvent&&window.MessageEvent&&!window.opera){var n=document.createEvent("MessageEvent");return n.initMessageEvent("message",!1,!1,t,null,null,window,null),n}return{type:e,data:t,bubbles:!1,cancelable:!1}},WebSocket.CONNECTING=0,WebSocket.OPEN=1,WebSocket.CLOSING=2,WebSocket.CLOSED=3,WebSocket.__isFlashImplementation=!0,WebSocket.__initialized=!1,WebSocket.__flash=null,WebSocket.__instances={},WebSocket.__tasks=[],WebSocket.__nextId=0,WebSocket.loadFlashPolicyFile=function(e){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(e)})},WebSocket.__initialize=function(){if(!WebSocket.__initialized){if(WebSocket.__initialized=!0,WebSocket.__swfLocation&&(window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation),!window.WEB_SOCKET_SWF_LOCATION)return void e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");if(!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR&&!WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/)&&WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)){var t=RegExp.$1;location.host!=t&&e.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host ('"+location.host+"' != '"+t+"'). See also 'How to host HTML file and SWF file in different domains' section in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;")}var n=document.createElement("div");n.id="webSocketContainer",n.style.position="absolute",WebSocket.__isFlashLite()?(n.style.left="0px",n.style.top="0px"):(n.style.left="-100px",n.style.top="-100px");var o=document.createElement("div");o.id="webSocketFlash",n.appendChild(o),document.body.appendChild(n),swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:!0,swliveconnect:!0,allowScriptAccess:"always"},null,function(t){t.success||e.error("[WebSocket] swfobject.embedSWF failed")})}},WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash"),WebSocket.__flash.setCallerUrl(location.href),WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);for(var e=0;e<WebSocket.__tasks.length;++e)WebSocket.__tasks[e]();WebSocket.__tasks=[]},0)},WebSocket.__onFlashEvent=function(){return setTimeout(function(){try{for(var t=WebSocket.__flash.receiveEvents(),n=0;n<t.length;++n)WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])}catch(o){e.error(o)}},0),!0},WebSocket.__log=function(t){e.log(decodeURIComponent(t))},WebSocket.__error=function(t){e.error(decodeURIComponent(t))},WebSocket.__addTask=function(e){WebSocket.__flash?e():WebSocket.__tasks.push(e)},WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes)return!1;var e=window.navigator.mimeTypes["application/x-shockwave-flash"];return e&&e.enabledPlugin&&e.enabledPlugin.filename&&e.enabledPlugin.filename.match(/flashlite/i)?!0:!1},void(window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION||swfobject.addDomLoadEvent(function(){WebSocket.__initialize()})))}();