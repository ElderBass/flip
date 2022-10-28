import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Username.module.css";

const Username = (props) => {
  // const [name, setName] = useState('');

  // useEffect(() => {
  //   console.log('username inside Username.jsx', username);
  //   setName(username);
  // }, [username]);

  return (
    <>
      <li>
        <h6 className={styles.username}>
          <span className={styles.welcome}>Welcome, </span> {props.username}
        </h6>
      </li>
      <li>
        <Link className={styles.profile} to={`/users/${props.username}`}>
          Profile
        </Link>
      </li>
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     username: state.user.username,
//   };
// };

// export default connect(mapStateToProps)(Username);
export default Username;

