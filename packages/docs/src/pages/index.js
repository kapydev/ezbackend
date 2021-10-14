import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import theme from "prism-react-renderer/themes/dracula";
import toast, { Toaster } from 'react-hot-toast';
import TechStackImage from '../assets/tech-stack.svg'
import IconTreeDiagram from '../assets/icon-tree-diagram.svg'
import { CtaButton } from '../helper-components/cta-button';
import { CodeLine } from '../helper-components/code-line';
import { Feature } from '../helper-components/feature';
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

            <div className='place-self-center col-span-2 justify-center'>
              <div className='grid grid-flow-row gap-7'>
                <div className='text-5xl font-bold font-mono md:text-center'>
                  Build More, Code Less
                </div>
                <div className='text-xl font-mono'>
                  Simplified Backend Setup without Compromise On Customizability
                </div>
                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                  <div className=''>
                    <CtaButton link="/docs/getting-started">
                      Get Started
                    </CtaButton>
                  </div>
                  <a href='https://codesandbox.io/s/ezb-demo-1-de5d3?file=/src/index.ts' target='_blank'>
                    <CtaButton>
                      Live Demo
                    </CtaButton>
                  </a>
                </div>
                {/* <div className='grid place-items-center'>
                  <CodeLine copyText="npx ezbackend init my-app" onClick={notify}>
                    npx <span className='text-blue-300'>ezbackend</span> init <span className='text-gray-400'>myapp</span>
                  </CodeLine >
                </div> */}
              </div>
            </div>

            <div className='place-self-start self-center'>
              <LiveProvider disabled={true} code={code} theme={theme} >
                <LiveEditor className='rounded-lg text-sm pointer-events-none' style={{ paddingLeft: 32 }} />
              </LiveProvider>
            </div>

            <div className='grid self-center'>
              <div className='w-auto md:w-96 md:mb-10' >
                <Feature
                  icon={<IconTreeDiagram className='w-10 h-10 mr-2' />}
                  title='Database Planning'
                  info='Plan your database structure in one file. EzBackend automatically generates everything else for you.'
                />
              </div>
            </div>

            <div className='col-span-full md:mx-10 md:mr-24'>
              <div className='text-2xl md:text-3xl font-mono mb-12 font-bold text-center'>
                Your Tech Stack in One Package:
              </div>
              <TechStackImage className='' />
            </div>

            <div className='col-span-full grid place-items-center'>
              <div className='font-monts font-bold text-xl mb-7'>
                Become an Alpha User!
              </div>
              <a href='https://forms.gle/38G9jL7bRFi822WTA' target='_blank'>
                <CtaButton>
                  Sign Up
                </CtaButton>
              </a>
            </div>


          </div>
        </div>

        <br />
        <br />
        <br />
        <br />

        <Toaster />

      </div>

    </Layout >
  );
}