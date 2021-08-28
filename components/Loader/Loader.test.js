import { expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import React from 'react';
import Loader from './Loader';

it('can render', () => {
  const { container } = render(<Loader />);

  expect(container.innerHTML).toBeTruthy();
});
