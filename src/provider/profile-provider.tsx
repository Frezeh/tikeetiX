import { getItem, saveItem } from "@/lib/utils";
import { User } from "@/services/models/auth";
import { createContext, useContext, useState } from "react";

type Props = {
  profile: User | null | undefined;
  updateProfile: (user: User | undefined) => void;
};

const ProfileContext = createContext<Props>({} as Props);

export function useProfileContext() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<User | null | undefined>(
    getItem<User>("user")
  );

  const updateProfile = (user: User | undefined) => {
    if (user) {
      setProfile(user);
      saveItem("user", user);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
