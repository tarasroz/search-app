import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App, { pictures } from './App'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App:', () => {

  it('renders children when passed in', () => {
    let wrapper = shallow(
      <section className="ui-items" />
    );
    expect(wrapper.contains(<section className="ui-items" />)).toEqual(true);
  });

  it('should set a list', () => {
    const state = { disableForm: false, query: "", pictures: [] };
    const newState = (state, {
      disableForm: false,
      query: "qwerty",
      pictures,
    });
    expect(newState).toEqual({ disableForm: false, query: "qwerty", pictures });
  });

  test('snapshot renders', () => {
    const component = renderer.create(
      <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('fetches async data', () => {
    const fetchJsonp = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          photos: {
            photo: [
              { title: 'a' },
              { title: 'b' },
            ],
          },
        })
      }, 1000)
    }
    );
    // let wrapper = mount(<App />);
    let wrapper = render(<App />);
    expect(wrapper.find('p')).toHaveLength(0);
    fetchJsonp.then(() => {
      expect(wrapper.find('p').length).toEqual(2);
    });
  });
})

