import Head from 'next/head'
import UploadFiles from '../components/Button/UploadFiles'
import MetaHead from '../components/Head/Head'
import HomeInput from '../components/InputBox/HomeInput'
import Logo from '../components/Logo/Logo'
import { trpc } from '../utlis/trpc/trpc'

export default function Home() {
  trpc.home.isAlive.useQuery();

  return (
    <>
      <MetaHead title="JoShare | File Sharing Solution" />
      <div>
        <div className="max-w-screen overflow-hidden flex flex-col justify-center items-center">
          <div className="w-full mt-28 lg:mt-44">
            <div className="max-w-[400px] lg:max-w-[600px] mx-auto">
            <Logo />
            </div>

          </div>   

          <div className="flex-col my-3 mb-16">
            <HomeInput />
            <div className="flex justify-center my-5">
              <UploadFiles />         
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
