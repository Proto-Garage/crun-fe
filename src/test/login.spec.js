import React from 'react';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import { connect } from 'react-redux'

import { LoginForm } from '../../js/react/components/login/LoginForm';

describe( '<LoginForm />', () => {
  it('Button disable when input is empty', () => {
    const app = shallow(<LoginForm />);
    expect(app.find('button').hasClass('disabled')).to.equal(true);

  });
});
