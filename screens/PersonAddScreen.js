import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image, Pressable } from "react-native";


const PersonAddScreen = () => {
    return (
        <ImageBackground style={styles.backgroundContainer}>
            <View style={styles.mainContainer}>
                <View style={styles.personContainer}>
                    <View style={styles.individualContainer}>
                        <Image source={require('../assets/ProfilePic.jpeg')} style={styles.profileImage} />
                        <Pressable style={styles.masterButton}>
                            <Text style={styles.masterText}>Master</Text>
                        </Pressable>
                        <Text style={styles.personName}>John Doe</Text>
                    </View>
                    <View style={styles.vsContainer}>
                        <Text style={styles.vsText}>VS</Text>
                    </View>
                    <View style={styles.individualContainer}>
                        <Image source={require('../assets/ProfilePic.jpeg')} style={styles.profileImage} />
                        <Pressable style={styles.masterButton}>
                            <Text style={styles.masterText}>Pro</Text>
                        </Pressable>
                        <Text style={styles.personName}>John Doe</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )

}
export default PersonAddScreen;


const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#3a4d41'
    },
    personContainer: {

        width: 294,
        height: 213,
        borderRadius: 23,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        position: 'relative',
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    individualContainer: {
        width: 117,
        height: 175,
        borderRadius: 23,
        backgroundColor: '#95D2B3'
    },
    profileImage: {
        width: 55,
        height: 55,
        borderRadius: 25,
        marginBottom: '10%',
        alignSelf: 'center',
        marginTop: '10%'
    },
    masterButton: {
        width: 60,
        height: 25,
        borderRadius: 8,
        backgroundColor: '#55AD9B',
        alignSelf: 'center',
        marginBottom: '13%',
    },
    masterText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 24,
        color: '#000',
        textAlign: 'center'
    },
    personName: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 26,
        color: '#000',
        textAlign: 'center'
    },
    vsContainer: {

        width: 48,
        height: 48,
        backgroundColor: '#D8EFD3',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '53%',
        left: '54%',
        transform: [{ translateX: -24 }, { translateY: -24 }],
        zIndex: 1,
    },
    vsText: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 26,
        color: '#000',
        textAlign: 'center'
    }
})