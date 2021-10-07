import React from 'react';
import Layout from '@theme/Layout';
import { Feature } from '../helper-components/feature';
import IconApiDocs from '../assets/icon-api-docs.svg'
import IconDatabase from '../assets/icon-database.svg'
import IconSecurity from '../assets/icon-security.svg'
import IconWorld from '../assets/icon-world.svg'
import IconFileStorage from '../assets/icon-download-file.svg'
import IconDeploy from '../assets/icon-upload-cloud.svg'
import IconScaling from '../assets/icon-increase.svg'


function Features() {
  return (
    <Layout title="Features">

      <div id='tailwind'>
        <div className='grid place-items-center my-16'>
          <div className='
        
        grid 
        grid-flow-row 
        gap-12
        mx-12
        grid-cols-1

        md:grid-cols-3 
        md:w-3/5'

          >

            <div className='col-span-full font-bold font-mono text-4xl mb-2 text-center'>
              Features
            </div>

            <Feature
              icon={<IconWorld className='w-12 h-12' />}
              title='API'
              info='Instant API endpoints generation with customization capabilities'
            />

            <Feature
              icon={<IconApiDocs className='w-12 h-12' />}
              title='Documentation'
              info='Automatically generate documentation for your APIs from the models you plan'
            />

            <Feature
              icon={<IconDatabase className='w-12 h-12' />}
              title='Database'
              info='Choose from mutiple industry standard databases: Postgres, MySQL, MongoDB, & more'
            />

            <Feature
              icon={<IconSecurity className='w-12 h-12' />}
              title='Authentication'
              info='Add user sign ups and logins and permission layering with Google.'
            />

            <div className='col-span-full font-bold font-mono text-4xl mb-6 text-center'>
              Planned Features
            </div>

            <Feature
              icon={<IconFileStorage className='w-12 h-12' />}
              title='File Storage'
              info='Store and serve files in any format.'
            />

            <Feature
              icon={<IconDeploy className='w-12 h-12' />}
              title='One Click Deploy'
              info='Skip the hassle of navigating through the UI of traditional hosting services.'
            />

            <Feature
              icon={<IconScaling className='w-12 h-12' />}
              title='Scaling'
              info='Ensure your server will never crash from overloading'
            />

          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Features;