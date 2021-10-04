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
import TechStackImage from '../assets/tech-stack.svg'
import SignUpForm from '../helper-components/signUpForm';


//TODO add order to the page

const notify = () => toast('Copied!', { duration: 800, icon: '✔' });

export default function Home() {

  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend made easy">
      <div className='grid place-content-center'>

        <div className='

        grid 
        grid-flow-row 
        
        grid-cols-1 
        mx-12
        my-8
        gap-16

        md:grid-cols-2 
        md:m-32
        md:mx-24
        md:my-14
        md:gap-20

         
        place-content-center
        '>

          <div className='order-1 place-self-start'>
            <div className='text-5xl font-bold font-mono'>
              Your Tech Stack <br /> in One Package
              <p className='text-xl font-mono mt-5'>
                Simplified Backend Setup <br />
              </p>
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-1 xl:gap-4 pt-6'>
                <div>
                  <CtaButton link="/docs/intro">
                    Documentation
                  </CtaButton>
                </div>
                <div>
                  <a href='https://codesandbox.io/s/ezbackend-demo-ensk1?file=/src/index.ts' target='_blank'>
                    <CtaButton>
                      Live Demo
                    </CtaButton>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='order-2 place-self-start'>
            <div className='pb-3 font-monts font-semibold' style={{ fontFamily: 'montserrat' }}>
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

          <div className='order-4 md:order-3 place-self-start'>
            <LiveProvider disabled={true} code={code} theme={theme} >
              <LiveEditor className='rounded-lg text-sm pointer-events-none' style={{ paddingLeft: 32 }} />
            </LiveProvider>
          </div>

          <div className='order-3 md:order-4 grid self-start'>
            <div className='font-bold font-mono text-3xl mb-1'>
              Step 3: Plan your Model
            </div>
            <div className='w-auto md:w-96' style={{ fontFamily: "montserrat" }}>
              <div>
                Focus on planning your database structure. We'll generate the rest for you.
              </div>
              <br />
              <li>API Documentation</li>
              <li>Database Management</li>
              <li>OAuth Sign In</li>
              <li>File Storage (WIP)</li>
              <li>One-Click Cloud Hosting (WIP)</li>
              <li>Horizontal Scaling (WIP) </li>

            </div>
          </div>

          <div className='order-5 md:col-span-full md:px-12'>
            <div className='text-3xl font-mono mb-12 font-bold text-center'>
              How we do it:
            </div>
            <div className='md:px-12'>
              <TechStackImage />
            </div>
          </div>

          {/* <div className='col-span-full'>
            <div className='text-3xl text-center font-mono mb-6 font-bold self-center'>
              Alpha Sign Up
            </div>
            <div className='grid place-items-center mb-4'>
              <SignUpForm />
            </div>
            <div className='grid place-items-center font-mono'>
              Powered by EzBackend
            </div>
          </div> */}

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