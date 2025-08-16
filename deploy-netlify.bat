@echo off
echo 🚀 Deploying to Netlify...
echo.

echo Step 1: Building React app...
cd frontend/meeting-summarizer
call npm run build
cd ../..

echo.
echo Step 2: Copying to docs folder...
xcopy /E /Y "frontend\meeting-summarizer\dist\*" "docs\"

echo.
echo Step 3: Ready for Netlify!
echo.
echo 📁 Your deployment folder: docs/
echo.
echo Next steps:
echo 1. Go to https://app.netlify.com/drop
echo 2. Drag and drop the 'docs' folder
echo 3. Get your live URL instantly!
echo.
echo Or install Netlify CLI:
echo npm install -g netlify-cli
echo cd docs
echo netlify deploy --prod
echo.
pause