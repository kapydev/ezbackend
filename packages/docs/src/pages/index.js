import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../assets/main.css';
import '../assets/helper.css';
import { CtaButton } from '../helper-components/cta-button';
import { CodeLine } from '../helper-components/code-line';

export default function Home() {

  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend made easy">

      <br className='h-40' />

      <div className='grid grid-cols-8 px-12 gap-1' >

        <div className='col-span-full md:col-span-4 p-12 grid place-items-end'>
          <div>
            <p className='text-5xl sm:text-6xl font-bold font-mono'>
              Simple Scalable <br /> & Secure
            </p>
            <p className='text-xl font-mono mt-5'>
              Backend Setup in 2 lines of code
            </p>
            <div className='flex-row justify-start pt-6'>
              <CtaButton>
                Documentation
              </CtaButton>
              <CtaButton>
                Watch Demo
              </CtaButton>
            </div>
          </div>
        </div>

        <div className='col-span-full md:col-span-4 p-12 grid place-items-start self-center'>
          <div>
            <div>
              
            </div>
            <CodeLine>
              npx <span className='text-blue-300'>ezbackend</span> init
            </CodeLine>
            <br />
            <CodeLine>
              npm run <span className='text-blue-300'>ezb</span>
            </CodeLine>
          </div>
        </div>
      </div>

    </Layout >
  );
}



