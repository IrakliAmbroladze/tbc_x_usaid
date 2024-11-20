import React from "react";
import BtnGlobal from "./small/btn-global";

export default function CRM(): JSX.Element {
  return (
    <>
      <BtnGlobal href="#" height="2rem" width="10rem">Proposals</BtnGlobal>
      <BtnGlobal href="#" height="2rem" width="10rem">Clients</BtnGlobal>
      <BtnGlobal href="#" height="2rem" width="10rem">Tasks</BtnGlobal>
    </>
  );
}
