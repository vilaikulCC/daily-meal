import "../assets/css/form.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
// import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import th from 'date-fns/locale/th';
// registerLocale('th', th)

const FormItem = (props) => {
  const [selDate, setDate] = useState(new Date());
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [exercise, setExercise] = useState("");

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

  const saveItem = (e) => {
    e.preventDefault();
    const itemData = {
      id: 4,
      date: selDate,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      exercise: exercise,
    };
    props.onAddItem(itemData);
    console.log("Success");
    clearData();
  };

  return (
    <div className="frame-form">
      <form id="form_meal" onSubmit={saveItem}>
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