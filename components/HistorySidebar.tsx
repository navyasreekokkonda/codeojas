type HistoryItem = {
  problem: string;
  language: string;
};

type Props = {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
};

export default function HistorySidebar({ history, onSelect }: Props) {
  return (
    <div className="w-64 border-r p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">History</h3>

      {history.length === 0 && (
        <p className="text-sm text-gray-400">No history yet</p>
      )}

      <ul className="space-y-2">
        {history.map((item, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(item)}
            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 text-sm"
          >
            <p className="font-medium truncate">{item.problem}</p>
            <p className="text-xs text-gray-500">{item.language}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}