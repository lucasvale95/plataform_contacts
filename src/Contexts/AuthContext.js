import React, { createContext, useEffect, useState } from "react";
import api from "../Services/api"

export const AuthContext = createContext()


function AuthProvider ({children}) {

	const [user, setUser] = useState({});
  const [contacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("@token");

      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await api.get("/users");
          setUser(data);

        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

	return (
		<AuthContext.Provider value={{user, loading, setUser, setContacts, contacts }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;