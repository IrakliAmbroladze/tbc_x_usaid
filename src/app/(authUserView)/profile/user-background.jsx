import { getSession } from "@auth0/nextjs-auth0";


export async function UserBackground() {
  const { user } = await getSession();

  return (
    <div className="userBackground">
      <button className="editBtn"> Edit</button>
      <div className="userContact" >Email: {user.email || 'not available'}</div>
    </div>
  )
}
