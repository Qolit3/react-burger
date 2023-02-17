import { useState } from 'react'

export function useForm<T> (inputValues: T): {
  values: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: T) => void;
} {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}