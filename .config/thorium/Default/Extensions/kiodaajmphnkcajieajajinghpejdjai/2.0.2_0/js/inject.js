/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ (function(module, exports) {

//@ts-nocheck
/**
 * injects a code to the page context that does the following:
 * replace the window.open function with a function that checks if the window.open was executed due to an event.
 * if so, then it checks who triggered the event. if it's the document or the body elements, the call is blocked.
 * another protection, is closing windows that got blured by calling window.blur(), less then a second from its creation.
 * check out the footer for another way websites try to open a new window.
 * @return nothing
 */
let injection = "(" + (function () {

    let originalOpenWndFnKey = "originalOpenFunction";

    let originalWindowOpenFn = window.open,
        originalCreateElementFn = document.createElement,
        originalAppendChildFn = HTMLElement.prototype.appendChild,
        originalCreateEventFn = document.createEvent,
        windowsWithNames = {};
    let timeSinceCreateAElement = 0;
    let lastCreatedAElement = null;
    let fullScreenOpenTime;
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let parentRef = window.parent;
    let parentOrigin = (window.location != window.parent.location) ? document.referrer : document.location.href;

    Object.defineProperty(window, 'BetterJsPop', {
        value: undefined,
        writable: false
    });

    window[originalOpenWndFnKey] = window.open; // save the original open window as global param

    function newWindowOpenFn() {

        let openWndArguments = arguments,
            useOriginalOpenWnd = true,
            generatedWindow = null;

        function blockedWndNotification(openWndArguments) {
            parentRef.postMessage({ type: "blockedWindow", args: JSON.stringify(openWndArguments) }, parentOrigin);
        }

        function getWindowName(openWndArguments) {
            let windowName = openWndArguments[1];
            if ((windowName != null) && (["_blank", "_parent", "_self", "_top"].indexOf(windowName) < 0)) {
                return windowName;
            }

            return null;
        }

        function copyMissingProperties(src, dest) {
            let prop;
            for (prop in src) {
                try {
                    if (dest[prop] === undefined) {
                        dest[prop] = src[prop];
                    }
                } catch (e) { }
            }
            return dest;
        }

        function isParentWindow() {
            try {
                return !!(parent.Window && capturingElement instanceof parent.Window);
            } catch (e) {
                return false;
            }
        }

        function isOverlayish(el) {
            let style = el && el.style;

            if (style && /fixed|absolute/.test(style.position) && el.offsetWidth >= winWidth * 0.6 && el.offsetHeight >= winHeight * 0.75) {
                return true;
            }

            return false;
        }

        let capturingElement = null; // the element who registered to the event
        let srcElement = null; // the clicked on element
        let closestParentLink = null;

        if (window.event != null) {
            capturingElement = window.event.currentTarget;
            srcElement = window.event.srcElement;
        }

        if (srcElement != null && srcElement instanceof HTMLElement) {
            closestParentLink = srcElement.closest('a');

            if (closestParentLink && closestParentLink.href) {
                openWndArguments[3] = closestParentLink.href;
            }
        }

        //callee will not work in ES6 or stict mode
        try {
            if (capturingElement == null) {
                let caller = openWndArguments.callee;
                while (caller.arguments != null && caller.arguments.callee.caller != null) {
                    caller = caller.arguments.callee.caller;
                }
                if (caller.arguments != null && caller.arguments.length > 0 && caller.arguments[0].currentTarget != null) {
                    capturingElement = caller.arguments[0].currentTarget;
                }
            }
        } catch (e) { }



        /////////////////////////////////////////////////////////////////////////////////
        // Blocked if a click on background element occurred (<body> or document)
        /////////////////////////////////////////////////////////////////////////////////
        if (capturingElement == null) {
            window.pbreason = 'Blocked a new window opened without any user interaction';
            useOriginalOpenWnd = false;
        } else if (capturingElement != null && (capturingElement instanceof Window || isParentWindow() || capturingElement === document || capturingElement.URL != null && capturingElement.body != null || capturingElement.nodeName != null && (capturingElement.nodeName.toLowerCase() == "body" || capturingElement.nodeName.toLowerCase() == "document"))) {
            window.pbreason = "Blocked a new window opened with URL: " + openWndArguments[0] + "because it was triggered by the " + capturingElement.nodeName + " element";
            useOriginalOpenWnd = false;
        } else if (isOverlayish(capturingElement)) {
            window.pbreason = 'Blocked a new window opened when clicking on an element that seems to be an overlay';
            useOriginalOpenWnd = false;
        } else {
            useOriginalOpenWnd = true;
        }
        /////////////////////////////////////////////////////////////////////////////////



        /////////////////////////////////////////////////////////////////////////////////
        // Block if a full screen was just initiated while opening this url.
        /////////////////////////////////////////////////////////////////////////////////
        let fullScreenElement = document.webkitFullscreenElement || document.mozFullscreenElement || document.fullscreenElement;
        if (new Date().getTime() - fullScreenOpenTime < 1000 || isNaN(fullScreenOpenTime) && isDocumentInFullScreenMode()) {

            window.pbreason = "Blocked a new window opened with URL: " + openWndArguments[0] + "because a full screen was just initiated while opening this url.";

            /* JRA REMOVED
            if (window[script_params.fullScreenFnKey]) {
            window.clearTimeout(window[script_params.fullScreenFnKey]);
            }
            */

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }

            useOriginalOpenWnd = false;
        }
        /////////////////////////////////////////////////////////////////////////////////

        if (useOriginalOpenWnd == true) {
            generatedWindow = originalWindowOpenFn.apply(this, openWndArguments);
            // save the window by name, for latter use.
            let windowName = getWindowName(openWndArguments);
            if (windowName != null) {
                windowsWithNames[windowName] = generatedWindow;
            }

            // 2nd line of defence: allow window to open but monitor carefully...

            /////////////////////////////////////////////////////////////////////////////////
            // Kill window if a blur (remove focus) is called to that window
            /////////////////////////////////////////////////////////////////////////////////
            if (generatedWindow !== window) {
                let openTime = new Date().getTime();
                let originalWndBlurFn = generatedWindow.blur;
                generatedWindow.blur = () => {
                    if (new Date().getTime() - openTime < 1000 /* one second */) {
                        window.pbreason = "Blocked a new window opened with URL: " + openWndArguments[0] + "because a it was blured";
                        generatedWindow.close();
                        blockedWndNotification(openWndArguments);
                    } else {
                        originalWndBlurFn();
                    }
                };
            }
            /////////////////////////////////////////////////////////////////////////////////
        } else { // (useOriginalOpenWnd == false)

            let location = {
                href: openWndArguments[0]
            };
            location.replace = function (url) {
                location.href = url;
            };

            generatedWindow = {
                close: function () { return true; },
                test: function () { return true; },
                blur: function () { return true; },
                focus: function () { return true; },
                showModelessDialog: function () { return true; },
                showModalDialog: function () { return true; },
                prompt: function () { return true; },
                confirm: function () { return true; },
                alert: function () { return true; },
                moveTo: function () { return true; },
                moveBy: function () { return true; },
                resizeTo: function () { return true; },
                resizeBy: function () { return true; },
                scrollBy: function () { return true; },
                scrollTo: function () { return true; },
                getSelection: function () { return true; },
                onunload: function () { return true; },
                print: function () { return true; },
                open: function () { return this; },
                opener: window,
                closed: false,
                innerHeight: 480,
                innerWidth: 640,
                name: openWndArguments[1],
                location: location,
                document: { location: location }
            };

            copyMissingProperties(window, generatedWindow);

            generatedWindow.window = generatedWindow;

            let windowName = getWindowName(openWndArguments);
            if (windowName != null) {
                try {
                    // originalWindowOpenFn("", windowName).close();
                    windowsWithNames[windowName].close();
                } catch (err) {
                }
            }

            let fnGetUrl = function () {
                let url;
                if (!(generatedWindow.location instanceof Object)) {
                    url = generatedWindow.location;
                } else if (!(generatedWindow.document.location instanceof Object)) {
                    url = generatedWindow.document.location;
                } else if (location.href != null) {
                    url = location.href;
                } else {
                    url = openWndArguments[0];
                }
                openWndArguments[0] = url;

                blockedWndNotification(openWndArguments);
            };

            if (top == self) {
                setTimeout(fnGetUrl, 100);
            } else {
                fnGetUrl();
            }
        }

        return generatedWindow;
    }


    /////////////////////////////////////////////////////////////////////////////////
    // Replace the window open method with Poper Blocker's
    /////////////////////////////////////////////////////////////////////////////////
    window.open = function () {
        try {
            return newWindowOpenFn.apply(this, arguments);
        } catch (err) {
            return null;
        }
    };
    /////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Monitor dynamic html element creation to prevent generating <a> elements with click dispatching event
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    HTMLElement.prototype.appendChild = function () {
        let newElement = originalAppendChildFn.apply(this, arguments);

        if (newElement.nodeName == 'IFRAME' && newElement.contentWindow) {
            try {
                let s = document.createElement('script');
                s.textContent = injection;
                let doc = newElement.contentWindow.document;

                (doc.head || doc.body).appendChild(s);
            } catch (e) {

            }
        }

        return newElement;
    };

    document.createElement = function (tagName) {
        let newElement = originalCreateElementFn.apply(document, arguments);

        if (tagName.toLowerCase() == 'a') {

            timeSinceCreateAElement = new Date().getTime();

            let originalDispatchEventFn = newElement.dispatchEvent;

            newElement.dispatchEvent = function (event) {
                if (event.type != null && (("" + event.type).toLocaleLowerCase() == "click")) {

                    window.pbreason = "blocked due to an explicit dispatchEvent event with type 'click' on an 'a' tag";
                    parentRef.postMessage({ type: "blockedWindow", args: JSON.stringify({ "0": newElement.href }) }, parentOrigin);
                    return true;

                }

                return originalDispatchEventFn(event);
            };

            lastCreatedAElement = newElement;
        }

        return newElement;
    };
    /////////////////////////////////////////////////////////////////////////////////




    /////////////////////////////////////////////////////////////////////////////////
    // Block artificial mouse click on frashly created <a> elements
    /////////////////////////////////////////////////////////////////////////////////
    document.createEvent = function () {
        try {
            if (arguments[0].toLowerCase().includes("mouse") && new Date().getTime() - timeSinceCreateAElement <= 50) {
                let openUrlDomain, topUrl, topDomain;

                try {
                    openUrlDomain = new URL(lastCreatedAElement.href).hostname;
                } catch (e) { }

                try {
                    topUrl = window.location != window.parent.location ? document.referrer : document.location.href;
                } catch (e) { }

                try {
                    topDomain = new URL(topUrl).hostname;
                } catch (e) { }

                //block if the origin is not same
                let isSelfDomain = openUrlDomain == topDomain;

                if (lastCreatedAElement.href.trim() && !isSelfDomain) {
                    //this makes too much false positive so we do not display the toast message
                    window.pbreason = "Blocked because 'a' element was recently created and " + arguments[0] + "event was created shortly after";
                    arguments[0] = lastCreatedAElement.href;

                    parentRef.postMessage({ type: "blockedWindow", args: JSON.stringify({ "0": lastCreatedAElement.href }) }, parentOrigin);

                    return {
                        type: 'click',
                        initMouseEvent: function () { }
                    };
                }
            }

            return originalCreateEventFn.apply(document, arguments);
        } catch (err) { }
    };
    /////////////////////////////////////////////////////////////////////////////////





    /////////////////////////////////////////////////////////////////////////////////
    // Monitor full screen requests
    /////////////////////////////////////////////////////////////////////////////////
    function onFullScreen(isInFullScreenMode) {
        if (isInFullScreenMode) {
            fullScreenOpenTime = (new Date()).getTime();
            // console.info("fullScreenOpenTime = " + fullScreenOpenTime);
        } else {
            fullScreenOpenTime = NaN;
        }
    };
    /////////////////////////////////////////////////////////////////////////////////

    function isDocumentInFullScreenMode() {
        // Note that the browser fullscreen (triggered by short keys) might
        // be considered different from content fullscreen when expecting a boolean
        return ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard methods
            ((document.mozFullscreenElement != null) || (document.webkitFullscreenElement != null)));                   // current working methods
    }


    document.addEventListener("fullscreenchange", function () {
        onFullScreen(document.fullscreen);
    }, false);

    document.addEventListener("mozfullscreenchange", function () {
        onFullScreen(document.mozFullScreen);
    }, false);

    document.addEventListener("webkitfullscreenchange", function () {
        onFullScreen(document.webkitIsFullScreen);
    }, false);


}).toString() + ")()";

