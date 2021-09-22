import { AircraftBody, AircraftBodyComponent, defaultAircraftBody, defaultAircraftBodyComponent } from '../aircraft/body';
import update from 'immutability-helper'
import React, { useState } from 'react'
import { Button, Form, Row, Table, Col, Modal } from 'react-bootstrap';
import { NumericInput, StringInput } from '../components/inputs';
import units from '../components/units';

export function BodyTab() {
    //Hooks
    //const [simBody, setSimBodyRaw] = useState(defaultAircraftBody);
    const [simBody, setSimBody] = useState(defaultAircraftBody);

    //const setSimBody = (simBody:AircraftBody) => setSimBodyRaw(Calculate)

    //Render
    return <>
        <Row>
            <Col md={3}>
                <h2>Aircraft info</h2>
                <br />
                <AircraftInfo simBody={simBody} setSimBody={setSimBody} />
                <br />
            </Col>
            <Col md={3}>
                <h2>Other info go here!</h2>
                <div style={{ width: "100%", height: "10px", backgroundColor: "red" }} />
            </Col>
            <Col md={6}>
                <h2>Diagram go here?</h2>
                <div style={{ width: "100%", height: "10px", backgroundColor: "green" }} />
            </Col>
        </Row>
        <ComponentsTable simBody={simBody} setSimBody={setSimBody}/>
    </>
}

type AircraftBodyViewerProps = {
    simBody: AircraftBody,
    setSimBody: (x: AircraftBody) => void,
}

function AircraftInfo({ simBody, setSimBody }: AircraftBodyViewerProps) {
    //Handlers
    const handleTargetMassChange = (val: number) => {
        setSimBody(update(simBody, { targetEmptyMass: { $set: val } }));
    };

    const handleAirframeDensityChange = (val: number) => {
        setSimBody(update(simBody, { density: { $set: val } }));
    };

    const handleReferenceLengthChange = (val: number) => {
        setSimBody(update(simBody, { referenceLength: { $set: val } }));
    };

    const handleActualLengthChange = (val: number) => {
        setSimBody(update(simBody, { actualLength: { $set: val } }));
    };

    const handleMinCGchange = (val: number) => {
        setSimBody(update(simBody, { minCG: { $set: val } }));
    };

    const handleMaxCGchange = (val: number) => {
        setSimBody(update(simBody, { maxCG: { $set: val } }));
    };

    return <Form.Group as={Row} className="mb-3" controlId="inputTargetEmptyMass">
        <Form.Label>Target Aircraft Mass</Form.Label>
        <NumericInput defaultValue={simBody.targetEmptyMass} units={units.KG} onChange={handleTargetMassChange} min={0} />

        <Form.Label>Airframe Density</Form.Label>
        <NumericInput defaultValue={simBody.density} units={units.KG_PER_M3} onChange={handleAirframeDensityChange} min={0} />

        <Form.Label>Reference Length</Form.Label>
        <NumericInput defaultValue={simBody.referenceLength} units={units.MM} onChange={handleReferenceLengthChange} min={0} />

        <Form.Label>Actual Length</Form.Label>
        <NumericInput defaultValue={simBody.actualLength} units={units.M} onChange={handleActualLengthChange} min={0} />

        <Form.Label>Min CG)</Form.Label>
        <NumericInput defaultValue={simBody.minCG} units={units.INCH} onChange={handleMinCGchange} min={0} />

        <Form.Label>Max CG</Form.Label>
        <NumericInput defaultValue={simBody.maxCG} units={units.INCH} onChange={handleMaxCGchange} min={0} />
    </Form.Group>
}

