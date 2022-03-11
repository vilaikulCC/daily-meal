import ListItems from "../components/ListItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/main.css";
import { useState } from "react";
import FormItem from "../components/FormItems";
import Modal from "react-modal/lib/components/Modal";
import { db } from "../firebase";

const MealList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (id) => {
    setIsOpen(true);
    if (id !== null) {
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

  const [selectedItem, setSelectedItem] = useState(0);
  const handleSelectedItem = (value, action) => {
    if (action == 1) {
      setSelectedItem(value);
      setIsOpen(true);
    } else if (action == 2) {
      deleteItem(value);
    }
  };

  const deleteItem = async (id) => {
    await db
      .collection("activity")
      .where("id", "==", id)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          doc.ref.delete();
        })
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <>
      <section className="section-title">
        <h2>
          <FontAwesomeIcon icon="utensils" /> Meal Lists
        </h2>
        <button
          onClick={() => {
            setSelectedItem(0);
            openModal(0);
          }}
          className="btn btn-default"
        >
          <FontAwesomeIcon icon="plus" /> <span>Add Item</span>
        </button>
      </section>{" "}
      <ListItems onSelectedItem={handleSelectedItem} />
      <Modal isOpen={modalIsOpen} ariaHideApp={false}>
        <FormItem onCloseModal={closeModal} itemId={selectedItem} />
      </Modal>
    </>
  );
};

export default MealList;
