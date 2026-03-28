type DropdownProps = {
  label: string;
  options: string[];
};

function Dropdown({ label, options }: DropdownProps) {
  return (
    <div>
      <label>{label}</label>
      <br />
      <select>
        {options.map((opt, index) => (
          <option key={index}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;