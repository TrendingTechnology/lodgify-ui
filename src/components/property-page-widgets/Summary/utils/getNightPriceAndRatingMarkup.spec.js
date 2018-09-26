import React from 'react';
import { shallow } from 'enzyme';
import { Segment, Rating } from 'semantic-ui-react';
import {
  expectComponentToHaveChildren,
  expectComponentToHaveProps,
} from '@lodgify/enzyme-jest-expect-helpers';

import { Heading } from 'typography/Heading';

import { getNightPriceAndRatingMarkup } from './getNightPriceAndRatingMarkup';

const ratingNumber = 90;
const nightPrice = '280$';

const getMarkupAsRenderedComponent = () =>
  shallow(<div>{getNightPriceAndRatingMarkup(ratingNumber, nightPrice)}</div>);

describe('getNightPriceAndRatingMarkup', () => {
  it('should return the right children', () => {
    const wrapper = getMarkupAsRenderedComponent();

    expectComponentToHaveChildren(wrapper, Segment, Segment);
  });

  describe('the first `Segment` component', () => {
    it('should have the right children', () => {
      const wrapper = getMarkupAsRenderedComponent()
        .find(Segment)
        .at(0);

      expectComponentToHaveChildren(wrapper, 'span');
    });
  });

  describe('the `span`', () => {
    it('should have the right children', () => {
      const wrapper = getMarkupAsRenderedComponent().find('span');

      expectComponentToHaveChildren(wrapper, 'from ', Heading, '/night');
    });

    describe('the `Heading` component', () => {
      it('should have the right children', () => {
        const wrapper = getMarkupAsRenderedComponent().find(Heading);

        expectComponentToHaveChildren(wrapper, nightPrice);
      });
    });
  });

  describe('the second `Segment` component', () => {
    it('should have the right children', () => {
      const wrapper = getMarkupAsRenderedComponent()
        .find(Segment)
        .at(1);

      expectComponentToHaveChildren(wrapper, ratingNumber.toString(), Rating);
    });

    describe('the `Rating` component', () => {
      it('should have the right props', () => {
        const wrapper = getMarkupAsRenderedComponent().find(Rating);

        expectComponentToHaveProps(wrapper, {
          disabled: true,
          maxRating: 5,
          rating: ratingNumber,
          size: 'tiny',
        });
      });
    });
  });
});