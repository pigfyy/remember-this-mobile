import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native";
import tw from "../lib/tailwind";
import { supabase } from "../lib/supabase";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/clerk-expo";

export default function Gallery() {
  const { userId, isLoading } = useAuth();
  const [imageDocuments, setImageDocuments] = useState([]);

  useEffect(() => {
    const test = async () => {
      if (userId) {
        let { data, error } = await supabase
          .from("user-images")
          .select("*")
          .eq("userId", userId);

        return data;
      }
    };

    test().then((data) => {
      setImageDocuments(data);
    });
  }, [userId]);

  return (
    <SafeAreaView style={tw`flex items-center`}>
      <ScrollView
        contentContainerStyle={tw`flex flex-row flex-wrap justify-start p-2 py-4`}
      >
        {imageDocuments.map((document) => (
          <View key={document.id} style={tw`w-1/4 p-0.5`}>
            <Image
              source={{ uri: document.imageUrl }}
              style={tw`w-full h-24`} // Adjust height as needed
              resizeMode="cover"
              alt="Image"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
