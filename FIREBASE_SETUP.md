# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## 2. Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Enable the provider
4. Click **Save**

## 3. Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Start in production mode**
4. Select your preferred region
5. Click **Enable**

## 3a. Set Up Firebase Storage

1. In Firebase Console, go to **Build** → **Storage**
2. Click **Get started**
3. Choose **Start in test mode** (for development) or **Start in production mode**
4. Select the same region as your Firestore database
5. Click **Done**

## 4. Configure Firestore Security Rules

Replace the default rules with these secure rules that ensure users can only access their own notes:

**Firestore Rules:**
```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own typed notes
    match /notes/{noteId} {
      allow read: if request.auth != null && 
                     request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
      allow update: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
      allow delete: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
    }
    
    // Users can only read/write their own handwritten notes
    match /handwrittenNotes/{noteId} {
      allow read: if request.auth != null && 
                     request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
      allow update: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
      allow delete: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Users can only read/write/delete their own handwritten note images
    match /handwrittenNotes/{userId}/{noteId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

To apply the Firestore rules:
1. In Firestore Database, go to the **Rules** tab
2. Replace the existing rules with the Firestore rules above
3. Click **Publish**

To apply the Storage rules:
1. In Storage, go to the **Rules** tab
2. Replace the existing rules with the Storage rules above
3. Click **Publish**

## 5. Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon) → **General**
2. Scroll down to **Your apps**
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Student Productivity App")
5. Copy the `firebaseConfig` object values

## 6. Configure Environment Variables

Create a `.env` file in the root of your project with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 7. Test Your Setup

1. Start your application
2. Try creating an account with email and password
3. Create a few notes
4. Log out and log back in to verify notes are saved
5. Create a second account and verify you cannot see the first user's notes

## Security Best Practices

- **Never commit** your `.env` file to version control (it's already in `.gitignore`)
- Use Firebase's **production mode** security rules before deploying
- Regularly review your Firebase usage to avoid unexpected costs
- Enable **App Check** in production to prevent abuse
- Consider adding **rate limiting** for authentication endpoints

## Firestore Data Structure

### Typed Notes Collection (`notes`)

Typed notes are stored with the following structure:

```javascript
{
  userId: "user_auth_uid",          // Owner of the note
  title: "Note Title",              // Note title
  content: "Note content...",       // Note text content
  tags: ["Biology", "Mathematics"], // Array of tags
  createdAt: Timestamp,             // Creation timestamp
  updatedAt: Timestamp              // Last update timestamp
}
```

### Handwritten Notes Collection (`handwrittenNotes`)

Handwritten notes are stored in Firestore with metadata, while the actual canvas images are stored in Firebase Storage:

**Firestore Document:**
```javascript
{
  userId: "user_auth_uid",          // Owner of the note
  title: "Note Title",              // Note title
  imageUrl: "https://firebasestorage.googleapis.com/...", // URL to canvas image in Storage
  tags: ["Art", "Sketch", "Diagram"], // Array of tags
  createdAt: Timestamp,             // Creation timestamp
  updatedAt: Timestamp              // Last update timestamp
}
```

**Storage Path:**
```
/handwrittenNotes/{userId}/{noteId}.png
```

This approach keeps Firestore documents small and efficient while storing large canvas images in Firebase Storage, which is optimized for binary data.
