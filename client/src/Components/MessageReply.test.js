/**
*@jest-environment jsdom
*/
import { render,cleanup} from '@testing-library/react';
import * as React from 'react';
import MessageReply from './MessageReply';

afterEach(()=>{
    cleanup();
});

let message = {
    email:"testemail@mail.com",
    subject:"Can You Read This",
    enquiry:"This is a test email props for the message reply test."
}

describe('Message Reply Tests', () => {

    test('Page matches snapshot and element exists with props passed', async () => {
        let page = render(<MessageReply message={message}/>)
        expect(page).toMatchSnapshot();
        let link = await page.findByText("Reply",{exact:false});
        expect(link.outerHTML.includes(message.email)).toEqual(true);
        expect(link).toBeInTheDocument();
    })
})