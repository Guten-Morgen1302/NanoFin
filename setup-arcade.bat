@echo off
REM Setup script for Financial Arcade games

echo Setting up Financial Arcade games...

if not exist "public\games" (
    echo Copying games to public folder...
    robocopy games public\games /E
    echo.
    echo ✓ Games copied successfully
) else (
    echo ✓ Games folder already exists in public
)

echo.
echo Setup complete! Games are ready to be served.
echo.
echo You can now start the dev server:
echo   npm run dev
echo.
echo Then visit: http://localhost:5173/arcade
echo.
pause
