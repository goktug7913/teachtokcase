import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Option, QuestionResult } from "../../interfaces/FypApiResponse";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axiosClient";

interface ChoiceProps {
  options: Option[];
  id: number;
}

const url = "/reveal?id=";

export default function Choices({ options, id }: ChoiceProps) {
  const [selected, setSelected] = useState<Option | undefined>();
  const [answerResponse, setAnswerResponse] = useState<
    QuestionResult | undefined
  >();

  // Refs to the choice containers
  const optionRefs = useRef<Array<View | null>>([]);

  // Function to handle the click event
  const handleClick = async (selected: Option) => {
    // If an option is already selected or we received the answer, return
    // if (selected || answerResponse.id) return;

    // Set the selected option
    setSelected(selected);

    // Get the correct answer
    try {
      const res = await axiosClient.get<QuestionResult>(url + id);
      setAnswerResponse(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    // If we have the correct answer, highlight it
    if (
      answerResponse?.correct_options[0]?.id &&
      selected?.id === answerResponse?.correct_options[0].id
    ) {
      optionRefs.current[
        answerResponse.correct_options.at(0).id
      ]?.setNativeProps({
        style: { ...styles.correctBg },
      });
    }
    // If we have the wrong answer, highlight it
    else if (
      answerResponse?.correct_options[0]?.id &&
      selected?.id !== answerResponse?.correct_options[0].id
    ) {
      optionRefs.current[selected?.id]?.setNativeProps({
        style: { ...styles.wrongBg },
      });

      // Highlight the correct answer too
      optionRefs.current[
        answerResponse.correct_options.at(0).id
      ]?.setNativeProps({
        style: { ...styles.correctBg },
      });
    }
  }, [answerResponse?.id, selected?.id]);

  return (
    <View
      style={{
        gap: 10,
        flex: 1,
        maxWidth: 300,
        flexDirection: "column",
        justifyContent: "flex-end",
        marginBottom: 24,
      }}
    >
      {options.map((option) => (
        <Animated.View
          key={option.id}
          ref={(ref) => {
            optionRefs.current[option.id] = ref;
          }}
          style={styles.choiceContainer}
        >
          <Pressable
            key={option.id}
            android_ripple={{
              color: "rgba(255, 255, 255, 0.50)",
              borderless: true,
              radius: 400,
            }}
            onPress={async () => {
              await handleClick(option);
            }}
            disabled={!!answerResponse?.id}
          >
            <Text style={styles.choiceText}>{option.answer}</Text>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  choiceContainer: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    minWidth: 300,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
  },
  choiceText: {
    fontSize: 18,
    textDecorationStyle: "double",
    textDecorationColor: "#000",
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start",
    fontFamily: "SF-Pro-Rounded",
  },
  correctBg: {
    backgroundColor: "rgba(40, 177, 143, 0.70)",
  },
  wrongBg: {
    backgroundColor: "rgba(220, 95, 95, 0.70)",
  },
});
