import "../assets/css/item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Item = (props) => {
  const { id, date, breakfast, lunch, dinner, exercise } = props;

  return (
    <>
      <div>{date} </div>
      <div>{breakfast} </div>
      <div>{lunch}</div>
      <div>{dinner}</div>
      <div>{exercise}</div>
      <div>
        <button>
          <FontAwesomeIcon icon="eye" />
        </button>
        <button>
          <FontAwesomeIcon icon="edit" />
        </button>
        <button>
          <FontAwesomeIcon icon="trash-alt" />
        </button>
      </div>
    </>
  );
};
export default Item;
