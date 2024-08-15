import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  interface user {
    "nickname": string,
    "name": string,
    "picture": string,
    "updated_at": string,
    "email": string,
    "email_verified": boolean,
    "sub": string
  }

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )
  );
};

export default Profile;