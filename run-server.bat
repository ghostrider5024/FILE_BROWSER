@echo off
cd /d %~dp0
set /p FOLDER_TO_SERVE=Nhap duong dan folder muon serve (mac dinh se la D:\):

node server.js "%FOLDER_TO_SERVE%"
pause
