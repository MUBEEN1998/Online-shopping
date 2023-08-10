import React from 'react'
import Layout from '../components/Layout/Layout';
import Link from 'antd/es/typography/Link';
const PageNotfound = () => {
  return (
    <Layout title={"go back- page not found"}>
      <div className="justify-items-center absolute top-40 left-40 right-40">
        <h1 className="text-4xl text-center">404</h1>
        <h2 className="text-2xl text-center">Oops ! Page Not Found</h2>
        <h1 className='justify-items-center '><Link className='text-center bg-red-100 text-black text-2xl ' to="/">
          Go Back
        </Link>
        </h1>
      </div>
    </Layout>
  )
}

export default PageNotfound