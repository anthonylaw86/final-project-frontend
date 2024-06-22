import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  return { values, handleChange, setValues };
}
