// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // State to hold error message

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data);
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong with the API.'); // Set error message
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('An error occurred while communicating with the server.'); // Set a generic error message
    }
  };

  return (
    <div>
      <h1>Next.js OpenAI App</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Enter a prompt..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {error ? (
        <div>
          <strong>Error:</strong>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <strong>Output:</strong>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
