import { GenreSelect } from './GenreSelect';
import '../../index.css';

const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

export default {
    title: 'Filtering/GenreSelect',
    component: GenreSelect,
    tags: ['autodocs'],
    argTypes: {
        selected: {
            control: 'select',
            options: genres,
        }
    },
    args: {
        genres,
    }
};

export const NotSelected = {
    name: 'Genre is not selected',
};

export const Selected = {
    name: 'Genre is selected',
    args: {
        selected: 'Comedy',
    }
}