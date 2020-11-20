import React, { isValidElement } from 'react';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText,
  MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
  MDBInput,
  MDBListGroupItem, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
  MDBListGroup,
  MDBCardHeader,
  MDBCollapse
} from 'mdbreact';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      deleteItemRequested: false,
      selectedItem: null
    }
  }

  toggleCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleDeleteItem = (value, item = null) => () => {
    if (this.state.deleteItemRequested !== value) {
      this.setState({ 
        deleteItemRequested: value,
        selectedItem: item ? item : this.state.selectedItem
      })
    }
  }

  renderHeaderLabel() {
    return (<lable>
      { this.props.title }
      { this.props.items && <span className="ml-2">({parseInt(this.props.items.length)} images)</span> }
    </lable>);
  }

  render() {
    return(
      <section>
        <MDBRow className="mb-2">
          <MDBCol>
            {
              this.props.isCollapsable 
              ? <a className={this.state.isOpen ? "text-primary" : ""}
                  onClick={this.toggleCollapse}
                >
                  <span className="mr-2"><MDBIcon icon={this.state.isOpen ? "folder-open" : "folder"} /></span>
                  {this.renderHeaderLabel()}
                </a>
              : this.renderHeaderLabel()
            }
          </MDBCol>
          <MDBCol className="text-right" sm="2" md="4">
            <MDBBtn size="sm" color={this.state.isOpen ? "primary" : "grey"} disabled={!this.state.isOpen}>
              <MDBIcon icon="plus" className={this.props.isDesktopSize ? "mr-2" : ""} />
              {
                this.props.isDesktopSize && "Add image"
              }
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        {
          this.props.items && this.props.items.length > 0 &&
          <MDBCollapse isOpen={this.state.isOpen}>
            <MDBRow>
            {
              this.props.items.map(obj => (
                <MDBCol sm="12" md="6" lg="6" className="mb-1">
                  <MDBListGroupItem style={{ height: "100%"}}>
                    <MDBRow>
                      <MDBCol className="text-right">
                        <a className="text-danger" onClick={this.toggleDeleteItem(true, obj)}>
                          <MDBIcon icon="trash-alt" size="1x" className={this.props.isDesktopSize ? "mr-2" : ""} />
                          {
                            this.props.isDesktopSize && "Delete"
                          }
                        </a>
                      </MDBCol>
                    </MDBRow>
                    <img src={obj} alt={obj} width="100%" />
                  </MDBListGroupItem>
                </MDBCol>
              ))
            }
            </MDBRow>
          </MDBCollapse>
        }

        <MDBModal isOpen={this.state.deleteItemRequested} toggle={this.toggleDeleteItem(false)}>
          <MDBModalBody>
            Do you want to remove this item <label className="text-danger">{this.state.selectedItem}</label>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn>Cancel</MDBBtn>
            <MDBBtn>Confirm</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </section>
    );
  }
};