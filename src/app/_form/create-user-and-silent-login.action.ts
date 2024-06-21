"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createUser } from "@/server/create-user";
import { silentLogin } from "@/server/silent-login";
import { type NewUserPayload } from "@/server/types";

export const createUserAndSilentLoginAction = async () => {
  console.info("createUserAndSilentLoginAction");

  const data: NewUserPayload = {
    email: "yolo@cool.com",
    password: "azerty1A",
  };

  await createUser(data);
  const loginResult = await silentLogin(data);
  console.info("silent login result", loginResult);

  // const state = btoa(`{"returnTo":"http://localhost:3000/logged-in"}`).slice(
  //   0,
  //   -2
  // );

  cookies().set("id_token", loginResult.id_token, { httpOnly: true });
  // cookies().set("state", state, { httpOnly: true });

  redirect("/api/auth/callback");
};
