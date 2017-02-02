import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let inputError = {};

  if (Validator.isEmpty(data.username)) {
    inputError.username = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    inputError.password = 'This field is required';
  }

  return {
    inputError,
    isValid: isEmpty(inputError)
  };
}
