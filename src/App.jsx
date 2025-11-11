import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    ast: "",
    alt: "",
    platelets: "",
    bmi: "",
    diabetes: "",
    alcohol: "",
    drugs: "",
  });

  const [result, setResult] = useState(null);
  const [popup, setPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateScores = () => {
    const { age, ast, alt, platelets } = formData;
    const AST = parseFloat(ast);
    const ALT = parseFloat(alt);
    const PLT = parseFloat(platelets);
    const AGE = parseFloat(age);

    if (!AST || !ALT || !PLT || !AGE) {
      alert("Please fill all required fields correctly!");
      return;
    }

    // FIB-4 formula
    const fib4 = (AGE * AST) / (PLT * Math.sqrt(ALT));

    // APRI formula
    const apri = ((AST / 40) / PLT) * 100; // 40 = ULN of AST (approx)

    // Determine stage
    let stage = "";
    let advice = "";
    let color = "";

    if (fib4 < 1.3 && apri < 0.5) {
      stage = "No Significant Fibrosis";
      advice =
        "Encourage healthy diet, exercise, avoid alcohol, recheck liver profile in 6 months.";
      color = "green";
    } else if ((fib4 >= 1.3 && fib4 < 2.67) || (apri >= 0.5 && apri < 1.0)) {
      stage = "Possible Moderate Fibrosis";
      advice =
        "Schedule teleconsultation with district hepatologist and monitor lifestyle closely.";
      color = "yellow";
    } else {
      stage = "Advanced Fibrosis / Possible Cirrhosis";
      advice =
        "Refer urgently to tertiary care for liver specialist evaluation.";
      color = "red";
    }

    setResult({ fib4, apri, stage, advice, color });
    setPopup(true);
  };

  const closePopup = () => setPopup(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white flex flex-col items-center">
      {/* Navbar */}
      <header className="w-full p-6 text-center bg-purple-900 bg-opacity-60 backdrop-blur-md shadow-lg">
        <div className="flex justify-center items-center space-x-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2927/2927347.png"
            alt="HepatoSense Logo"
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold">HepatoSense</h1>
        </div>
        <p className="text-sm text-purple-200 mt-1">
          Empowering PHCs to Sense Liver Damage Before It’s Too Late
        </p>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-10 max-w-3xl px-5"
      >
        <h2 className="text-4xl font-semibold mb-4">AI-Driven Liver Fibrosis Screener</h2>
        <p className="text-lg text-purple-200 leading-relaxed">
          India faces a growing epidemic of NAFLD and ALD. <br />
          HepatoSense brings affordable, accurate fibrosis screening directly to Primary Health Centres.
        </p>
      </motion.section>

      {/* Input Form */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-2xl mt-10 w-11/12 md:w-2/3 lg:w-1/2"
      >
        <h3 className="text-2xl font-semibold mb-4">Enter Patient Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="age"
            placeholder="Age (years)"
            value={formData.age}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          />
          <input
            type="number"
            name="ast"
            placeholder="AST (U/L)"
            value={formData.ast}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          />
          <input
            type="number"
            name="alt"
            placeholder="ALT (U/L)"
            value={formData.alt}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          />
          <input
            type="number"
            name="platelets"
            placeholder="Platelet Count (×10⁹/L)"
            value={formData.platelets}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          />
          <input
            type="number"
            name="bmi"
            placeholder="BMI (optional)"
            value={formData.bmi}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          />
          <select
            name="diabetes"
            value={formData.diabetes}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          >
            <option value="">Diabetes?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          >
            <option value="">Alcohol Use?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            type="text"
            name="drugs"
            placeholder="Current Medications (optional)"
            value={formData.drugs}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black"
          />
        </div>
        <button
          onClick={calculateScores}
          className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-800 rounded-lg font-semibold transition-all"
        >
          Analyze Liver Health
        </button>
      </motion.section>

      {/* Popup for Results */}
      {popup && result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
        >
          <div className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 relative">
            <h3 className="text-xl font-bold mb-2 text-center text-purple-700">Result Summary</h3>
            <p>FIB-4 Score: <b>{result.fib4.toFixed(2)}</b></p>
            <p>APRI Score: <b>{result.apri.toFixed(2)}</b></p>
            <div className={`mt-3 p-3 rounded text-center font-semibold text-white ${result.color === "green" ? "bg-green-600" : result.color === "yellow" ? "bg-yellow-500" : "bg-red-600"}`}>
              {result.stage}
            </div>
            <p className="mt-3 text-sm text-gray-700">{result.advice}</p>
            <button
              onClick={closePopup}
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-purple-200 text-sm p-6">
        <p>
          Team Credits: <b>Monish Gokhul T, Arpita Singh, Aishwariya, Divyanshu Singh</b>
        </p>
        <p>© 2025 HepatoSense | Built for Medathon Innovation Challenge</p>
      </footer>
    </div>
  );
}

export default App;