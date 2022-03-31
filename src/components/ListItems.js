import { useState, useEffect } from "react";
import "../assets/css/item.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";

const ListItems = (props) => {
  const [activity, setActivity] = useState([]);
  const fetchActivity = async () => {
    let temp = [];
    await db
      .collection("activity")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          temp.push(doc.data());
        });
      });

    setActivity(temp);
  };

  useEffect(() => {
    fetchActivity();
  }, []);

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
      {activity.map((el) => {
        return (
          <div className="item-list" key={el.id} data-id={el.id}>
            <div>{format(el.date.toDate(), "dd-MMM-yyyy")}</div>
            <div>{el.breakfast} </div>
            <div>{el.lunch}</div>
            <div>{el.dinner}</div>
            <div>{el.exercise}</div>
            <div className="col-action">
              {/* <button
                onClick={() => {
                  props.onSelectedItem(el.id,"1");
                }}
              >
                <FontAwesomeIcon icon="eye" />
              </button> */}
              <button
                onClick={() => {
                  props.onSelectedItem(el.id,"1");
                }}
              >
                <FontAwesomeIcon icon="edit" />
              </button>
              <button
                onClick={() => {
                  props.onSelectedItem(el.id,"2");
                }}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListItems;
