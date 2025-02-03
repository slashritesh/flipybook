import { BookIcon, FileHeart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-3 items-center">
      <div className="bg-gradient-to-tr from-blue-400 to-blue-700 rounded-lg text-white p-2 flex items-center justify-center">
        <FileHeart size={20} />
      </div>
      <h3 className="font-semibold text-lg">
        Flippy<span className="text-blue-500">Book</span>.
      </h3>
    </Link>
  );
};

export default Logo;
