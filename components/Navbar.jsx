"use client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import Logo from "./ui/Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <div className="mx-20 py-5 flex items-center justify-between">
      <Logo />
      <div>
        {isAuthenticated ? (
          <Link href={"/dashboard"} className={cn(buttonVariants({variant:"default"}))}>Go To Dashboard</Link>
        ) : (
          <>
            <LoginLink>
              <Button className="">Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button className="p-5 rounded-xl">Get Started</Button>
            </RegisterLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
