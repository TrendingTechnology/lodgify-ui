import React from 'react';
import { shallow, mount } from 'enzyme';
import { Form } from 'semantic-ui-react';

import { Button } from 'elements/Button';
import { SearchBar } from 'widgets/SearchBar';

import { Component as PropertyFooter } from './component';
import { guestsOptions, locationOptions } from './mock-data/options';

const getPropertyFooter = props =>
  shallow(
    <PropertyFooter
      guestsOptions={guestsOptions}
      locationOptions={locationOptions}
      {...props}
    />
  );
const getSearchBar = props => getPropertyFooter(props).find(SearchBar);

describe('<PropertyFooter />', () => {
  it('should render a single Lodgify UI `SearchBar` component', () => {
    const actual = getSearchBar();
    expect(actual).toHaveLength(1);
  });

  describe('the `SearchBar` component', () => {
    it('should have the right props', () => {
      const wrapper = getSearchBar();
      const actual = wrapper.props();
      expect(actual).toEqual(
        expect.objectContaining({
          guestsOptions,
          locationOptions,
          searchButton: <Button isRounded>Check Availability</Button>,
          isShowingLocationDropdown: false,
          isShowingPropertySummary: true,
          isSticky: true,
        })
      );
    });
  });

  describe('Interaction: onSubmit the form', () => {
    it('should call `props.onSubmit`', () => {
      const onSubmit = jest.fn();
      const searchBar = mount(
        <SearchBar
          guestsOptions={guestsOptions}
          locationOptions={locationOptions}
          onSubmit={onSubmit}
        />
      );

      const form = searchBar.find(Form);
      form.simulate('submit');
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});