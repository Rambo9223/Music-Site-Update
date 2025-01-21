/**
*@jest-environment jsdom
*/
import { render,cleanup, act} from '@testing-library/react';
import * as React from 'react';
import fetchMock from 'jest-fetch-mock';
import UnSubscribe from './Unsubscribe';

afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
});

let user = {
    "_id": "656a0233842606fbeb2f31ae",
    "name": "Colby Cov",
    "email": "Chaos@hotmail.com",
    "age": 35,
    "city": "Aberdeen",
    "country": "United Kingdom",
    "preferences": {
      "shows": true,
      "releases": false
    }}

// render page, supply a link and check to see fetch is called, see if elements show

describe('Unsubscribe Page Tests', () => {

    test('Page matches snapshot', async() => {
        let page = await act(()=>{return render(<UnSubscribe/>)});
        expect(page).toMatchSnapshot();
    });

    test('Page attempts retrieve user details', async () => {
        
        global.fetch = fetchMock.mockResponse(JSON.stringify({json:user}));
        await act(async()=>{return render(<UnSubscribe/>)}); 
        expect(fetch).toHaveBeenCalledTimes(1);
        
    });

    /*test('Form Elements visible', async () => {
        let page = await act(()=>{return render(<UnSubscribe/>)});
        let nameLabel = await page.findByText("Name: ",{exact:false});
        let emailLabel = await page.findByText("Email: ",{exact:false});
        let submitButton = await page.findByRole("button");

        expect(nameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

    });
    //test('Submit calls fetch', async () => { second })*/
})