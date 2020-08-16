/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-16 21:34:21
 * @modify date 2020-08-16 21:34:21
 * @desc Validation Form Helper
 */

export function validationRules(props) {
    let validation = [];
    let label = props.label ? props.label : props.placeholder ? props.placeholder : 'Field';

    if (props.validationrules) {
        props.validationrules.forEach((item, index) => {
            if (typeof (item) === "string") {
                let valType = item.split(".");
                switch (valType[0]) {
                    case "required":
                        validation.push({ required: true, message: `${label} is Required` })
                        break;
                    case "min":
                        validation.push({ min: parseInt(valType[1], 10), message: `${label} min length ${valType[1]}` })
                        break;
                    case "max":
                        validation.push({ max: parseInt(valType[1], 10), message: `${label} max length ${valType[1]}` })
                        break;
                    case "len":
                        validation.push({ len: parseInt(valType[1], 10), message: `${label} len length ${valType[1]}` })
                        break;
                    case "pattern":
                        let validate = {
                            pattern: "",
                            type: ""
                        };
                        if (valType[1] === "letter") validate = { pattern: new RegExp("^[A-Za-z]*$"), type: "only alphabet" };
                        else if (valType[1] === "nospace") validate = { pattern: new RegExp('^\\S*$'), type: "no space" };
                        else if (valType[1] === "letterslash") validate = { pattern: new RegExp("^[a-zA-Z/]*$"), type: "must be letter and slash" };
                        else if (valType[1] === "letterslashspace") validate = { pattern: new RegExp("^[a-zA-Z/ ]*$"), type: "must be letter, slash and space" };
                        else if (valType[1] === "letterspace") validate = { pattern: new RegExp("^[a-zA-Z ]*$"), type: "must be letter and space" };
                        else if (valType[1] === "alphabet") validate = { pattern: new RegExp("^[A-Z]*$"), type: "must be uppercase" };
                        else if (valType[1] === "alphabetslash") validate = { pattern: new RegExp("^[A-Z/]*$"), type: "must be uppercase and slash" };
                        else if (valType[1] === "alphabetspace") validate = { pattern: new RegExp("^[A-Z ]*$"), type: "must be uppercase and space" };
                        else if (valType[1] === "phonenumber") validate = { pattern: new RegExp("^[+]?[0-9]*$"), type: "can be filled with number only" };
                        else if (valType[1] === "alphanumeric") validate = { pattern: new RegExp("^[A-Za-z0-9]*$"), type: "must be alphanumeric" };
                        else if (valType[1] === "alphanumericspace") validate = { pattern: new RegExp("^[A-Za-z0-9 ]*$"), type: "must be alphanumeric and space" };
                        else if (valType[1] === "alphanumericdot") validate = { pattern: new RegExp("^[A-Za-z0-9.]*$"), type: "must be alphanumeric and dot" };
                        else if (valType[1] === "alphanumericdash") validate = { pattern: new RegExp("^[A-Za-z0-9-]*$"), type: "must be alphanumeric and dash" };
                        else if (valType[1] === "alphanumericdashdotspace") validate = { pattern: new RegExp("^[A-Za-z0-9-. ]*$"), type: "must be alphanumeric, dash, dot and space" };
                        else if (valType[1] === "alphanumericunderscoredot") validate = { pattern: new RegExp("^[A-Za-z0-9_. ]*$"), type: "must be alphanumeric, underscore and dot" };
                        else if (valType[1] === "name") validate = { pattern: new RegExp("^[A-Za-z0-9 '-.]*$"), type: "must be letter or ' - ." };
                        else if (valType[1] === "number") validate = { pattern: new RegExp("^[0-9]*$"), type: "must be number" };
                        else if (valType[1] === "numberdotdash") validate = { pattern: new RegExp("^[0-9.-]*$"), type: "must be number, dot, dash" };
                        else if (valType[1] === "email") validate = { pattern: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), type: "format is not valid (e.g. email@example.com)" };
                        validation.push({ pattern: validate.pattern, message: `${label} ${validate.type}` })
                        break;
                    case "type":
                        validation.push({ type: valType[1], message: `${label} must be of type ${valType[1]}` })
                        break;
                    case "enum":
                        validation.push({ type: "enum", enum: JSON.parse(`${valType[1]}`), message: `${label} enum ${valType[1]}` })
                        break;
                    default:
                }
            }
            else if (typeof (item) === "function") {
                validation.push({
                    validator: item
                })
            }
        })
    }
    return validation;
}