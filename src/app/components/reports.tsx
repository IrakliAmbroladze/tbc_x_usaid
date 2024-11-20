import React from "react";
import BtnGlobal from "./small/btn-global";

export default function Reports(): JSX.Element {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-8">
      <BtnGlobal href="#" height="4rem" width="20rem">Balance Sheet</BtnGlobal>
      <BtnGlobal href="#" height="4rem" width="20rem">Income Statement</BtnGlobal>
      <BtnGlobal href="#" height="4rem" width="20rem">Statement of Cash Flows</BtnGlobal>
      <BtnGlobal href="#" height="4rem" width="20rem">Statement of Equity</BtnGlobal>
    </div>
  );
}
