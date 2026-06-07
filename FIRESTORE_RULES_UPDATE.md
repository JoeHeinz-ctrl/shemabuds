# Firestore Rules Update Required

## What Changed
The `firestore.rules` file has been updated to include write permissions for the `categories` collection. This allows the admin panel to add, update, and delete categories.

## How to Deploy

### Option 1: Firebase Console (Easiest)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your "Shema Buds" project
3. Go to **Firestore Database** → **Rules**
4. Copy the contents of `firestore.rules` from this project
5. Paste it into the Firebase Console rules editor
6. Click **Publish**

### Option 2: Firebase CLI (If installed)
```bash
firebase deploy --only firestore:rules
```

### Option 3: Install Firebase CLI locally
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

## What the Rules Do
- **Products**: Only admins can write, everyone can read
- **Categories**: Only admins can write, everyone can read
- **Orders**: Users can create and read their own, admins can manage all
- **User Profiles**: Users can read/write their own profile

## After Deploying
Once the rules are deployed:
1. Go to the admin panel → Categories
2. Add a new category (e.g., "Bouquets", "Gifts", etc.)
3. The category will appear in the product dropdown when adding/editing products

## Troubleshooting
If categories still don't appear:
1. Refresh the browser
2. Check the browser console for errors (F12 → Console)
3. Verify you're logged in as an admin
4. Make sure Firestore rules have been deployed