function ComponentsTable({ simBody, setSimBody }: AircraftBodyViewerProps) {
    const NO_POPUP = -1;
    const NEW_ITEM = -2;

    const [popupState, setPopupState] = useState({
        item: NO_POPUP,
        data: defaultAircraftBodyComponent,
        callback: (x: AircraftBodyComponent) => {},
    });

    const handleNewComponent = () => {
        setPopupState({
            item: NEW_ITEM,
            data: defaultAircraftBodyComponent,
            callback: (aircraftBodyComponent) => {
                setSimBody(update(simBody, {components: {$push: [aircraftBodyComponent]}}));
                setPopupState(update(popupState, {item: {$set: NO_POPUP}}));
            } 
        });
    }

    const handleDeleteComponent = (index: number) => {
        setSimBody(update(simBody, {components: { $splice: [[index, 1]] } }));
        setPopupState(update(popupState, {item: {$set: NO_POPUP}}));
    }

    const handleEditComponent = (index: number) => {
        setPopupState({
            item: index,
            data: simBody.components[index],
            callback: (aircraftBodyComponent) => {
                setSimBody(update(simBody, {components: {[index]: {$set: aircraftBodyComponent}}}));
                setPopupState(update(popupState, {item: {$set: NO_POPUP}}));
            }
        })
    }
    return <>
        <Modal size="lg" show={popupState.item !== NO_POPUP}>
            <h2>{popupState.item === NEW_ITEM ? "New Component" : `Component ${popupState.data.name}`}</h2>

            <p>Form stuff go here, maybe worth putting this all into yet another functtion?</p>
            
            {popupState.item !== NEW_ITEM ?
                <Button variant="danger" onClick={() => handleDeleteComponent(popupState.item)}>Delete</Button>:
                null} {" "}

            <Button variant="success" onClick={() => popupState.callback(popupState.data)}>
                {popupState.item === NEW_ITEM ? "Add" : "Edit"}
            </Button>
        </Modal>
        <Button variant="primary" size="lg" onClick={handleNewComponent}>
            Add Component
        </Button>
        <Table responsive bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Component</th>
                    <th>Density (%)</th>
                    <th>Centroid X (mm)</th>
                    <th>Centroid Y (mm)</th>
                    <th>Centroid Z (mm)</th>
                    <th>Length (mm)</th>
                    <th>Width (mm)</th>
                    <th>Height (mm)</th>
                    <th>Vis Front (%)</th>
                    <th>Vis Side (%)</th>
                    <th>Vis Bottom/Top (%)</th>
                    <th>Mass (kg)</th>
                    <th>I<sub>XX</sub></th>
                    <th>I<sub>YY</sub></th>
                    <th>I<sub>ZZ</sub></th>
                    <th>I<sub>YZ</sub></th>
                    <th>x<sub>1</sub></th>
                    <th>x<sub>2</sub></th>
                    <th>y<sub>1</sub></th>
                    <th>y<sub>2</sub></th>
                    <th>z<sub>1</sub></th>
                    <th>z<sub>2</sub></th>
                    <th>Vol (m^3)</th>
                    <th>Vis Front (m^2)</th>
                    <th>Vis Side (m^2)</th>
                    <th>Vis Bottom/Top (m^2)</th>
                </tr>
            </thead>
            <tbody>
                {simBody.components.map((component, index) => {

                    const handleNameChange = (val: string) => {
                        setSimBody(update(simBody, { components: { index: { name: { $set: val } } } }));
                    }

                    const handlePctDensityChange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { pctDensity: { $set: val } } } }));
                    };

                    const handleMassChange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };

                    const handleCentroidXchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };
                    const handleCentroidYchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };
                    const handleCentroidZchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };

                    const handleDimensionsXchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };
                    const handleDimensionsYchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };
                    const handleDimensionsZchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };

                    const handleAreaVisibilityXchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };
                    const handleAreaVisibilityYchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };
                    const handleAreaVisibilityZchange = (val: number) => {
                        setSimBody(update(simBody, { components: { index: { mass: { $set: val } } } }));
                    };

                    return <tr key={index}>
                        <td onClick={() => handleEditComponent(index)}>{index + 1}</td>
                        <td>{component.name}</td>
                        <td>{component.pctDensity}</td>
                        <td>{component.centroid.x}</td>
                        <td>{component.centroid.y}</td>
                        <td>{component.centroid.z}</td>
                        <td>{component.dimensions.x}</td>
                        <td>{component.dimensions.y}</td>
                        <td>{component.dimensions.z}</td>
                        <td>{component.areaVisibility.x}</td>
                        <td>{component.areaVisibility.y}</td>
                        <td>{component.areaVisibility.z}</td>
                        <td>{component.mass}</td>
                        <td>{component.momOfInertia.w}</td>
                        <td>{component.momOfInertia.x}</td>
                        <td>{component.momOfInertia.y}</td>
                        <td>{component.momOfInertia.z}</td>
                        <td>{component.xCoords.x}</td>
                        <td>{component.xCoords.y}</td>
                        <td>{component.yCoords.x}</td>
                        <td>{component.yCoords.y}</td>
                        <td>{component.zCoords.x}</td>
                        <td>{component.zCoords.y}</td>
                        <td></td>
                    </tr>
                })}
            </tbody>
        </Table>
    </>
}

export default BodyTab;