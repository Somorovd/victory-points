import React from "react";
import { initialProfile } from "@/lib/initial-profile";
import InitialModal from "@/components/modals/initial-modal";

const SetupPage = async () => {
	const userProfile = await initialProfile();
	return <InitialModal />;
};

export default SetupPage;
