import { View, Text, TouchableOpacity } from "react-native";

export default function TrainerCard({ trainer, onPress }) {
  return (
    <View style={{ padding: 16 }}>
      <Text>{trainer.name}</Text>
      <Text>{trainer.skill}</Text>
      <Text>₹ {trainer.fee}</Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: "blue" }}>View</Text>
      </TouchableOpacity>
    </View>
  );
}
