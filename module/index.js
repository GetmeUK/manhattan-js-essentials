
// -- DOM Events --

/**
 * Dispatch an event against the given element.
 */
export function dispatch(element, eventType, props={}) {
    const event = document.createEvent('Event')
    event.initEvent(eventType, true, true)
    for (let k in props) {
        event[k] = props[k]
    }
    return element.dispatchEvent(event)
}

/**
 * Remove one or more event listeners from an element. The `listeners` argument
 * should be an object mapping event types (the key) to listener
 * function (the value).
 *
 *     ignore(myElement, {'mouseover mousedown': myFunc})
 *
 */
export function ignore(element, listeners) {
    for (let eventTypes in listeners) {
        for (let eventType of eventTypes.split(/\s+/)) {
            element.removeEventListener(eventType, listeners[eventTypes])
        }
    }
}

/**
 * Add one or more event listeners to an element. The `listeners` argument
 * should contain be an object mapping event types (the key) to listener
 * function (the value).
 *
 *     listen(myElement, {'mouseover mousedown': myFunc})
 *
 */
export function listen(element, listeners) {
    for (let eventTypes in listeners) {
        for (let eventType of eventTypes.split(/\s+/)) {
            element.addEventListener(eventType, listeners[eventTypes])
        }
    }
}


// -- DOM manipulation --

/**
 *  Shortcut for creating an element
 */
export function create(tag, props={}) {
    // Create the element
    const element = document.createElement(tag)

    // Set the elements properties/attributes
    for (let k in props) {
        if (k in element) {
            element[k] = props[k]
        } else {
            element.setAttribute(k, props[k])
        }
    }

    return element
}


// -- DOM selectors --

/**
 * Return the closest ancestor of the current element (or the current element)
 * matching the given selector.
 */
export function closest(element, selectors) {
    if (element.closest) {
        return element.closest(selectors)
    }

    // Polyfil taken from here (http://stackoverflow.com/a/16430350/4657956) in
    // case closest isn't supported natively by the browser.
    const matches = element.matches
        || element.webkitMatchesSelector
        || element.mozMatchesSelector
        || element.msMatchesSelector

    while (element) {
        if(matches.call(element, selectors)) {
            break
        }
        element = element.parentElement
    }

    return element
}

/**
 * Select elements from within a container using the given CSS selector.
 */
export function many(selectors, container=document) {
    return Array.prototype.slice.call(container.querySelectorAll(selectors))
}

/**
 * Select an element from within a container using the given CSS selector.
 */
export function one(selectors, container=document) {
    return container.querySelector(selectors)
}


// -- Plugin configuration --

/**
 * Configure the given object (instance) using a set of:
 *
 * - default properties which are overridden by,
 * - a set of user defined arguments which are overridden by,
 * - a set of `data-` attributes defined against the given element.
 *
 * Optionally the attribute prefix can be customised.
*/
export function config(inst, props, args, element, prefix='data-') {
    for (let k in props) {

        // Set to the default value initially
        inst[k] = props[k]

        // Set using argument
        if(args.hasOwnProperty(k)) {
            inst[k] = args[k]
        }

        // If an element is supplied check for an attribute to set the value
        if (element) {
            let attrName = prefix
                + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

            if(element.hasAttribute(attrName)) {
                if (typeof props[k] === 'number') {
                    inst[k] = parseInt(element.getAttribute(attrName), 10)
                } else if (props[k] === false) {
                    inst[k] = true
                } else {
                    inst[k] = element.getAttribute(attrName)
                }
            }
        }
    }
}


// -- Regular expressions --

/**
 * Escape a string literal for use in a regular expression.
 */
export function escapeRegExp(s) {
    return s.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g, '\\$&')
}


// -- Tests --

/**
 * Return true if the specified CSS selector is supported by the current
 * browser.
 */
export function cssSelectorSupported(selector) {
    try {
        document.querySelector(selector)
    } catch (e) {
        return false
    }
    return true
}
