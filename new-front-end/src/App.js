import React,{ Component } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './screens/Home';
import SignIn from './screens/SignIn';
import Jobs from './screens/Jobs';
import Internships from './screens/Internships';
import Profile from './screens/Profile';
import Register from './screens/Register';

import NavMenu from './components/Navbar';
import Footer from './components/Footer';


import './App.css';

class App extends Component {
  render(){
    return(
      <div className="the-one">
      <BrowserRouter>
            <NavMenu/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/signin" component={SignIn}/>
              <Route path='/jobs' component={Jobs}/>
              <Route path='/internships' component={Internships}/>
              <Route exact path='/profile/:username' component={Profile}/>
              <Route exact path="/register" component={Register}/>
              {/*
              <Route exact path='/admin' component={Admin}/>
              <Route path='/profile/:userName/create-job' component={CreateJobOffer}/>
              <Route path='/profile/:userName/create-internship' component={CreateInternship}/>
              <Route exact path="/error/:error_code" component={ErrorScreen} />
              */}
            </Switch>   
            <Footer/>
      </BrowserRouter>
      </div>
    )
  }
}

export default App;
