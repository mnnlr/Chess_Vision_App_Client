import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { View, StyleSheet, Alert, Image, Dimensions, Pressable, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(generateInitialBoard());
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [turn, setTurn] = useState('w');
  const navigation = useNavigation();

  useEffect(() => {
    updateBoard();
  }, [game]);

  function generateInitialBoard() {
    return Array(8).fill(null).map(() => Array(8).fill(null));
  }

  const updateBoard = () => {
    const boardData = game.board().map(row =>
      row.map(piece => piece)
    );
    setBoard(boardData);
    setTurn(game.turn());
  };

  const highlightMoves = (square) => {
    const moves = game.moves({ square, verbose: true });
    const highlights = moves.map(move => move.to);
    setHighlightedSquares(highlights);
  };

  const handlePressSquare = (row, col) => {
    const square = `${String.fromCharCode(97 + col)}${8 - row}`;

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setHighlightedSquares([]);
        return;
      }

      const move = {
        from: selectedSquare,
        to: square,
        promotion: 'q', // Always promote to queen for simplicity
      };

      try {
        const result = game.move(move);
        if (result) {
          updateBoard();
          setHighlightedSquares([]);
          setSelectedSquare(null);

          if (game.isGameOver()) {
            if (game.isCheckmate()) {
              Alert.alert('Checkmate!', `${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
            } else if (game.isDraw()) {
              Alert.alert('Draw!', 'The game is a draw.');
            }
          }
        } else {
          Alert.alert('Invalid Move', 'Please try another move.');
        }
      } catch (error) {
        console.error('Move error:', error);
        Alert.alert('Invalid Move', 'Please try another move.');
      }
    } else {
      const piece = game.get(square);
      if (piece && piece.color === turn) {
        setSelectedSquare(square);
        highlightMoves(square);
      }
    }
  };

  const renderPiece = (piece) => {
    if (!piece) return null;

    const pieceImages = {
      'p': require('../assets/bp.png'),
      'r': require('../assets/br.png'),
      'n': require('../assets/bn.png'),
      'b': require('../assets/bb.png'),
      'q': require('../assets/bq.png'),
      'k': require('../assets/bk.png'),
      'P': require('../assets/wp.png'),
      'R': require('../assets/wr.png'),
      'N': require('../assets/wn.png'),
      'B': require('../assets/wb.png'),
      'Q': require('../assets/wq.png'),
      'K': require('../assets/wk.png'),
    };



    const pieceKey = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();

    return <Image source={pieceImages[pieceKey]} style={styles.piece} />;
  };

  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const square = `${String.fromCharCode(97 + col)}${8 - row}`;
    const isHighlighted = highlightedSquares.includes(square);
    const isSelected = selectedSquare === square;

    return (
      <Pressable
        key={`${row}-${col}`}
        style={[
          styles.square,
          { backgroundColor: (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863' },
          isHighlighted && styles.highlightedSquare,
          isSelected && styles.selectedSquare
        ]}
        onPress={() => handlePressSquare(row, col)}
      >
        {renderPiece(piece)}
      </Pressable>
    );
  };

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

      <View style={styles.container}>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.secondPersonContainer}>
        <View style={styles.secondButtonContainer}>
          <Text style={styles.timer}>5:00</Text>
        </View>
        <Text style={styles.personName}>John Doe</Text>
        <Image source={require('../assets/ProfilePic.jpeg')} style={styles.profilePic} />
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#5a6456',
  },
  board: {
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedSquare: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
  },
  selectedSquare: {
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
  },
  piece: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
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

  backgroundContainer: {
    flex: 1,
    backgroundColor: '#3a4d41'
  },

  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '12%'
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

  secondPersonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '15%'
  },
  secondButtonContainer: {
    width: 73,
    height: 38,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: '#8EE500',
    backgroundColor: '#8EE500',
    alignItems: 'center',
    justifyContent: 'center'
  }




});

export default ChessGame;
