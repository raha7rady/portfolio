import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-accent text-background font-semibold shadow-[0_0_20px_rgb(var(--color-accent)/0.35)] hover:shadow-[0_0_25px_rgb(var(--color-accent)/0.5)] hover:brightness-110 border border-accent/40",
  secondary:
    "bg-surface border border-border text-foreground font-medium hover:border-accent/50 shadow-sm",
  outline:
    "bg-transparent border border-accent/40 text-accent font-medium hover:bg-accent/10 hover:border-accent/70",
  ghost: "bg-transparent border border-transparent text-muted font-medium hover:bg-surface hover:text-foreground",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-xl gap-2",
  lg: "text-base px-6 py-3.5 rounded-xl gap-2.5",
};

const baseClasses =
  "inline-flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
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
  const {
    variant = "primary",
    size = "md",
    children,
    className = "",
    icon,
    iconPosition = "start",
    fullWidth = false,
  } = props;

  const classes = `${baseClasses} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const content = (
    <>
      {icon && iconPosition === "start" && <span className="inline-flex shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {icon && iconPosition === "end" && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {content}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    children: _children,
    className: _className,
    icon: _icon,
    iconPosition: _iconPosition,
    fullWidth: _fullWidth,
    href: _href,
    ...buttonProps
  } = props as NativeButtonProps;

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
