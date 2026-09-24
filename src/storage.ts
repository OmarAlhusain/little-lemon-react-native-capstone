import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notifications: {
    orderStatuses: boolean;
    passwordChanges: boolean;
    specialOffers: boolean;
    newsletter: boolean;
  };
};

const ONBOARDED_KEY = "@littlelemon:onboarded";
const PROFILE_KEY = "@littlelemon:profile";

export const emptyProfile: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notifications: {
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true
  }
};

export async function isOnboarded() {
  return (await AsyncStorage.getItem(ONBOARDED_KEY)) === "true";
}

export async function completeOnboarding(profile: UserProfile) {
  await AsyncStorage.multiSet([
    [PROFILE_KEY, JSON.stringify(profile)],
    [ONBOARDED_KEY, "true"]
  ]);
}

export async function loadProfile(): Promise<UserProfile> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (!raw) return emptyProfile;
  return { ...emptyProfile, ...JSON.parse(raw) };
}

export async function saveProfile(profile: UserProfile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function clearUserData() {
  await AsyncStorage.multiRemove([ONBOARDED_KEY, PROFILE_KEY]);
}
