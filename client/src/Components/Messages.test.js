/**
*@jest-environment jsdom
*/
import { render,cleanup, fireEvent} from '@testing-library/react';
import * as React from 'react';
import fetchMock from 'jest-fetch-mock';
import Messages from './Messages';
import { act } from 'react-dom/test-utils';
import FindMessagesAdmin from './Backend-Async/FindMessagesAdmin';

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3Vlc3QiLCJ1c2VybmFtZSI6Ikd1ZXN0QWRtaW5AU1JNdXNpYy5jb20iLCJwYXNzd29yZCI6ImFkbWluMSIsImlhdCI6MTcyNTUzMDkxMSwiZXhwIjoxNzI1NTM0NTExfQ.dahD4ehVy35hz4Tv89jaqN9JpNy-3_-AOhxGEiRMohs"

let message = {
    "_id":"66448aed27b295e6c38e6790",
    "name": "Eric Cartman ",
    "email": "ECart@yahoo.com",
    "subject": "South Park Info",
    "enquiry": "South Park is an American animated sitcom created by Trey Parker and Matt Stone and developed by Brian Graden for Comedy Central. The series revolves around four boys—Stan Marsh, Kyle Broflovski, Eric Cartman, and Kenny McCormick—and their exploits in and around the titular Colorado town. ",
    "date":"2024-05-15T10:12:45.364Z",
    "read": true,
    "trash": false,
    "answered": false
  }

  afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
});

beforeEach(()=>{
    global.fetch = fetchMock.mockResponseOnce(JSON.stringify({json:message}));
})

/* I think this page will be riddled with problems because of how its written, 
minimal tests, render, mock server call like before, see what comes up */

describe('Messages Page Tests', () => {


    test('Page matches snapshot',async() => {
        
        let page = await act(()=>{return render(<Messages token={token}/>);})
        expect(page).toMatchSnapshot();
        expect(fetch).toHaveBeenCalledTimes(1);
        
    });

    test('Server warning on failed fetch, popup closes & title element visable', async () => {
        
        let page = await act(()=>{return render(<Messages token={token}/>);})
        expect(fetch).toHaveBeenCalledTimes(1);

        let serverWarning = await page.findByText("New Server Response",{exact:false});
        let closeWarning = await page.findByText("Close");

        expect(serverWarning).toBeInTheDocument();
        expect(closeWarning).toBeInTheDocument();

        fireEvent.click(closeWarning);

        expect(closeWarning).not.toBeInTheDocument();

        let titleElement = await page.findByText("Messages",{exact:false});
        expect(titleElement).toBeInTheDocument();

    });

    test('Mock succesful call to server', async () => {

        global.fetch = fetchMock.mockResponseOnce(JSON.stringify({json:message}));
        let result = await FindMessagesAdmin("{}",token);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result.json).toEqual(message)

    });


})