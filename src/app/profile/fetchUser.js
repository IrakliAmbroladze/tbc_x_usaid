export async function fetchUser() {

  let userURL = 'https://dummyjson.com/users/20';
  
  try {
    const response = await fetch(userURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to find user:", error);
    return [];
  }
}