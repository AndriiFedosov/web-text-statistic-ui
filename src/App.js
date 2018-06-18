import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UploadTextComponent from "./components/entity/text/UploadTextComponent";
import TextStatisticListComponent from "./components/entity/text/TextStatisticListComponent";
import TextStatisticComponent from "./components/entity/text/TextStatisticComponent";
import EmptyPage from "./components/errors/EmptyPage";
import NavBar from '../src/components/entity/other/NavBar'
import Home from '../src/components/entity/other/Home'

class App extends Component {

  render() {

    return (
        <Router >
                <div>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/" component = {Home}/>
                        <Route path="/texts/upload" component={UploadTextComponent}/>
                        <Route path="/texts/:id" component={TextStatisticComponent}/>
                        <Route path="/texts/" component={TextStatisticListComponent}/>
                        <Route path="*" component={EmptyPage} status={404}/>
                    </Switch>
                </div>
        </Router>
    );
  }
}

export default App;
