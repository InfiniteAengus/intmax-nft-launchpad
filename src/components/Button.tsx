import cn from 'classnames';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FunctionComponent<Props> = ({
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        'rounded-md bg-primary px-4 py-2 font-bold text-background disabled:bg-gray-500',
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
