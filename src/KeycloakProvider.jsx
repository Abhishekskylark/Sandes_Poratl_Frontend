// import { createContext, useContext, useEffect, useState } from "react";
// import keycloak from "./keycloak"; // 👈 Ensure this imports your configured Keycloak instance
// import { toast } from "react-toastify";

// const KeycloakContext = createContext();

// export const KeycloakProvider = ({ children }) => {
//   const [initialized, setInitialized] = useState(false);
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     keycloak
//       .init({
//         onLoad: "check-sso",
//         pkceMethod: "S256",
//         silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
//       })
//       .then((auth) => {
//         setAuthenticated(auth);
//         setInitialized(true);

//         // 🔐 Auto-logout on token expiry
//         keycloak.onTokenExpired = () => {
//           toast.error("Session expired. Logging out...");
//           keycloak.logout({ redirectUri: window.location.origin + "/LoginAdmin" });
//         };
//       })
//       .catch((err) => {
//         console.error("Keycloak init failed", err);
//         setInitialized(true);
//       });
//   }, []);

//   return (
//     <KeycloakContext.Provider value={{ keycloak, initialized, authenticated }}>
//       {children}
//     </KeycloakContext.Provider>
//   );
// };

// export const useKeycloak = () => useContext(KeycloakContext);





import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "./keycloak";
import { toast } from "react-toastify";

const KeycloakContext = createContext();

export const KeycloakProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      })
      .then(async (auth) => {
        setAuthenticated(auth);
        setInitialized(true);

        if (auth) {
          const profile = await keycloak.loadUserProfile();
          console.log("profile",profile);
          
          setUserInfo(profile);
        }

        keycloak.onTokenExpired = () => {
          toast.error("Session expired. Logging out...");
          keycloak.logout({ redirectUri: window.location.origin + "/LoginAdmin" });
        };
      })
      .catch((err) => {
        console.error("Keycloak init failed", err);
        setInitialized(true);
      });
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloak, initialized, authenticated, userInfo }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
