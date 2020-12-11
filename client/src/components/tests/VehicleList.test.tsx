import React from 'react';
import {render, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VehicleList from '../VehicleList';

test('should display test Loading data... while loading vehicles', async ()=>{
    await act(async ()=>{
        const {getByTestId} = render(<VehicleList />)

        const loadingComponent = await waitFor(()=>getByTestId('loading'))
        expect(loadingComponent).toHaveTextContent('Loading data...');
    })
})

test('should removes text "Loading data..." after displaying Vehicles', async ()=>{
    await act(async ()=>{
        const {getByTestId} = render(<VehicleList />);

        const removedElement = await waitForElementToBeRemoved(getByTestId('loading'));
        expect(removedElement).toBeUndefined();
    })
})

test('should display vehicles', async ()=>{
    await act(async ()=>{
        const {findAllByTestId}= render(<VehicleList />);

        const renderedElement = await findAllByTestId('vehicleList');
        expect(renderedElement).toHaveLength(1);
        expect(renderedElement.map((ele=>ele.TEXT_NODE))).toStrictEqual([3])
        console.log('render', renderedElement);
    })
})

test('should display Error component when an error occured', async ()=>{
    await act(async ()=>{
        const {getByTestId}= render(<VehicleList />);

        const errorComponent = await waitFor(()=>getByTestId('error-div'));
        expect(errorComponent).toBeVisible();
        expect(errorComponent).toHaveTextContent('Error Occured')
        expect(errorComponent).toBeInTheDocument();
    })
})
