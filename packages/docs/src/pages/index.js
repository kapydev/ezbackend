import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../assets/main.css';

export default function Home() {

  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend made easy">
      <div className='flex-1 text-center pt-16 pb-12 px-12'>
        <p className='text-5xl sm:text-6xl font-bold font-mono'>
          Simple, Scalable, Secure
        </p>
        <p className='text-xl font-mono pt-6'>
          Backend Setup in 2 lines of code
        </p>
      </div>
      <div className='flex flex-row justify-center align-center'>
        <button className="bg-transparent rounded-lg font-medium p-3 shadow-lg border-2 border-white mx-3 hover:bg-blue-5 00">
          Documentation
        </button>
        <button className="bg-transparent rounded-lg font-medium p-3 shadow-lg border-2 border-white mx-3 hover:bg-blue-5 00">
          Watch Demo
        </button>
      </div>
    </Layout >
  );
}

function CtaButton(props) {
  return (
    <button className="bg-transparent rounded-lg font-medium p-3 shadow-lg border-2 border-white mx-3 hover:bg-blue-5 00">
      {props.text}
    </button>
  )
}

