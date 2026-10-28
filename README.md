# Logistics Service Management

A production-ready starter logistics dashboard app built with Expo and React Native.

## Features
- Shipment dashboard overview
- Fleet and route monitoring
- Inventory tracking panel
- Modern mobile-first UI
- Ready for Expo Android / iOS / web deployment

## Run locally

### 1) Install dependencies
```bash
npm install
```

### 2) Start the Expo app
```bash
npm start
```

Then choose one of these:
```bash
npm run android
npm run ios
npm run web
```

## Build for deployment

### Install Expo EAS CLI globally
```bash
npm install -g eas-cli
```

### Login to Expo
```bash
eas login
```

### Build for Android
```bash
eas build --platform android
```

### Build for iOS
```bash
eas build --platform ios
```

### Export web bundle
```bash
npm run build:web
```

## Project structure
```bash
.
├── App.js
├── app.json
├── eas.json
├── package.json
├── README.md
├── .gitignore
└── node_modules/
```

## Notes
This app is prepared for Expo deployment and can be extended with:
- authentication and admin login
- real-time tracking APIs
- database integration
- route optimization
- driver and warehouse management

## Typical deployment targets
- Expo Go for testing
- Google Play / App Store via EAS Build
- Web deployment via Expo web export or a host like Netlify/Vercel
