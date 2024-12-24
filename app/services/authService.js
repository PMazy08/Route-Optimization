import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../config"; // หรือไฟล์ config ของ firebase ของคุณ

const auth = getAuth(app);

export const subscribeAuthState = (setUser, setIdToken) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      try {
        const token = await user.getIdToken();
        setIdToken(token); // เก็บ token ใน state
      } catch (error) {
        console.error("Error getting ID token:", error);
      }
    } else {
      setUser(null);
      setIdToken(null); // ล้าง token หากไม่มีผู้ใช้
    }
  });
};
