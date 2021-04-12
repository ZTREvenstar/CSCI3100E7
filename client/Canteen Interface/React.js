import React from "react"
import $ from "jquery"

class Main_component extends React.Component{

    render(){
        return (
            
  <div className="container-fluid  bg-light">
  <div className="row">
    <div className="col-md-12">
      <h3 className="text-info text-center">
        Welcome
      </h3>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
         
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="navbar-toggler-icon"></span>
        </button> <a className="navbar-brand" href="#">Name</a>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav">
            <li className="nav-item active">
               <a className="nav-link" href="#">Menu <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
               <a className="nav-link" href="#">Order</a>
            </li>
          </ul>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="text" /> 
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav ml-md-auto">

            <li className="nav-item dropdown">
               <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown">Dropdown link</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                 <a className="dropdown-item" href="#">Action</a> <a className="dropdown-item" href="#">Another action</a> <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider">
                </div> <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
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
            <img className="d-block w-100" alt="Carousel Bootstrap First" src="https://www.layoutit.com/img/sports-q-c-1600-500-1.jpg" />
            <div className="carousel-caption">
              <h4>
                First Thumbnail label
              </h4>
              <p>
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
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
          <div className="carousel-item">
            <img className="d-block w-100" alt="Carousel Bootstrap Third" src="https://www.layoutit.com/img/sports-q-c-1600-500-3.jpg" />
            <div className="carousel-caption">
              <h4>
                Third Thumbnail label
              </h4>
              <p>
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
              </p>
            </div>
          </div>
        </div> <a className="carousel-control-prev" href="#carousel-733750" data-slide="prev"><span className="carousel-control-prev-icon"></span> <span className="sr-only">Previous</span></a> <a className="carousel-control-next" href="#carousel-733750" data-slide="next"><span className="carousel-control-next-icon"></span> <span className="sr-only">Next</span></a>
      </div>

      <button  className="btn btn-primary text-center">
        transform
      </button>

      <div className="media bg-warning rounded">
        <img className="mr-3 rounded-circle" alt="Bootstrap Media Preview" src="https://www.layoutit.com/img/sports-q-c-64-64-8.jpg" />
        <div className="media-body">
          <h5 className="mt-0">
            Nested media heading
          </h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
          <div className="media mt-3">
             <a className="pr-3" href="#"><img className="rounded-circle" alt="Bootstrap Media Another Preview" src="https://www.layoutit.com/img/sports-q-c-64-64-2.jpg" /></a>
            <div className="media-body">
              <h5 className="mt-0">
                Nested media heading
              </h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
            </div>
          </div>
        </div>
      </div>


      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              ID
            </th>
            <th>
              Name
            </th>
            <th>
              Status
            </th>
            <th>
              Price
            </th>
            <th>
              CanteenID
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              1
            </td>
            <td>
              TB - Monthly
            </td>
            <td>
              01/04/2012
            </td>
            <td>
              Default
            </td>
          </tr>
        </tbody>
      </table>
      <form role="form">
        <div className="form-group">
           
          <label for="exampleInputEmail1">
            Email address
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" />
        </div>
        <div className="form-group">
           
          <label for="exampleInputPassword1">
            Password
          </label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="form-group">
           
          <label for="exampleInputFile">
            File input
          </label>
          <input type="file" className="form-control-file" id="exampleInputFile" />
          <p className="help-block">
            Example block-level help text here.
          </p>
        </div>
        <div className="checkbox">
           
          <label>
            <input type="checkbox" /> Check me out
          </label>
        </div> 
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
</div>
        )
    }

}



export default class App extends React.Component{
    render(){
      return (
      <div style={{width:'100vw', height:'100vh'}}>
        <Main_component />
      </div>
    );
    }
    
  }