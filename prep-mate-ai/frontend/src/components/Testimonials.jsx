function Testimonials() {
  const feedbacks = [
    {
      name: "Arpit Sharma",
      role: "Software Developer",
      text: "PrepMate AI helped me crack my Amazon interview! The questions and feedback were spot-on.",
    },
    {
      name: "Vaibhav Chaurasiya",
      role: "Data Analyst",
      text: "The XP system kept me motivated daily. Loved the AI-driven mock interviews!",
    },
    {
      name: "Siddharth Singh",
      role: "Product Manager",
      text: "Resume matching and feedback gave me a new edge. Highly recommend it.",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">What Users Say</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {feedbacks.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded shadow text-left">
            <p className="text-gray-700 mb-4">“{f.text}”</p>
            <p className="font-semibold text-blue-600">{f.name}</p>
            <p className="text-sm text-gray-500">{f.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
