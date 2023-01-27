import React from 'react';
import Input from './Input';

const FormikInput = ({ field, ...props }) => {
  return <Input {...field} {...props} />;
};

export default FormikInput;
