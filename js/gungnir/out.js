export class Utils {
    constructor(selector) {
        this.elements = Utils.getSelector(selector);
        this.element = this.get(0);
        return this;
    }
    
    scrollTop(){
         window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    animate({timing, draw, duration}) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction)

        draw(progress); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }

      });
    }

    wrap(className) {
        this.each((el) => {
            const wrapper = document.createElement('div');
            wrapper.className = className;
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
        });
        return this;
    }
    addClass(classNames = '') {
        this.each((el) => {
            // IE doesn't support multiple arguments
            classNames.split(' ').forEach((className) => {
                el.classList.add(className);
            });
        });
        return this;
    }
    width() {
        if (!this.element) {
            return 0;
        }
        const style = window.getComputedStyle(this.element, null);
        return parseFloat(style.width.replace('px', ''));
    }
    ready(fn) {
      // If we're early to the party
      document.addEventListener("DOMContentLoaded", fn);
      // If late; I mean on time.
      if (document.readyState === "interactive" || document.readyState === "complete" ) {
        fn();
      }
    }
    height() {
        if (!this.element) {
            return 0;
        }
        const style = window.getComputedStyle(this.element, null);
        return parseFloat(style.height.replace('px', ''));
    }
    on(events, listener) {
        events.split(' ').forEach((eventName) => {
            this.each((el) => {
                const tNEventName = Utils.setEventName(el, eventName);
                if (!Array.isArray(Utils.eventListeners[tNEventName])) {
                    Utils.eventListeners[tNEventName] = [];
                }
                Utils.eventListeners[tNEventName].push(listener);

                // https://github.com/microsoft/TypeScript/issues/28357
                if (el) {
                    el.addEventListener(eventName.split('.')[0], listener);
                }
            });
        });

        return this;
    }
    hasClass(className) {
        if (!this.element) {
            return false;
        }
        return this.element.classList.contains(className);
    }
    removeClass(classNames) {
        this.each((el) => {
            // IE doesn't support multiple arguments
            classNames.split(' ').forEach((className) => {
                el.classList.remove(className);
            });
        });
        return this;
    }
    show() {
        this.each((el) => {
            el.style.display = '';
        });
    }
    offset() {
        if (!this.element) {
            return {
                left: 0,
                top: 0,
            };
        }
        const box = this.element.getBoundingClientRect();
        return {
            top:
                box.top +
                window.pageYOffset -
                document.documentElement.clientTop,
            left:
                box.left +
                window.pageXOffset -
                document.documentElement.clientLeft,
        };
    }
    toggleClass(className) {
        if (!this.element) {
            return this;
        }
        this.element.classList.toggle(className);
    }
    css(css, value) {
        if (value !== undefined) {
            this.each((el) => {
                Utils.setCss(el, css, value);
            });
            return this;
        }
        if (typeof css === 'object') {
            for (const property in css) {
                if (Object.prototype.hasOwnProperty.call(css, property)) {
                    this.each((el) => {
                        Utils.setCss(el, property, css[property]);
                    });
                }
            }
            return this;
        }
        const cssProp = Utils.camelCase(css);
        const property = Utils.styleSupport(cssProp);
        return getComputedStyle(this.element)[property];
    }
    attr(name, value) {
        if (value === undefined) {
            if (!this.element) {
                return '';
            }
            return this.element.getAttribute(name);
        }
        this.each((el) => {
            el.setAttribute(name, value);
        });
        return this;
    }
    each(func) {
        if (!this.elements.length) {
            return this;
        }
        this.elements.forEach((el, index) => {
            func.call(el, el, index);
        });
        return this;
    }
    static getSelector(selector, context) {
        if (selector && typeof selector !== 'string') {
            if (selector.length !== undefined) {
                return selector;
            }
            return [selector];
        }
        context = context || document;

        // For performance reasons, use getElementById
        // eslint-disable-next-line no-control-regex
        const idRegex = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
        if (idRegex.test(selector)) {
            const el = document.getElementById(selector.substring(1));
            return el ? [el] : [];
        }
        return [].slice.call(context.querySelectorAll(selector) || []);
    }
    get(index) {
        if (index !== undefined) {
            return this.elements[index];
        }
        return this.elements;
    }
    static setEventName(el, eventName) {
        // Need to verify https://stackoverflow.com/questions/1915341/whats-wrong-with-adding-properties-to-dom-element-objects
        const elementUUId = el.eventEmitterUUID;
        const uuid = elementUUId || Utils.generateUUID();
        // eslint-disable-next-line no-param-reassign
        el.eventEmitterUUID = uuid;
        return Utils.getEventName(eventName, uuid);
    }
    static setCss(el, prop, value) {
        // prettier-ignore
        let cssProperty = Utils.camelCase(prop);
        cssProperty = Utils.styleSupport(cssProperty);
        el.style[cssProperty] = value;
    }
    static camelCase(text) {
        return text.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());
    }
    static styleSupport(prop) {
        let vendorProp;
        let supportedProp;
        const capProp = prop.charAt(0).toUpperCase() + prop.slice(1);
        const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        let div = document.createElement('div');

        if (prop in div.style) {
            supportedProp = prop;
        } else {
            for (let i = 0; i < prefixes.length; i++) {
                vendorProp = prefixes[i] + capProp;
                if (vendorProp in div.style) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }

        div = null;
        return supportedProp;
    }
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // eslint-disable-next-line no-bitwise
            const r = (Math.random() * 16) | 0;
            // eslint-disable-next-line no-bitwise
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    static getEventName(eventName, uuid) {
        return `${eventName}__EVENT_EMITTER__${uuid}`;
    }
}

Utils.eventListeners = {};

export default function $utils(selector) {
    return new Utils(selector);
}
