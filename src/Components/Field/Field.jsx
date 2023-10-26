import { Select } from "../Select/Select";
import './Field.css';

export function Field({ label, name, type, placeholder, step, register, validation, error, options }) {
  let input;

  switch (type) {
    case 'select':
      input = (<Select id={name}
        name={name}
        register={register}
        validation={validation}
        options={options} />)
      break;
    case 'textarea':
      input = (<textarea
        id={name}
        {...register(name, validation)}
        placeholder={placeholder} />)
      break;
    default:
      input = (<input
        {...register(name, validation)}
        type={type} step={step}
        id={name} placeholder={placeholder} autoComplete='off' />)
  }

  return (
    <div className='Field'>
      <label htmlFor={name}>{label}</label>
      {input}
      {error && <p className='error'>{error.message}</p>}
    </div>
  )
}