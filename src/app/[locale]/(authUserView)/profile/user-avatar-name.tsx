import Image from "next/image";

export async function AvatarAndName(): Promise<JSX.Element> {
  return (
    <>
      <Image
        className="userImg"
        src="/assets/images/avatar.jpg"
        height={2000}
        width={2000}
        alt="User-image"
      />
    </>
  );
}
