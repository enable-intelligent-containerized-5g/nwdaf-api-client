import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import logo from "../assets/logo.png";

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div className={twMerge(className, "")} {...props}>
      <img src={logo} alt="Intelligent 5G" />
    </div>
  );
};

type LogoProps = ComponentProps<"div"> & {};

export default Logo;
