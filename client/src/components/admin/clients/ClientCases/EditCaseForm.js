import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Icon,
  Card,
  Input,
  Divider,
} from "semantic-ui-react";
import EditStepCard from "./EditStepCard.js";
import { addCase, getCaseById, updateCase } from "../../../../api/AdminApi";

const EditCaseForm = (props) => {
  //case
  const [caseID, setCaseID] = useState(""); //only used when editing pre-existing case
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [caseCompleted, setCaseCompleted] = useState(false);
  //steps
  const [stepDict, setStepDict] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  //modal
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (firstRender && props.caseIndex !== undefined) {
      updateStateOnRender();
    }
  }, [firstRender]);

  const updateStateOnRender = async () => {
    const ID = props.clientData.cases[props.caseIndex];
    const caseToUpdate = (await getCaseById(ID)).data;
    const caseSteps = caseToUpdate.steps;
    let newStepDict = [];
    for (let i = 0; i < caseSteps.length; i++) {
      newStepDict[(i + 1).toString()] = caseSteps[i];
    }
    setStepDict(newStepDict);
    setStepCount(caseSteps.length);
    setCaseID(ID);
    setType(caseToUpdate.type);
    setStartDate(caseToUpdate.startDate);
    setCaseCompleted(caseToUpdate.completed);
  };

  const createOrUpdateCase = async () => {
    if (props.caseIndex !== undefined) {
      //update case with matching caseID
      let updateCaseResponse = await updateCase(
        type,
        startDate,
        caseCompleted,
        getStepArray(),
        caseID,
        null
      );
      if (updateCaseResponse.data) {
        alert("Successfully updated case!");
      } else {
        alert("Failed to update case, please try again!");
        console.log("Unable to update case");
      }
    } else {
      let addCaseResponse = await addCase(
        type,
        startDate,
        caseCompleted,
        getStepArray(),
        props.clientData._id,
        null
      );
      if (addCaseResponse.data) {
        alert("Successfully added new case!");
      } else {
        alert("Failed to add case, please try again!");
        console.log("Unable to add case");
      }
    }
    window.location.reload(true);
  };

  const getStepArray = () => {
    let stepArray = [];
    for (let i = 1; i <= stepCount; i++) {
      const curStep = stepDict[i.toString()];
      stepArray.push(curStep);
    }
    return stepArray;
  };

  const addStep = () => {
    let newStep = {
      step: "",
      date: "",
      completed: false,
      stepDescription: "",
      stepNumber: (stepCount + 1).toString(),
    };
    let newStepDict = stepDict;
    newStepDict[newStep.stepNumber] = newStep;
    setStepDict(newStepDict);
    setStepCount(stepCount + 1);
  };

  const updateStep = (updatedStep) => {
    let newStepDict = stepDict;
    newStepDict[updatedStep.stepNumber] = updatedStep;
    setStepDict(newStepDict);
  };

  const removeStep = () => {
    if (stepCount > 0) {
      let newStepDict = stepDict;
      delete newStepDict[stepCount];
      setStepCount(stepCount - 1);
      setStepDict(newStepDict);
      console.log(stepDict);
    }
  };

  const clearSteps = () => {
    setStepDict([]);
    setStepCount(0);
    props.setEditCase(false);
  };

  const getStepCards = () => {
    let stepCards = [];
    for (let i = 1; i <= stepCount; i++) {
      const curStep = stepDict[i.toString()];
      stepCards.push(
        <EditStepCard
          step={!curStep ? null : curStep.step}
          date={!curStep ? null : curStep.date}
          completed={!curStep ? null : curStep.completed}
          stepDescription={!curStep ? null : curStep.stepDescription}
          stepNumber={!curStep ? null : curStep.stepNumber}
          updateStep={updateStep}
          removeStep={removeStep}
        />
      );
    }
    return stepCards;
  };

  return (
    <Modal
      closeOnDocumentClick={false}
      open={props.editCase}
      onClose={() => {
        clearSteps();
      }}
    >
      <Modal.Header>Input Case Information</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            control={Input}
            label="Case Title"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
          <Form.Field
            control={Input}
            label="Start Date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <Form.Field>
            <label>Steps</label>
            <Button size="small" color="red" onClick={() => removeStep()}>
              <Icon name="minus" size="small" />
            </Button>
            <Button size="small" onClick={() => addStep()}>
              <Icon name="plus" size="small" />
            </Button>
            <p></p>
            <Card.Group>{getStepCards()}</Card.Group>
          </Form.Field>
          <Divider />
          <Form.Field>
            <Button
              size="small"
              onClick={() => {
                clearSteps();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="small"
              color="yellow"
              onClick={() => createOrUpdateCase()}
            >
              Edit Case
            </Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditCaseForm;
