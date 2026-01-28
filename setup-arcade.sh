#!/bin/bash
# Setup script to ensure games are available in public folder

echo "Setting up Financial Arcade games..."

# Check if public/games exists
if [ ! -d "public/games" ]; then
    echo "Copying games to public folder..."
    cp -r games public/games
    echo "✓ Games copied successfully"
else
    echo "✓ Games folder already exists in public"
fi

echo ""
echo "Setup complete! Games are ready to be served."
echo ""
echo "You can now start the dev server:"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:5173/arcade"
