
import React from "react";
import { Dimensions, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const SettingsScreen = () => {
    const navigation = useNavigation();

    const handleArrow = ()=>{
       navigation.goBack();
    };

   
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#F5F5F5' }]}>
            <View style={[styles.firstContainer, { backgroundColor: isDarkTheme ? '#333' : '#55AD9B' }]}>
                <View style={styles.arrowContainer}>
                    <Pressable onPress={() => navigation.goBack()} style={[styles.circle, { borderColor: isDarkTheme ? '#333' : '#fff' }]}>
                        <Image source={require('../assets/Arrowback.png')} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={[styles.settingsText, { color: isDarkTheme ? '#fff' : '#000' }]}>Settings</Text>
                </View>
            </View>
            <View style={styles.secondContainer}>
                <Pressable onPress={() => navigation.navigate('Theame')} style={styles.menuItemContainer}>
                    <Text style={[styles.menuItemText, { color: isDarkTheme ? '#fff' : '#000' }]}>Theme</Text>
                </Pressable>
                <View style={[styles.horizontalLine, { borderColor: isDarkTheme ? '#555' : '#CACACA' }]} />
                <Pressable style={styles.menuItemContainer}>
                    <Text style={[styles.menuItemText, { color: isDarkTheme ? '#fff' : '#000' }]}>Privacy Policy</Text>
                </Pressable>
                <View style={[styles.horizontalLine, { borderColor: isDarkTheme ? '#555' : '#CACACA' }]} />
                <Pressable style={styles.menuItemContainer}>
                    <Text style={[styles.menuItemText, { color: isDarkTheme ? '#fff' : '#000' }]}>Contact us</Text>
                </Pressable>
                <View style={[styles.horizontalLine, { borderColor: isDarkTheme ? '#555' : '#CACACA' }]} />
            </View>
        </View>
    );
};

export default SettingsScreen;

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
        width: '100%', 
    },
});
