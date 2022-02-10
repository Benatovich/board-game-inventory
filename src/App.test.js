import { render, screen } from '@testing-library/react';
import App from './App';

test('Boardzo', () => {
  render(<App />);
  const linkElement = screen.getByText(/Boardzo/i);
  expect(linkElement).toBeInTheDocument();
});
