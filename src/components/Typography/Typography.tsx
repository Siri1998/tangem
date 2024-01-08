import { ReactNode } from "react";
import "./Typography.css";

type TypographyProps = {
  variant: "ui-text";
  children: ReactNode;
  color?: "white" | "yellow";
  as?: "div" | "span";
};

export function Typography({
  variant,
  color = "white",
  as: Component = "div",
  children,
}: TypographyProps) {
  return <Component className={`${variant} ${color}`}>{children}</Component>;
}
