import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Icon } from 'semantic-ui-react';

import { InputController } from '../InputController';

import { pickDatesFromState } from './pickDatesFromState';

/**
 * A date range picker lets a user pick a date range.
 * @extends {React.PureComponent}
 */
export class Component extends PureComponent {
  state = {
    endDate: null,
    focusedInput: null,
    startDate: null,
  };

  /**
   * Call `props.onChange` with the new dates from state.
   */
  componentDidUpdate = (prevProps, prevState) => {
    const prevDates = pickDatesFromState(prevState);
    const dates = pickDatesFromState(this.state);
    const { name, onChange } = this.props;
    !isEqual(prevDates, dates) && onChange(name, dates);
  };

  /**
   * Persist the date values in component state.
   */
  handleInputControllerChange = (name, value) => {
    this.setState(value);
  };

  render() {
    const {
      endDatePlaceholderText,
      error,
      getIsDayBlocked,
      isValid,
      name,
      startDatePlaceholderText,
    } = this.props;
    const { endDate, focusedInput, startDate } = this.state;
    return (
      <InputController
        error={error}
        inputOnChangeFunctionName="onDatesChange"
        isFocused={!!focusedInput}
        isValid={isValid}
        name={name}
        onChange={this.handleInputControllerChange}
      >
        <DateRangePicker
          // Consumer defined props.
          endDatePlaceholderText={endDatePlaceholderText}
          isDayBlocked={getIsDayBlocked}
          startDatePlaceholderText={startDatePlaceholderText}
          // Controlled props
          endDate={endDate}
          focusedInput={focusedInput}
          // NOTE onDatesChange is required by DateRangePicker but is set in `InputController`
          onDatesChange={Function.prototype}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          startDate={startDate}
          // Static required props.
          endDateId="end_date_id"
          startDateId="start_date_id"
          // Static custom appearance props.
          customArrowIcon={<Icon name="arrow right" />}
          customInputIcon={<Icon name="calendar outline" size="large" />}
          daySize={52}
          hideKeyboardShortcutsPanel
          navNext={<Icon name="arrow right" />}
          navPrev={<Icon name="arrow left" />}
        />
      </InputController>
    );
  }
}

Component.displayName = 'DateRangePicker';

Component.defaultProps = {
  endDatePlaceholderText: '',
  error: false,
  getIsDayBlocked: Function.prototype,
  isValid: false,
  name: '',
  onChange: Function.prototype,
  startDatePlaceholderText: '',
};

Component.propTypes = {
  /** The visible placeholder text for the end date input. */
  endDatePlaceholderText: PropTypes.string,
  /** Is the date range picker in an error state. A string is displayed as an error message. */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * A function called for each day to be displayed. Returning true blocks that day in the date range picker.
   * @param   {Moment}  day - The day to test.
   * @returns {Boolean}     - Is the day blocked.
   */
  getIsDayBlocked: PropTypes.func,
  /** Is the date range picker in a valid state. */
  isValid: PropTypes.bool,
  /** The name for the date range picker. */
  name: PropTypes.string,
  /**
   * A function called when the date range picker value changes. Dates are wrapped as [Moment objects](https://momentjs.com/docs/#/parsing/).
   * @param {String} name   - `this.props.name`
   * @param {Object} value
   * @param {Moment} value.endDate
   * @param {Moment} value.startDate
   */
  onChange: PropTypes.func,
  /** The visible placeholder text for the start date input. */
  startDatePlaceholderText: PropTypes.string,
};
