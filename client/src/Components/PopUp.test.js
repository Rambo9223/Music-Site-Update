/**
*@jest-environment jsdom
*/
import { render,cleanup, fireEvent, waitFor} from '@testing-library/react';
import * as React from 'react';
import PopUp from './PopUp';


afterEach(()=>{
    cleanup();
});

    let popup = {
    message:"New Item added to server.",
    type:"Server Response",
    response:"text-primary"
    }

    

describe('Popup Tests', () => {
    
    let bool = true;
    function ToggleBool(){
    bool = !bool
    }

    function MockPopUp(){
        return <PopUp message={popup.message} type={popup.type} response={popup.response} 
        bool={bool} ToggleBool={ToggleBool} />
    }

    test('Page matches snapshot', () => {
        let page = render(<MockPopUp/>);
        expect(page).toMatchSnapshot();
    });

    test('Props are passed', async () => {
        let page = render(<MockPopUp/>);
        let heading = await page.findByText(`New ${popup.type}`);
        let message = await page.findByText(popup.message);
        expect(heading).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(heading.className).toEqual(popup.response);
    });

    test('Fire close button to close modal, check is closed and bool is false', async () => {
        let page = render(<MockPopUp/>);
        let heading = await page.findByText(`New ${popup.type}`);
        let closeButtons = await page.findAllByRole("button");
        expect(closeButtons.length).toEqual(2);
        expect(heading).toBeInTheDocument();

        await waitFor(()=>{
            fireEvent.click(closeButtons[0]);
        }) 
        page = page.rerender(<PopUp bool={bool}/>);
        expect(bool).toEqual(false);
        expect(heading).not.toBeInTheDocument();
        expect(closeButtons[1]).not.toBeInTheDocument();

    })
})