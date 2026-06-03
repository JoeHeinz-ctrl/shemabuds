# Firestore Setup Guide

## 🔥 Issue: Orders Not Persisting After Refresh

If orders are not showing after page refresh, it's likely due to Firestore security rules blocking read access.

## 📋 Steps to Fix

### 1. Update Firestore Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **shemabuds-9c9fe**
3. Click on **Firestore Database** in the left sidebar
4. Click on **Rules** tab at the top
5. Replace the existing rules with the content from `firestore.rules` file in this project
6. Click **Publish** button

### 2. Verify Rules Are Applied

After publishing, you should see rules similar to this:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      request.auth.token.admin == true);
      allow update, delete: if request.auth != null && 
                               request.auth.token.admin == true;
    }
    // ... more rules
  }
}
```

### 3. Test the Connection

1. Open `test-firestore.html` in your browser
2. Add your Firebase config from `.env` file to the script
3. Click "Test Firebase Connection"
4. Click "Test Create Order"
5. Click "Test Read Orders"

If all tests pass, your Firestore is properly configured!

### 4. Common Issues

#### ❌ Permission Denied
- **Cause**: User is not authenticated or rules are too restrictive
- **Fix**: Ensure user is signed in before placing orders
- **Check**: User should see their profile in the header

#### ❌ Missing Required Fields
- **Cause**: Order data is incomplete
- **Fix**: All required checkout fields must be filled

#### ❌ Orders Not Showing After Refresh
- **Cause**: Firestore rules blocking read access
- **Fix**: Update rules as described in Step 1

## 🧪 Testing Checklist

- [ ] User can sign in/sign up
- [ ] User can add products to cart
- [ ] User can complete checkout form
- [ ] Order is created (check Firebase Console)
- [ ] Order appears in "My Orders" section
- [ ] Order persists after page refresh
- [ ] Order shows on mobile Orders tab
- [ ] Admin can see all orders in admin dashboard

## 🔍 Debugging

### Check Browser Console

When placing an order, check the browser console for:

**Success:**
```
✅ Order saved successfully with ID: xyz123
```

**Permission Denied:**
```
❌ Error saving order: Missing or insufficient permissions
Error code: permission-denied
```

**Network Error:**
```
❌ Error saving order: Failed to fetch
```

### Check Firestore Console

1. Go to Firebase Console → Firestore Database
2. Click on "Data" tab
3. Look for "orders" collection
4. Check if orders are being created
5. Check if userId field matches authenticated user

## 📞 Still Having Issues?

If orders still don't persist:

1. Clear browser cache and cookies
2. Sign out and sign in again
3. Try placing a test order
4. Check browser console for errors
5. Verify Firebase config in `.env` file
6. Check Firestore rules in Firebase Console

## ✅ Expected Behavior

**After placing an order:**
1. Confetti celebration animation plays
2. Success message shows
3. User redirected to Orders page
4. Order appears in the list
5. After refresh, order still appears
6. Mobile and desktop both show the order
