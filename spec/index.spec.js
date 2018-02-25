import * as chai from 'chai'
import * as sinon from 'sinon'

import * as setup from './setup.js'
import * as $ from '../module/index.js'

chai.should()
chai.use(require('sinon-chai'))


describe('DOM events', () => {

    let foo = null

    beforeEach(() => {
        foo = $.create('div', {'class': 'foo omm'})
    })

    describe('dispatch', () => {
        it('should dispatch an event to an element', () => {
            const listener = sinon.spy()
            foo.addEventListener('click', listener)
            $.dispatch(foo, 'click', {'button': 1})
            listener.should.have.been.called
        })
    })

    describe('ignore', () => {
        it('should remove an event listener from an element', () => {
            const listener = sinon.spy()
            foo.addEventListener('click', listener)
            $.ignore(foo, {'click': listener})
            $.dispatch(foo, 'click', {'button': 1})
            listener.should.not.have.been.called
        })
    })

    describe('listen', () => {
        it('should add an event listener to an element', () => {
            const listener = sinon.spy()
            $.listen(foo, {'click': listener})
            $.dispatch(foo, 'click', {'button': 1})
            listener.should.have.been.called
        })
    })
})

describe('DOM manipulators', () => {

    describe('create', () => {
        it('should generate a new element', () => {
            const element = $.create(
                'div',
                {
                    'id': 'foo',
                    'data-foo': 'bar'
                }
            )
            element.tagName.toLowerCase().should.equal('div')
            element.getAttribute('data-foo').should.equal('bar')
            element.id.should.equal('foo')
        })
    })
})

describe('DOM selectors', () => {

    let foo = null
    let bar = null
    let zee = null

    before(() => {
        const {body} = document
        foo = $.create('div', {'class': 'foo omm'})
        bar = $.create('div', {'class': 'bar omm'})
        zee = $.create('div', {'class': 'zee omm'})
        body.appendChild(foo)
        foo.appendChild(bar)
        foo.appendChild(zee)
    })

    after(() => {
        zee.remove()
        bar.remove()
        foo.remove()
    })

    describe('closest', () => {
        it('the closest ancestor of the current element (or the current' +
           'element itself) which matches the selectors.', () => {

            let element = $.closest(zee, '.foo')
            element.should.equal(foo)

            element = $.closest(zee, '.zee')
            element.should.equal(zee)
        })
    })

    describe('closest', () => {
        it('should return an element by CSS selector from the document', () => {
            const element = $.one('.foo')
            element.should.equal(foo)
        })
        it('should return an element by CSS selector from a container', () => {
            const element = $.one('.bar', foo)
            element.should.equal(bar)
        })
    })

    describe('many', () => {
        it('should return a list of elements by CSS selector from the' +
           'document', () => {

            const elements = $.many('.omm')
            elements.should.have.length(3)
            elements.should.deep.equal([foo, bar, zee])
        })
        it('should return a list of elements by CSS selector from a' +
           'container', () => {

            const elements = $.many('.omm', foo)
            elements.should.have.length(2)
            elements.should.deep.equal([bar, zee])
        })
    })
})

describe('Plugins', () => {

    let empty = null
    let configured = null

    before(() => {
        empty = $.create('div')
        configured = $.create(
            'div',
            {
                'data-foo': '4',
                'data-bar': '',
                'data-zee': 'omm'
            }
        )
    })

    after(() => {
        empty.remove()
        configured.remove()
    })

    it('should configure an instances based on a set of default properties,' +
       'user defined properties and `data-` attributes', () => {

        let inst = null
        let props = null
        let args = null

        // Configured by props
        inst = {}
        props = {
            'foo': 2,
            'bar': false,
            'zee': 'mmo'
        }

        $.config(inst, props, {})
        inst.should.deep.equal(props)

        // Configured by user defined arguments
        inst = {}
        args = {
            'foo': 3,
            'zee': 'mom'
        }
        $.config(inst, props, args)
        inst.should.deep.equal({
            'foo': 3,
            'bar': false,
            'zee': 'mom'
        })

        // Configured by `data-` attributes
        inst = {}
        args = {
            'foo': 3,
            'zee': 'mom'
        }
        $.config(inst, props, args, configured)
        inst.should.deep.equal({
            'foo': 4,
            'bar': true,
            'zee': 'omm'
        })

    })

})

describe('Regular expressions', () => {

    describe('escapeRegExp', () => {
        it('should escape a string for use in a regular expression', () => {
            const escaped = $.escapeRegExp('^(Start-Finish)$')
            escaped.should.equal('\\^\\(Start-Finish\\)\\$')
        })
    })
})

describe('Tests', () => {

    let {querySelector} = document

    before(() => {
        document.querySelector = (selector) => {
            if (selector !== ':autofill') {
                throw new Error('Not a supported selector')
            }
        }
    })

    after(() => {
        document.querySelector = querySelector
    })

    describe('cssSelectorSupported', () => {

        it('should return true for :autofill', () => {
            const supported = $.cssSelectorSupported(':autofill')
            supported.should.be.true
        })

        it('should return true for :-webkit-autofill', () => {
            const supported = $.cssSelectorSupported(':-webkit-autofill')
            supported.should.be.false
        })

        it('should return true for :-moz-autofill', () => {
            const supported = $.cssSelectorSupported(':-moz-autofill')
            supported.should.be.false
        })

    })
})
