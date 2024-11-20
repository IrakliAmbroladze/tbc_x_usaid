import React from "react";
import BtnGlobal from "./small/btn-global";

export default function Accounting(): JSX.Element {
  return (
    <>
      <BtnGlobal href="#" height="2rem" width="10rem">Income</BtnGlobal>
      <BtnGlobal href="#" height="2rem" width="10rem">Expenses</BtnGlobal>
      <BtnGlobal href="#" height="2rem" width="10rem">Payments</BtnGlobal>
      <BtnGlobal href="#" height="2rem" width="10rem">Items</BtnGlobal>
    </>
  );
}
