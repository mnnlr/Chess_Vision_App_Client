// import React, { useCallback } from "react";
// import { StyleSheet, Image } from "react-native";
// import { PanGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//   runOnJS,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { toTranslation, SIZE, toPosition } from "./Notation";

// const styles = StyleSheet.create({
//   piece: {
//     width: SIZE,
//     height: SIZE,
//   },
// });

// export const PIECES = {
//   br: require("../assets/br.png"),
//   bp: require("../assets/bp.png"),
//   bn: require("../assets/bn.png"),
//   bb: require("../assets/bb.png"),
//   bq: require("../assets/bq.png"),
//   bk: require("../assets/bk.png"),
//   wr: require("../assets/wr.png"),
//   wn: require("../assets/wn.png"),
//   wb: require("../assets/wb.png"),
//   wq: require("../assets/wq.png"),
//   wk: require("../assets/wk.png"),
//   wp: require("../assets/wp.png"),
// };

// const Piece = ({ id, startPosition, chess, onTurn, enabled }) => {
//   const isGestureActive = useSharedValue(false);
//   const offsetX = useSharedValue(0);
//   const offsetY = useSharedValue(0);
//   const translateX = useSharedValue(startPosition.x * SIZE);
//   const translateY = useSharedValue(startPosition.y * SIZE);

//   const movePiece = useCallback(
//     (to) => {
//       const moves = chess.moves({ verbose: true });
//       const from = toPosition({ x: offsetX.value, y: offsetY.value });
//       const move = moves.find((m) => m.from === from && m.to === to);
//       if (move) {
//         const { x, y } = toTranslation(move.to);
//         translateX.value = withTiming(x, {}, () => (offsetX.value = translateX.value));
//         translateY.value = withTiming(y, {}, () => {
//           offsetY.value = translateY.value;
//           isGestureActive.value = false;
//         });
//         chess.move({ from, to });
//         onTurn();
//       }
//     },
//     [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
//   );
  

// //   const movePiece = useCallback(
// //     (to) => {
// //       const moves = chess.moves({ verbose: true });
// //       const from = toPosition({ x: offsetX.value, y: offsetY.value });
// //       const move = moves.find((m) => m.from === from && m.to === to);
// //       const { x, y } = toTranslation(move ? move.to : from);
// //       translateX.value = withTiming(x, {}, () => (offsetX.value = translateX.value));
// //       translateY.value = withTiming(y, {}, () => {
// //         offsetY.value = translateY.value;
// //         isGestureActive.value = false;
// //       });
// //       if (move) {
// //         chess.move({ from, to });
// //         onTurn();
// //       }
// //     },
// //     [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
// //   );

//   const onGestureEvent = useAnimatedGestureHandler({
//     onStart: () => {
//       offsetX.value = translateX.value;
//       offsetY.value = translateY.value;
//       isGestureActive.value = true;
//     },
//     onActive: ({ translationX, translationY }) => {
//       translateX.value = offsetX.value + translationX;
//       translateY.value = offsetY.value + translationY;
//     },
//     onEnd: () => {
//       runOnJS(movePiece)(toPosition({ x: translateX.value, y: translateY.value }));
//     },
//   });

//   const style = useAnimatedStyle(() => ({
//     position: "absolute",
//     zIndex: isGestureActive.value ? 100 : 10,
//     transform: [
//       { translateX: translateX.value },
//       { translateY: translateY.value },
//     ],
//   }));

//   return (
//     <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
//       <Animated.View style={style}>
//         <Image source={PIECES[id]} style={styles.piece} />
//       </Animated.View>
//     </PanGestureHandler>
//   );
// };

// export default Piece;

import React, { useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { toTranslation, SIZE, toPosition } from "./Notation";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});

export const PIECES = {
  br: require("../assets/br.png"),
  bp: require("../assets/bp.png"),
  bn: require("../assets/bn.png"),
  bb: require("../assets/bb.png"),
  bq: require("../assets/bq.png"),
  bk: require("../assets/bk.png"),
  wr: require("../assets/wr.png"),
  wn: require("../assets/wn.png"),
  wb: require("../assets/wb.png"),
  wq: require("../assets/wq.png"),
  wk: require("../assets/wk.png"),
  wp: require("../assets/wp.png"),
};

const Piece = ({ id, startPosition, chess, onTurn, enabled }) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);

  const movePiece = useCallback(
    (to) => {
      const moves = chess.moves({ verbose: true });
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const move = moves.find((m) => m.from === from && m.to === to);

      if (move) {
        // Perform the move
        chess.move({ from, to });
        // Update the piece position
        const { x, y } = toTranslation(to);
        translateX.value = withTiming(x, {}, () => (offsetX.value = translateX.value));
        translateY.value = withTiming(y, {}, () => {
          offsetY.value = translateY.value;
          isGestureActive.value = false;
        });
        onTurn();
      } else {
        // If the move is invalid, return the piece to its original position
        const { x, y } = toTranslation(from);
        translateX.value = withTiming(x, {}, () => (offsetX.value = translateX.value));
        translateY.value = withTiming(y, {}, () => {
          offsetY.value = translateY.value;
          isGestureActive.value = false;
        });
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = offsetX.value + translationX;
      translateY.value = offsetY.value + translationY;
    },
    onEnd: () => {
      runOnJS(movePiece)(toPosition({ x: translateX.value, y: translateY.value }));
    },
  });

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
      <Animated.View style={style}>
        <Image source={PIECES[id]} style={styles.piece} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Piece;



