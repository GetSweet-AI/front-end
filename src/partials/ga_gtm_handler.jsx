const GAHandler = () => {
  // Track button clicks
  const handleLinkClick = (buttonName) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'button_click',
      button: buttonName
    });
  };

  return handleLinkClick;
};

export default GAHandler;