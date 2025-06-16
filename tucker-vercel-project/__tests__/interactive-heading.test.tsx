import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InteractiveHeading from '../src/components/InteractiveHeading';

describe('InteractiveHeading component', () => {
  test('updates heading text based on user input', async () => {
    render(<InteractiveHeading />);
    const input = screen.getByLabelText('text-input');
    await userEvent.clear(input);
    await userEvent.type(input, 'World');
    expect(screen.getByRole('heading', { name: 'World' })).toBeInTheDocument();
  });

  test('removes heading when toggle button clicked', async () => {
    render(<InteractiveHeading />);
    const button = screen.getByLabelText('toggle-heading');
    
    // Verify heading exists before clicking
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
    
    // Click the button
    await userEvent.click(button);
    
    // Check that it's gone (no need to wait since it's synchronous)
    expect(screen.queryByRole('heading', { name: 'Hello' })).not.toBeInTheDocument();
  });
});