type ToggleProps = {
  label: string;
  enabled: boolean;
  onToggle: () => void;
};

function Toggle({ label, enabled, onToggle }: ToggleProps) {
  return (
    <div>
      <label>{label}</label>
      <br />
      <input
        type="checkbox"
        checked={enabled}
        onChange={onToggle}
      />
      <span>{enabled ? " ON" : " OFF"}</span>
    </div>
  );
}

export default Toggle;