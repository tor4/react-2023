import { fireEvent, render, screen } from "@testing-library/react";
import { GenreSelect } from "./GenreSelect";

describe('GenreSelect component', () => {
    const genres = ['genre_1', 'genre_2', 'genre_3'];

    it('should render all genres passes in props', () => {
        render(<GenreSelect genres={genres} />);

        const items = screen.getAllByRole('button');

        expect(items.length).toBe(genres.length);
    });

    it('should highlight selected genre', () => {
        const selected = 'genre_3';
        render(<GenreSelect genres={genres} selected={selected} />);

        const selectedGenre = screen.getByText(selected);

        expect(selectedGenre.classList).toContain('selected');
    });

    it('should call onSelect handler after clicking on genre', () => {
        const onSelect = jest.fn();
        const selected = 'genre_2';

        render(<GenreSelect genres={genres} onSelect={onSelect} />);

        const genreButton = screen.getByText(selected);
        fireEvent.click(genreButton);

        expect(onSelect).toBeCalledWith(selected);
    });
});