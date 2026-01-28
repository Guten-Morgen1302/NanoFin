# 🏛️ NanoFin AI Models

## Overview
This directory contains all AI-powered models for the NanoFin platform, designed to assess creditworthiness of nano-entrepreneurs through advanced analytics and machine learning.

## 🚀 Quick Start

### Method 1: Run All Models at Once (Recommended)

#### Option A: Using Python Launcher
```bash
cd AI_Models
python launch_all_models.py
```

#### Option B: Using Batch Script (Windows)
```bash
cd AI_Models
run_all_models.bat
```

#### Option C: Master Dashboard
```bash
cd AI_Models
streamlit run master_dashboard.py --server.port 8500
```
Then visit: http://localhost:8500

### Method 2: Run Individual Models
```bash
cd AI_Models
streamlit run [model_name].py --server.port [port_number]
```

## 📊 Available Models

| Model | Port | Description | Features |
|-------|------|-------------|----------|
| **Local Credit Analysis** | 8501 | Offline analysis without APIs | Privacy-focused, Fast processing |
| **Customer View** | 8502 | Customer-facing dashboard | User-friendly, Personal insights |
| **Customer View (Gemini)** | 8503 | AI-enhanced customer view | Multilingual, Advanced analytics |
| **Financial Institution View** | 8504 | Bank/lender perspective | Risk assessment, Loan decisions |
| **Business Review Platform** | 8505 | Business insights platform | Performance metrics, Growth analysis |
| **Enhanced Loan Marketplace** | 8506 | Complete loan marketplace | Loan matching, Rate comparison |
| **Nano Entrepreneur Assessment** | 8507 | Specialized nano-entrepreneur analysis | Micro-business focus, Alternative scoring |

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.7+
- pip package manager

### Install Dependencies
```bash
# Install basic requirements
pip install streamlit pandas numpy plotly

# Install additional requirements (if using Gemini models)
pip install google-generativeai youtube-search-python

# Or install from requirements file
pip install -r requirements.txt
```

### Environment Setup (for Gemini models)
Create a `.streamlit/secrets.toml` file:
```toml
[secrets]
Gemini_API_Token = "your_gemini_api_key_here"
```

## 🎯 Model Details

### 1. Local Credit Analysis (`Local_Credit_Analysis.py`)
- **Purpose**: Offline credit scoring without external APIs
- **Features**: 
  - Complete privacy (no external calls)
  - Fast processing
  - Comprehensive financial analysis
- **Best for**: Quick assessments, privacy-sensitive scenarios

### 2. Customer View (`Customer_View.py`)
- **Purpose**: Customer-facing credit assessment
- **Features**:
  - Simple, intuitive interface
  - Personal financial insights
  - Credit improvement tips
- **Best for**: End-user interactions

### 3. Customer View with Gemini (`Customer_View_Goolge_Gemini_GoogleBNBMarathon.py`)
- **Purpose**: Enhanced customer experience with AI
- **Features**:
  - Google Gemini AI integration
  - Multilingual support (6 languages)
  - Advanced insights and recommendations
  - YouTube video recommendations
- **Best for**: Premium customer experience

### 4. Financial Institution View (`Financial_InstitutionView.py`)
- **Purpose**: Bank and lender dashboard
- **Features**:
  - Risk assessment tools
  - Loan decision support
  - Portfolio analysis
- **Best for**: Financial institutions, lenders

### 5. Business Review Platform (`Business_Review_Insights_Platform.py`)
- **Purpose**: Comprehensive business analysis
- **Features**:
  - Business performance metrics
  - Growth potential analysis
  - Market insights
- **Best for**: Business consultants, advisors

### 6. Enhanced Loan Marketplace (`Enhanced_NanoFin_Loan_Marketplace.py`)
- **Purpose**: Complete loan ecosystem
- **Features**:
  - Loan product matching
  - Interest rate comparison
  - Application tracking
- **Best for**: Loan brokers, marketplaces

### 7. Nano Entrepreneur Assessment (`Nano_Entrepreneur_CreditFlow_Loan_Assessment.py`)
- **Purpose**: Specialized micro-business analysis
- **Features**:
  - Alternative credit scoring
  - Micro-business focus
  - Growth potential assessment
- **Best for**: Microfinance institutions

## 📁 Data Format

All models expect JSON files with the following structure:

```json
{
  "personal_info": {
    "customer_id": "CUST001",
    "mobile": "+91-9876543210",
    "kyc_status": "Completed"
  },
  "summary": {
    "opening_balance": "50000.00",
    "closing_balance": "75000.00"
  },
  "transactions": [
    {
      "date": "01-01-24",
      "description": "SALARY CREDIT",
      "credit": "25000.00",
      "debit": "0.00",
      "balance": "75000.00"
    }
  ]
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process on specific port (Windows)
netstat -ano | findstr :8501
taskkill /PID [PID_NUMBER] /F

# Kill process on specific port (Linux/Mac)
lsof -ti:8501 | xargs kill -9
```

#### 2. Module Not Found Errors
```bash
# Install missing modules
pip install [module_name]

# Reinstall all requirements
pip install -r requirements.txt --force-reinstall
```

#### 3. Streamlit Not Starting
```bash
# Check Streamlit installation
streamlit --version

# Reinstall Streamlit
pip uninstall streamlit
pip install streamlit
```

#### 4. Gemini API Errors
- Ensure API key is correctly set in secrets.toml
- Check API quota and billing
- Verify internet connection

### Performance Optimization

#### 1. Memory Usage
- Close unused browser tabs
- Restart models periodically
- Monitor system resources

#### 2. Loading Speed
- Use Local Credit Analysis for fastest results
- Preload data files
- Optimize JSON file size

## 🌐 Access URLs

Once running, access models at:
- Master Dashboard: http://localhost:8500
- Local Credit Analysis: http://localhost:8501
- Customer View: http://localhost:8502
- Customer View (Gemini): http://localhost:8503
- Financial Institution View: http://localhost:8504
- Business Review Platform: http://localhost:8505
- Enhanced Loan Marketplace: http://localhost:8506
- Nano Entrepreneur Assessment: http://localhost:8507

## 📱 Integration with Main App

To integrate with the React app, update the iframe source in `LoanAnalysis.jsx`:

```javascript
// For local models
<iframe src="http://localhost:8501" />

// For specific model
<iframe src="http://localhost:8503" />
```

## 🔒 Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Local Processing**: Use Local Credit Analysis for sensitive data
3. **Network Security**: Run on localhost for development
4. **Data Privacy**: Ensure compliance with data protection regulations

## 🚀 Deployment

### Development
- Use localhost URLs
- Run models individually for testing

### Production
- Deploy on cloud platforms (AWS, GCP, Azure)
- Use environment variables for configuration
- Implement proper authentication
- Set up load balancing for multiple instances

## 📞 Support

For issues or questions:
- Check troubleshooting section above
- Review model-specific documentation
- Contact: support@nanofin.com

## 🏆 Team ConsoleLog

Built with ❤️ by Team ConsoleLog for the AI & Data Science Codeathon 2024

---

**Happy Analyzing! 🎯**