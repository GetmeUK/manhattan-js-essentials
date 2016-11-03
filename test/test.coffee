# Imports

chai = require 'chai'
jsdom = require 'mocha-jsdom'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

$ = require '../src/essentials'


# Set up

chai.should()
chai.use(sinonChai);


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

    describe 'create', ->

        it 'should generate a new element', ->

            element = $.create('div', {'id': 'foo', 'data-foo': 'bar'})
            element.tagName.toLowerCase().should.equal 'div'
            element.getAttribute('data-foo').should.equal 'bar'
            element.id.should.equal 'foo'

    describe 'one', ->

        it 'should return an element by CSS selector from the document', () ->

            element = $.one('.foo')
            element.should.equal foo

        it 'should return an element by CSS selector from a container', () ->

            element = $.one('.bar', foo)
            element.should.equal bar

    describe 'many', ->

        it 'should return a list of elements by CSS selector from the
            document', () ->

            elements = $.many('.omm')
            elements.should.have.length 3
            elements.should.deep.equal [foo, bar, zee]

        it 'should return a list of elements by CSS selector from a
            container', () ->

            elements = $.many('.omm', foo)
            elements.should.have.length 2
            elements.should.deep.equal [bar, zee]


describe 'Events (DOM)', () ->

    jsdom()

    foo = null

    beforeEach ->
        body = document.body
        foo = $.create('div', {'class': 'foo omm'})
        body.appendChild(foo)

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