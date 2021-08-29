import React from 'react';
import { render } from '@testing-library/react';

import Spinner from '../Spinner/Spinner';

describe('App', () => {
  it('renders the spinner', () => {
    const { container } = render(<Spinner />);

    const spinner = container.querySelector('.spinner');

    expect(spinner).toBeTruthy();
  });
});
