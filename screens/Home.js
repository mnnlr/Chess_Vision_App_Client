import { StyleSheet, Text, View, Image, Dimensions, Pressable, ImageBackground, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };


  //Setting Screen
  const handleSettingScreen = () => {
    navigation.navigate('Setting');
  }


  //logOut 
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Ok",
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  //Profile Screen
  const handleProfileSection = () => {
    navigation.navigate('Profile');
  }

  const handleGameScreen = ()=>{
    navigation.navigate("Game");
  };

  const handlePersonAddSection = ()=>{
    navigation.navigate('PersonAddSection');
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}>
      <Image source={require('../assets/CurveImage.png')} style={styles.topbarImage} />
      <View style={styles.profileContainer}>
        <Image source={require('../assets/ProfilePic.jpeg')} style={styles.profilePic} />
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: isDarkTheme ? '#fff' : '#000' }]}>John Doe</Text>
          <Pressable style={[styles.proButton, { backgroundColor: isDarkTheme ? '#333' : '#95D2B3', borderColor: isDarkTheme ? '#222' : '#D8EFD3' }]}>
            <Text style={[styles.proText, { color: isDarkTheme ? '#fff' : '#000' }]}>Pro</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.menuCircle, { borderColor: isDarkTheme ? '#fff' : '#000' }]} onPress={handleModal}>
          <Image source={require('../assets/Menu Vertical.png')} style={[styles.menuIcon, { tintColor: isDarkTheme ? '#fff' : '#000' }]} />
        </Pressable>
      </View>
      {/* MenuItem Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
        animationType='fade'>
        <Pressable style={styles.modalOverlay} onPress={handleModal}>
          <View style={[styles.modalContainer, styles.positionedModal, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
            <Pressable style={styles.menuItem} onPress={handleSettingScreen}>
              <Text style={[styles.menuText, { color: isDarkTheme ? '#fff' : '#000' }]}>Settings</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={handleProfileSection}>
              <Text style={[styles.menuText, { color: isDarkTheme ? '#fff' : '#000' }]}>Profile</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Login')} style={styles.menuItem}>
              <Text style={[styles.menuText, { color: isDarkTheme ? '#fff' : '#000' }]}>LogOut</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <View style={styles.kingContainer}>
        <Text style={[styles.kingText, { color: isDarkTheme ? '#fff' : '#000' }]}>BE THE{"\n"}KING OF{"\n"}CHESS</Text>
        <Image source={require('../assets/ChessIcon.png')} style={styles.chessIcon} />
      </View>
      <View style={styles.textContainer}>
        <Pressable style={[styles.box, { backgroundColor: isDarkTheme ? '#444' : '#55AD9B' }]} onPress={handleGameScreen}>
          <Image source={require('../assets/EarthPlanet.png')} style={styles.earthPlanetImage} />
          <Text style={[styles.friendText, { color: isDarkTheme ? '#fff' : '#000' }]}>Play with{'\n'}Friends</Text>
          <Text style={[styles.randomText, { color: isDarkTheme ? '#fff' : '#000' }]}>Choose random{'\n'}friends and play</Text>
        </Pressable>
        <Pressable style={[styles.box, { backgroundColor: isDarkTheme ? '#444' : '#55AD9B' }]} onPress={handlePersonAddSection}>
          <Image source={require('../assets/Vector.png')} style={styles.earthPlanetImage} />
          <Text style={[styles.friendText, { color: isDarkTheme ? '#fff' : '#000' }]}>Play with{'\n'}Friends</Text>
          <Text style={[styles.randomText, { color: isDarkTheme ? '#fff' : '#000' }]}>Choose random{'\n'}friends and play</Text>
        </Pressable>
      </View>
      <View style={styles.curveImageContainer}>
        <Image source={require('../assets/CurveImage1.png')} style={styles.curveImage1} />
      </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbarImage: {
    width: '100%',
    height: width * 0.45,
  },
  profileContainer: {
    position: 'absolute',
    top: width * 0.12,
    left: '7%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: width * 0.20,
    height: width * 0.20,
    borderRadius: width * 0.10,
  },
  infoContainer: {
    marginLeft: '5%',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: width * 0.065,
  },
  proButton: {
    marginTop: width * 0.02,
    width: width * 0.22,
    height: width * 0.06,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  proText: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  menuCircle: {
    marginLeft: '35%',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  menuIcon: {
    width: width * 0.045,
    height: width * 0.045,
  },
  kingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.10,
    paddingHorizontal: '7%',
    justifyContent: 'space-evenly',
  },
  kingText: {
    fontSize: 35,
    fontWeight: '700',
    lineHeight: 52,
  },
  chessIcon: {
    width: width * 0.3,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: width * 0.20,
    paddingHorizontal: '7%',
  },
  box: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 19,
    padding: width * 0.03,
  },
  earthPlanetImage: {
    width: width * 0.05,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  friendText: {
    fontSize: width * 0.05,
    fontWeight: '400',
    marginTop: width * 0.02,
  },
  randomText: {
    fontSize: width * 0.03,
    fontWeight: '400',
    marginTop: width * 0.02,
  },
  curveImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: height * 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  curveImage1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  positionedModal: {
    position: 'absolute',
    top: width * 0.20,
    right: '3%',
  },

    modalContainer: {
      width: width * 0.4,
      borderRadius: 10,
      paddingVertical: width * 0.03,
      paddingHorizontal: width * 0.02,
      elevation: 5,
    },
    menuItem: {
      paddingVertical: width * 0.02,
      paddingHorizontal: width * 0.03,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    menuText: {
      fontSize: width * 0.04,
      fontWeight: '500',
    },
  });
  