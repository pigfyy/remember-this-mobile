import {
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import tw from "./lib/tailwind";
import { Camera, BookImage, LogOut } from "lucide-react-native";
import { screenAtom, cameraTakenImageAtom, answerAtom } from "./lib/atoms";
import { useAtom } from "jotai";
import UserCamera from "./components/UserCamera";
import ConfirmTakenImage from "./components/ConfirmTakenImage";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import SignUpScreen from "./components/SignUpScreen";
import * as SecureStore from "expo-secure-store";
import Gallery from "./components/Gallery.js";
import SearchBox from "./components/SearchBox.js";
import Result from "./components/Result.js";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [screen, setScreen] = useAtom(screenAtom);

  const [answer, setAnswer] = useAtom(answerAtom);
  console.log(answer);

  return (
    <ClerkProvider
      publishableKey="pk_test_Y29uY3JldGUtY2hpZ2dlci0xMy5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
    >
      <SignedOut>
        <SignUpScreen />
      </SignedOut>
      <SignedIn>
        {screen == "camera" ? <UserCamera /> : null}
        {screen == "confirm image" ? <ConfirmTakenImage /> : null}
        {screen == "results" ? <Result /> : null}
        {screen == "main" ? (
          <View style={tw`flex-1 bg-neutral-800`}>
            <View style={tw`flex-1`}>
              <SearchBox />
              <Gallery />
            </View>
            <Footer />
          </View>
        ) : null}
      </SignedIn>
    </ClerkProvider>
  );
}

const Footer = () => {
  const [screen, setScreen] = useAtom(screenAtom);
  const { isLoading, signOut } = useAuth();

  const openCamera = () => {
    setScreen("camera");
  };

  const logOut = () => {
    signOut();
  };

  return (
    <SafeAreaView style={tw`bg-neutral-700 bottom-0 w-full`}>
      <View style={tw`flex flex-row justify-center gap-3 p-2`}>
        <TouchableOpacity
          style={tw`bg-neutral-800 p-3 rounded-full`}
          onPress={openCamera}
        >
          <Camera color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-neutral-800 p-3 rounded-full`}>
          <BookImage color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-neutral-800 p-3 rounded-full`}
          onPress={logOut}
        >
          <LogOut color="red" size={40} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
