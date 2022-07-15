import React from "react";
import { LoginProvider } from "../Hooks/use-auth";

const Providers = ({ children }) => {
    return (
        <LoginProvider>
            {children}
        </LoginProvider>
    );
};
export default Providers;