module.exports.injection = injection;
function restoreWindowOpen() {
    window.open = window["originalOpenFunction"];
}

/*
(*) a jquery plugin (https://github.com/hpbuniat/jquery-popunder/blob/master/src/jquery.popunder.js) | $.popunder.helper.open

(*) another jquery plugin (https://github.com/tuki/js-popunder/)

The full-screen trick
---------------------

(*) another way sites try to open new windows, is to put a link inside the page and generate a click on it.
the link opens a new tab with a name, and then they try to call window.open with that name a change the tab's url.
for example:

 const a = document.createElement("a");
 const e = document.createEvent("MouseEvents");
 const rand = Math.random();
 a.target = "_tab" + rand.toString();
 a.href = "about:blank";
 document.body.appendChild(a);
 e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
 a.dispatchEvent(e);
 window.open("about:blank", "_tab" + rand.toString()).close();

 (*) They open full screen mode -> open a popup window -> exit full screen mode, thus it goes beneath the window

The create element & event trick
--------------------------------

(*) The website will create an <a> element and also a MouseEvents event, that will auto click on it.
    This will make a window to open and without the window.open

(*) http://torrents.to/

Pop-under test websites:
    --------------------------------

    http://www.ad4game.com/popunder/
http://test.gluk.name/test2/pop3/?#
http://cpmnetwork.adbooth.com/en/popunder
    http://www.vcmuk.com/poptest.html
    http://affplaybook.com/poptest/exit1/test.html

Not blocked by AdBlock:

    http://demo.dynamicoxygen.com/Pop-Under
    http://mirodex.blogspot.co.il/2013/10/working-popunder-script-on-chrome.html
    http://www.advertserve.com/examples/popups.html
    http://www.htmlgoodies.com/beyond/javascript/article.php/3471241

*/

/***/ })

/******/ });