import React from 'react';
import { 
  MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow, MDBCol, MDBTabPane, MDBTable, MDBTableBody, MDBBtnGroup,
} from 'mdbreact';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {}

  renderInputParam = (label, value) => {
    return (
    <MDBListGroupItem 
      // style={ { backgroundColor: value ? "#00C851" : "#ff4444" } }
      color={ value ? "" : "dark"}
    >
      {label}
      <section className={ value ? "text-success" : "text-danger" }>
        { value ? value : "Not available" }
      </section>
    </MDBListGroupItem>
    );
  }

  renderOutputs = (outputs) => {
    if (outputs) {
      if (outputs.success) {
        return (
          <MDBListGroup>
            <MDBListGroupItem>
              <label className="">ด้านความมั่นคง</label>
              <br />
              <label className="text-primary">{outputs.security}</label>
            </MDBListGroupItem>
            <MDBListGroupItem>
              <label className="">ด้าน Safety</label>
              <br />
              <label className="text-primary">{outputs.safety}</label>
            </MDBListGroupItem>
            <MDBListGroupItem>
              <label className="">ด้านกฎหมาย</label>
              <br />
              <label className="text-primary">{outputs.law}</label>
            </MDBListGroupItem>
            <MDBListGroupItem>
              <label className="">การติดต่อประสานงาน</label>
              <br />
              <label className="text-primary">{outputs.contact}</label>
            </MDBListGroupItem>
          </MDBListGroup>
        );
      } else {
        return (
          <MDBListGroupItem className="text-danger">
            <h5>{outputs.msg}</h5>
            <label>{outputs.contact}</label>
          </MDBListGroupItem>
        );
      }
    } else {
      return (
        <MDBListGroupItem className="text-danger">
          <h5 className="font-weight-bold">Invalid input data</h5>
        </MDBListGroupItem>
      ); 
    }
  }

  render() {
    let columnSize = 12;
    let isDesktopSize = true;
    if (window.innerWidth < 800) {
      columnSize = 12;
      isDesktopSize = false;
    }
    
    return(
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol size={12} className="mb-2">
            <section>
              ลักษณะจำเพาะจากการประเมินของผู้ใช้
            </section>
            <MDBListGroup className="mt-2">
              { this.renderInputParam("Matter type", this.props.inputs.matter) }
              { this.renderInputParam("Scientific name", this.props.inputs.scientificName) }
              { this.renderInputParam("Lab data", this.props.inputs.labChart) }
              { this.renderInputParam("Guideline", this.props.inputs.guideline) }
            </MDBListGroup>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow>
          <MDBCol size={12} className="mb-2">
            <section>
              จากข้อมูลการค้นข้อมูลทั้ง 2 ขั้น ให้แสดงผลข้อมูลดังนี้
            </section>
            <section className="mt-2">
              { this.renderOutputs(this.props.outputs) }
            </section>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}