import { Counter } from './Counter';
import '../../index.css';

export default {
    component: Counter,
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'light',
        },
    },
};

export const Default = {};