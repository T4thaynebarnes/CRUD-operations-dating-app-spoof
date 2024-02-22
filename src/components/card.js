// this is the card component housed inside is the CREATE,READ< UPDATE< & DELETE>
// Create - adding new records to the database. postNewUser()- in headers.js
// Read - retrieving data from the database.  getUsers()
// Update - modifying existing records in the database. postNewComment()
// Delete - Removing existing records from the database. deleteUser()
// *********************************************************

import { useEffect, useState } from "react";

function Card() {
  const URL_ENDPOINT = "http://localhost:3000/sims";
  // setting state values users is the data from api and setUser raises it to the state
  const [users, setUser] = useState([]);

  const [updatedComment, setUpdatedComment] = useState("");

  // using async function with a try catch wrap for error handling
  // READ method****
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
  // using useeffect to set the state to the users = array of objects from api
  useEffect(() => {
    console.log("value of users in useEffect()", users);
    getUsers();
  }, []);
  // this function handles the event for the not your type button DELETE!
  function deleteUser(id) {
    fetch(URL_ENDPOINT + `/${id}`, {
      method: "DELETE",
    })
      .then(() => getUsers())

      .then(() => console.log("user to be deleted", id));
  }
  // this function handles the api POST request to add the newuser
  // function postNewUser(e) {
  //   console.log(newInterest, "comment", newComment);
  //   const newUserData = {
  //     name: newUserName,
  //     interests: newInterest,
  //     comments: newComment,
  //   };
  //   fetch(URL_ENDPOINT, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newUserData),
  //   })
  //     .then(() => getUsers())
  //     .then(() => console.log(newInterest));
  // }
  // function to handle put request
  function postnewComment(e, userObject) {
    // putting the object into a variable avoids errors
    let updatedUserObject = {
      ...userObject,
      comments: updatedComment,
    };

    fetch(`${URL_ENDPOINT}/${userObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserObject),
    })
      .then(() => getUsers())
      .then(() => console.log("value", userObject));
  }
  return (
    <div className="App">
      <div className="container-fluid">
        {users.map((user, index) => (
          <div id="card" className="card" key={index}>
            <button className="button" onClick={() => deleteUser(user.id)}>
              👻Not your type?👻
            </button>

            <img
              src={user.avatars}
              className="card-img-top"
              alt={user.avatars}
            ></img>
            <div className="card-body">
              <div className="card-text">
                <h5>{user.name}</h5>
                <h6>Interests: </h6>
                <label>{user.interests}</label>
                <h6 className="post-title">Posts:</h6>
                <div className="posts">
                  <p>{user.comments}</p>
                </div>
                <form>
                  <label>Send a message 😍</label>
                  <textarea
                    onChange={(e) => setUpdatedComment(e.target.value)}
                  ></textarea>
                  <button
                    className="send-button"
                    onClick={(e) => postnewComment(e, user)}
                  >
                    send📩
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
