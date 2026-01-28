@echo off
echo ==========================================
echo    NanoFin Master Dashboard
echo ==========================================
echo.

cd /d "%~dp0"

echo Starting Master Dashboard on port 8500...
echo.
echo Access URL: http://localhost:8500
echo.

streamlit run master_dashboard.py --server.port 8500

pause