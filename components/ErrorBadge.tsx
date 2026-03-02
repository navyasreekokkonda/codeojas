type Props = {
  type: "Syntax" | "Runtime" | "Logical" | "Interview";
};

const colors = {
  Syntax: "bg-red-100 text-red-700",
  Runtime: "bg-orange-100 text-orange-700",
  Logical: "bg-yellow-100 text-yellow-700",
  Interview: "bg-green-100 text-green-700",
};

export default function ErrorBadge({ type }: Props) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[type]}`}
    >
      {type} Error
    </span>
  );
}