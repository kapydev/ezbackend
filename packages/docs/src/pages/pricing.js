import React from 'react';
import Layout from '@theme/Layout';
import IconTick from '../assets/icon-tick.svg'

function FeatureDark(props) {
  return (
    <p className="text-gray-400 text-left text-sm pt-5">
      <span className="material-icons align-middle">
        <IconTick className='w-6 h-6' />
      </span>
      <span className="pl-2 font-medium font-monts">
        {props.children}
      </span>
    </p>
  )
}

function FeatureLight(props) {
  return (
    <p className="text-gray-600 text-left text-sm pt-5">
      <span className="material-icons align-middle">
        <IconTick className='w-6 h-6' />
      </span>
      <span className="pl-2 font-medium font-monts">
        {props.children}
      </span>
    </p>
  )
}

function Pricing() {
  return (
    <Layout title="Pricing">
      <div id="tailwind">
        <div className='grid place-items-center'>
          <div className="
          grid

          grid-cols-1 
          gap-11
          m-8

          sm:grid-cols-2 
          sm:gap-6
          sm:m-12 
          sm:mx-16

          lg:grid-cols-3 
          lg:gap-14
          lg:m-20 
          lg:mx-24
          lg:max-w-7xl      
          "
          >
            <div className="text-left font-semibold col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="text-5xl">
                <span className="text-blue-300 tracking-wide font-mono">Flexible </span>
                <span>Plans</span>
              </div>
              <div className="pt-6 text-xl text-gray-400 font-normal font-monts">
                Building with our open-source package.
                One-Click Deploy with EzBackend
              </div>
            </div>



            <div className="p-8 bg-gray-200 text-center rounded-3xl shadow-xl">
              <h1 className="text-black font-semibold text-3xl font-mono">
                Free
              </h1>
              <hr className="mt-4 border-1" />
              <div>
                <FeatureLight >
                  <span className="text-black">API Documentation</span> (Swagger)
                </FeatureLight>
                <FeatureLight >
                  <span className="text-black">OAuth</span> Google Sign In (Passport)
                </FeatureLight>
                <FeatureLight >
                  <span className="text-black">Database</span> (SQLite, Postgres, etc)
                </FeatureLight>
                <FeatureLight >
                  <span className="text-black">CRUD</span> Endpoints Generation
                </FeatureLight>
                <FeatureLight >
                  Database <span className="text-black">GUI</span>
                </FeatureLight>
                <a href="docs/intro">
                  <p className="py-4 bg-blue-600 mt-8 rounded-xl text-white">
                    <span className="font-medium">
                      Try Now
                    </span>
                  </p>
                </a>
              </div>
            </div>



            <div className="p-8 bg-gray-800 text-center rounded-3xl text-white border-4 shadow-xl border-gray-400">
              <h1 className="text-white font-semibold text-3xl font-mono">Enterprise</h1>
              <hr className="mt-4 border-1 border-gray-600" />

              <div>
                <FeatureDark >
                  <span className="text-white">One-Click Deploy</span>
                </FeatureDark>
                <FeatureDark >
                  <span className="text-white">Horizontal Scaling</span> - Wrapper
                </FeatureDark>
                <FeatureDark >
                  <span className="text-white">Security</span> - Wrapper
                </FeatureDark>
                <FeatureDark >
                  All features in <span className="text-white">Free</span>
                </FeatureDark>
                <FeatureDark>
                  <span className="text-white">File Storage</span> (Multer)
                </FeatureDark>

                <a href="https://calendly.com/ezbackend/30min" target='_blank'>
                  <p className="py-4 bg-blue-600 mt-8 rounded-xl text-white">
                    <span className="font-medium">
                      Contact Us
                    </span>
                  </p>
                </a>
              </div>
            </div>




            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pricing;