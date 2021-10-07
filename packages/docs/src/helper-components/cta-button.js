import '../css/helper.css'
import React from 'react';
import { useHistory } from "react-router-dom";


export function CtaButton(props) {

  const history = useHistory();

  const routeChange = () => {
    let path = props.link;
    history.push(path);
  }

  return (
    <button className="pushable" onClick={routeChange}>
      <span className="edge"></span>
      <span className="front">
        <div className='font-monts font-bold'>
          {props.children}
        </div>
      </span>
    </button>
  )
}

