import React,{ Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './components/screens/Home';
import Admin from './components/screens/admin/Admin';
import Navbar from './components/Navbar';
import JobOffers from './components/screens/JobOffers';
import InOffers from './components/screens/InOffers';
import Profile from './components/screens/profile/Profile';
import Footer from './components/Footer';
import SignIn from './components/screens/SignIn';
import RegisterPerson from './components/screens/register/RegisterPerson';
import RegisterFirm from './components/screens/register/RegisterFirm';
import Register from './components/screens/register/Register';
import CreateEmployer from './components/screens/register/CreateEmployer';
import CreateJobOffer from './components/screens/CreateJobOffer';
import CreateInternship from './components/screens/CreateInternship';

class App extends Component {
  render(){
    return(
      <BrowserRouter>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path='/admin' component={Admin}/>
              <Route path='/jobs' component={JobOffers}/>
              <Route path='/internships' component={InOffers}/>
              <Route path='/profile/:userName' component={Profile}/>
              <Route path='/profile/:userName/create-job' component={CreateJobOffer}/>
              <Route path='/profile/:userName/create-internship' component={CreateInternship}/>
              <Route path="/signin" component={SignIn}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/register/1" component={CreateEmployer}/>
              <Route path="/register/:reg_id/person" component={RegisterPerson}/>
              <Route path="/register/:reg_id/firm" component={RegisterFirm}/>
              <Route path="/register/:reg_id" component={RegisterPerson}/>
            </Switch>   
            <Footer/>
      </BrowserRouter>
    )
  }
}

export default App;
