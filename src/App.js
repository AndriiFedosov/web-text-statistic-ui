import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UploadTextComponent from "./components/entity/text/UploadTextComponent";
import TextStatisticListComponent from "./components/entity/text/TextStatisticListComponent";
import TextStatisticComponent from "./components/entity/text/TextStatisticComponent";
import EmptyPage from "./components/errors/EmptyPage";

class App extends Component {

  render() {

    return (
        <Router >
                <Switch>
                    <Route path="/texts/upload" component={UploadTextComponent}/>
                    <Route path="/texts/:id" component={TextStatisticComponent}/>
                    <Route path="/texts/" component={TextStatisticListComponent}/>
                    <Route path="/" component={EmptyPage}/>
                </Switch>
        </Router>
    );
  }
}

export default App;
