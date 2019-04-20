import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getAllProfiles } from "../../actions/profileActions";

import { Link } from "react-router-dom";

class People extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 2,
      pincode: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    let renderPageNumbers;
    // console.log(para);

    const { currentPage, todosPerPage } = this.state;

    // Logic for displaying todos

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

      const currentTodos = profiles.slice(indexOfFirstTodo, indexOfLastTodo);

      profileItems = currentTodos.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(profiles.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        return (
          <button
            className="btn btn-secondary btn_space"
            type="button"
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </button>
        );
      });
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/profiles/student" className="btn btn-light">
                <i className="fas fa-user-graduate text-info mr-1" /> Students
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/profiles/teacher" className="btn btn-light">
                <i className="fas fa-chalkboard-teacher text-info mr-1" />
                Teaching Staff
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/profiles/nonteaching" className="btn btn-light">
                <i className="fab fa-black-tie text-info mr-1" />
                Non - Teaching Staff
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/profiles/other" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" />
                Others
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Profiles</h1>
              <p className="lead text-center">Browse and connect</p>
              {profileItems}
            </div>
          </div>
          <div className="row">
            <ul id="page-numbers">{renderPageNumbers}</ul>
          </div>
        </div>
      </div>
    );
  }
}

People.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(People);
