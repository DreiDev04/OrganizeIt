import React from "react";

const getBaseStyles = () => 
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const getVariantStyles = (variant, danger) => {
  const styles = {
    default: {
      true: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      false: "bg-primary text-white hover:bg-blue-700 focus:ring-gray-500",
    },
    outline: {
      true: "border border-red-300 text-red-700 hover:bg-red-50 focus:ring-red-500",
      false: "border border-gray-300 text-foreground hover:text-background hover:bg-gray-50 focus:ring-blue-500",
    },
    subtle: {
      true: "bg-red-100 text-red-900 hover:bg-red-200 focus:ring-red-500",
      false: "bg-foreground text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    },
    ghost: {
      true: "text-red-700 hover:bg-red-100 focus:ring-red-500",
      false: "hover:bg-foreground text-foreground",
    },
    link: {
      true: "text-red-700 underline hover:text-red-900 focus:ring-red-500",
      false: "text-blue-700 underline hover:text-blue-900 focus:ring-blue-500",
    },
    solid: {
      true: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-500",
      false: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500",
    },
  };
  return styles[variant][danger];
};

const getSizeStyles = (size) => {
  const styles = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };
  return styles[size];
};

const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  danger = false,
  asChild = false,
  ...props
}) => {
  const baseStyles = getBaseStyles();
  const variantStyles = getVariantStyles(variant, danger);
  const sizeStyles = getSizeStyles(size);

  const combinedClassName = [
    baseStyles,
    variantStyles,
    sizeStyles,
    disabled && "opacity-50 cursor-not-allowed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    return React.Children.map(children, (child) =>
      React.cloneElement(child, {
        className: combinedClassName,
        onClick,
        disabled,
        ...props,
      })
    );
  }

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
