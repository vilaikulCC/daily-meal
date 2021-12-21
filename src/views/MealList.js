import ListItems from "../components/ListItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/css/main.css'

const MealList = () => {
  return (
    <>
      <section className="section-title">
          <h2>Meal Lists</h2>
          <button>
            <FontAwesomeIcon icon="plus" /> Add Item
          </button>
      </section>
      <ListItems />
    </>
  );
};

export default MealList;
