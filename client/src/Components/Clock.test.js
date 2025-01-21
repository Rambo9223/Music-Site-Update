/**
*@jest-environment jsdom 
*/
import { render,cleanup, waitFor} from '@testing-library/react';
import * as React from 'react';
import Clock from './Clock';
import LogoutAdmin from './Backend-Async/LogoutAdmin';// test with case 1

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3Vlc3QiLCJ1c2VybmFtZSI6Ikd1ZXN0QWRtaW5AU1JNdXNpYy5jb20iLCJwYXNzd29yZCI6ImFkbWluMSIsImlhdCI6MTcyNTUzMDkxMSwiZXhwIjoxNzI1NTM0NTExfQ.dahD4ehVy35hz4Tv89jaqN9JpNy-3_-AOhxGEiRMohs"


afterEach(()=>{
  cleanup();
  localStorage.clear();
  // and reset all mocks
  jest.clearAllMocks();  
});


describe('Clock Page Tests', () => {

    test('Page matches snapshot', () => { 

        let page = render(<Clock token={token}/>);
        expect(page).toMatchSnapshot();
        
    })

    test('Check value writes to local storage', () => {
        const key = "timer";
        const value = JSON.stringify({
            "minutes":2,
            "seconds":30,
            "switchSeconds":150
        })
        localStorage.setItem(key,value);
        //let page = render(<Clock token={token}/>);
        expect(localStorage.setItem).toHaveBeenLastCalledWith(key,value);
        expect(localStorage.__STORE__[key]).toBe(value);
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });

    // test for clock shows 
    test('Timer is visible & setInterval is called',async () =>{
        jest.spyOn(global, 'setInterval');
        const key = "timer";
        const value = JSON.stringify({
            "minutes":10,
            "seconds":0,
            "switchSeconds":600
        })
        localStorage.setItem(key,value);
        await waitFor(()=>{expect(localStorage.__STORE__[key]).toBe(value);
        })
        let page = render(<Clock token={token}/>)
        expect(setInterval).toHaveBeenCalledTimes(2);
        let clock = await page.findByText("10:00");
        expect(clock).toBeInTheDocument();
    })

    // make a test if local storage doesnt exist timer renders to default 30:00
    // case 1 expect Logout Admin to have been called ? 
    // mock response Logout, see if local storage is cleared

    test('Clock initalises to 30:00 when no local storage variable exists', async () => {
        let page = render(<Clock token={token}/>)
        let clock = await page.findByText("30:00");
        expect(clock).toBeInTheDocument();
    })


    test('Mock AutoLogout on case 1', async() => { 
        let res = { status: 200, ok: true, message: 'You have been logged out!' }
        global.fetch = jest.fn().mockImplementationOnce(
            () => new Promise((resolve) => {
                resolve({
                    // first, mock the "json" function containing our result
                    json: () => new Promise((resolve) => {
                      // then, resolve this second promise with our object
                      resolve(res)
                    }),})
    }))
        
        const result = await LogoutAdmin(token);
        expect(result).toEqual(res)
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})

// Add to test File --watchAll --coverage --transformIgnorePatterns \"node_modules/(?!axios)/\"

// snapshot test
// mock token
// mock case 0 or other 
// check autologout component pops up
