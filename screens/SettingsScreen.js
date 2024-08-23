import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, View, Image, Pressable } from "react-native";

const { width, height } = Dimensions.get('window');

const SettingsScreen = () => {
    const navigation = useNavigation();

    const handleArrow = ()=>{
       navigation.goBack();
    };

   
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <View style={styles.arrowContainer}>
                    <Pressable style={styles.circle} onPress={handleArrow}>
                        <Image source={require('../assets/Arrowback.png')} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={styles.settingsText}>Settings</Text>
                </View>
            </View>
            <View style={styles.secondContainer}>
                <Pressable style={styles.menuItemContainer}>
                    <Text style={styles.menuItemText}>Theme</Text>
                </Pressable>
                <View style={styles.horizontalLine} />
                <Pressable style={styles.menuItemContainer}>
                    <Text style={styles.menuItemText}>Privacy Policy</Text>
                </Pressable>
                <View style={styles.horizontalLine} />
                <Pressable style={styles.menuItemContainer}>
                    <Text style={styles.menuItemText}>Contact us</Text>
                </Pressable>
                <View style={styles.horizontalLine} />
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', 
    },
    firstContainer: {
        width: '100%',
        height: height * 0.12, 
        backgroundColor: '#55AD9B',
        justifyContent: 'center',
    },
    secondContainer: {
        flex: 1,
        paddingHorizontal: '5%', 
        paddingTop: '3%',
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
        borderColor: '#fff',
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
        color: '#fff',
    },
    menuItemContainer: {
        paddingVertical: '3%',
    },
    menuItemText: {
        fontSize: 18, 
        fontWeight: '400',
        lineHeight: 28,
    },
    horizontalLine: {
        borderWidth: 1,
        borderColor: '#CACACA',
        width: '100%', 
    },
});
