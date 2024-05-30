import { useRef, useState } from "react";

const useFormValidation = (initialState, validationRules) => {
  //  States
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRefs = useRef({});

  //  Functions
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return true; // Si no hay reglas, el campo es válido por defecto.

    // Validación para archivos
    if (rule.isFile) {
      if (rule.required && !value[0]) {
        return "Archivo necesario";
      }
      if (value[0] && rule.maxSize && value[0].size > rule.maxSize) {
        return `El archivo debe ser menor a ${rule.maxSize / 1024 / 1024} MB.`;
      }
    } else {
      // Validación para campos no archivos
      if (rule.required && !value) {
        return "Campo requerido";
      }
      if (rule.regex && value !== null && !rule.regex.test(value)) {
        if (rule.required || value !== "") {
          return "Valor inválido";
        }
      }
    }

    return true;
  };

  const registerFileInput = (name, ref) => {
    fileInputRefs.current[name] = ref;
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
    registerFileInput,
    setFormValues,
  };
};

export { useFormValidation };
