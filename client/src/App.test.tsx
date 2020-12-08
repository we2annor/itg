import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('when all is well',()=>{
  test('should render App', () => {
    const {getByText}=render(<App />);
    //const linkElement = screen.getByText();
   // expect(linkElement).toBeInTheDocument();
  });  
  screen.debug();
})
