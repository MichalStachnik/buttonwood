import React from 'react';
import { render } from '@testing-library/react';

import TokenRow from './TokenRow';

describe('TokenRow', () => {
  it('renders the tokenrow', () => {
    const { container } = render(<TokenRow token="UNI" />);

    const tokenRow = container.querySelector('.token-row');

    expect(tokenRow).toBeTruthy();
  });
});
