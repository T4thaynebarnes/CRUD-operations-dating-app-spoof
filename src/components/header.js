import { useEffect, useState } from "react";

function Header() {
  const URL_ENDPOINT = "http://localhost:3000/sims";
  const [users, setUser] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newComment, setNewComment] = useState("");
  const getUsers = async () => {
    console.log("value of users", users);

    try {
      const response = await fetch(URL_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Code Red Error! status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
      return;
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    console.log("value of users in useEffect()", users);
    getUsers();
  }, []);
  function postNewUser(e) {
    console.log(newInterest, "comment", newComment);
    const newUserData = {
      name: newUserName,
      interests: newInterest,
      comments: newComment,
    };
    fetch(URL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then(() => getUsers())
      .then(() => console.log(newInterest));
  }

  return (
    <div>
      <h1 className="headers-title">The Hook!🪝©️</h1>
      <div className="header-container">
        <h2 className="sub-headers">Where even the early 🪱 gets the fish!©</h2>

        <p className="">
          Here you can use our dating app for free! We are not like all the
          other dating apps that talk about fish! We are the Hook! if you are
          hooked sign up below for FREE!
        </p>
        <div className="signup-card">
          <form>
            <div className="form-group">
              <h1 className="headers">Sign up free!👇</h1>
              <div id="card-container">
                <div className="form-group">
                  <label>name</label>
                  <input
                    className="form-control"
                    onChange={(e) => setNewUserName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Interests:</label>
                  <input
                    className="form-control"
                    onChange={(e) => setNewInterest(e.target.value)}
                  ></input>
                </div>

                <div className="form-group">
                  <label>tells us about you!</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <br></br>
                  <button
                    className="submit-button"
                    onClick={(e) => postNewUser(e)}
                  >
                    Submit👌
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
