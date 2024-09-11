import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { useHotkeys } from "react-hotkeys-hook";
import { Link } from "react-router-dom";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [counterA, setCounterA] = useState(0);

  const speakResult = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      const voice = window.speechSynthesis.getVoices();
      const indonesianVoice = voice.find((voice) => voice.lang === "id-ID");
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry");
    }
  };

  const embedData = JSON.parse(localStorage.getItem("EMBED_DATA"));
  const textData = JSON.parse(localStorage.getItem("TEXT_DATA"));

  useHotkeys("q", () => {
    setCounter(counter + 1);
    speakResult("Number A : " + (counter + 1));
  });
  useHotkeys("w", () => {
    setCounter(counter - 1);
    speakResult("Number A : " + (counter - 1));
  });
  useHotkeys("e", () => {
    setCounter(0);
    speakResult("Number A : 0");
  });
  useHotkeys("a", () => {
    setCounterA((counterA) => counterA + 1);
    speakResult("Number B : " + (counterA + 1));
  });
  useHotkeys("s", () => {
    setCounterA(counterA - 1);
    speakResult("Number B : " + (counterA - 1));
  });
  useHotkeys("d", () => {
    setCounterA(0);
    speakResult("Number B : 0");
  });

  return (
    <div>
      <h1>Title</h1>
      <Container fluid>
        <div>
          <Row className="py-3">
            <Col className="rounded-4" style={{ backgroundColor: "#ccc" }}>
              <Marquee>
                <div className="d-flex flex-row gap-5 py-3">
                  {textData.map((item) => (
                    <div className="px-5" key={item.id}>
                      {item.text}
                    </div>
                  ))}
                </div>
              </Marquee>
            </Col>
          </Row>
        </div>
        <Row>
          <Col className="rounded-3" style={{ backgroundColor: "#ccc" }}>
            <div className="py-3 mt-3">
              <iframe
                width="853"
                height="390"
                src={embedData.embed}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                style={{ borderRadius: "1.5rem" }}
              ></iframe>
            </div>
          </Col>
          <Col>
            <div
              className="d-flex flex-row rounded-3 mb-2 justify-content-between"
              style={{ backgroundColor: "#ccc" }}
            >
              <div>
                <h1>3 of 1</h1>
              </div>
              <div>
                <Link to="/editContent">
                  <i
                    className="fa fa-bars my-4 me-3"
                    style={{ color: "#000" }}
                  ></i>
                </Link>
              </div>
            </div>
            <div className="d-flex flex-row gap-2">
              <div
                className="d-flex flex-column gap-3 rounded-3 px-5"
                style={{ backgroundColor: "#ccc" }}
              >
                <div
                  className="flex-fill rounded-3"
                  style={{ backgroundColor: "#ccc", margin: "5px" }}
                >
                  <h1 style={{ fontWeight: "600" }}>
                    Nomor Antrian : <br />
                  </h1>
                  <p
                    className="text-center"
                    style={{ fontSize: "70px", fontWeight: "bold" }}
                  >
                    A-
                    <span>{counter}</span>
                  </p>
                </div>

                <div
                  className="flex-fill rounded-3"
                  style={{ backgroundColor: "#ccc", margin: "5px" }}
                >
                  <h1 style={{ fontWeight: "600" }}>
                    Nomor Antrian : <br />
                  </h1>
                  <p
                    className="text-center"
                    style={{ fontSize: "70px", fontWeight: "bold" }}
                  >
                    B-<span>{counterA}</span>
                  </p>
                </div>
              </div>
              <div
                className="flex-fill rounded-3"
                style={{ backgroundColor: "#ccc", padding: "10px" }}
              >
                <h1>5 of 1</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
