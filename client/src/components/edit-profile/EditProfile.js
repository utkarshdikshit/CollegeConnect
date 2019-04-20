import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      branch: "",
      website: "",
      pincode: "",
      mail: "",
      contact: "",
      location: "",
      currenttitle: "",
      interests: "",
      githubusername: "",
      bio: "",
      facebook: "",
      linkedin: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring interests array back to CSV
      const interestsCSV = profile.interests.join(",");

      // If profile field doesnt exist, make empty string
      profile.branch = !isEmpty(profile.branch) ? profile.branch : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      profile.mail = !isEmpty(profile.mail) ? profile.mail : "";
      profile.contact = !isEmpty(profile.contact) ? profile.contact : "";
      profile.pincode = !isEmpty(profile.pincode) ? profile.pincode : "";

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        branch: profile.branch,
        website: profile.website,
        pincode: profile.pincode,
        contact: profile.contact,
        mail: profile.mail,
        location: profile.location,
        currenttitle: profile.currenttitle,
        interests: interestsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        facebook: profile.facebook,
        linkedin: profile.linkedin
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      branch: this.state.branch,
      website: this.state.website,
      pincode: this.state.pincode,
      mail: this.state.mail,
      contact: this.state.contact,
      location: this.state.location,
      currenttitle: this.state.currenttitle,
      interests: this.state.interests,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }

    // Select options for current title
    const options = [
      { label: "* Select a category", value: 0 },
      { label: "Student", value: "student" },
      { label: "Instructor or Teacher", value: "teacher" },
      { label: "Non-teaching staff", value: "nonteaching" },
      { label: "Other", value: "other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />
                <SelectListGroup
                  placeholder="Current Title"
                  name="currenttitle"
                  value={this.state.currenttitle}
                  onChange={this.onChange}
                  options={options}
                  error={errors.currenttitle}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="mail"
                  name="mail"
                  type="email"
                  value={this.state.mail}
                  onChange={this.onChange}
                  error={errors.mail}
                  info="Your Email id"
                />
                <TextFieldGroup
                  placeholder="pincode"
                  name="pincode"
                  type="number"
                  value={this.state.pincode}
                  onChange={this.onChange}
                  error={errors.pincode}
                  info="Pincode of your area"
                />
                <TextFieldGroup
                  placeholder="contact"
                  name="contact"
                  type="number"
                  value={this.state.contact}
                  onChange={this.onChange}
                  error={errors.contact}
                  info="Your Contact Number"
                />
                <TextFieldGroup
                  placeholder="branch"
                  name="branch"
                  value={this.state.branch}
                  onChange={this.onChange}
                  error={errors.branch}
                  info="Your Branch"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a institute one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="eg. Pune,Jaipur"
                />
                <TextFieldGroup
                  placeholder="* interests"
                  name="interests"
                  value={this.state.interests}
                  onChange={this.onChange}
                  error={errors.interests}
                  info="Please use comma separated values (eg.
                    AI,ML,AutoCad"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
