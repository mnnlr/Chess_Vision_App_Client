import React from "react";
import { Dimensions, StyleSheet, Text, View, Image, Pressable, Switch } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';

const { width, height } = Dimensions.get('window');

const Theame = () => {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Dispatch the toggleTheme action
    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    // Dynamic styles based on theme
    const themeStyles = {
        container: {
            flex: 1,
            backgroundColor: isDarkTheme ? '#333' : '#F5F5F5',
        },
        firstContainer: {
            width: '100%',
            height: height * 0.12,
            backgroundColor: isDarkTheme ? '#1F1F1F' : '#55AD9B',
            justifyContent: 'center',
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
            tintColor: isDarkTheme ? '#fff' : '#000',
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
            color: isDarkTheme ? '#fff' : '#000',
        },
        horizontalLine: {
            borderWidth: 1,
            borderColor: isDarkTheme ? '#555' : '#CACACA',
            width: '100%',
        },
        toggleContainer: {
            paddingHorizontal: '5%',
            paddingTop: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        toggleText: {
            fontSize: 18,
            fontWeight: '400',
            color: isDarkTheme ? '#fff' : '#000',
        },
    };

    return (
        <View style={themeStyles.container}>
            <View style={themeStyles.firstContainer}>
                <View style={themeStyles.arrowContainer}>
                    <Pressable style={themeStyles.circle} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/Arrowback.png')} style={themeStyles.arrowIcon} />
                    </Pressable>
                    <Text style={themeStyles.settingsText}>Theme</Text>
                </View>
            </View>

            <View style={themeStyles.toggleContainer}>
                <Text style={themeStyles.toggleText}>Dark Theme</Text>
                <Switch
                    value={isDarkTheme}
                    onValueChange={handleToggleTheme}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDarkTheme ? '#f4f3f4' : '#f4f3f4'}
                />
            </View>
        </View>
    );
};

export default Theame;
