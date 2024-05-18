/*==================================================
/src/components/containers\AllCampusesContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllCampusesThunk, deleteCampusThunk } from "../../store/thunks";
import { AllCampusesView } from "../views";

class AllCampusesContainer extends Component {
  componentDidMount() {
  this.props.fetchAllCampuses();
  }


  render() {
    const { allCampuses, deleteCampus } = this.props;
    
 
    const sortedCampuses = allCampuses.slice().sort((a, b) => b.id - a.id);

    return (
      <div>
        <Header />
        <AllCampusesView
          allCampuses={sortedCampuses}
          deleteCampus={deleteCampus}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,  
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId)),
  };
};


AllCampusesContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
};


export default connect(mapState, mapDispatch)(AllCampusesContainer);