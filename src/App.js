import logo from "./logo.svg";
import MealList from "./views/MealList";
import Header from "./views/Header";
import './assets/css/main.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTrashAlt, faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faTrashAlt, faEdit, faEye, faPlus)

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <MealList />
      </main>
    </div>
  );
}

export default App;
