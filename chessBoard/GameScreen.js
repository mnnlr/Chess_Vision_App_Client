import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, ImageBackground, Pressable, Image, Dimensions } from "react-native";
import Board from "./Board";

const { width, height } = Dimensions.get('window');


const GameScreen = () => {
    const navigation = useNavigation();

    const handleArrow = () => {
        navigation.navigate('Home')
    }
    return (
        <ImageBackground style={styles.backgroundContainer}>
            <View style={styles.arrowContainer}>
                <Pressable style={styles.arrowCircle} onPress={handleArrow}>
                    <Image source={require('../assets/Arrowback.png')} style={styles.arrowIcon} />
                </Pressable>
                <Pressable style={styles.menuCircle} >
                    <Image source={require('../assets/Menu Vertical.png')} style={styles.menuIcon} />
                </Pressable>
            </View>
            <View style={styles.personContainer}>
                <Image source={require('../assets/ProfilePic.jpeg')} style={styles.profilePic} />
                <Text style={styles.personName}>John Doe</Text>
                <View style={styles.circle}>
                    <Image source={require('../assets/addProfileIcon.png')} style={styles.addProfileIcon} />
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.timer}>5:00</Text>
                </View>
            </View>
            <View style={styles.chessContainer}>
                <Board />
            </View>
            <View style={styles.secondPersonContainer}>
                <View style={styles.secondButtonContainer}>
                    <Text style={styles.timer}>5:00</Text>
                </View>
                <Text style={styles.personName}>John Doe</Text>
                <Image source={require('../assets/ProfilePic.jpeg')} style={styles.profilePic} />
            </View>

        </ImageBackground>
    )
}
export default GameScreen;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#3a4d41'
    },
    arrowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        padding: '12%'
    },
    arrowCircle: {
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
    menuCircle: {
        marginLeft: '35%',
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: (width * 0.1) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    menuIcon: {
        width: width * 0.045,
        height: width * 0.045,
        tintColor: '#fff',
    },
    personContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    profilePic: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.10,
    },
    personName: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 26,
        color: '#fff',
        textAlign: 'center',
    },
    circle: {
        width: 32,
        height: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addProfileIcon: {
        width: 17,
        height: 14,
    },
    buttonContainer: {
        width: 73,
        height: 38,
        borderRadius: 29,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    timer: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 23,
        color: '#000'
    },
    chessContainer: {
        marginTop: '5%'
    },
    secondPersonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop:'15%'
    },
    secondButtonContainer:{
        width: 73,
        height: 38,
        borderRadius: 29,
        borderWidth: 1,
        borderColor: '#8EE500',
        backgroundColor: '#8EE500',
        alignItems: 'center',
        justifyContent: 'center'
    }
})



