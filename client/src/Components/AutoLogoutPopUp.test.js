/**
*@jest-environment jsdom 
*/
import { render,cleanup, waitFor, fireEvent} from '@testing-library/react';
import * as React from 'react';
import AutoLogoutPopUp from './AutoLogoutPopUp';



afterEach(()=>{
  cleanup();
});

describe('Auto-Logout Popup Tests', () => { 
    let popup = {
        message:"You will be automatically logged out in 5 minutes.",
        type:"Warning"
    }
    let bool = true;
    function ToggleBool(){
        bool = !bool
    }

    function Page (){
        return <AutoLogoutPopUp message={popup.message} type={popup.type} bool={bool} ToggleBool={ToggleBool}/>
    }
    

test('Page matches snapshot', () => { 
    let page = render(<Page/>);
    expect(page).toMatchSnapshot();
 })

 test('Modal opens when bool is true', async() => {
    let page = render(<Page/>)
    let closeButton = await page.findByText("Close");
    
    await waitFor(()=>{expect(closeButton).toBeInTheDocument();
    });
  });

  test('Message and Type props passed to page elements', async () => { 

    let page = render(<Page/>);

    let headerElement = await page.findByText(`Session ${popup.type}`);
    let messageElement = await
    page.findByText(popup.message);

    await waitFor(()=>{
        expect(headerElement).toBeInTheDocument();
        expect(messageElement).toBeInTheDocument();
    })

   });

   test('Close Button fires, changes bool & closes modal', async() => {

    let page = render(<Page/>);

    let closeButton = await page.findByText("Close");

    fireEvent.click(closeButton);

    page.rerender(<AutoLogoutPopUp message={popup.message} type={popup.type} bool={bool} ToggleBool={ToggleBool}/>);
     
    expect(bool).toBe(false);
    expect(closeButton).not.toBeInTheDocument();

   })
});