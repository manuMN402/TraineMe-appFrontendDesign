import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TrainerCard({ trainer, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#0f1419",
        borderRadius: 20,
        padding: 16,
        marginVertical: 12,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: "#2a2f3f",
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {/* Trainer Image */}
      <Image
        source={{ uri: trainer.image }}
        style={{
          width: 90,
          height: 90,
          borderRadius: 16,
          marginRight: 16,
        }}
      />

      {/* Trainer Info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            marginBottom: 6,
          }}
        >
          {trainer.name}
        </Text>

        {/* Specialty & Experience */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "#a78bfa",
              fontSize: 13,
              marginRight: 6,
              fontWeight: "500",
            }}
          >
            {trainer.specialty}
          </Text>
          <Text style={{ color: "#888", fontSize: 13 }}>
            • {trainer.experience}
          </Text>
        </View>

        {/* Status & Price */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="location"
            size={14}
            color={trainer.status === "Online" ? "#10b981" : "#666"}
          />
          <Text
            style={{
              color: trainer.status === "Online" ? "#10b981" : "#666",
              fontSize: 13,
              marginLeft: 4,
              marginRight: 16,
              fontWeight: "500",
            }}
          >
            {trainer.status}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            $ {trainer.price}/session
          </Text>
        </View>
      </View>

      {/* Rating Badge */}
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#8b5cf6",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {trainer.rating}
        </Text>
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={22} color="#666" />
    </TouchableOpacity>
  );
}
