import "../assets/css/form.css";
import { useState, useEffect, useRef } from "react";
import "../assets/css/item.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { db } from "../firebase";
import { format } from "date-fns";
// import th from "date-fns/locale/th";

const FormItem = (props) => {
  const [selDate, setDate] = useState(new Date());
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [exercise, setExercise] = useState("");
  // const [formValidate, setFormValidate] = useState(false);
  // const [result, dispatch] = useReducer();
  const inpRefs = useRef({});
  let { itemId } = props;
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

  const findLastId = async (id) => {
    await db
      .collection("activity")
      .orderBy("id", "desc")
      .limit(1)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          id = doc.data().id;
        });
      });
    return id;
  };

  const getSelectedItem = async (itemId) => {
    let item = [];
    await db
      .collection("activity")
      .where("id", "==", itemId)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          item = doc.data();
          console.log(item);
        });
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
      });
    await setItem(item);
  };

  const setItem = (item) => {
    console.log(`item : ${item}`);
    inpRefs.current["date"].input.value = format(
      item.date.toDate(),
      "dd/MM/yyyy"
    );
    inpRefs.current["breakfast"].value = item.breakfast;
    inpRefs.current["lunch"].value = item.lunch;
    inpRefs.current["dinner"].value = item.dinner;
    inpRefs.current["exercise"].value = item.exercise;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemId === 0) {
      let lastId = 0;
      lastId = await findLastId(lastId);
      console.log("lastId = ", lastId);

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
          console.log("Add Document Success !!", itemData);
        })
        .catch((error) => {
          console.log(error);
        });
      // props.fetchNewData();
    } else {
      // console.log(typeof(new Date(inpRefs.current["date"].value)))
      const itemEdit = {
        id: itemId,
        date: selDate,
        breakfast: inpRefs.current["breakfast"].value,
        lunch: inpRefs.current["lunch"].value,
        dinner: inpRefs.current["dinner"].value,
        exercise: inpRefs.current["exercise"].value,
      };
      await db
        .collection("activity")
        .where("id", "==", itemId)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            doc.ref.update({ ...itemEdit });
          });
          console.log("Document successfully updated!");
          console.log("Edit Document Success !!", itemEdit);
          itemId = 0;
        })
        .catch((error) => {
          console.log(error);
        });
      // props.fetchNewData();

      clearData();
    }

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

  useEffect(() => {
    if (itemId !== 0) {
      getSelectedItem(itemId);
    }
  });

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
            ref={(el) => (inpRefs.current["date"] = el)}
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
            ref={(el) => (inpRefs.current["breakfast"] = el)}
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
            ref={(el) => (inpRefs.current["lunch"] = el)}
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
            ref={(el) => (inpRefs.current["dinner"] = el)}
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
            ref={(el) => (inpRefs.current["exercise"] = el)}
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
