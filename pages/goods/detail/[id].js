import React from 'react';
import Link from 'next/link';
import './index.less';

const GoodsDetail = ({ goodsId }) => {
  return (
    <div className='container'>
      当前id: {goodsId}
      <Link href="/"><a>返回首页</a></Link>
    </div>
  )
};

export async function getStaticPaths(path) {
  /*
    fallback: 

    false: 其他路由为404

    如果fallback设置为true，则即使未预构建的路径也不会为404
  */
  return {
    paths: [
      {params: { id: '12' }},
      {params: { id: '13' }}
    ],
    fallback: false
  }
}

export async function getStaticProps(context) {
  console.log(context);
  // url查询参数
  const params = context.params;
  return {
    props: {
      goodsId: params.id
    }
  }
}


export default GoodsDetail;