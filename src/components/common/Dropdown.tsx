type DropdownProps = {
  label: string;
  options: string[];
  onChange?: (value: string) => void;
};

function Dropdown({ label, options, onChange }: DropdownProps) {
  return (
    <div>
      <label>{label}</label>
      <br />
      <select onChange={(e) => onChange?.(e.target.value)}>
        {options.map((opt, index) => (
          <option key={index}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;