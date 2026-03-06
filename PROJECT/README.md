# Fusion Project

## Installation

Download and install Android Studio :

    https://developer.android.com/studio

Install Microsoft Build of OpenJDK 21 :

```
winget install Microsoft.OpenJDK.21
```

Open Android Studio :

    SDK Manager / Languages and Frameworks / Android SDK

        Android 16.0 (API Level 36)

    SDK Manager / Languages and Frameworks / SDK Tools

        [+] Android SDK Build-Tools
        [+] NDK (Side by side)
        [+] Android SDK Command-line Tools
        [+] CMake
        [+] Android Emulator
        [+] Android Emulator hypervisor (installer)
        [+] Android SDK Platform-Tools

Open a cmd shell :

```
sdkmanager --licenses
define_master_environment_variables
```

Open a new cmd shell :

```
cd CODE
install
```

## Development

```
cd CODE
build
run
```

## Deployment

- Type : Docker
- Root directory : CODE
- Dockerfile Path : CODE/Dockerfile
- Docker Build Directory : CODE/
