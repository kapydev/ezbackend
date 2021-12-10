import React from 'react';
import { Delayed } from '../helper-components/delayed';
import IconTick from '../assets/icon-tick.svg';

function StepFeature(props) {
  return (
    <Delayed waitBeforeShow={props.delay}>
      <div className="fade">
        <div className="flex justify-start gap-3 my-2">
          <IconTick className="self-start w-6 h-6" />
          <div className="font-monts">{props.children}</div>
        </div>
      </div>
    </Delayed>
  );
}

export default StepFeature;
