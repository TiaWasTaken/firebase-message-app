import { create } from "zustand";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if(!uid) return set({ currentUser: null , isLoading: false });
    
    // fetch user info from server
    try {
      
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() , isLoading: false });
      } else {
        console.log("No such document!");
        set({ currentUser: null , isLoading: false });
      }

    } catch (err) {
      console.error(err); 
      return set({ currentUser: null , isLoading: false });
    }
  }
}));
