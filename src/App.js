import logo from "./logo.svg";
import Layout from "./components/Layout";
import "./assets/css/main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTrashAlt,faEdit,faEye,faPlus,faUtensils, faHome } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faTrashAlt, faEdit, faEye, faPlus, faUtensils);

function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
