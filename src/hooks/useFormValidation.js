import { useRef, useState } from "react";

const useFormValidation = (initialState, validationRules, groupRules = []) => {
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
    } else if (rule.noEmpty) {
      if (rule.required && value.length == 0) {
        return "Campo requerido";
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
      if (rule.lessThan && value > rule.lessThan) {
        return "Límite superado";
      }
      if (rule.moreEqualThan && value < rule.moreEqualThan) {
        return "El valor tiene que ser mayor o igual a " + rule.moreEqualThan;
      }
    }

    return true;
  };

  /**
   * rule : [{
   *  mode: "oneOfAllRequired",
   *  inputs: ['isbn', 'issn', 'issn_e']
   * }, ...]
   */
  const validateGroup = (rule) => {
    switch (rule.mode) {
      case "oneOfAllRequired":
        let counter = 0;
        rule.inputs.forEach((item) => {
          if (formValues[item]) {
            counter++;
          }
        });
        if (counter >= 1) {
          return true;
        } else {
          rule.inputs.forEach((item) => {
            setFormErrors((prev) => ({
              ...prev,
              [item]:
                "Necesita completar al menos uno de los siguiente campos: " +
                rule.inputs.join(", "),
            }));
          });
          return false;
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

    //  Validación individual
    for (let name in formValues) {
      const value = formValues[name];
      const error = validateField(name, value);
      if (error !== true) {
        valid = false;
        newErrors[name] = error;
      }
    }

    setFormErrors(newErrors);

    //  Validación en grupo
    for (let groupRule of groupRules) {
      const error = validateGroup(groupRule);
      if (error !== true) {
        valid = false;
      }
    }
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
