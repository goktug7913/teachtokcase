import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "../../interfaces/FypApiResponse";
import Like from "../../assets/ActionBar/Like.svg";
import Comment from "../../assets/ActionBar/Comments.svg";
import Bookmark from "../../assets/ActionBar/Bookmark.svg";
import Share from "../../assets/ActionBar/Share.svg";

interface ActionBarProps {
  user: User;
}

export default function ActionBar({ user }: ActionBarProps) {
  return (
    <View
      style={{
        height: 300,
        alignSelf: "flex-end",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#fff",
          }}
        >
          <Image
            source={{
              uri: user.avatar,
            }}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            backgroundColor: "#28B18F",
            borderRadius: 50,
            width: 25,
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            bottom: -8,
            left: 14,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "SF-Pro-Rounded",
            }}
          >
            +
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <Like />
        <Text style={styles.actionText}>54</Text>
      </View>

      <View style={styles.actionContainer}>
        <Comment />
        <Text style={styles.actionText}>12</Text>
      </View>

      <View style={styles.actionContainer}>
        <Bookmark />
        <Text style={styles.actionText}>27</Text>
      </View>

      <View style={styles.actionContainer}>
        <Share />
        <Text style={styles.actionText}>61</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: -0.12,
    marginTop: 4,
    fontFamily: "SF-Pro-Rounded",
  },
  actionContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
