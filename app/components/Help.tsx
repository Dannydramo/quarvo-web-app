'use client';
import React, { useEffect } from 'react';

declare global {
    interface Window {
        driftt: any;
        drift: any;
    }
}

const Help = () => {
    useEffect(() => {
        window.driftt = window.drift = window.driftt || [];
        if (!window.driftt.init) {
            if (window.driftt.invoked)
                return void (
                    window.console &&
                    console.error &&
                    console.error('Drift snippet included twice.')
                );
            window.driftt.invoked = true;
            window.driftt.methods = [
                'identify',
                'config',
                'track',
                'reset',
                'debug',
                'show',
                'ping',
                'page',
                'hide',
                'off',
                'on',
            ];
            window.driftt.factory = function (e: any) {
                return function () {
                    var n = Array.prototype.slice.call(arguments);
                    n.unshift(e);
                    window.driftt.push(n);
                    return window.driftt;
                };
            };
            window.driftt.methods.forEach(function (e: string | number) {
                window.driftt[e] = window.driftt.factory(e);
            });
            window.driftt.load = function (t: string) {
                var e = 300000;
                var n = Math.ceil(new Date().getTime() / e) * e;
                var o = document.createElement('script');
                o.type = 'text/javascript';
                o.async = true;
                o.crossOrigin = 'anonymous';
                o.src = 'https://js.driftt.com/include/' + n + '/' + t + '.js';
                var i = document.getElementsByTagName('script')[0];
                i.parentNode!.insertBefore(o, i);
            };
        }
        window.driftt.SNIPPET_VERSION = '0.3.1';
        window.driftt.load('wevcgpv7vcxu');
    }, []);

    return null;
};

export default Help;
