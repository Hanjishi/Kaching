import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../services/supabase";
import ProfileForm from "../components/ProfileForm";

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    currency: "PHP (₱)",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) return;

      const email = session.user.email;

      const { data } = await supabase
        .from("profiles_backup")
        .select("*")
        .eq("email", email)
        .single();

      setProfile(data ? { ...data, email } : prev => ({ ...prev, email }));
    } catch (err) {
      console.error("Load profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return Alert.alert("Permission required", "Allow access to your gallery.");

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1,1], quality: 0.7 });
    if (!result.canceled) uploadAvatar(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return Alert.alert("Permission required", "Allow access to your camera.");

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1,1], quality: 0.7 });
    if (!result.canceled) uploadAvatar(result.assets[0].uri);
  };

  const uploadAvatar = async (uri) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session.user;
      if (!user) throw new Error("User not logged in");

      const fileExt = uri.split(".").pop().toLowerCase();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, await fetch(uri).then(r => r.blob()), { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setProfile(prev => ({ ...prev, avatar: urlData.publicUrl }));
    } catch (err) {
      Alert.alert("Upload Error", err.message);
    }
  };

  const saveProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return Alert.alert("Error", "User not logged in");

      const profileToSave = { user_id: session.user.id, ...profile };
      const { error } = await supabase.from("profiles_backup").upsert(profileToSave, { onConflict: ["user_id"] });
      if (error) throw error;

      Alert.alert("Saved", "Profile updated successfully.");
    } catch (err) {
      console.error("Save profile error:", err);
      Alert.alert("Error", err.message);
    }
  };

  if (loading) return <Text style={{ textAlign: "center", marginTop: 50 }}>Loading profile...</Text>;

  return (
    <ProfileForm
      profile={profile}
      setProfile={setProfile}
      onSave={saveProfile}
      onChooseImage={chooseImage}
      onTakePhoto={takePhoto}
    />
  );
}