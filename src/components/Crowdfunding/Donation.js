import React, { useState } from 'react';
import getConfig from 'next/config';
import { useStateLink } from '@hookstate/core';
import * as axios from 'axios';
import * as moment from 'moment';
import md5 from 'blueimp-md5';

import Icons from '~/components/Icons';
import { AuthStore } from '~/stores/Auth';
import { SingleArticleStore, updatePost } from '~/stores/SingleArticle';
import { CROWDFUNDING } from '~/pages/crowdfundings/[slug]';

const { publicRuntimeConfig } = getConfig();

const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const CrowdfundingDonation = ({ post, onClose = () => {} }) => {
  const authStateLink = useStateLink(AuthStore);
  const postStateLink = useStateLink(SingleArticleStore);

  const storedPost = postStateLink.get();

  const { crowdfundingId, title } = post;

  const [form, setForm] = useState({
    name: '',
    sum: null,
    photo: null,
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
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
    const { name, sum, photo } = form;
    if (!sum) return;
    const {
      wayForPay: { merchantLogin, merchantSecretKey },
    } = config;
    const wayforpay = new window.Wayforpay();
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

    const {
      data: { supported },
    } = getCurrentDonaters;

    supported.push({
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
          supported,
        },
      },
      configs
    );

    const getCurrentAmout = await axios.get(
      `${apiUrl}/wp-json/acf/v3/crowdfundings/${crowdfundingId}/collected`,
      configs
    );

    await axios.post(
      `${apiUrl}/wp-json/acf/v3/crowdfundings/${crowdfundingId}/collected`,
      {
        fields: {
          collected: getCurrentAmout.data.collected
            ? parseInt(getCurrentAmout.data.collected) + parseInt(sum)
            : sum,
        },
      },
      configs
    );

    updatePost(CROWDFUNDING, post.slug);
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
          <div className="crowdfunding-donation__input donation__sum">
            <input
              type={'number'}
              placeholder={`Сума`}
              onChange={handleInputChange}
              value={form.sum}
              name={'sum'}
              required
            />
          </div>
          <div className="crowdfunding-donation__input donation__name">
            <input
              type={'text'}
              placeholder={`Ім'я`}
              onChange={handleInputChange}
              value={form.name}
              name={'name'}
            />
            <label htmlFor="name">необов'язково</label>
          </div>
          <div className="crowdfunding-donation__photo">
            <input
              type="file"
              placeholder="фото"
              onChange={handleFileInput}
              name={'photo'}
            />
            <label htmlFor="photo">необов'язково</label>
          </div>
          <button
            className="crowdfunding-donation__donate"
            disabled={!form.sum}
            onClick={handleDonate}
          >
            підтримати
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrowdfundingDonation;
