import '../assets/helper.css'
import '../assets/main.css';
import React from 'react';

export function Feature(props) {
  return (
    <div className=''>

      <div className='flex'>

        <div className='grid place-items-center'>
          {props.icon}
        </div>

        <div className='ml-2 text-xl font-mono font-bold self-center'>
          {props.title}
        </div>

      </div>

      <div className='m-2' style={{ fontFamily: 'montserrat' }}>
        <div className='max-w-full'>
          {props.info}
        </div>
      </div>

    </div>
  )
}

