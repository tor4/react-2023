import { fireEvent, render, screen } from "@testing-library/react";
import { SearchForm } from "./SearchForm";
import userEvent from "@testing-library/user-event";

describe('SearchForm component', () => {
    it('should render input with value provided in props', () => {
        render(<SearchForm query="initial value" />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement.value).toBe('initial value');
    });

    it('should call onSearch handler after clicking Search button', () => {
        const onSearch = jest.fn();
        render(<SearchForm onSearch={onSearch} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'search query' } });
        fireEvent.click(screen.getByRole('button'));

        expect(onSearch).toBeCalledWith('search query');
        expect(onSearch).toBeCalledTimes(1);
    });

    it('should call onSearch handler after pressing Enter button', () => {
        const onSearch = jest.fn();
        render(<SearchForm onSearch={onSearch} />);

        userEvent.type(screen.getByRole('textbox'), 'search query');
        userEvent.keyboard('{Enter}');

        expect(onSearch).toBeCalledWith('search query');
        expect(onSearch).toBeCalledTimes(1);
    })
});