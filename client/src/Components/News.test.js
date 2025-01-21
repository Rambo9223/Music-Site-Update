/**
*@jest-environment jsdom
*/
import { render,cleanup} from '@testing-library/react';
import * as React from 'react';
import News from './News';


afterEach(()=>{
    cleanup();
});

describe('News Page Tests', () => {
     
    test('Page matches snapshot', () => {
        let page = render(<News/>);
        expect(page).toMatchSnapshot();
    });

    // Same problem with useMediaQuery
    /*
    test('Find page elements and form element', async () => {
        let page = render(<News/>);
        //let form = await page.findByRole("form");
        //expect(form).toBeInTheDocument();
        let heading = await page.findByText("Coming Soon!");
        expect(heading).toBeInTheDocument();
    });*/
})