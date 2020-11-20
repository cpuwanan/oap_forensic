import React from 'react'
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText,
  MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
  MDBInput,
  MDBListGroupItem, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
  MDBListGroup,
  MDBCardHeader,
  MDBTableHead,
  MDBCardTitle,
  MDBNav, MDBNavItem, MDBBtnGroup, MDBBtnToolbar, MDBTabContent, MDBTabPane
} from 'mdbreact';

import { LAB_NAMES } from '../data/Dummy';
import { SimpleSingleLineGridList } from '../components/MatUISingleLineGridList';
import ItemViewer from './admin_childrens/ItemViewer';

const MODAL_ACTIONS = {
  add: "add_items",
  clear: "clear"
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAction: null,
      currentItem: null,
      selectedItem: null,
      itemSections: [
        { name: "Appearance", icon: "images" },
        { name: "Lab", icon: "chart-line" },
        { name: "Usage", icon: "book" }
      ],
      activeTabId: 0,
    }
  }

  componentDidMount() {
  }

  onSelectTab = (id) => ()　=> {
    if (this.state.activeTabId !== id) {
      this.setState({ activeTabId: parseInt(id)})
    }
  }

  onSelectItem = (item) => () => {
    if (item) {
      let proceed = true;
      if (this.state.selectedItem) {
        if (this.state.selectedItem.name === item.name) {
          proceed = false;
        }
      }
      if (proceed) {
        this.setState({ selectedItem: item })
      } else {
        this.setState({ selectedItem: null })
      }
    }
  }

  toggleModal = (action) => () => {
    if (this.state.modalAction !== action) {
      let item = null;
      if (action === MODAL_ACTIONS.clear) {
        item = null;
      } else if (action === MODAL_ACTIONS.add) {
        item = {
          name: "untitle",
          object_image: [
            {img: "/dummy/object_1.jpg", file: "/dummy/object_1.jpg", title: "image_1"},
          ],
          chart_image: [
            {img: "/dummy/chart_1.png", file: "/dummy/chart_1.png", title: "image_1"},
          ],
          usage: "no data",
          matterId: 0,
        }
      }
      this.setState({ 
        modalAction: action,
        currentItem: item
      })
    }
  }

  submitNewItem = () => {
    if (this.state.currentItem) {
      // Send to backend

      // Clear
      this.setState({
        modalAction: MODAL_ACTIONS.clear,
        currentItem: null
      })
    }
  }

  setMatterIdToTempItem = (index) => () => {
    if (this.state.currentItem) {
      this.setState({
        currentItem: {
          ...this.state.currentItem,
          matterId: parseInt(index)
        }
      })
    }
  }

  uploadImageToTempItem = (e) => {
    e.preventDefault()

    if (!this.state.currentItem) { return; }

    let param = e.target.name;
    if (e.target.files && e.target.files[0] && this.state.currentItem[param]) {
      let file = e.target.files[0];
      console.log(e.target)
      let imageList = this.state.currentItem[param];
      imageList.push({ img: URL.createObjectURL(file), title: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`, file: file })
      this.setState({
        currentItem: {
          ...this.state.currentItem,
          [param]: imageList
        }
      })
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log("OnFormSubmit ", e);
  }

  render() {
    let columnSize = 4;
    let isDesktopSize = true;
    if (window.innerWidth < 800) {
      columnSize = 12;
      isDesktopSize = false;
    }
    return(
      <MDBContainer fluid>
        <MDBRow className="mt-2">
          <MDBCol lg="3" sm="12" className="mb-2">
            <h5 className="font-weight-bold">List of all radioactive items</h5>
            <MDBRow className="mt-2">
              <MDBCol>
              {
                this.props.radioactiveItems && this.props.radioactiveItems.length > 0 &&
                this.props.radioactiveItems.map(item => (
                    <MDBListGroupItem 
                      className={this.state.selectedItem && this.state.selectedItem.name === item.name ? "z-depth-2" : ""}
                      active={this.state.selectedItem && this.state.selectedItem.name === item.name}
                      onClick={this.onSelectItem(item)} >
                      {item.name}
                    </MDBListGroupItem>
                ))
              }
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol>
            <section>
              <MDBListGroupItem className="text-center z-depth-1">
                <MDBRow>
                  {
                    this.state.itemSections.map((item, index) => (
                      <MDBCol size={ parseInt(12 / parseInt(this.state.itemSections.length)) }>
                        <MDBListGroupItem hover style={{ borderStyle: "none"}}
                          onClick={this.onSelectTab(index)}
                          className={ this.state.selectedItem && parseInt(this.state.activeTabId) === index ? "text-primary" : "text-light"}
                        >
                          <MDBIcon icon={item.icon} size="2x" />
                        </MDBListGroupItem>
                      </MDBCol>
                    ))
                  }
                </MDBRow>
              </MDBListGroupItem>
            </section>

            {
              this.state.selectedItem &&
              <MDBCard className="mt-2">
                <MDBCardBody>
                  <MDBCardText>
                    <section>
                      <MDBInput type="text" value={this.state.selectedItem.name} label="Scientific name" />
                    </section>
                    <MDBTabContent activeItem={this.state.activeTabId}>
                      <MDBTabPane tabId={0}>
                        <ItemViewer 
                          title="Appearance"
                          isCollapsable={false}
                          items={this.state.selectedItem.appearance}
                          isDesktopSize={isDesktopSize}
                        />
                      </MDBTabPane>
                      <MDBTabPane tabId={1}>
                      {
                        this.state.selectedItem.labs && LAB_NAMES &&
                        parseInt(this.state.selectedItem.labs.length) === parseInt(LAB_NAMES.length) &&
                        this.state.selectedItem.labs.map((imageArray, index) => (
                          <>
                            <ItemViewer 
                              title={LAB_NAMES[index]}
                              isCollapsable={true}
                              items={imageArray}
                              isDesktopSize={isDesktopSize}
                            />
                            {
                              index < parseInt(this.state.selectedItem.labs.length) - 1 && <hr />
                            }
                          </>
                        ))
                      }
                      </MDBTabPane>
                      <MDBTabPane tabId={2}>
                        <ItemViewer 
                          title="Usage"
                          isCollapsable={false}
                          items={this.state.selectedItem.usage}
                          isDesktopSize={isDesktopSize}
                        />
                      </MDBTabPane>
                    </MDBTabContent>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            }
          </MDBCol>
        </MDBRow>

{/*
        <MDBModal isOpen={this.state.modalAction === MODAL_ACTIONS.add} toggle={this.toggleModal(MODAL_ACTIONS.clear)}>
          <MDBModalBody>
            {
              this.state.currentItem &&
              <MDBRow>
                <MDBCol>
                  <MDBInput type="text" label="Scientific name" value={this.state.currentItem.name} />
                  <MDBInput type="text" label="Usage" value={this.state.currentItem.usage} />
                  <section className="fotn-weight-bold">ลักษณะทางกายภาพ</section>
                  <section className="mb-2">
                    <MDBRow className="mb-2">
                      <MDBCol className="font-weight-bold">
                        Object
                      </MDBCol>
                      <MDBCol className="text-right">
                        <label htmlFor="upload_button1" className="text-primary"><MDBIcon icon="plus" className="mr-2" />Upload object</label>
                        <input name="object_image" type="file" id="upload_button1" style={{ display: "none"}} onChange={this.uploadImageToTempItem} />
                      </MDBCol>
                    </MDBRow>
                    
                    <MatUISingleLineGridList 
                      item_array={this.state.currentItem.object_image}
                    />
                    
                  </section>
                  
                  <section className="mb-2">
                    <MDBRow className="mb-2">
                      <MDBCol className="font-weight-bold">Lab data</MDBCol>
                      <MDBCol className="text-right">
                        <label htmlFor="upload_button2" className="text-primary"><MDBIcon icon="plus" className="mr-2" />Upload chart</label>
                        <input name="chart_image" type="file" id="upload_button2" style={{ display: "none"}} onChange={this.uploadImageToTempItem} />
                      </MDBCol>
                    </MDBRow>
                    <MatUISingleLineGridList 
                      item_array={this.state.currentItem.chart_image}
                    />
                  </section>
                  
                </MDBCol>
              </MDBRow>
            }
          </MDBModalBody>
          <MDBModalFooter>
            <MDBRow>
              <MDBCol className="text-right">
                <MDBBtn onClick={this.toggleModal(MODAL_ACTIONS.clear)} color="primary">Cancel</MDBBtn>
                <MDBBtn onClick={this.submitNewItem} color="success">Save</MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBModalFooter>
        </MDBModal>
          */}
      </MDBContainer>
    );
  }
}