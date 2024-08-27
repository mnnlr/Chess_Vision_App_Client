// ChessGame.js
import React, { useState, useEffect } from 'react';
import {Chess} from 'chess.js';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Button } from 'react-native';


const ChessGame = () => {
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
      } else {
        Alert.alert('Invalid Move');
      }
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
