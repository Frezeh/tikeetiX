import Globe from "@/assets/icons/globe.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

const LANGUAGES = [
  {
    name: "ENG",
    value: "English",
  },
  {
    name: "FRA",
    value: "French",
  },
  {
    name: "ESP",
    value: "Spanish",
  },
  {
    name: "GER",
    value: "German",
  },
];

export default function AuthenticationLayot({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex h-screen overflow-hidden lg:justify-between items-center justify-center px-5 bg-background">
      {children}

      <Select>
        <SelectTrigger
          className="absolute right-5 top-5 w-fit min-w-[97px] h-9 border-[#E4E7EC] text-[#667185]"
          prefixIcon={<img src={Globe} alt="Globe" className="mr-1" />}
        >
          <SelectValue placeholder="ENG" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {LANGUAGES.map((language) => (
              <SelectItem
                value={language.value}
                key={language.name}
                className="text-[#667185] font-medium"
              >
                {language.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
}
