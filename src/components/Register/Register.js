import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";
function App() {
  

  const consumir_register = () => {
    var postData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      password2: document.getElementById("password2").value,
      email: document.getElementById("email").value,
    };
    axios
      .post("http://localhost:8000/api/v1/create_user", postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        window.location = '/';
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <div className="regresar">
      <Link to="/">Regresar</Link>
      </div>
      <div className="container">
        <form>
          <label>First Name:</label>
          <br />
          <input
            className="input is-info"
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            required
          />
          <br />

          <label>Last Name:</label>
          <br />
          <input
            className="input is-info"
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            required
          />
          <br />
          <label>Ingrese su usuario:</label>
          <br />
          <input
            className="input is-info"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <br />

          <label>Ingrese su contraseña:</label>
          <br />
          <input
            className="input is-info"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <br />

          <label>Ingrese su contraseña nuevamente:</label>
          <br />
          <input
            className="input is-info"
            type="password"
            id="password2"
            name="password2"
            placeholder="Password"
            required
          />
          <br />

          <label>Ingrese su email:</label>
          <br />
          <input
            className="input is-info"
            type="text"
            id="email"
            name="email"
            placeholder="email"
            required
          />
        </form>
      </div>

      <div className="button-register">
          <button onClick={consumir_register}> REGISTER</button>   
      </div>
      
    </div>
  );
}
export default App;
