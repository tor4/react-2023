import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { Select } from './Select';

describe('Select component', () => {
  const options = [{
    text: 'Option 1', value: 'option-1'
  },
  {
    text: 'Option 2', value: 'option-2'
  }, {
    text: 'Option 3', value: 'option-3'
  }]

  it('should render all options', () => {
    render(<Select options={options} />);

    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('should set value', () => {
    render(<Select options={options} value={'option-2'} onChange={jest.fn()} />);

    expect(screen.getByRole('option', { name: 'Option 2' }).selected).toBeTruthy();
  });

  it('should call onChange handler when change option', async () => {
    const onChange = jest.fn();
    render(<Select name={'test'} options={options} value={'option-2'} onChange={onChange} />);
    expect(screen.getByRole('option', { name: 'Option 2' }).selected).toBeTruthy();

    await userEvent.selectOptions(screen.getByRole('combobox'), 'option-1');

    expect(onChange).toHaveBeenCalled();
  });
});