import { Dialog } from './Dialog';
import '../../index.css';
import { MovieForm } from '../MovieForm/MovieForm';
import { Default as MovieDetails } from '../MovieDetails/MovieDetails.stories';

export default {
  title: 'Base/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export const NoButtons = {
  args: {
    title: 'No buttons',
    children: (<>Congratulations</>)
  },
};

export const AddMovie = {
  args: {
    title: 'Add movie',
    children: (
      <MovieForm />
    ),
  }
};

const movie = MovieDetails.args;
export const EditMovie = {
  args: {
    title: 'Edit movie',
    children: (
      <MovieForm movie={movie} />
    )
  }
}

export const DeleteMovie = {
  args: {
    title: 'Delete movie',
    children: (
      <>
        <p>
          Are you sure you want to delete this movie?
        </p>
        <div className='buttons'>
          <button className='primary'>Confirm</button>
        </div>
      </>
    )
  }
}

