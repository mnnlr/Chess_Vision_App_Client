import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, Dimensions, Pressable, Image, TextInput } from "react-native";
const { width, height } = Dimensions.get('window');
import { useSelector } from 'react-redux';

const ContactusScreen = () => {
    const navigation = useNavigation();
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#F5F5F5' }]}>
            <View style={[styles.firstContainer, { backgroundColor: isDarkTheme ? '#333' : '#55AD9B' }]}>
                <View style={styles.arrowContainer}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.circle}>
                        <Image source={require('../assets/Arrowback.png')} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={[styles.settingsText, { color: isDarkTheme ? '#fff' : '#000' }]}>Contact us</Text>
                </View>
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/Contact_us_image.png')} style={styles.contactusImage} />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Name"
                        style={[styles.inputContainer, { backgroundColor: isDarkTheme ? '#555' : '#D9D9D9', color: isDarkTheme ? '#fff' : '#000' }]}
                        placeholderTextColor={isDarkTheme ? '#fff' : '#535050'} />
                    <TextInput
                        placeholder="Email"
                        style={[styles.inputContainer, { backgroundColor: isDarkTheme ? '#555' : '#D9D9D9', color: isDarkTheme ? '#fff' : '#000' }]}
                        placeholderTextColor={isDarkTheme ? '#fff' : '#535050'} />
                    <TextInput
                        placeholder="Message"
                        placeholderTextColor={isDarkTheme ? '#fff' : '#535050'}
                        multiline={true}
                        numberOfLines={4}
                        style={[styles.messageInputContainer, { backgroundColor: isDarkTheme ? '#555' : '#D9D9D9', color: isDarkTheme ? '#fff' : '#000' }]}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.sendButtonContainer}>
                        <Text style={styles.sendText}>Send</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default ContactusScreen;

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
    contactusImage: {
        width: width * 0.7,
        height: height * 0.3,
        resizeMode: 'contain',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: width * 0.85,
        height: height * 0.07,
        borderRadius: 17,
        paddingHorizontal: 20,
        marginBottom: height * 0.02,
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    messageInputContainer: {
        width: width * 0.85,
        height: height * 0.15,
        borderRadius: 17,
        paddingHorizontal: 20,
        paddingTop: 18,
        textAlignVertical: 'top',
        marginBottom: height * 0.02,
    },
    sendButtonContainer: {
        width: width * 0.85,
        height: height * 0.07,
        borderRadius: 17,
        justifyContent: 'center',
        backgroundColor:'#95D2B3'
    },
    sendText: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 38,
        textAlign: 'center',
        color:'#000'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
    }
});
