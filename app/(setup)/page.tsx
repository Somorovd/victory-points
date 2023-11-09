import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  const userProfile = await initialProfile();
  return null;
};

export default SetupPage;
