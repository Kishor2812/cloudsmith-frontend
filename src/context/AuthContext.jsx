import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "cloudsmithUser"
      );

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);


  const login = (
  userData,
  token
) => {

  setUser(userData);

  localStorage.setItem(
    "cloudsmithUser",
    JSON.stringify(userData)
  );

  if (token) {

    localStorage.setItem(
      "token",
      token
    );

  }
};

  const logout = () => {

    setUser(null);

    localStorage.removeItem(
      "cloudsmithUser"
    );

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "email"
    );

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export default AuthProvider;