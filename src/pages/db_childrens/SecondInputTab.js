import React from 'react';
import { 
  MDBContainer, MDBListGroupItem, MDBRow, MDBCol, MDBCardHeader, MDBCardBody, MDBCollapse, MDBIcon, MDBBadge,
} from 'mdbreact';

import { SimpleSingleLineGridList } from "../../components/MatUISingleLineGridList";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      property: [
        { open: true, name: "labChart", data: [], title: "ขั้นที่ 2.1: ค้นหาข้อมูลจากการวิเคราะห์จากห้องปฏิบัติการ" },
        { open: true, name: "guideline", data: [], title: "ขั้นที่ 2.2: ค้นหาข้อมูลด้วยลักษณะภายนอก หรือ การใช้ประโยชน์ " }
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
    if (!prop || items[paramName]) { return <></>; }
    if (!items) { return <></>; }
    let item = items[0]
    if (!item) { return <></>; }

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
              items.map((item, index) => (
                index === 0 &&
                item[paramName].map(obj => (
                  <MDBCol size={columnSize} className="mb-2">
                    <MDBListGroupItem
                      style={{ height: "100%"}}
                      onClick={this.props.onUpdate(prop.name, obj)}
                      active={this.props.inputs[prop.name] === obj}
                      className={this.props.inputs[prop.name] === obj ? "z-depth-2" : ""}
                    >
                    <img src={process.env.PUBLIC_URL + obj} width="100%" alt={obj} />
                    </MDBListGroupItem>
                  </MDBCol>
                ))
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
    
    return(
      <MDBContainer >
        {
          this.renderItems(this.props.radioactiveItems, "labs", 0, isDesktopSize, columnSize)
        }  
        {
          this.renderItems(this.props.radioactiveItems, "usage", 1, isDesktopSize, columnSize)
        }  
      </MDBContainer>
    );
  }
}
