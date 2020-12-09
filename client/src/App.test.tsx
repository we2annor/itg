import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('When rendered',()=>{
  test('should render App successfully', () => {
    render(<App />);
  });  
})
