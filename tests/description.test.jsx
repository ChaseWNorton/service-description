import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Description from '../pages/components/Description';

Enzyme.configure({ adapter: new Adapter() });

var testDescription = "<p>This is the test paragraph</p>"

it('renders correctly', () => {
  const compDesc = renderer
    .create(<Description details={testDescription} />)
    .toJSON();
  expect(compDesc).toMatchSnapshot();
});

it('should add details to the page', () => {
  const wrapper = shallow(<Description details={testDescription}/>)
  const div = wrapper.find('.runningText');
  expect(div).toHaveLength(1);
  expect(div.text()).toBe("This is the test paragraph");
})