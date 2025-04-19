import '@testing-library/jest-dom';

import { expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import CreateEventForm from '../CreateEventForm';

const MockEvent = 'Birthday Party.';

describe('CreateEventForm', () => {
  describe('Rendering', () => {
    it('should render the form', () => {
      render(<CreateEventForm />);
      expect(screen.getByText('What is your event called?')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Event name')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('should render the correct step', () => {
      render(<CreateEventForm />);
      // Initially, it should show step 1
      expect(screen.getByText('What is your event called?')).toBeInTheDocument();
      expect(screen.queryByText('is created!')).not.toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should handle form submission', async () => {
      render(<CreateEventForm />);

      // Fill the form
      await userEvent.type(screen.getByPlaceholderText('Event name'), MockEvent);

      // Submit the form
      await userEvent.click(screen.getByText('Confirm'));

      // Wait for the state to update

      expect(await screen.findByText('Birthday Party.')).toBeInTheDocument();
      expect(await screen.findByText('is created!')).toBeInTheDocument();
    });

    it('should validate form inputs', async () => {
      render(<CreateEventForm />);

      // Submit the form without entering a name
      await userEvent.click(screen.getByText('Confirm'));

      // Check if validation error appears
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('should show error messages', async () => {
      render(<CreateEventForm />);

      // Submit form without data

      await userEvent.click(screen.getByText('Confirm'));
      // Check for error message

      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('should display the correct step indicators', async () => {
      render(<CreateEventForm />);

      // Check the step indicators in step 1
      const stepIndicators = screen.getAllByTestId('progressbar', { hidden: true });
      expect(stepIndicators[0]).toHaveClass('bg-gray-50');
      expect(stepIndicators[1]).toHaveClass('bg-gray-300');

      // Fill form and go to step 2
      await userEvent.type(screen.getByPlaceholderText('Event name'), MockEvent);
      await userEvent.click(screen.getByText('Confirm'));

      // Check the step indicators in step 2

      const updatedStepIndicators = screen.getAllByTestId('progressbar', { hidden: true });
      expect(updatedStepIndicators[0]).toHaveClass('bg-gray-50');
      expect(updatedStepIndicators[1]).toHaveClass('bg-gray-50');
    });
    it('should handle step changes', async () => {
      render(<CreateEventForm />);

      // Initially at step 1
      expect(screen.getByText('What is your event called?')).toBeInTheDocument();

      // Fill the form
      await userEvent.type(screen.getByPlaceholderText('Event name'), MockEvent);

      // Submit to move to step 2
      await userEvent.click(screen.getByText('Confirm'));

      // Check if step 2 is displayed
      await waitFor(async () => {
        const eventNameElement = await screen.getByText('Birthday Party.');
        expect(eventNameElement).toBeInTheDocument();

        const createdElement = screen.getByText('is created!');
        expect(createdElement).toBeInTheDocument();

        const instructionElement = screen.getByText(
          'Click on your new event to manage and customize your event invitation.',
        );
        expect(instructionElement).toBeInTheDocument();
      });
    });
  });
});
