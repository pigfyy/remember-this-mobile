import tw from "../lib/tailwind";
import { Camera, CameraType } from "expo-camera";
import { RefreshCcw, CameraIcon } from "lucide-react-native";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cameraTakenImageAtom, screenAtom } from "../lib/atoms";
import { useAtom } from "jotai";

export default function UserCamera() {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useAtom(cameraTakenImageAtom);
  const [screen, setScreen] = useAtom(screenAtom);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{ padding: 40 }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }

    setScreen("confirm image");
  };

  return (
    <View style={tw`flex-1 justify-center`}>
      <Camera ref={(ref) => setCamera(ref)} style={tw`flex-1`} type={type}>
        <View style={tw`flex-1 flex-row m-16 items-end justify-between`}>
          <TouchableOpacity
            style={tw`bg-black p-2 rounded-lg`}
            onPress={toggleCameraType}
          >
            <RefreshCcw color="white" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-black p-2 rounded-lg`}
            onPress={takePicture}
          >
            <CameraIcon color="white" size={45} />
          </TouchableOpacity>
          <TouchableOpacity style={tw`p-2 rounded-lg opacity-0`}>
            <RefreshCcw color="white" size={30} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
