/**
*@jest-environment jsdom
*/
import MultiLine from './MultiLine';

let message = 'South Park is an American animated sitcom created by Trey Parker and Matt Stone and developed by Brian Graden for Comedy Central.\nThe series revolves around four boys—Stan Marsh, Kyle Broflovski, Eric Cartman, and Kenny McCormick—and their exploits in and around the titular Colorado town.';
let returnedItem = ["South Park is an American animated sitcom created by Trey Parker and Matt Stone and developed by Brian Graden for Comedy Central.","The series revolves around four boys—Stan Marsh, Kyle Broflovski, Eric Cartman, and Kenny McCormick—and their exploits in and around the titular Colorado town."];

describe('Multiline Test', () => {

    test('No message attached, expect empty array', () => {

        let result =  MultiLine("");
        expect(result).toEqual([]);
    });

    test('Message attached should be a array with two items', () => {

        let result = MultiLine(message);
        expect(result[0]).toEqual(returnedItem[0]);
        expect(result[1]).toEqual(returnedItem[1]);
    })
})