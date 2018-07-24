import React, { Component } from "react";
import axios from "axios";
import Profile from "./components/Profile";
import Repo from './components/Repo'
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import { Layout, Menu, Icon } from "antd";
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    userData: null,
    repoData: [],
    eventData: [],
    followerData: [],
    followingData: []
  };

  fetchData(username) {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(UserRes => {
        this.setState({
          userData: {
            name: UserRes.data.name,
            bio: UserRes.data.bio,
            avatar_url: UserRes.data.avatar_url,
            followers: UserRes.data.followers,
            following: UserRes.data.following
          }
        });
      })
      .catch(err => console.log(err));

    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(repoRes => {
        this.setState({
          repoData: repoRes.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            owner: repo.owner,
            description: repo.description,
            html_url: repo.html_url
          }))
        });
      })
      .catch(err => console.log(err));

    axios
      .get(`https://api.github.com/users/${username}/events`)
      .then(eventRes => {
        this.setState({
          eventData: eventRes.data.map(event => ({
            type: event.type,
            repo: event.repo
          }))
        });
      })
      .catch(err => console.log(err));

    axios
      .get(`https://api.github.com/users/${username}/followers`)
      .then(followerRes => {
        this.setState({
          followerData: followerRes.data.map(follower => ({
            login: follower.login,
            html_url: follower.html_url,
            avatar_url: follower.avatar_url
          }))
        });
      })
      .catch(err => console.log(err));

    axios
      .get(`https://api.github.com/users/${username}/following`)
      .then(followingRes => {
        this.setState({
          followingData: followingRes.data.map(following => ({
            login: following.login,
            html_url: following.html_url,
            avatar_url: following.avatar_url
          }))
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchData("matthewmahler");
  }

  render() {
    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              style={{ marginTop: "60px" }}
            >
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="user" />
                  <span className="nav-text">Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/repo">
                  <Icon type="book" />
                  <span className="nav-text">All Repositories</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                style={{ padding: 24, background: "#fff", textAlign: "center" }}
              >
                <Switch>
                  <Route 
                  exact 
                  path="/"
                  render={()=>
                  <Profile
                    userData={this.state.userData}
                    eventData={this.state.eventData}
                    followerData={this.state.followerData}
                    followingData={this.state.followingData}
                  /> }
                  />
                  <Route 
                  path="/repo" 
                  render={()=>
                  <Repo
                  repoData={this.state.repoData}
                  />
                  }
                  />
                </Switch>
                
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>,
      </div>
    );
  }
}

export default App;
