import React from "react";
import { AvatarAndName } from "./user-avatar-name";
import { UserBackground } from "./user-background";
import "./profile.css";

export default function Profile(): JSX.Element {
  return (
    <div className="profile-card">
      <AvatarAndName />
      <UserBackground />
    </div>
  );
}
