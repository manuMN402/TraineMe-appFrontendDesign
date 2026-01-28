import { View, Text, Button } from "react-native";

export default function TrainerDetail({ route }) {
  const { trainer } = route.params;

  return (
    <View>
      <Text>{trainer.name}</Text>
      <Text>{trainer.skill}</Text>
      <Button title="Book Slot" />
    </View>
  );
}
