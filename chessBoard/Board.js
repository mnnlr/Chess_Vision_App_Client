

import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Piece from "./Piece";
import Background from "./Background";
import { Chess } from "chess.js";

const { width } = Dimensions.get("window");

function useConst(initialValue) {
  const ref = useRef();
  if (ref.current === undefined) {
    ref.current = {
      value: typeof initialValue === "function" ? initialValue() : initialValue,
    };
  }
  return ref.current.value;
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });



  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
    });
  }, [chess, state.player]);

  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <Piece
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}`}
                startPosition={{ x, y }}
                chess={chess}
                onTurn={onTurn}
                enabled={state.player === piece.color}
              />
            );
          }
          return null;
        })
      )}
    </View>
  );
};

export default Board;



