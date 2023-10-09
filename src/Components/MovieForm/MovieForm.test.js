import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@storybook/testing-library";
import { MovieForm } from './MovieForm';


describe('MovieForm component', () => {
  it('should call onSubmit handle with date after clicking Submit button', async () => {
    const onSubmit = jest.fn();
    render(<MovieForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Title'), 'movie title');
    await userEvent.type(screen.getByLabelText('Release date'), '2023');
    await userEvent.type(screen.getByLabelText('Movie url'), 'https://url');
    await userEvent.type(screen.getByLabelText('Rating'), '8.2');
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Comedy');
    await userEvent.type(screen.getByLabelText('Runtime'), '100');
    await userEvent.type(screen.getByLabelText('Overview'), 'description');

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    expect(onSubmit).toBeCalledWith({
      name: 'movie title',
      releaseYear: '2023',
      imageUrl: 'https://url',
      rating: '8.2',
      genre: 'Comedy',
      duration: '100',
      description: 'description',
    });
  });
});