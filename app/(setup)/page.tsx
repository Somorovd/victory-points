import React from "react";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
	const userProfile = await initialProfile();
	return <div>SetupPage</div>;
};

export default SetupPage;
