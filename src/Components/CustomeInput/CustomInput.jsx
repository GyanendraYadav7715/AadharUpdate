 const CustomInput = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  maxLength,
}) => {
  return (
    <div className="inputContainer">
      <div className="inputWrapper">
        <label htmlFor={name} className="label">
          {label}
        </label>
      </div>
      <input
        name={name}
        type={type}
        className="inputField"
        placeholder={placeholder}
        value={value}
        required
        onChange={(e) => onChange(name, e.target.value)}
        maxLength={maxLength}
      />
    </div>
  );
};
 export default CustomInput;
