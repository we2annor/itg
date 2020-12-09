import React from 'react';
import {cleanup, render,screen } from '@testing-library/react';
import VehicleList from '../VehicleList';

afterEach(cleanup);
describe('Renders Vehicle list component without crashsing', ()=>{
    test('VehicleList renders', async ()=>{
        const {getByTestId} = render(<VehicleList/>);
        expect(getByTestId('loading')).toHaveTextContent('Loading data...');
    })
    screen.debug();
})

