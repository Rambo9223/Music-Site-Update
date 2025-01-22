/**
*@jest-environment jsdom 
*/
import { render,cleanup} from '@testing-library/react';
import * as React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3Vlc3QiLCJ1c2VybmFtZSI6Ikd1ZXN0QWRtaW5AU1JNdXNpYy5jb20iLCJwYXNzd29yZCI6ImFkbWluMSIsImlhdCI6MTcyNTUzMDkxMSwiZXhwIjoxNzI1NTM0NTExfQ.dahD4ehVy35hz4Tv89jaqN9JpNy-3_-AOhxGEiRMohs"

afterEach(()=>{
  cleanup();
  localStorage.clear();  
});

function MockLayout(){
    return <Router><Layout/></Router>
}

describe('Layout Page Tests', () => {

    test('Page matches snapshot', () => {
        let page = render(<MockLayout/>);
        expect(page).toMatchSnapshot();
    });

    test('Page renders correct components without LocalStorage token', async () => {
        // in this case we expect with no token the admin nav link to not exist 

        let page = render(<MockLayout/>);
        let homePage = await page.findByText("Home");
        let adminPage = page.queryByText("Admin");
        expect(homePage).toBeInTheDocument();
        expect(adminPage).toEqual(null);
    });

    test('Page renders correct components with LocalStorage token', async () => {
        /* we create a local storage user token, now when page renders we expect to see the admin
        link element and logout button */
        const key = "user";
        const value = JSON.stringify({
            "token":token
        })
        localStorage.setItem(key,value);
        expect(localStorage.setItem).toHaveBeenLastCalledWith(key,value);
        expect(localStorage.__STORE__[key]).toBe(value);
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);

        let page = render(<MockLayout/>);
        let adminPage = await page.findByText("Admin");
        let logoutButton = await page.findByText("Logout");
        expect(adminPage).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();

    });
})