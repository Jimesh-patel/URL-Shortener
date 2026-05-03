export default function Card({ title, children }: any) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}