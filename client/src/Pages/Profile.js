import React, { Component } from "react";
import Reviews from "../components/Reviews/Reviews";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import API from "../utils/API";

class Profile extends Component {
  state = {
    profile: {}
  }

  componentDidMount() {
    const self = this;
    API.getProfile(this.props.match.params.id).then(response => {
      self.setState({
        profile: response.data
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row" />
        <ProfilePage
          pet_name={this.state.profile.pet_name}
          city={this.state.profile.city}
          description={this.state.profile.description}
          imgurl={this.state.profile.imgurl}
        />
        <Reviews
          // dog_id={this.state.profile.dog_id}
          review={this.state.profile.review}
          reviewer={this.state.profile.reviewer}
        />
      </div>
    );
  }
}

export default Profile;
