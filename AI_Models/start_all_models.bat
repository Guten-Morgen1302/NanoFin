@echo off
echo ==========================================
echo    NanoFin AI Models Launcher
echo ==========================================
echo.

cd /d "%~dp0"

echo Starting AI Models on different ports...
echo.

echo [1/7] Local Credit Analysis (Port 8501)
start "Local Analysis" cmd /k "streamlit run Local_Credit_Analysis.py --server.port 8501 --server.headless true"
timeout /t 3 >nul

echo [2/7] Customer View (Port 8502) 
start "Customer View" cmd /k "streamlit run Customer_View.py --server.port 8502 --server.headless true"
timeout /t 3 >nul

echo [3/7] Customer View Gemini (Port 8503)
start "Customer Gemini" cmd /k "streamlit run Customer_View_Goolge_Gemini_GoogleBNBMarathon.py --server.port 8503 --server.headless true"
timeout /t 3 >nul

echo [4/7] Financial Institution (Port 8504)
start "Financial View" cmd /k "streamlit run Financial_InstitutionView.py --server.port 8504 --server.headless true"
timeout /t 3 >nul

echo [5/7] Business Review (Port 8505)
start "Business Review" cmd /k "streamlit run Business_Review_Insights_Platform.py --server.port 8505 --server.headless true"
timeout /t 3 >nul

echo [6/7] Loan Marketplace (Port 8506)
start "Loan Marketplace" cmd /k "streamlit run Enhanced_NanoFin_Loan_Marketplace.py --server.port 8506 --server.headless true"
timeout /t 3 >nul

echo [7/7] Nano Entrepreneur (Port 8507)
start "Nano Assessment" cmd /k "streamlit run Nano_Entrepreneur_CreditFlow_Loan_Assessment.py --server.port 8507 --server.headless true"

echo.
echo ==========================================
echo All models are starting up!
echo ==========================================
echo.
echo Access URLs:
echo Local Analysis:      http://localhost:8501
echo Customer View:       http://localhost:8502
echo Customer Gemini:     http://localhost:8503
echo Financial View:      http://localhost:8504
echo Business Review:     http://localhost:8505
echo Loan Marketplace:    http://localhost:8506
echo Nano Assessment:     http://localhost:8507
echo.
echo Wait 30-60 seconds for models to load...
echo Press any key to open URLs in browser...
pause >nul

start http://localhost:8501
start http://localhost:8502
start http://localhost:8503
start http://localhost:8504
start http://localhost:8505
start http://localhost:8506
start http://localhost:8507

echo.
echo All models launched! Check browser tabs.
echo To stop: Close the command windows.
pause