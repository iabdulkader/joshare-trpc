import GuideItem from "../../components/Guide/GuideItem";
import MetaHead from "../../components/Head/Head";
import Layout from "../../components/Layout/Layout";
import { ADVANCED_GUIDE, BASIC_GUIDE } from "../../constants/guide";

export default function Guide() {
  return (
    <>
      <MetaHead title="Guide | JoShare" />

      <Layout>
        <div className="h-full w-full text-center">
          <div className="flex flex-col items-center">
            <h1 className="utility-header">
              Basic Guide <span className="dot">.</span>
            </h1>
          </div>

          <div className="flex justify-center mb-6">
            <div className="grid max-w-[1000px] grid-cols-1 lg:grid-cols-2 gap-6 px-0 pr-5 lg:px-8">
              {BASIC_GUIDE.map((item, index) => (
                <div className="text-start ml-5 mb-6 max-w-[450px]">
                  <GuideItem text={item.text} image={item.image} id={item.id} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <h1 className="utility-header">
              Advance Guide <span className="dot">.</span>
            </h1>
          </div>

          <div className="flex justify-center mb-6">
            <div className="grid max-w-[1000px] grid-cols-1 lg:grid-cols-2 gap-6 px-0 pr-5 lg:px-8">
              {ADVANCED_GUIDE.map((item, index) => (
                <div className="text-start ml-5 mb-6 max-w-[450px]">
                  <GuideItem text={item.text} image={item.image} id={item.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
