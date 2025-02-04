
import React from "react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "./ui/Logo";
import { redirect } from "next/navigation";

const AdminNavbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/")
  }

  return (
    <header className="mx-20 py-5 items-center flex justify-between">
      <div>
        <Logo />
      </div>
      <div></div>
      <div className="flex items-center gap-5">
        <LogoutLink>
          <Button>Log Out</Button>
        </LogoutLink>
        <UserComp user={user} />
      </div>
    </header>
  );
};

const UserComp = ({ user }) => {
  
  return (
    <>
      <div>
        <Image
          className="rounded-full"
          height={40}
          alt={'user'}
          width={40}
          src={user.picture}
        />
      </div>
    </>
  );
};

export default AdminNavbar;
