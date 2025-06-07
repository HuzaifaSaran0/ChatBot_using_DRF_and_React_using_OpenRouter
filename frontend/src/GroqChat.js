// import React, { useState, useRef, useEffect } from "react";

// function GroqChat() {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const chatEndRef = useRef(null);

//     const handleSend = () => {
//         if (!input.trim()) return;

//         const newUserMessage = { sender: "user", text: input };
//         setMessages((prev) => [...prev, newUserMessage]);

//         fetch("http://127.0.0.1:8000/api/groq-chat/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ message: input }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 const botReply = {
//                     sender: "bot",
//                     text: data.reply || "🤖 (No response from server)",
//                 };
//                 setMessages((prev) => [...prev, botReply]);
//             })
//             .catch((error) => {
//                 const errorMsg = {
//                     sender: "bot",
//                     text: "❌ Error talking to Groq backend: " + error.message,
//                 };
//                 setMessages((prev) => [...prev, errorMsg]);
//             });

//         setInput("");
//     };

//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.heading}>💬 Groq + Mixtral Chat</h2>
//             <div style={styles.chatBox}>
//                 {messages.map((msg, i) => (
//                     <div
//                         key={i}
//                         style={{
//                             ...styles.message,
//                             alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
//                             backgroundColor: msg.sender === "user" ? "#cfe2ff" : "#e2e3e5",
//                         }}
//                     >
//                         {msg.text}
//                     </div>
//                 ))}
//                 <div ref={chatEndRef} />
//             </div>
//             <div style={styles.inputContainer}>
//                 <input
//                     type="text"
//                     placeholder="Talk to Mixtral..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     style={styles.input}
//                     onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 />
//                 <button onClick={handleSend} style={styles.sendButton}>
//                     ➤
//                 </button>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         maxWidth: "600px",
//         height: "100vh",
//         margin: "0 auto",
//         // padding: "2rem 1rem",
//         fontFamily: "Segoe UI, sans-serif",
//         display: "flex",
//         flexDirection: "column",
//     },
//     heading: {
//         textAlign: "center",
//         color: "#333",
//         marginBottom: "1rem",
//     },
//     chatBox: {
//         flex: 1,
//         border: "1px solid #ddd",
//         borderRadius: "10px",
//         padding: "1rem",
//         backgroundColor: "#f8f9fa",
//         display: "flex",
//         flexDirection: "column",
//         gap: "0.5rem",
//         overflowY: "auto",
//     },
//     message: {
//         padding: "0.7rem 1rem",
//         borderRadius: "20px",
//         maxWidth: "75%",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//         lineHeight: "1.4",
//     },
//     inputContainer: {
//         display: "flex",
//         marginTop: "1rem",
//         gap: "0.5rem",
//     },
//     input: {
//         flex: 1,
//         padding: "0.75rem",
//         borderRadius: "20px",
//         border: "1px solid #ccc",
//         fontSize: "1rem",
//         outline: "none",
//     },
//     sendButton: {
//         padding: "0.75rem 1rem",
//         borderRadius: "50%",
//         backgroundColor: "#0d6efd",
//         color: "#fff",
//         border: "none",
//         fontSize: "1rem",
//         cursor: "pointer",
//     },
// };

// export default GroqChat;
