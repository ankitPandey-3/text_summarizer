import React, { useState } from "react";
import axios from "axios";

export const Summary = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        inputText: inputText // using the state variable directly
      };
      console.log(formData);
      const response = await axios.post("http://localhost:8000/api/v1/summ/summarizer", formData);
      console.log(response.data.data.generatedText);
      setSummary(response.data.data.generatedText); // Assuming the response contains a 'summary' field
    } catch (error) {
      setError("An error occurred while fetching the summary."); // You can handle errors appropriately
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <header className="flex justify-between items-center mb-8 w-full py-4 px-4 bg-yellow-500 border rounded">
        <div>
          <img src='\image-modified.png' alt="Logo" className="w-16 h-16 border-white rounded-full border-2" />
        </div>
        <h1 className="text-3xl font-bold mr-4 font-serif md:text-4xl md:mr-8 text-white">Text Summarizer</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:flex md:items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <textarea
              className="w-full h-96 px-3 py-2 border rounded mb-4 font-serif text-orange-800"
              placeholder="Add your text (150 characters)"
              id="inputText"
              name="inputText"
              type="text"
              value={inputText} // Set the value of the textarea to the inputText state variable
              onChange={(e) => setInputText(e.target.value)} // Update the inputText state variable when the textarea value changes
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-center"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <div className="border rounded bg-white h-96 overflow-auto font-serif text-orange-800">
            <div className="p-4">{summary || "Summary Will Appear Here (Please wait for a few seconds after submitting...)"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
