import { FlatList } from "react-native";
import trainers from "../data/trainers";
import TrainerCard from "../components/TrainerCard";

export default function UserHome({ navigation }) {
  return (
    <FlatList
      data={trainers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrainerCard
          trainer={item}
          onPress={() =>
            navigation.navigate("TrainerDetail", { trainer: item })
          }
        />
      )}
    />
  );
}
