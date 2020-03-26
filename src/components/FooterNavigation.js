import React from 'react';
import Link from 'next/link';

const data = [
  'Сторінки',
  'Головна',
  'Новини',
  'Збір Коштів',
  'Афіша',
  'Відео',
  'Різне',
  'Можливості',
];

const FooterNavigaton = () => {
  return (
    <ul className="sitemap__list">
      {data.map((item, index) => {
        return (
          <li key={index} className="sitemap__list-item">
            <Link href={'/'}>{item}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterNavigaton;
