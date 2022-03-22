import { useState, useEffect } from 'react';
import { Spinner } from '../../components/Spinner';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../auth/authSlice';

const Signup = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   if (isError) {
  //     console.log('error');
  //   }
  //   if (isSuccess || user) {
  //     navigate('/');
  //   }
  //   dispatch(reset());
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // sendDataToAPI();
    if (password !== password2) {
      console.log('not natching');
    } else {
      const userData = {
        username,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section style={{ padding: 100 }}>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Enter a username"
          value={username}
        />

        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={email}
        />
        <label>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter a password"
          value={password}
          onChange={handleChange}
        />
        <input
          id="password2"
          type="password"
          name="password2"
          placeholder="Confirm password"
          value={password2}
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already registered?
        <br />
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Signup;

// const Register = () => {
//   const userRef = useRef();
//   const errRef = useRef();

//   const [user, setUser] = useState('');
//   const [validName, setValidName] = useState(false);
//   const [userFocus, setUserFocus] = useState(false);

//   const [email, setEmail] = useState('');
//   const [validEmail, setValidEmail] = useState(false);
//   const [emailFocus, setEmailFocus] = useState(false);

//   const [pwd, setPwd] = useState('');
//   const [validPwd, setValidPwd] = useState(false);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   const [matchPwd, setMatchPwd] = useState('');
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [errMsg, setErrMsg] = useState('');
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setValidName(USER_REGEX.test(user));
//   }, [user]);

//   useEffect(() => {
//     setValidEmail(USER_REGEX.test(email));
//   }, [email]);

//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(pwd));
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   useEffect(() => {
//     setErrMsg('');
//   }, [user, pwd, matchPwd]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if button enabled with JS hack
//     // const v1 = USER_REGEX.test(user);
//     // const v2 = PWD_REGEX.test(pwd);
//     // if (!v1 || !v2) {
//     //   setErrMsg('Invalid Entry');
//     //   return;
//     // }
//     try {
//       const response = await axios.post(
//         REGISTER_URL
//         // JSON.stringify({ user, email, pwd }),
//         // {
//         //   headers: { 'Content-Type': 'application/json' },
//         //   withCredentials: true,
//         // }
//       );
//       // TODO: remove console.logs before deployment
//       console.log(response?.data);
//       //console.log(JSON.stringify(response))
//       setSuccess(true);
//       //clear state and controlled inputs
//       setUser('');
//       setPwd('');
//       setMatchPwd('');
//       setEmail('');
//     } catch (err) {
//       if (!err?.response) {
//         setErrMsg('No Server Response');
//       } else if (err.response?.status === 409) {
//         setErrMsg('Username Taken');
//       } else {
//         setErrMsg('Registration Failed');
//       }
//       errRef.current.focus();
//     }
//   };

//   return (
//     <>
//       {success ? (
//         <section>
//           <h1>Success!</h1>
//           <p>
//             <a href="#">Sign In</a>
//           </p>
//         </section>
//       ) : (
//         <section>
//           <p
//             ref={errRef}
//             className={errMsg ? 'errmsg' : 'offscreen'}
//             aria-live="assertive"
//           >
//             {errMsg}
//           </p>
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="username">
//               Username:
//               {/* <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validName ? 'valid' : 'hide'}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validName || !user ? 'hide' : 'invalid'}
//               /> */}
//             </label>
//             <input
//               type="text"
//               id="username"
//               ref={userRef}
//               autoComplete="off"
//               onChange={(e) => setUser(e.target.value)}
//               value={user}
//               required
//               aria-invalid={validName ? 'false' : 'true'}
//               aria-describedby="uidnote"
//               onFocus={() => setUserFocus(true)}
//               onBlur={() => setUserFocus(false)}
//             />
//             <p
//               id="uidnote"
//               className={
//                 userFocus && user && !validName ? 'instructions' : 'offscreen'
//               }
//             >
//               {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
//               4 to 24 characters.
//               <br />
//               Must begin with a letter.
//               <br />
//               Letters, numbers, underscores, hyphens allowed.
//             </p>

//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               // ref={userRef}
//               autoComplete="off"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               required
//               aria-invalid={validEmail ? 'false' : 'true'}
//               aria-describedby="uidnote"
//               onFocus={() => setUserFocus(true)}
//               onBlur={() => setUserFocus(false)}
//             />

//             <label htmlFor="password">
//               Password:
//               {/* <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validPwd ? 'valid' : 'hide'}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validPwd || !pwd ? 'hide' : 'invalid'}
//               /> */}
//             </label>
//             <input
//               type="password"
//               id="password"
//               onChange={(e) => setPwd(e.target.value)}
//               value={pwd}
//               required
//               aria-invalid={validPwd ? 'false' : 'true'}
//               aria-describedby="pwdnote"
//               onFocus={() => setPwdFocus(true)}
//               onBlur={() => setPwdFocus(false)}
//             />
//             <p
//               id="pwdnote"
//               className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
//             >
//               {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
//               8 to 24 characters.
//               <br />
//               Must include uppercase and lowercase letters, a number and a
//               special character.
//               <br />
//               Allowed special characters:{' '}
//               <span aria-label="exclamation mark">!</span>{' '}
//               <span aria-label="at symbol">@</span>{' '}
//               <span aria-label="hashtag">#</span>{' '}
//               <span aria-label="dollar sign">$</span>{' '}
//               <span aria-label="percent">%</span>
//             </p>

//             <label htmlFor="confirm_pwd">
//               Confirm Password:
//               {/* <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validMatch && matchPwd ? 'valid' : 'hide'}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validMatch || !matchPwd ? 'hide' : 'invalid'}
//               /> */}
//             </label>
//             <input
//               type="password"
//               id="confirm_pwd"
//               onChange={(e) => setMatchPwd(e.target.value)}
//               value={matchPwd}
//               required
//               aria-invalid={validMatch ? 'false' : 'true'}
//               aria-describedby="confirmnote"
//               onFocus={() => setMatchFocus(true)}
//               onBlur={() => setMatchFocus(false)}
//             />
//             <p
//               id="confirmnote"
//               className={
//                 matchFocus && !validMatch ? 'instructions' : 'offscreen'
//               }
//             >
//               {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
//               Must match the first password input field.
//             </p>

//             <button
//             // disabled={!validName || !validPwd || !validMatch ? true : false}
//             >
//               Sign Up
//             </button>
//           </form>
//           <p>
//             Already registered?
//             <br />
//             <span className="line">
//               <Link to="/login">Sign In</Link>
//             </span>
//           </p>
//         </section>
//       )}
//     </>
//   );
// };

// export default Register;
