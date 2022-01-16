import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { CtaButton } from '../helper-components/cta-button';
import TumblrMockup from '../assets/tumblr-mockup.gif'
import PastebinMockup from '../assets/pastebin-mockup.gif'
import SimpleTodoApp from '../assets/simple-todo-app.gif'
import SimpleECommerce from '../assets/simple-ecommerce.gif'

function ProjectCard(props) {

  return (
    <div className='transition duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-105'>
      <a className="p-0 border-0 bg-transparent w-full no-underline" href={props.link} target="_blank">
        <div
          className="
          p-6 py-8
          bg-dracula 
          border-gray-300 
          border-3 
          border-solid
          rounded-xl
          text-center
          text-white
          grid
          gap-6
          "
        >
          <div>
            <img src={props.image} alt='Instagram Mockup Screenshot' />
          </div>
          <div className="text-2xl font-bold font-mono">
            {props.title}
          </div>
          <div className="font-monts leading-snug">
            {props.subtitle}
          </div>
        </div>
      </a>
    </div>
  );
}

function Showcase() {
  return (
    <Layout title="Project Showcase">
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
            md:grid-cols-2
            md:m-32
            md:my-14
            md:gap-20

            lg:grid-cols-3
            "
          >
            <div className="col-span-full">
              <div className="grid grid-flow-row gap-7">
                <div className="text-5xl font-bold font-mono sm:text-center">
                  Project Showcase
                </div>
                <div className="text-xl font-mono sm:text-center">
                  A gallery of apps powered by EzBackend
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href='https://forms.gle/LtrjiYfNdqj3aynT8' alt='Submit Project'>
                    <CtaButton islink={false} >Submit Project</CtaButton>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <ProjectCard
                link='https://ezbackend-app.vercel.app/'
                image={TumblrMockup}
                title="Tumblr Mockup"
                subtitle="By Marcus Tan"
              />
            </div>
            <div className="col-span-1">
              <ProjectCard
                link='http://ezbackend-example-postgres-remix.vercel.app/'
                image={PastebinMockup}
                title="PasteBin Mockup"
                subtitle="By Li Junyi"
              />
            </div>
            <div className="col-span-1">
              <ProjectCard
                link='https://ezmarket.netlify.app/'
                image={SimpleECommerce}
                title="Simple E-Commerce App"
                subtitle="By Tay Xin Yi"
              />
            </div>
            {/* <div className="col-span-1">
              <ProjectCard
                link='https://ezbackend-todo-app-6bpbvb8kx-stephenalvin.vercel.app/'
                image={SimpleTodoApp}
                title="Simple Todo App"
                subtitle="By Stephen Alvin"
              />
            </div> */}
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

export default Showcase;
