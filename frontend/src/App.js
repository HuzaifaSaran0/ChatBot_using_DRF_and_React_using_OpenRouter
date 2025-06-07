import React, { useState, useRef, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("deepseek"); // "deepseek" or "mixtral"
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);

    // Choose endpoint based on selected model
    const endpoint =
      // model === "deepseek" ? "http://127.0.0.1:8000/api/chat/" : "http://127.0.0.1:8000/api/groq-chat/";
      model === "deepseek"
        ? "http://127.0.0.1:8000/api/chat/"
        : model === "graq-chat-two" // Added this condition
          ? "http://127.0.0.1:8000/api/graq-chat-two/" // And its corresponding URL
          : "http://127.0.0.1:8000/api/groq-chat/";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        const botReply = {
          sender: "bot",
          text: data.reply || "🤖 (No response from server)",
        };
        setMessages((prev) => [...prev, botReply]);
      })
      .catch((error) => {
        const errorMsg = {
          sender: "bot",
          text: "❌ Error: " + error.message,
        };
        setMessages((prev) => [...prev, errorMsg]);
      });

    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleModelChange = (e) => {
    setModel(e.target.value);
    setMessages([]); // clear chat when switching models
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💬 AI Chat</h2>

      <div style={styles.dropdownContainer}>
        <label style={styles.label}>Choose Model: </label>
        <select value={model} onChange={handleModelChange} style={styles.select}>
          <option value="deepseek">🔹 DeepSeek (OpenRouter)</option>
          <option value="mixtral">🔸 Mixtral (Groq)</option>
          <option value="groq-chat-two">🔸 Groq Second</option>
        </select>
      </div>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f5f5f5",
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    height: "100vh",
    margin: "0 auto",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "1rem",
  },
  dropdownContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "bold",
  },
  select: {
    padding: "0.4rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  chatBox: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    overflowY: "auto",
  },
  message: {
    padding: "0.7rem 1rem",
    borderRadius: "20px",
    maxWidth: "75%",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    lineHeight: "1.4",
  },
  inputContainer: {
    display: "flex",
    marginTop: "1rem",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
  },
  sendButton: {
    padding: "0.75rem 1rem",
    borderRadius: "50%",
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default App;
