import React from 'react';
import Head from 'next/head';
import './index.less';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='keywords' content='next app'/>
      </Head>
      <div>
        {children}
      </div>
    </div>
  )
};

export default Layout;