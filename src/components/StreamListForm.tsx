import { useState } from "react";

const StreamListForm = () => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User input:", input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a movie or show"
      />
      <button type="submit">Add to StreamList</button>
    </form>
  );
};

export default StreamListForm;