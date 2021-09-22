import { Form } from "react-bootstrap";
import React, {useState} from "react";
import units from "./units";

export type NumericInputProps = {
    defaultValue:number,
    min?:number,
    max?:number,
    units?:string | JSX.Element,
    onChange: (val: number) => any
};

export function NumericInput(props:NumericInputProps) {
    const [rawValue, setRawValue] = useState("" + props.defaultValue)

    let err: string | null = null;
    //TODO: Apparently "00f00" is accepted due to the starting "00"
    const value = parseFloat(rawValue)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRawValue(e.target.value);
        const parsedValue = parseFloat(e.target.value);
        if(!isNaN(parsedValue)) {
            props.onChange(parsedValue);
        }
    }
    if(isNaN(value)) {
        err = "Not a valid number";
    }
    if(typeof props.min !== "undefined" && value < props.min) {
        err = `Below minimum value: ${props.min}`
    }
    if(typeof props.max !== "undefined" && value > props.max) {
        err = `Below maximum value: ${props.min}`
    }
    console.log(err); 
    let classes = 'form-control';
    if (err) {
        classes += ' is-invalid';
    }
    return <div className="input-group">
        <input type="text" className={classes} data-units={props.units} value={rawValue} onChange={handleChange}/>
        {props.units ? <span className="input-group-text">{props.units}</span> : null}
        {err ? <Form.Control.Feedback type="invalid">{err}</Form.Control.Feedback>: null} 
    </div>
}

export function PercentageInput(props:NumericInputProps) {
    return <PercentageInput
        defaultValue={props.defaultValue*100}
        min={props.min ? props.min*100 : props.min}
        max={props.max ? props.max*100 : props.max}
        units={props.units || units.PERCENT}
        onChange={(val) => props.onChange(val/100)}/>
}

export type StringInputProps = {
    value:string,
    min?:number,
    max?:number,
    onChange: (val: string) => any
};

export function StringInput(props:StringInputProps) {

    let err: string | null = null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    if(typeof props.min !== "undefined" && props.value.length < props.min) {
        err = `Below minimum value length: ${props.min}`
    }
    if(typeof props.max !== "undefined" && props.value.length > props.max) {
        err = `Below maximum value length: ${props.min}`
    }
    console.log(err); 
    let classes = 'form-control';
    if (err) {
        classes += ' is-invalid';
    }
    return <div className="input-group">
        <input type="text" className={classes} value={props.value} onChange={handleChange}/>
        {err ? <Form.Control.Feedback type="invalid">{err}</Form.Control.Feedback>: null} 
    </div>
}