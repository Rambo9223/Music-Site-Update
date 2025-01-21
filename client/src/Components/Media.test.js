/**
*@jest-environment jsdom
*/
import { render,cleanup} from '@testing-library/react';
import * as React from 'react';
import Media from './Media';


afterEach(()=>{
    cleanup();
    jest.clearAllMocks();
});

describe('Media Page Tests', () => {

    test('Page matches snapshot', () => {
        let page = render(<Media/>);
        expect(page).toMatchSnapshot();
    });

    test('SetInterval called on render & Title elements appear', async () => {
        jest.spyOn(global,"setInterval");
        let page = render(<Media/>);
        expect(setInterval).toHaveBeenCalledTimes(1);
        let titleImage = await page.findByText("Image Gallery");
        let titleVideo = await page.findByText("Video Gallery");
        expect(titleImage).toBeInTheDocument();
        expect(titleVideo).toBeInTheDocument();

    })
})

