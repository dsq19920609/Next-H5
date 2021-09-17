import React from 'react';
import Link from 'next/link';
import './index.less';


const GoodsList = () => {
  return (
    <div className='container'>
      <Link href="/"><a>回到首页</a></Link>
    </div>
  )
};

export default GoodsList;