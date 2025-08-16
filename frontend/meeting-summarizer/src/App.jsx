// import React, { useState } from "react";

// function App() {
//   const [transcript, setTranscript] = useState("");
//   const [prompt, setPrompt] = useState("");
//   const [summary, setSummary] = useState("");

//   // Handle file upload and read transcript content
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setTranscript(event.target.result);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handleGenerate = () => {
//     // For now just combine inputs to check flow
//     setSummary(`Prompt: ${prompt}\n\nTranscript:\n${transcript}`);
//   };

//   const handleShare = () => {
//     alert("Email sharing will be implemented later!");
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
//       <h1>AI Meeting Notes Summarizer</h1>

//       {/* Option 1: Paste transcript manually */}
//       <textarea
//         placeholder="Paste your meeting transcript here..."
//         value={transcript}
//         onChange={(e) => setTranscript(e.target.value)}
//         rows={10}
//         style={{ width: "100%", marginBottom: "10px" }}
//       />

//       {/* Option 2: Upload transcript file */}
//       <input
//         type="file"
//         accept=".txt"
//         onChange={handleFileUpload}
//         style={{ marginBottom: "10px" }}
//       />

//       <input
//         type="text"
//         placeholder="Enter custom prompt (e.g., summarize for executives)"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//       />

//       <button onClick={handleGenerate} style={{ marginRight: "10px" }}>
//         Generate Summary
//       </button>

//       <button onClick={handleShare}>Share via Email</button>

//       {summary && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Generated Summary</h2>
//           <textarea
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             rows={10}
//             style={{ width: "100%" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { API_BASE_URL, DEMO_MODE } from "./config";

function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [recipients, setRecipients] = useState("");
  const [emailSubject, setEmailSubject] = useState("Meeting Summary");

  // Handle file upload and read transcript content
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTranscript(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Connect to backend summarization route
  const handleGenerate = async () => {
    if (!transcript) {
      alert("Please upload or paste a transcript first!");
      return;
    }

    setLoading(true);
    
    // Demo mode for GitHub Pages
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const demoSummary = `
🔴 DEMO MODE - This is a simulated summary 🔴

Meeting Summary:
• Key Discussion Points: The team discussed project milestones and upcoming deadlines
• Action Items: 
  - John to complete the frontend design by Friday
  - Sarah to review the backend API documentation
  - Team meeting scheduled for next Tuesday at 2 PM
• Decisions Made: Approved the new feature rollout for next month
• Next Steps: Begin user testing phase and gather feedback

${prompt ? `\nCustom Prompt Applied: "${prompt}"` : ''}

Note: This is a demo version. To use real AI summarization, deploy the backend server and update the API configuration.
      `.trim();
      
      setSummary(demoSummary);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: transcript, prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary || "No summary generated.");
      } else {
        setSummary(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSummary("Failed to connect to server. Make sure the backend is running.");
    }
    setLoading(false);
  };

  const handleShare = () => {
    if (!summary) {
      alert("Please generate a summary first!");
      return;
    }
    setShowEmailForm(true);
  };

  const handleSendEmail = async () => {
    if (!recipients) {
      alert("Please enter at least one recipient email!");
      return;
    }

    setEmailLoading(true);
    
    // Demo mode for GitHub Pages
    if (DEMO_MODE) {
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("🔴 DEMO MODE: Email functionality requires backend deployment. In the full version, this would send the summary to: " + recipients);
      setShowEmailForm(false);
      setRecipients("");
      setEmailLoading(false);
      return;
    }

    try {
      const emailList = recipients.split(',').map(email => email.trim());
      
      const response = await fetch(`${API_BASE_URL}/api/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          recipients: emailList, 
          summary, 
          subject: emailSubject 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Email sent successfully!");
        setShowEmailForm(false);
        setRecipients("");
      } else {
        alert(`Failed to send email: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email. Please check your connection.");
    }
    setEmailLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <h1>AI Meeting Notes Summarizer</h1>
      
      {DEMO_MODE && (
        <div style={{ 
          backgroundColor: "#fff3cd", 
          border: "1px solid #ffeaa7", 
          padding: "10px", 
          borderRadius: "5px", 
          marginBottom: "20px",
          color: "#856404"
        }}>
          <strong>🔴 Demo Mode:</strong> This is a live demo. AI summarization and email features are simulated. 
          <a href="https://github.com/YOUR_USERNAME/ai-meeting-summarizer" target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", marginLeft: "5px" }}>
            View source code & setup instructions →
          </a>
        </div>
      )}

      {/* Option 1: Paste transcript manually */}
      <textarea
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={10}
        style={{ width: "100%", marginBottom: "10px", padding: "8px", border: "1px solid #ccc" }}
      />

      {/* Option 2: Upload transcript file */}
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        style={{ marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Enter custom prompt (e.g., 'Summarize in bullet points for executives' or 'Highlight only action items')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px", border: "1px solid #ccc" }}
      />

      <button 
        onClick={handleGenerate} 
        disabled={loading} 
        style={{ 
          marginRight: "10px", 
          padding: "10px 20px", 
          backgroundColor: loading ? "#ccc" : "#007bff", 
          color: "white", 
          border: "none", 
          cursor: loading ? "not-allowed" : "pointer" 
        }}
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      <button 
        onClick={handleShare}
        disabled={!summary}
        style={{ 
          padding: "10px 20px", 
          backgroundColor: !summary ? "#ccc" : "#28a745", 
          color: "white", 
          border: "none", 
          cursor: !summary ? "not-allowed" : "pointer" 
        }}
      >
        Share via Email
      </button>

      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Summary (Editable)</h2>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={10}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc" }}
          />
        </div>
      )}

      {/* Email Form Modal */}
      {showEmailForm && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          backgroundColor: "rgba(0,0,0,0.5)", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
          <div style={{ 
            backgroundColor: "white", 
            padding: "20px", 
            borderRadius: "8px", 
            width: "400px" 
          }}>
            <h3>Share Summary via Email</h3>
            
            <input
              type="text"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "8px", border: "1px solid #ccc" }}
            />
            
            <textarea
              placeholder="Enter recipient emails (comma-separated)"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              rows={3}
              style={{ width: "100%", marginBottom: "10px", padding: "8px", border: "1px solid #ccc" }}
            />
            
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={handleSendEmail}
                disabled={emailLoading}
                style={{ 
                  padding: "10px 20px", 
                  backgroundColor: emailLoading ? "#ccc" : "#007bff", 
                  color: "white", 
                  border: "none", 
                  cursor: emailLoading ? "not-allowed" : "pointer" 
                }}
              >
                {emailLoading ? "Sending..." : "Send Email"}
              </button>
              
              <button 
                onClick={() => setShowEmailForm(false)}
                style={{ 
                  padding: "10px 20px", 
                  backgroundColor: "#6c757d", 
                  color: "white", 
                  border: "none", 
                  cursor: "pointer" 
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

