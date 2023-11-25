import PlaylistIcon from "../../assets/PlaylistBarIcons/Playlist.svg";
import { Text, View } from "react-native";
import ArrowRight from "../../assets/PlaylistBarIcons/ArrowRight.svg";

interface PlaylistBarProps {
  playlistName: string;
}
export default function PlaylistBar({ playlistName }: PlaylistBarProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 12,
        backgroundColor: "#161616",
        alignItems: "center",
      }}
    >
      <PlaylistIcon
        style={{
          marginRight: 4,
        }}
      />
      <Text
        style={{
          color: "#fdfdfd",
          fontSize: 13,
          fontWeight: "600",
          fontFamily: "SF-Pro-Rounded",
        }}
      >
        Playlist • {playlistName}
      </Text>
      <ArrowRight
        style={{
          marginLeft: "auto",
        }}
      />
    </View>
  );
}
