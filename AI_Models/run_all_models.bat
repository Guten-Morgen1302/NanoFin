@echo off
echo ========================================
echo    NanoFin AI Models Launcher
echo ========================================
echo.
echo Starting all AI models on different ports...
echo.

REM Change to AI_Models directory
cd /d "c:\Users\harsh\OneDrive\Desktop\NanoFin-main\AI_Models"

echo [1/7] Starting Local Credit Analysis on port 8501...
start "Local Credit Analysis" cmd /k "streamlit run Local_Credit_Analysis.py --server.port 8501"
timeout /t 3 /nobreak >nul

echo [2/7] Starting Customer View on port 8502...
start "Customer View" cmd /k "streamlit run Customer_View.py --server.port 8502"
timeout /t 3 /nobreak >nul

echo [3/7] Starting Customer View with Gemini on port 8503...
start "Customer View Gemini" cmd /k "streamlit run Customer_View_Goolge_Gemini_GoogleBNBMarathon.py --server.port 8503"
timeout /t 3 /nobreak >nul

echo [4/7] Starting Financial Institution View on port 8504...
start "Financial Institution View" cmd /k "streamlit run Financial_InstitutionView.py --server.port 8504"
timeout /t 3 /nobreak >nul

echo [5/7] Starting Business Review Platform on port 8505...
start "Business Review Platform" cmd /k "streamlit run Business_Review_Insights_Platform.py --server.port 8505"
timeout /t 3 /nobreak >nul

echo [6/7] Starting Enhanced Loan Marketplace on port 8506...
start "Enhanced Loan Marketplace" cmd /k "streamlit run Enhanced_NanoFin_Loan_Marketplace.py --server.port 8506"
timeout /t 3 /nobreak >nul

echo [7/7] Starting Nano Entrepreneur Assessment on port 8507...
start "Nano Entrepreneur Assessment" cmd /k "streamlit run Nano_Entrepreneur_CreditFlow_Loan_Assessment.py --server.port 8507"

echo.
echo ========================================
echo All AI models are starting up!
echo ========================================
echo.
echo Access URLs:
echo [1] Local Credit Analysis:        http://localhost:8501
echo [2] Customer View:                http://localhost:8502  
echo [3] Customer View (Gemini):       http://localhost:8503
echo [4] Financial Institution View:   http://localhost:8504
echo [5] Business Review Platform:     http://localhost:8505
echo [6] Enhanced Loan Marketplace:    http://localhost:8506
echo [7] Nano Entrepreneur Assessment: http://localhost:8507
echo.
echo Wait 30-60 seconds for all models to fully load...
echo Press any key to open all URLs in browser...
pause >nul

REM Open all URLs in default browser
start http://localhost:8501
timeout /t 2 /nobreak >nul
start http://localhost:8502
timeout /t 2 /nobreak >nul
start http://localhost:8503
timeout /t 2 /nobreak >nul
start http://localhost:8504
timeout /t 2 /nobreak >nul
start http://localhost:8505
timeout /t 2 /nobreak >nul
start http://localhost:8506
timeout /t 2 /nobreak >nul
start http://localhost:8507

echo.
echo All models launched! Check your browser tabs.
echo To stop all models, close their respective command windows.
echo.
pause