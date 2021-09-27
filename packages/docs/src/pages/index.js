import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../assets/main.css';
import { DuplicateIcon } from '@heroicons/react/outline'


export default function Home() {

  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend made easy">

      <div className='grid grid-cols-12 px-12 gap-1' >

        <div className='col-span-auto' />

        <div className='col-span-full md:col-span-5 p-12 grid place-items-left'>
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

        <div className='col-span-full md:col-span-4 p-12 grid place-items-center'>
          <CodeLine>
            npx <span className='text-blue-300'>ezbackend</span> init
          </CodeLine>
          <CodeLine>
            npm run <span className='text-blue-300'>ezb</span>
          </CodeLine>
        </div>
      </div>

      <div className='col-span-auto' />

    </Layout >
  );
}

function CtaButton(props) {
  return (
    <button className="bg-transparent rounded-lg font-medium p-3 shadow-lg border-2 border-white mr-3 hover:bg-blue-300 hover:text-gray-800">
      {props.children}
    </button>
  )
}

function CodeLine(props) {
  return (
    <div className='flex justify-between border-4 border-gray-400 rounded-xl p-4 text-2xl font-mono w-96'>
      <div>
        {props.children}
      </div>
      <button>
        <DuplicateIcon className='w-8 h-8 hover:text-blue-300' />
      </button>
    </div>
  )
}


