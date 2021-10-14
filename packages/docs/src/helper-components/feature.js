import React from 'react';

export function Feature(props) {

  return (
    <div style={{minWidth:220}}>

      <div className='grid place-items-center self-center'>

        <div className='flex justify-center mb-2'>
          {props.icon}
        </div>

        <div className='flex justify-center'>
          <div className='ml-2 text-xl font-mono font-bold self-center text-center'>
            {props.title}
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='mt-4 font-monts'>
            <div className='text-md text-center'>
              {props.info}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export function MainFeature(props) {
  return (
    <div id="tailwind">
      <div className='flex justify-start'>
        <div className='grid place-items-center'>
          {props.icon}
        </div>
        <div className='ml-2 text-2xl font-mono font-bold self-center w-min-60'>
          {props.title}
        </div>
      </div>
      <div className='mt-4 font-monts'>
        <div className='max-w-full text-md'>
          {props.info}
        </div>
      </div>
    </div>
  )
}