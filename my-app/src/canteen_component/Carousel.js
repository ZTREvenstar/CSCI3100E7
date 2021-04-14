import React from "react"
import $ from "jquery"
const URL = "http://localhost:5000"

export default class Carousel extends React.Component{

    render(){
        console.log("canteen ID is"+this.props.canteenID);
        return(
<div className="carousel slide" id="carousel-733750">
        <ol className="carousel-indicators">
          <li data-slide-to="0" data-target="#carousel-733750" className="active">
          </li>
          <li data-slide-to="1" data-target="#carousel-733750">
          </li>
          <li data-slide-to="2" data-target="#carousel-733750">
          </li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" alt="Carousel Bootstrap First" src={URL + "/public/canteen/" + this.props.canteenID + ".png?" + Math.random()+this.props.Random}/>
            <div className="carousel-caption">
              <h4>
                Canteen Photo
              </h4>
              <p>
                upload your photo to show to the visitor!
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" alt="Carousel Bootstrap Second" src="https://www.layoutit.com/img/sports-q-c-1600-500-2.jpg" />
            <div className="carousel-caption">
              <h4>
                Second Thumbnail label
              </h4>
              <p>
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
              </p>
            </div>
          </div>
        </div> <a className="carousel-control-prev" href="#carousel-733750" data-slide="prev"><span className="carousel-control-prev-icon"></span> <span className="sr-only">Previous</span></a> <a className="carousel-control-next" href="#carousel-733750" data-slide="next"><span className="carousel-control-next-icon"></span> <span className="sr-only">Next</span></a>
      </div>
        )
    }
}
