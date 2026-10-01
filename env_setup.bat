@echo off
title Playwright Test Framework Setup

echo ==========================================
echo   Playwright Test Framework Setup
echo ==========================================
echo.

echo [1/10] Installing dotenv...
call npm install dotenv
if errorlevel 1 goto :error

echo [2/10] Installing faker...
call npm install @faker-js/faker
if errorlevel 1 goto :error

echo [3/10] Installing Luxon...
call npm install luxon
if errorlevel 1 goto :error

echo [4/10] Installing AJV, CSV Parse and XLSX...
call npm install ajv csv-parse xlsx
if errorlevel 1 goto :error

echo [5/10] Installing Playwright Axe Core...
call npm install @axe-core/playwright
if errorlevel 1 goto :error

echo [6/10] Installing Allure Playwright...
call npm install allure-playwright
if errorlevel 1 goto :error

echo [7/10] Installing Node.js types...
call npm install -D @types/node
if errorlevel 1 goto :error

echo [8/10] Installing Playwright...
call npx playwright install
if errorlevel 1 goto :error

echo [9/10] Installing MySQL2...
call npm install mysql2
if errorlevel 1 goto :error

echo.
echo ==========================================
echo   Setup completed successfully!
echo ==========================================
pause
exit /b 0

:error
echo.
echo ==========================================
echo   ERROR: Installation failed.
echo   Check the message above and try again.
echo ==========================================
pause
exit /b 1