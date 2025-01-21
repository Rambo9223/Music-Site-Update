/**
*@jest-environment jsdom
*/
import { render,cleanup, fireEvent} from '@testing-library/react';
import * as React from 'react';
//import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';


afterEach(()=>{
    cleanup();
});

function MockNavBar(){
    return <Router><NavBar/></Router>
}

// render page, see if we can see the layout links, if yes  fire them and see that the page changes

describe('Navbar Page Tests', () => {

    test('Page matches snapshot', () => {
        let page = render(<MockNavBar/>);
        expect(page).toMatchSnapshot();
    });

    /*test('Nav link elements are visible', async () => {
        let page = render(<MockNavBar/>);
        let homeLink = page.getAllByRole("link",{hidden:true});
        console.log(homeLink);
        expect(homeLink).toBeInTheDocument();

    });*/
});