
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import EditCampusView from '../views/EditCampusView';
import { Redirect } from 'react-router-dom';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: "",
            address: "",
            description: "",
            imageURL: "", 
        };
    }

    componentDidMount() {
        const { fetchCampus, match } = this.props;
        fetchCampus(match.params.id).then(() => {
            
            const { campus } = this.props;
            this.setState({
                name: campus.name,
                address: campus.address,
                description: campus.description,
                imageURL: campus.imageURL 
            });
        });
    }

    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

  
    handleSubmit = async event => {
        event.preventDefault();
        const { campus } = this.props;
        const { name, address, description, imageURL } = this.state;


        const updatedCampus = {
            id: campus.id,
            name,
            address,
            description,
            imageURL: imageURL || campus.imageURL
        };

        await this.props.editCampus(updatedCampus);
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={`/campuses`} />)
        }

        return (
            <div>
                <Header />
                <EditCampusView 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit} 
                    campus={this.props.campus} 
                />
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        campus: state.campus,
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus))
    };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);