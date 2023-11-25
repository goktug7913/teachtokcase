import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PlaylistBar from "./PlaylistBar";
import ActionBar from "./ActionBar";
import Question from "./Question";
import Choices from "./Choices";
import { MultipleChoiceQuestion } from "../../interfaces/FypApiResponse";
import { memo } from "react";
import ContentInfo from "./ContentInfo";

export default memo(StreamCard);

function StreamCard({ data }: { data: MultipleChoiceQuestion }) {
  if (!data.id) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 16,
        alignContent: "center",
        justifyContent: "flex-end",
        backgroundColor: "#000",
      }}
    >
      <ImageBackground
        source={{
          uri: data.image,
        }}
        resizeMethod={"resize"}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <Question question={data.question} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <Choices options={data.options} id={data.id} />
              <ContentInfo
                username={data.user.name}
                description={data.description}
              />
            </View>

            <ActionBar user={data.user} />
          </View>
        </View>
        <PlaylistBar playlistName={data.playlist} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 8,
    flexGrow: 1,
    justifyContent: "flex-end",
    marginTop: 70,
  },
});
