import React, { useState, useEffect } from 'react';

// type Props = {
//   children: React.ReactElement;
//   waitBeforeShow?: number;
// };

const Delayed = ({ children, waitBeforeShow = 500 }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    console.log(waitBeforeShow);
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShown ? children : null;
};

export default Delayed;