import axios from "axios";
import { Link } from "react-router-dom";
import "./Profile.css";

function App() {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("id_user");
  let image_profile = "";
  var Username, firstname, lastname, Email;

  window.onload = function() {
    axios
      .get("http://localhost:8000/api/v1/user/perfil/" + user + '/', {
        headers: {
          'Authorization': "Token " + token,
        },
      })
      .then((response) => {
        console.log(response.data.url_img);
        if (response.data.url_img != null) {
          image_profile = "http://localhost:8000" + response.data.url_img;
          document.getElementById("imagen").src = image_profile;
        } else {
          document.getElementById("imagen").src =
            "https://marlaw.se/wp-content/uploads/2016/03/profile-img.jpg";
        }
      })
      .catch((error) => {
        document.getElementById("imagen").src =
          "https://marlaw.se/wp-content/uploads/2016/03/profile-img.jpg";
      });

    axios
      .get("http://localhost:8000/api/v1/user/data/" + user + "/", {
        headers: {
          'Authorization': "Token " + token,
        },
      })
      .then((response) => {
        Username = response.data.username;
        firstname = response.data.first_name;
        lastname = response.data.last_name;
        Email = response.data.email;
        document.getElementById("username").value = Username;
        document.getElementById("first_name").value = firstname;
        document.getElementById("last_name").value = lastname;
        document.getElementById("email").value = Email;
        console.log('get');
        console.log(response.data);
        
      })
      .catch((error) => {
        document.getElementById("imagen").src =
          "https://marlaw.se/wp-content/uploads/2016/03/profile-img.jpg";
      });
    };


  const change_image = () => {
    let postData = new FormData();
    postData.append("id_user", user);
    postData.append("url_img", document.getElementById("img").files[0]);

    axios
      .post("http://localhost:8000/api/v1/user/profile", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': "Token " + token,
        },
      })
      .then((response) => {
        console.log('post');
        image_profile = "http://localhost:8000" + response.data.url_img;
        document.getElementById("imagen").src = image_profile;
        window.location.reload();
      })
      .catch((error) => {
        console.log('error post');
        console.log(error.response);
        if (error.response.data === "Este usuario tiene un perfil existente") {
          console.log("ejecutar put");
          let putData = new FormData();
          putData.append("url_img", document.getElementById("img").files[0]);
          putData.append("id_user", user);
          axios
            .put(
              "http://localhost:8000/api/v1/user/perfil/" + user + "/",
              putData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  'Authorization': "Token " + token,
                },
              }
            )
            .then((response) => {
              image_profile = "http://localhost:8000" + response.data.url_img;
              console.log(response.data);
              document.getElementById("imagen").src = image_profile;
              
            })
            .catch((error) => {
              alert("No se pudo actualizar la imagen");
            });
        }
      });
  };



  let change_profile = () => {
    let putData = new FormData();
    let UserNamePut = document.getElementById("username").value;
    let LastNamePut = document.getElementById("last_name").value;
    let FirstNamePut = document.getElementById("first_name").value;
    let EmailPut = document.getElementById("email").value;
    if (UserNamePut === "") {
      UserNamePut = Username;
    }
    if (LastNamePut === "") {
      LastNamePut = lastname;
    }
    if (FirstNamePut === "") {
      FirstNamePut = firstname;
    }
    if (EmailPut === "") {
      EmailPut = Email;
    }
    putData.append("first_name", FirstNamePut);
    putData.append("last_name", LastNamePut);
    putData.append("username", UserNamePut);
    putData.append("email", EmailPut);

    axios
      .put("http://localhost:8000/api/v1/user/data/" + user + "/", putData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': "Token " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        alert("No se pudieron actualizar los datos");
        console.log(error.response.data);
      });
  };

 
  return (
    <div className="div-main">
      <div className="title-profile">
        <h1>Mi perfil</h1>
      </div>
      <h2>Foto de perfil:</h2>
      <div className="profile-img">
        <img id="imagen" src="" alt="default" className="profile-picture" />
      </div>
      <input accept="image/*" type="file" id="img"></input>
      <div className="button-upload-img">
        <button onClick={change_image}>Subir imagen</button>
      </div>
      <div className="button-change">
        <button onClick={change_profile}>Actualizar datos</button>
      </div>

      <div>
        <div>
          <p>
            <b>First name: </b>
          </p>
          <input id="first_name"></input>
        </div>
        <div>
          <p>
            <b>Last name: </b>
          </p>
          <input id="last_name"></input>
        </div>
        <div>
          <p>
            <b>Username: </b>
          </p>
          <input id="username"></input>
        </div>
        <div>
          <p>
            <b>E-mail: </b>
          </p>
          <input id="email"></input>
        </div>
      </div>

      <Link to="/">cerrar sesion</Link>
    </div>
  );
}
export default App;
