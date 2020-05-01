import React from 'react';
import * as classnames from 'classnames';
import Icon from '~/components/Icons';

const FormField = ({
  className,
  id,
  placeholder,
  cssClass,
  children,
  required,
}) => {
  let classes = [];
  if (cssClass) {
    classes = cssClass.split(', ');
  }
  return (
    <label className={classnames('zm-form-field', className)} htmlFor={id}>
      {children}
      {placeholder && (
        <span className="zm-form-field__placeholder">
          {placeholder}
          {required && <span className="zm-form-field__required">*</span>}
        </span>
      )}
      {!!classes.length && (
        <Icon
          icon={classes[0]}
          className={`zm-form__icon zm-form__icon--${classes[1]}`}
        />
      )}
    </label>
  );
};

export default FormField;
