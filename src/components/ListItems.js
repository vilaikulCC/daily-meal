import "../assets/css/item.css";
import Item from "./Item";

const ListItems = (props) => {
  const {items} = props
  return (
    <div className="grid-list">
      <div className="item-header">
        <div>
          <h5>Date</h5>
        </div>
        <div>
          <h5>Breakfast</h5>
        </div>
        <div>
          <h5>Lunch</h5>
        </div>
        <div>
          <h5>Dinner</h5>
        </div>
        <div>
          <h5>Exercise</h5>
        </div>
        <div>
          <h5>Action</h5>
        </div>
      </div>
        {items.map((el) => {
          return <div className="item-list" key = {el.id} data-id={el.id}><Item {...el} key = {el.id} /></div>;
        })}
    </div>
  );
};

export default ListItems;
