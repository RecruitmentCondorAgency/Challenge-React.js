import * as React from "react";
import { AuthContext } from "../../app";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (auth.user === null) {
      return navigate("/login");
    }
  }, []);
  return <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugit assumenda amet? Laudantium, repellendus laboriosam? Error, ullam aspernatur ipsam quisquam delectus omnis quod pariatur possimus magnam sed accusamus commodi est.</p>;
}
