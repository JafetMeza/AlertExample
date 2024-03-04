export interface ButtonIconProps {
  icon: string;
  name: string;
  className: string;
  iconPosition?: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode | null;
  disabled?: boolean;
}

export default function ButtonIcon({
  icon,
  name,
  className,
  onClick,
  children = null,
  iconPosition = false,
  disabled = false,
  ...props
}: ButtonIconProps): React.JSX.Element {
  return (
    <button
      className={`button ${className} is-justify-content-center`}
      onClick={onClick}
      name={name}
      disabled={disabled}
      {...props}
    >
      {iconPosition ? (
        <>
          {children && <span>{children}</span>}
          <span className="icon is-small">
            <i className={`fas fa-${icon}`}></i>
          </span>
        </>
      ) : (
        <>
          <span className="icon is-small">
            <i className={`fas fa-${icon}`}></i>
          </span>
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  );
}
