import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

// Test function to verify Firebase connection
export const testFirebaseConnection = async () => {
  console.log("🔥 Testing Firebase Connection...");
  
  try {
    // Test 1: Try to add a test order
    console.log("📝 Test 1: Adding test order...");
    const testOrder = {
      customerName: "Test Customer",
      phone: "1234567890",
      whatsapp: "1234567890",
      deliveryMethod: "pickup",
      eventDate: "2026-12-31",
      items: [],
      estimatedTotal: 0,
      status: "new",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, "orders"), testOrder);
    console.log("✅ Test order added successfully! ID:", docRef.id);
    
    // Test 2: Try to read orders
    console.log("📖 Test 2: Reading orders...");
    const querySnapshot = await getDocs(collection(db, "orders"));
    console.log("✅ Found", querySnapshot.size, "orders");
    
    querySnapshot.forEach((doc) => {
      console.log("Order:", doc.id, doc.data());
    });
    
    console.log("🎉 Firebase is working correctly!");
    return true;
  } catch (error: any) {
    console.error("❌ Firebase test failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    if (error.code === "permission-denied") {
      console.error("🔒 PERMISSION DENIED: You need to update Firestore security rules!");
      console.error("Go to Firebase Console → Firestore → Rules");
      console.error("Set: allow create: if true; for orders collection");
    }
    
    return false;
  }
};

// Make it available globally for testing in browser console
if (typeof window !== 'undefined') {
  (window as any).testFirebase = testFirebaseConnection;
}
