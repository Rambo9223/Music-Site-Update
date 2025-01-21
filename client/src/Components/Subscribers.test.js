/**
*@jest-environment jsdom
*/
import { render,cleanup, fireEvent, act} from '@testing-library/react';
import * as React from 'react';
import Subscribers from "./Subscribers"
import fetchMock from 'jest-fetch-mock';
import FindSubscriberAdmin from './Backend-Async/FindSubscriberAdmin';

let user = {
    "_id":"65bcc719b632778c87be2be2",
    "name": "Alex Volk",
    "email": "Avolk@ufcmail.com",
    "age": 35,
    "city": "Sydney",
    "preferences": {
      "shows": false,
      "releases": true
    }
  };

afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
});

// check to see input types change on different option selected, 

describe('Subscribers Page Tests', () => {

    test('Page matches snapshot', () => {
        let page = render(<Subscribers/>);
        expect(page).toMatchSnapshot();
    });


    test('Changing filter displays different input elements', async () => {
        let page = render(<Subscribers/>);
        let textInput = page.queryByText("Search name:");
        let select = (await page.findByText("Filter by:"));
        expect(select).toBeInTheDocument();
        expect(textInput).toEqual(null);

        await act(async()=>{return fireEvent.change(select.parentElement,{target:{value:"name"}})});
        let textIn = await page.findByText("Search name:",{exact:false});
        expect(textIn).toBeInTheDocument();

        await act(async()=>{return fireEvent.change(select.parentElement,{target:{value:"country"}})});
        let countrySelect = await page.findByText("Country:");
        expect(countrySelect).toBeInTheDocument();
        expect(textIn).not.toBeInTheDocument();

        await act(async()=>{return fireEvent.change(select.parentElement,{target:{value:"preferences"}})});
        let checkboxShows = await page.findByText("Shows");
        let checkboxReleases = await page.findByText("Releases");
        expect(checkboxShows).toBeInTheDocument();
        expect(checkboxReleases).toBeInTheDocument();
        expect(countrySelect).not.toBeInTheDocument();
        expect(textIn).not.toBeInTheDocument();

    });

    test('Input text and search to call fetch, mock server response', async () => {
        
        let page = render(<Subscribers/>);
        let select = (await page.findByText("Filter by:"));
        let button = await page.findByRole("button");
        expect(select).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await act(async()=>{return fireEvent.change(select.parentElement,{target:{value:"name"}})});
        let textIn = await page.findByText("Search name:",{exact:false});
        expect(textIn).toBeInTheDocument();
        //console.log(textIn.children[0]);


        await act(async()=>{return fireEvent.change(textIn.children[0],{target:{value:"Alex"}})});

        global.fetch = fetchMock.mockResponse(JSON.stringify({json:user}));

        await act(async()=>{return fireEvent.click(button)});
        expect(fetch).toHaveBeenCalledTimes(1);

        let result = await FindSubscriberAdmin({},"token");
        expect(result.json).toEqual(user)


    });

})