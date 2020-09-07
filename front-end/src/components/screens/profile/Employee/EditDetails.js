import React,{ Component } from 'react';
import Modal from 'react-modal';
import api from '../../../../api/index';
import MessageBox from '../../../MessageBox';

class EditDetails extends Component{
    constructor(props){
        super(props);

        this.state = {
            radioGroups : {
                1 : "",
                2 : "",
            },
            cb: false,
            modal: false,
            msgBox: false,
            details: {},
        }

        this.messages = [];
        this.terms = false;
    }

    setModal = (value) => {
        this.setState(
            prevstate => ({ modal: value })
        );
    }

    handleRadio = (group,e) => {
        var radioGroups = { ...this.state.radioGroups };
        radioGroups[group] = e.target.value;
        this.setState({radioGroups});
    }

    handleChange = (e) => {
        var details = { ...this.state.details };
        details[e.target.id] = e.target.value;
        this.setState({details});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var details = { ...this.state.details };
        details.skilled = this.state.radioGroups[1] ? this.state.radioGroups[1]==="Yes" ? true : false : undefined;
        details.permanent = this.state.radioGroups[2] ? this.state.radioGroups[2]==="Permanent"? true : false : undefined;
        if(this.checkForm(details)){
            console.log("Sending details to the server");
            this.setState({
                msgBox:false
            });
            const headers = {
                "X-access-token": localStorage.getItem('userToken')
            }
            api.post('/user/details', { headers: headers, details: details}).then(res => {
                this.props.setModal("");
            }).catch(e => {
                console.log(e);
            });
        }
        else{
            this.setState({
                msgBox:true
            });
        }
        console.log(details);
    }

    checkForm(details){
        var submit = true;
        this.messages = [];
        if(!this.terms){
            submit = false;
            this.messages.push("You did not accept the terms and conditions");
        }
        if(!details.fatherName){
            submit = false;
            this.messages.push("Father's Name field is empty.");
        }
        if(!details.motherName){
            submit = false;
            this.messages.push("Mother's Name field is empty.");
        }
        if(!details.aadhaar){
            submit = false;
            this.messages.push("Aadhar Number's field is empty.");
        }
        if(!details.dob){
            submit = false;
            this.messages.push("Date of Birth field is empty.");
        }
        if(!details.exp){
            submit = false;
            this.messages.push("Experience's field is empty.");
        }
        if(!details.mobNum){
            submit = false;
            this.messages.push("Mobile Number's field is empty.");
        }
        if(!details.permanent){
            submit = false;
            this.messages.push("Select what type of employment you are looking for.");
        }
        if(!details.skilled){
            submit = false;
            this.messages.push("Select are you a skilled worker or not.");
        }

        return submit;
    }

    showForm(){
        return(
            <div className="edit-details">
            <div className="form">
                <div className="form-heading"><h2>{this.props.title}</h2></div>
                <form onSubmit={this.handleSubmit}>
                    <input id="fatherName" type="text" placeholder="Father's Name" onChange={(e)=>{this.handleChange(e)}} />
                    
                    <input id="motherName" type="text"  placeholder="Mother's Name" onChange={(e)=>{this.handleChange(e)}} />
                    
                    <input id="dob" type="date"  placeholder="Date of Birth" onChange={(e)=>{this.handleChange(e)}} />
                    
                    <input id="mobNum" type="number"  placeholder="Mobile Number" onChange={(e)=>{this.handleChange(e)}} />
                    
                    <input id="aadhaar" type="number"  placeholder="Aadhaar Number" onChange={(e)=>{this.handleChange(e)}} />
                    
                    <input id="exp" type="number"  placeholder="Experience" onChange={(e)=>{this.handleChange(e)}} />

                    <label>Are you a skilled worker ?</label>
                    <input
                        id="R11" type="radio" value="Yes"
                        checked={this.state.radioGroups["1"] === "Yes"} 
                        onChange={ (e) => { this.handleRadio(1,e) } } />
                    <label>Yes</label><br/>
                    <input
                        id="R12" type="radio" value="No"
                        checked={this.state.radioGroups["1"] === "No"}
                        onChange={ (e) => { this.handleRadio(1,e) } } />
                    <label>No</label><br/>

                    <label>Fields of Interest : </label>

                    <label>Type of employment you are looking for : </label>
                    <input id="R21" type="radio" value="Permanent"
                        checked={this.state.radioGroups["2"] === "Permanent"}
                        onChange={ (e) => { this.handleRadio(2,e) } }
                    />
                    <label htmlFor="R21">Permanent</label><br/>
                    <input id="R22" type="radio" value="Temporary"
                        checked={this.state.radioGroups["2"] === "Temporary"}
                        onChange={ (e) => { this.handleRadio(2,e) } }
                    
                    />
                    <label htmlFor="R22">Temporary</label><br/>
                    
                    <input id="terms" type="checkbox" value="terms" 
                        checked={this.state.cb}
                        onClick={()=>{ this.terms = !this.terms; this.setState({ cb: !this.state.cb }); }}
                    />
                    <label>I accept the 
                    <span className="terms" onClick={() => { this.setModal(true) }}>terms and conditions</span>
                     of Aatma Nirbhar.</label>

                    <Modal isOpen={this.state.modal} onRequestClose={() => { this.setModal(false) }} >
                        <h1>Terms and Conditions</h1>
                        <object width="100%" height="100%" data={process.env.PUBLIC_URL + '/html/tnc.html'} type="text/html"></object>
                        <input id="terms" type="checkbox" value="terms" 
                            checked={this.state.cb}
                            onClick={()=>{ this.terms = !this.terms; this.setState({ cb: !this.state.cb }); }}
                        />
                        <label>I accept the 
                        <span className="terms" onClick={() => { this.setModal(true) }}>terms and conditions</span>
                        of Aatma Nirbhar.</label>
                    </Modal>

                    {this.state.msgBox?<MessageBox messages={this.messages} type="negative" />:null}

                    <input type="submit" value="Submit"></input>
                    <input type="button" value="Cancel" onClick={()=>{ this.props.setModal(""); }}></input>
                </form>
            </div>
            </div>
        )
    }

    render(){
        return(
            this.showForm()
        )
    }
}

export default EditDetails;