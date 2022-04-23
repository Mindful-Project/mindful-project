import React, { useState, useEffect } from "react";
import { Button, Card, Spin } from "antd";
import axios from "axios";
import moment from "moment";

import "./Events.css";

const Events = () => {
  const [data, setData] = useState([]);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    (async () => {
      await axios
        .get("/mindful/events/")
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => alert(error));
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => setSpin(true), 5000);
  }, []);

  const { Meta } = Card;
  return (
    <div>
      <center>
        <div>
          <h1> All Events</h1>
        </div>
        <div className="outer">
          <div className="btn">
            <Button type="primary">POPULAR GROUPS</Button>
          </div>
          <div className="btn">
            <Button type="default">UPCOMING EVENTS</Button>
          </div>
        </div>
      </center>
      {spin === false ? (
        <center>
          <div className=" my-56">
            <Spin size="large" />
          </div>
        </center>
      ) : (
        data.map((i) => (
          <div
            style={{
              display: "inline-block",
              padding: 10,
              justifyItems: "center",
            }}
          >
            <div>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={<img alt="example" src={i.image} />}
              >
                <span style={{ fontSize: 20 }}>
                  <b>{i.eName}</b>
                </span>{" "}
                <br />
                &nbsp;&nbsp;📅 <span>
                  {moment(i.eDate).format("DD MMM")}
                </span>{" "}
                <br />
                &nbsp;&nbsp;⏲ <span>4.00 - 6.00 P.M</span> <br />
                &nbsp;&nbsp;👨‍👩‍👧‍👦 <span>{i.eSeatsNo + " Seats"}</span> <br />
                {i.ePrice === "Free" ? (
                  <span>
                    <b>{i.ePrice}</b>
                  </span>
                ) : (
                  <span>
                    <b>{"LKR " + i.ePrice}</b>
                  </span>
                )}
              </Card>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
