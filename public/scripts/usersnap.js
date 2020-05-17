(function () {
  window.onUsersnapCXLoad = function(api) {
    api.init();
  }
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://widget.usersnap.com/load/6c5203c5-6376-4443-a2d9-28b383aa856c?onload=onUsersnapCXLoad";
  document.getElementsByTagName('head')[0].appendChild(script);
})();
