import React from 'react';

export function Feature(props) {
  return (
    <div id="tailwind">

      <div className='flex justify-center'>

        <div className='grid place-items-center'>
          {props.icon}
        </div>

        <div className='ml-2 text-xl font-mono font-bold self-center w-min-60'>
          {props.title}
        </div>

      </div>

      <div className='mt-4 font-monts text-center'>
        <div className='max-w-full text-md'>
          {props.info}
        </div>
      </div>

    </div>
  )
}

