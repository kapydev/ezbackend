import '../assets/main.css';
import { DuplicateIcon } from '@heroicons/react/outline'
import React from 'react';


export function CodeLine(props) {
    return (
      <div className='flex justify-between border-4 border-gray-400 rounded-xl p-4 text-2xl dark:text font-mono w-96 bg-gray-800'>
        <div>
          {props.children}
        </div>
        <button>
          <DuplicateIcon className='w-8 h-8 hover:text-blue-300' />
        </button>
      </div>
    )
  }
