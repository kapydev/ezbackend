import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import theme from "prism-react-renderer/themes/dracula";
import toast, { Toaster } from 'react-hot-toast';
import '../assets/main.css';
import '../assets/helper.css';
import { CtaButton } from '../helper-components/cta-button';
import { CodeLine } from '../helper-components/code-line';
import { LiveProvider, LiveEditor } from 'react-live'

const notify = () => toast('Copied!', { duration: 800, icon: '✔' });

export default function Home() {

  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend made easy">

      <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-16 mt-12 mx-12 md:mx-60 place-items-center'>

        <div>
          <p className='text-4xl sm:text-5xl font-bold font-mono'>
            Simple Scalable <br /> & Secure
          </p>
          <p className='text-xl font-mono mt-5'>
            Over-simplified backend setup
          </p>
          <div className='flex-row justify-start pt-6'>
            <CtaButton link="/docs/intro">
              Documentation
            </CtaButton>
          </div>
        </div>

        <div>
          <div className='py-3 md:my-0 font-monts font-semibold' style={{ fontFamily: 'montserrat' }}>
            Step 1: Install
          </div>
          <CodeLine copyText="npx ezbackend init" onClick={notify}>
            npx <span className='text-blue-300'>ezbackend</span> init
          </CodeLine >
          <div className='py-4 md:my-0 font-semibold' style={{ fontFamily: 'montserrat' }}>
            Step 2: Run
          </div>
          <CodeLine copyText="npm run ezb" onClick={notify}>
            npm run <span className='text-blue-300'>ezb</span>
          </CodeLine>
        </div>

        <div>
          <LiveProvider disabled={true} code={code} theme={theme} >
            <LiveEditor className='rounded-lg text-sm pointer-events-none' style={{ paddingLeft: 32 }} />
          </LiveProvider>
        </div>

        <div className='grid self-start'>
          <div className='font-bold font-mono text-2xl mb-1'>
            Step 3: Plan your Model
          </div>
          <div className='w-auto md:w-96' style={{ fontFamily: "montserrat" }}>
            <div>
              Focus on planning your database structure. We'll generate the rest for you.
            </div>
            <br />
            <li>API Documentation</li>
            <li>Database Management</li>
            <li>File Storage (WIP)</li>
            <li>OAuth</li>
          </div>
        </div>

      </div>

      <br />
      <br />
      <br />
      <br />

      <Toaster />

    </Layout >
  );
}



const code = `
const app = new EzBackend()

const pets = new EzModel('Pets', {
    name: Type.VARCHAR,
    species: Type.VARCHAR,
    age: Type.INT
  })

app.addApp("pets", pets, { prefix: "pets" })    

app.start()
`