import React, { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiBase from "../Repository/ApiBase";
import * as AuthManager from "../Business/auth";
import { getUniqueId } from "react-native-device-info";
import { useAuth } from "../Hooks/use-auth";

export const AuthContext = createContext({
  User: {},
  setUser: (_user) => {},
  UserSettings: {},
  setUserSettings: (_data) => {},
});

const AuthProvider = ({ children }) => {
  const [User, setUser] = useState({});
  const [UserSettings, setUserSettings] = useState({});
  const { Check } = useAuth();

  const GetUser = async () => {
    try {
      const { data } = await AuthManager.GetCustomerInfo();
      if (data?.success) {
        setUser(data?.data);
        const resSettings = await AuthManager.GetCustomerInfoPrice();
        setUserSettings(resSettings?.data?.data);
      } else {
        const deviceId = getUniqueId();
        const postData = {
          deviceId,
        };
        AsyncStorage.removeItem("AuthToken");

        delete ApiBase.defaults.headers.common["Authorization"];
        delete ApiBase.defaults.headers.common["DeviceId"];
        setUser();
        Check();
        await AuthManager.Logout(postData);
      }
    } catch (e) {
      const deviceId = getUniqueId();
      const postData = {
        deviceId,
      };
      AsyncStorage.removeItem("AuthToken");

      delete ApiBase.defaults.headers.common["Authorization"];
      delete ApiBase.defaults.headers.common["DeviceId"];
      setUser();
      Check();
      await AuthManager.Logout(postData);
    }
  };
  return (
    <AuthContext.Provider
      value={{ User, setUser: GetUser, UserSettings, setUserSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
