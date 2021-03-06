import React, { useState, useEffect } from 'react';
import * as classnames from 'classnames';
import { useStateLink } from '@hookstate/core';
import axios from 'axios';
import getConfig from 'next/config';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

import Polls from '~/components/Gutenberg/Polls';
import { AuthStore } from '~/stores/Auth';
import FormField from '~/components/Form/Field';
import FormLoader from '~/components/Loaders/FormLoader';
import FormSubmit from '~/components/Form/Submit';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const Form = ({ id, className, gutenbergType }) => {
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
    const rf = form.fields.filter(({ isRequired }) => isRequired);
    setValid(rf.length ? vld : true);
  }, [values]);

  if (!id) return null;

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
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  const handleChange = ({ value, name }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  if (gutenbergType === 'GravityformsPollsBlock') {
    return (
      <div className="content__posts gutenberg__poll">
        <Polls data={form.fields} formId={form.id} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={classnames('zm-form', className)}>
      <h2 className="zm-form__title">{title}</h2>
      {fields.map((fld) => {
        const { type, placeholder, cssClass, adminLabel, isRequired } = fld;
        const fId = fld.id;
        return (
          <FormField
            cleared={cleared}
            type={type}
            value={values[adminLabel]}
            key={fId}
            id={adminLabel}
            placeholder={placeholder}
            required={isRequired}
            cssClass={cssClass}
            invalid={!values[adminLabel] && isRequired}
            onChange={handleChange}
          />
        );
      })}
      <FormSubmit
        text={button.text}
        handleSubmit={handleSubmit}
        isSending={isSending}
        sent={sent}
        formValid={valid}
      />
    </form>
  );
};

Form.propTypes = {
  id: PropTypes.any,
  className: PropTypes.string,
  gutenbergType: PropTypes.any,
};

export default Form;
