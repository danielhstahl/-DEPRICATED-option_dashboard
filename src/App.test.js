import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Reducers/index'
import { MemoryRouter } from 'react-router'
import  App from './App'
import { shallow, mount, render } from 'enzyme'
import CardPlot, { ThetaWarning } from './Cards/CardPlot'
import { Dropdown, Menu } from 'antd'
import { modelMap } from './modelSkeleton'
let store = createStore(reducer)

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
    
})