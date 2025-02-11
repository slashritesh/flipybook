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
    <div className="mx-10 py-5 flex items-center justify-between">
      <Logo />
      <div className="w-full">
        {isAuthenticated ? (
          <Link
            href={"/dashboard"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Go To Dashboard
          </Link>
        ) : (
          <>
            <div className="flex">
              <div className=" flex-1 gap-5 flex justify-center items-center">
                <Link
                  className={cn(buttonVariants({ variant: "ghost" }))}
                  href={"/"}
                >
                  Usecase
                </Link>
                <Link
                  className={cn(buttonVariants({ variant: "ghost" }))}
                  href={"/"}
                >
                  Guides
                </Link>
              </div>
              <div className="flex gap-5">

              <LoginLink>
                <Button className="">Login</Button>
              </LoginLink>
              <RegisterLink>
                <Button className="p-5 rounded-xl">Get Started</Button>
              </RegisterLink>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
