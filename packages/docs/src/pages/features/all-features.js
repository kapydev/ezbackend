import React from 'react';
import Layout from '@theme/Layout';
import { Feature } from '../../helper-components/feature';
import { FeatureDescription } from '../../helper-components/feature-description';
import { features_content } from '../../content/features-content';
import greybox from '../../assets/grey-rect.png';

const ICONCLASSNAME = 'w-12 h-12'

function AllFeatures() {
  return (
    <Layout title="Features">

      <div id='tailwind'>
        <div className='grid place-items-center my-6'>
          <div className='
            grid 
            grid-flow-row 
            gap-12
            mx-12
            mb-24
            max-w-7xl
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-4

            '>

            <div className='col-span-full font-bold font-mono text-4xl my-16 text-center'>
              Why EzBackend?
            </div>

            {features_content.map((feature) => {
              return (
                <Feature
                  icon={feature.icon}
                  title={feature.title}
                  info={feature.info}
                  route={feature.route}
                  released={feature.released}
                />
              )
            })}

            <br />

            {/* {features_content.map((feature) => {
              if (feature.description !== "") {
                return (
                  <FeatureDescription
                    title={feature.title}
                    description={feature.description}
                    media={(feature.media === null) ? greybox : feature.media}
                    height='80%'
                    width='80%'
                    add_content={feature.add_content}
                  />
                )
              } else {
                return null
              }

            })} */}

          </div>
        </div>
      </div>

    </Layout>
  );
}

export default AllFeatures;