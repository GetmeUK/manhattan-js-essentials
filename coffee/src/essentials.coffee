
# Elements

closest = (element, selectors) ->
    # Returns the closest ancestor of the current element (or the current
    # element itself) which matches the selectors.
    if element.closest
        return element.closest(selectors)

    # Polyfil taken from here (http://stackoverflow.com/a/16430350/4657956) in
    # case closest isn't supported natively by the browser.
    matches = element.matches or
        element.webkitMatchesSelector or
        element.mozMatchesSelector or
        element.msMatchesSelector

    while element
        if matches.call(element, selectors)
            break
        element = element.parentElement

    return element

create = (tag, props={}) ->
    # Shortcut for creating an element

    # Create the element
    element = document.createElement(tag)

    # Set the elements properties/attributes
    for k, v of props
        if (k in element)
            element[k] = v
        else
            element.setAttribute(k, v)

    return element

many = (selectors, container=document) ->
    # Select elements from within a container using the given CSS selector
    return Array.prototype.slice.call(container.querySelectorAll(selectors))

one = (selectors, container=document) ->
    # Select an element from within a container using the given CSS selector
    return container.querySelector(selectors)


# Events (DOM)

dispatch = (element, eventType, props={}) ->
    # Dispatch an event against an element
    event = document.createEvent('Event')
    event.initEvent(eventType, true, true)
    for k, v of props
        event[k] = v
    return element.dispatchEvent(event)

ignore = (element, listeners) ->
    # Remove one or more event listeners from an element. The `listeners`
    # argument should contain be an object mapping event types (the key) to
    # listener functions (the value).
    for eventTypes, func of listeners
        for eventType in eventTypes.split(/\s+/)
            element.removeEventListener(eventType, func)

listen = (element, listeners) ->
    # Add one or more event listeners to an element. The `listeners` argument
    # should contain be an object mapping event types (the key) to listener
    # functions (the value).
    for eventTypes, func of listeners
        for eventType in eventTypes.split(/\s+/)
            element.addEventListener(eventType, func)


# Plugins

config = (inst, props, args, element, prefix='data-') ->
    # Configure the given object (instance) using a set of:
    #
    # - default properties which are overridden by,
    # - a set of user defined arguments which are overridden by,
    # - a set of `data-` attributes defined against the given element.
    #
    # Optionally the attribute prefix can be customised.
    for k, v of props

        # Set the using the default
        inst[k] = v

        # Set using an argument
        if args.hasOwnProperty(k)
            inst[k] = args[k]

        # Set using a `data-` attribute
        if not element
            continue

        attr = prefix + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        if element.hasAttribute(attr)
            if typeof v is 'number'
                inst[k] = parseInt(element.getAttribute(attr))
            else if v is false
                inst[k] = true
            else
                inst[k] = element.getAttribute(attr)


# Regular expressions

escapeRegExp = (s) ->
    # Escape a string literal for use in a regular expression
    return s.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g, '\\$&')


# Tests

cssSelectorSupported = (selector) ->
    # Return true if the specified CSS selector is supported by the current
    # browser.
    try
        document.querySelector(selector)
    catch e
        return false
    return true


# Exports

module.exports = {

    # Elements
    closest: closest,
    create: create,
    one: one,
    many: many,

    # Events (DOM)
    dispatch: dispatch,
    ignore: ignore,
    listen: listen,

    # Plugins
    config: config,

    # Regular expressions
    escapeRegExp: escapeRegExp,

    # Tests
    cssSelectorSupported: cssSelectorSupported
    }