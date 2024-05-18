/*==================================================
EditStudentsContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editStudentThunk, fetchStudentThunk } from "../../store/thunks";
import EditStudentsView from "../views/EditStudentsView";

class EditStudentsContainer extends Component {
  // Get student data from back-end database
  componentDidMount() {
    // getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: null, 
      redirect: false,
      errors: {},
    };
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Validate form inputs
  validateForm = () => {
    const { firstname, lastname, email, gpa } = this.state;
    const errors = {};
    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "Invalid email format.";
    if (gpa && (gpa < 0.0 || gpa > 4.0 || isNaN(gpa))) errors.gpa = "GPA must be a number between 0.0 and 4.0.";
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    if (!this.validateForm()) {
      return;
    }

    let student = {
      id: this.props.student.id,
      firstname: this.state.firstname || this.props.student.firstname,
      lastname: this.state.lastname || this.props.student.lastname,
      email: this.state.email || this.props.student.email,
      imageUrl: this.state.imageUrl || this.props.student.imageUrl,
      gpa: this.state.gpa || this.props.student.gpa,
      campusId: this.state.campusId || this.props.student.campusId,
    };

    // Edit student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the updated student
    this.setState({
      redirect: true,
    });
  };

  // Update state with student data once it's fetched
  componentDidUpdate(prevProps) {
    if (prevProps.student !== this.props.student) {
      const { firstname, lastname, email, imageUrl, gpa, campusId } = this.props.student;
      this.setState({
        firstname,
        lastname,
        email,
        imageUrl,
        gpa,
        campusId
      });
    }
  }

  // Render Student view by passing student data as props to the corresponding View component
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/students/`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentsView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          studentData={this.state}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "EditStudentsContainer" to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student, // Get the State object from Reducer "student"
  };
};

// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

// Export store-connected container by default
export default connect(mapState, mapDispatch)(EditStudentsContainer);
