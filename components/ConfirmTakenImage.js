import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "../lib/tailwind";
import { useAtom } from "jotai";
import { cameraTakenImageAtom, screenAtom } from "../lib/atoms";
import { useAuth } from "@clerk/clerk-expo";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { supabase } from "../lib/supabase";

const getEmbedding = async (data) => {
  const payload = {
    image: data,
  };

  const response = await fetch("http://192.168.68.72:8000/get-embedding", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const res = await response.json();

  return JSON.parse(res.embedding);
};

const ConfirmTakenImage = () => {
  const [image, setImage] = useAtom(cameraTakenImageAtom);
  const [screen, setScreen] = useAtom(screenAtom);
  const { isLoading, userId } = useAuth();

  const retake = () => {
    setImage("");
    setScreen("camera");
  };

  const upload = async () => {
    const url = await uploadFileToSupabase(image);
    const data = await getEmbedding(url);
    console.log(data);
  };

  async function uploadFileToSupabase(filePath) {
    // Read the file into a blob
    const fileUri = filePath;
    const blob = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const buffer = Buffer.from(blob, "base64");

    const bucketName = "images";
    const fileName = `${userId}/${uuid()}`;

    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer);

    if (error) {
      console.error("Error uploading file:", error);
      return;
    }

    const url = `https://${"cyworhullhtvubrfyzze"}.supabase.co/storage/v1/object/public/${"images"}/${
      data.path
    }`;

    return url;
  }

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          source={{ uri: image }}
          style={tw`w-full h-full`}
          resizeMode="contain"
        />
      </View>
      <View style={tw`absolute flex-1 w-full h-full justify-end pb-10`}>
        <View style={tw`flex-row justify-center gap-10`}>
          <TouchableOpacity
            style={tw`bg-black p-2 rounded-lg`}
            onPress={retake}
          >
            <Text style={tw`text-white p-3 text-lg`}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-black p-2 rounded-lg`}
            onPress={upload}
          >
            <Text style={tw`text-white p-3 text-lg`}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmTakenImage;
