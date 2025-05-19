import React, { useState } from 'react';
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import UserRegisterForm from "~/components/register";
import LoginForm from "~/components/login";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const [isRegister, setIsRegister] = useState(true);
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const user = api.user.getProfile.useQuery();

  return (
    <>
      {!sessionData && status == 'unauthenticated' && isRegister && <UserRegisterForm setIsRegister={setIsRegister} />}
      {!sessionData && status == 'unauthenticated' && !isRegister && <LoginForm setIsRegister={setIsRegister} />}
      {sessionData && <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Project <span className="text-[hsl(0,0%,68%)]">Management</span> App
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <p className="text-2xl text-white">
            {user.data ? user.data.name : "Loading user name..."}
          </p>
          <p className="text-2xl text-white">
            {user.data ? user.data.email : "Loading user email..."}
          </p>

        </div>
      </div>}
    </>
  );
}


