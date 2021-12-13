import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { CtaButton } from '../helper-components/cta-button';

function FeatureCard() {
  const [isHoveringHeart, setIsHoveringHeart] = useState(false);

  return (
    <div className="p-0 border-0 bg-transparent w-full">
      <div
        className="
          p-6 py-8
          bg-dracula 
          border-gray-300 
          border-4 
          border-solid
          rounded-xl
          text-center
          grid
          gap-6
          "
      >
        <div className="text-2xl font-bold font-mono"></div>
        <div className="font-monts leading-snug"></div>
        <svg
          className=""
          onMouseEnter={() => {
            setIsHoveringHeart(true);
          }}
          onMouseLeave={() => {
            setIsHoveringHeart(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-11 w-11"
          fill={isHoveringHeart ? '#dadde1' : 'none'}
          viewBox="0 0 24 24"
          stroke="#dadde1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    </div>
  );
}

function FeaturesVoting() {
  return (
    <Layout title="Features Voting">
      <div id="tailwind">
        <div className="grid place-items-center">
          <div
            className="
            grid
            grid-flow-row

            w-9/12
            grid-cols-1
            my-8
            gap-16

            md:w-8/12
            md:grid-cols-3
            md:m-32
            md:my-14
            md:gap-20

            "
          >
            <div className="col-span-full">
              <div className="grid grid-flow-row gap-7">
                <div className="text-5xl font-bold font-mono sm:text-center">
                  Feature Roadmap
                </div>
                <div className="text-xl font-mono sm:text-center">
                  Vote for the features you want!
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <div>
                    <CtaButton islink={false}>Suggest Feature</CtaButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <FeatureCard />
            </div>

            <div className="col-span-1">
              <FeatureCard />
            </div>

            <div className="col-span-1">
              <FeatureCard />
            </div>

            <div className="col-span-1">
              <FeatureCard />
            </div>

            <div className="col-span-1">
              <FeatureCard />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </Layout>
  );
}

export default FeaturesVoting;
