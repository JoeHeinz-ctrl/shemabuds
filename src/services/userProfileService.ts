import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface UserProfile {
  userId: string;
  name?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  lastUpdated: Date;
}

const USER_PROFILES_COLLECTION = "userProfiles";

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, USER_PROFILES_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Save or update user profile
export const saveUserProfile = async (profile: Omit<UserProfile, 'lastUpdated'>): Promise<boolean> => {
  try {
    const docRef = doc(db, USER_PROFILES_COLLECTION, profile.userId);
    const docSnap = await getDoc(docRef);
    
    const profileData = {
      ...profile,
      lastUpdated: new Date()
    };
    
    if (docSnap.exists()) {
      // Update existing profile
      await updateDoc(docRef, profileData);
    } else {
      // Create new profile
      await setDoc(docRef, profileData);
    }
    
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    return false;
  }
};
