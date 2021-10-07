import React from 'react';

export function Feature(props) {
  return (
    <div id="tailwind">

      <div className='flex'>

        <div className='grid place-items-center'>
          {props.icon}
        </div>

        <div className='ml-2 text-xl font-mono font-bold self-center'>
          {props.title}
        </div>

      </div>

      <div className='m-2 font-monts'>
        <div className='max-w-full'>
          {props.info}
        </div>
      </div>

    </div>
  )
}

