import React from 'react';
import Layout from '@theme/Layout';
import '../assets/helper.css';

function FeatureDark(props) {
  return (
    <p className="text-gray-400 text-left text-sm pt-5">
      <span className="material-icons align-middle">
        {props.icon}
      </span>
      <span className="pl-2" style={{ fontFamily: 'montserrat' }}>
        {props.children}
      </span>
    </p>
  )
}

function FeatureLight(props) {
  return (
    <p className="text-gray-600 text-left text-sm pt-5">
      <span className="material-icons align-middle">
        {props.icon}
      </span>
      <span className="pl-2" style={{ fontFamily: 'montserrat' }}>
        {props.children}
      </span>
    </p>
  )
}

function PricingCardFree() {
  return (
    <div className="w-full lg:w-auto p-8 bg-gray-200 text-center rounded-3xl shadow-xl">
      <h1 className="text-black font-semibold text-3xl font-mono">
        Basic
      </h1>
      <p class="pt-2 tracking-wide">
        <span class="text-xl font-semibold text-gray-700">Free</span>
      </p>
      <hr className="mt-4 border-1" />
      <div>
        <FeatureLight icon='✔'>
          <span className="text-black">API Documentation</span> (Swagger)
        </FeatureLight>
        <FeatureLight icon='✔'>
          <span className="text-black">OAuth</span> Google Sign In (Passport)
        </FeatureLight>
        <FeatureLight icon='✔'>
          <span className="text-black">Database</span> (SQLite, Postgres, etc)
        </FeatureLight>
        <FeatureLight icon='✔'>
          <span className="text-black">File Storage</span> (Multer)
        </FeatureLight>

        <a href="#" className="">
          <p className="py-4 bg-blue-600 mt-8 rounded-xl text-white">
            <span className="font-medium">
              Try Now
            </span>
          </p>
        </a>
      </div>
    </div>
  )
}

function PricingCardPaid() {
  return (
    <div className="w-full lg:w-auto p-8 bg-gray-800 text-center rounded-3xl text-white border-4 shadow-xl border-gray-400 lg:transform lg:scale-125">
      <h1 className="text-white font-semibold text-3xl font-mono">Enterprise</h1>
      <hr className="mt-4 border-1 border-gray-600" />

      <div>
        <FeatureDark icon='✔'>
          <span className="text-white">One-Click Deploy</span>
        </FeatureDark>
        <FeatureDark icon='✔'>
          <span className="text-white">Horizontal Scaling</span> - Wrapper
        </FeatureDark>
        <FeatureDark icon='✔'>
          <span className="text-white">Security</span> - Wrapper
        </FeatureDark>
        <FeatureDark icon='✔'>
          All featureDarks in <span className="text-white">Basic</span>
        </FeatureDark>
        <FeatureDark icon='✔'>
          All features in <span className="text-white">Basic</span>
        </FeatureDark>

        <a href="#" className="">
          <p className="py-4 bg-blue-600 mt-8 rounded-xl text-white">
            <span className="font-medium">
              Contact Us
            </span>
          </p>
        </a>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="text-left font-semibold m-6">
      <h1 className="text-5xl">
        <span className="text-blue-300 tracking-wide font-mono">Flexible </span>
        <span>Plans</span>
      </h1>
      <p className="pt-6 text-xl text-gray-400 font-normal" style={{ fontFamily: 'montserrat' }}>
        Building with our open-source package.
        One-Click Deploy with EzBackend
      </p>
    </div>
  )
}

function Pricing() {
  return (
    <Layout title="Pricing">
      <div className="grid gap-6 m-8 lg:gap-0 grid-flow-col lg:grid-flow-row grid-cols-1 grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 place-items-center lg:m-20 lg:mx-40">
        <Header />
        <PricingCardFree />
        <PricingCardPaid />
        <br />
      </div>
    </Layout>
  );
}

export default Pricing;