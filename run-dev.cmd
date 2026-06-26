@echo off
cd /d "%~dp0"
set NODE_OPTIONS=--use-system-ca
node_modules\.bin\next.cmd dev -H 0.0.0.0 -p 3000
