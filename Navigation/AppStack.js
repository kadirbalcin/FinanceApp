import { NavigationContainer } from "@react-navigation/native";
import FirstScreen from "../components/FirstScreen";
import HomeScreen from "../components/HomeScreen";
import { useState } from 'react';
import { useAuth } from '../Hooks/use-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, Icons } from "../constants";
import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import TabStack from "./TabStack";

const App = createStackNavigator();
const Root = createStackNavigator();

const RootStack = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [StartScreen, setStartScreen] = useState("Splash");
    const { user, Check } = useAuth();

    Check();
    checkUserState(setIsLoading, setStartScreen, Set);

    return isLoading ? null : AppStack(StartScreen, "light", user);
    // isLoading olurken null dönüyor çünkü splash screen App.js çalıştığında kapanıyor.
};

const checkUserState = async (setIsLoading, setStartScreen, Set) => {
    const splashStorage = await AsyncStorage.getItem("@SplashShow");

    const AuthToken = await AsyncStorage.getItem("AuthToken");

    if (AuthToken) {
        const deviceId = getUniqueId();
        ApiBase.defaults.headers.Authorization = "Bearer " + AuthToken;
        ApiBase.defaults.headers.DeviceId = deviceId;
    }
    if (splashStorage === "false") {
        setStartScreen("Auth");
    } else {
        setStartScreen("Splash");
    }

    setIsLoading(false);
};

const AppStack = (StartScreen, scheme, user) => {
    const NavigationStack = () => {
        return (
            <App.Navigator
                initialRouteName={StartScreen}
                screenOptions={{
                    gestureEnabled: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerTitleStyle: {
                        color:
                            scheme === "dark" ? Theme.colors.white : Theme.colors.primary,
                        fontSize: Theme.sizes.h4,
                        fontFamily: Theme.fonts.semiBold,
                    },
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: scheme === "dark" ? "#000" : Theme.colors.white,
                        shadowOffset: { width: 0, height: 0 },
                        elevation: 0,
                    },
                    headerLeft: (props) => _renderHeaderLeft(props, scheme),
                }}
            >
                <>
                    {user ? (
                        <>
                            <App.Screen
                                name="Home"
                                component={TabStack}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <App.Screen
                                name="Auth"
                                component={FirstScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </>
                    )}
                </>
            </App.Navigator>
        );
    };

    const DarkTheme = {
        dark: true,
        colors: {
            background: "#111",
            text: "#fff",
            border: "#333",
        },
    };
    const DefaultTheme = {
        dark: false,
        colors: {
            background: Theme.colors.white,
            text: Theme.colors.primary,
            border: Theme.colors.gray2,
        },
    };

    const getActiveRouteName = (navigationState) => {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        // dive into nested navigators
        if (route.routes) {
            return getActiveRouteName(route);
        }
        return route.routeName;
    };

    return (
        <NavigationContainer
            linking={{
                prefixes: ["guzella:app//"],
                config: {
                    screens: {
                        App: {
                            screens: {
                                Home: {
                                    screens: {
                                        User: {
                                            path: "User",
                                        },
                                        Home: {
                                            screens: {
                                                Home: {
                                                    screens: {
                                                        Home: {
                                                            path: "/:Type/:Id/:Name",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }}
            theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Root.Navigator // Main Routing Ekranlar
                initialRouteName="App"
                detachInactiveScreens
                headerMode={"float"}
                mode="modal"
            >
                <Root.Screen
                    name="App"
                    options={{ headerShown: false }}
                    component={NavigationStack}
                />
            </Root.Navigator>
        </NavigationContainer>
    );

};

// const AppStack = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 {
//                     LoginFirst == "true" ? (
//                         <>
//                             <Stack.Screen name="Home" component={HomeScreen} />
//                         </>
//                     ) : (
//                         <>
//                             <Stack.Screen name="Signup" options={{ headerShown: false }} component={FirstScreen} />
//                             <Stack.Screen name="Home3" component={HomeScreen} />
//                         </>
//                     )
//                 }
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

export default RootStack;