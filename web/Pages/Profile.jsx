import PageNav from '../Components/PageNav';
import { UserInfo } from '../Components/UserInfo';

function Profile({ username, userID, dataActiveUser }) {
  return (
    <div>
      <PageNav />
      <UserInfo
        username={username}
        userID={userID}
        dataActiveUser={dataActiveUser}
      />
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
