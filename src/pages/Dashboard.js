import React from 'react'
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText,
  MDBTable, MDBTableBody, MDBBtn, MDBInput, MDBCardFooter, MDBListGroupItem, MDBBtnGroup,
  MDBTabContent, MDBTabPane, MDBIcon
} from 'mdbreact';

import FirstInputTab from './db_childrens/FirstInputTab'
import SecondInputTab from './db_childrens/SecondInputTab'
import ResultTab from './db_childrens/ResultTab'

import { 
  POLICIES
} from '../data/Dummy';

const SUBMIT_BTN_NAMES = {
  next: "next_step_btn",
  previous: "prev_step_btn"
};


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sockdt: null,
      activePaneId: 0,
      userSteps: [
        { id: 0, name: "Step 1", success: false},
        { id: 1, name: "Step 2", success: false},
        { id: 2, name: "Result", success: false }
      ],
      userInputs: {
        scientificName: null,
        matter: null,
        labChart: null,
        guideline: null
      },
      outputs: null,
      openMenuBar: false
    }
    this.onSelectStepperPane = this.onSelectStepperPane.bind(this);
    this.onSubmitStepperButton = this.onSubmitStepperButton.bind(this);
    this.onUpdateInputs = this.onUpdateInputs.bind(this);
  }

  onSubmitStepperButton = (e) => {
    if (e.target) {
      let btn=e.target.id;
      let id = this.state.activePaneId;
      if (btn === SUBMIT_BTN_NAMES.previous) {
        id -= 1;
      } else if (btn === SUBMIT_BTN_NAMES.next) {
        id += 1;
      }
      this.setState({
        activePaneId: id
      })
    }
  }

  onSelectStepperPane = (e) => {
    if (e.target) {
      let id = e.target.id;
      if (id !== null || id !== undefined) {
        if (parseInt(id) !== this.state.activePaneId) {
          this.setState({
            activePaneId: parseInt(id)
          })
        }
      }
    }
  }

  updateOutputs = () => {
    if (!this.state.userSteps) { return; }

    // Step 1
    let steps = this.state.userSteps;
    steps[0].success = false;
    if (this.state.userInputs.matter && this.state.userInputs.scientificName) {
      steps[0].success = true;
    }

    // Step 2
    steps[1].success = false;
    if (this.state.userInputs.labChart && this.state.userInputs.guideline) {
      steps[1].success = true;
    }

    this.setState({
      userSteps: steps,
      outputs: this.calculateOutputs(this.state.userInputs)
    })
  }

  onUpdateInputs = (property, value) => () => {
    console.log(property, value)
    if (property) {
      if (this.state.userInputs[property] === value) {
        // Clear selection if repeat clicking
        value = null;
      }
      this.setState({
        userInputs: {
          ...this.state.userInputs,
          [property]: value
        }
      } , () => {
        this.updateOutputs();
      })
    }
  }

  onClickClearSelection = () => {
    if (parseInt(this.state.activePaneId) === 0) {
      this.setState({
        userInputs: {
          ...this.state.userInputs,
          matter: null,
          scientificName: null
        }
      }, () => { this.updateOutputs() })
    } else if (parseInt(this.state.activePaneId) === 1) {
      this.setState({
        userInputs: {
          ...this.state.userInputs,
          labChart: null,
          guideline: null
        }
      }, () => { this.updateOutputs() })
    } else {
      this.setState({
        userInputs: {
          ...this.state.userInputs,
          matter: null,
          scientificName: null,
          labChart: null,
          guideline: null
        }
      }, () => { this.updateOutputs() })
    }
  }

  calculateOutputs(inputs) {
    let outputs = null;
    if (inputs) {
      outputs = {
        security: null,
        safety: null,
        law: null,
        contact: null,
        msg: null,
        success: false
      }

      if (inputs.matter || inputs.scientificName || inputs.labChart || inputs.guideline) {
        let code0 = inputs.matter ? "1" : "0";
        let code1 = inputs.scientificName ? "1" : "0";
        let code2 = inputs.labChart ? "1" : "0";
        let code3 = inputs.guideline ? "1" : "0";
        let code = `${code0}${code1}${code2}${code3}`;
        let result = POLICIES.find(item => {
          return item.code === code;
        })
        if (result) {
          outputs.success = true;
          outputs.security = result.security;
          outputs.safety = result.safety;
          outputs.law = result.law;
          outputs.contact = result.contact;
        }
      }
      
      if (outputs.success === false) {
        outputs.msg = "กรุณาประสานสำนักงานปรมาณูเพื่อสันติ";
        outputs.contact = "Tel: 02-596-7600";
      }
    }
    return outputs;
  }
  
  render() {
    return(
      <MDBContainer className="mb-4">
        <MDBRow>
          <MDBCol className="text-center text-muted">
            <label className="text-primary">OAP Forensic</label>: การดำเนินการโปรแกรมสนับสนุนการดำเนินการด้านนิติวิทยาศาสตร์ทางนิวเคลียร์
          </MDBCol>
        </MDBRow>
        <MDBRow className="text-center mt-1">
          {
            this.state.userSteps && this.state.userSteps.map(item => (
            <MDBCol>
              <a id={item.id}
                className={item.id === this.state.activePaneId ? "font-weight-bold" : "text-light"}
                onClick={this.onSelectStepperPane}
              >
                {item.name}
              </a>
              <section>
                <label className={item.success ? "text-success" : "text-light"}>
                  <MDBIcon size="2x" icon={item.success ? "check-circle" : "times-circle"} />
                </label>
              </section>
            </MDBCol>
            ))
          }
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBCardText>
                  <MDBTabContent activeItem={this.state.activePaneId}>
                    <MDBTabPane tabId={0} role="tabpanel">
                      <FirstInputTab 
                        inputs={this.state.userInputs}
                        onUpdate={this.onUpdateInputs}
                        radioactiveItems={this.props.radioactiveItems}
                      />
                    </MDBTabPane>
                    <MDBTabPane tabId={1} role="tabpanel">
                      <SecondInputTab 
                        inputs={this.state.userInputs}
                        onUpdate={this.onUpdateInputs}
                        radioactiveItems={this.props.radioactiveItems}
                      />                      
                    </MDBTabPane>
                    <MDBTabPane tabId={2} role="tabpanel">
                      <ResultTab 
                        inputs={this.state.userInputs}
                        outputs={this.state.outputs}
                        radioactiveItems={this.props.radioactiveItems}
                      />
                    </MDBTabPane>
                  </MDBTabContent>
                </MDBCardText>
              </MDBCardBody>
              <MDBCardFooter>
                <MDBRow>
                {
                  this.state.userSteps && this.state.userSteps.length > 0 && 
                  <MDBCol className="">
                    <MDBBtn 
                      color={parseInt(this.state.activePaneId) < 1 ? "light" : "primary"}
                      disabled={parseInt(this.state.activePaneId) < 1}
                      size="md" id={SUBMIT_BTN_NAMES.previous}
                      onClick={this.onSubmitStepperButton}
                    >Previous</MDBBtn>
                  </MDBCol>
                }
                <MDBCol className="text-center">
                  <MDBBtn size="md" color="warning"
                    onClick={this.onClickClearSelection}
                  >Clear</MDBBtn>
                </MDBCol>
                {
                  this.state.userSteps && this.state.userSteps.length > 0 &&
                  <MDBCol className="text-right">
                    <MDBBtn
                      color={parseInt(this.state.activePaneId) === this.state.userSteps.length - 1 ? "light" : "primary"}
                      disabled={parseInt(this.state.activePaneId) === this.state.userSteps.length - 1}
                      size="md" id={SUBMIT_BTN_NAMES.next}
                      onClick={this.onSubmitStepperButton}
                      >Next</MDBBtn>
                    </MDBCol>
                }
                </MDBRow>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}