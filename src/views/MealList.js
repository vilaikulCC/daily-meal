import ListItems from "../components/ListItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/css/main.css'
import meal from "../data/meal.json"
import FormItem from "../components/FormItems";
import Modal from "react-modal/lib/components/Modal";
import { useState } from "react";

const MealList = () => {

  const initData = meal;
  const [items, setItems] = useState([])
  const onAddNewItem = (newItem) => {
    setItems((oldItem) => {
      return [newItem,...oldItem]
    })
    console.log('from add = ', newItem)
  }

  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => {
     setIsOpen(true)
  }

  const afterOpenModal = () => {

  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <section className="section-title">
          <h2><FontAwesomeIcon icon="utensils"/> Meal Lists</h2>
          <button onClick={openModal} className="btn btn-default">
            <FontAwesomeIcon icon="plus" /> <span>Add Item</span>
          </button>
      </section>
      <Modal isOpen = {modalIsOpen} >
        <FormItem onAddItem = {onAddNewItem} onCloseModal = {closeModal} />
      </Modal>
      <ListItems items = {items} />
    </>
  );
};

export default MealList;
