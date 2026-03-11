function FeatureCard({ title, desc }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

export default FeatureCard;
