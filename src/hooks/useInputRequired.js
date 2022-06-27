import { useEffect, useState, useRef } from "react"

const useInputRequired = (initState={}) => {
    const [creds, setCreds] = useState({initState});
    const [inputState, setInputState] = useState({'login': 1, 'password': 1});
    const prevInputState = useRef({});

    useEffect(() => {
        Object.keys(inputState).forEach((inputName) => {
            if (inputState[inputName] > prevInputState.current[inputName]) document.getElementsByClassName(`error-message ${inputName}`)[0].style.display = 'none';
            if (inputState[inputName] < prevInputState.current[inputName]) document.getElementsByClassName(`error-message ${inputName}`)[0].style.display = 'block';
        })
        
        prevInputState.current = inputState;
    }, [inputState])

    const inputChangeHandler = (event) => {
        setCreds({...creds, [event.target.name]: event.target.value});
    }

    const onBlurHandler = (event, isValid, isRequired=true) => {
        if (!event.target.value && isRequired && isValid) setInputState({...inputState, [event.target.name]: 0});
        if (event.target.value && isRequired && isValid) setInputState({...inputState, [event.target.name]: 1});
    }

    return [creds, inputChangeHandler, onBlurHandler, inputState, setInputState];
}

export default useInputRequired;