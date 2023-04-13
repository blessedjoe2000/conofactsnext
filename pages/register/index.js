import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        passwordConfirm,
        username,
        dob,
        about,
        location,
      });
      localStorage.setItem("token", response.data.generateToken);
      if (response.status === 201) {
        const data = await response.json();
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setUsername("");
        setDob("");
        setAbout("");
        setLocation("");
        router.push("/interests");
        localStorage.setItem(
          "userId",
          JSON.stringify({ userId: response.data.userId })
        );
      }
      toast.success("user registered successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="heading">
        <h1 className="page-heading-icon ">
          <FontAwesomeIcon icon={faAddressBook} />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Enter name..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm password:</label>
            <input
              className="form-control"
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              placeholder="Confirm your password..."
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Enter username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">DOB:</label>
            <input
              className="form-control"
              type="date"
              name="dob"
              id="dob"
              value={dob}
              placeholder="Enter DOB..."
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="about">About:</label>
            <input
              className="form-control"
              type="text"
              name="about"
              id="about"
              value={about}
              placeholder="About yourself..."
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              className="form-control"
              type="text"
              name="location"
              id="location"
              value={location}
              placeholder="Enter location..."
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <p>
          Already created an account?
          <Link href="/login"> click here to login</Link>
        </p>
      </section>
    </>
  );
}

export default Register;
