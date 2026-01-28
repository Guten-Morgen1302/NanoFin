import { UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import "./LoanAnalysis.css"
import { Footer } from "../components/layout/Footer";

const LoanAnalysis = () => {
  const [iframeHeight, setIframeHeight] = useState("1400px");
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    // Adjust iframe height based on content
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIframeHeight("900px");
      } else {
        setIframeHeight("1400px");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Check if streamlit app is running
    const checkStreamlit = async () => {
      try {
        const response = await fetch("http://localhost:8501", {
          method: "HEAD",
          mode: "no-cors"
        });
        setIsConnecting(false);
      } catch (error) {
        setTimeout(() => setIsConnecting(false), 3000);
      }
    };

    checkStreamlit();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="analysis-section">
      {/* Navbar */}
      <nav className="adashboard-navbar">
        <div className="dashboard-logo">
          Nano<i className="ri-money-rupee-circle-fill"></i>Fin
        </div>
        <div className="dashboard-user-icon">
          <UserButton />
        </div>
      </nav>

      {/* Main Analysis Section */}
      <section className="main-analysis d-text">
        <div className="analysis-heading">
          <h1>Welcome to <span>NanoFin AI Dashboard</span></h1>
          <p>Complete AI-powered financial analysis and credit assessment</p>
        </div>
      </section>

      {/* Streamlit Iframe */}
      <div className="streamlit-container">
        {isConnecting && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Connecting to NanoFin Dashboard...</p>
          </div>
        )}
        
        <iframe
          className="streamlit-embed"
          src="http://localhost:8501/?embed=true"
          title="NanoFin Complete Analysis Dashboard"
          width="100%"
          height={iframeHeight}
          style={{ 
            border: "none", 
            marginTop: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          allowFullScreen
          onLoad={() => setIsConnecting(false)}
        />

        {/* Help Notice */}
        <div className="fallback-notice">
          <p>💡 First time? Start the Streamlit app with this command:</p>
          <code>streamlit run AI_Models/unified_dashboard.py --server.port 8501</code>
          <p style={{ marginTop: "10px", fontSize: "12px" }}>
            🚀 Or run all at once: <code>python AI_Models/launch_all_models.py</code>
          </p>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default LoanAnalysis;