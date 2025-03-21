import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./general-settings";
import SecuritySettings from "./security-settings";

export default function Settings() {
  return (
    <div className="pb-20">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] p-5">
        <div className="space-y-1">
          <h1 className="font-medium text-[28px]">Settings</h1>
          <p className="text-[#475367]">
            Manage your account settings and preferences here
          </p>
        </div>
      </div>
      <Tabs defaultValue={"general"} className="mb-10">
        <TabsList className="lg:grid w-fit max-w-[589px] lg:grid-cols-2 rounded-none bg-transparent h-[52px] border-b border-b-[#E4E7EC] mx-5">
          <TabsTrigger
            value="general"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            <p>General</p>
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            <p>Security</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-2">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="integrations" className="mt-2">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
