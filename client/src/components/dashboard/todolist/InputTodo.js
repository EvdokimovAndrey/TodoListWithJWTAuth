import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const InputTodo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_of_end: "",
    date_of_creation: "",
    date_of_update: "",
    _priority_: "",
    _status_: "",
    creater: "",
    responsible: "",
  });

  const {
    title,
    description,
    date_of_end,
    date_of_creation,
    date_of_update,
    _priority_,
    _status_,
    creater,
    responsible,
  } = formData;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title,
        description,
        date_of_end,
        date_of_creation,
        date_of_update,
        _priority_,
        _status_,
        creater,
        responsible,
      };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <h1 className="text-center mb-5">Todo List</h1>
      <Button color="success" onClick={toggle}>
        Add Todo
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a Todo</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              className="form-control mb-3"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Title"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="date_of_end"
              value={date_of_end}
              onChange={onChange}
              placeholder="Date of end"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="date_of_creation"
              value={date_of_creation}
              onChange={onChange}
              placeholder="Date of creation"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="date_of_update"
              value={date_of_update}
              onChange={onChange}
              placeholder="Date of update"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="_priority_"
              value={_priority_}
              onChange={onChange}
              placeholder="Priority"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="_status_"
              value={_status_}
              onChange={onChange}
              placeholder="Status"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="creater"
              value={creater}
              onChange={onChange}
              placeholder="Creater"
            />
            <input
              type="text"
              className="form-control mb-3"
              name="responsible"
              value={responsible}
              onChange={onChange}
              placeholder="Responsible"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={onSubmitForm}>
            Add Todo
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default InputTodo;