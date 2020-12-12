import React, { Component } from "react";
import withCartContext from "../context/withCartContext";
import { withAuth } from "./../context/auth-context";
import apiService from "../lib/api-service";

const initState = {
  image: "",
  name: "",
  description: "",
  dimension: "",
  category: "",
  technic: "",
  material: "",
  price: "",
  stock: "",
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const {
      image,
      name,
      description,
      dimension,
      category,
      technic,
      material,
      price,
      stock,
    } = this.state;

    if (name && price) {
      const id =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      apiService.createOne(
        id,
        image,
        name,
        description,
        dimension,
        category,
        technic,
        material,
        price,
        stock
      );

      this.props.context.addProduct(
        {
          image,
          name,
          description,
          dimension,
          category,
          technic,
          material,
          price,
          stock: stock || 0,
        },
        () => this.setState(initState)
      );
      this.setState({
        flash: { status: "is-success", msg: "Product created successfully" },
      });
    } else {
      this.setState({
        flash: { status: "is-danger", msg: "Please enter name and price" },
      });
    }
  };

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const {
      image,
      name,
      description,
      dimension,
      category,
      technic,
      material,
      price,
      stock,
    } = this.state;
    const user = this.props.user;
    return !user && user.role !== "admin" ? (
      //   <Redirect to="/" />
      <div>Here</div>
    ) : (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Image: </label>
                <input
                  className="input"
                  type="text"
                  name="image"
                  value={image}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Description: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Dimension: </label>
                <textarea
                  className="input"
                  type="text"
                  name="dimension"
                  value={dimension}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Category: </label>
                <textarea
                  className="input"
                  type="text"
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Technic: </label>
                <textarea
                  className="input"
                  type="text"
                  name="technic"
                  value={technic}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Material: </label>
                <textarea
                  className="input"
                  type="text"
                  name="material"
                  value={material}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Price: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Available in Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>

              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withCartContext(withAuth(AddProduct));
