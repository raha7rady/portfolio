import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-background hover:bg-accent/90",
  secondary: "border border-border text-foreground hover:border-accent hover:text-accent",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-card px-5 py-2.5 text-sm font-semibold transition-colors";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export default function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = `${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    children: _children,
    className: _className,
    href: _href,
    ...buttonProps
  } = props as NativeButtonProps;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
