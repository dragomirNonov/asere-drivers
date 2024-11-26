import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const DynamicBackgroundDiv = ({
  children,
  backgroundImage,
  className = '',
}) => {
  const [minHeight, setMinHeight] = useState(undefined);
  const contentRef = useRef(null);

  useEffect(() => {
    const calculateMinHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight;
        const calculatedMinHeight = Math.max(contentHeight, windowHeight);
        setMinHeight(calculatedMinHeight);
      }
    };

    calculateMinHeight();
    window.addEventListener('resize', calculateMinHeight);

    return () => {
      window.removeEventListener('resize', calculateMinHeight);
    };
  }, [children]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: minHeight ? `${minHeight}px` : '100vh',
    overflow: 'hidden',
  };

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div style={containerStyle} className={`relative w-full ${className}`}>
      <div style={backgroundStyle} />
      <div ref={contentRef} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

DynamicBackgroundDiv.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string,
  className: PropTypes.string,
};

DynamicBackgroundDiv.defaultProps = {
  backgroundImage: '',
  className: '',
};

export default DynamicBackgroundDiv;
