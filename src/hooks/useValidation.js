import { useState } from "react";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false)
  // console.log(errors);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    let emailError = e.target.validationMessage;
    if (name === 'email') {
      if (!value.includes('.') || value.endsWith('.')) {
        emailError = 'Email адрес не валидный';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: e.target.validationMessage || emailError }));

    const isEmailError = name === 'email' && emailError;

    const checkValidity = e.target.closest("form").checkValidity()

    if (e.target.validationMessage || !checkValidity || isEmailError ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }

    // (() =>  && !isEmailError && );
  }
  

  function defaultValues(values = {}, errors = {}, isValid = false) {
    setValues(values);
    setErrors(errors);
    setIsValid(isValid)
  }

  return { values, errors, handleChange, defaultValues, isValid };
}

export default useValidation;
