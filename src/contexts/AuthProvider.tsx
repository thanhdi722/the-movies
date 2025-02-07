"use client";
import { getUserById } from "@/api/account/getAccount";
import Provider from "@/utils/Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "react-toastify";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  cartCount: number;
  addToCart: (product: unknown) => void;
  clearCart: () => void;
  dataProfile: unknown;
  isLoading: boolean;
  error: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof window !== "undefined" && !!localStorage.getItem("accessToken")
  );

  // Cart state and functions
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(storedCart.length);
  }, []);

  const addToCart = (product: unknown) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartCount(0);
  };

  // Auth functions
  const login = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("cart"); // Clear cart when logging out
      setIsAuthenticated(false);
      setCartCount(0);

      router.push("/login"); // Navigate to login page immediately
    } else {
      console.error("Logout failed: window is undefined");
    }
  };

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [dataProfile, setDataProfile] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchDataProfile = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          const data = await getUserById(userId as string);
          setDataProfile(data);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDataProfile();
  }, [userId]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AuthContext.Provider
          value={{
            isAuthenticated,
            login,
            logout,
            cartCount,
            addToCart,
            clearCart,
            dataProfile,
            isLoading,
            error,
          }}
        >
          {children}
        </AuthContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
