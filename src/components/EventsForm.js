import React, { useState } from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import apolloClient from '~/lib/ApolloClient';
import Icon from '~/components/Icons';

const ADD_EVENT = gql`
  mutation($author: String, $commentOn: Int, $content: String) {
    createEvent(
      input: {
        clientMutationId: "CreateComment"
        commentOn: $commentOn
        content: $content
        author: $author
      }
    ) {
      success
    }
  }
`;

const EventsForm = ({
  personText,
  phoneText,
  nameText,
  dateText,
  descText,
  submitText,
  className,
  onSent = () => {},
}) => {
  const [form, setForm] = useState({
    person: '',
    phone: '',
    name: '',
    date: '',
    description: '',
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitComment = async () => {
    const { person, phone, name, date, description } = form;
    if (!person || !phone || !name || !date || !description) return;

    const variables = {
      person,
      phone,
      name,
      date,
      description,
    };

    const response = await apolloClient.query({
      query: ADD_EVENT,
      variables,
    });
    if (!response.errors && response.data.createComment.success) {
      setForm({
        person: '',
        phone: '',
        name: '',
        date: '',
        description: '',
      });

      onSent();
    }
  };

  return (
    <form className={classnames('zm-form', className)}>
      <h1 className="zm-form__title">Запропонуй Подію</h1>
      <input
        className={'zm-form__input'}
        type={'text'}
        placeholder={personText}
        name={'contact-person'}
        value={form.person}
        onChange={handleInputChange}
        autoFocus
        required
      />
      <input
        className="zm-form__input"
        type={'tel'}
        placeholder={phoneText}
        name={'phone'}
        value={form.phone}
        onChange={handleInputChange}
        required
      />
      <input
        className="zm-form__input"
        type={'text'}
        name={'name'}
        value={form.name}
        placeholder={nameText}
        onChange={handleInputChange}
        required
      />
      <div className="zm-form__input-wrap">
        <input
          className="zm-form__input"
          type={'text'}
          name={'date'}
          value={form.date}
          placeholder={dateText}
          onChange={handleInputChange}
          required
        />
        <Icon
          icon="calendar-alt"
          className="zm-form__icon zm-form__icon--date"
        />
      </div>
      <textarea
        className={'zm-form__textarea'}
        placeholder={descText}
        name={'message'}
        value={form.description}
        onChange={handleInputChange}
        required
      />

      <button
        className="zm-form__submit zm-button"
        onClick={handleSubmitComment}
      >
        {submitText}
      </button>
    </form>
  );
};

EventsForm.propTypes = {
  personText: PropTypes.string,
  phoneText: PropTypes.string,
  nameText: PropTypes.string,
  dateText: PropTypes.string,
  descText: PropTypes.string,
  submitText: PropTypes.string,
  className: PropTypes.string,
};

export default EventsForm;
