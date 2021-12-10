import { CopyToClipboard } from 'react-copy-to-clipboard';
import DuplicateIcon from '../assets/icon-duplicate.svg';
import React from 'react';

export function CodeLine(props) {
  return (
    <div className="flex justify-between border-solid border-4 border-gray-400 rounded-xl p-4 py-3 text-2xl dark:text font-mono bg-gray-800">
      <div className="flex-shrink">{props.children}</div>
      <CopyToClipboard text={props.copyText}>
        <button onClick={props.onClick} className="bg-transparent border-none">
          <DuplicateIcon className="w-8 h-8 hover:text-blue-300 ml-6" />
        </button>
      </CopyToClipboard>
    </div>
  );
}
