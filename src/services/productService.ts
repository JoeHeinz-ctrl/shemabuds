import { 
  collection, 
  getDocs, 
  getDoc,
  doc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";

export interface FirebaseProduct {
  id?: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  images?: string[];
  badge: string;
  customizationOptions?: {
    label: string;
    options: string[];
  }[];
  demo?: boolean;
  featured?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const PRODUCTS_COLLECTION = "products";

// Get all products
export const getAllProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseProduct));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<FirebaseProduct[]> => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseProduct));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// Get single product
export const getProduct = async (id: string): Promise<FirebaseProduct | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as FirebaseProduct;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Add new product
export const addProduct = async (product: Omit<FirebaseProduct, 'id'>): Promise<string | null> => {
  try {
    const productData = {
      ...product,
      demo: product.demo ?? false,
      featured: product.featured ?? false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// Update product
export const updateProduct = async (id: string, product: Partial<FirebaseProduct>): Promise<boolean> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    return false;
  }
};

// Delete product
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

// Get featured products
export const getFeaturedProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where("featured", "==", true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseProduct));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

// Get non-demo products
export const getRealProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where("demo", "==", false)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseProduct));
  } catch (error) {
    console.error("Error fetching real products:", error);
    return [];
  }
};

// Get all unique categories (from both categories collection and products)
export const getCategories = async (): Promise<string[]> => {
  try {
    // Get categories from the categories collection
    const dbCategories = await getAllCategoriesFromDb();
    
    // Get categories from products as fallback
    const products = await getAllProducts();
    const productCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    
    // Merge and deduplicate
    const allCategories = [...new Set([...dbCategories, ...productCategories])];
    return allCategories.sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Delete a category (clears category field on related products)
export const deleteCategory = async (category: string): Promise<void> => {
  try {
    const products = await getAllProducts();
    const updates = products.filter(p => p.category === category);
    for (const product of updates) {
      if (product.id) {
        await updateProduct(product.id, { category: "" });
      }
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    // Swallow error to keep UI flow; could rethrow if needed
  }
};

// Add a new category to the categories collection
export const addCategory = async (categoryName: string): Promise<boolean> => {
  try {
    const categoryRef = doc(db, "categories", categoryName);
    await setDoc(categoryRef, {
      name: categoryName,
      createdAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("Error adding category:", error);
    return false;
  }
};

// Get all categories from the categories collection
export const getAllCategoriesFromDb = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    return querySnapshot.docs.map(doc => doc.id).sort();
  } catch (error) {
    console.error("Error fetching categories from DB:", error);
    return [];
  }
};
