/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'antd-mobile';
import Layout from '../components/Layout/index';
import { get } from '../utils/requestUtil';
import './index.less';

const App = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/goods/list'
    });
  };

  return (
    <Layout>
      <div className='demo1'>
       <Link href='/goods/detail/12'><a>Link标签跳转</a></Link>
      </div>
      <Button size='small' type='primary' onClick={handleClick}>手动路由跳转</Button>
      <div className='imgBox'>
       <img src='/images/vercel.svg' alt=''/>
      </div>
      <div className='box'>
        <p>接口数据展示: </p>
        <div className='inner'>
          {
            Array.isArray(data) && data.length > 0 && data.map(item => <div key={item.content_id}>{item.title} - {item.content}</div>)
          }
        </div>
      </div>
    </Layout>
  )
};

export async function getServerSideProps () {
  try {
    const result = await get({
      url: `/api/user/list`
    });
    return {
      props: {
        data: result
      }
    }
  } catch (error) {
    console.log(error);
  }
}


export default App;