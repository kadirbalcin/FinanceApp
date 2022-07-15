/* eslint-disable react/display-name */
import React, { useEffect, useContext } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Theme, Icons } from "../constants/index";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";
import HomeScreen from "../components/HomeScreen";
import { SvgFromXml } from "react-native-svg";

const Tab = createBottomTabNavigator();
const ICON_SIZE = 22;

const TabStack = () => {
    const scheme = useColorScheme();
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    borderTopWidth: 0
                }
            }}
            tabBarOptions={{
                inactiveTintColor: colors.text,
                activeTintColor: Theme.colors.danger,
                showLabel: false,
                keyboardHidesTabBar: true,
                style: {
                    borderTopWidth: 0,
                    elevation: 0
                },
                tabStyle: {
                    height: 60,
                },
                labelStyle: {
                    marginTop: 5,
                    fontSize: Theme.sizes.caption,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => {
                        return (
                            <SvgFromXml
                                width={ICON_SIZE}
                                height={ICON_SIZE}
                                fill={color}
                                xml={Icons.home}
                            />
                        );
                    },
                }}
                component={HomeScreen}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    cart: {
        position: "relative",
    },
    cartCount: {
        position: "absolute",
        right: -6,
        top: -5,
        zIndex: 2,
        backgroundColor: Theme.colors.danger,
        width: 15,
        height: 15,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    cartCountText: {
        color: Theme.colors.white,
        fontSize: 10,
    },
});

export default TabStack;
