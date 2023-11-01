import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { SortControl } from './SortControl';

describe('SortControl component', () => {
  it('should select Release date by default', () => {
    render(<SortControl />);

    expect(screen.getByRole('option', { name: 'Release Date' }).selected).toBeTruthy();
  });

  it('should render selected option when passed', () => {
    render(<SortControl selected="title" />);

    expect(screen.getByRole('option', { name: 'Title' }).selected).toBeTruthy();
  })

  it('should call onChange handler when change option', async () => {
    const onChange = jest.fn();
    render(<SortControl selected="name" onChange={onChange} />);

    await act(async () => {
      await userEvent.selectOptions(screen.getByRole('combobox'), 'release_date');
    })

    expect(onChange).toBeCalledWith('release_date');
  })
});