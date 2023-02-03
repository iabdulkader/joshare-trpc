import MetaHead from "../../components/Head/Head";
import Layout from "../../components/Layout/Layout";
import Contact from "../../components/Support/Contact";
import SupportForm from "../../components/Support/SupportForm";

export default function Support() {
  return (
    <>
      <MetaHead title="Support | JoShare" />

      <Layout>
        <div className="h-full w-full">
          <div className="flex flex-col items-center text-center">
            <h1 className="utility-header">
              Support <span className="dot">.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-3 items-center mb-6 px-5">
            <SupportForm />
            <Contact />
          </div>
        </div>
      </Layout>
    </>
  );
}
