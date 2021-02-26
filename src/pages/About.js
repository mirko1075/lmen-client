import React from "react";
import image from "../images/Carousel/img2.jpg";
export default function About() {
  return (
    <div className="about">
      <div>
        <img src={image} alt="" className="contactImg" />
      </div>
      <div className="aboutInfo">
        <div className="aboutInfoL">
          <div>
            <h4>LM&N Confección from Brazil to the world.</h4>
            <br />
            <br />
            <br />
            <p>
              We are a family business that was created in april 2019. Initially
              we started with the idea of making bags fleeing a bit from the
              traditional creating exclusive pieces of art by handmade using
              mixes of textures and materials such as leather, thread, fabric
              and beads.
            </p>
            <br />
            <p>
              Everything is done with the techniques of sewing, embroidery and
              crochet. Our goal is to bring joy and positivity through each
              piece because we put a lot of passion in what we do.
            </p>
            <br />
            <div>
              <b>Address:</b> Rua 15 de Novembro, 862 centro Bonito MS Brasil -
              cep:79290-000
            </div>
          </div>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.584576147727!2d-56.486805884577095!3d-21.129122085944083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x947c5f25355f3dcd%3A0x53790ff9682adec9!2sR.%20Quinze%20de%20Novembro%2C%20862%20-%20Alvorada%2C%20Bonito%20-%20MS%2C%2079290-000%2C%20Brasil!5e0!3m2!1ses!2ses!4v1608104516493!5m2!1ses!2ses"
            width="400"
            height="400"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="map"
          />
        </div>
      </div>
    </div>
  );
}
