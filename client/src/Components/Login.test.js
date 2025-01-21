/**
*@jest-environment jsdom
*/
import { render,cleanup, fireEvent, waitFor} from '@testing-library/react';
import * as React from 'react';
import Login from './Login';


let user = {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3Vlc3QiLCJ1c2VybmFtZSI6Ikd1ZXN0QWRtaW5AU1JNdXNpYy5jb20iLCJwYXNzd29yZCI6ImFkbWluMSIsImlhdCI6MTcyNTUzMDkxMSwiZXhwIjoxNzI1NTM0NTExfQ.dahD4ehVy35hz4Tv89jaqN9JpNy-3_-AOhxGEiRMohs",
    loggedIn:"tester"
}

afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
    localStorage.clear();
});


describe('Login Page Tests', () => { 

    test('Page matches snapshot', () => {
        let page = render(<Login/>);
        expect(page).toMatchSnapshot();
    });

    test('When no token exists page displays only login button', async () => {
        let page = render(<Login/>);
        let loginButton = await page.findByText("Login");
        let welcomeElement = page.queryByText(`Welcome ${user.loggedIn}`)
        expect(loginButton).toBeInTheDocument();
        expect(welcomeElement).toEqual(null);

    });

    test('When token exists, page displays welcome', async () => {
        const key = "user"
        let value = JSON.stringify(user);
        localStorage.setItem(key,value);
        expect(localStorage.setItem).toHaveBeenLastCalledWith(key,value);
        expect(localStorage.__STORE__[key]).toBe(value);
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);

        let page = render(<Login/>);
        
        let welcomeElement = await page.findByText(`Welcome ${user.loggedIn}`); 
        let loginButton = page.queryByText("Login");

        expect(welcomeElement).toBeInTheDocument();
        expect(loginButton).toEqual(null);

    });

    test('Form open on login button click && closes on form close button click', async () => {
        
        let page = render(<Login/>);
        let loginButton = await page.findByText("Login");
        expect(loginButton).toBeInTheDocument();

        await waitFor(()=>{
            fireEvent.click(loginButton);
        }); 
        let form = await page.findByText("Username:");
        expect(form).toBeInTheDocument();
        let closeButton = await page.findByText("Close");
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        expect(form).not.toBeInTheDocument();
        
    })
})