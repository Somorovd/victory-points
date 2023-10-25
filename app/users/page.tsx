import React from "react";
const baseURL = process.env.BASE_URL;

interface User {
  id: string;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch(baseURL + "/api/users", { cache: "no-cache" });
  console.log("res", res);
  const resBody = await res.json();
  const users: User[] = resBody.users;

  return users.map((user) => <p key={user.id}>{user.name}</p>);
};

export default UsersPage;
