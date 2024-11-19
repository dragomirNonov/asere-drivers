import React, { useEffect, useRef, useState } from 'react';

const DynamicBackgroundDiv = ({ children, backgroundImage }) => {
  const [useFullHeight, setUseFullHeight] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        // Add a small delay to ensure DOM has updated
        setTimeout(() => {
          const contentHeight = contentRef.current.scrollHeight;
          const windowHeight = window.innerHeight;
          setUseFullHeight(contentHeight < windowHeight);
        }, 0);
      }
    };

    // Create a MutationObserver to watch for changes in content
    const observer = new MutationObserver(checkHeight);

    if (contentRef.current) {
      // Watch for changes in the content
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    // Check initially
    checkHeight();

    // Add resize listener
    window.addEventListener('resize', checkHeight);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkHeight);
    };
  }, [children]); // Re-run when children change

  return (
    <div
      ref={contentRef}
      className={`bg-cover bg-center bg-no-repeat bg-fixed ${
        useFullHeight ? 'h-screen' : 'min-h-screen'
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}>
      {children}
    </div>
  );
};

export default DynamicBackgroundDiv;
