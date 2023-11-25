import StreamCard from "../components/StreamCard/StreamCard";
import { ActivityIndicator, FlatList, View } from "react-native";
import FypHeader from "../components/FypHeader/FypHeader";
import { useQuery } from "react-query";
import axiosClient from "../api/axiosClient";
import { useState } from "react";

const url = "/for_you";
interface MultipleChoiceQuestion {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
}

interface Option {
  id: string;
  answer: string;
}

interface User {
  name: string;
  avatar: string;
}
export default function Index() {
  const batch_size = 3;
  const [data, setData] = useState<Array<MultipleChoiceQuestion>>([]);

  const query = useQuery("for_you", async () => {
    const new_data = [];
    for (let i = 0; i < batch_size; i++) {
      new_data.push(
        await axiosClient
          .get<MultipleChoiceQuestion>(url)
          .then((res) => res.data),
      );
    }
    setData([...data, ...new_data]);
    return data; // We don't need to return anything, but we need to return something to make TS happy
  });

  return (
    <View>
      <FypHeader />
      <FlatList
        data={data}
        renderItem={({ item }) => <StreamCard data={item} />}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        onEndReachedThreshold={0.9}
        onEndReached={async () => {
          await query.refetch();
        }}
        ListFooterComponent={() => {
          return query.isFetching && data.length > 0 ? (
            <ActivityIndicator size={"large"} color={"#fff"} />
          ) : null;
        }}
      />
    </View>
  );
}
