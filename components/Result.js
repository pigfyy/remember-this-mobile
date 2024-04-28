import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { useAtom } from "jotai";
import { answerAtom, questionAtom, screenAtom } from "../lib/atoms";
import { ArrowLeftFromLine } from "lucide-react-native";

const Result = () => {
  const [answer, setAnswer] = useAtom(answerAtom);
  const [question, setQuestion] = useAtom(questionAtom);
  const [screen, setScreen] = useAtom(screenAtom);

  const handlePress = () => {
    setScreen("main");
    setQuestion("");
    setAnswer({ imageUrl: "", text: "" });
  };

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      <ScrollView style={tw`py-12 px-4`}>
        <TouchableOpacity
          style={tw`bg-[#ccc] mr-auto p-2 rounded-lg mb-4`}
          onPress={handlePress}
        >
          <ArrowLeftFromLine color={"#262626"} />
        </TouchableOpacity>
        <View style={tw`flex flex-col gap-4`}>
          <View>
            <Image
              source={{ uri: answer.imageUrl }}
              style={tw`w-full aspect-square`}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={tw`text-white text-2xl font-bold`}>
              Your Question:
            </Text>
            <Text style={tw`text-white text-lg`}>{question}</Text>
          </View>
          <View>
            <Text style={tw`text-white text-2xl font-bold`}>Answer:</Text>
            <Text style={tw`text-white text-lg`}>{answer.text}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Result;
