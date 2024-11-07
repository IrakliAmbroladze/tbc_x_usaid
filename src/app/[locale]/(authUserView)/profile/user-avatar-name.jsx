import { getSession } from "@auth0/nextjs-auth0";

export async function AvatarAndName() {
  const { user } = await getSession();
  return (
    <>
      <img className="userImg" src={user.picture || null} alt="User-image"></img>
      <div className="absolute z-30 top-1/4 left-1/4 text-black dark:text-white">
        <h1 className="text-2xl" style={{marginLeft: "-30px"}}>{user.nickname || user.name || ''}</h1>
      </div>
    </>
  )
}
