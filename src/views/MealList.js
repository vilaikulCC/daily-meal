import ListItems from "../components/ListItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/main.css";
import { useState } from "react";
import FormItem from "../components/FormItems";
import Modal from "react-modal/lib/components/Modal";

const MealList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (id) => {
    setIsOpen(true);
    if (id !== null) {
      console.log("type ", typeof id);
      console.log("Not Null, id = ", id);
    } else {
      console.log("Null, id =", id);
    }
  };

  // const afterOpenModal = () => {
  //   console.log("Opened Modal");
  // };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onAddNewItem = () => {};

  const [selectedItems, setSelectedItem] = useState(0);
  const handleSelectedItem = (value) => {
    setSelectedItem(value);
    console.log(`id dd ${selectedItems}`)
    setIsOpen(true)
  };
  return (
    <>
      <section className="section-title">
        <h2>
          <FontAwesomeIcon icon="utensils" /> Meal Lists
        </h2>
        <button onClick={openModal} className="btn btn-default">
          <FontAwesomeIcon icon="plus" /> <span>Add Item</span>
        </button>
      </section>{" "}
      <ListItems onSelectedItem={handleSelectedItem}/>
      <Modal isOpen={modalIsOpen}>
        <FormItem onAddItem={onAddNewItem} onCloseModal={closeModal} />
      </Modal>
    </>
  );
};

export default MealList;
