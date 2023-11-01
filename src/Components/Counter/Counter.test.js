import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter component', () => {
    it('should display initial value provided in props', () => {
        render(<Counter count={10} />);
        const countElement = screen.getByText(/10/i);

        expect(countElement).toBeInTheDocument();
    });

    it('should decrement value after clicking "decrement" button', () => {
        render(<Counter count={10} />);
        fireEvent.click(screen.getByText('-'));

        expect(screen.getByText(/9/i)).toBeInTheDocument();
    });

    it('should increament value after clicking "increament" button', () => {
        render(<Counter count={10} />);
        fireEvent.click(screen.getByText('+'));

        expect(screen.getByText(/11/i)).toBeInTheDocument();
    });
});