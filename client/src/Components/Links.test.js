/**
*@jest-environment jsdom
*/
import { render,cleanup} from '@testing-library/react';
import * as React from 'react';
import Links from './Links';
import fetchMock from "jest-fetch-mock";
import GetMedia from './Backend-Async/GetMedia';

afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
})


describe('Links Page Tests', () => {
    // page renders correctly
    test('Page matches snapshot', () => {
        let page = render(<Links/>);
        expect(page).toMatchSnapshot();
    });

    // page renders h2 elemen
    test('Page displays correct elements', async () => {
        let page = render(<Links/>);
        let header = await page.findByText("Find me on:");
        expect(header).toBeInTheDocument();
    });

    test('Fetch & SetInterval are called', async () => {
        /* useEffect code is triggered and GetMedia is called */
        let mediaItem = {"media":"image","path":"images/squared/Tooth&Claw_2019.jpg","title":"Tooth & Claw - 2019","id":7992};//mock response item

        jest.spyOn(global,"setInterval");// spy on set interval
        // global fetch function is equal to mock response
        global.fetch = fetchMock.mockResponseOnce(JSON.stringify({json:mediaItem}));

        let page = render(<Links/>);

        let result = await GetMedia();
        expect(setInterval).toHaveBeenCalledTimes(1);// interval is called once 
        expect(fetch).toHaveBeenCalledTimes(1);// fetch is called once
        expect(result.json).toEqual(mediaItem)// result is equal to media item
    });
});