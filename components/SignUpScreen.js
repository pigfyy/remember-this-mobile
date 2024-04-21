import * as React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth, useSignUp, useSignIn } from "@clerk/clerk-expo";
import tw from "../lib/tailwind";

export default function SignUpScreen() {
  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();
  const {
    signIn,
    setActive: setSignInActive,
    isLoaded: isSignInLoaded,
  } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isSignUpLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification();

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isSignUpLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setSignUpActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onSignInPress = async () => {
    if (!isSignInLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSignInActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-neutral-800`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={tw`bg-neutral-800 flex justify-center items-center flex-1`}>
        {!pendingVerification && (
          <View style={tw`w-3/4 flex flex-col gap-5`}>
            <View>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
                placeholderTextColor="#888"
              />
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                value={password}
                placeholder="Password..."
                placeholderTextColor="#ccc"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <View style={tw`flex flex-row gap-5`}>
              <TouchableOpacity
                onPress={onSignUpPress}
                style={tw`bg-blue-500 p-3 rounded-md flex-1`}
              >
                <Text style={tw`text-white text-lg font-bold text-center`}>
                  Sign up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSignInPress}
                style={tw`bg-blue-500 p-3 rounded-md flex-1`}
              >
                <Text style={tw`text-white text-lg font-bold text-center`}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {pendingVerification && (
          <View style={tw`flex gap-5 w-3/4`}>
            <View>
              <TextInput
                style={styles.textInput}
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
                placeholderTextColor="#ccc"
              />
            </View>
            <TouchableOpacity
              onPress={onPressVerify}
              style={tw`bg-green-500 p-3 rounded-md`}
            >
              <Text style={tw`text-white text-lg font-bold text-center`}>
                Verify Email
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
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
  },
};
