import React from "react"
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, FlatList } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import totalInvestments from "../assets/data/totalInvestments";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {

    const renderItem = ({ item }) => (
        <LinearGradient
            colors={["#EE9B27", "#E14D28", "#6F84B8"]}
            style={{
                padding: 2,
                justifyContent: 'center',
                flex: 1,
                margin: 20
            }}
            start={{ x: 0, y: 0.25 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={{
                backgroundColor: '#FFF8EE',
                padding: 20,
            }}>
                <View style={{ width: 38, height: 38, backgroundColor: colors.white, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={item.image} style={{ width: 22, height: 22 }} />
                </View>

                <Text style={{ marginTop: 23, fontFamily: 'Outfit-Regular', fontSize: 16 }} >{item.title}</Text>
                <Text style={{ marginTop: 10, fontFamily: 'Outfit-Bold', fontSize: 16 }} >{item.price}</Text>

            </View>
        </LinearGradient>

    );

    return (
        <SafeAreaView style={styles.SafeView}>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.text1} >Hey Olivia</Text>
                    <Text style={styles.text2}>Investor</Text>
                </View>
                <Image source={require('../assets/images/user.png')} style={styles.userimg} />
            </View>

            {/* Balance */}
            <View style={styles.balance}>
                <LinearGradient colors={["#EE9B27", "#E14D28", "#6F84B8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.10, y: 0 }}>
                    <ImageBackground style={styles.SafeImage} imageStyle={{ opacity: 0.12 }} source={require("../assets/images/Rectangle.png")} >
                        <View style={styles.inner}>
                            <Text style={styles.totalInv}>Total Investments</Text>
                            <Text style={styles.totalAmo}>$872,543.10</Text>
                            <View
                                style={{
                                    borderBottomColor: colors.white,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />

                            <View style={styles.gainLost}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.g} >Gain </Text>
                                    <Text style={styles.g2} >$610,780.17</Text>
                                </View>

                                <View
                                    style={{
                                        borderRightColor: 'white',
                                        borderRightWidth: StyleSheet.hairlineWidth,
                                    }}
                                />

                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.g} >Loss</Text>
                                    <Text style={styles.g2} >$261,762.93</Text>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                </LinearGradient>
            </View>

            <View style={styles.totalInvestment}>
                <Text style={styles.totalYazi}>Total Investments</Text>
            </View>
            <View style={styles.totalInvestment2}>
                <FlatList
                    data={totalInvestments}
                    style={{ flex: 1 }}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    totalYazi: {
        fontFamily: "Outfit-Semibold",
        fontSize: 21,
    },
    totalInvestment2: {
        backgroundColor: colors.white,
        height: windowHeight,
        marginTop: -20
    },
    totalInvestment: {
        backgroundColor: colors.white,
        marginTop: 20,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
        padding: 25
    },
    g: {
        color: colors.white,
        fontFamily: "Outfit-Light",
        fontSize: 15,
    },
    g2: {
        color: colors.white,
        fontFamily: "Outfit-Medium",
        fontSize: 18
    },
    gainLost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: "relative"
    },
    totalAmo: {
        color: colors.white,
        fontSize: 25,
        marginTop: 5,
        fontFamily: "Outfit-Extrabold"
    },
    inner: {
        padding: 20,
    },
    totalInv: {
        color: colors.white,
        fontSize: 20,
        fontFamily: "Outfit-Light"
    },
    SafeImage: {
        height: null,
        width: windowWidth,
        resizeMode: "cover",
    },
    balance: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    userimg: {
        width: 55,
        height: 55,
        borderRadius: 14
    },
    text2: {
        fontFamily: 'Outfit-Light',
        fontSize: 17,
        marginTop: 5
    },
    text1: {
        fontFamily: 'Outfit-Bold',
        fontSize: 28,
        marginTop: 20,
        color: colors.primary
    },
    SafeView: {
        flex: 1,
        backgroundColor: colors.secondary
    }
});

export default HomeScreen;