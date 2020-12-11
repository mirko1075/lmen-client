import React, { Component } from "react";
import ReviewCard from "../components/ReviewCard";
export default class DetailCard extends Component {
  state = {
    product: {},
    review: [],
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  };
  componentDidUpdate(prevProps) {
    const product = this.props.product;
    const review = this.props.review;
    if (this.props.product !== prevProps.product) {
      for (let i = 1; i <= 5; i++) {
        const imgName = "img" + i;
        this.setState({ [imgName]: this.props.product.image + "_" + i });
      }
      this.setState({ product, review });
    }
  }

  render() {
    const { product, review } = this.state;
    const imgWidth = "150";
    const imgHeight = "150";

    return (
      <div className="detailCard">
        <div>
          <div className="detailData">
            <p>{product && product.name}</p>
            <br />
            <p>{product && product.description}</p>
          </div>

          <div className="detailMainImg">
            <img
              src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/${product.image}_1.jpg`}
              alt=""
              className="detailImage"
            />
          </div>
          <div className="detailImgBox">
            <div>
              <img
                src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/${this.state.img2}.jpg`}
                alt=""
                className="detailImage"
              />
            </div>
            <div>
              <img
                src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/${this.state.img3}.jpg`}
                alt=""
                className="detailImage"
              />
            </div>
            <div>
              <img
                src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/${this.state.img4}.jpg`}
                alt=""
                className="detailImage"
              />
            </div>
            <div>
              <img
                src={`https://res.cloudinary.com/dps0lnavi/image/upload/w_${imgWidth},h_${imgHeight},c_scale/${this.state.img5}.jpg`}
                alt=""
                className="detailImage"
              />
            </div>
          </div>
          <div>
            <ReviewCard review={review} />
          </div>
        </div>

        <div>
          <p>Price {product && product.price} €</p>
        </div>
      </div>
    );
  }
}
