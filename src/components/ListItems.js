import "../assets/css/item.css";

import Item from "./Item";
const ListItems = () => {
  const data = [
    {
      id: 1,
      date: "20/12/2021",
      breakfast: "rice and fish",
      lunch: "Spagetti",
      dinner: "noodle",
      exercise: "squrt 7 mins",
      weight: "",
      waist: "",
      thigh: "",
      kcal: "",
    },
  ];

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
      <div className="item-list">
        {data.map((el) => {
          return <Item {...el} key={el.id} />;
        })}
      </div>
    </div>
  );
};

export default ListItems;
