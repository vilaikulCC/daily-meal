import "../assets/css/form.css";
import { useState, useEffect, useContext, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { registerLocale } from  "react-datepicker";
// import th from 'date-fns/locale/th';
// registerLocale('th', th)
import { DataContext } from "../data/DataContext";
import { db } from "../firebase";

const FormItem = (props) => {
  const [selDate, setDate] = useState(new Date());
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [exercise, setExercise] = useState("");
  const [formValidate, setFormValidate] = useState(false);
  // const meal = useContext(DataContext);

  const handleInput = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      // case 'm-date' :
      //     return setDate(value)
      case "m-breakfast":
        return setBreakfast(value);
      case "m-lunch":
        return setLunch(value);
      case "m-dinner":
        return setDinner(value);
      case "m-exercise":
        return setExercise(value);
      default:
        return "";
    }
  };

  const clearData = () => {
    setDate(new Date());
    setBreakfast("");
    setLunch("");
    setDinner("");
    setExercise("");
  };

  const [result, dispatch] = useReducer();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let lastId = 0;
    await db
      .collection("activity")
      .orderBy("id", "desc")
      .limit(1)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          lastId = doc.data().id;
          console.log(doc.data().id);
        });
      });
    console.log("lastId = ", lastId);
    // let lastId = meal.item.length > 0 ? meal.item[meal.item.length - 1].id : 0;
    // console.log( "lastId = ",lastId)

    // if (!formValidate) {
      const itemData = {
        id: lastId + 1,
        date: selDate,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        exercise: exercise,
      };
      await db
        .collection("activity")
        .add({
          ...itemData,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.log(error);
        });
      // props.fetchNewData();

      console.log("Success", itemData);
      clearData();
      alert("Successfully !!");
      props.onCloseModal();
    // } else {
    //   alert("Please enter data !!");
    // }
  };

  // useEffect(() => {
  //   const checkData =
  //     breakfast.trim().length > 0 &&
  //     lunch.trim().length > 0 &&
  //     dinner.trim().length > 0 &&
  //     exercise.trim().length > 0;
  //   setFormValidate(checkData);
  // }, [breakfast, lunch, dinner, exercise]);

  return (
    <div className="frame-form">
      <form id="form_meal" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            id="m-date"
            name="m-date"
            selected={selDate}
            onChange={(date) => setDate(date)}
          />
        </div>

        <div className="form-control">
          <label>Breakfast</label>
          <input
            type="text"
            id="m-breakfast"
            name="m-breakfast"
            maxLength="100"
            onChange={handleInput}
            value={breakfast}
            required
          ></input>
        </div>

        <div className="form-control">
          <label>Lunch</label>
          <input
            type="text"
            id="m-lunch"
            name="m-lunch"
            maxLength="100"
            onChange={handleInput}
            value={lunch}
            required
          ></input>
        </div>

        <div className="form-control">
          <label>Dinner</label>
          <input
            type="text"
            id="m-dinner"
            name="m-dinner"
            maxLength="100"
            onChange={handleInput}
            value={dinner}
            required
          ></input>
        </div>

        <div className="form-control">
          <label>Exercise</label>
          <input
            type="text"
            id="m-exercise"
            name="m-exercise"
            maxLength="100"
            onChange={handleInput}
            value={exercise}
            required
          ></input>
        </div>

        <div className="form-control form-action-control">
          <button onClick={props.onCloseModal} className="btn btn-default">
            Close
          </button>
          <input
            type="submit"
            value="Submit"
            className="btn btn-submit"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default FormItem;
