import React from 'react';
import { Container as SemanticContainer } from 'semantic-ui-react';

/**
 * Container is the Lodgify UI interface for the
 * Semantic UI Container.
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export const Component = ({ textAlign, ...props }) => (
  <SemanticContainer {...props} textAlign={textAlign} />
);

Component.displayName = 'Container';