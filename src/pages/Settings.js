import React from 'react'
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText,
  MDBTable, MDBTableBody 
} from 'mdbreact';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return(
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol>
            <MDBCard className="m-1">
              <MDBCardBody>
                <MDBCardText>
                  <h5 className="font-weight-bold">Settings</h5>
                  
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}