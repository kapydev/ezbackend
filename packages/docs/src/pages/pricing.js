import React from 'react';
import Layout from '@theme/Layout';
import IconTick from '../assets/icon-tick.svg'
import { CtaButton } from '../helper-components/cta-button';

const freeFeatures = [
  <div>API Documentation (Swagger)</div>,
  <div>OAuth Google Sign In (Passport)</div>,
  <div>Database (SQLite, Postgres, etc)</div>,
  <div>CRUD Endpoints Generation</div>,
  <div>Database GUI</div>,
  <div>File Storage (Multer)</div>, //coming soon
  <div>Realtime Database (SocketIO)</div> //coming soon
]

const oneClickDeployFeatures = [
  <div>All Free Features</div>,
  <div>Instant Cloud Deployment</div>,
  <div>Automatic Scaling</div>,
  <div>SSL Encryption</div>,
  <div>Content Caching</div>,
]

const enterpriseFeatures = [
  <div>All Free and One-Click-Deploy Features</div>,
  <div>Custom-Made Features</div>,
  <div>Technical Guidance & Code Reviews</div>,
  <div>Long-term Support & Upgrade Assistance</div>,
]

function ListItem(props) {
  return (
    <span className="flex text-gray-200 text-left text-sm pt-5">
      <span className="material-icons align-middle">
        <IconTick className='w-6 h-6' />
      </span>
      <span className="pl-2 font-medium font-monts">
        {props.children}
      </span>
    </span>
  )
}

function PricingCard(props) {
  return (
    <div className="p-8 bg-dracula text-center rounded-3xl shadow-xl">
      <div className="text-gray-200 font-semibold text-3xl font-mono pb-2">
        {props.title}
      </div>
      <hr className="mt-4 border-1" />
      <div>
        {props.listItems.map((listItem) => {
          return (
            <ListItem>
              {listItem}
            </ListItem>
          )
        })}
        <br />
        <a href={props.href}>
          <div className="pt-8 flex flex-col">
            <CtaButton>
              {props.button_text}
            </CtaButton>
          </div>
        </a>
      </div>
    </div>
  )
}


function Pricing() {
  return (
    <Layout title="Pricing">
      <div id="tailwind">
        <div className='grid place-items-center'>
          <div className="
          grid

          grid-cols-1 
          gap-11
          m-8

          sm:grid-cols-2 
          sm:gap-6
          sm:m-12 
          sm:mx-16

          lg:grid-cols-3 
          lg:gap-14
          lg:m-20 
          lg:mx-24
          lg:max-w-7xl      
          "
          >
            <div className="text-center font-semibold col-span-full">
              <div className="text-5xl">
                <span className=" tracking-wide font-mono">Flexible Plans</span>
              </div>
              <div className="pt-6 text-xl text-gray-400 font-normal font-monts">
                Build For Free. Scale with Us.
              </div>
            </div>

            <div className='col-span-1'>
              <PricingCard
                title={
                  <div>
                    <div className='text-4xl'>
                      Free
                    </div>
                    <div className='pt-6 text-xl'>
                      Open Source
                    </div>
                  </div>
                }
                listItems={freeFeatures}
                button_text='Get Started'
                href='/docs/intro'
              />
            </div>

            <div className='col-span-1'>
              <PricingCard
                title={
                  <div>
                    <div className='text-4xl'>
                      $25<span className='text-xl'>/month</span>
                    </div>
                    <div className='pt-6 text-xl'>
                      One-Click-Deploy
                    </div>
                  </div>
                }
                listItems={oneClickDeployFeatures}
                button_text='Contact Us'
                href='https://calendly.com/ezbackend/30min'
              />
            </div>

            <div className='col-span-1'>
              <PricingCard
                title='Enterprise'
                listItems={enterpriseFeatures}
                button_text='Contact Us'
                href='https://calendly.com/ezbackend/30min'
              />
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pricing;