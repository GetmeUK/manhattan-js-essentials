

# Elements

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

one = (selectors, container=document) ->
    # Select elements from a container using the given CSS selectors
    return container.querySelector(selectors)

many = (selectors, container=document) ->
    # Select an element from a container using the given CSS selectors
    return Array.prototype.slice.call(container.querySelectorAll(selectors))


# Events (DOM)

dispatch = (element, eventType, props={}) ->
    # Dispatch an event against an element
    event = document.createEvent('Event')
    event.initEvent(eventType, true, true)
    for k, v of props
        event[k] = v
    element.dispatchEvent(event)

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


module.exports = {

    # Elements
    create: create,
    one: one,
    many: many,

    # Events (DOM)
    dispatch: dispatch,
    ignore: ignore,
    listen: listen

    }