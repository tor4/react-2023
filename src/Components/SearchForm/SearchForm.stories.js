import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SearchForm } from './SearchForm';
import '../../index.css';

export default {
    title: 'Filtering/SearchForm',
    component: SearchForm,
    tags: ['autodocs'],
};

export const SubmitOnButtonClick = {
    play: async ({ args, canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Enter query', async () => {
            await userEvent.type(canvas.getByRole('textbox'), 'Storybook');
        });

        await step('Click Search button', async () => {
            await userEvent.click(canvas.getByRole('button'));
        });

        await waitFor(() => expect(args.onSearch).toHaveBeenCalled());
    },
}