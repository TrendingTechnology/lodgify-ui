import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'semantic-ui-react';

/**
 * A rating input that allows the user to input a value based on stars.
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export const Component = ({ iconSize, maxRating }) => (
  <Fragment>
    <Rating maxRating={maxRating} size={iconSize} />
  </Fragment>
);

Component.displayName = 'RatingInput';

Component.defaultProps = {
  iconSize: 'small',
  maxRating: 5,
};

Component.propTypes = {
  /** The size of the star icons. */
  iconSize: PropTypes.oneOf(['tiny', 'small']),
  /** The max number of star icons. */
  maxRating: PropTypes.number,
};
