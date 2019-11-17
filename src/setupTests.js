import raf from './tempPolyfills.js'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

Enzyme.configure({
  adapter: new Adapter()
});

global.shallow = shallow;
global.render = render;
global.mount = mount;

console.error = message => {
  throw new Error(message);
};