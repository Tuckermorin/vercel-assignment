import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BikeList from '../src/components/BikeList';

describe('\ud83c\udfcd\ufe0f\ufe0f BikeList component', () => {
  test('hides already-rented bikes when "Show rented" is toggled off', async () => {
    render(<BikeList />);

    expect(screen.getByRole('heading', { name: /Featured Bikes/i })).toBeInTheDocument();
    expect(screen.getByText(/Vintage Cruiser/i)).toBeInTheDocument();

    const toggle = screen.getByLabelText('Show rented');
    await userEvent.click(toggle);

    expect(screen.queryByText(/Vintage Cruiser/i)).not.toBeInTheDocument();
  });

  test('shows rented bikes again when toggled back on', async () => {
    render(<BikeList />);
    const toggle = screen.getByLabelText('Show rented');

    await userEvent.click(toggle); // hide rented bikes
    await userEvent.click(toggle); // show again

    expect(screen.getByText(/Vintage Cruiser/i)).toBeInTheDocument();
  });
});
