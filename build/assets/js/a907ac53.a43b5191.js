"use strict";(self.webpackChunkfinclip_ops_docs=self.webpackChunkfinclip_ops_docs||[]).push([[464],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),f=u(n),m=o,y=f["".concat(l,".").concat(m)]||f[m]||s[m]||i;return n?r.createElement(y,c(c({ref:t},p),{},{components:n})):r.createElement(y,c({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,c=new Array(i);c[0]=f;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var u=2;u<i;u++)c[u]=n[u];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6160:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return p},default:function(){return f}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),c=["components"],a={id:"scalability",title:"\u53ef\u6269\u5c55\u6027",author:"xulishan@finogeeks.com"},l=void 0,u={unversionedId:"ops/scalability",id:"ops/scalability",isDocsHomePage:!1,title:"\u53ef\u6269\u5c55\u6027",description:"&emsp;FinClip \u5e94\u7528\u670d\u52a1\u57fa\u4e8e Rancher \u90e8\u7f72\uff0cRancher \u4e3a Kubernetes \u7684\u7b2c\u4e09\u65b9\u53d1\u884c\u7248\u3002Kubernetes \u81ea\u8eab\u5177\u6709\u6269\u7f16\u3001 \u7f29\u5bb9\u7b49\u7279\u6027\uff0c\u5728\u53ef\u6269\u5c55\u6027\u4e0a\u5b58\u5728\u826f\u597d\u7684\u652f\u6301\u3002 FinClip \u7684\u57fa\u7840\u670d\u52a1\u57fa\u4e8e Docker-Compose \u90e8\u7f72\uff0cDocker- Compose \u4e3a Docker \u5b98\u65b9\u7684\u5e94\u7528\u7f16\u6392\u5de5\u5177\u3002\u6240\u6709\u57fa\u7840\u670d\u52a1\u5747\u4ee5\u96c6\u7fa4\u5f62\u5f0f\u8fdb\u884c\u90e8\u7f72\uff0c\u5728\u53ef\u6269\u5c55\u6027\u4e0a\u5b58\u5728\u826f\u597d\u7684\u652f \u6301\u3002",source:"@site/docs/ops/06-scalability.md",sourceDirName:"ops",slug:"/ops/scalability",permalink:"/docs/ops/scalability",tags:[],version:"current",sidebarPosition:6,frontMatter:{id:"scalability",title:"\u53ef\u6269\u5c55\u6027",author:"xulishan@finogeeks.com"},sidebar:"tutorialSidebar",previous:{title:"\u53ef\u7528\u6027",permalink:"/docs/ops/availability"},next:{title:"\u5b89\u5168\u6027",permalink:"/docs/ops/security"}},p=[{value:"\u8ba1\u7b97\u8282\u70b9\u6269\u5bb9/\u7f29\u5bb9:",id:"\u8ba1\u7b97\u8282\u70b9\u6269\u5bb9\u7f29\u5bb9",children:[]},{value:"\u57fa\u7840\u670d\u52a1\u6269\u5bb9/\u7f29\u5bb9:",id:"\u57fa\u7840\u670d\u52a1\u6269\u5bb9\u7f29\u5bb9",children:[]}],s={toc:p};function f(e){var t=e.components,n=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u2003","FinClip \u5e94\u7528\u670d\u52a1\u57fa\u4e8e Rancher \u90e8\u7f72\uff0cRancher \u4e3a Kubernetes \u7684\u7b2c\u4e09\u65b9\u53d1\u884c\u7248\u3002Kubernetes \u81ea\u8eab\u5177\u6709\u6269\u7f16\u3001 \u7f29\u5bb9\u7b49\u7279\u6027\uff0c\u5728\u53ef\u6269\u5c55\u6027\u4e0a\u5b58\u5728\u826f\u597d\u7684\u652f\u6301\u3002 FinClip \u7684\u57fa\u7840\u670d\u52a1\u57fa\u4e8e Docker-Compose \u90e8\u7f72\uff0cDocker- Compose \u4e3a Docker \u5b98\u65b9\u7684\u5e94\u7528\u7f16\u6392\u5de5\u5177\u3002\u6240\u6709\u57fa\u7840\u670d\u52a1\u5747\u4ee5\u96c6\u7fa4\u5f62\u5f0f\u8fdb\u884c\u90e8\u7f72\uff0c\u5728\u53ef\u6269\u5c55\u6027\u4e0a\u5b58\u5728\u826f\u597d\u7684\u652f \u6301\u3002"),(0,i.kt)("p",null,"\u2003","\u90e8\u7f72\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u5e94\u7528\u670d\u52a1\u901a\u8fc7 Rancher \u8fdb\u884c\u7ba1\u7406\uff0cRancher \u80fd\u591f\u52a8\u6001\u5bf9\u5e94\u7528\u670d\u52a1\u8fdb\u884c\u6269\u7f16\u3001\u7f29\u5bb9\u3001\u91cd\u65b0\u90e8\u7f72\u7b49\u64cd\u4f5c\u3002"),(0,i.kt)("h3",{id:"\u8ba1\u7b97\u8282\u70b9\u6269\u5bb9\u7f29\u5bb9"},"\u8ba1\u7b97\u8282\u70b9\u6269\u5bb9/\u7f29\u5bb9:"),(0,i.kt)("p",null,"\u2003","\u90e8\u7f72\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u901a\u8fc7 Ansible \u8c03\u7528 RKE \u90e8\u7f72\uff0cRKE(Rancher Kubernetes Engine)\u4e3a Rancher \u7684\u5b98\u65b9\u547d"),(0,i.kt)("p",null,"\u4ee4\u884c\u90e8\u7f72\u5de5\u5177\u3002\u8be5\u5de5\u5177\u652f\u6301\u6839\u636e\u914d\u7f6e\u6587\u4ef6\u5bf9\u6574\u4e2a\u96c6\u7fa4\u7684\u8ba1\u7b97\u8282\u70b9\u8fdb\u884c\u6269\u7f16\u3001\u7f29\u5bb9\u7ba1\u7406\u3002"),(0,i.kt)("h3",{id:"\u57fa\u7840\u670d\u52a1\u6269\u5bb9\u7f29\u5bb9"},"\u57fa\u7840\u670d\u52a1\u6269\u5bb9/\u7f29\u5bb9:"),(0,i.kt)("p",null,"\u2003","FinClip \u6240\u7528\u5230\u7684\u6240\u6709\u57fa\u7840\u670d\u52a1\u5747\u4ee5\u96c6\u7fa4\u65b9\u5f0f\u90e8\u7f72\uff0c\u6240\u6709\u96c6\u7fa4\u5747\u652f\u6301\u8282\u70b9\u7684\u6269\u7f16\u3001\u7f29\u5bb9\u7ba1\u7406\u3002"))}f.isMDXComponent=!0}}]);