// 'use client'
// import React, { useEffect } from 'react';

// const Help = () => {
//   useEffect(() => {
//     // Start of Async Drift Code
//     "use strict";

//     (function() {
//       var t = window.driftt = window.drift = window.driftt || [];
//       if (!t.init) {
//         if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
//         t.invoked = true;
//         t.methods = ["identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on"];
//         t.factory = function(e) {
//           return function() {
//             var n = Array.prototype.slice.call(arguments);
//             n.unshift(e);
//             t.push(n);
//             return t;
//           };
//         };
//         t.methods.forEach(function(e) {
//           t[e] = t.factory(e);
//         });
//         t.load = function(t) {
//           var e = 300000;
//           var n = Math.ceil(new Date() / e) * e;
//           var o = document.createElement("script");
//           o.type = "text/javascript";
//           o.async = true;
//           o.crossorigin = "anonymous";
//           o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
//           var i = document.getElementsByTagName("script")[0];
//           i.parentNode.insertBefore(o, i);
//         };
//       }
//     })();
//     drift.SNIPPET_VERSION = '0.3.1';
//     drift.load('zfyu46y8tt87');
//     // End of Async Drift Code
//   }, []);

//   return (
//     <div>Help</div>
//   );
// };

// export default Help;
