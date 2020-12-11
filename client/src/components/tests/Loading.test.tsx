import React from 'react';
import {screen, render} from '@testing-library/react';
import Loading from '../Loading';

describe('Render Loading on start up', () => {
    test('should render Loading component', () => {
        const message = "Loading data...";
        const {getByTestId} = render(<Loading message={message} />)

        expect(getByTestId('loading')).toHaveTextContent('Loading data...')
    })
    screen.debug();
})