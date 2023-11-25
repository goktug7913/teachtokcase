import { Text, View } from "react-native";

interface QuestionProps {
  question: string;
}

export default function Question({ question }: QuestionProps) {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 8,
        marginTop: 60,
        marginBottom: "auto",
        borderRadius: 8,
        width: "70%",
      }}
    >
      <Text
        style={{
          color: "#fdfdfd",
          fontSize: 26,
          fontWeight: "500",
        }}
      >
        {question}
      </Text>
    </View>
  );
}
