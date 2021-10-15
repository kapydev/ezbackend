import React from 'react';
import ReactPlayer from 'react-player/youtube'
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import theme from "prism-react-renderer/themes/dracula";
import toast, { Toaster } from 'react-hot-toast';
import TechStackImage from '../assets/tech-stack.svg'
import IconTreeDiagram from '../assets/icon-tree-diagram.svg'
import { CtaButton, SupportButton } from '../helper-components/cta-button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Feature, MainFeature } from '../helper-components/feature';
import { LiveProvider, LiveEditor } from 'react-live'
import IconApiDocs from '../assets/icon-api-docs.svg'
import IconDatabase from '../assets/icon-database.svg'
import IconSecurity from '../assets/icon-security.svg'
import IconWorld from '../assets/icon-world.svg'
import IconFileStorage from '../assets/icon-download-file.svg'
import IconDeploy from '../assets/icon-upload-cloud.svg'
import IconScaling from '../assets/icon-increase.svg'
import "tailwindcss/tailwind.css"

const YT_URL = 'https://youtu.be/kQRRckdEFr8'

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
const copied_email = () => toast('Copied Email', { duration: 800, icon: '✔️' });

function Texty(props) {
  return (
    <span className='font-semibold' style={{ color: '#BD93F9' }}>{props.children}</span>
  )
}

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

            w-9/12
            grid-cols-1
            my-8
            gap-16

            md:w-8/12
            md:grid-cols-2
            md:m-32
            md:my-14
            md:gap-20

            '>

            <div className='col-span-full'>
              <div className='grid grid-flow-row gap-7'>
                <div className='text-5xl font-bold font-mono sm:text-center'>
                  Build Your MVP Faster
                </div>
                <div className='text-xl font-mono sm:text-center'>
                  Simple to Setup. Fully Customizable
                </div>
                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                  <div>
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
              </div>
            </div>

            <div className='grid place-items-center md:place-items-end self-center col-span-full md:col-span-1'>
              <LiveProvider disabled={true} code={code} theme={theme} >
                <LiveEditor className='rounded-lg text-sm pointer-events-none' style={{ paddingLeft: 32 }} />
              </LiveProvider>
            </div>

            <div className='col-span-full md:col-span-1 self-center mb-8' style={{ maxWidth: "400px" }}>
              <MainFeature
                icon={<IconTreeDiagram className='w-14 h-14 mr-2' />}
                title='Simplified Backend Development'
              >
                A Node framework focused on <Texty>speed</Texty> and <Texty>ease of use</Texty> while keeping the ability to extend and customize
              </MainFeature>
              <div>

              </div>
            </div>

            <div className='overflow-x-auto col-span-full '>
              <div className='gap-6 grid grid-flow-col'>

                <Feature
                  icon={<IconWorld className='w-12 h-12' />}
                  title='Instant CRUD Generation'
                  info='Instant CRUD endpoints generation with full customization capabilities'
                />

                <Feature
                  icon={<IconApiDocs className='w-12 h-12' />}
                  title='Automated Documentation'
                  info='Automatically generate documentation for your APIs from the models you plan'
                />
                <Feature
                  icon={<IconSecurity className='w-12 h-12' />}
                  title='One-Line Authentication'
                  info='Add user sign ups and logins and permission layering with Google.'
                />

                <Feature
                  icon={<IconDatabase className='w-12 h-12' />}
                  title='Choice of Database'
                  info='Pick from multiple industry standards: Postgres, MySQL, MongoDB, & more'
                />

              </div>
            </div>

            <div className='col-span-full' >
              <div className='text-2xl md:text-2xl font-mono mb-12 font-bold text-center'>
                Under the Hood:
              </div>
              <div className='grid place-items-center' >
                <TechStackImage className='lg:w-700px' />
              </div>
            </div>

            <div className='col-span-full'>
              <div className='text-2xl md:text-2xl font-mono mb-12 font-bold text-center'>
                Tutorial Demo:
              </div>
              <div className='grid place-items-center md:hidden'>
                <ReactPlayer
                  width='100%'
                  height='240px'
                  url={YT_URL}
                />
              </div>
              <div className='place-items-center hidden md:grid'>
                <ReactPlayer
                  url={YT_URL}
                />
              </div>
            </div>

            <div className='col-span-full flex flex-wrap justify-center gap-4 place-self-center' style={{ maxWidth: '400px' }}>

              <div className='w-full text-center font-monts font-bold text-xl mb-7' >
                Support Us:
              </div>

              <div>
                <CopyToClipboard text='we.are.kapydev@gmail.com'>
                  <SupportButton onClick={copied_email}>
                    Email
                  </SupportButton>
                </CopyToClipboard>
              </div>

              <div>
                <a href='https://discord.gg/RwgdruFJHc' target='_blank'>
                  <CtaButton>
                    Discord
                  </CtaButton>
                </a>
              </div>

              <div>
                <a href='https://github.com/kapydev/ezbackend' target='_blank'>
                  <CtaButton>
                    Github
                  </CtaButton>
                </a>
              </div>

              <div>
                <a href='https://www.producthunt.com/upcoming/ezbackend-2' target='_blank'>
                  <CtaButton>
                    Product Hunt
                  </CtaButton>
                </a>
              </div>

              <div>
                <a href='https://www.youtube.com/channel/UCXFyio7c5EWBGLknUJZjIzQ' target='_blank'>
                  <CtaButton>
                    YouTube
                  </CtaButton>
                </a>
              </div>

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