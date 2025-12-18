// "use client";

// import React from "react";
// import styles from "./Button.module.scss";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "primary" | "secondary" | "accent" | "gold" | "outline";
//   size?: "small" | "medium" | "large";
//   isLoading?: boolean;
//   fullWidth?: boolean;
//   href?: string;
// }

// export const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = "primary",
//   size = "medium",
//   isLoading = false,
//   fullWidth = false,
//   className,
//   href,
//   disabled,
//   ...props
// }) => {
//   const buttonClasses = [
//     styles.button,
//     styles[`variant--${variant}`],
//     styles[`size--${size}`],
//     isLoading ? styles.loading : "",
//     fullWidth ? styles.fullWidth : "",
//     className,
//   ]
//     .filter(Boolean)
//     .join(" ");

//   if (href) {
//     return (
//       <a href={href} className={buttonClasses}>
//         {isLoading && <span className={styles.spinner} aria-hidden="true" />}
//         <span className={styles.content}>{children}</span>
//       </a>
//     );
//   }

//   return (
//     <button
//       className={buttonClasses}
//       disabled={disabled || isLoading}
//       aria-busy={isLoading}
//       {...props}
//     >
//       {isLoading && <span className={styles.spinner} aria-hidden="true" />}
//       <span className={styles.content}>{children}</span>
//     </button>
//   );
// };

"use client";

import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "gold" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  fullWidth?: boolean;
  href?: string;
  icon?: React.ReactNode; // ← ДОБАВЬТЕ ЭТО
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  fullWidth = false,
  className,
  href,
  disabled,
  icon, // ← ДОБАВЬТЕ ЭТО
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[`variant--${variant}`],
    styles[`size--${size}`],
    isLoading ? styles.loading : "",
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.content}>
        {icon && <span className={styles.iconWrapper}>{icon}</span>}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
