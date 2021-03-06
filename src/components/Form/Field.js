import React, { useState, useEffect } from 'react';
import * as classnames from 'classnames';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import Icon from '~/components/Icons';

registerLocale('uk', uk);
setDefaultLocale('uk');

const FormField = ({
  cleared,
  className,
  id,
  placeholder,
  cssClass,
  children,
  required,
  value = '',
  type = 'text',
  invalid,
  onChange = () => {},
}) => {
  const [touched, setTouched] = useState(false);
  const [focus, setFocus] = useState(false);
  let classes = [];
  if (cssClass) {
    classes = cssClass.split(', ');
  }

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
    setTouched(true);
  };

  useEffect(() => {
    if (cleared) {
      setTouched(false);
      setFocus(false);
    }
  }, [cleared]);

  const commonProps = {
    id,
    name: id,
    required,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  let inner;

  switch (type) {
    case 'date':
      inner = (
        <DatePicker
          popperClassName={'zm-datepicker__popper'}
          className={'zm-form__input zm-form__input--datepicker'}
          selected={value}
          onChange={(date) => onChange({ value: date, name: id })}
          showTimeSelect={true}
          {...commonProps}
        />
      );
      break;
    case 'textarea':
      inner = (
        <textarea
          className={'zm-form__textarea'}
          value={value}
          onChange={({ target }) => onChange({ value: target.value, name: id })}
          {...commonProps}
        />
      );
      break;
    // TODO: handle other field types
    // TODO: add email validation
    default:
      inner = (
        <input
          type={type}
          className={'zm-form__input'}
          value={value}
          onChange={({ target }) => onChange({ value: target.value, name: id })}
          {...commonProps}
        />
      );
  }

  return (
    <label
      className={classnames('zm-form-field', className, {
        'zm-form-field--focused': focus,
        'zm-form-field--touched': touched,
        'zm-form-field--filled': !!value,
        'zm-form-field--invalid': invalid,
      })}
      htmlFor={id}
    >
      {inner}
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
      {children}
    </label>
  );
};
FormField.propTypes = {
  cleared: PropTypes.any,
  className: PropTypes.any,
  id: PropTypes.any,
  placeholder: PropTypes.any,
  cssClass: PropTypes.any,
  children: PropTypes.any,
  required: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.any,
  invalid: PropTypes.any,
  onChange: PropTypes.any,
};

export default FormField;
