import React from "react"
import $ from "jquery"
const URL = "http://54.227.0.209:5000"

export default class Carousel extends React.Component{

    render(){
        console.log("canteen ID is"+this.props.canteenID);
        return(
<div className="carousel slide" id="carousel-733750">
        <ol className="carousel-indicators">
          <li data-slide-to="0" data-target="#carousel-733750" className="active">
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
        </div> <a className="carousel-control-prev" href="#carousel-733750" data-slide="prev"><span className="carousel-control-prev-icon"></span> <span className="sr-only">Previous</span></a> <a className="carousel-control-next" href="#carousel-733750" data-slide="next"><span className="carousel-control-next-icon"></span> <span className="sr-only">Next</span></a>
      </div>
        )
    }
}
