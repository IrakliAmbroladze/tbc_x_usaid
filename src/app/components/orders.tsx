import React from "react";

export default function Orders(): JSX.Element {
  return (
    <div className="grid grid-cols-3 grid-rows-2 bg-gray-50 gap-4 justify-evenly border-2 text-black">
      <b className="text-center border-2 rounded-md">New orders</b>
      <b className="text-center border-2 rounded-md">Planned</b>
      <b className="text-center border-2 rounded-md">Done</b>
    </div>
  );
}
