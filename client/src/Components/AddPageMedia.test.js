/**
*@jest-environment jsdom 
*/
import { render,cleanup, waitFor} from '@testing-library/react';
import AddPageMedia from './AddPageMedia';
import * as React from 'react';


/* possibly add a mock submit of the form test and expect a certain result */


afterEach(()=>{
  cleanup();
});


describe('Admin Page Media Tests', () => { 


  let bool = true;// variable to open/close modal
    function changeBool(){// simulates usestate ToggleBool
      bool = !bool;
    }
  
  // snapshot test
  test('Page matches snapshot', () => {
    let page = render(<AddPageMedia/>);
    expect(page).toMatchSnapshot();
  });

  // form exists when modal is visible
  test('Form opens in modal when bool is true', async () => {
    // render page with props
    let page = render(<AddPageMedia token={"string"} bool={bool} ToggleBool={changeBool}/>)

    // on bool = true form should be visible
    let form = (await page.findByTestId("modal-form"));

    // expect form to be in document
    await waitFor(()=>{expect(form).toBeInTheDocument();}).finally(()=>{
      changeBool();// simulates a change in usestate ToogleBool for closing the form for next test
    });
  })

  // check form closes when modal is closed
  test('Form & Modal closes when bool is false', async () => { 

    // page is rendered with bool = false
    let page = render(<AddPageMedia token={"string"} bool={bool} ToggleBool={changeBool}/>)

    // label is a html element that is within the form
    let label = page.queryByText("Media Type:");// use query as we expect returned answer to be null 

    // final assertion
    expect(label).not.toBeInTheDocument()

   })

 })


 /*const useState = () => React.useState;
    jest.mock("react",()=>({
      ...jest.requireActual("react"),
      useState: jest.fn(),
    }));
    const mockResBool = jest.fn();
      useState.mockImplementationOnce(init=>[init,mockResBool]);
  
    mockResBool(true);
  */