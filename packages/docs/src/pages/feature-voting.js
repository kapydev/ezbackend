import React from 'react';
import Layout from '@theme/Layout';
import { CtaButton } from '../helper-components/cta-button';

function FeaturesVoting() {
  return (
    <Layout title="Features Voting">
      <div className='grid place-content-center my-12 p-6'>
        <div className='grid grid-flow-row grid-cols-1 md:grid-cols-3 place-items-center gap-12'>
          <div className='col-span-full text-3xl font-mono text-center'>
            Vote your favorite features!
          </div>
          <CtaButton>
            API Documentation
          </CtaButton>
          <CtaButton>
            Database
          </CtaButton>
          <CtaButton>
            File Storage
          </CtaButton>
          <CtaButton>
            OAuth Sign In<br />(Google, FB, etc.)
          </CtaButton>
          <CtaButton>
            One-Click Deploy
          </CtaButton>
          <CtaButton>
            Horizontal<br />Scaling Wrapper
          </CtaButton>
          <div className='col-span-full text-3xl font-mono text-center'>
            Or suggest a new feature...
          </div>
          <div className='col-span-full'>
            <div className='
                p-4 
                border-4 
                border-gray-400
                bg-gray-800
                rounded-xl 
                text-2xl 
                font-mono 
                '>
              <form >
                <input
                  className='bg-transparent outline-none'
                  type="text"
                  name="name"
                  placeholder="e.g. Analytics"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FeaturesVoting;