import ReactDOM from "react-dom";
import React from "react";
import Fotos from "./Fotos";
import "./app.scss";


class App extends React.Component {
  constructor(props) {
    super(props);    
  }

  render(){
    return (
      <div className = "activeInactive">
        <h5>Active Fotos</h5>
        <table>
          <thead>
          <tr>
          <th scope = "col">
            Name
          </th>
          <th scope = "col">
            Start
          </th>
          <th scope = "col">
            End
          </th>
          <th scope = "col">
            Duration
          </th>
          <th scope = "col" colSpan = "2"></th>
          </tr>
        </thead>
        <tbody>
          <Fotos />
        </tbody>
      </table>

      <h5>Inactive Fotos</h5>
      <table>
        <thead>
          <tr>
          <th scope = "col">
            Name
          </th>
          <th scope = "col">
            Start
          </th>
          <th scope = "col">
            End
          </th>
          <th scope = "col">
            Duration
          </th>
          <th scope = "col" colSpan = "2"></th>
          </tr>
        </thead>
        <tbody>
          <Fotos />
        </tbody>
      </table>      
      </div>
    );
  }
}

let section = document.querySelector("section");
ReactDOM.render(<App />, section);



if (module.hot) {
  module.hot.accept();
}

