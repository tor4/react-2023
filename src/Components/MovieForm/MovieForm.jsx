import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { genres } from "@utils/constants";
import './MovieForm.css';
import { Field } from '../Field/Field';

const RequiredMessage = 'Cannot be empty.';

export function MovieForm({ movie, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: movie,
  });

  return (<form method='post' onSubmit={handleSubmit(onSubmit)} className='MovieForm'>
    <Field label='Title' name='name' placeholder='Movie Title'
      register={register}
      validation={{ required: RequiredMessage }}
      error={errors.name} />

    <Field label='Release date' name='releaseDate' placeholder='2023' type='date'
      register={register}
      validation={{ required: RequiredMessage }}
      error={errors.releaseDate} />

    <Field label='Movie url' name='imageUrl' placeholder='https://'
      register={register}
      validation={{
        required: RequiredMessage,
        pattern: {
          value: /^((https?|ftp)\:\/\/((\[?(\d{1,3}\.){3}\d{1,3}\]?)|(([-a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}))(\:\d+)?(\/[-a-zA-Z0-9._?,'+&amp;%$#=~\\]+)*\/?)$/,
          message: 'Must be a valid uri.'
        },
      }}
      error={errors.imageUrl} />

    <Field label='Rating' name='rating' placeholder='7,8' type='number' step='0.1'
      register={register}
      validation={{
        max: { value: 10, message: 'Max 10' }, min: 0, valueAsNumber: true,
        required: RequiredMessage
      }}
      error={errors.rating} />

    <Field label='Genre' name='genre' type='select'
      options={genres.map((genre) => ({ text: genre, value: genre }))}
      validation={{ required: RequiredMessage }}
      register={register} />

    <Field label='Runtime' name='duration' placeholder='minutes' type='number'
      register={register}
      validation={{
        min: {
          value: 0,
          message: '> 0',
        },
        valueAsNumber: true,
        required: RequiredMessage,
      }}
      error={errors.duration} />

    <div className='control-wide'>
      <Field label='Overview' name='description' placeholder='Movie description'
        type='textarea'
        validation={{ required: RequiredMessage }}
        register={register}
        error={errors.description} />
    </div>

    <div className='buttons'>
      <button type='reset' className='secondary'>Reset</button>
      <button type='submit' className='primary'>Submit</button>
    </div>
  </form>)
};

MovieForm.propTypes = {
  movie: PropTypes.object,
  onSubmit: PropTypes.func,
};

MovieForm.defaultProps = {
  movie: {},
};