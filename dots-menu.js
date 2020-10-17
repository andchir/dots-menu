/**
 * DotsMenu https://github.com/andchir/dots-menu
 * @version 1.1.0
 * @author Andchir <andchir@gmail.com>
 * @license: MIT
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

        this.isInitialized = false;

        var mainOptions = {
            dotsMenuButtonWidth: 50,
            mobileViewWindowWidth: 576,
            rightSpace: 0,
            dotsMenuButtonPosition: 'right',
            selector: '.dots-menu'
        };

        /**
         * Initialize
         */
        this.init = function () {
            this.extend(mainOptions, options);
            this.onReady(function() {
                self.updateMenuParentClass();
                self.dotsDropDownInit();
                self.onResize();
                self.isInitialized = true;
            });
            window.addEventListener('resize', this.onResize.bind(this));
        };

        /**
         * Initialize dots drop down menu
         */
        this.dotsDropDownInit = function () {
            var menuParentContainer, dotsMenu, menuArr = document.querySelectorAll(mainOptions.selector);
            menuArr.forEach(function(menuEl) {
                menuParentContainer = menuEl.parentNode;
                menuParentContainer.style.overflow = 'visible';
                // Add drop-menu
                dotsMenu = self.createElement('ul', {
                    className: 'dots-menu dots-menu-drop dots-menu-drop-' + mainOptions.dotsMenuButtonPosition,
                    innerHTML: '<li></li>'
                });
                if (mainOptions.dotsMenuButtonPosition === 'right' && mainOptions.rightSpace) {
                    dotsMenu.style.right = mainOptions.rightSpace + 'px';
                }
                self.append(dotsMenu, self.createElement('li', {
                    className: 'nav-item' + (mainOptions.dotsMenuButtonPosition === 'right' ? ' drop-right' : ''),
                    innerHTML: '<span class="nav-link"></span><ul></ul>'
                }));
                self.append(menuParentContainer, dotsMenu, (mainOptions.dotsMenuButtonPosition === 'left'));
                if (dotsMenu.querySelector('li > span.nav-link')) {
                    dotsMenu.querySelector('li > span.nav-link').addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Close other
                        var parents = document.querySelectorAll(mainOptions.selector + ':not(.dots-menu-drop)');
                        parents.forEach(function(parent) {
                            parent.querySelectorAll('.nav-item-parent.nav-item-parent-visible').forEach(function (liEl) {
                                liEl.classList.remove('nav-item-parent-visible');
                            })
                        });
                        // Open drop-down menu
                        e.target.parentNode.classList.toggle('nav-item-parent-visible');
                    }, false);
                }
            });
        };

        /**
         * Add special CSS classes to menu
         * @param parents
         */
        this.updateMenuParentClass = function (parents) {
            if (!parents) {
                parents = Array.from(document.querySelectorAll(mainOptions.selector));
            }
            parents.forEach(function(parent) {
                Array.from(parent.querySelectorAll('li.nav-item')).forEach(function(liEl) {
                    if (liEl.querySelectorAll('ul').length > 0 && liEl.className.indexOf('nav-item-parent') === -1) {
                        liEl.classList.add('nav-item-parent');
                        liEl.querySelector('a').addEventListener('click', function(e) {
                            if (!liEl.classList.contains('nav-item-parent')) {
                                return;
                            }
                            var currentLiEl = e.target.parentNode,
                                dropMenu = currentLiEl.querySelector('ul'),
                                clientX = e.clientX,
                                elRect = e.target.getBoundingClientRect(),
                                windowWidth = window.innerWidth;
                            if (!dropMenu
                                || windowWidth > mainOptions.mobileViewWindowWidth
                                || (liEl.parentNode !== parent && clientX < elRect.width - 50)) {
                                    return;
                            }
                            e.preventDefault();
                            
                            if (liEl.parentNode === parent) {
                                // Close other
                                var prnts = Array.from(document.querySelectorAll(mainOptions.selector));
                                prnts.forEach(function(prnt) {
                                    prnt.querySelectorAll('li.nav-item-parent').forEach(function(el) {
                                        if (el !== currentLiEl) {
                                            el.classList.remove('nav-item-parent-visible');
                                        }
                                    });
                                });
                            }
                            // Open drop-down menu
                            currentLiEl.classList.toggle('nav-item-parent-visible');
                        });
                    }
                });
            });
        };

        /**
         * On window resize
         */
        this.onResize = function () {
            var elRect, liFirstlevelArr, menuParentContainer, dotsMenu, dotsMenuDrop, menuRect,
                menuArr = document.querySelectorAll(mainOptions.selector+':not(.dots-menu-drop)');
            
            menuArr.forEach(function(menuEl) {
                menuRect = menuEl.getBoundingClientRect();
                menuParentContainer = menuEl.parentNode;
                dotsMenu = menuParentContainer.querySelector('.dots-menu-drop');
                dotsMenuDrop = dotsMenu.querySelector('.nav-item > ul');
                dotsMenuDrop.innerHTML = '';

                liFirstlevelArr = Array.prototype.slice.call(menuEl.childNodes);
                liFirstlevelArr = liFirstlevelArr.filter(function (el) {
                    return el.tagName && el.tagName.toLowerCase() === 'li';
                });

                var posLeft = 0, dropCount = 0, visibleNumber = 0;
                liFirstlevelArr.forEach(function(liEl, index) {
                    elRect = liEl.getBoundingClientRect();
                    if (index === 0) {
                        posLeft = elRect.left;
                        posLeft += elRect.width;
                        liEl.classList.remove('drop-right');
                        visibleNumber++;
                        return;
                    }
                    if (posLeft + elRect.width + mainOptions.dotsMenuButtonWidth + mainOptions.rightSpace > menuRect.left + menuRect.width) {
                        liEl.classList.add('nav-item-hidden');
                        if (!document.getElementById('drop-menu-item-' + index)) {
                            var dropLi = self.append(dotsMenuDrop, self.createElement('li', {
                                id: 'drop-menu-item-' + index,
                                className: liEl.className,
                                innerHTML: liEl.innerHTML
                            }));
                            dropLi.classList.remove('nav-item-hidden');
                            dropLi.classList.remove('nav-item-parent');
                            dropLi.querySelectorAll('li.nav-item').forEach(function(el) {
                                el.classList.remove('nav-item-parent');
                            });
                        }
                        dropCount++;
                    } else {
                        visibleNumber++;
                        liEl.classList.remove('nav-item-hidden');
                        var dropItem = document.getElementById('drop-menu-item-' + index);
                        if (dropItem) {
                            self.removeEl(dropItem);
                        }
                    }
                    liEl.classList.remove('drop-right');
                    posLeft += elRect.width;
                });

                if (visibleNumber > 1) {
                    liFirstlevelArr[visibleNumber - 1].classList.add('drop-right');
                }

                if (dropCount > 0) {
                    self.updateMenuParentClass([dotsMenu]);
                    dotsMenu.style.display ='block';
                } else {
                    dotsMenu.style.display ='none';
                }
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
         * @param prepend
         * @returns {*}
         */
        this.append = function (selector, element, prepend) {
            prepend = prepend || false;
            var parents = typeof selector === 'string'
                ? document.querySelectorAll(selector)
                : [selector];
            Array.prototype.forEach.call(Object.keys(parents), function (key) {
                if (typeof parents[key] === 'object') {
                    if (prepend) {
                        parents[key].insertBefore(element, parents[key].firstChild);
                    } else {
                        parents[key].appendChild(element);
                    }
                }
            });
            return element;
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
