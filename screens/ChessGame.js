// ChessGame.js
import React, { useState, useEffect } from 'react';
import {Chess} from 'chess.js';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Button,Image } from 'react-native';


const ChessGame = () => {
<<<<<<< HEAD
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(generateInitialBoard());
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);

  useEffect(() => {
    updateBoard();
  }, [game]);

  // Define the function to generate the initial board
  function generateInitialBoard() {
    return Array(8).fill(null).map(() => Array(8).fill(''));
  }

  // Define the function to update the board state
  const updateBoard = () => {
    const boardData = game.board().map(row =>
      row.map(piece => (piece ? piece.type.toUpperCase() : ''))
    );
    setBoard(boardData);
  };

  // Define the function to highlight possible moves
  const highlightMoves = (square) => {
    const moves = game.moves({ square, verbose: true });
    const highlights = moves.map(move => move.to);
    setHighlightedSquares(highlights);
  };

  // Define the function to handle the press event on a square
  const handlePressSquare = (row, col) => {
    const square = `${String.fromCharCode(97 + col)}${8 - row}`;
    
    if (selectedSquare) {
      const move = {
        from: selectedSquare,
        to: square,
      };
      const result = game.move(move);
      if (result) {
        updateBoard();
        setHighlightedSquares([]);
        setSelectedSquare(null);
=======
    const [game, setGame] = useState(new Chess());
    const [board, setBoard] = useState(generateInitialBoard());
    const [highlightedSquares, setHighlightedSquares] = useState([]);
    const [selectedSquare, setSelectedSquare] = useState(null);
  
    useEffect(() => {
      updateBoard();
    }, [game]);
  
    // Define the function to generate the initial board
    function generateInitialBoard() {
      return Array(8).fill(null).map(() => Array(8).fill(''));
    }
  
    // Define the function to update the board state
    const updateBoard = () => {
      const boardData = game.board().map(row =>
        // row.map(piece => (piece ? piece.type.toUpperCase() : ''))
        row.map(piece => (piece ? piece : ''))
      );
      setBoard(boardData);
    };
  
    // Define the function to highlight possible moves
    const highlightMoves = (square) => {
      const moves = game.moves({ square, verbose: true });
      const highlights = moves.map(move => move.to);
      setHighlightedSquares(highlights);
    };
  
    // Define the function to handle the press event on a square
    const handlePressSquare = (row, col) => {
      const square = `${String.fromCharCode(97 + col)}${8 - row}`;
      
      if (selectedSquare) {
        const move = {
          from: selectedSquare,
          to: square,
        };
        const result = game.move(move);
        if (result) {
          updateBoard();
          setHighlightedSquares([]);
          setSelectedSquare(null);
        } else {
          Alert.alert('Invalid Move');
        }
>>>>>>> a57d917ffc9a0533d0740e4e589d1510396603d1
      } else {
        Alert.alert('Invalid Move');
      }
<<<<<<< HEAD
    } else {
      highlightMoves(square);
      setSelectedSquare(square);
    }
  };

  // Define the function to render each square on the board
  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const square = `${String.fromCharCode(97 + col)}${8 - row}`;
    const isHighlighted = highlightedSquares.includes(square);
=======
    };


    const renderPiece = (piece) => {
      if (!piece) return null;

      const pieceImages = {
        p: require('../assets/bp.png'),
        r: require('../assets/br.png'),
        n: require('../assets/bn.png'),
        b: require('../assets/bb.png'),
        q: require('../assets/bq.png'),
        k: require('../assets/bk.png'),
        P: require('../assets/wp.png'),
        R: require('../assets/wr.png'),
        N: require('../assets/wn.png'),
        B: require('../assets/wb.png'),
        Q: require('../assets/wq.png'),
        K: require('../assets/wk.png'),
      };

      return <Image source={pieceImages[piece.type]} style={styles.piece} />;
    };
  
    // Define the function to render each square on the board
    const renderSquare = (row, col) => {
      const piece = board[row][col];
      const square = `${String.fromCharCode(97 + col)}${8 - row}`;
      const isHighlighted = highlightedSquares.includes(square);
      return (
        <TouchableOpacity
          key={`${row}-${col}`}
          style={[
            styles.square,
            { backgroundColor: (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863' },
            isHighlighted && styles.highlightedSquare
          ]}
          onPress={() => handlePressSquare(row, col)}
        >
            {renderPiece(piece)}
          {/* <Text style={styles.piece}>{piece}</Text> */}
        </TouchableOpacity>
      );
    };
  
>>>>>>> a57d917ffc9a0533d0740e4e589d1510396603d1
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          { backgroundColor: (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863' },
          isHighlighted && styles.highlightedSquare
        ]}
        onPress={() => handlePressSquare(row, col)}
      >
        <Text style={styles.piece}>{piece}</Text>
      </TouchableOpacity>
    );
  };
<<<<<<< HEAD

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    fontSize: 24,
  },
  highlightedSquare: {
    backgroundColor: '#d3d3d3',
  },
});

export default ChessGame;
=======
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    board: {
      flexDirection: 'column',
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    square: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    piece: {
      fontSize: 24,
    },
    highlightedSquare: {
      backgroundColor: '#d3d3d3',
    },
    piece: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
  });
  
  export default ChessGame;
>>>>>>> a57d917ffc9a0533d0740e4e589d1510396603d1
