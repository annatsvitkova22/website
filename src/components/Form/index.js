import React, { useState, useEffect } from 'react';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';
import axios from 'axios';
import getConfig from 'next/config';
import * as _ from 'lodash';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { AuthStore } from '~/stores/Auth';
import FormField from '~/components/Form/Field';
import FormLoader from '~/components/Loaders/FormLoader';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const Form = ({ id, className }) => {
  if (!id) return null;

  const { apiUrl } = config;

  const authStateLink = useStateLink(AuthStore);
  const authStore = authStateLink.get();

  const [state, setState] = useState({
    isSending: false,
    form: null,
    sent: false,
  });
  const [valid, setValid] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [values, setValues] = useState({});
  const { form, isSending, sent } = state;

  const loadForm = async () => {
    const conf = {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    };
    const formResponse = await axios.get(
      `${apiUrl}/wp-json/gf/v2/forms/${id}`,
      conf
    );

    setState({
      ...state,
      form: formResponse.data,
    });
  };

  useEffect(() => {
    if (authStore.token && !form) {
      loadForm();
    }
  }, [authStore]);

  useEffect(() => {
    if (!form) return;
    let vld = false;
    form.fields.forEach(({ adminLabel, isRequired }) => {
      if (isRequired) {
        vld = !!values[adminLabel];
      }
    });
    setValid(vld);
  }, [values]);

  if (!form) {
    return <FormLoader />;
  }

  const { fields, title, button } = form;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState({
      ...state,
      isSending: true,
    });

    const data = {
      form_id: id,
    };
    _.map(values, (value, key) => ({ key, value })).forEach((field) => {
      data[fields.find((f) => f.adminLabel === field.key).id] = field.value;
    });

    const conf = {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    };

    await axios.post(`${apiUrl}/wp-json/gf/v2/entries`, data, conf);

    setState({
      ...state,
      isSending: false,
      sent: true,
    });

    setTimeout(() => {
      setState({
        ...state,
        sent: false,
      });
      const clearedValues = {};
      _.map(values, (value, key) => ({ key, value })).forEach((field) => {
        clearedValues[field.key] = '';
      });
      setValues(clearedValues);
      setCleared(true);
    }, 10000);
  };

  const handleChange = ({ value, name } ) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classnames('zm-form', className)}>
      <h2 className="zm-form__title">{title}</h2>
      {fields.map(
        ({ id, type, placeholder, cssClass, adminLabel, isRequired }) => {
          return (
            <FormField
              cleared={cleared}
              type={type}
              value={values[adminLabel]}
              key={id}
              id={adminLabel}
              placeholder={placeholder}
              required={isRequired}
              cssClass={cssClass}
              className={classnames({
                'zm-form-field--invalid': !values[adminLabel] && isRequired,
              })}
              onChange={handleChange}
            />
          );
        }
      )}
      <button
        className={classnames('zm-form__submit zm-button', {
          'zm-form__submit--sent': sent,
        })}
        disabled={!valid || isSending || sent}
        onClick={handleSubmit}
      >
        {!sent && !isSending && button.text}
        {isSending && 'Надсилається...'}
        {sent && (
          <>
            Надіслано
            <svg
              className="od-icon__inner"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              width={20}
              style={{ marginLeft: 5 }}
            >
              <path
                /* tslint:disable-next-line */
                fill="currentColor"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm90.2-146.2C315.8 352.6 282.9 368 248 368s-67.8-15.4-90.2-42.2c-5.7-6.8-15.8-7.7-22.5-2-6.8 5.7-7.7 15.7-2 22.5C161.7 380.4 203.6 400 248 400s86.3-19.6 114.8-53.8c5.7-6.8 4.8-16.9-2-22.5-6.8-5.6-16.9-4.7-22.6 2.1zM168 240c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z"
              ></path>
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default Form;
