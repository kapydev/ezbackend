import React from 'react';

export function FeatureDescription(props) {

    return (
        <div className='col-span-full grid grid-flow-row grid-cols-1 sm:grid-cols-2'>

            <div className='mb-8 text-left col-span-1'>
                <div className='font-bold font-mono text-3xl mb-8'>
                    {props.title}
                </div>
                <div className='font-monts text-lg tracking-wide'>
                    {props.description}
                </div>
            </div>

            <div className='col-span-1 md:col-span-1 flex justify-end'>
                <img src={props.media} alt={props.title} width={props.width} height={props.height} />
            </div>

        </div>
    )
}