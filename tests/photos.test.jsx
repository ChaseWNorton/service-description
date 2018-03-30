import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Photos from '../pages/components/Photos';

Enzyme.configure({ adapter: new Adapter() });

var url1 = 'https://images.pexels.com/photos/245239/pexels-photo-245239.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
var url2 = 'https://images.pexels.com/photos/789818/pexels-photo-789818.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
var photos = [url1, url2];

it('renders correctly', () => {
  const compPhoto = renderer
    .create(<Photos photos={photos} />)
    .toJSON();
  expect(compPhoto).toMatchSnapshot();
});

it('adds the carousel to the page', () => {
  const wrapper = shallow(<Photos photos={photos} />);
  const div = wrapper.find('.photos-container');
  expect(div).toHaveLength(1);
})

it('adds the correct number of photos to the carousel', () => {
  let wrapper = shallow(<Photos photos={photos} />);
  let div = wrapper.find('.photosCarousel');
  expect(div).toHaveLength(2);

  photos.push(url1);

  wrapper = shallow(<Photos photos={photos} />);
  div = wrapper.find('.photosCarousel');
  expect(div).toHaveLength(3);
})