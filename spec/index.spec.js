import * as chai from 'chai'
import * as sinon from 'sinon'

import * as setup from './setup.js'
import * as $ from '../module/index.js'

chai.should()
chai.use(require('sinon-chai'))


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

    let foo = null,
        bar = null,
        zee = null

    before(() => {
        const {body} = document
        foo = $.create('div', {'class': 'foo omm'})
        bar = $.create('div', {'class': 'bar omm'})
        zee = $.create('div', {'class': 'zee omm'})
        body.appendChild(foo)
        foo.appendChild(bar)
        foo.appendChild(zee)
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

describe('Regular expressions', () => {

    describe('escapeRegExp', () => {
        it('should escape a string for use in a regular expression', () => {
            const escaped = $.escapeRegExp('^(Start-Finish)$')
            escaped.should.equal('\\^\\(Start-Finish\\)\\$')
        })
    })
})
