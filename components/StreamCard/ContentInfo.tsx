import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ContentInfoProps {
  username: string;
  description: string;
}

export default function ContentInfo(data: ContentInfoProps) {
  const renderDescription = () => {
    // Split the description into words to extract hashtags
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

      <View style={styles.descriptionContainer}>{renderDescription()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
    fontFamily: "SF-Pro-Rounded",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "400",
    fontFamily: "SF-Pro-Rounded",
  },
  hashtag: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "SF-Pro-Rounded",
  },
  contentInfo: {},
});
