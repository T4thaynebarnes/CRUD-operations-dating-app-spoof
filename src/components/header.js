// this reason I chose to call another function in to getUsers(), I do not understand how to pass functions as props.
// objective to getuser() grabs data from api then i placed a function postNewUser() it handles the PUT request to add a new user
// interesting but needs a remedy

// OBJECTIVE: renders the top of the page including the sign up form to add a new user. places put request to add new user in api.

import { useEffect, useState } from "react";

function Header() {
  const URL_ENDPOINT = "http://localhost:3000/sims";
  const [users, setUser] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newComment, setNewComment] = useState("");
  // const [newAvatar, setNewAvatar] = useState("");
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

  // *************
  const postComment = async (avatarData) => {
    console.log("value of avatar pic being uploaded", avatarData);

    try {
      const response = await fetch(URL_ENDPOINT, {
        // url you want to post to
        method: "POST", // type of request
        headers: {
          "Content-Type": "application/json", // type of data sent to the server
        },
        body: JSON.stringify({
          avatars: avatarData,
          name: newUserName,
          interests: newInterest,
          comments: newComment,
        }), // data you want to update
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resp = await response.json(); // parsing the response as JSON
      return resp;
    } catch (error) {
      console.log(
        "Oh no! There was an error with posting your comment.",
        error
      );
    }
    console.log("Posting to API...");

    // Get the first file selected in the input element with id 'image-input'
    const inputFile = document.getElementById("image-input").files[0];
    // Select the element where the base64 code will be displayed
    const base64Code = document.querySelector("#base64Code");

    // Create a FileReader object to read the inputFile
    const reader = new FileReader();

    // Define what happens when the file has been successfully read
    reader.onload = (e) => {
      // Create a new Image object
      const img = new Image();

      // Define what happens once the image is loaded
      img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement("canvas");
        // Get the 2D drawing context for the canvas
        const ctx = canvas.getContext("2d");

        // Set the maximum dimensions for the compressed image
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;

        // Calculate the new dimensions to maintain aspect ratio
        let width = img.width;
        let height = img.height;

        // Adjust width and height to fit within the MAX_WIDTH and MAX_HEIGHT while keeping aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        // Resize the canvas to the new dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw the image to the canvas, effectively compressing it
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas to a base64 string. This string represents the image data in a text form,
        // which can be easily transmitted or stored. The "image/jpeg" argument specifies the image format.
        // The second argument (0.7 here) specifies the quality of the output image on a scale from 0 to 1.
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        // Use the compressed base64 string for further actions, e.g., displaying it or sending it to an API
        base64Code.value = compressedBase64;
        console.log("Compressed Base64 Code:\n", base64Code.value);

        // Function call (not shown in this snippet) to post the base64 string to an API or another destination
        postComment(base64Code.value);
      };

      // Set the source of the image to the result from the FileReader.
      // This triggers the img.onload event once the image is loaded into memory.
      img.src = e.target.result;
    };

    // Read the input file as a data URL. A data URL contains a base64-encoded string
    // that represents the file's data. This is useful for directly embedding images in web pages or CSS,
    // without needing to upload the image to a server.
    reader.readAsDataURL(inputFile);
  };

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
                  <label>Tell us about you!</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <br></br>
                  <label>Don't forget to upload an avatar pic!</label>
                  <input type="file" id="image-input"></input>
                  <canvas id="image-canvas"></canvas>
                  <textarea id="base64Code"></textarea>

                  <br></br>
                  <button
                    className="submit-button"
                    onClick={(e) => postComment(e)}
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
