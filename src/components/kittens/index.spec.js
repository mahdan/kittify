import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Kittens from './index';

let renderDom;

describe('components/kittens', () => {

  renderDom = shallow(<Kittens />);

  it('should have a h1 title of Tailify test', () => {
    let element = renderDom.find('h1');
    console.log(renderDom.debug());
    expect(renderDom.text()).to.equal('Tailify Test');
  });
});
