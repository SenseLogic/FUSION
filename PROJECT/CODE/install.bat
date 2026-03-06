@echo Download and install Android Studio
@echo     https://developer.android.com/studio
@echo Install Microsoft Build of OpenJDK 21
@echo     winget install Microsoft.OpenJDK.21
@echo Open Android Studio
@echo     SDK Manager / Languages and Frameworks / Android SDK
@echo         Android 16.0 Baklava (API Level 36)
@echo     SDK Manager / Languages and Frameworks / SDK Tools
@echo         [+] Android SDK Build-Tools
@echo         [+] NDK (Side by side)
@echo         [+] Android SDK Command-line Tools
@echo         [+] CMake
@echo         [+] Android Emulator
@echo         [+] Android Emulator hypervisor (installer)
@echo         [+] Android SDK Platform-Tools
pause
dir /b "%ProgramFiles%\Android\Android Studio\jbr"
dir /b "%ProgramFiles%\Microsoft\jdk-*"
dir /b "%USERPROFILE%\AppData\Local\Android\Sdk\build-tools"
"C:\Program Files\Android\Android Studio\jbr\bin\java.exe" -version
"C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot\bin\java.exe" -version
call npm install -g yarn
cd SERVER
call install.bat
cd ..\CLIENT
call install.bat
cd ..\ADMIN
call install.bat
cd ..
pause
