import { PropsWithChildren } from "react";
import cn from "classnames";

interface Props extends PropsWithChildren {
  className?: string;
}

const Button: React.FunctionComponent<Props> = ({ children, className }) => {
  return (
    <button className={cn("bg-primary rounded-md px-4 py-2 text-background font-bold", className)}>{children}</button>
  );
};

export default Button;
