import React from "react";
import { withRouter } from "react-router-dom";
import * as routes from "../constants";

import { makeAspectCrop } from "react-image-crop";

import { API } from "../Tools";
import Form from "../components/AddTask";
import { List } from "../components/TaskList";
import Preview from "../components/AddTask/Preview";
import * as EmailValidator from "email-validator";
/**
 * This file contains all the logic for adding a task
 * @param  { AddTask } This form upload task
 *	@var { name, email , text ,image } input state value
 *	@var { imagePreviewUrl } this state save of image path
 *	@var { error } state of error
 */

class AddTask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      text: "",
      image: undefined,
      imagePreviewUrl: "",
      error: null,
      crop: null
    };
  }

  /** listener all input value except image*/
  onChangeData = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    });
  };

  /** listener input  image and creates
   *  a variable that calculates payload image  */

  onImageChange = e => {
    this.setState({ image: e.target.files[0] });

    const file = e.target.files[0];
    const MyImage = () => <img alt="" />;
    MyImage.file = file;

    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        crop: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  /** this method upload all data on server
   *  create config from upload data  and send
   */

  handleSubmit = e => {
    e.preventDefault();

    if (!EmailValidator.validate(this.state.email)) {
      return this.setState({ error: "Enter the correct email" });
    }
    this.fileUpload();
  };

  fileUpload = () => {
    const { history } = this.props;
    const { image } = this.state;
    this.setState({
      crop: makeAspectCrop(
        {
          x: 0,
          y: 0,
          aspect: 10 / 4,
          width: 340
        },
        image.width / image.height
      ),
      image
    });

    const form = new FormData();
    form.append("username", this.state.name);
    form.append("email", this.state.email);
    form.append("text", this.state.text);
    form.append("image", image);

    API({
      url: "/create/?developer=Maksimtest",
      crossDomain: true,
      method: "POST",
      accept: "image/jpeg, image/gif, image/png",
      mimeType: "multipart/form-data",
      contentType: false,
      processData: false,
      data: form,
      dataType: "json"
    }).then(res => console.log(res));

    history.push(routes.HOME);
  };

  render() {
    const {
      name,
      email,
      text,
      imagePreviewUrl,
      image = undefined
    } = this.state;

    return (
      <div style={{ display: "flex", width: "99vw", height: "99vh" }}>
        {/** sets the parameters and forms of variables that we previously passed through the details */}

        <Form
          children={
            this.state.error ? (
              <h1 style={{ textAlign: "center", color: "red" }}>
                {this.state.error}
              </h1>
            ) : null
          }
          imageValue={image}
          onSubmit={this.handleSubmit}
          onChange={this.onChangeData}
          emailValue={email}
          nameValue={name}
          textValue={text}
          onImageChange={this.onImageChange}
          /** render child node of preview */

          previewRender={
            <Preview>
              <List
                titleUserName={name}
                titleUserEmail={email}
                children={
                  <img
                    src={imagePreviewUrl}
                    alt=""
                    style={{
                      maxWidth: 320,
                      maxHeight: 240,
                      minHeight: "100%",
                      minWeight: "100%"
                    }}
                  />
                }
                userText={text}
              />
            </Preview>
          }
        />
      </div>
    );
  }
}

export default withRouter(AddTask);
