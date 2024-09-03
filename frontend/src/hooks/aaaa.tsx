import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { SignupInput, SigninInput } from "@boss109/sedium-common";
import { toast } from "react-toastify";

// Define the types for the context values
interface UserType {
  isAdmin: boolean;
  email?: string;
  id?: string;
  password?: string;
  username?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  storeTokenInLocal: (authToken: string) => void;
  logoutFunc: () => void;
  user: UserType;
  services: any[];
  adminUserData: string;
  adminContactData: string;
  isAdminn: boolean;
  tokenval: string | null;
  balance: number;
  accountId: number;
  signup: (userData: SignupInput) => void;
  signin: (userData: SigninInput) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [tokenval, setTokenval] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<UserType>({ isAdmin: false });
  const [services, setServices] = useState<any[]>([]);
  const [adminUserData, setAdminUserData] = useState<string>("");
  const [adminContactData, setAdminContactData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdminn, setIsAdminn] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [accountId, setAccountId] = useState<number>(0);

  const storeTokenInLocal = (authToken: string) => {
    setTokenval(authToken);
    return localStorage.setItem('token', authToken);
  };

  const isLoggedIn = !!tokenval;

  const logoutFunc = () => {
    setTokenval("");
    setUser({ isAdmin: false });
    return localStorage.removeItem('token');
  };

  const signup = async (userData: SignupInput): Promise<boolean> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, userData);
      const jwt = response.data.jwt;
      storeTokenInLocal(jwt);
      return true;
    } catch (e) {
      // toast.info("Error while signing up");
      return false;
    }
  };
  
  const signin = async (userData: SigninInput): Promise<boolean> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, userData);
      console.log(response)
      const jwt = response.data.jwt;
      setUser(response.data.username)
      storeTokenInLocal(jwt);
      return true;
    } catch (e) {
      // toast.info("Error while signing in");
      return false;
    }
  };

  useEffect(() => {
    // Function to fetch user data
    const userDataCollection = async () => {
      try {
        // Fetch user data only if tokenval is not null or empty
        if (tokenval) {
          const response = await fetch(`${BACKEND_URL}/user/data`, {
            method: "GET",
            headers: {
              Authorization: `${tokenval}`
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("user data", data);
            // Ensure data.user is correctly structured
            const userData = data.user;
            setUser(userData);
            console.log("Updated user state:", userData); // Log the updated user state
          } else {
            // Handle response not ok
            console.log("Loading State Error");
          }
        }
      } catch (error) {
        // Handle error
        console.log("Error Fetching User Data", error);
      }
    };

    // Call userDataCollection when tokenval changes
    userDataCollection();
  }, [tokenval]);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      storeTokenInLocal,
      logoutFunc,
      user,
      services,
      adminUserData,
      adminContactData,
      isAdminn,
      tokenval,
      balance,
      accountId,
      signin,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};