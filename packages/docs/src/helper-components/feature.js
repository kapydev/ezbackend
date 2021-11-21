import React from 'react';

export function Feature(props) {

  return (
    <a href={props.route} style={{ minWidth: 220 }} className='text-gray-100 no-underline col-span-1 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'>

      <div className='grid place-items-center self-center gap-2'>

        <div className='flex mb-2 mr-2'>
          {props.icon}
        </div>

        <div className='flex justify-center'>
          <div className='text-xl font-mono font-bold self-center text-center'>
            {props.title}
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='mt-2 font-monts'>
            <div className='text-md text-center'>
              {props.info}
            </div>
          </div>
        </div>

        <div className='flex justify-start'>
          <div className='flex text-center'>
            <div className='text-gray-400 hover:text-white'>
              Learn More ➜
            </div>
          </div>
        </div>

      </div>

    </a>
  )
}

export function MainFeature(props) {
  return (
    <div id="tailwind">
      <div className='flex justify-start'>
        {/* <div className='grid place-items-center mr-2'>
          {props.icon}
        </div> */}
        <div className='text-3xl font-mono font-bold self-center w-min-60'>
          {props.title}
        </div>
      </div>
      <div className='mt-4 font-monts text-xl max-w-md md:max-w-sm'>
        {props.children}
      </div>
    </div>
  )
}