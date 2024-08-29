import { PreventRemoveContext, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Dimensions, Pressable, Image } from "react-native";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get('window');


const PrivacyPolicyScreen = () => {
    const navigation = useNavigation();
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#F5F5F5' }]}>
            <View style={[styles.firstContainer, { backgroundColor: isDarkTheme ? '#333' : '#55AD9B' }]}>
                <View style={styles.arrowContainer}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.circle}>
                        <Image source={require('../assets/Arrowback.png')} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={[styles.settingsText, { color: isDarkTheme ? '#fff' : '#000' }]}>Privacy Policy</Text>
                </View>
            </View>
            <View style={styles.secondContainer}>
                <Text style={[styles.privacyText, { color: isDarkTheme ? '#fff' : '#000' }]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                <View style={styles.horizontalLine} />
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Agree</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>DisAgree</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
export default PrivacyPolicyScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstContainer: {
        width: '100%',
        height: height * 0.12,
        justifyContent: 'center',
    },
    secondContainer: {
        flex: 1,
    },
    arrowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        marginTop: '5%',
    },
    circle: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: (width * 0.1) / 2,
        marginRight: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'#fff'
    },
    arrowIcon: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },
    settingsText: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 32,
    },
    privacyText: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 32,
        color: '#000',
        textAlign: 'left',
        paddingHorizontal: '3%',
        marginTop: '3%'
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#999999',
        marginTop: '5%',
    },
 
        buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
        button: {
        width: '90%',
        paddingVertical: height * 0.015,
        borderRadius: 40,
        alignItems: 'center',
        marginBottom: '5%',
        backgroundColor:"#95D2B3"
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '400',
        color: '#000',
    },
 
})


