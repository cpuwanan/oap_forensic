import React from 'react';
import {
  MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody, MDBBtn, MDBListGroupItem, MDBIcon, MDBCardBody, MDBInput,
  MDBCard, MDBCardText, MDBTabContent, MDBTabPane, MDBBadge
} from 'mdbreact';
import socketIOClient from 'socket.io-client';

import Drawer from '@material-ui/core/Drawer';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import WelcomeModal from './pages/app_childrens/WelcomeModal';

import { NETWORKING, KEYS } from './config/index';
import { TEMP_RADIOACTIVE_ITEMS } from './data/Mockup';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      openMenuBar: false,
      menuItems: [ 
        {label: "Dashboard", icon: "home", id: 0},
        {label: "Profile", icon: "user-circle", id: 1},
        {label: "Admin", icon: "user-lock", id: 2}
      ], 
      currentMenuId: 0,
      radioactiveItems: [],
      userAccount: null,
    }
    this.initWebsocket = this.initWebsocket.bind(this);
    this.submitUserAccount = this.submitUserAccount.bind(this);
  }

  componentDidMount() {
    if (NETWORKING) {
      const url = `${NETWORKING.ip}:${NETWORKING.backendPort}`;
      this.setState({
        socket: socketIOClient(url)
      } , () => {
        if (this.state.socket) {
          this.initWebsocket();
        } else {
          console.log("Websocket is not available")
        }
      })
    }
  }

  initWebsocket() {
    this.state.socket.on(KEYS.websocket, data => {
      console.log(data)
    })

    this.state.socket.on(KEYS.radioactive_data, data => {
      this.setState({  
        radioactiveItems: data
      }, () => console.log(this.state.radioactiveItems))
    })
  }

  changePage = (id) => () => {
    if (this.state.currentMenuId !== parseInt(id)) {
      this.setState({ currentMenuId: parseInt(id), openMenuBar: false })
    }
  }

  toggleDrawer = (open) => () => {
    this.setState({  openMenuBar: open })
  };

  submitUserAccount(data) {
    if (data) {
      console.log(data)
      this.setState({
        userAccount: data
      })
    }
  }

  onLogout = () => {
    this.setState({
      userAccount: null
    })
  }

  renderHeader(isDesktopSize) {
    let color = "";
    if (this.state.userAccount) {
      if (this.state.userAccount.type.toLowerCase() === "admin") {
        color="info"
      } else {
        color=""
      }
    }
    return(
      <MDBListGroupItem className="z-depth-1">
        <MDBRow>
          <MDBCol>
            <a onClick={this.toggleDrawer(!this.state.openMenuBar)}>
              <MDBIcon icon="bars" size="2x" className="mr-3" />
              {
                isDesktopSize && <span style={{ fontSize: "150%"}}>OAP Forensic</span>
              }
            </a>
          </MDBCol>
          {
            this.state.userAccount &&
            <MDBCol className="text-center">
                Welcome <label className="text-primary">{this.state.userAccount.username}</label>
                {
                  this.state.userAccount.type &&
                  this.state.userAccount.type.toLowerCase() === "admin" &&
                  <MDBBadge className="ml-2" color="primary">Admin</MDBBadge>
                }
            </MDBCol>
          }
          <MDBCol className="text-right">
            {
              this.state.userAccount &&
              <MDBBtn onClick={this.onLogout} className="ml-2" size="sm">Log Out</MDBBtn>
            }
          </MDBCol>
        </MDBRow>
      </MDBListGroupItem>
    );
  }

  renderMenuBar(isDesktopSize) {
    return(
      <Drawer anchor={'left'} open={this.state.openMenuBar} onClose={this.toggleDrawer(false)}>
        <div style={{ width: isDesktopSize ? "300px" : "200px"}}>
          <section className="m-2">
            <section className="text-center">
              <img src={process.env.PUBLIC_URL + "/images/oap_logo.jpg"} alt="oap_francis" width="40%" />
            </section>
            <hr />
            <MDBRow>
              <MDBCol>
                {
                  this.state.menuItems.map((item, index) => (
                    <a onClick={this.changePage(item.id)}>
                    <MDBRow className="m-2">
                      <MDBCol className={this.state.currentMenuId === item.id ? "font-weight-bold" : "text-light"}>
                        <MDBIcon icon={item.icon} className="mr-2" />{item.label}
                      </MDBCol>
                    </MDBRow>
                    {
                      index < parseInt(this.state.menuItems.length) - 1 &&
                      <hr /> 
                    }
                    </a>
                  ))
                }
              </MDBCol>
            </MDBRow>
          </section>
        </div>
      </Drawer>
    );
  }

  render() {
    let isDesktopSize = window.innerWidth > 800;

    if (!this.state.radioactiveItems) {
      this.setState({
        radioactiveItems: TEMP_RADIOACTIVE_ITEMS
      })
    } else {
      if (this.state.radioactiveItems.length === 0) {
        this.setState({
          radioactiveItems: TEMP_RADIOACTIVE_ITEMS
        })
      }
    }

    return(
      <div>
      { this.renderMenuBar(isDesktopSize) }
      { this.renderHeader(isDesktopSize) }
      <MDBContainer className="mt-3">
        <MDBTabContent activeItem={this.state.currentMenuId}>
          <MDBTabPane tabId={0}>
            <Dashboard 
              radioactiveItems={this.state.radioactiveItems}
            />
          </MDBTabPane>
          <MDBTabPane tabId={1}>
            <Profile 
              userAccount={this.state.userAccount}
            />
          </MDBTabPane>
          <MDBTabPane tabId={2}>
            <Admin
              radioactiveItems={this.state.radioactiveItems}
            />
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>

      <WelcomeModal 
        userAccount={this.state.userAccount}
        submit={this.submitUserAccount}
      />

      </div>
    );
  }
}
