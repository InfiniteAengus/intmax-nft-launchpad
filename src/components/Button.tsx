import cn from 'classnames';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

const Button: React.FunctionComponent<Props> = ({
  children,
  className,
}: Props) => {
  return (
    <button
      className={cn(
        'rounded-md bg-primary px-4 py-2 font-bold text-background',
        className
      )}>
      {children}
    </button>
  );
};

export default Button;
