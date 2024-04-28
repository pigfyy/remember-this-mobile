import React, { useState } from "react";
import {
  View,
  question,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "../lib/tailwind";
import { SendHorizonal } from "lucide-react-native";
import { queryApi } from "../lib/utils";
import { useAuth } from "@clerk/clerk-expo";
import { useAtom } from "jotai";
import { answerAtom, questionAtom, screenAtom } from "../lib/atoms";

export default function SearchBox() {
  const [question, setQuestion] = useAtom(questionAtom);
  const [screen, setScreen] = useAtom(screenAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const { userId, isLoading } = useAuth();

  const queryResult = async () => {
    const pineconeResponse = await queryApi("/query-image", {
      userId: userId,
      question: question,
    });
    const imageUrl = pineconeResponse.matches[0].metadata.imageUrl;

    const textAnswer = await queryApi("/query-response", {
      imageUrl: imageUrl,
      question: question,
    });

    setAnswer({ imageUrl: imageUrl, text: textAnswer });

    setScreen("results");
  };

  return (
    <SafeAreaView style={tw`flex`}>
      <View style={tw`p-2 flex flex-row gap-2`}>
        <TextInput
          style={styles.textInput}
          value={question}
          autoCapitalize="none"
          placeholder="What's on your mind?"
          placeholderTextColor="#888"
          onChangeText={(e) => setQuestion(e)}
        />
        <TouchableOpacity
          style={tw`border-[2px] border-[#ccc] rounded-lg flex justify-center aspect-square items-center`}
          onPress={queryResult}
        >
          <SendHorizonal color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  textInput: {
    borderWidth: 2,
    borderColor: "#ccc",
    color: "white",
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
    height: 50,
    flex: 1,
  },
};
