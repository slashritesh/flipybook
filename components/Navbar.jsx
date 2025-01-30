import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="mx-20 py-5 flex justify-between">
      <div>
        <h3 className="font-semibold text-lg">
          Flippy<span className="text-blue-500">Book</span>.
        </h3>
      </div>
      <div>
        <Button className="p-5 rounded-xl">Join Waitlist Now</Button>
      </div>
    </div>
  );
};

export default Navbar;
