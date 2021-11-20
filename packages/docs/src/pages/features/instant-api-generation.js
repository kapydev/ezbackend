import React from 'react';
import Layout from '@theme/Layout';
import { Feature } from '../../helper-components/feature';
import IconApiDocs from '../../assets/icon-api-docs.svg'
import IconDatabase from '../../assets/icon-database.svg'
import IconSecurity from '../../assets/icon-security.svg'
import IconWorld from '../../assets/icon-world.svg'
import IconFileStorage from '../../assets/icon-download-file.svg'
import IconScaling from '../../assets/icon-increase.svg'
import IconCode from '../../assets/icon-code.svg'
import IconTypeScript from '../../assets/icon-typescript.svg'
import IconRefresh from '../../assets/icon-refresh.svg'
import IconEnv from '../../assets/icon-env.svg'
import IconClock from '../../assets/icon-clock.svg'
// /https://heroicons.com/

const ICONCLASSNAME = 'w-16 h-16'

function InstantApiGeneration() {
  return (
    <Layout title="Features">

      <div id='tailwind'>
        <div className='grid place-items-center my-24'>
          <div className='
            grid 
            grid-flow-row 
            gap-12
            mx-12
            grid-cols-1
            max-w-7xl

            md:grid-cols-4
            md:w-8/12'
          >

            <>

              <div className='mb-8 text-left col-span-2'>
                <div className='font-bold font-mono text-4xl mb-8'>
                  <IconWorld className={ICONCLASSNAME} /> Instant API Generation
                </div>
                <div className='font-monts text-lg tracking-wide'>
                  Instant CRUD endpoints generation with full customization capabilities. Qui exercitation proident eu nostrud nisi officia consectetur reprehenderit dolore duis adipisicing veniam ea quis.
                </div>
              </div>

              <div className='bg-white col-span-2'>
              </div>

            </>

          </div>
        </div>
      </div>

    </Layout>
  );
}

export default InstantApiGeneration;