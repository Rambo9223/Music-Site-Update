/**
*@jest-environment jsdom
*/
import { render,cleanup, fireEvent, act} from '@testing-library/react';
import * as React from 'react';
import Manage from './Manage';
import fetchMock from 'jest-fetch-mock';


afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
});

describe('Mangage Page Tests', () => {

    test('Page matches snapshot', () => {
        let page = render(<Manage/>);
        expect(page).toMatchSnapshot();
    });

    test('Page li elements show & onclick displays selected page', async () => {
        let page = render(<Manage/>);
        let subscribersLink = await page.findByText("Subscribers");
        let mediaLink = await page.findByText("Page Media");
        let messagesLink = await page.findByText("Messages");
        expect(subscribersLink).toBeInTheDocument();
        expect(mediaLink).toBeInTheDocument();
        expect(messagesLink).toBeInTheDocument();

        fireEvent.click(subscribersLink);// select subscribers page

        let pageButton = await page.findByText("Search",{exact:false});//button exists on this page
        expect(page.queryByText("Add Media",{exact:false})).toEqual(null);//Media button doesn't exist in subscribers 
        expect(pageButton).toBeInTheDocument();

        fireEvent.click(mediaLink);// select pagemedia page 

        let addMediaButton = await page.findByText("Add Media",{exact:false});
        expect(addMediaButton).toBeInTheDocument();

        // mock fetch so that the testing suite know to not try to make an actual server call
        global.fetch = fetchMock.mockResponseOnce(JSON.stringify({body:""}));
        
        act(()=>{
            fireEvent.click(messagesLink);
        })
        expect(fetch).toHaveBeenCalledTimes(1);
        
        // server fails to retrieve messages in test within the useEffect Hook and will display a popup with an error
        
        let serverWarning = await page.findByText("New Server Response",{exact:false});
        let closeWarning = await page.findByText("Close");

        expect(serverWarning).toBeInTheDocument();
        expect(closeWarning).toBeInTheDocument();
    
    })

})