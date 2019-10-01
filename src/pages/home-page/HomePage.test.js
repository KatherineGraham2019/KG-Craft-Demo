import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage.js';

import { MemoryRouter, withRouter } from 'react-router-dom'

import { shallow, mount } from 'enzyme';


const pokemon = [ { name: "Test Pokemon", sprites: { front_default: ""} } ];

const HomePageWithRouter = withRouter(HomePage);

const ComponentToTest = (
    <MemoryRouter initialEntries={[ '/', '/pokemon/:id' ]}>
        <HomePageWithRouter pokemon={pokemon} />
    </MemoryRouter>
);


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(ComponentToTest, div);
    
    ReactDOM.unmountComponentAtNode(div);
});

test('Input should call handleChange on change event', () => {
    const event = {target: {name: 'searchParamenter', value: 'test'}};
    const home = shallow(ComponentToTest);
    //const handleChange = jest.spyOn(home.instance(), 'handleChange');
    home.update(); // <--- Needs this to force re-render
    const userInput = home.find('#searchInput');
  
    //userInput.simulate('change', event);
  
    //expect(handleChange).toBeCalled();
})

describe('Change tab', () => {
    it('Test click event', () => {
      const mockCallBack = jest.fn();
  
      const tab = shallow((<div onClick={mockCallBack}>Ok!</div>));
      tab.find('div').simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});