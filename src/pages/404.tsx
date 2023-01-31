import Image from 'next/image'
import Link from 'next/link'
import errorImg from "../assets/error.svg"
import Button from '../components/Button/Button'
import Layout from '../components/Layout/Layout'

export default function Custom404() {
  return (
    <Layout>
      <div className='min-h-[calc(100vh-11rem)] flex flex-col justify-center items-center my-auto px-8 lg:px-0'>
        <Image src={errorImg} alt="Error" />

        <Link className='mt-14 lg:mt-10' href='/'>
            <Button height={10} width={28} text="Home" />
        </Link>
      </div>
    </Layout>
  )
}