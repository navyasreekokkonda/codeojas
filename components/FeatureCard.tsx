type Props = {
  title: string;
  description: string;
  icon: string;
};

export default function FeatureCard({ title, description, icon }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}