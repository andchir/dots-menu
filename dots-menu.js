/**
 * DotsMenu
 * @author Andchir<andchir@gmail.com>
 * @param options
 * @constructor
 */
(function (factory) {

    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if (typeof exports === 'object') {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.DotsMenu = factory();
    }

}(function( ){

    'use strict';

    return function (options) {

        var self = this;

        var mainOptions = {

        };

        /**
         * Initialize
         */
        this.init = function () {
            this.extend(mainOptions, options);
            this.onReady(function() {
                self.dotsDropDownInit();
                self.addMenuClasses();
                self.addMenuLastChildClasses();
                self.onResize();
            });
            window.addEventListener('resize', this.onResize.bind(this));
        };

        /**
         * Initialize dots drop down menu
         */
        this.dotsDropDownInit = function () {
            var menuParentContainer, dotsMenu, menuArr = document.querySelectorAll('.dots-menu');
            menuArr.forEach(function(menuEl) {
                menuParentContainer = menuEl.parentNode;
                dotsMenu = self.createElement('ul', {
                    className: 'dots-menu nav-item-right-drop',
                    innerHTML: '<li></li>'
                });
                self.append(dotsMenu, self.createElement('li', {
                    className: 'nav-item drop-right',
                    innerHTML: '<ul>' + menuEl.innerHTML + '</ul>'
                }));
                self.append(menuParentContainer, dotsMenu);
                dotsMenu.querySelectorAll('li.nav-item').forEach(function(liEl) {
                    liEl.style.display = 'none';
                });
            });
        };

        /**
         * Add special CSS classes to menu
         * @param parents
         */
        this.addMenuClasses = function (parents) {
            if (!parents) {
                parents = document.querySelectorAll('.dots-menu');
            }
            parents.forEach(function(parent) {
                parent.querySelectorAll('li.nav-item').forEach(function(liEl) {
                    if (liEl.querySelectorAll('ul').length > 0) {
                        self.addClass(liEl, 'nav-item-parent');
                    }
                });
            });
        };

        /**
         * Add class "drop-right" to last menu item
         */
        this.addMenuLastChildClasses = function () {
            this.addClass(document.querySelector('.dots-menu:not(.nav-item-right-drop) > li.nav-item:last-child'), 'drop-right');
        };

        /**
         * On window resize
         */
        this.onResize = function () {
            var elRect, liFirstlevelArr,
                windowWidth = window.innerWidth,
                menuArr = document.querySelectorAll('.dots-menu:not(.nav-item-right-drop)');
            menuArr.forEach(function(menuEl) {
                liFirstlevelArr = Array.prototype.slice.call(menuEl.childNodes);
                liFirstlevelArr = liFirstlevelArr.filter(function (el) {
                    return el.tagName && el.tagName.toLowerCase() === 'li';
                });

                liFirstlevelArr.forEach(function(liEl, index) {
                    if (index === 0) {
                        return;
                    }

                    elRect = liEl.getBoundingClientRect();

                    //liEl.style.display = elRect.left === 0 ? 'none' : 'block';

                    console.log(windowWidth, index, elRect);
                });
            });
        };

        /**
         * On document ready
         * @param fn
         */
        this.onReady = function (fn) {
            if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        };

        /**
         * Extend object
         * @param obj
         * @param props
         */
        this.extend = function (obj, props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    obj[prop] = props[prop];
                }
            }
            return obj;
        };

        /**
         * Set styles
         * @param el
         * @param styles
         */
        this.css = function (el, styles) {
            this.forEachObj(styles, function (key, val) {
                el.style[key] = val;
            });
        };

        /**
         * Remove HTML element
         * @param {HTMLElement} el
         */
        this.removeEl = function (el) {
            el.parentNode.removeChild(el);
        };

        /**
         * Add class
         * @param el
         */
        this.addClass = function (el, className) {
            if (el.classList)
                el.classList.add(className);
            else
                el.className += ' ' + className;
        };

        /**
         * Remove Class
         * @param el
         */
        this.removeClass = function (el, className){
            if (el.classList)
                el.classList.remove(className);
            else
                el.className = el.className
                    .replace(
                        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
                        ' '
                    );
        };

        /**
         * Create element from properties object
         * @param tagName
         * @param attributes
         * @param css
         * @returns {Element}
         */
        this.createElement = function (tagName, attributes, css) {
            var el = document.createElement(tagName);
            if (attributes) {
                this.forEachObj(attributes, function (key, val) {
                    if (val !== null) {
                        if (['className', 'innerHTML', 'outerHTML', 'innerText'].indexOf(key) > -1) {
                            el[key] = val;
                        } else {
                            el.setAttribute(key, val);
                        }
                    }
                });
            }
            if (css) {
                this.forEachObj(css, function (key, val) {
                    el.style[key] = val;
                });
            }
            return el;
        };

        /**
         * Append child element
         * @param selector
         * @param element
         * @returns {*}
         */
        this.append = function (selector, element) {
            var parents = typeof selector === 'string'
                ? document.querySelectorAll(selector)
                : [selector];
            Array.prototype.forEach.call(Object.keys(parents), function (key) {
                if (typeof parents[key] === 'object') {
                    parents[key].appendChild(element);
                }
            });
            return element;
        };

        /**
         * Insert child element after another one
         * @param refElem
         * @param elem
         * @returns {Node}
         */
        this.insertAfter = function (refElem, elem) {
            return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
        };

        /**
         * For each object
         * @param obj
         * @param callback
         * @returns {*}
         */
        this.forEachObj = function (obj, callback) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    callback(prop, obj[prop]);
                }
            }
            return obj;
        };

        this.init();
    }

}));
