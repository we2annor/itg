import React from 'react';
import {screen,render}from '@testing-library/react';
import Vehicle from '../Vehicle';

describe('When all is well', ()=>{
    test('Should render Vehicle', ()=>{
        const vehicle = {id:'',media:[],url:'', modelYear:''}
        render(<Vehicle vehicle={vehicle}/>)
    })
    screen.debug();
})