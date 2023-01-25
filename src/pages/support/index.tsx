import Head from "next/head";
import Layout from "../../components/Layout/Layout";

export default function Support() {
    return (
      <>
      <Head>
        <title>Guide | JoShare</title>
      </Head>

      <Layout>
        <div className="h-full w-full text-center">
          <div className="flex flex-col items-center"><h1 className="utility-header">Guide <span className="dot">.</span></h1></div>

          <div className="flex justify-center mb-6">

            <div className="columns-1 max-w-[1000px] lg:columns-2 gap-6 px-0 pr-5 lg:px-8">
              <div className="text-start ml-5 mb-6 max-w-[450px] lg:break-inside-avoid">
                
                
              </div>

            </div>
          </div>


        </div>
      </Layout>
      </>
      )
}