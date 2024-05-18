import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      imageURL: "",
      name: "", 
      address: "", 
      description: "", 
      redirect: false, 
      redirectId: null,
      error: ""
    };
  }

 
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

 
  validateInputs = () => {
    const { imageURL, name, address, description } = this.state;
    if (!imageURL || !name || !address || !description) {
      return false;
    }
    return true;
  }

  handleSubmit = async event => {
    event.preventDefault();  

  
    if (!this.validateInputs()) {
      this.setState({ error: "Missing information.Fill out the fields please." });
      return;
    }

    
    let campus = {
      imageURL: this.state.imageURL,
      name: this.state.name, 
      address: this.state.address,
      description: this.state.description
    };

    
    try {
      let newCampus = await this.props.addCampus(campus);

    
      this.setState({
        imageURL: "",
        name: "", //
        address: "", 
        description: "", 
        redirect: true, 
        redirectId: newCampus.id,
        error: ""
      });
    } catch(error) {
      console.log(error);
      alert("Error. Please try again.");
    }
  }

  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null, error: ""});
  }

  render() {
    
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

   
    return (
      <div>
        <Header />
        <NewCampusView
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          error={this.state.error}      
        />
      </div>          
    );
  }
}


const mapDispatch = (dispatch) => {
  return({
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  })
}

export default connect(null, mapDispatch)(NewCampusContainer);