/**
*@jest-environment jsdom 
*/
import { render,cleanup, waitFor} from '@testing-library/react';
import * as React from 'react';
import Admin from './Admin';

afterEach(()=>{
  cleanup();
});

describe('Admin Page Tests', () => { 

test('Page matches snapshot', () => { 
    let page = render(<Admin/>);
    expect(page).toMatchSnapshot();
 })

test('Login Component is visible', async () => {
    let page = render(<Admin/>);

    let loginButton = await (page.findByText("Login"));

    expect(loginButton).toBeInTheDocument();
});

});
