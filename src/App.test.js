import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Reducers/index'
import { MemoryRouter, Link } from 'react-router'
import  App from './App'
import { shallow, mount, render } from 'enzyme'
import CardPlot, { ThetaWarning } from './Cards/CardPlot'
import { Dropdown, Menu, Modal, Form, InputNumber, Button, Input, Select } from 'antd'
import { modelMap } from './modelSkeleton'
//import parameters from './Actions/parameters'
let store// = createStore(reducer)
const mockEvent={
    preventDefault:()=>{}
}
const mockTextEvent=value=>({
    target:{
        value
    }
})
beforeEach(()=>{
    store=createStore(reducer)
})
describe('base app', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve([{
            atPoint:5,
            value:4
        }])
    }))

    it('contains three cards', ()=>{
        const wrapper=mount(<Provider store={store}>
            <MemoryRouter initialEntries={[ '/' ]}>
                <App />
            </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(CardPlot).length).toEqual(3)
    })
    it('correctly has text in dropdown for advanced', ()=>{
        const wrapper=mount(<Provider store={store}>
                <MemoryRouter initialEntries={[ `/advanced/price` ]}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(wrapper.find(Dropdown.Button).text()).toEqual('Advanced: Inputs')
    })
    it('correctly has text in dropdown for bs', ()=>{
        const wrapper=mount(<Provider store={store}>
                <MemoryRouter initialEntries={[ `/bs/price` ]}>
                    <App />
                </MemoryRouter>
            </Provider>
        )
        expect(wrapper.find(Dropdown.Button).text()).toEqual('Black Scholes: Inputs')
    })
    it('correctly warns for theta on advanced and heston', ()=>{
        modelMap.filter(model=>model.name!=='bs').forEach(model=>{
            const wrapperPrice=mount(<Provider store={store}>
                <MemoryRouter initialEntries={[ `/${model.name}/price` ]}>
                    <App />
                </MemoryRouter>
            </Provider>
            )
            expect(wrapperPrice.find(ThetaWarning).length).toEqual(0)
            const wrapperTheta=mount(<Provider store={store}>
                <MemoryRouter initialEntries={[ `/${model.name}/theta` ]}>
                    <App />
                </MemoryRouter>
            </Provider>
            )
            expect(wrapperTheta.find(ThetaWarning).length).toBeGreaterThan(0)
        })
    })
    it('correctly does not warn for theta on bs', ()=>{
        modelMap.filter(model=>model.name==='bs').forEach(model=>{
            const wrapperPrice=mount(<Provider store={store}>
                <MemoryRouter initialEntries={[ `/${model.name}/price` ]}>
                    <App />
                </MemoryRouter>
            </Provider>
            )
            expect(wrapperPrice.find(ThetaWarning).length).toEqual(0)
            const wrapperTheta=mount(<Provider store={store}>
                <MemoryRouter initialEntries={[ `/${model.name}/theta` ]}>
                    <App />
                </MemoryRouter>
            </Provider>
            )
            expect(wrapperTheta.find(ThetaWarning).length).toEqual(0)
        })
    })
    it('correctly errors when entering out of bounds steps', ()=>{
        const wrapper=mount(<Provider store={store}>
            <MemoryRouter initialEntries={[ `/advanced/price/inputs/manual` ]}>
                <App />
            </MemoryRouter>
        </Provider>
        )
        const modal=wrapper.find(Modal)
        expect(modal.length).toEqual(1)
        expect(modal.find(Button).props().disabled).toBeFalsy()
        const field=wrapper.findWhere(val=>val.props().objKey==='G').find(InputNumber)
        field.props().onChange('-1')
        wrapper.update()
        expect(wrapper.find('.ant-form-explain').text()).toEqual('Must be a number between 0.2 and 20')
        expect(wrapper.find(Modal).find(Button).props().disabled).toEqual(true)
    })    
    it('submits and does not have theta warning when adaV=0 and v0=1 for Advanced', ()=>{
        const wrapper=mount(<Provider store={store}>
            <MemoryRouter initialEntries={[ `/advanced/theta/inputs/manual` ]}>
                <App />
            </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(ThetaWarning).length).toEqual(2)
        const modal=wrapper.find(Modal)
        expect(modal.length).toEqual(1)
        expect(modal.find(Button).props().disabled).toBeFalsy()
        const v0=wrapper.findWhere(val=>val.props().objKey==='v0').find(InputNumber)
        v0.props().onChange(1)
        const adaV=wrapper.findWhere(val=>val.props().objKey==='adaV').find(InputNumber)
        adaV.props().onChange(0)
        wrapper.update()

        expect(wrapper.find('.ant-form-explain').length).toEqual(0)
        wrapper.find(Modal).find(Button).props().onClick()
        wrapper.update()
        wrapper.find('.ant-modal-close').props().onClick()
        wrapper.update()
        expect(wrapper.find(Modal).length).toEqual(0)
        expect(wrapper.find(ThetaWarning).length).toEqual(0)
    })    
    it('submits and does have theta warning for Heston', ()=>{
        const wrapper=mount(<Provider store={store}>
            <MemoryRouter initialEntries={[ `/heston/theta/inputs/manual` ]}>
                <App />
            </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(ThetaWarning).length).toEqual(2)
        const modal=wrapper.find(Modal)
        expect(modal.length).toEqual(1)
        expect(modal.find(Button).props().disabled).toBeFalsy()
        const v0=wrapper.findWhere(val=>val.props().objKey==='v0').find(InputNumber)
        v0.props().onChange(.05)
        const adaV=wrapper.findWhere(val=>val.props().objKey==='adaV').find(InputNumber)
        adaV.props().onChange(.25)
        wrapper.update()
        wrapper.find(Modal).find(Button).props().onClick()
        wrapper.update()
        wrapper.find('.ant-modal-close').props().onClick()
        wrapper.update()
        expect(wrapper.find(Modal).length).toEqual(0)
        expect(wrapper.find(ThetaWarning).length).toEqual(2)
    }) 
    it('changes calibration form', ()=>{
        const wrapper=mount(<Provider store={store}>
            <MemoryRouter initialEntries={[ `/advanced/price/inputs/calibration` ]}>
                <App />
            </MemoryRouter>
        </Provider>
        )
        //console.log(wrapper.debug())
        const modal=wrapper.find(Modal)
        expect(modal.length).toEqual(1)
        expect(modal.find(Button).props().disabled).toBeFalsy()
        const field=wrapper.findWhere(val=>val.props().objKey==='k').find(Input.TextArea)
        //console.log(field.debug())
        field.props().onChange(mockTextEvent('1, 2, 3'))
        wrapper.update()
        expect(wrapper.find(Modal).find(Button).props().disabled).toBeFalsy()
    })   
    it('errors calibration with incorrect input', ()=>{
        const wrapper=mount(<Provider store={store}>
            <MemoryRouter initialEntries={[ `/advanced/price/inputs/calibration` ]}>
                <App />
            </MemoryRouter>
        </Provider>
        )
        const modal=wrapper.find(Modal)
        expect(modal.length).toEqual(1)
        expect(modal.find(Button).props().disabled).toBeFalsy()
        const field=wrapper.findWhere(val=>val.props().objKey==='k').find(Input.TextArea)
        field.props().onChange(mockTextEvent('hello'))
        wrapper.update()
        expect(wrapper.find('.ant-form-explain').text()).toEqual('Requires positive, comma separated numbers like "2, 3, 4"')
        expect(wrapper.find(Modal).find(Button).props().disabled).toEqual(true)
    })    
    it('correctly selects quantile', ()=>{
        const wrapper=mount(<Provider store={store}>
            <MemoryRouter initialEntries={[ `/advanced/price` ]}>
                <App />
            </MemoryRouter>
        </Provider>
        )
        //expect(modal.find(QuantileInputs).props().disabled).toBeFalsy()
        const field=wrapper.findWhere(val=>val.props().objKey==='quantile').find(Select)
        field.props().onChange('.008')
        wrapper.update()
        expect(wrapper.findWhere(val=>val.props().objKey==='quantile').find(Select).props().value).toEqual('0.008')
    })    
})