import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InteractiveHeading from '../src/components/InteractiveHeading';
import { waitForElementToBeRemoved } from '@testing-library/react';

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
    
    await userEvent.click(button);
    
    // Since the removal appears to be synchronous, just check that it's gone
    expect(screen.queryByRole('heading', { name: 'Hello' })).not.toBeInTheDocument();
  });
});