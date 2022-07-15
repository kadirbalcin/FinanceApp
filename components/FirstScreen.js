import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import colors from "../assets/colors/colors";
import { Dimensions } from 'react-native';
import GradientText from "./GradientText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../Hooks/use-auth";
import Spinner from "react-native-spinkit";
import Theme from "../constants/theme";

const windowWidth = Dimensions.get('window').width;

const FirstScreen = ({ navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { Check } = useAuth();

    const handleClick = async () => {
        try {
            setIsSubmitting(true);
            await AsyncStorage.setItem('loginFirst', "true")
            setTimeout(() => {
                Check();
                setIsSubmitting(false);
            }, 1500);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ImageBackground style={styles.SafeImage} imageStyle={{ opacity: 0.12 }} source={require("../assets/images/Rectangle.png")} >
            <SafeAreaView style={styles.SafeView}>
                <View style={styles.texts}>
                    <Text style={styles.text1} >Investing</Text>
                    <GradientText style={styles.text2} >Simplified</GradientText>
                </View>

                <View>
                    <Text style={styles.text3}>
                        On one simple platform, you can invest, borrow, and spend. Get the resources you need to start investing without paying commissions.
                    </Text>
                </View>

                <Image source={require("../assets/images/sekil1.png")} style={styles.img1} />
                <Image source={require("../assets/images/boga.png")} style={styles.img2} />

                <View style={{ zIndex: 20, flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.buton1}
                        activeOpacity={0.9}
                        onPress={handleClick}
                        disabled={isSubmitting}
                    >
                        {!isSubmitting ? (
                            <Text style={styles.butonText}>Sign Up</Text>
                        ) : (
                            <Spinner
                                color={Theme.colors.white}
                                isVisible
                                size={16}
                                type={"ThreeBounce"}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    butonText: {
        textAlign: "center",
        fontFamily: 'Outfit-Bold',
        fontSize: 16,
        color: 'white',
    },
    buton1: {
        padding: 17,
        backgroundColor: colors.pblack,
        width: 220,
        position: 'absolute',
        bottom: 10
    },
    img2: {
        width: windowWidth,
        height: 570,
        zIndex: 1,
        position: "absolute",
        bottom: -70
    },
    img1: {
        width: windowWidth,
        marginTop: 96,
        zIndex: 1
    },
    text3: {
        fontFamily: "Outfit-Light",
        marginTop: 16,
        fontSize: 17,
        marginLeft: 20,
        lineHeight: 30
    },
    texts: {
        marginTop: 50
    },
    text1: {
        fontFamily: "Outfit-Bold",
        fontSize: 43.2,
        marginLeft: 20,
        color: colors.pblack
    },
    text2: {
        fontFamily: "Outfit-Bold",
        fontSize: 43.2,
        marginLeft: 20,
    },
    SafeView: {
        flex: 1
    },
    SafeImage: {
        height: null,
        width: windowWidth,
        resizeMode: "cover",
        overflow: "hidden",
        flex: 1,
        backgroundColor: colors.secondary,
    }
})

export default FirstScreen;