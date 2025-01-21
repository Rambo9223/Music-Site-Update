/**
*@jest-environment jsdom 
*/
import { render,cleanup, waitFor} from '@testing-library/react';
import EditPageMedia from './EditPageMedia';
import EditMediaAdmin from './Backend-Async/EditMediaAdmin';
import * as React from 'react';


afterEach(()=>{
  cleanup();
  jest.clearAllMocks();
});


describe('Edit Page Media Tests', () => { 


  let bool = true;// variable to open/close modal
    function changeBool(){// simulates usestate ToggleBool
      bool = !bool;
    }
    let item = {
        "title":"test title",
        "path":"test path",
        "link":"test link"
    }
  
  // snapshot test
  test('Page matches snapshot', () => {
    let page = render(<EditPageMedia item={item} token={"string"} bool={true} ToggleBool={changeBool}/>);
    expect(page).toMatchSnapshot();
  });

  // form exists when modal is visible
  test('Form opens in modal when bool is true', async () => {
    // render page with props
    let page = render(<EditPageMedia  item={item} token={"string"} bool={bool} ToggleBool={changeBool}/>)

    // on bool = true form should be visible
    let form = (await page.findByText("Edit Media"));

    // expect form to be in document
    await waitFor(()=>{expect(form).toBeInTheDocument();}).finally(()=>{
      changeBool();// simulates a change in usestate ToogleBool for closing the form for next test
    });
  })

  // check form closes when modal is closed
  test('Form & Modal closes when bool is false', async () => { 

    // page is rendered with bool = false
    let page = render(<EditPageMedia item={item} token={"string"} bool={bool} ToggleBool={changeBool}/>)

    // label is a html element that is within the form
    let label = page.queryByText("Media Type:");// use query as we expect returned answer to be null 

    // final assertion
    expect(label).not.toBeInTheDocument()

   });

   test('Submit mock item on form submit', async() => {
    let res = {
        status:200,
        ok:true,
        message:`Media item: ${"test title"} has been successfully edited.`
    }
    global.fetch = jest.fn().mockImplementationOnce(
        () => new Promise((resolve) => {
            resolve({
                // first, mock the "json" function containing our result
                json: () => new Promise((resolve) => {
                  // then, resolve this second promise with our object
                  resolve(res)
                }),})
})); 

    let page = render(<EditPageMedia item={item} token={"string"} bool={true} ToggleBool={changeBool}/>);

    let button = await page.findByText("Edit");

    expect(button).toBeInTheDocument();
    // button exists so imagine we mock a submit of the form

    // we would then call fetch on the async function
    let result = await EditMediaAdmin(item,"token");
    // expect fetch to be called once
    expect(fetch).toHaveBeenCalledTimes(1);
    // result is equal to expected
    expect(res).toEqual(result);

   })


 })