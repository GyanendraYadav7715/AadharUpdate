export const Select = ({
  label,
  value,
  options,
  onChange,
  name,
  className,
}) => {
  return (
    <div className="inputContainer">
      <div className="inputWrapper">
        <label htmlFor={name} className="label">
          {label}
        </label>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={className}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
