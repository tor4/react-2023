import { render, screen } from "@testing-library/react";
import { SortControl } from './SortControl';
import { userEvent } from "@storybook/testing-library";

describe('SortControl component', () => {
  it('should select Release date by default', () => {
    render(<SortControl />);

    expect(screen.getByRole('option', { name: 'Release Date' }).selected).toBeTruthy();
  });

  it('should render selected option when passed', () => {
    render(<SortControl selected="title" />);

    expect(screen.getByRole('option', { name: 'Title' }).selected).toBeTruthy();
  })

  it('should call onChange handler when chnage option', async () => {
    const onChange = jest.fn();
    render(<SortControl selected="title" onChange={onChange} />);

    await userEvent.selectOptions(screen.getByRole('combobox'), 'releaseDate');

    expect(screen.getByRole('option', { name: 'Release Date' }).selected).toBeTruthy();
    expect(onChange).toBeCalledWith('releaseDate');
  })
});