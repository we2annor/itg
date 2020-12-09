import React from 'react';
import {cleanup, render,screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import VehicleList from '../VehicleList';

jest.mock('axios');

afterEach(cleanup);


describe('When all is well', ()=>{
    test('VehicleList renders', async ()=>{
        render(<VehicleList/>);
        
    })
    screen.debug();
})

