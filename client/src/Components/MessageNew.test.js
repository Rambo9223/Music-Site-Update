/**
*@jest-environment jsdom
*/
import { render,cleanup} from '@testing-library/react';
import * as React from 'react';
import MessageNew from './MessageNew';

afterEach(()=>{
    cleanup();
});

describe('Message New Test', () => {

    test('Page matches snapshot and element exists', async () => {
        let page = render(<MessageNew/>)
        expect(page).toMatchSnapshot();
        let link = await page.findByText("Compose",{exact:false});
        expect(link).toBeInTheDocument();
    })
})