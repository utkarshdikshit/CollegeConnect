import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";
import { getSpecificProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles(this.props.match.params.currenttitle);
  }

  clicked(currenttitle, branch) {
    this.props.getSpecificProfiles(currenttitle, branch);
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    const para = this.props.match.params.currenttitle;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            Department
            <span className="caret" />
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                onClick={this.clicked.bind(this, para, "ECE")}
                className="dropdown-item"
              >
                ECE
              </button>
            </li>
            <li>
              <button
                onClick={this.clicked.bind(this, para, "MECH")}
                className="dropdown-item"
              >
                MECH
              </button>
            </li>
            <li>
              <button
                onClick={this.clicked.bind(this, para, "CSE")}
                className="dropdown-item"
              >
                CSE
              </button>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Profiles</h1>
              <p className="lead text-center">Browse and connect with People</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, getSpecificProfiles }
)(Profiles);
