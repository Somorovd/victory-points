import React from "react";
const baseURL = process.env.BASE_URL;

interface User {
  id: string;
  name: string;
}

const UsersPage = async () => {
  let users: User[] | null = null;
  try {
    console.log(`Sending request to --> ${baseURL + "/api/users"}`);
    const res = await fetch(baseURL + "/api/users", { cache: "no-cache" });
    const resBody = await res.json();
    users = resBody.users;
    console.log("res", res);
  } catch (e) {
    console.log("ERROR: Failed to get users");
  }

  return users?.map((user) => <p key={user.id}>{user.name}</p>);
};

export default UsersPage;
