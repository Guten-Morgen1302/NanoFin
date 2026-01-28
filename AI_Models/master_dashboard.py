import streamlit as st
import requests
import time
from pathlib import Path

def check_service_status(port):
    """Check if a service is running on the given port"""
    try:
        response = requests.get(f"http://localhost:{port}", timeout=2)
        return True
    except:
        return False

def main():
    st.set_page_config(
        page_title="NanoFin AI Models Dashboard", 
        layout="wide",
        page_icon="🏛️"
    )
    
    # Header
    st.markdown("""
    <div style='text-align: center; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);'>
        <h1 style='margin: 0; font-size: 3rem;'>🏛️ NanoFin AI Hub</h1>
        <p style='margin: 10px 0 0 0; font-size: 1.2rem; opacity: 0.9;'>Central Dashboard for All AI Models</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Models configuration
    models = {
        "🏠 Local Credit Analysis": {
            "port": 8501,
            "description": "Offline credit analysis without external APIs",
            "features": ["No API required", "Fast processing", "Privacy focused"],
            "status": "primary"
        },
        "👤 Customer View": {
            "port": 8502, 
            "description": "Customer-facing credit assessment dashboard",
            "features": ["User-friendly interface", "Personal insights", "Credit tips"],
            "status": "secondary"
        },
        "🤖 Customer View (Gemini AI)": {
            "port": 8503,
            "description": "Enhanced customer view with Google Gemini AI",
            "features": ["AI-powered insights", "Multilingual support", "Advanced analytics"],
            "status": "success"
        },
        "🏦 Financial Institution View": {
            "port": 8504,
            "description": "Bank and lender perspective dashboard", 
            "features": ["Risk assessment", "Loan decisions", "Portfolio analysis"],
            "status": "info"
        },
        "📊 Business Review Platform": {
            "port": 8505,
            "description": "Comprehensive business insights platform",
            "features": ["Business analytics", "Performance metrics", "Growth insights"],
            "status": "warning"
        },
        "🏪 Enhanced Loan Marketplace": {
            "port": 8506,
            "description": "Complete loan marketplace solution",
            "features": ["Loan matching", "Rate comparison", "Application tracking"],
            "status": "danger"
        },
        "🚀 Nano Entrepreneur Assessment": {
            "port": 8507,
            "description": "Specialized assessment for nano-entrepreneurs",
            "features": ["Micro-business focus", "Alternative scoring", "Growth potential"],
            "status": "dark"
        }
    }
    
    # Quick Actions
    st.markdown("### 🚀 Quick Actions")
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("🔄 Refresh Status", use_container_width=True):
            st.rerun()
    
    with col2:
        if st.button("📖 View Documentation", use_container_width=True):
            st.info("📚 Check the README.md file for detailed documentation")
    
    with col3:
        if st.button("⚙️ Launch All Models", use_container_width=True):
            st.info("💡 Run `python launch_all_models.py` or `run_all_models.bat` to start all models")
    
    with col4:
        if st.button("📞 Support", use_container_width=True):
            st.info("📧 Contact: support@nanofin.com")
    
    st.markdown("---")
    
    # Models Grid
    st.markdown("### 🎯 Available AI Models")
    
    # Create a 2-column layout for models
    col1, col2 = st.columns(2)
    
    model_items = list(models.items())
    for i, (name, info) in enumerate(model_items):
        # Alternate between columns
        current_col = col1 if i % 2 == 0 else col2
        
        with current_col:
            # Check if service is running
            is_running = check_service_status(info['port'])
            status_color = "🟢" if is_running else "🔴"
            status_text = "Running" if is_running else "Stopped"
            
            # Create model card
            with st.container():
                st.markdown(f"""
                <div style='padding: 20px; border: 2px solid {"#28a745" if is_running else "#dc3545"}; border-radius: 10px; margin-bottom: 20px; background: {"#f8fff8" if is_running else "#fff8f8"};'>
                    <h4 style='margin: 0 0 10px 0; color: #333;'>{name}</h4>
                    <p style='margin: 0 0 15px 0; color: #666; font-size: 0.9rem;'>{info['description']}</p>
                    <div style='margin-bottom: 15px;'>
                        <strong>Status:</strong> {status_color} {status_text} | <strong>Port:</strong> {info['port']}
                    </div>
                    <div style='margin-bottom: 15px;'>
                        <strong>Features:</strong><br>
                        {'<br>'.join([f"• {feature}" for feature in info['features']])}
                    </div>
                </div>
                """, unsafe_allow_html=True)
                
                # Action buttons
                button_col1, button_col2 = st.columns(2)
                with button_col1:
                    if is_running:
                        if st.button(f"🌐 Open {name.split()[0]}", key=f"open_{i}", use_container_width=True):
                            st.markdown(f'<meta http-equiv="refresh" content="0; url=http://localhost:{info["port"]}" target="_blank">', unsafe_allow_html=True)
                            st.success(f"Opening {name} in new tab...")
                    else:
                        st.button(f"❌ Not Running", key=f"disabled_{i}", disabled=True, use_container_width=True)
                
                with button_col2:
                    if st.button(f"📋 Details", key=f"details_{i}", use_container_width=True):
                        st.info(f"""
                        **{name}**
                        
                        **URL:** http://localhost:{info['port']}
                        
                        **Description:** {info['description']}
                        
                        **Features:**
                        {chr(10).join([f"• {feature}" for feature in info['features']])}
                        """)
    
    # System Status
    st.markdown("---")
    st.markdown("### 📊 System Status")
    
    running_count = sum(1 for info in models.values() if check_service_status(info['port']))
    total_count = len(models)
    
    progress = running_count / total_count
    st.progress(progress, text=f"Models Running: {running_count}/{total_count}")
    
    status_col1, status_col2, status_col3 = st.columns(3)
    
    with status_col1:
        st.metric("Total Models", total_count)
    
    with status_col2:
        st.metric("Running Models", running_count, delta=f"{running_count - (total_count - running_count)}")
    
    with status_col3:
        st.metric("System Health", f"{progress*100:.0f}%", delta="Good" if progress > 0.5 else "Needs Attention")
    
    # Instructions
    st.markdown("---")
    st.markdown("### 📖 How to Use")
    
    instructions_col1, instructions_col2 = st.columns(2)
    
    with instructions_col1:
        st.markdown("""
        **🚀 Starting Models:**
        1. Open terminal/command prompt
        2. Navigate to AI_Models folder
        3. Run: `python launch_all_models.py`
        4. Or run: `run_all_models.bat`
        5. Wait for models to start (30-60 seconds)
        """)
    
    with instructions_col2:
        st.markdown("""
        **💡 Tips:**
        - Each model runs on a different port
        - Models can run independently
        - Use this dashboard to monitor status
        - Green = Running, Red = Stopped
        - Click "Open" to access running models
        """)
    
    # Footer
    st.markdown("---")
    st.markdown("""
    <div style='text-align: center; padding: 20px; color: #666;'>
        <p>🏛️ <strong>NanoFin</strong> - AI-Powered Credit Assessment Platform</p>
        <p>Built for Nano-Entrepreneurs | Powered by Advanced AI</p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()