import React from 'react';
import { shallow } from 'enzyme';
import { expectComponentToHaveDisplayName } from '@lodgify/enzyme-jest-expect-helpers';

import { pictures } from './mock-data/pictures';
import { Component as Pictures } from './component';

const getPictures = () => shallow(<Pictures pictures={pictures} />);

describe('<Pictures />', () => {
  it('should render the correct structure', () => {
    const actual = getPictures();

    expect(actual).toMatchSnapshot();
  });

  it('should have `displayName` `Pictures`', () => {
    expectComponentToHaveDisplayName(Pictures, 'Pictures');
  });
});
