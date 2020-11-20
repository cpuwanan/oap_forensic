import React from 'react';
import { 
  MDBContainer, MDBListGroupItem, MDBRow, MDBCol, MDBCardHeader, MDBCardBody, MDBCollapse, MDBIcon, MDBBadge, MDBBtnGroup, MDBBtn
} from 'mdbreact';

import { RADIOACTIVE_PROPERTIES } from '../../data/Dummy';
import { SimpleSingleLineGridList } from "../../components/MatUISingleLineGridList";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      property: [
        { open: true, name: "matter", data: RADIOACTIVE_PROPERTIES.matter, title: "ขั้นที่ 1.1: ค้นหาข้อมูลด้วยลักษณะทางกายภาพ" },
        { open: true, name: "scientificName", data: [], title: "ขั้นที่ 1.2: ค้นหาข้อมูลด้วยชื่อนิวไคลด์กัมมันตรังสี" }
      ],
    }
  }

  componentDidMount() {
  }

  toggleTab = (id) => () => {
    let allItems = this.state.property;
    if (allItems[id]) {
      allItems[id].open = !this.state.property[id].open;
      this.setState({ property: allItems })
    }
  }

  renderItems(items, paramName, tabId, isDesktopSize, columnSize) {
    let prop = this.state.property[tabId];
    if (!prop || items[paramName]) {
      return <></>
    }

    return(
      <section className="mb-3">
        <a onClick={this.toggleTab(tabId)}>
          <MDBRow>
            <MDBCol>
              <h6 className={prop.open ? "text-primary" : ""}>
                <MDBIcon icon={prop.open ? "folder-open" : "folder"} className="mr-2" />
                {prop.title}  
              </h6>
            </MDBCol>
            <MDBCol size={isDesktopSize ? "3" : "12"} className={isDesktopSize ? "text-right" : ""}>
            { 
              this.props.inputs[prop.name] && 
              <h6>                      
                <MDBBadge color="primary">{this.props.inputs[prop.name]}</MDBBadge>
              </h6>
            }
            </MDBCol>
          </MDBRow>
        </a>
        <MDBCollapse isOpen={prop.open}>
          <MDBRow>
            {
              items.map(item => (
                <MDBCol size={columnSize} className="mb-2">
                  <MDBListGroupItem
                    style={{ height: "100%"}}
                    onClick={this.props.onUpdate(prop.name, item.name)}
                    active={this.props.inputs[prop.name] === item.name}
                    className={this.props.inputs[prop.name] === item.name ? "z-depth-2" : ""}
                  >
                  <h5>
                    {item.name}
                  </h5>
                  <SimpleSingleLineGridList 
                    item_array={item[paramName]}
                  />
                  </MDBListGroupItem>
                </MDBCol>
              ))
            }
          </MDBRow>
        </MDBCollapse>
      </section>
    );
  }

  render() {
    let columnSize = 4;
    let isDesktopSize = true;
    if (window.innerWidth < 800) {
      columnSize = 12;
      isDesktopSize = false;
    }

    let prop = this.state.property && this.state.property.length > 0 ? this.state.property[0] : null;
    let index = 0;

    return(
      <MDBContainer>
        {
          prop &&
            <section className="mb-3">
              <a onClick={this.toggleTab(index)}>
                <MDBRow>
                  <MDBCol>
                    <h6 className={prop.open ? "text-primary" : ""}>
                      <MDBIcon icon={prop.open ? "folder-open" : "folder"} className="mr-2" />
                      {prop.title}  
                    </h6>
                  </MDBCol>
                  <MDBCol size={isDesktopSize ? "3" : "12"} className={isDesktopSize ? "text-right" : ""}>
                    { 
                      this.props.inputs[prop.name] && 
                      <h6>                      
                        <MDBBadge color="primary">{this.props.inputs[prop.name]}</MDBBadge>
                      </h6>
                    }
                  </MDBCol>
                </MDBRow>
              </a>
              <MDBCollapse isOpen={prop.open}>
                <MDBRow>
                  {
                    prop.data.map(item => (
                      <MDBCol lg="4" md="4" sm="12" className="mb-2">
                        <MDBListGroupItem
                          style={{ height: "100%"}}
                          onClick={this.props.onUpdate(prop.name, item.name)}
                          active={this.props.inputs[prop.name] === item.name}
                          className={this.props.inputs[prop.name] === item.name ? "z-depth-2" : ""}
                          >
                          <h5>
                            {item.name}
                          </h5>
                          <section>
                            <img src={process.env.PUBLIC_URL + item.img} alt={`rad-obj-${item.name}`} width="100%" />
                          </section> 
                        </MDBListGroupItem>
                      </MDBCol>
                    ))
                  }
                </MDBRow>
              </MDBCollapse>
              {
                index < parseInt(this.state.property.length) - 1 &&
                <hr />
              }
            </section>
        }     
        {
          this.renderItems(this.props.radioactiveItems, "appearance", 1, isDesktopSize, columnSize)
        }   
      </MDBContainer>
    );
  }
}