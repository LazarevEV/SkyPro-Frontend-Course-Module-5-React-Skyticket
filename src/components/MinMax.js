import React, { useState } from "react"
import PropTypes from 'prop-types'

function MinMax({ min = 0, max, current, onChange }) {
    const [inputValue, setInputValue] = useState(current);

    function limitNumber(num) {
        return Math.max(min, Math.min(max, num));
    }

    function applyCurrent(num) {
        setInputValue(num);
        onChange(limitNumber(num));
    }

    function parseCurrentStr(e) {
        const num = parseInt(e.target.value, 10);
        setInputValue(Number.isNaN(num) ? min : num);
    }

    function handleEnterPress(e) {
        if (e.key === 'Enter') {
            const inputValueNew = limitNumber(inputValue);
            applyCurrent(inputValueNew);
        }
    }

    function handleOnBlur(e) {
        const inputValueNew = limitNumber(inputValue);
        applyCurrent(inputValueNew);
    }

    const inc = () => {
        applyCurrent(limitNumber(inputValue + 1));
    }
    
    const dec = () => {
        applyCurrent(limitNumber(inputValue - 1));
    }

    return (
        <div>
            <button type="button" onClick={dec} className="removeButton">
                -
            </button>
            <input
                type="text"
                value={inputValue}
                onChange={parseCurrentStr}
                onKeyPress={handleEnterPress}
                onBlur={handleOnBlur}
            />
            <button type="button" onClick={inc} className="addButton">
                +
            </button>
        </div>
    )
}

export default MinMax;

MinMax.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    current: PropTypes.number,
    onChange: PropTypes.func
}