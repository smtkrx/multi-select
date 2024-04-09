import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiSelect from './MultiSelect';

test('renders learn react link', () => {
  render(<MultiSelect />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
