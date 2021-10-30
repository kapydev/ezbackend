import '../css/helper.css'
import React from 'react';
import { useHistory } from "react-router-dom";


export function CtaButton(props) {

  const history = useHistory();

  const routeChange = () => {
    history.push(props.link);
  }

  return (
    <button className="pushable" onClick={props.islink ? routeChange : props.onClick} >
      <span className="edge"></span>
      <span className="front">
        <div className='font-monts font-bold'>
          {props.children}
        </div>
      </span>
    </button>
  )
}

export function SupportButton(props) {

  return (
    <button className="pushable" onClick={props.onClick}>
      <span className="edge"></span>
      <span className="front">
        <div className='font-monts font-bold'>
          {props.children}
        </div>
      </span>
    </button>
  )
}
