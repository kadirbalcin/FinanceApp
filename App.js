import React from "react";
import Providers from "./Context/providers";
import Navigation from "./Navigation/AppStack";
import { AppearanceProvider } from "react-native-appearance";

const App = ({ navigation }) => {

  return (
    <AppearanceProvider>
      <Providers>
        <Navigation />
      </Providers>
    </AppearanceProvider>
  )

}

export default App;