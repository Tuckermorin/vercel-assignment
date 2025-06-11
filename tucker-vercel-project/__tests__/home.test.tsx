import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../src/app/page';

describe('Home page', () => {
  test('renders hero heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /test drive your dream bike/i })).toBeInTheDocument();
  });

  test('stats section has test id', () => {
    render(<Home />);
    expect(screen.getByTestId('stats-section')).toBeInTheDocument();
  });

  test('browse link has correct href', () => {
    render(<Home />);
    const browseLink = screen.getByTitle('main-browse-link');
    expect(browseLink).toHaveAttribute('href', '/browse');
  });

  test('featured bikes load asynchronously', async () => {
    render(<Home />);
    expect(await screen.findByText('Trek Mountain Explorer')).toBeInTheDocument();
  });

  test('get started button can be clicked', async () => {
    render(<Home />);
    const button = await screen.findByLabelText('get-started');
    await userEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  test('unknown bike is not displayed', () => {
    render(<Home />);
    expect(screen.queryByText('Unknown Bike')).toBeNull();
  });
});
