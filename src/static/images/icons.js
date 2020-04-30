const icons = [
  {
    type: 'email',
    tag: `<svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M20.6021 5.61339C20.7621 5.47615 21 5.60454 21 5.82147V14.8749C21 16.048 20.1182 16.9999 19.0312 16.9999H1.96875C0.881836 16.9999 0 16.048 0 14.8749V5.82589C0 5.60454 0.233789 5.48058 0.397852 5.61782C1.3166 6.38813 2.53477 7.36652 6.71836 10.647C7.58379 11.3288 9.04395 12.7631 10.5 12.7543C11.9643 12.7676 13.4531 11.3022 14.2857 10.647C18.4693 7.36652 19.6834 6.38371 20.6021 5.61339ZM10.5 11.3333C11.4516 11.351 12.8215 10.0406 13.5105 9.50052C18.9533 5.23724 19.3676 4.86536 20.6227 3.80286C20.8605 3.60365 21 3.29375 21 2.96615V2.125C21 0.951823 20.1182 0 19.0312 0H1.96875C0.881836 0 0 0.951823 0 2.125V2.96615C0 3.29375 0.139453 3.59922 0.377344 3.80286C1.63242 4.86094 2.04668 5.23724 7.48945 9.50052C8.17852 10.0406 9.54844 11.351 10.5 11.3333Z"/>
</svg>
`,
  },
  {
    type: 'telegram',
    tag: `<svg width="21" height="17.61" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M21.439 1.62189L18.2703 16.5656C18.0312 17.6203 17.4078 17.8828 16.5218 17.386L11.6937 13.8281L9.36403 16.0688C9.10622 16.3266 8.89059 16.5422 8.39372 16.5422L8.74059 11.625L17.689 3.53908C18.0781 3.1922 17.6047 3.00002 17.0843 3.34689L6.02184 10.3125L1.25934 8.82189C0.223404 8.49845 0.204654 7.78595 1.47497 7.28908L20.1031 0.112516C20.9656 -0.210922 21.7203 0.304703 21.439 1.62189Z"/>
</svg>
`,
  },
  {
    type: 'facebook',
    tag: `<svg width="12.85" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M12.5847 13.5L13.2513 9.15656H9.08362V6.33797C9.08362 5.14969 9.66581 3.99141 11.5324 3.99141H13.4271V0.293438C13.4271 0.293438 11.7077 0 10.0638 0C6.63159 0 4.38815 2.08031 4.38815 5.84625V9.15656H0.572998V13.5H4.38815V24H9.08362V13.5H12.5847Z" />
</svg>
`,
  },
  {
    type: 'instagram',
    tag: `<svg width="30" height="29" viewBox="0 0 30 29" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" d="M15.0063 7.81251C11.0313 7.81251 7.82505 11.0188 7.82505 14.9938C7.82505 18.9688 11.0313 22.175 15.0063 22.175C18.9813 22.175 22.1876 18.9688 22.1876 14.9938C22.1876 11.0188 18.9813 7.81251 15.0063 7.81251ZM15.0063 19.6625C12.4375 19.6625 10.3375 17.5688 10.3375 14.9938C10.3375 12.4188 12.4313 10.325 15.0063 10.325C17.5813 10.325 19.675 12.4188 19.675 14.9938C19.675 17.5688 17.575 19.6625 15.0063 19.6625ZM24.1563 7.51876C24.1563 8.45001 23.4063 9.19376 22.4813 9.19376C21.55 9.19376 20.8063 8.44376 20.8063 7.51876C20.8063 6.59376 21.5563 5.84376 22.4813 5.84376C23.4063 5.84376 24.1563 6.59376 24.1563 7.51876ZM28.9125 9.21876C28.8063 6.97501 28.2938 4.98751 26.6501 3.35001C25.0126 1.71251 23.025 1.20001 20.7813 1.08751C18.4688 0.956262 11.5375 0.956262 9.22505 1.08751C6.98755 1.19376 5.00005 1.70626 3.3563 3.34376C1.71255 4.98126 1.2063 6.96876 1.0938 9.21251C0.962549 11.525 0.962549 18.4563 1.0938 20.7688C1.20005 23.0125 1.71255 25 3.3563 26.6375C5.00005 28.275 6.9813 28.7875 9.22505 28.9C11.5375 29.0313 18.4688 29.0313 20.7813 28.9C23.025 28.7938 25.0126 28.2813 26.6501 26.6375C28.2875 25 28.8001 23.0125 28.9125 20.7688C29.0438 18.4563 29.0438 11.5313 28.9125 9.21876ZM25.9249 23.25C25.4374 24.475 24.4937 25.4188 23.2624 25.9125C21.4187 26.6438 17.0437 26.475 15.0062 26.475C12.9687 26.475 8.58741 26.6375 6.74991 25.9125C5.52491 25.425 4.58116 24.4813 4.08741 23.25C3.35616 21.4063 3.52491 17.0313 3.52491 14.9938C3.52491 12.9563 3.36241 8.57501 4.08741 6.73751C4.57491 5.51251 5.51866 4.56876 6.74991 4.07501C8.59366 3.34376 12.9687 3.51251 15.0062 3.51251C17.0437 3.51251 21.4249 3.35001 23.2624 4.07501C24.4874 4.56251 25.4312 5.50626 25.9249 6.73751C26.6562 8.58126 26.4874 12.9563 26.4874 14.9938C26.4874 17.0313 26.6562 21.4125 25.9249 23.25Z" />
</svg>
`,
  },
  {
    type: 'youtube',
    tag: `<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" class="svg-inline--fa fa-youtube svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>`,
  },
  {
    type: 'eye',
    tag: `<svg width="24" height="16" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M23.855 7.39167C21.5954 2.98292 17.1221 0 12 0C6.87789 0 2.40331 2.985 0.144977 7.39208C-0.0483257 7.77446 -0.0483257 8.22596 0.144977 8.60833C2.40456 13.0171 6.87789 16 12 16C17.1221 16 21.5966 13.015 23.855 8.60792C24.0483 8.22554 24.0483 7.77404 23.855 7.39167ZM12 14C8.68628 14 5.99998 11.3137 5.99998 8.00002C5.99998 4.68631 8.68628 2.00002 12 2.00002C15.3137 2.00002 18 4.68631 18 8.00002C18.0008 9.59156 17.3689 11.1181 16.2435 12.2435C15.1181 13.3689 13.5915 14.0008 12 14ZM12.0001 3.99998C11.643 4.00497 11.2883 4.05809 10.9455 4.1579C11.5295 4.95149 11.4462 6.05265 10.7494 6.74936C10.0527 7.44607 8.95158 7.52937 8.15799 6.9454C7.70959 8.59738 8.36464 10.3513 9.78616 11.305C11.2077 12.2586 13.079 12.1995 14.4375 11.158C15.796 10.1166 16.3391 8.32478 15.7873 6.70439C15.2355 5.084 13.7118 3.99596 12.0001 3.99998Z"/>
</svg>
`,
  },
  {
    type: 'comment',
    tag: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M13.9883 0H2.01173C0.910752 0 0.015625 0.895127 0.015625 1.9961V10.9786C0.015625 12.0795 0.910752 12.9747 2.01173 12.9747H5.00588V15.5945C5.00588 15.9002 5.3552 16.078 5.60159 15.8971L9.49711 12.9747H13.9883C15.0893 12.9747 15.9844 12.0795 15.9844 10.9786V1.9961C15.9844 0.895127 15.0893 0 13.9883 0ZM8.99808 8.23392C8.99808 8.37115 8.8858 8.48343 8.74857 8.48343H4.25734C4.12011 8.48343 4.00783 8.37115 4.00783 8.23392V7.73489C4.00783 7.59766 4.12011 7.48538 4.25734 7.48538H8.74857C8.8858 7.48538 8.99808 7.59766 8.99808 7.73489V8.23392ZM11.9922 5.23977C11.9922 5.377 11.88 5.48928 11.7427 5.48928H4.25734C4.12011 5.48928 4.00783 5.377 4.00783 5.23977V4.74074C4.00783 4.60351 4.12011 4.49123 4.25734 4.49123H11.7427C11.88 4.49123 11.9922 4.60351 11.9922 4.74074V5.23977Z"/>
</svg>
`,
  },
  {
    type: 'video',
    tag: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video" class="svg-inline--fa fa-video svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"></path></svg>`,
  },
  {
    type: 'camera',
    tag: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="camera" class="svg-inline--fa fa-camera svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg>`,
  },
  {
    type: 'phone',
    tag:
      '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt" class="svg-inline--fa fa-phone-alt svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>',
  },
  {
    type: 'search',
    tag: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M21.4802 19.8327L16.4317 14.7843C16.3361 14.6886 16.2113 14.6387 16.0782 14.6387H15.5293C16.8392 13.1208 17.6335 11.1455 17.6335 8.98309C17.6335 4.20492 13.7619 0.333313 8.98376 0.333313C4.20559 0.333313 0.333984 4.20492 0.333984 8.98309C0.333984 13.7613 4.20559 17.6329 8.98376 17.6329C11.1462 17.6329 13.1215 16.8386 14.6394 15.5286V16.0776C14.6394 16.2106 14.6934 16.3354 14.7849 16.431L19.8334 21.4795C20.0289 21.675 20.3449 21.675 20.5404 21.4795L21.4802 20.5397C21.6756 20.3442 21.6756 20.0282 21.4802 19.8327ZM8.98375 15.6368C5.3076 15.6368 2.33008 12.6592 2.33008 8.98309C2.33008 5.30693 5.3076 2.32941 8.98375 2.32941C12.6599 2.32941 15.6374 5.30693 15.6374 8.98309C15.6374 12.6592 12.6599 15.6368 8.98375 15.6368Z"/>
</svg>
`,
  },
  {
    type: 'share',
    tag: `<svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="svg-inline--fa svg-icon"
        >
          <path
            opacity="0.3"
            d="M13.5 6.37878V12.7538C6.23063 12.8588 3.09703 14.663 5.22234 21.4608C5.45672 22.215 4.54641 22.7996 3.90609 22.3341C1.85531 20.8425 0 17.9897 0 15.1097C0 7.97394 5.97047 6.46503 13.5 6.37878Z"
            fill="currentColor"
          />
          <path
            d="M23.7263 10.4859C23.6905 10.5273 23.6518 10.566 23.6105 10.6017L15.3605 17.7267C14.6391 18.3497 13.5 17.8458 13.5 16.875V2.62501C13.5 1.65657 14.6381 1.15032 15.3605 1.77376L23.6105 8.89876C23.8364 9.09384 23.9755 9.37069 23.9972 9.66837C24.0189 9.96605 23.9214 10.2602 23.7263 10.4859V10.4859Z"
            fill="currentColor"
          />
        </svg>`,
  },
  {
    type: 'calendar',
    tag: `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
      <path fill="currentColor" clip-rule="evenodd" d="M0.666748 19.6666C0.666748 20.7708 1.56258 21.6666 2.66675 21.6666H17.3334C18.4376 21.6666 19.3334 20.7708 19.3334 19.6666V8.33331H0.666748V19.6666ZM14.0001 11.5C14.0001 11.225 14.2251 11 14.5001 11H16.1667C16.4417 11 16.6667 11.225 16.6667 11.5V13.1666C16.6667 13.4416 16.4417 13.6666 16.1667 13.6666H14.5001C14.2251 13.6666 14.0001 13.4416 14.0001 13.1666V11.5ZM14.0001 16.8333C14.0001 16.5583 14.2251 16.3333 14.5001 16.3333H16.1667C16.4417 16.3333 16.6667 16.5583 16.6667 16.8333V18.5C16.6667 18.775 16.4417 19 16.1667 19H14.5001C14.2251 19 14.0001 18.775 14.0001 18.5V16.8333ZM8.66675 11.5C8.66675 11.225 8.89175 11 9.16675 11H10.8334C11.1084 11 11.3334 11.225 11.3334 11.5V13.1666C11.3334 13.4416 11.1084 13.6666 10.8334 13.6666H9.16675C8.89175 13.6666 8.66675 13.4416 8.66675 13.1666V11.5ZM8.66675 16.8333C8.66675 16.5583 8.89175 16.3333 9.16675 16.3333H10.8334C11.1084 16.3333 11.3334 16.5583 11.3334 16.8333V18.5C11.3334 18.775 11.1084 19 10.8334 19H9.16675C8.89175 19 8.66675 18.775 8.66675 18.5V16.8333ZM3.33341 11.5C3.33341 11.225 3.55841 11 3.83341 11H5.50008C5.77508 11 6.00008 11.225 6.00008 11.5V13.1666C6.00008 13.4416 5.77508 13.6666 5.50008 13.6666H3.83341C3.55841 13.6666 3.33341 13.4416 3.33341 13.1666V11.5ZM3.33341 16.8333C3.33341 16.5583 3.55841 16.3333 3.83341 16.3333H5.50008C5.77508 16.3333 6.00008 16.5583 6.00008 16.8333V18.5C6.00008 18.775 5.77508 19 5.50008 19H3.83341C3.55841 19 3.33341 18.775 3.33341 18.5V16.8333ZM17.3334 2.99998H15.3334V0.99998C15.3334 0.633313 15.0334 0.333313 14.6667 0.333313H13.3334C12.9667 0.333313 12.6667 0.633313 12.6667 0.99998V2.99998H7.33342V0.99998C7.33342 0.633313 7.03341 0.333313 6.66675 0.333313H5.33342C4.96675 0.333313 4.66675 0.633313 4.66675 0.99998V2.99998H2.66675C1.56258 2.99998 0.666748 3.89581 0.666748 4.99998V6.99998H19.3334V4.99998C19.3334 3.89581 18.4376 2.99998 17.3334 2.99998Z"/>
    </svg>
    `,
  },
  {
    type: 'calendar-alt',
    tag: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M15.75 6H17.25C17.6642 6 18 5.66421 18 5.25V0.75C18 0.335786 17.6642 0 17.25 0H15.75C15.3358 0 15 0.335786 15 0.75V5.25C15 5.66421 15.3358 6 15.75 6ZM1.5 9V21.75C1.5 22.9926 2.50736 24 3.75 24H20.25C21.4926 24 22.5 22.9926 22.5 21.75V9H1.5ZM7.5 20.4375C7.5 20.7482 7.24816 21 6.9375 21H5.0625C4.75184 21 4.5 20.7482 4.5 20.4375V18.5625C4.5 18.2518 4.75184 18 5.0625 18H6.9375C7.24816 18 7.5 18.2518 7.5 18.5625V20.4375ZM6.9375 15C7.24816 15 7.5 14.7482 7.5 14.4375V12.5625C7.5 12.2518 7.24816 12 6.9375 12H5.0625C4.75184 12 4.5 12.2518 4.5 12.5625V14.4375C4.5 14.7482 4.75184 15 5.0625 15H6.9375ZM13.5 20.4375C13.5 20.7482 13.2482 21 12.9375 21H11.0625C10.7518 21 10.5 20.7482 10.5 20.4375V18.5625C10.5 18.2518 10.7518 18 11.0625 18H12.9375C13.2482 18 13.5 18.2518 13.5 18.5625V20.4375ZM12.9375 15C13.2482 15 13.5 14.7482 13.5 14.4375V12.5625C13.5 12.2518 13.2482 12 12.9375 12H11.0625C10.7518 12 10.5 12.2518 10.5 12.5625V14.4375C10.5 14.7482 10.7518 15 11.0625 15H12.9375ZM19.5 20.4375C19.5 20.7482 19.2482 21 18.9375 21H17.0625C16.7518 21 16.5 20.7482 16.5 20.4375V18.5625C16.5 18.2518 16.7518 18 17.0625 18H18.9375C19.2482 18 19.5 18.2518 19.5 18.5625V20.4375ZM18.9375 15C19.2482 15 19.5 14.7482 19.5 14.4375V12.5625C19.5 12.2518 19.2482 12 18.9375 12H17.0625C16.7518 12 16.5 12.2518 16.5 12.5625V14.4375C16.5 14.7482 16.7518 15 17.0625 15H18.9375ZM8.25 6H6.75C6.33579 6 6 5.66421 6 5.25V0.75C6 0.335786 6.33579 0 6.75 0H8.25C8.66421 0 9 0.335786 9 0.75V5.25C9 5.66421 8.66421 6 8.25 6Z" fill="#1D9E74"/>
      <path d="M22.5 5.25V9H1.5V5.25C1.5 4.00736 2.50736 3 3.75 3H6V5.25C6 5.66421 6.33579 6 6.75 6H8.25C8.66421 6 9 5.66421 9 5.25V3H15V5.25C15 5.66421 15.3358 6 15.75 6H17.25C17.6642 6 18 5.66421 18 5.25V3H20.25C21.4926 3 22.5 4.00736 22.5 5.25Z" fill="#1D9E74"/>
    </svg>
    `,
  },
  {
    type: 'location',
    tag: `<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.38338 15.6772C0.842813 9.09472 0 8.41916 0 6C0 2.68628 2.68628 0 6 0C9.31372 0 12 2.68628 12 6C12 8.41916 11.1572 9.09472 6.61662 15.6772C6.31866 16.1076 5.68131 16.1076 5.38338 15.6772ZM6 8.5C7.38072 8.5 8.5 7.38072 8.5 6C8.5 4.61928 7.38072 3.5 6 3.5C4.61928 3.5 3.5 4.61928 3.5 6C3.5 7.38072 4.61928 8.5 6 8.5Z" fill="#242424"/>
    </svg>
    `,
  },
  {
    type: 'expand',
    tag: `<svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32.0555" rx="32" ry="32.0555" fill="black" fill-opacity="0.8"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8201 32.9719L31.0852 33.2375C31.3049 33.4575 31.3049 33.8143 31.0852 34.0344L24.0606 41.0711H26.9375C27.2481 41.0711 27.5 41.3234 27.5 41.6346V42.0103C27.5 42.3214 27.2481 42.5737 26.9375 42.5737H22.0625C21.7519 42.5737 21.5 42.3214 21.5 42.0103V37.1268C21.5 36.8156 21.7519 36.5633 22.0625 36.5633H22.4375C22.7481 36.5633 23 36.8156 23 37.1268V40.0087L30.0246 32.9719C30.2443 32.7518 30.6005 32.7518 30.8201 32.9719ZM41.9375 21.5373H37.0625C36.7519 21.5373 36.5 21.7896 36.5 22.1008V22.4764C36.5 22.7876 36.7519 23.0399 37.0625 23.0399H39.9394L32.9148 30.0767C32.6951 30.2967 32.6951 30.6535 32.9148 30.8736L33.1799 31.1392C33.3995 31.3592 33.7557 31.3592 33.9754 31.1392L41 24.1024V26.9842C41 27.2954 41.2519 27.5477 41.5625 27.5477H41.9375C42.2481 27.5477 42.5 27.2954 42.5 26.9842V22.1008C42.5 21.7896 42.2481 21.5373 41.9375 21.5373Z" fill="white"/>
    </svg>
    `,
  },
  {
    type: 'crest',
    tag: `<svg width="40" height="45" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7796 43L25.6281 40.2174C25.4966 39.843 25.4257 39.4383 25.4257 39.0133C25.4257 37.0099 27.0447 35.3909 29.0481 35.3909C29.9588 35.3909 30.7885 35.7248 31.426 36.2813L37.6387 30.5239C34.8865 27.6908 33.1866 23.8255 33.1866 19.5656C33.1866 15.2754 34.9067 11.3798 37.6994 8.54664L31.0415 2C28.1172 4.80281 24.1407 6.52295 19.7796 6.52295C15.4085 6.52295 11.442 4.80281 8.5178 2L1.84973 8.54664C4.64243 11.3798 6.36256 15.2754 6.36256 19.5656C6.36256 23.8255 4.66266 27.6908 1.91044 30.5239L8.12318 36.2813C8.76064 35.7248 9.59035 35.3909 10.501 35.3909C12.5045 35.3909 14.1234 37.0099 14.1234 39.0133C14.1234 39.4383 14.0526 39.843 13.9211 40.2174L19.7796 43Z" stroke="white" stroke-opacity="0.24" stroke-width="2"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2939 12L15.4111 12.8385V13.4534C14.8915 13.9006 14.2681 14.9627 15.9306 15.6335C17.5931 16.3043 19.7837 16.3229 20.6713 16.2484C21.5371 16.1925 23.4507 15.9018 24.178 15.1863C24.9054 14.4708 24.3512 13.8074 23.9832 13.5652V12.8385L27.1004 12C29.2434 13.2857 28.4195 15.277 27.1653 15.7453C27.1653 15.7915 27.1681 15.8354 27.1709 15.8785C27.1847 16.0962 27.1971 16.2916 26.8406 16.6397C26.7181 16.7593 26.5086 16.9082 26.2226 17.0698C26.4977 19.2547 26.5343 25.2033 26.5391 26.7471C26.5951 26.8008 26.6461 26.8444 26.691 26.8833C26.9038 27.0674 26.997 27.1481 26.997 27.7139H27.2256V28.6284H11.6787V27.7139H12.1358C12.1949 27.109 12.2669 27.0451 12.4402 26.8915C12.4842 26.8526 12.5346 26.8079 12.5931 26.7471C12.6046 23.7242 12.7515 18.8196 12.9238 17.0409C12.5952 16.8399 12.3952 16.6442 12.3588 16.472C12.3551 16.454 12.351 16.4366 12.3468 16.4186C12.3223 16.3135 12.2939 16.1913 12.2939 15.8571C11.1899 15.1304 9.90408 13.4757 12.2939 12ZM14.1612 17.6057C14.3849 20.1003 14.4167 25.3161 14.4212 26.7471C14.4772 26.8009 14.5285 26.8445 14.5735 26.8834C14.7862 27.0675 14.8793 27.1481 14.8794 27.7139H15.4677C15.5268 27.1099 15.5988 27.046 15.772 26.8925C15.816 26.8536 15.8664 26.8088 15.9248 26.748C15.9361 23.8686 16.0749 19.8065 16.2404 18.1785C15.4626 18.0185 14.7541 17.8194 14.1612 17.6057ZM17.4696 18.3885C17.7122 20.5442 17.7479 25.3757 17.7531 26.748C17.8091 26.8019 17.8603 26.8455 17.9053 26.8844C18.1179 27.0684 18.211 27.149 18.2111 27.7139H21.0854C21.1445 27.1099 21.2165 27.046 21.3897 26.8925C21.4337 26.8536 21.4841 26.8088 21.5425 26.748C21.5532 24.0028 21.68 20.1826 21.8351 18.4217C21.4048 18.4791 20.9548 18.5202 20.4883 18.5402C19.4688 18.5841 18.4385 18.5209 17.4696 18.3885ZM23.0653 18.2053C23.3278 20.2569 23.3654 25.3353 23.3708 26.748C23.4268 26.8019 23.4779 26.8455 23.523 26.8844C23.7355 27.0684 23.8287 27.149 23.8288 27.7139H24.2535C24.3126 27.109 24.3846 27.0451 24.5579 26.8915C24.6019 26.8526 24.6523 26.8079 24.7107 26.7471C24.7211 24.0145 24.8425 19.7442 24.9929 17.6354C24.4432 17.8449 23.7941 18.0454 23.0653 18.2053Z" fill="white"/>
      <path d="M10.764 29.0854H9.84961V30H29.5118V29.0854H28.1399V28.6284H10.764V29.0854Z" fill="white"/>
    </svg>
    `,
  },
  {
    type: 'clock',
    tag: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.25C3.71875 0.25 0.25 3.71875 0.25 8C0.25 12.2812 3.71875 15.75 8 15.75C12.2812 15.75 15.75 12.2812 15.75 8C15.75 3.71875 12.2812 0.25 8 0.25ZM9.78438 11.1906L7.02812 9.1875C6.93125 9.11563 6.875 9.00313 6.875 8.88437V3.625C6.875 3.41875 7.04375 3.25 7.25 3.25H8.75C8.95625 3.25 9.125 3.41875 9.125 3.625V7.92812L11.1094 9.37187C11.2781 9.49375 11.3125 9.72812 11.1906 9.89688L10.3094 11.1094C10.1875 11.275 9.95312 11.3125 9.78438 11.1906Z" fill="#242424"/>
</svg>
`,
  },
  {
    type: 'crest-location',
    tag: `<svg width="40" height="45" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.9299 43L25.7784 40.2174C25.6468 39.843 25.576 39.4383 25.576 39.0133C25.576 37.0099 27.195 35.3909 29.1984 35.3909C30.1091 35.3909 30.9388 35.7248 31.5763 36.2813L37.789 30.5239C35.0368 27.6908 33.3369 23.8255 33.3369 19.5656C33.3369 15.2754 35.057 11.3798 37.8497 8.54664L31.1918 2C28.2675 4.80281 24.291 6.52295 19.9299 6.52295C15.5587 6.52295 11.5923 4.80281 8.66806 2L2 8.54664C4.79269 11.3798 6.51283 15.2754 6.51283 19.5656C6.51283 23.8255 4.81293 27.6908 2.06071 30.5239L8.27344 36.2813C8.91091 35.7248 9.74062 35.3909 10.6513 35.3909C12.6547 35.3909 14.2737 37.0099 14.2737 39.0133C14.2737 39.4383 14.2029 39.843 14.0713 40.2174L19.9299 43Z" stroke="white" stroke-opacity="0.24" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.234 29.6467C14.1472 22.2723 13.203 21.5155 13.203 18.8053C13.203 15.0929 16.2125 12.0835 19.9248 12.0835C23.6372 12.0835 26.6466 15.0929 26.6466 18.8053C26.6466 21.5155 25.7024 22.2723 20.6156 29.6467C20.2818 30.1289 19.5678 30.1289 19.234 29.6467ZM19.9248 21.6061C21.4717 21.6061 22.7256 20.3522 22.7256 18.8053C22.7256 17.2585 21.4717 16.0046 19.9248 16.0046C18.378 16.0046 17.1241 17.2585 17.1241 18.8053C17.1241 20.3522 18.378 21.6061 19.9248 21.6061Z" fill="white"/>
</svg>
`,
  },
  {
    type: 'footer-instagram',
    tag: `<svg width="58" height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M29.0121 14.6249C21.0621 14.6249 14.6496 21.0374 14.6496 28.9874C14.6496 36.9374 21.0621 43.3499 29.0121 43.3499C36.9621 43.3499 43.3746 36.9374 43.3746 28.9874C43.3746 21.0374 36.9621 14.6249 29.0121 14.6249ZM29.0121 38.3249C23.8746 38.3249 19.6746 34.1374 19.6746 28.9874C19.6746 23.8374 23.8621 19.6499 29.0121 19.6499C34.1621 19.6499 38.3496 23.8374 38.3496 28.9874C38.3496 34.1374 34.1496 38.3249 29.0121 38.3249ZM47.3121 14.0374C47.3121 15.8999 45.8121 17.3874 43.9621 17.3874C42.0996 17.3874 40.6121 15.8874 40.6121 14.0374C40.6121 12.1874 42.1121 10.6874 43.9621 10.6874C45.8121 10.6874 47.3121 12.1874 47.3121 14.0374ZM56.8246 17.4374C56.6121 12.9499 55.5871 8.9749 52.2996 5.6999C49.0246 2.4249 45.0496 1.3999 40.5621 1.1749C35.9371 0.912402 22.0746 0.912402 17.4496 1.1749C12.9746 1.3874 8.99961 2.4124 5.71211 5.6874C2.42461 8.9624 1.41211 12.9374 1.18711 17.4249C0.924609 22.0499 0.924609 35.9124 1.18711 40.5374C1.39961 45.0249 2.42461 48.9999 5.71211 52.2749C8.99961 55.5499 12.9621 56.5749 17.4496 56.7999C22.0746 57.0624 35.9371 57.0624 40.5621 56.7999C45.0496 56.5874 49.0246 55.5624 52.2996 52.2749C55.5746 48.9999 56.5996 45.0249 56.8246 40.5374C57.0871 35.9124 57.0871 22.0624 56.8246 17.4374ZM50.8491 45.4999C49.8741 47.9499 47.9866 49.8374 45.5241 50.8249C41.8366 52.2874 33.0866 51.9499 29.0116 51.9499C24.9366 51.9499 16.1741 52.2749 12.4991 50.8249C10.0491 49.8499 8.16162 47.9624 7.17412 45.4999C5.71162 41.8124 6.04912 33.0624 6.04912 28.9874C6.04912 24.9124 5.72412 16.1499 7.17412 12.4749C8.14912 10.0249 10.0366 8.13738 12.4991 7.14988C16.1866 5.68738 24.9366 6.02488 29.0116 6.02488C33.0866 6.02488 41.8491 5.69988 45.5241 7.14988C47.9741 8.12488 49.8616 10.0124 50.8491 12.4749C52.3116 16.1624 51.9741 24.9124 51.9741 28.9874C51.9741 33.0624 52.3116 41.8249 50.8491 45.4999Z"/>
</svg>
`,
  },
  {
    type: 'footer-telegram',
    tag: `<svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M55.8374 4.32488L47.3874 44.1749C46.7499 46.9874 45.0874 47.6874 42.7249 46.3624L29.8499 36.8749L23.6374 42.8499C22.9499 43.5374 22.3749 44.1124 21.0499 44.1124L21.9749 30.9999L45.8374 9.43738C46.8749 8.51238 45.6124 7.99988 44.2249 8.92488L14.7249 27.4999L2.02491 23.5249C-0.737588 22.6624 -0.787588 20.7624 2.59991 19.4374L52.2749 0.299879C54.5749 -0.562621 56.5874 0.812379 55.8374 4.32488Z" />
</svg>
`,
  },
  {
    type: 'footer-facebook',
    tag: `<svg width="36" height="64" viewBox="0 0 36 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M32.8926 36L34.6701 24.4175H23.5563V16.9013C23.5563 13.7325 25.1088 10.6438 30.0863 10.6438H35.1388V0.7825C35.1388 0.7825 30.5538 0 26.1701 0C17.0176 0 11.0351 5.5475 11.0351 15.59V24.4175H0.861328V36H11.0351V64H23.5563V36H32.8926Z"/>
</svg>
`,
  },
  {
    type: 'footer-chevron',
    tag: `<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
      <path fill="currentColor" clip-rule="evenodd" d="M13.8594 1.0813L13.6375 0.859424C13.4906 0.712549 13.2531 0.712549 13.1062 0.859424L7 6.9688L0.890625 0.859424C0.74375 0.712549 0.50625 0.712549 0.359375 0.859424L0.1375 1.0813C-0.00937499 1.22817 -0.00937499 1.46567 0.1375 1.61255L6.73125 8.20943C6.87812 8.3563 7.11562 8.3563 7.2625 8.20943L13.8562 1.61255C14.0062 1.46567 14.0062 1.22817 13.8594 1.0813Z"/>
      </svg>
    `,
  },
  {
    type: 'chevron-left',
    tag: `<svg className={className} width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" fill="#242424" />
      </svg>
    `,
  },
  {
    type: 'chevron-right',
    tag: `<svg className={className} width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.589844 10.59L5.16984 6L0.589844 1.41L1.99984 0L7.99984 6L1.99984 12L0.589844 10.59Z" fill="#242424" />
      </svg>
    `,
  },
  {
    type: 'likes',
    tag: `<svg width="5" height="24" viewBox="0 0 5 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41669 18.3124H0L0.0622069 -6.10352e-05H4.61886L4.41669 18.3124Z" fill="#242424"/>
      <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M0 23.9999H4.41669V20.0873H0V23.9999Z" fill="#242424"/>
    </svg>
    `,
  },
  {
    type: 'like-comment',
    tag: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 7H0.75C0.335781 7 0 7.33578 0 7.75V15.25C0 15.6642 0.335781 16 0.75 16H3.25C3.66422 16 4 15.6642 4 15.25V7.75C4 7.33578 3.66422 7 3.25 7ZM2 14.75C1.58578 14.75 1.25 14.4142 1.25 14C1.25 13.5858 1.58578 13.25 2 13.25C2.41422 13.25 2.75 13.5858 2.75 14C2.75 14.4142 2.41422 14.75 2 14.75ZM12 2.54538C12 3.87088 11.1884 4.61438 10.9601 5.5H14.1389C15.1826 5.5 15.9951 6.36706 16 7.31556C16.0026 7.87613 15.7642 8.47959 15.3925 8.85297L15.3891 8.85641C15.6964 9.58569 15.6465 10.6076 15.0982 11.3398C15.3695 12.149 15.096 13.1431 14.5863 13.676C14.7206 14.2259 14.6564 14.6939 14.3941 15.0707C13.7563 15.9871 12.1755 16 10.8387 16L10.7498 16C9.24084 15.9994 8.00587 15.45 7.01356 15.0086C6.51491 14.7867 5.86291 14.5121 5.36822 14.503C5.16384 14.4993 5 14.3325 5 14.1281V7.44775C5 7.34775 5.04006 7.25178 5.11119 7.18147C6.34912 5.95822 6.88144 4.66313 7.89609 3.64675C8.35872 3.18325 8.52697 2.48312 8.68962 1.80606C8.82859 1.22791 9.11928 0 9.75 0C10.5 0 12 0.25 12 2.54538Z" fill="black"/>
</svg>
`,
  },
  {
    type: 'answer-comment',
    tag: `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.259652 4.93237L5.75978 0.182841C6.24122 -0.23294 7 0.104591 7 0.750466V3.25212C12.0197 3.30959 16 4.31562 16 9.07268C16 10.9927 14.7631 12.8948 13.3958 13.8893C12.9692 14.1997 12.3611 13.8102 12.5184 13.3071C13.9354 8.77547 11.8463 7.5724 7 7.50265V10.25C7 10.8969 6.24062 11.2329 5.75978 10.8176L0.259652 6.06762C-0.0863164 5.76881 -0.0867851 5.23159 0.259652 4.93237Z" fill="black"/>
</svg>
`,
  },
  {
    type: 'complain-comment',
    tag: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9239 3.08696C9.24931 3.08696 7.86628 1.99999 5.76088 1.99999C4.98103 1.99999 4.28247 2.13699 3.63447 2.3754C3.72427 2.14086 3.7625 1.88972 3.74653 1.63908C3.69116 0.750458 2.96269 0.0376765 2.07306 0.00148899C1.07328 -0.0391985 0.25 0.759239 0.25 1.74999C0.25 2.34455 0.546781 2.86952 1 3.18577V15.25C1 15.6642 1.33578 16 1.75 16H2.25C2.66422 16 3 15.6642 3 15.25V12.3C3.88472 11.923 4.98694 11.6087 6.57609 11.6087C8.25072 11.6087 9.63372 12.6956 11.7391 12.6956C13.2444 12.6956 14.4475 12.1865 15.5674 11.4188C15.8388 11.2329 16 10.9241 16 10.5951V2.99827C16 2.26724 15.2416 1.78358 14.5786 2.09152C13.5055 2.5899 12.1894 3.08696 10.9239 3.08696Z" fill="black"/>
</svg>
`,
  },
  {
    type: 'close-comment',
    tag: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.59094 8L14.3984 3.1925L15.3898 2.20109C15.5361 2.05484 15.5361 1.81719 15.3898 1.67094L14.3291 0.610156C14.1828 0.463906 13.9452 0.463906 13.7989 0.610156L8 6.40906L2.20109 0.609687C2.05484 0.463437 1.81719 0.463437 1.67094 0.609687L0.609687 1.67047C0.463437 1.81672 0.463437 2.05437 0.609687 2.20062L6.40906 8L0.609687 13.7989C0.463437 13.9452 0.463437 14.1828 0.609687 14.3291L1.67047 15.3898C1.81672 15.5361 2.05437 15.5361 2.20062 15.3898L8 9.59094L12.8075 14.3984L13.7989 15.3898C13.9452 15.5361 14.1828 15.5361 14.3291 15.3898L15.3898 14.3291C15.5361 14.1828 15.5361 13.9452 15.3898 13.7989L9.59094 8Z" fill="black"/>
</svg>
`,
  },
  {
    type: 'comment-alt',
    tag: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99287 0.666748H2.00847C1.27449 0.666748 0.677734 1.2635 0.677734 1.99748V7.98579C0.677734 8.71977 1.27449 9.31652 2.00847 9.31652H4.00457V11.0631C4.00457 11.2669 4.23745 11.3854 4.40171 11.2648L6.99872 9.31652H9.99287C10.7269 9.31652 11.3236 8.71977 11.3236 7.98579V1.99748C11.3236 1.2635 10.7269 0.666748 9.99287 0.666748ZM6.66604 6.15604C6.66604 6.24752 6.59119 6.32238 6.4997 6.32238H3.50555C3.41406 6.32238 3.33921 6.24752 3.33921 6.15604V5.82335C3.33921 5.73186 3.41406 5.65701 3.50555 5.65701H6.4997C6.59119 5.65701 6.66604 5.73186 6.66604 5.82335V6.15604ZM8.66215 4.15993C8.66215 4.25142 8.58729 4.32627 8.4958 4.32627H3.50555C3.41406 4.32627 3.33921 4.25142 3.33921 4.15993V3.82725C3.33921 3.73576 3.41406 3.66091 3.50555 3.66091H8.4958C8.58729 3.66091 8.66215 3.73576 8.66215 3.82725V4.15993Z" fill="#A6A6A6"/>
</svg>
`,
  },
  {
    type: 'articles-small',
    tag: `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8882 0.444458H2.29564C2.05018 0.444458 1.8512 0.643439 1.8512 0.888902V1.03705H1.11046C0.864997 1.03705 0.666016 1.23603 0.666016 1.48149V6.51853C0.666016 7.09127 1.13031 7.55557 1.70305 7.55557H10.4438C10.9347 7.55557 11.3327 7.1576 11.3327 6.66668V0.888902C11.3327 0.643439 11.1337 0.444458 10.8882 0.444458ZM1.7034 6.66668C1.62158 6.66668 1.55525 6.60035 1.55525 6.51853V1.92594H1.85155V6.51853C1.85155 6.60035 1.78522 6.66668 1.7034 6.66668ZM6.07306 6.37038H3.25825C3.13552 6.37038 3.03602 6.27088 3.03602 6.14816V6.00001C3.03602 5.87729 3.13552 5.77779 3.25825 5.77779H6.07306C6.19578 5.77779 6.29528 5.87729 6.29528 6.00001V6.14816C6.29528 6.27088 6.19578 6.37038 6.07306 6.37038ZM9.92536 6.37038H7.11054C6.98782 6.37038 6.88832 6.27088 6.88832 6.14816V6.00001C6.88832 5.87729 6.98782 5.77779 7.11054 5.77779H9.92536C10.0481 5.77779 10.1476 5.87729 10.1476 6.00001V6.14816C10.1476 6.27088 10.0481 6.37038 9.92536 6.37038ZM6.07306 4.5926H3.25825C3.13552 4.5926 3.03602 4.4931 3.03602 4.37038V4.22223C3.03602 4.09951 3.13552 4.00001 3.25825 4.00001H6.07306C6.19578 4.00001 6.29528 4.09951 6.29528 4.22223V4.37038C6.29528 4.4931 6.19578 4.5926 6.07306 4.5926ZM9.92536 4.5926H7.11054C6.98782 4.5926 6.88832 4.4931 6.88832 4.37038V4.22223C6.88832 4.09951 6.98782 4.00001 7.11054 4.00001H9.92536C10.0481 4.00001 10.1476 4.09951 10.1476 4.22223V4.37038C10.1476 4.4931 10.0481 4.5926 9.92536 4.5926ZM9.92491 2.81482H3.25825C3.13552 2.81482 3.03602 2.71532 3.03602 2.5926V1.85186C3.03602 1.72914 3.13552 1.62964 3.25825 1.62964H9.92491C10.0476 1.62964 10.1471 1.72914 10.1471 1.85186V2.5926C10.1471 2.71532 10.0476 2.81482 9.92491 2.81482Z" fill="#242424"/>
</svg>
`,
  },
  {
    type: 'comment-small',
    tag: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99287 0.666687H2.00847C1.27449 0.666687 0.677734 1.26344 0.677734 1.99742V7.98573C0.677734 8.71971 1.27449 9.31646 2.00847 9.31646H4.00457V11.063C4.00457 11.2668 4.23745 11.3853 4.40171 11.2647L6.99872 9.31646H9.99287C10.7269 9.31646 11.3236 8.71971 11.3236 7.98573V1.99742C11.3236 1.26344 10.7269 0.666687 9.99287 0.666687ZM6.66604 6.15598C6.66604 6.24746 6.59119 6.32232 6.4997 6.32232H3.50555C3.41406 6.32232 3.33921 6.24746 3.33921 6.15598V5.82329C3.33921 5.7318 3.41406 5.65695 3.50555 5.65695H6.4997C6.59119 5.65695 6.66604 5.7318 6.66604 5.82329V6.15598ZM8.66215 4.15987C8.66215 4.25136 8.58729 4.32621 8.4958 4.32621H3.50555C3.41406 4.32621 3.33921 4.25136 3.33921 4.15987V3.82719C3.33921 3.7357 3.41406 3.66084 3.50555 3.66084H8.4958C8.58729 3.66084 8.66215 3.7357 8.66215 3.82719V4.15987Z" fill="#2B3330"/>
</svg>
`,
  },
  {
    type: 'eye-small',
    tag: `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2682 3.72964C10.264 1.7702 8.27582 0.444458 5.99934 0.444458C3.72286 0.444458 1.73415 1.77112 0.73045 3.72983C0.644538 3.89977 0.644538 4.10044 0.73045 4.27038C1.73471 6.22983 3.72286 7.55557 5.99934 7.55557C8.27582 7.55557 10.2645 6.2289 11.2682 4.2702C11.3541 4.10025 11.3541 3.89959 11.2682 3.72964ZM5.99933 6.66667C4.52657 6.66667 3.33267 5.47276 3.33267 4C3.33267 2.52724 4.52657 1.33333 5.99933 1.33333C7.47209 1.33333 8.666 2.52724 8.666 4C8.66635 4.70735 8.3855 5.38583 7.88533 5.886C7.38516 6.38617 6.70668 6.66701 5.99933 6.66667ZM5.99928 2.22225C5.8406 2.22446 5.68294 2.24807 5.53057 2.29243C5.79011 2.64514 5.75309 3.13454 5.44344 3.44419C5.13379 3.75384 4.64439 3.79086 4.29168 3.53132C4.09239 4.26554 4.38353 5.04507 5.01531 5.46891C5.6471 5.89274 6.47881 5.86647 7.08259 5.4036C7.68636 4.94073 7.92771 4.14438 7.68248 3.4242C7.43725 2.70403 6.76005 2.22046 5.99928 2.22225Z" fill="#2B3330"/>
</svg>
`,
  },
];

export default icons;
