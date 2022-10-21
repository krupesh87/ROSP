import React, { useState } from "react";

import { contactemail } from "../../Services/api";

export default function Contact() {
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    Message: "",
  });
  const handleChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("credential",credential)
    let data = await contactemail(credential);
    console.log("data",data)
    alert("Query has been mail to customer care Department");
    setcredential({
      name: "",
      email: "",
      Message: "",
    });
  };
  return (
    <>
      {" "}
      
      <div>
        <div className="d-flex mt-5 justify-content-center">
          <h1 className="h1a mt-5 mx-1"> CONTACT </h1> <br />
          <br />
          <br />
        </div>{" "}
        <div class="container mt-5 overflow-hidden">
          
          <div className="row gx-5 mx-3">
            <div className="col  mx-0">
              <div
                class="card"
                style={{ width: "94%" }}
              >
                <div class="card-body">
                  <h1
                    style={{ fontSize: "25px" }}
                    class="card-title d-flex justify-content-center text-white"
                  >
                    {" "}
                    <strong> Get In Touch </strong>{" "}
                  </h1>{" "}
                  <br />
                  <div class="user-box">
                  <label> Full Name </label>{" "}
                    <input
                    className="form-control"
                      type="text"
                      name="name"
                      value={credential.name}
                      onChange={handleChange}
                      required
                    />
                    
                  </div>{" "}
                  <br/>
                  <div class="user-box">
                  <label> Email </label>{" "}
                    <input
                      class='form-control'
                      type="email"
                      name="email"
                      value={credential.email}
                      onChange={handleChange}
                      required
                    />
                    
                  </div>{" "}
                  <br/>
                  <div class="user-box">
                  <label> Message </label>{" "}
                    <input
                    type="textarea"
                    className="form-control"
                      name="Message"
                      value={credential.Message}
                      onChange={handleChange}
                      required
                    />
                    <br/>
                  </div>{" "}
                  <div className="d-flex justify-content-start align-items-center">
                    <button onClick={handleSubmit} className="btn btn-dark ">
                      <span> </span> <span> </span> <span> </span>{" "}
                      <span> </span>
                      submit{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <br />
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}