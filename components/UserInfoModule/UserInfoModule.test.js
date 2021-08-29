import React from 'react';
import { render } from '@testing-library/react';

import UserInfoModule from './UserInfoModule';

describe('UserInfoModule', () => {
  it('renders the user info module', () => {
    const { container } = render(<UserInfoModule />);

    const userInfoModuleResult = container.querySelector('.result');
    const userInfoModuleButtonContainer =
      container.querySelector('.button-container');

    expect(userInfoModuleResult).toBeTruthy();
    expect(userInfoModuleButtonContainer).toBeTruthy();
  });
});
