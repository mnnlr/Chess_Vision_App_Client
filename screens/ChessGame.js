import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(generateInitialBoard());
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [turn, setTurn] = useState('w');

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
      <TouchableOpacity
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
    backgroundColor: '#f0f0f0',
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
});

export default ChessGame;
