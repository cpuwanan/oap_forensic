import React from 'react'

import {
  MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody, MDBModalFooter,
  MDBListGroupItem, MDBBtn, MDBTabContent, MDBTabPane, MDBIcon, MDBModalHeader, MDBInput
} from 'mdbreact';

const ACTION_TYPE = {
  login: 0,
  createAccount: 1
};

const ACCOUNT_TYPE = {
  admin: 0,
  user: 1
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabId: ACTION_TYPE.login,
      activeUserType: ACCOUNT_TYPE.admin,
      response: null,
      userInfo: null,
    }
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.toggleActiveUserType = this.toggleActiveUserType.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
  }

  toggleActiveTab = (id) => () => {
    if (this.state.activeTabId !== parseInt(id)) {
      this.setState({
        activeTabId: parseInt(id),
        response: null
      })
    }
  }

  toggleActiveUserType = (id) => () => {
    if (this.state.activeUserType !== parseInt(id)) {
      this.setState({
        activeUserType: parseInt(id)
      })
    }
  }

  onChangeInput = (e) => {
    if (e.target.id) {
      let param = e.target.id;
      let value = e.target.value;
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          [param]: value
        }
      })
    }
  }

  onSubmitUser = () => {
    let response = null;
    if (this.state.userInfo) {
      if (parseInt(this.state.activeTabId) === ACTION_TYPE.login) {
        console.log("Log in")
        if (this.state.userInfo.myUsername && this.state.userInfo.myPassword) {
          let data = {
            username: this.state.userInfo.myUsername,
            password: this.state.userInfo.myPassword,
            firstname: "My admin",
            lastname: "Forencis",
            type: parseInt(this.state.activeUserType) === ACCOUNT_TYPE.admin ? "Admin" : "User",
            department: "OAP",
            position: "Manager"
          }
          this.props.submit(data)
        } else {
          console.log("Error: invalid data")
        }
      } else if (parseInt(this.state.activeTabId) === ACTION_TYPE.createAccount) {
        console.log("Create an account")
        if (this.state.userInfo.visitorFirstname 
            && this.state.userInfo.visitorLastname
            && this.state.userInfo.visitorDepartment
            && this.state.userInfo.visitorPosition
            && this.state.userInfo.visitorUsername
            && this.state.userInfo.visitorPassword            
        ) {
          let data = {
            username: this.state.userInfo.visitorUsername,
            password: this.state.userInfo.visitorPassword,
            firstname: this.state.userInfo.visitorFirstname,
            lastname: this.state.userInfo.visitorLastname,
            type: parseInt(this.state.activeUserType) === ACCOUNT_TYPE.admin ? "Admin" : "User",
            department: this.state.userInfo.visitorDepartment,
            position: this.state.userInfo.visitorPosition,
          }
          this.props.submit(data)
        } else {
          console.log("Error: invalid data")
        }
      } else {
        console.log("Invalid action")
        response = {
          success: false,
          msg: `Error: Invalid action: ${this.state.activeTabId}`
        }
      }
    } else {
      response = {
        success: false,
        msg: "All fields should not be empty"
      }
    }

    if (response) {
      this.setState({
        response: response
      })
    }
  }

  render() {
    return(
      <MDBModal isOpen={!this.props.userAccount}>
        <MDBModalHeader>
          <MDBRow>
            <MDBCol>
              <img src="/images/oap_logo.jpg" width="40px" className="mr-3"/>Welcome to OAP Forensic
            </MDBCol>
          </MDBRow>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBRow className="text-center">
            <MDBCol>
              <MDBListGroupItem hover onClick={this.toggleActiveTab(ACTION_TYPE.login)}
                active={parseInt(this.state.activeTabId) === ACTION_TYPE.login}
              >
                <MDBIcon icon="user-check" className="mr-2"/>Log In
              </MDBListGroupItem>
            </MDBCol>
            <MDBCol>
              <MDBListGroupItem hover onClick={this.toggleActiveTab(ACTION_TYPE.createAccount)}
                active={parseInt(this.state.activeTabId) === ACTION_TYPE.createAccount}
              >
                <MDBIcon icon="user-plus" className="mr-2"/>Create an account
              </MDBListGroupItem>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-2">
            <MDBCol>
              <MDBListGroupItem>
                <MDBTabContent activeItem={this.state.activeTabId}>
                  <MDBTabPane tabId={ACTION_TYPE.login}>
                    <MDBRow>
                      <MDBCol>
                        <MDBInput id="myUsername" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.myUsername}
                          size="sm" type="text" label="Username" />
                      </MDBCol>
                      <MDBCol>
                        <MDBInput id="myPassword" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.myPassword}
                          size="sm" type="password" label="Password" />
                      </MDBCol>
                    </MDBRow>
                  </MDBTabPane>
                  <MDBTabPane tabId={ACTION_TYPE.createAccount}>
                    <MDBRow>
                      <MDBCol>
                        <MDBInput id="visitorFirstname" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.visitorFirstname}
                          size="sm" type="text" label="Firstname" />
                      </MDBCol>
                      <MDBCol>
                        <MDBInput id="visitorLastname" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.visitorLastname}
                          size="sm" type="text" label="Lastname" />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <MDBInput id="visitorDepartment" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.visitorDepartment}
                          size="sm" type="text" label="Department" />
                      </MDBCol>
                      <MDBCol>
                        <MDBInput id="visitorPosition" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.visitorPosition}
                          size="sm" type="text" label="Position" />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <MDBInput id="visitorUsername" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.visitorUsername}
                          size="sm" type="text" label="Username" />
                      </MDBCol>
                      <MDBCol>
                        <MDBInput id="visitorPassword" onChange={this.onChangeInput}
                          value={this.state.userInfo && this.state.userInfo.visitorPassword}
                          size="sm" type="password" label="Password" />
                      </MDBCol>
                    </MDBRow>
                  </MDBTabPane>
                </MDBTabContent>
                <MDBRow className="text-center">
                  <MDBCol>
                    Please select account type
                  </MDBCol>
                  <MDBCol>
                    <a onClick={this.toggleActiveUserType(ACCOUNT_TYPE.admin)}
                      className={parseInt(this.state.activeUserType) === ACCOUNT_TYPE.admin ? "text-primary font-weight-bold mr-2 ml-2" : "text-light mr-2 ml-2"}
                    >
                      Admin
                    </a>
                    <a onClick={this.toggleActiveUserType(ACCOUNT_TYPE.user)}
                      className={parseInt(this.state.activeUserType) === ACCOUNT_TYPE.user ? "text-primary font-weight-bold mr-2 ml-2" : "text-light mr-2 ml-2"}
                    >
                      User
                    </a>
                  </MDBCol>
                </MDBRow>
                {/*
                  parseInt(this.state.activeTabId) === parseInt(ACTION_TYPE.createAccount) &&
                  parseInt(this.state.activeUserType) === parseInt(ACCOUNT_TYPE.admin) &&
                  <MDBRow>
                    <MDBCol>
                      <MDBInput size="sm" type="password" label="Authorize code" />
                    </MDBCol>
                  </MDBRow>
                */}
              </MDBListGroupItem>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          {
            this.state.response &&
            <section className={this.state.response.success ? "text-success" : "text-danger"}>
              {this.state.response.msg}
            </section>
          }
          <MDBRow>
            <MDBCol>
              <MDBBtn color="primary" onClick={this.onSubmitUser}>
                {
                  parseInt(this.state.activeTabId) === 0
                  ? "Log In"
                  : "Create"
                }
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}