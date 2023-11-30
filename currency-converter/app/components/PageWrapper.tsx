import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
      {children}
    </div>
  );
};

export default PageWrapper;
