import { useEffect } from 'react';

const AdstrerraPortraitBanner = () => {
  useEffect(() => {
    const container = document.getElementById('ad-container');

    if (container) {
      // Create the atOptions script
      const atOptionsScript = document.createElement('script');
      atOptionsScript.type = 'text/javascript';
      atOptionsScript.innerHTML = `
        atOptions = {
          key: '464f31026864a94b50ad007fac9febd2',
          format: 'iframe',
          height: 600,
          width: 160,
          params: {},
        };
      `;
      container.appendChild(atOptionsScript);

      // Create the invoke.js script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src =
        '//www.highperformanceformat.com/464f31026864a94b50ad007fac9febd2/invoke.js';
      container.appendChild(invokeScript);
    }
  }, []);

  return (
    <div
      id="ad-container"
      style={{
        width: '160px',
        height: '600px',
        overflow: 'hidden',
        marginTop: '20px',
      }}
    ></div>
  );
};

export default AdstrerraPortraitBanner;
