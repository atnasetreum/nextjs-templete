import React from 'react';

const Button = ({
  title,
  handleClick,
}: {
  title: string;
  handleClick?: () => void;
}) => {
  return (
    <div>
      <button onClick={handleClick} style={{ fontSize: 30 }}>
        {title}
      </button>
    </div>
  );
};

export default Button;
