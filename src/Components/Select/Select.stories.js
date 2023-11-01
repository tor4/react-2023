import { Select } from './Select';
import '../../index.css';
import { genres } from 'utils/constants';

export default {
  title: 'Base/Select',
  component: Select,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    options: genres.map((genre) => ({ text: genre, value: genre })),
  }
};