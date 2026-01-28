@echo off
echo ==========================================
echo    NanoFin Working Models Launcher
echo ==========================================
echo.

cd /d "%~dp0"

echo Starting working AI models (no API keys required)...
echo.

echo [1/3] Local Credit Analysis (Port 8501)
start "Local Analysis" cmd /k "streamlit run Local_Credit_Analysis.py --server.port 8501 --server.headless true"
timeout /t 3 >nul

echo [2/3] Customer View (Port 8502) 
start "Customer View" cmd /k "streamlit run Customer_View.py --server.port 8502 --server.headless true"
timeout /t 3 >nul

echo [3/3] Financial Institution View (Port 8504)
start "Financial View" cmd /k "streamlit run Financial_InstitutionView.py --server.port 8504 --server.headless true"

echo.
echo ==========================================
echo Working models started successfully!
echo ==========================================
echo.
echo Access URLs:
echo Local Analysis:      http://localhost:8501
echo Customer View:       http://localhost:8502
echo Financial View:      http://localhost:8504
echo.
echo Wait 30 seconds for models to load...
echo Press any key to open URLs in browser...
pause >nul

start http://localhost:8501
start http://localhost:8502
start http://localhost:8504

echo.
echo Models launched! Check browser tabs.
pause