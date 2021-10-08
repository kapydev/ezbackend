import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import theme from "prism-react-renderer/themes/dracula";
import toast, { Toaster } from 'react-hot-toast';
import TechStackImage from '../assets/tech-stack.svg'
import { CtaButton } from '../helper-components/cta-button';
import { CodeLine } from '../helper-components/code-line';
import { LiveProvider, LiveEditor } from 'react-live'
import "tailwindcss/tailwind.css"

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

const notify = () => toast('Copied!', { duration: 800, icon: '✔️' });

export default function Home() {

  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Simplified Backend Setup">

      <div id="tailwind">
        <div className='grid place-items-center'>
          <div className='

      grid
      grid-flow-row
      place-content-center

      grid-cols-1
      mx-12
      my-8
      gap-16

      md:grid-cols-2
      md:m-32
      md:mx-24
      md:my-14
      md:gap-20

      '>

            <div className='order-1 place-self-start'>
              <div className='text-5xl font-bold font-mono'>
                Your Tech Stack <br /> in One Package
                <p className='text-xl font-mono mt-5'>
                  You just have to plan the models <br />
                </p>
                <div className='flex flex-col sm:flex-row sm:gap-3'>
                  <div className=''>
                    <CtaButton link="/docs/intro">
                      Get Started
                    </CtaButton>
                  </div>
                  <a href='https://codesandbox.io/s/ezb-demo-1-de5d3?file=/src/index.ts' target='_blank'>
                    <CtaButton>
                      Live Demo
                    </CtaButton>
                  </a>
                </div>
              </div>
            </div>

            <div className='order-2 grid place-items-start place-self-start'>
              <div className='pb-3 font-semibold font-monts'>
                Step 1: Install
              </div>
              <CodeLine copyText="npx ezbackend init" onClick={notify}>
                npx <span className='text-blue-300'>ezbackend</span> init <span className='text-gray-400'>my-app</span>
              </CodeLine >
              <div className='py-4 md:my-0 font-semibold font-monts'>
                Step 2: Run
              </div>
              <CodeLine copyText="npm run ezb" onClick={notify}>
                npm run <span className='text-blue-300'>ezb</span>
              </CodeLine>
            </div>

            <div className='order-4 md:order-3 place-self-start self-center'>
              <LiveProvider disabled={true} code={code} theme={theme} >
                <LiveEditor className='rounded-lg text-sm pointer-events-none' style={{ paddingLeft: 32 }} />
              </LiveProvider>
            </div>

            <div className='order-3 md:order-4 grid self-start'>
              <div className='font-bold font-mono text-xl mb-1'>
                Step 3: Plan your Model
              </div>
              <div className='w-auto md:w-96 font-monts'>
                <div>
                  Plan your database structure in <span className='underline'>one file</span>.EzBackend will automatically generate everything else for you.
                </div>
                <br />
                <li>API Documentation</li>
                <li>Database Management</li>
                <li>Google Sign In</li>
                <li className='text-gray-500'>File Storage (WIP)</li>
                <li className='text-gray-500'>One-Click Cloud Hosting (WIP)</li>
                <li className='text-gray-500'>Horizontal Scaling (WIP) </li>
              </div>
            </div>
            <div className='order-5 col-span-full md:mx-10 md:mr-16'>
              <div className='text-2xl md:text-3xl font-mono mb-12 font-bold text-center'>
                Under the Hood:
              </div>
              <TechStackImage className='' />
            </div>

            <div className='order-5 col-span-full grid place-items-center'>
              <div className='font-monts font-bold text-xl mb-7'>
                Become an Alpha User!
              </div>
              <a href='https://forms.gle/38G9jL7bRFi822WTA' target='_blank'>
                <CtaButton>
                  Sign Up
                </CtaButton>
              </a>
            </div>


            {/*             
          <div className='order-6 col-span- full'>
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

      </div>

    </Layout>
  );
}