import { render, screen } from '@testing-library/react';
import AboutPage from '../src/app/about/page';

describe('AboutPage', () => {
  test('renders heading from async server component', async () => {
    const ui = await AboutPage();
    render(ui);
    expect(screen.getByRole('heading', { name: /about bikeshare/i })).toBeInTheDocument();
  });

  test('includes placeholder text', async () => {
    const ui = await AboutPage();
    render(ui);
    expect(screen.getByText(/more information will be available soon/i)).toBeInTheDocument();
  });
});
