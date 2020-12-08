import React from 'react';
import {render,screen, waitFor } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import VehicleList from '../VehicleList';

const server = setupServer(
    rest.get('/vehuicle', (req, res, ctx)=>{
    return res(ctx.status(200),ctx.json({vehicle: [{id:1,modelYear:2020,url:"image/new"}]}))
})
)

beforeAll(()=>server.listen())
afterEach(()=>server.resetHandlers())
afterAll(()=>server.close());

describe('When all is well', ()=>{
    test('VehicleList renders', async ()=>{
        render(<VehicleList/>);

        await waitFor(()=>screen.getByRole('heading'))

        expect(screen.getByRole('heading')).toHaveTextContent('Vehicle List')
    })
    screen.debug();
})

test('handlers server errors', async ()=>{
    server.use(
        rest.get('/vehicle', (req, res, ctx)=>{
            return res(ctx.status(500))
        })
    )
})

