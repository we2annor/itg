import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { getByTestId, render,screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VehicleList from '../VehicleList';

const server = setupServer(rest.get('/api/vehicle', (req,res,ctx)=>{
    const vehicle =  {
        id:'xf',
        modelYear:'2020',
        url: '/api/vehicle',
        media: [],
      }
    return res(ctx.status(200),ctx.json({vehicle: vehicle}))
}))

beforeAll(()=> server.listen());
afterEach(()=>server.resetHandlers());
afterEach(()=>server.close())

test('loads and diplays Vehicles', async ()=>{
    const {getByTestId} = render(<VehicleList />)

    const renderedResults = await waitFor(()=>getByTestId('vehicle-list-data'))
    expect(renderedResults).toHaveLength(2);
})

test('handles server error', async ()=>{
    const {getByTestId}= render(<VehicleList />);
    server.use(rest.get('/api/vehicle', (req,res, ctx)=>{
        return res(ctx.status(500), ctx.json({errorMessage: 'Error occured while loading data'}));
    }))

    const renderedResults = await waitFor(()=>getByTestId('error-div'));
    expect(renderedResults).toHaveTextContent(`Error occured while loading data`)
})
//afterEach(cleanup);
describe('Renders Vehicle list component without crashsing', ()=>{
    test('VehicleList renders', async ()=>{
        const {getByTestId} = render(<VehicleList/>);
        expect(getByTestId('loading')).toHaveTextContent('Loading data...');
    })
    screen.debug();
})

