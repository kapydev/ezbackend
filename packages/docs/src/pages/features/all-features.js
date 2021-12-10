import React from 'react';
import Layout from '@theme/Layout';
import { Feature } from '../../helper-components/feature';
import { featuresContent } from '../../content/features-content';

function AllFeatures() {
  return (
    <Layout title="Features">
      <div id="tailwind">
        <div className="grid place-items-center my-6">
          <div
            className="
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

            "
          >
            <div className="col-span-full font-bold font-mono text-4xl my-16 text-center">
              Why EzBackend?
            </div>

            {featuresContent.map((feature) => {
              return (
                <Feature
                  icon={feature.icon}
                  title={feature.title}
                  info={feature.info}
                  route={feature.route}
                  released={feature.released}
                />
              );
            })}

            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllFeatures;
