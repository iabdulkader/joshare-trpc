import Link from "next/link";
import { FiGithub, FiTwitter } from "react-icons/fi";
import MetaHead from "../../components/Head/Head";
import Layout from "../../components/Layout/Layout";


export default function About() {
    return (
      <>
        <MetaHead title="About | JoShare" />

        <Layout>
          <div className="h-full w-full text-center">
            <div className="flex flex-col items-center"><h1 className="utility-header">About <span className="dot">.</span></h1></div>

            <div className="flex justify-center mb-6">

              <div className="columns-1 max-w-[1000px] lg:columns-2 gap-6 pl-0 pr-5 lg:px-8">
                <div className="container">
                  <h1>What is joShare ?</h1>
                  <p>joShare is a micro file sharing platform. Now what do I mean by micro file sharing??</p>
                  <br />
                  <p>By micro file sharing I mean that you can share small size (below 30 Mega Bytes) files with anyone. Files like pdf, docs, pptx, cvs, jpg, jpeg, png etc can be shared with others. How does joShare works?? <Link className="cursor-pointer text-indigo-800 dark:text-indigo-400" href='/guide'>Read This</Link></p>
                  
                </div>

                <div className="container">
                  <h1>Why joShare ?</h1>
                  <p>Because joShare is very portable, light-weight and easy to use tool.</p>
                  <br />
                  <p>If ever we have to send some files to print shops and print our files, then we have to either mail them our files or send via usb, which are not very easy to do and also cumbersome. In situation like this joShare comes realy handy.</p>
                  <br />
                  <p>You can upload your desired files to joShare and copy or note down PIN provided by joShare and give that to the print shop owner and then he/she can download your files easily.</p>
                  
                </div>

                <div className="container">
                  <h1>Advances of joShare.</h1>
                  <p>As we discussed before, with joShare you can share files with anybody. Also you will get some other facilities.</p>
                  <br />
                  <p>You can send anyone email from our very own STP service. Although currently you can send 2 emails per session.</p>
                  <br />
                  <p>Your files will be automatically deleted after 24 Hours from creation. Although you can extend this time 2 times by additional 48 Hours Max using utility pannel.</p>
                  <br />
                  <p>Also you can delete your session at any time. You will get dedicated sharing page with QR code, public share link and other social sharing options. See dashboard for more.</p>

                </div>

                <div className="container">
                  <h1>Caution !</h1>
                  <p>Do not upload sensitive files. Don't upload copyrighted contents. We can't guarantee any uncaught error or server crash.</p>
                  <br />
                  <p>Your Files will get automatically deleted after expiry time which is shown on dashboard's countdown.</p>
                  <br />
                  <p>For more about Privacy related info <Link className="cursor-pointer text-indigo-800 dark:text-indigo-400" href='/terms'>Read This</Link>.</p>

                </div>

              </div>
            </div>


            <div className="flex flex-col items-center mb-2"> 
              <h1 className="utility-header">Created By</h1>

              <h1 className="utility-sub-header">Abdul Kader</h1>

              <div className="flex gap-8 text-2xl">
                <Link className="cursor-pointer hover:scale-110 transition-all duration-300" href={'https://github.com/iabdulkader'} target="_blank"><FiGithub /></Link>
                <Link className="cursor-pointer hover:scale-110 transition-all duration-300" href={'https://twitter.com/itsabdulkader'} target="_blank"><FiTwitter /></Link>
              </div>
            </div>


          </div>
        </Layout>
        </>
      )
}
