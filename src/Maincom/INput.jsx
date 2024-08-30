
const InputField = ({ value, placeholder, id, label, type = 'text', disabled = false, required = false }) => (
  <div className="form-control w-full max-w-lg mb-2">
    <label htmlFor={id} className="label font-medium pb-1">
      <span className="label-text">{label}</span>
    </label>
    <input
      className="input input-bordered w-full max-w-lg"
      type={type}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      id={id}
      name={id}
      defaultValue={value}
    />
  </div>
);

export default InputField;
