import React, { useState } from 'react';
import Icons from '~/components/Icons';
import getConfig from 'next/config';
import { AuthStore } from '~/stores/Auth';
import { useStateLink } from '@hookstate/core';
import * as axios from 'axios';
import * as moment from 'moment';
import { SingleArticleStore } from '~/stores/SingleArticle';

const { publicRuntimeConfig } = getConfig();

const config = publicRuntimeConfig.find((e) => e.env === process.env.ENV);

const CrowdfundingDonation = ({ post, onClose = () => {} }) => {
  const authStateLink = useStateLink(AuthStore);
  const postStateLink = useStateLink(SingleArticleStore);

  const { crowdfundingId, title } = post;

  const [form, setForm] = useState({
    name: '',
    sum: 0,
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
    // const p = {
    //   merchantAccount: merchantLogin,
    //   merchantDomainName: 'http://zmist.tech',
    //   authorizationType: 'SimpleSignature',
    //   merchantSignature: merchantSecretKey,
    //   orderReference: orderId,
    //   orderDate: `${moment().unix()}`,
    //   amount: `${sum}`,
    //   currency: 'UAH',
    //   productName: title,
    //   productPrice: `${sum}`,
    //   productCount: '1',
    //   clientFirstName: name,
    //   clientLastName: name,
    //   clientEmail: 'vlad@outright.digital',
    //   clientPhone: '480954581310',
    //   language: 'UA',
    //   straightWidget: true,
    //   returnUrl: window.location.href,
    // };
    // console.log(p);
    // wayforpay.run(
    //   p,
    //   function (response) {
    //     console.log('approved', response);
    //   },
    //   function (response) {
    //     console.log('declined', response);
    //   },
    //   function (response) {
    //     console.log('pending or in processing', response);
    //   }
    // );
    handlePostDonate({ orderId, name, sum, photo });
  };

  const handlePostDonate = async (data) => {
    const { apiUrl } = config;
    const { token } = authStateLink.get();

    const { photo } = data;

    const conf = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `${photo.type}`,
        'Content-Disposition': `attachment; filename=${photo.name}`,
      },
    };


    const uploadPhoto = await axios.post(
      `${apiUrl}/wp-json/wp/v2/media`,
      photo,
      conf
    );

    console.log(data, conf, uploadPhoto);
  };

  return (
    <div className="crowdfunding-donation">
      <div className="crowdfunding-donation__wrapper">
        <button className="crowdfunding-donation__close" onClick={onClose}>
          <Icons icon={'close-comment'} />
        </button>
        <div className="crowdfunding-donation__form">
          <div>
            <input
              type={'number'}
              placeholder={`сума`}
              onChange={handleInputChange}
              value={form.sum}
              name={'sum'}
              required
            />
          </div>
          <div>
            <input
              type={'text'}
              placeholder={`Ім'я`}
              onChange={handleInputChange}
              value={form.name}
              name={'name'}
            />
          </div>
          <div>
            <input
              type="file"
              placeholder="фото"
              onChange={handleFileInput}
              name={'photo'}
            />
          </div>
          <button disabled={!form.sum} onClick={handleDonate}>
            donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrowdfundingDonation;
