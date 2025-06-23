function Pricing() {
  return (
    <div className="bg-white py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Simple Pricing</h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Start free, and upgrade when you're ready to unlock all features.
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <Plan title="Free" price="₹0" features={["10 questions/day", "Basic feedback", "No login required"]} />

        {/* Pro Plan */}
        <Plan
          title="Pro"
          price="₹299/month"
          features={[
            "Unlimited interviews",
            "AI feedback & improvements",
            "XP history & resume matching",
            "Priority support",
          ]}
          highlight
        />

        {/* Team Plan */}
        <Plan title="Team" price="₹999/month" features={["5 users", "Progress analytics", "Custom branding"]} />
      </div>
    </div>
  );
}

const Plan = ({ title, price, features, highlight }) => (
  <div
    className={`p-6 rounded shadow border ${
      highlight ? "bg-blue-50 border-blue-600" : "bg-gray-50"
    }`}
  >
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-2xl font-semibold text-blue-600 mb-4">{price}</p>
    <ul className="text-sm text-gray-600 mb-6 space-y-1">
      {features.map((f, i) => (
        <li key={i}>✅ {f}</li>
      ))}
    </ul>
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
      Get Started
    </button>
  </div>
);

export default Pricing;
