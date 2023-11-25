import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ContentInfoProps {
  username: string;
  description: string;
}

export default function ContentInfo(data: ContentInfoProps) {
  const renderDescription = () => {
    const words = data.description.split(" ");
    return words.map((word, index) =>
      // Make hashtags bold
      word.startsWith("#") ? (
        <Text key={index} style={styles.hashtag}>
          {word + " "}
        </Text>
      ) : (
        <Text key={index} style={styles.description}>
          {word + " "}
        </Text>
      ),
    );
  };

  return (
    <View style={styles.contentInfo}>
      <Text style={styles.username}>{data.username}</Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        {renderDescription()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "400",
  },
  hashtag: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
  },
  contentInfo: {},
});
