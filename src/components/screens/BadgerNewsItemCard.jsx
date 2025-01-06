import { Pressable, StyleSheet, View } from "react-native";

export default function BadgerNewsItemCard(props) {
  return (
    <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={[styles.card, props.style]}>{props.children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "slategray",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
