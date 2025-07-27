# Help Request App Setup Instructions

## Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database

### 2. Add Android App
1. In Firebase Console, click "Add app" and select Android
2. Use package name: `com.myapp1`
3. Download `google-services.json`
4. Place it in: `android/app/google-services.json`

### 3. Add iOS App (if needed)
1. In Firebase Console, click "Add app" and select iOS
2. Use bundle ID: `org.reactjs.native.example.myapp1`
3. Download `GoogleService-Info.plist`
4. Place it in: `ios/myapp1/GoogleService-Info.plist`

### 4. Configure Android Build Files

**android/build.gradle:**
```gradle
buildscript {
    dependencies {
        // ... other dependencies
        classpath 'com.google.gms:google-services:4.3.3'
    }
}
```

**android/app/build.gradle:**
```gradle
// Add at the bottom of the file
apply plugin: 'com.google.gms.google-services'
```

### 5. Configure iOS (if needed)
```bash
cd ios
pod install
cd ..
```

## Running the App

### Android
```bash
npx react-native run-android
```

### iOS
```bash
npx react-native run-ios
```

## Features

- ✅ User Authentication (Signup/Login)
- ✅ Home Screen with Navigation
- ✅ Book Appointment Form
- ✅ Request Help Form
- ✅ My Requests (View Appointments & Help Requests)
- ✅ Profile Management
- ✅ Settings & Legal Pages
- ✅ Bottom Navigation
- ✅ Firebase Firestore Integration
- ✅ Real-time Data Sync

## App Structure

```
src/
├── components/
│   └── LoadingScreen.tsx
├── context/
│   └── AuthContext.tsx
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── BookAppointmentScreen.tsx
│   ├── RequestHelpScreen.tsx
│   ├── MyRequestsScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
└── types/
    └── index.ts
```

## Firebase Collections

- `users` - User accounts
- `appointments` - Appointment requests
- `helpRequests` - Help requests

## Troubleshooting

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build issues**: Clean with `cd android && ./gradlew clean`
3. **iOS build issues**: Clean with `cd ios && xcodebuild clean` 