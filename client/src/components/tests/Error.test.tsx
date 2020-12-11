import React from 'react';
import {screen, render} from '@testing-library/react';
import Error from '../Error';

describe('Render Error component', ()=>{
    test('should render Error component successfully', ()=>{
        const errorMessage = "Error Occured";
        const {getByTestId}=render(<Error message={errorMessage}/>);

        expect(getByTestId('error-div')).toHaveTextContent('Error Occured');
    })
    screen.debug();
})