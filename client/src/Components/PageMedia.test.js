/**
*@jest-environment jsdom
*/
import { render,cleanup, fireEvent, waitFor, act} from '@testing-library/react';
import * as React from 'react';
import fetchMock from 'jest-fetch-mock';
import PageMedia from './PageMedia';
import AddMediaAdmin from './Backend-Async/AddMediaAdmin';

afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
});

let mockMedia = {"media":"image","path":"images/squared/Tooth&Claw_2019.jpg","title":"Tooth & Claw - 2019","id":7992}

describe('PageMedia Tests', () => {

    test('Page matches snapshot', () => {
        let page = render(<PageMedia/>);
        expect(page).toMatchSnapshot();
    });

    test('Page elements are visable', async () => {
        let page = render(<PageMedia/>);
        let addMediaButton = await page.findByText("Add Media",{exact:false});
        let pageHeader = await page.findByText("Show Media:");
        let searchButton = await page.findByText("Search",{exact:false});

        expect(addMediaButton).toBeInTheDocument();
        expect(pageHeader).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();

    });


    test('Add Media button opens modal, close button closes modal', async () => {
        let page = render(<PageMedia/>);
        let addMediaButton = await page.findByText("Add Media",{exact:false});
        expect(addMediaButton).toBeInTheDocument();
        
        await waitFor(()=>{fireEvent.click(addMediaButton);}); // open form
        let form = await page.findByTestId("modal-form");  
        let closeButton = await page.findByText("Close",{exact:false});
        expect(form).toBeInTheDocument();// confirm form 
        expect(closeButton).toBeInTheDocument();// confirm button 
        
        await waitFor(()=>{// close modal
            fireEvent.click(closeButton);
        });
        expect(form).not.toBeInTheDocument();// confirm no form
    });
        
        test('Submit form without values, expect errors and submit rejection', async () => {

            let page = render(<PageMedia/>);
            let addMediaButton = await page.findByText("Add Media",{exact:false});
            expect(addMediaButton).toBeInTheDocument();

            await waitFor(()=>{
                fireEvent.click(addMediaButton);
            }) ;
            
            let buttons = await page.findAllByRole("button");
            let submit = buttons[4];
            
            expect(submit).toBeInTheDocument();// confirm submit button 
        
            global.fetch = fetchMock.mockResponseOnce(JSON.stringify({json:mockMedia}));

            await act(()=>{return fireEvent.click(submit)});
            
            let titleError = await page.findByText("Title is required.")
            let pathError = await page.findByText("Path is required.");
    
            expect(fetch).toHaveBeenCalledTimes(0);// form is rejected by error boundries so fetch isn't called
            expect(titleError).toBeInTheDocument();// no input so error displays on form
            expect(pathError).toBeInTheDocument();

        });

        test('Submit form with values, expect submit success and mock response', async () => {

            let page = render(<PageMedia/>);
            let addMediaButton = await page.findByText("Add Media",{exact:false});
            expect(addMediaButton).toBeInTheDocument();

            await waitFor(()=>{
                fireEvent.click(addMediaButton);
            }) ;
            
            let buttons = await page.findAllByRole("button");
            let submit = buttons[4];
            expect(submit).toBeInTheDocument();// confirm submit button
        
            let select = await page.findByText("Image");// select element
            let inputs = await page.findAllByText("");
            let formInputs = inputs.filter((input)=>input.className==="form-inputs");// title & path element
            
            // pass values to input/select elements and expect values to match
            await act(async()=>{return fireEvent.input(formInputs[0],{target:{value:mockMedia.title}})});
            expect(formInputs[0].value).toBe(mockMedia.title);
    
            await act(async()=>{return fireEvent.input(formInputs[1],{target:{value:mockMedia.path}})});
            expect(formInputs[1].value).toBe(mockMedia.path);
    
            await act(async()=>{return fireEvent.select(select,{target:{value:mockMedia.media}})});
            expect(select.value).toBe(mockMedia.media);

            // arm mock response
            global.fetch = fetchMock.mockResponseOnce(JSON.stringify({json:mockMedia}));
            
            // submit form with values
            await act(()=>{return fireEvent.click(submit)});

            expect(fetch).toHaveBeenCalledTimes(1);//with values form is accepted and fetch is called 

            // mock server call with new item
            let result = await AddMediaAdmin(mockMedia,"token");
            expect(result.json).toEqual(mockMedia);

        })




    



}); 