import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const initialText = [
  { id: 1, text: "", name: "text 1" },
  { id: 2, text: "", name: "text 2" },
  { id: 3, text: "", name: "text 3" },
  { id: 4, text: "", name: "text 4" },
];

const EditContent = () => {
  const [embed, setEmbed] = useState({ embed: "" });
  const [text, setText] = useState(() => {
    const savedText = localStorage.getItem("TEXT_DATA");
    return savedText ? JSON.parse(savedText) : initialText;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmbed((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangetext = (id, newValue) => {
    const updateText = text.map((item) =>
      item.id === id ? { ...item, text: newValue } : item
    );
    setText(updateText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("TEXT_DATA", JSON.stringify(text));
  };

  const handleSubmitembed = (e) => {
    e.preventDefault();
    localStorage.setItem("EMBED_DATA", JSON.stringify(embed));
  };

  const embedData = JSON.parse(localStorage.getItem("EMBED_DATA"));

  //console.log(window.SpeechSynthesisUtterance);

  return (
    <div>
      <h1>TITLE</h1>
      <div className="container-fluid">
        <Form
          className="rounded-5 ps-4"
          style={{ backgroundColor: "#ccc" }}
          onSubmit={handleSubmitembed}
        >
          <div className="d-flex flex-row mb-5">
            <div className="p-2 d-flex align-items-center">
              <label>Embed YouTube</label>
            </div>
            <div className="p-2 w-75">
              <input
                type="text"
                placeholder={embedData.embed}
                className="form-control"
                name="embed"
                onChange={handleChange}
              />
            </div>
            <div className="p-2">
              <Button type="submit">submit</Button>
            </div>
          </div>
        </Form>
        <Form
          className="rounded-5 ps-4 py-3"
          style={{ backgroundColor: "#ccc" }}
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column mb-5">
            <div className="p-2">
              <label>Running Text Title</label>
            </div>
            {text.map((key) => {
              return (
                <div className="d-flex flex-row" key={key.id}>
                  <div className="p-2 d-flex align-items-center">
                    <label>{key.name} :</label>
                  </div>
                  <div className="p-2" style={{ width: "75%" }}>
                    <input
                      type="text"
                      placeholder={key.text}
                      className="form-control"
                      name="text"
                      value={key.text}
                      onChange={(e) => handleChangetext(key.id, e.target.value)}
                    />
                  </div>
                </div>
              );
            })}

            <div className="p-2">
              <Button type="submit" placeholder="Submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
        <Link to="/">
          <Button className="mt-5">
            <i className="fa fa-bars"></i>
            <span className="ms-3">Back to Homepage</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditContent;
