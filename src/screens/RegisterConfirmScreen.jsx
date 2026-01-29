// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import RegisterStyles from "../styles/registerStyles";

// export default function RegisterConfirmScreen({ route, navigation }) {
//   const { userData, role } = route.params;

//   const handleContinue = () => {
//     navigation.reset({
//       index: 0,
//       routes: [{ 
//         name: role === "User" ? "UserHome" : "TrainerHome",
//         params: { userData }
//       }],
//     });
//   };

//   return (
//     <SafeAreaView style={RegisterStyles.safe}>
//       {/* HEADER WITH BACK BUTTON */}
//       <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 16, paddingVertical: 10, marginTop: 20 }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={28} color="white" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}>
//         {/* HEADER TEXT */}
//         <View style={{ alignItems: "center", marginBottom: 10, paddingHorizontal: 20 }}>
//           <Text style={RegisterStyles.title}>Confirm Details</Text>
//           <Text style={RegisterStyles.subtitle}>
//             Please verify your information
//           </Text>
//         </View>

//         {/* CONFIRMATION CARD */}
//         <View style={[RegisterStyles.card, { borderWidth: 1, borderColor: "#6366F1", width: "100%", marginTop: 10 }]}>
          
//           {/* Full Name */}
//           <View style={{ marginBottom: 20 }}>
//             <Text style={RegisterStyles.label}>Full Name</Text>
//             <View style={{ backgroundColor: "#1a1d2e", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#444" }}>
//               <Text style={{ color: "white", fontSize: 16 }}>{userData.name}</Text>
//             </View>
//           </View>

//           {/* Email */}
//           <View style={{ marginBottom: 20 }}>
//             <Text style={RegisterStyles.label}>Email</Text>
//             <View style={{ backgroundColor: "#1a1d2e", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#444" }}>
//               <Text style={{ color: "white", fontSize: 16 }}>{userData.email}</Text>
//             </View>
//           </View>

//           {/* Phone */}
//           <View style={{ marginBottom: 20 }}>
//             <Text style={RegisterStyles.label}>Phone</Text>
//             <View style={{ backgroundColor: "#1a1d2e", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#444" }}>
//               <Text style={{ color: "white", fontSize: 16 }}>{userData.phone}</Text>
//             </View>
//           </View>

//           {/* Role */}
//           <View style={{ marginBottom: 20 }}>
//             <Text style={RegisterStyles.label}>Role</Text>
//             <View style={{ backgroundColor: "#1a1d2e", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#444" }}>
//               <Text style={{ color: "white", fontSize: 16 }}>{role}</Text>
//             </View>
//           </View>

//           {/* Continue Button */}
//           <TouchableOpacity
//             style={RegisterStyles.button}
//             onPress={handleContinue}
//           >
//             <Text style={RegisterStyles.buttonText}>Continue</Text>
//           </TouchableOpacity>

//           {/* Edit Button */}
//           <TouchableOpacity
//             style={[RegisterStyles.button, { backgroundColor: "#444", marginTop: 10 }]}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={RegisterStyles.buttonText}>Edit Details</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }