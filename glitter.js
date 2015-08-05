/**
Copyright 2015 LOOKCAST S.R.L.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
limitations under the License.
*/

var glitter = (function () {
    var extend = function e(c) {
        for (var d = 1; d < arguments.length; ++d) {
            var a = arguments[d];
            if ("object" === typeof a)for (var b in a)a.hasOwnProperty(b) && (c[b] = "object" === typeof a[b] ? e({}, c[b], a[b]) : a[b])
        }
        return c
    }

    var defaults = {
        defaultClass: 'glitter-default', //class the text is normally at
        highightClass: 'glitter-highlight', //class the text gets while glittering
        accentClass: 'glitter-accent', //when flipping, the class the text gets after glittering
        downlightClass: 'glitter-downlight', //when flipping, the class the text gets while glittering back to normal
        loopPeriod: 5000, //time between each run
        maxIteration: undefined, //stop after this many iterations
        accentTime: 100, //time the glitter class remains on text
        highlightTime: 0, //time to show the highlight before accent
        downlightTime: 0, //time to show the downlight after accent
        rtl: false,
        travelPeriod: 20, //period the glitter effect propagate
        flipping: false //flip between default and accent styles at each glitter
    }

    var install = function (element, conf) {


        var process = function (element, conf) {
            return function () {
                if (conf.maxIteration <0) return;
                element.classList.add('glitter-processing');
                var highlight = function (n) {
                    return function () {
                        n.classList.add(conf.highightClass);
                        n.classList.remove(conf.defaultClass, conf.accentClass, conf.downlightClass);

                    }
                }
                var downlight = function (n) {
                    return function () {
                        n.classList.add(conf.downlightClass);
                        n.classList.remove(conf.defaultClass, conf.accentClass, conf.highightClass);
                    }
                }
                var def = function (n) {
                    return function () {
                        n.classList.add(conf.defaultClass);
                        n.classList.remove(conf.accentClass, conf.downlightClass, conf.highightClass);
                    }
                }
                var accent = function (n) {
                    return function () {
                        n.classList.add(conf.accentClass);
                        n.classList.remove(conf.defaultClass, conf.downlightClass, conf.highightClass);

                    }
                }
                for (var k = 0; k < element.children.length; k++) {
                    var i = k;
                    if (conf.rtl) {
                        i = element.children.length - k - 1;
                    }
                    var e = element.children[k];
                    if (conf.flipping) {
                        setTimeout(highlight(e), conf.travelPeriod * i);
                        setTimeout(accent(e), conf.accentTime + conf.travelPeriod * i);
                        setTimeout(downlight(e), conf.loopPeriod / 2 + conf.travelPeriod * i);
                        setTimeout(def(e), conf.loopPeriod / 2 + conf.accentTime + conf.travelPeriod * i);
                    } else {
                        if (conf.highlightTime>0) setTimeout(highlight(e), conf.travelPeriod * i);
                        setTimeout(accent(e), conf.highlightTime + conf.travelPeriod * i);
                        if (conf.downlightTimeTime>0) setTimeout(downlight(e), conf.accentTime + conf.highlightTime + conf.travelPeriod * i);
                        setTimeout(def(e), conf.accentTime + conf.highlightTime + conf.downlightTime+ conf.travelPeriod * i);

                    }
                }
                var end = function (n) {
                    return function () {
                        element.classList.remove('glitter-processing');
                        element.classList.remove('glitter-flipping');
                    }
                }

                var tag = function (n) {
                    return function () {
                        element.classList.add('glitter-flipping');
                    }
                }

                setTimeout(end(element), conf.accentTime + conf.travelPeriod * i);
                if (conf.flipping)
                    setTimeout(tag(element), conf.loopPeriod / 2 + conf.accentTime + conf.travelPeriod * i);

                if (conf.maxIteration >= 0) conf.maxIteration -= 1;
            }
        }(element, conf);

        var t = element.textContent || element.innerText;
        element.innerHTML = '';
        for (var k = 0, len = t.length; k < len; k++) {
            var s = document.createElement("span");
            s.classList.add(conf.defaultClass);
            s.textContent = '' + t[k];
            element.appendChild(s);
        }
        if (conf.maxIteration === undefined || conf.maxIteration > 0 )
            setInterval(process, conf.loopPeriod)
        else {
            setTimeout(process, conf.loopPeriod)
        }
    }

    return function (path, options) {
        var conf = extend({}, defaults, options);
        var elements = document.querySelectorAll(path);
        for (var i = 0; i < elements.length; i++) {
            install(elements[i], conf);
        }
    }
}());


