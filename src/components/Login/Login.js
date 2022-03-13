import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

function App() {
  const consumir_login = () => {
    var postData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    axios
      .post("http://localhost:8000/api/v1/Login", postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id_user", response.data.id_user);
        window.location = "/profile";
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className="form-div">
      <div className="div-login">
        Inicia sesion
        </div>
      <form>       
          <label for="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <br />
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
      </form>
      <div className="button-login">
        <button onClick={consumir_login}>Iniciar sesion</button>    
      </div>
      <div className="link">
        No tienes cuenta? <Link to="/register">Registrate</Link>
      </div>
      
    </div>
  );
}
export default App;
