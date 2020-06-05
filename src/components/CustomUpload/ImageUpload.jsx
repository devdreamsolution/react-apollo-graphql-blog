import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.jsx";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

import axios from 'axios';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: this.props.style == 'image' ? defaultImage : defaultAvatar,
      style: this.props.style
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    if (this.props.image) {
      this.setState({
        imagePreviewUrl: this.props.image
      });
    }
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      }, () => {
          this.props.getImage(reader.result);
      });
    };
    reader.readAsDataURL(file);
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.state.file);
    axios.post("http://localhost:4000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
    .then(res => { // then print response status
      if (res.statusText === "OK") {
        this.props.msgfunc("success", "We have uploaded your file successfully!");
        
      } else {
        
        this.props.msgfunc("danger", res.statusText);
      }
    })
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.style != 'image' ? defaultAvatar : defaultImage
    });
    this.refs.fileInput.value = null;
  }
  render() {
    var {
      addButtonProps,
      changeButtonProps,
      removeButtonProps
    } = this.props;
    return (
      // <div className="fileinput text-center">
      <div className="fileinput" align="center">
        <input type="file" onChange={this.handleImageChange} ref="fileInput" />
        <div className={"thumbnail" + (this.props.style == 'image' ? " " : " img-circle") } style={{heigth:200}}>
          <img src={this.state.imagePreviewUrl} alt="..." style={{width:'auto'}}/>
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {this.props.style != 'image' ? "Select Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                Change
              </Button>
              <Button {...changeButtonProps} onClick={(e) => this.handleSubmit(e)}>
                Upload
              </Button>
                {this.props.style != 'image' ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
              >
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;
