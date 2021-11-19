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

const ICONCLASSNAME = 'w-12 h-12'

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
        max-w-7xl

        md:grid-cols-4 
        md:w-10/12'
          >

            <div className='col-span-full font-bold font-mono text-4xl mb-8 text-center'>
              Why EzBackend?
            </div>

            <Feature
              icon={<IconWorld className={ICONCLASSNAME} />}
              title='Instant API Generation'
              info='Instant API endpoints generation with customization capabilities'
            />

            <Feature
              icon={<IconApiDocs className={ICONCLASSNAME} />}
              title='Auomated Documentation'
              info='EzBackend automatically generates documentation according to the OpenAPI specification.'
            />

            <Feature
              icon={<IconSecurity className={ICONCLASSNAME} />}
              title='Authentication'
              info='Add authentication to your backend in one line of code. User sign ups and logins and permission layering with Google.'
            />

            <Feature
              icon={<IconDatabase className={ICONCLASSNAME} />}
              title='Supports >10 Databases'
              info='EzBackend remains database agnostic with industry standard databases: Postgres, MySQL, MongoDB, & more'
            />

            <Feature
              icon={<IconCode className={ICONCLASSNAME} />}
              title='XX% Less code'
              info='Do more with less. See comparisons to other popular frameworks.'
            />

            <Feature
              icon={<IconTypeScript className={ICONCLASSNAME} />}
              title='TypeScript Support'
              info='An amazing typescript reflection system where you can get typescript types despite writing plain javascript'
            />

            <Feature
              icon={<IconScaling className={ICONCLASSNAME} />}
              title='XX% Faster'
              info='See how EzBackend implements performance as a first class citizen'
            />

            <Feature
              icon={<IconRefresh className={ICONCLASSNAME} />}
              title='Fast Refresh'
              info='Fast, reliable editing experience, with changes being reflected immediately with ctrl-s'
            />

            <Feature
              icon={<IconEnv className={ICONCLASSNAME} />}
              title={<div>Consistent <br /> Dev & Prod Env</div>}
              info='Stop writing extensive environment specific code. EzBackend requires no additional configuration for deployment'
            />

            <Feature
              icon={<IconClock className={ICONCLASSNAME} />}
              title='One-Line Realtime Functionality'
              info='Velit veniam ipsum consequat deserunt excepteur consectetur sit excepteur consectetur culpa.'
            />

            <Feature
              icon={<IconFileStorage className={ICONCLASSNAME} />}
              title=' One-Line Storage Functionality'
              info='Store and serve files in any format.'
            />

          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Features;