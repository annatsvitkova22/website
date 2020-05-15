import React from 'react';
import * as classnames from 'classnames';

const FormSubmit = ({
  sent,
  handleSubmit = () => {},
  formValid,
  isSending,
  text,
  className,
}) => {
  return (
    <button
      className={classnames(
        'zm-form__submit zm-button',
        {
          'zm-form__submit--sent': sent,
        },
        className
      )}
      disabled={!formValid || isSending || sent}
      onClick={handleSubmit}
    >
      {!sent && !isSending && text}
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
            />
          </svg>
        </>
      )}
    </button>
  );
};

export default FormSubmit;
