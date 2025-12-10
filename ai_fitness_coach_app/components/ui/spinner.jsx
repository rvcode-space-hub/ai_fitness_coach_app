export default function Spinner({ className = "w-12 h-12" }) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="w-full h-full border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin"></div>
    </div>
  );
}
