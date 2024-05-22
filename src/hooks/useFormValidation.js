import { useState } from "react";

const useFormValidation = (initialState, validationRules) => {
  //  States
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  //  Functions
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return true;

    if (rule.required && !value) {
      return "Campo requerido";
    }

    if (rule.regex && !rule.regex.test(value)) {
      return "Valor inválido";
    }

    return true;
  };

  const handleChange = (name, value) => {
    const error = validateField(name, value);
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: error === true ? "" : error,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    for (let name in formValues) {
      const value = formValues[name];
      const error = validateField(name, value);
      if (error !== true) {
        valid = false;
        newErrors[name] = error;
      }
    }

    setFormErrors(newErrors);
    return valid;
  };

  return {
    formValues,
    formErrors,
    handleChange,
    validateForm,
  };
};

export { useFormValidation };
