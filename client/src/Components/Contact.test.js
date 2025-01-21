/**
*@jest-environment jsdom 
*/
import { render,cleanup} from '@testing-library/react';
import * as React from 'react';
import Contact from './Contact';

afterEach(()=>{
    cleanup();
  });

 
  describe('Contact Page Tests', () => {
   

    test('Page matches snapshot', () => {
      let page = render(<Contact/>);
      expect(page).toMatchSnapshot();
    });

    // Issue with component not rendering properly, only get a empty body and div
    
  });