import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Logo from '../Logo';
import Socials from '../Socials';

import Navigation from './Navigation';
import Contacts from './Contacts';
import PartnersLogo from './PartnersLogo';
import Resources from './Resourses';
import Counters from './Counters';

import '../../styles/components/footer.scss';

const FOOTER_QUERY = gql`
  query FooterQuery {
    info {
      generalInfoACF {
        partners {
          name
          url
          logo {
            mediaItemUrl
            title
          }
        }
        logo {
          mediaItemUrl
          title
        }
        socials {
          url
          name
        }
        contacts {
          name
          role
          contacts {
            info
            type
          }
        }
      }
    }
    menus {
      nodes {
        id
        menuItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
    blogs {
      pageInfo {
        total
      }
    }
    crowdfundings {
      pageInfo {
        total
      }
    }
    publications {
      pageInfo {
        total
      }
    }
  }
`;

const Footer = () => {
  const { loading, data } = useQuery(FOOTER_QUERY);

  if (loading) return null;

  const date = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="navigation__wrapper row">
          <div className={'col-2'}>
            <Logo logoData={data.info.generalInfoACF.logo} />
          </div>
          <div className="navigation__sitemap col-10">
            <PartnersLogo
              partnersData={data.info.generalInfoACF.partners}
              className={'col-2'}
            />
            <Navigation
              navigationData={data.menus.nodes[3]}
              className={'col-2'}
            />
            <Navigation
              navigationData={data.menus.nodes[1]}
              className={'col-2'}
            />
            <Resources
              navigationData={data.menus.nodes[2]}
              className={'col-2'}
            />
            <Contacts
              contactsData={data.info.generalInfoACF.contacts}
              className={'col-2'}
            />
          </div>
        </div>
        <div className="data__wrapper row ">
          <Socials
            className={'col-3'}
            socialsData={data.info.generalInfoACF.socials}
            color={'white'}
          />
          <Counters
            className={'col-4'}
            blogsData={data.blogs}
            crowdfundingsData={data.crowdfundings}
            publicationsData={data.publications}
          />
        </div>
        <div className={'developers row'}>
          <div className={'developers__copyrights-date col-2'}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="copyright"
              className={'svg-inline--fa fa-copyright fa-w-16'}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 448c-110.532 0-200-89.451-200-200 0-110.531 89.451-200 200-200 110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200zm107.351-101.064c-9.614 9.712-45.53 41.396-104.065 41.396-82.43 0-140.484-61.425-140.484-141.567 0-79.152 60.275-139.401 139.762-139.401 55.531 0 88.738 26.62 97.593 34.779a11.965 11.965 0 0 1 1.936 15.322l-18.155 28.113c-3.841 5.95-11.966 7.282-17.499 2.921-8.595-6.776-31.814-22.538-61.708-22.538-48.303 0-77.916 35.33-77.916 80.082 0 41.589 26.888 83.692 78.277 83.692 32.657 0 56.843-19.039 65.726-27.225 5.27-4.857 13.596-4.039 17.82 1.738l19.865 27.17a11.947 11.947 0 0 1-1.152 15.518z"
              ></path>
            </svg>
            <span>Copyrights {date}</span>
          </div>
          <div className={'developers__copyrights-logo col-5'}>
            <span className={'copyrights-logo__description'}>
              Design and development by Outright Digital
            </span>
            <a href="https://outright.digital/">
              <svg
                width="114"
                height="24"
                viewBox="0 0 114 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 24L8.82718 18.72V5.268L0 0V24ZM6.91293 6.4152V17.572L1.91503 20.56V3.4328L6.91293 6.4152ZM10.3555 6.1832V17.8032L20.0688 11.9928L10.3555 6.1832ZM16.2326 11.9912L12.2728 14.3416V9.6216L16.2326 11.9912ZM27.7104 5.72C25.8849 5.72 24.8884 6.84 24.8884 8.8032V15.1792C24.8884 17.1416 25.8849 18.2624 27.7104 18.2624C29.5359 18.2624 30.5331 17.1424 30.5331 15.1792V8.8C30.5308 6.8408 29.5335 5.72 27.7104 5.72ZM28.6737 15.3024C28.6737 16.1776 28.3024 16.5104 27.7104 16.5104C27.1183 16.5104 26.7471 16.1776 26.7471 15.3024V8.6808C26.7471 7.8008 27.1191 7.472 27.7104 7.472C28.3016 7.472 28.6737 7.8048 28.6737 8.6808V15.3024ZM33.5072 5.8624V15.3192C33.5072 16.1952 33.8784 16.5104 34.4705 16.5104C35.0625 16.5104 35.4291 16.1952 35.4291 15.3192V5.86H37.189V15.2C37.189 17.1624 36.2427 18.2832 34.4172 18.2832C32.5917 18.2832 31.6469 17.1592 31.6469 15.2V5.86L33.5072 5.8624ZM37.9177 5.8624H43.6643V7.6144H41.7184V18.1224H39.8589V7.612H37.9153L37.9177 5.8624ZM50.05 16.6336V14.7416C50.05 13.4616 49.7451 12.5344 48.815 12.1312C49.6432 11.7312 50.0323 10.9056 50.0323 9.644V8.684C50.0323 6.792 49.204 5.8632 47.2767 5.8632H44.4724V18.1224H46.3311V13.1296H46.9733C47.8224 13.1296 48.1906 13.5504 48.1906 14.6888V16.616C48.1906 17.6144 48.2585 17.8072 48.3596 18.1224H50.2492C50.0662 17.6672 50.05 17.2288 50.05 16.6336ZM48.1736 10.08C48.1736 11.0616 47.7514 11.3768 47.0582 11.3768H46.3311V7.612H47.2273C47.8864 7.612 48.1736 7.9976 48.1736 8.8728V10.08ZM51.2657 5.8584H53.1252V18.1224H51.2657V5.8584ZM57.2655 11.2888H59.8683V15.1776C59.8683 17.14 58.922 18.2608 57.0965 18.2608C55.271 18.2608 54.3247 17.1408 54.3247 15.1776V8.8C54.3247 6.8384 55.271 5.7168 57.0965 5.7168C58.922 5.7168 59.8683 6.8368 59.8683 8.8V9.9912H58.1107V8.6808C58.1107 7.8008 57.7387 7.472 57.1474 7.472C56.5562 7.472 56.1841 7.8048 56.1841 8.6808V15.3024C56.1841 16.1776 56.5554 16.4928 57.1474 16.4928C57.7395 16.4928 58.1107 16.1776 58.1107 15.3024V13.04H57.2617L57.2655 11.2888ZM62.9265 18.1208H61.0678V5.86H62.9265V11.1152H65.0399V5.86H66.9325V18.1224H65.0399V12.8672H62.9265V18.1208ZM67.743 5.8584H73.4896V7.6104H71.5452V18.1224H69.6866V7.612H67.743V5.8584ZM79.8614 5.8584H76.9206V18.1224H79.8614C81.7209 18.1224 82.6332 17.0536 82.6332 15.092V8.8904C82.634 6.9288 81.7217 5.86 79.8622 5.86L79.8614 5.8584ZM80.7746 15.1776C80.7746 16.0536 80.4195 16.3688 79.8275 16.3688H78.78V7.612H79.8275C80.4195 7.612 80.7746 7.9272 80.7746 8.8032V15.1776ZM83.8158 5.8584H85.6783V18.1224H83.8189L83.8158 5.8584ZM89.8156 11.2888H92.4183V15.1776C92.4183 17.14 91.4712 18.2608 89.6457 18.2608C87.8203 18.2608 86.8747 17.1408 86.8747 15.1776V8.8C86.8747 6.8384 87.821 5.7168 89.6457 5.7168C91.4705 5.7168 92.4183 6.8368 92.4183 8.8V9.9912H90.66V8.6808C90.66 7.8008 90.2887 7.472 89.6967 7.472C89.1047 7.472 88.7334 7.8048 88.7334 8.6808V15.3024C88.7334 16.1776 89.1054 16.4928 89.6967 16.4928C90.2879 16.4928 90.66 16.1776 90.66 15.3024V13.04H89.8156V11.2888ZM93.6171 5.8584H95.4811V18.1224H93.6217L93.6171 5.8584ZM96.287 5.8584H102.034V7.6104H100.09V18.1224H98.2306V7.612H96.287V5.8584ZM106.326 5.8584H103.605L101.712 18.1208H103.419L103.74 15.896H106.022L106.343 18.1208H108.217L106.326 5.8584ZM103.976 14.232L104.873 8.0304L105.768 14.232H103.976ZM109.082 5.86H110.94V16.3704H114V18.1224H109.082V5.86Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
