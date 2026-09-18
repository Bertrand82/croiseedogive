import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./BgThreeScene', () => () => <div data-testid="bg-three-scene" />);

it('renders application shell', () => {
  render(<App />);

  expect(screen.getByText("Croisée d'ogives")).toBeInTheDocument();
  expect(screen.getByTestId('bg-three-scene')).toBeInTheDocument();
});
