import { User } from "@/services/models/auth";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Props = {
  profile: User | undefined;
  updateProfile: Dispatch<SetStateAction<User | undefined>>;
};

const ProfileContext = createContext<Props>({} as Props);

export function useProfileContext() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, updateProfile] = useState<User | undefined>();

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
