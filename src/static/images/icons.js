const icons = [
  {
    type: 'email',
    tag: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>`,
  },
  {
    type: 'telegram',
    tag: `<svg width="22" height="18" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M21.439 1.62189L18.2703 16.5656C18.0312 17.6203 17.4078 17.8828 16.5218 17.386L11.6937 13.8281L9.36403 16.0688C9.10622 16.3266 8.89059 16.5422 8.39372 16.5422L8.74059 11.625L17.689 3.53908C18.0781 3.1922 17.6047 3.00002 17.0843 3.34689L6.02184 10.3125L1.25934 8.82189C0.223404 8.49845 0.204654 7.78595 1.47497 7.28908L20.1031 0.112516C20.9656 -0.210922 21.7203 0.304703 21.439 1.62189Z"/>
</svg>
`,
  },
  {
    type: 'facebook',
    tag: `<svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
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
    type: 'location',
    tag: `<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M7.17783 21.2362C1.12375 12.4596 0 11.5589 0 8.33331C0 3.91502 3.58171 0.333313 8 0.333313C12.4183 0.333313 16 3.91502 16 8.33331C16 11.5589 14.8763 12.4596 8.82217 21.2362C8.42488 21.8101 7.57508 21.8101 7.17783 21.2362ZM8 11.6666C9.84096 11.6666 11.3333 10.1743 11.3333 8.33331C11.3333 6.49235 9.84096 4.99998 8 4.99998C6.15904 4.99998 4.66667 6.49235 4.66667 8.33331C4.66667 10.1743 6.15904 11.6666 8 11.6666Z" />
</svg>
`,
  },
  {
    type: 'expand',
    tag: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill="currentColor" clip-rule="evenodd" d="M9.82011 11.9148L10.0852 12.1799C10.3049 12.3996 10.3049 12.7557 10.0852 12.9754L3.06064 20H5.9375C6.24814 20 6.5 20.2519 6.5 20.5625V20.9375C6.5 21.2482 6.24814 21.5 5.9375 21.5H1.0625C0.751859 21.5 0.5 21.2482 0.5 20.9375V16.0625C0.5 15.7519 0.751859 15.5 1.0625 15.5H1.4375C1.74814 15.5 2 15.7519 2 16.0625V18.9394L9.02459 11.9148C9.2443 11.6951 9.60045 11.6951 9.82011 11.9148ZM20.9375 0.5H16.0625C15.7519 0.5 15.5 0.751859 15.5 1.0625V1.4375C15.5 1.74814 15.7519 2 16.0625 2H18.9394L11.9148 9.02459C11.6951 9.24425 11.6951 9.60041 11.9148 9.82011L12.1799 10.0852C12.3995 10.3049 12.7557 10.3049 12.9754 10.0852L20 3.06064V5.9375C20 6.24814 20.2519 6.5 20.5625 6.5H20.9375C21.2481 6.5 21.5 6.24814 21.5 5.9375V1.0625C21.5 0.751859 21.2481 0.5 20.9375 0.5Z"/>
</svg>
`,
  },
  {
    type: 'crest',
    tag: `<svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg" class='svg-icon'>
<path d="M3.68371 0L8.18625 1.21115V2.09933C7.43583 2.74528 6.53532 4.27941 8.93668 5.24833C11.338 6.21725 14.5023 6.24416 15.7843 6.13651C17.035 6.05576 19.7991 5.6359 20.8496 4.60238C21.9002 3.56886 21.0998 2.61071 20.5682 2.26082V1.21115L25.0708 0C28.1663 1.8571 26.9762 4.73348 25.1646 5.40981C25.1646 5.47654 25.1686 5.54004 25.1726 5.60229C25.1926 5.91668 25.2106 6.19899 24.6956 6.70171C24.5185 6.87459 24.2156 7.08985 23.8021 7.32345C24.1993 10.48 24.2521 19.0706 24.2592 21.3007C24.34 21.3784 24.4135 21.4414 24.4786 21.4976C24.7859 21.7636 24.9204 21.88 24.9204 22.6977H20.9575C21.0429 21.8234 21.1469 21.7313 21.3972 21.5093C21.4607 21.4531 21.5336 21.3885 21.618 21.3007H21.6194C21.6344 17.354 21.8085 11.1867 22.0256 8.14036C21.2322 8.44271 20.2954 8.73205 19.2436 8.96292C19.6226 11.927 19.6769 19.2598 19.6847 21.3007C19.7656 21.3784 19.8393 21.4414 19.9044 21.4976C20.2117 21.7636 20.3462 21.88 20.3462 22.6977H16.3833C16.4687 21.8234 16.5726 21.7313 16.823 21.5093C16.8865 21.4531 16.9594 21.3884 17.0438 21.3007H17.0452C17.0606 17.3361 17.2424 11.8198 17.4664 9.27561C16.8445 9.35854 16.1943 9.41797 15.52 9.44699C14.0483 9.51033 12.561 9.41909 11.1621 9.22814C11.5124 12.3427 11.5639 19.3183 11.5714 21.3007C11.6523 21.3784 11.726 21.4413 11.791 21.4976C12.0984 21.7635 12.2329 21.88 12.2329 22.6977H8.26998C8.35538 21.8234 8.45936 21.7313 8.70975 21.5093C8.77322 21.4531 8.8461 21.3885 8.93047 21.3007H8.93187C8.94812 17.1427 9.14728 11.2777 9.38617 8.92494C8.26228 8.69377 7.23842 8.40613 6.38175 8.09733C6.7048 11.7008 6.75069 19.2335 6.75721 21.3007C6.83806 21.3784 6.91157 21.4413 6.97659 21.4976C7.28391 21.7635 7.41844 21.88 7.41844 22.6977H3.45553C3.54093 21.8234 3.64491 21.7313 3.89529 21.5093C3.95877 21.4531 4.03164 21.3885 4.11602 21.3007H4.1174C4.13401 16.9348 4.34531 9.85147 4.59416 7.28167C4.11916 6.99126 3.83008 6.70833 3.77751 6.45948C3.77205 6.43359 3.76618 6.40838 3.76015 6.38247C3.72478 6.23056 3.68371 6.05413 3.68371 5.5713C2.08906 4.52164 0.23176 2.13163 3.68371 0Z" fill="white"/>
<path d="M1.47626 24.0187H2.79788V22.6978H25.2544V24.0187H26.5747V24.679H28.5552V25.9999H0.154297V24.679H1.47626V24.0187Z" fill="white"/>
</svg>
`,
  },
  {
    type: 'crest-location',
    tag: `<svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2448 30L18.2389 28.0997C18.1491 27.844 18.1007 27.5676 18.1007 27.2774C18.1007 25.9092 19.2063 24.8036 20.5745 24.8036C21.1964 24.8036 21.7631 25.0316 22.1984 25.4116L26.4413 21.4798C24.5617 19.5449 23.4008 16.9052 23.4008 13.9961C23.4008 11.0661 24.5755 8.40573 26.4827 6.47088L21.9358 2C19.9388 3.91412 17.2231 5.08885 14.2448 5.08885C11.2596 5.08885 8.55084 3.91412 6.5538 2L2 6.47088C3.90721 8.40573 5.08193 11.0661 5.08193 13.9961C5.08193 16.9052 3.92103 19.5449 2.04146 21.4798L6.2843 25.4116C6.71964 25.0316 7.28628 24.8036 7.90819 24.8036C9.27641 24.8036 10.382 25.9092 10.382 27.2774C10.382 27.5676 10.3337 27.844 10.2438 28.0997L14.2448 30Z" stroke="white" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7691 20.8803C10.2952 15.8441 9.65039 15.3272 9.65039 13.4764C9.65039 10.9411 11.7056 8.88586 14.2409 8.88586C16.7762 8.88586 18.8314 10.9411 18.8314 13.4764C18.8314 15.3272 18.1866 15.8441 14.7127 20.8803C14.4847 21.2096 13.9971 21.2096 13.7691 20.8803ZM14.2409 15.3891C15.2973 15.3891 16.1536 14.5327 16.1536 13.4764C16.1536 12.42 15.2973 11.5637 14.2409 11.5637C13.1845 11.5637 12.3282 12.42 12.3282 13.4764C12.3282 14.5327 13.1845 15.3891 14.2409 15.3891Z" fill="white"/>
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
];

export default icons;
