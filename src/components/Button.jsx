export default function Button({ value, onClick }) {
  return (
    <button
      className="flex h-28 w-28 items-center justify-center bg-black text-center text-7xl text-white shadow shadow-slate-300"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
