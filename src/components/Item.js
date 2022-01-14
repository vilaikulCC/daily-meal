import "../assets/css/item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'moment';

const Item = (props) => {
  const { id, date, breakfast, lunch, dinner, exercise } = props;

  return (
    <>
      <div>{Moment(date).format('DD/MM/yyyy')} </div>
      <div>{breakfast} </div>
      <div>{lunch}</div>
      <div>{dinner}</div>
      <div>{exercise}</div>
      <div className="col-action">
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
