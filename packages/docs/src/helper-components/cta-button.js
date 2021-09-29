import '../assets/helper.css'
import '../assets/main.css';
import React from 'react';

export function CtaButton(props) {
    return (
      <button class="pushable">
        {/* <span class="shadow"></span> */}
        <span class="edge"></span>
        <span class="front">
          {props.children}
        </span>
      </button>
    )
  }

