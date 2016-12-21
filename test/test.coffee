# Imports

chai = require 'chai'
jsdom = require 'mocha-jsdom'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

$ = require '../src/essentials'


# Set up

chai.should()
chai.use(sinonChai)


# Tests

describe 'Elements', () ->

    jsdom()

    foo = null
    bar = null
    zee = null

    before ->
        body = document.body
        foo = $.create('div', {'class': 'foo omm'})
        bar = $.create('div', {'class': 'bar omm'})
        zee = $.create('div', {'class': 'zee omm'})
        body.appendChild(foo)
        foo.appendChild(bar)
        foo.appendChild(zee)

    describe 'closest', ->

        it 'the closest ancestor of the current element (or the current element
            itself) which matches the selectors.', ->

            element = $.closest(zee, '.foo')
            element.should.equal foo

            element = $.closest(zee, '.zee')
            element.should.equal zee

    describe 'create', ->

        it 'should generate a new element', ->

            element = $.create('div', {'id': 'foo', 'data-foo': 'bar'})
            element.tagName.toLowerCase().should.equal 'div'
            element.getAttribute('data-foo').should.equal 'bar'
            element.id.should.equal 'foo'

    describe 'one', ->

        it 'should return an element by CSS selector from the document', ->

            element = $.one('.foo')
            element.should.equal foo

        it 'should return an element by CSS selector from a container', ->

            element = $.one('.bar', foo)
            element.should.equal bar

    describe 'many', ->

        it 'should return a list of elements by CSS selector from the
            document', ->

            elements = $.many('.omm')
            elements.should.have.length 3
            elements.should.deep.equal [foo, bar, zee]

        it 'should return a list of elements by CSS selector from a
            container', ->

            elements = $.many('.omm', foo)
            elements.should.have.length 2
            elements.should.deep.equal [bar, zee]


describe 'Events (DOM)', ->

    jsdom()

    foo = null

    beforeEach ->
        foo = $.create('div', {'class': 'foo omm'})

    describe 'dispatch', ->

        it 'should dispatch an event against an element', ->

            listener = sinon.spy()
            foo.addEventListener('click', listener)
            $.dispatch(foo, 'click', {'button': 1})
            listener.should.have.been.called

    describe 'ignore', ->

        it 'should remove an event listener from an element', ->

            listener = sinon.spy()
            foo.addEventListener('click', listener)
            $.ignore(foo, {'click': listener})
            $.dispatch(foo, 'click', {'button': 1})
            listener.should.not.have.been.called

    describe 'listen', ->

        it 'should add an event listener to an element', ->

            listener = sinon.spy()
            $.listen(foo, {'click': listener})
            $.dispatch(foo, 'click', {'button': 1})
            listener.should.have.been.called


describe 'Plugins', ->

    jsdom()

    describe 'config', ->

        empty = null
        configured = null

        beforeEach ->
            empty = $.create('div')
            configured = $.create('div', {
                'data-foo': '4',
                'data-bar',
                'data-zee': 'omm'
                })

        it 'should configure an instances based on a set of default properties,
            user defined properties and `data-` attributes', ->

            # Configured by props
            inst = {}
            props = {'foo': 2, 'bar': false, 'zee': 'mmo'}
            $.config(inst, props, {})
            inst.should.deep.equal props

            # Configured by user defined arguments
            inst = {}
            args = {'foo': 3, 'zee': 'mom'}
            $.config(inst, props, args)
            inst.should.deep.equal {'foo': 3, 'bar': false, 'zee': 'mom'}

            # Configured by `data-` attributes
            inst = {}
            args = {'foo': 3, 'zee': 'mom'}
            $.config(inst, props, args, configured)
            inst.should.deep.equal {'foo': 4, 'bar': true, 'zee': 'omm'}


describe 'Regular expressions', ->

    describe 'escapeRegExp', ->

        it 'should escape a string for use in a regular expression', ->

            escaped = $.escapeRegExp('^(Start-Finish)$')
            escaped.should.equal '\\^\\(Start-Finish\\)\\$'


describe 'Tests', ->

    jsdom()

    describe 'cssSelectorSupported', ->

        querySelector = null

        before ->
            querySelector = document.querySelector
            document.querySelector = (selector) ->
                if selector is ':autofill'
                    return
                else
                    throw new Error('Not a supported selector')

        after ->
            document.querySelector = querySelector

        it 'should return true for :autofill', ->

            supported = $.cssSelectorSupported(':autofill')
            supported.should.be.true

        it 'should return true for :-webkit-autofill', ->

            supported = $.cssSelectorSupported(':-webkit-autofill')
            supported.should.be.false

        it 'should return true for :-moz-autofill', ->

            supported = $.cssSelectorSupported(':-moz-autofill')
            supported.should.be.false