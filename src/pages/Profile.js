import React from 'react'
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText,
  MDBTable, MDBTableBody, MDBListGroup, MDBListGroupItem, MDBCardHeader, MDBBtn, MDBBadge, MDBCardTitle, MDBTableHead
} from 'mdbreact';

const ACTION_LISTS = ["Log in", "Log out", "Added item", "Edit item"]

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let history = [
      { time: new Date().toLocaleDateString(), action: 0},
      { time: new Date().toLocaleDateString(), action: 1},
      { time: new Date().toLocaleDateString(), action: 2},
      { time: new Date().toLocaleDateString(), action: 0},
      { time: new Date().toLocaleDateString(), action: 3},
    ]
    this.setState({
      history: history
    })
  }

  render() {
    return(
      <MDBContainer fluid>
        {
          this.props.userAccount &&
        
        <MDBRow>
          <MDBCol sm="12" md="12" lg="3" className="mb-2">
            <MDBCard>
              <MDBCardHeader color={this.props.userAccount.type.toLowerCase() === "admin" ? "blue-gradient" : "peach-gradient"}>
                <MDBRow>
                  <MDBCol><h5>{this.props.userAccount.username}</h5></MDBCol>
                  <MDBCol className="text-right"><MDBBadge color="primary">{this.props.userAccount.type}</MDBBadge></MDBCol>
                </MDBRow>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>
                  <MDBRow>
                    <MDBCol className="text-center">
                      <img src={process.env.PUBLIC_URL + "/images/profile_template.jpg"} width="80%" alt="profile" />
                    </MDBCol>
                  </MDBRow>
                  <section className="m-2 text-center">
                    {this.props.userAccount.username}
                  </section>
                  <MDBTable small striped className="mt-2">
                    <MDBTableBody>
                      <tr>
                        <td>Fullname</td>
                        <td className="text-primary">
                          {this.props.userAccount.firstname} {this.props.userAccount.lastname}
                        </td>
                      </tr>
                      <tr>
                        <td>Department</td>
                        <td className="text-primary">
                          {this.props.userAccount.department}
                        </td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td className="text-primary">
                          {this.props.userAccount.position}
                        </td>
                      </tr>
                      <tr>
                        <td>Authority</td>
                        <td>
                          <MDBBadge color="primary">
                            {this.props.userAccount.type}
                          </MDBBadge>
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td className="text-primary">myname@email.com</td>
                      </tr>
                      <tr>
                        <td>Tel</td>
                        <td className="text-primary">09809800112</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                  <MDBRow>
                    <MDBCol>
                      <MDBBtn color="primary" >Edit</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard>
              <MDBCardHeader>
                <a>
                  <h5>Usage History</h5>
                </a>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText>
                  <MDBTable small striped>
                    <MDBTableHead>
                      <tr>
                        <td>Date</td>
                        <td>Time</td>
                        <td>Action</td>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {
                        this.state.history && this.state.history.map(item => (
                          <tr>
                            <td>{new Date(item.time).toLocaleDateString()}</td>
                            <td>{new Date(item.time).toLocaleTimeString()}</td>
                            <td>{ACTION_LISTS[parseInt(item.action)]}</td>
                          </tr>
                        ))
                      }
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        
        }
      </MDBContainer>
    );
  }
}