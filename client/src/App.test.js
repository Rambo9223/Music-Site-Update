/**
*@jest-environment jsdom 
*/
import { render,cleanup } from '@testing-library/react';
import "@testing-library/jest-dom"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';


afterEach(()=>{
  cleanup();
})

function MockApp(){
  return <BrowserRouter><App/></BrowserRouter>
}

test('App matches snapshot', () => {
  let app = render(<MockApp/>);
  expect(app).toMatchSnapshot();
});
