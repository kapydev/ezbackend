import React from 'react';
import Layout from '@theme/Layout';
import { CtaButton } from '../helper-components/cta-button';

function FeatureCard() {
  return (
    <div className='
    p-6 py-8
    bg-dracula 
    border-gray-300 
    border-3 
    border-solid
    rounded-xl
    text-center
    grid
    place-items-center
    gap-6
    '>
      <div className='text-2xl font-bold font-mono'>
        Lorem Ipsum
      </div>
      <div className='font-monts'>
        Est voluptate sint culpa occaecat est id tempor officia duis Lorem ea nostrud. Nisi elit tempor eiusmod do mollit veniam ullamco mollit voluptate.
      </div>
      <a>
        <div className='font-mono text-2xl font-bold text-blue-300'>
          Vote
        </div>
      </a>
    </div>
  )
}

function FeaturesVoting() {
  return (
    <Layout title="Features Voting">
      <div id="tailwind">
        <div className='grid place-items-center'>
          <div className='
            grid
            grid-flow-row

            w-9/12
            grid-cols-1
            my-8
            gap-16

            md:w-8/12
            md:grid-cols-3
            md:m-32
            md:my-14
            md:gap-20

            '>

            <div className='col-span-full'>
              <div className='grid grid-flow-row gap-7'>
                <div className='text-5xl font-bold font-mono sm:text-center'>
                  Feature Roadmap
                </div>
                <div className='text-xl font-mono sm:text-center'>
                  Vote for the features you want!
                </div>
                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                  <div>
                    <CtaButton link="/docs/getting-started">
                      Suggest Feature
                    </CtaButton>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-span-1'>
              <FeatureCard />
            </div>

            <div className='col-span-1'>
              <FeatureCard />
            </div>

            <div className='col-span-1'>
              <FeatureCard />
            </div>

            <div className='col-span-1'>
              <FeatureCard />
            </div>

            <div className='col-span-1'>
              <FeatureCard />
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FeaturesVoting;