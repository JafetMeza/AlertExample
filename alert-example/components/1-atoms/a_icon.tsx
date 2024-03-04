export default function Icon({
  icon,
  className = "",
}: {
  icon: string;
  className?: string;
}): React.JSX.Element {
  return (
    <span className="icon">
      <i className={`fa-solid fa-${icon} ${className}`} />
    </span>
  );
}
