import { domManager } from 'dom-wizard';

const fillForm = (formSelector, data) => {
  for (const [key, val] of Object.entries(data)) {
    try {
      domManager.update({
        selector: `${formSelector} > [name=${key}]`,
        action: 'update',
        value: val,
      });
    } catch (e) {}
  }
};

const clearForm = (form) => {
  for (const field of form) {
    field.value = '';
  }
};

const getFormData = (form) => {
  const formData = {};

  for (const field of form) {
    formData[field.name] = field.value;
  }

  return formData;
};

export { clearForm, fillForm, getFormData };
