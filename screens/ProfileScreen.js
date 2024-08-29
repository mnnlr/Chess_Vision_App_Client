import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable, Image, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "../redux/profileSlice";

const { width, height } = Dimensions.get('window');
const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const profileImage = useSelector(state =>state.profile.profileImage);



    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    //Take photo from camera
    const handleTakePhoto = async () => {
        closeModal();
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.canceled) {
                dispatch(setProfileImage({uri:result.assets[0].uri}));
            }
        } else {
            alert('Camera permision is required to take a photo')
        }
    };

    //Choose From Gallery
    const handleChooseFromGallery = async () => {
        closeModal();
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.canceled) {
                dispatch(setProfileImage({uri:result.assets[0].uri}));
            }
        } else {
            alert("Gallery permission is required to select an image")
        }
    };
    // Back Arrow
    const handleArrow = () => {
        navigation.navigate('Home', {updateProfileImage:profileImage});
    }

    const stats = [
        { number: "89", label: "Total Win" },
        { number: "29", label: "Total Draw" },
        { number: "19", label: "Total Loss" }
    ];

    const friendsData = [
        { image: require('../assets/ProfilePic.jpeg'), name: 'John Doe', buttonText: 'Master' },
        { image: require('../assets/ProfilePic.jpeg'), name: 'Jane Smith', buttonText: 'Add' },
        { image: require('../assets/ProfilePic.jpeg'), name: 'Bob Brown', buttonText: 'Follow' }
    ]


    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <View style={styles.arrowContainer}>
                    <Pressable style={styles.circle} onPress={handleArrow}>
                        <Image source={require('../assets/Arrowback.png')} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={styles.profileText}>Profile</Text>
                </View>
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.profileContainer}>
                    <Pressable onPress={openModal}>
                        <Image source={profileImage} style={styles.profileImage} />
                    </Pressable>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>John Doe</Text>
                        <Pressable style={styles.proButton}>
                            <Text style={styles.proText}>Pro</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.mainPipelineContainer}>
                    <View style={styles.pipelineContainer}>
                        <View style={styles.leftPipeline} />
                        <View style={styles.divider} />
                        <View style={styles.rightPipeline} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.proButton}>
                            <Text style={styles.buttonText}>Pro</Text>
                        </Pressable>
                        <Pressable style={styles.masterButton}>
                            <Text style={styles.buttonText}>Master</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.numberContainer}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statContainer}>
                            <Text style={styles.numberText}>{stat.number}</Text>
                            <Text style={styles.labelText}>{stat.label}</Text>
                        </View>
                    )
                    )}

                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.friendContainer}>
                        <Text style={styles.friendText}>Friends</Text>
                        <View style={styles.friendDetailsContainer}>
                            {friendsData.map((friend, index) => (
                                <View key={index} style={styles.detailsContainer}>
                                    <Image source={friend.image} style={styles.friendImage} />
                                    <Text style={styles.friendName}>{friend.name}</Text>
                                    <Pressable style={styles.addButton}>
                                        <Text style={styles.addButtonText}>{friend.buttonText}</Text>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            {/* Modal for Photo */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Pressable style={styles.modalButton} onPress={handleTakePhoto}>
                            <Text style={styles.modalText}>Take a Photo</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={handleChooseFromGallery}>
                            <Text style={styles.modalText}>Choose From Gallery</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalText}>Close</Text>
                        </Pressable>
                    </View>

                </View>

            </Modal>
        </View>

    )
}
export default ProfileScreen;


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
    profileText: {
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 32,
        color: '#fff',
    },
    secondContainer: {
        flex: 1,

    },
    profileContainer: {
        flexDirection: 'row',
        padding: 25
    },
    profileImage: {
        width: 122,
        height: 124,
        borderWidth: 4,
        borderRadius: 90,
        borderColor: '#95D2B3'
    },
    infoContainer: {
        marginLeft: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 32,
        fontWeight: '400',
        color: '#000',
        lineHeight: 41
    },
    proButton: {
        marginTop: width * 0.02,
        backgroundColor: '#95D2B3',
        width: 60,
        height: 25,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    proText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000',
        lineHeight: 24
    },
    mainPipelineContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    pipelineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        width: 280,
        height: 16,
        borderWidth: 1,
        borderRadius: 26,
        borderColor: '#000',
        overflow: 'hidden',
        backgroundColor: '#F1F8E8',
    },
    leftPipeline: {
        flex: 3,
        height: '100%',
        backgroundColor: '#F1F8E8',
        borderTopLeftRadius: 26,
        borderBottomLeftRadius: 26,
    },
    rightPipeline: {
        flex: 1,
        height: '100%',
        backgroundColor: '#95D2B3',
        borderTopRightRadius: 26,
        borderBottomRightRadius: 26,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 42,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: '3%',
        justifyContent: 'space-between',
        width: '66%'
    },
    proButton: {
        backgroundColor: '#D8EFD3',
        width: 60,
        height: 25,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    masterButton: {
        backgroundColor: '#D8EFD3',
        width: 60,
        height: 25,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 24,
        color: '#000'
    },
    numberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '7%'
    },
    statContainer: {
        alignItems: 'center'
    },
    numberText: {
        fontSize: 40,
        fontWeight: '500',
        lineHeight: 65,
        color: '#000'
    },
    labelText: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 17,
        color: '#000'
    },
    friendContainer: {
        width: 316,
        height: 317,
        backgroundColor: '#D8EFD3',
        borderRadius: 21,
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    friendText: {
        fontSize: 32,
        fontWeight: '400',
        lineHeight: 54,
        color: '#000',
        padding: 12
    },
    detailsContainer: {
        width: 254,
        height: 39,
        backgroundColor: '#fff',
        borderRadius: 36,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '4%'

    },
    friendDetailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    friendImage: {
        width: 29,
        height: 29,
        borderRadius: 25,
        alignSelf: 'center'
    },
    friendName: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
        marginTop: '3%'
    },
    addButton: {
        backgroundColor: '#95D2B3',
        width: 60,
        height: 20,
        borderRadius: 8,
        marginTop: '4%'

    },
    addButtonText: {
        color: '#000',
        fontWeight: '500',
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#55AD9B',
    },
})