import React, { useEffect, useState } from "react";

const Expire = props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return visible ? <div>{props.children}</div> : <div />;
};

export default Expire;