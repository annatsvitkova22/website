import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import apolloClient from '~/lib/ApolloClient';

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
    <from className="zm-form">
      <h1 class="zm-form__title">Запропонуй подію</h1>
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
        required
      />
      <input
        className="zm-form__input zm-form__input--date"
        type={'date'}
        name={'date'}
        value={form.date}
        placeholder={dateText}
        onChange={handleInputChange}
        required
      />
      <textarea
        className={'zm-form__input'}
        placeholder={descText}
        name={'message'}
        value={form.description}
        onChange={handleInputChange}
        required
      />

      <button className="zm-form__submit" onClick={handleSubmitComment}>
        {submitText}
      </button>
    </from>
  );
};

EventsForm.propTypes = {
  personText: PropTypes.string,
  phoneText: PropTypes.string,
  nameText: PropTypes.string,
  dateText: PropTypes.string,
  descText: PropTypes.string,
  submitText: PropTypes.string,
};

export default EventsForm;
