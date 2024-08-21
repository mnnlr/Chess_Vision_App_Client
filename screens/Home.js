import { StyleSheet, Text, View, Image, Dimensions, Pressable, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSettingScreen = () => {
    navigation.navigate('Setting');
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/CurveImage.png')} style={styles.topbarImage} />
      <View style={styles.profileContainer}>
        <Image source={require('../assets/ProfilePic.jpeg')} style={styles.profilePic} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Pressable style={styles.proButton}>
            <Text style={styles.proText}>Pro</Text>
          </Pressable>
        </View>
        <Pressable style={styles.menuCircle} onPress={handleModal}>
          <Image source={require('../assets/Menu Vertical.png')} style={styles.menuIcon} />
        </Pressable>
      </View>
      {/* MenuItem Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
        animationType='fade'>
        <Pressable style={styles.modalOverlay} onPress={handleModal}>
          <View style={[styles.modalContainer, styles.positionedModal]}>
            <Pressable style={styles.menuItem} onPress={handleSettingScreen}>
              <Text style={styles.menuText}>Settings</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Profile</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>LogOut</Text>
            </Pressable>
          </View>
        </Pressable>

      </Modal>
      <View style={styles.kingContainer}>
        <Text style={styles.kingText}>BE THE{"\n"}KING OF{"\n"}CHESS</Text>
        <Image source={require('../assets/ChessIcon.png')} style={styles.chessIcon} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.box}>
          <Image source={require('../assets/EarthPlanet.png')} style={styles.earthPlanetImage} />
          <Text style={styles.friendText}>Play with{'\n'}Friends</Text>
          <Text style={styles.randomText}>Choose random{'\n'}friends and play</Text>
        </View>
        <ImageBackground
          source={require('../assets/ChessPic1.jpeg')}
          style={styles.box}
          imageStyle={{ opacity: 0.2 }}
        >
          <Image source={require('../assets/Vector.png')} style={styles.earthPlanetImage} />
          <Text style={styles.friendText}>Play with{'\n'}Computer</Text>
          <Text style={styles.randomText}>Choose level and{'\n'}Play with computer</Text>
        </ImageBackground>

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
    flex: 1
  },
  topbarImage: {
    width: '100%',
    height: width * 0.45,
  },
  profileContainer: {
    position: 'absolute',
    top: width * 0.120,
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
    color: '#fff',
  },
  proButton: {
    marginTop: width * 0.02,
    backgroundColor: '#95D2B3',
    width: width * 0.22,
    height: width * 0.06,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D8EFD3',
  },
  proText: {
    fontSize: 15,
    color: '#000',
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
    borderColor: '#000',
  },
  menuIcon: {
    width: width * 0.045,
    height: width * 0.045,
    tintColor: '#000',
  },
  kingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.10,
    paddingHorizontal: '7%',
    justifyContent: 'space-evenly'
  },
  kingText: {
    fontSize: 35,
    fontWeight: '700',
    lineHeight: 52,
    color: '#000',
    marginRight: width * 0.03,
  },
  chessIcon: {
    width: 122,
    height: 145,
    resizeMode: 'contain'
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: width * 0.20,
    paddingHorizontal: '7%'
  },
  box: {
    width: 125,
    height: 170,
    backgroundColor: '#55AD9B',
    borderRadius: 19
  },
  earthPlanetImage: {
    width: 17,
    height: 24,
    resizeMode: 'contain',
    marginLeft: width * 0.03,
    marginTop: width * 0.02
  },
  friendText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: width * 0.03,
    marginTop: width * 0.02
  },
  randomText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    marginLeft: width * 0.03,
    marginTop: width * 0.02
  },
  curveImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '93%',
    height: height * 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  curveImage1: {
    width: '100%',
    height: '97%',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    // alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    color: '#000',
  },
});


