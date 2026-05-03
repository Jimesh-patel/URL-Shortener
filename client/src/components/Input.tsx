export default function Input({ value, onChange, placeholder }: any) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
    />
  );
}