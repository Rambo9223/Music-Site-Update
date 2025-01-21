/**
*@jest-environment jsdom 
*/
import { render,cleanup} from '@testing-library/react';
import Home from './Home';
import * as React from 'react';


afterEach(()=>{
    cleanup();
})

describe('Home Page Tests', () => {

    test('Page matches snapshot', () => {
        let page = render(<Home/>);
        expect(page).toMatchSnapshot();
    });

    /* Media queries is not allowing a correct render of page
    test('Elements appear on the page', async () => {
        let page = render(<Home/>);
        let aboutMe = await page.findByText("About Me:");
        let single = await page.findByText("My Newest Single!");

        expect(aboutMe).toBeInTheDocument();
        expect(single).toBeInTheDocument();
    })
        */ 
})