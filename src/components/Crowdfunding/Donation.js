import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { useStateLink } from '@hookstate/core';
import * as axios from 'axios';
import * as moment from 'moment';
import md5 from 'blueimp-md5';

import Icons from '~/components/Icons';
import { AuthStore } from '~/stores/Auth';
import { updatePost } from '~/stores/SingleArticle';
import { CROWDFUNDING } from '~/pages/crowdfundings/[slug]';
import FormField from '~/components/Form/Field';
import FormSubmit from '~/components/Form/Submit';

const { publicRuntimeConfig } = getConfig();

const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const CrowdfundingDonation = ({ post, onClose = () => {} }) => {
  const authStateLink = useStateLink(AuthStore);

  const [wayforpay, setWayForPay] = useState();

  useEffect(() => {
    setWayForPay(new window.Wayforpay());
  }, []);

  const { crowdfundingId, title } = post;

  const [state, setState] = useState({
    isSending: false,
    sent: false,
  });

  const { isSending, sent } = state;

  const [form, setForm] = useState({
    name: '',
    sum: null,
    photo: null,
  });

  const handleInputChange = ({ value, name }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileInput = ({ target: { files } }) => {
    setForm({
      ...form,
      photo: files[0],
    });
  };

  const handleDonate = () => {
    setState({
      ...state,
      isSending: true,
    });
    const { name, sum, photo } = form;
    if (!sum) return;
    const {
      wayForPay: { merchantLogin, merchantSecretKey },
    } = config;
    const orderId = `${crowdfundingId}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const p = {
      merchantAccount: merchantLogin,
      merchantDomainName: 'http://zmist.tech',
      authorizationType: 'SimpleSignature',
      merchantTransactionSecureType: 'AUTO',
      merchantSignature: merchantSecretKey,
      orderReference: orderId,
      orderDate: `${moment().unix()}`,
      amount: `${sum}`,
      currency: 'UAH',
      productName: [title],
      productPrice: [sum],
      productCount: [1],
      language: 'UA',
      straightWidget: true,
      returnUrl: window.location.href,
    };

    const hashString = `${p.merchantAccount};${p.merchantDomainName};${p.orderReference};${p.orderDate};${p.amount};${p.currency};${p.productName};${p.productCount};${p.productPrice}`;
    p.merchantSignature = md5(hashString, merchantSecretKey);

    wayforpay.run(
      p,
      function (response) {
        handlePostDonate({ orderId, name, sum, photo, date: p.orderDate });
      },
      function (response) {
        // TODO: handle this
        // console.log('declined', response);
      },
      function (response) {
        handlePostDonate({ orderId, name, sum, photo, date: p.orderDate });
      }
    );

    handlePostDonate({ orderId, name, sum, photo, date: p.orderDate });

    window.addEventListener(
      'message',
      (event) => {
        if (event.data === 'WfpWidgetEventClose') {
          setState({
            ...state,
            isSending: false,
          });
        }
      },
      false
    );
  };

  const handlePostDonate = async (data) => {
    const { apiUrl } = config;
    const { token } = authStateLink.get();

    const { photo, name, sum, orderId, date } = data;
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let avatar = null;

    if (photo) {
      const uploadPhoto = await axios.post(
        `${apiUrl}/wp-json/wp/v2/media`,
        photo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `${photo.type}`,
            'Content-Disposition': `attachment; filename=${photo.name}`,
          },
        }
      );
      avatar = uploadPhoto.data.id;
    }

    const getCurrentDonaters = await axios.get(
      `${apiUrl}/wp-json/acf/v3/crowdfundings/${crowdfundingId}/supported`,
      configs
    );

    let {
      data: { supported },
    } = getCurrentDonaters;

    let sups = supported ? supported : [];

    sups.push({
      name: name || 'Анонімно',
      photo: avatar,
      sum,
      date,
      orderId,
    });

    await axios.post(
      `${apiUrl}/wp-json/acf/v3/crowdfundings/${crowdfundingId}/supported`,
      {
        fields: {
          supported: sups,
        },
      },
      configs
    );

    const getCurrentAmount = await axios.get(
      `${apiUrl}/wp-json/acf/v3/crowdfundings/${crowdfundingId}/collected`,
      configs
    );

    await axios.post(
      `${apiUrl}/wp-json/acf/v3/crowdfundings/${crowdfundingId}/collected`,
      {
        fields: {
          collected: getCurrentAmount.data.collected
            ? parseInt(getCurrentAmount.data.collected) + parseInt(sum)
            : sum,
        },
      },
      configs
    );

    await updatePost(CROWDFUNDING, post.slug);

    setState({
      ...state,
      isSending: false,
      sent: true,
    });
    wayforpay.closeit();
    onClose();
  };

  return (
    <div className="crowdfunding-donation">
      <div className="crowdfunding-donation__wrapper">
        <div className="crowdfunding-donation__title">
          <span>підтримати</span>
          <button className="crowdfunding-donation__close" onClick={onClose}>
            <Icons icon={'close-comment'} />
          </button>
        </div>
        <div className="crowdfunding-donation__form">
          <FormField
            className="crowdfunding-donation__input donation__sum"
            type={'number'}
            placeholder={`Сума`}
            onChange={handleInputChange}
            value={form.sum}
            id={'sum'}
            required
            invalid={!form.sum}
          />
          <FormField
            className="crowdfunding-donation__input donation__name"
            type={'text'}
            placeholder={`Ім'я`}
            onChange={handleInputChange}
            value={form.name}
            id={'name'}
          />
          <div className="crowdfunding-donation__photo">
            <input
              type="file"
              placeholder="фото"
              onChange={handleFileInput}
              name={'photo'}
            />
            <label htmlFor="photo">Ваше фото, (необов'язково)</label>
          </div>
          <FormSubmit
            text={'Підтримати'}
            handleSubmit={handleDonate}
            isSending={isSending}
            sent={sent}
            formValid={!!form.sum}
          />
        </div>
      </div>
    </div>
  );
};

export default CrowdfundingDonation;
