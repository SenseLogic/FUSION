winget install -e --id Git.Git
winget install -e --id OpenJS.NodeJS
call "%ProgramFiles%\nodejs\npm.cmd" install -g corepack
@echo on
call "%APPDATA%\npm\corepack.cmd" enable
@echo on
call "%APPDATA%\npm\corepack.cmd" install --global yarn@stable
@echo on
winget install Microsoft.OpenJDK.21
winget install -e --id Google.AndroidStudio
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx ANDROID_SDK_ROOT "%LOCALAPPDATA%\Android\Sdk"
pause
@echo Open Android Studio
@echo     More Actions / SDK Manager / Languages and Frameworks / Android SDK
@echo         SDK Platforms
@echo             Android 16.0 Baklava (API Level 36)
@echo                 [+] Android SDK Platform 36
@echo                 [+] Sources for Android 36
@echo                 [+] Google Play Intel x86_64 Atom System Image
@echo         SDK Tools
@echo             [+] Android SDK Build-Tools
@echo             [+] NDK (Side by side)
@echo             [+] Android SDK Command-line Tools (latest)
@echo             [+] CMake
@echo             [+] Android Emulator
@echo             [+] Android Emulator hypervisor driver (installer)
@echo             [+] Android SDK Platform-Tools
pause
dir /b "%LOCALAPPDATA%\Android\Sdk\platform-tools"
dir /b "%ProgramFiles%\Android\Android Studio\jbr"
dir /b "%LOCALAPPDATA%\Android\Sdk\cmdline-tools\latest\bin"
dir /b "%ProgramFiles%\Microsoft\jdk-*"
dir /b "%USERPROFILE%\AppData\Local\Android\Sdk\build-tools"
pause
"%ProgramFiles%\nodejs\node.exe" -v
call "%ProgramFiles%\nodejs\npm.cmd" -v
@echo on
call "%LOCALAPPDATA%\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --version
@echo on
"%ProgramFiles%\Android\Android Studio\jbr\bin\java.exe" --version
"%ProgramFiles%\Microsoft\jdk-21.0.11.10-hotspot\bin\java.exe" --version
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" --version
call "%APPDATA%\npm\corepack.cmd" --version
@echo on
pause
echo "%ProgramFiles%\Microsoft\jdk-21.0.11.10-hotspot\bin"
where java
echo "%LOCALAPPDATA%\Android\Sdk\cmdline-tools\latest\bin"
where sdkmanager
echo "%LOCALAPPDATA%\Android\Sdk\platform-tools"
where adb
echo "%APPDATA%\npm"
where node
where npm
pause
call sdkmanager --licenses
@echo on
rem keytool -genkeypair -v -keystore my-release-key.jks -alias mykey -keyalg RSA -keysize 4096 -validity 10000
pause
java --version
node -v
call npm -v
@echo on
call adb --version
@echo on
pause
cd SITE
call install.bat
cd ..\CLIENT
call install.bat
cd ..\ADMIN
call install.bat
cd ..
pause
