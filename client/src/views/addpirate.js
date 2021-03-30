import React, { useState } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

const AddPirate = (props) => {
    const position_options = ["Captain", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey",];

    const [form, setForm] = useState({
        "name": "",
        "image": "",
        "treasures": 0,
        "catch_phrase": "",
        "position": position_options[0],
        "pegleg": true,
        "eyepatch": true,
        "hookhand": true
    })

    const [errors, setErrors] = useState({});

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onPegHandler = (e) => {
        setForm({
            ...form,
            "pegleg": !form.pegleg
        })
    }
    const onEyeHandler = (e) => {
        setForm({
            ...form,
            "eyepatch": !form.eyepatch
        })
    }
    const onHookHandler = (e) => {
        setForm({
            ...form,
            "hookhand": !form.hookhand
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/pirates/new", form)
            .then(res=>{
                console.log(res)
                if(res.data.pirate){
                    props.setLoaded(false);
                    console.log("Preparing to navigate")
                    navigate("/pirates");
                }
                else {
                    setErrors(res.data.error.errors);
                }
            })
            .catch(err=> console.log(err))
    }

    const onReturnHome = (e) => {
        props.setLoaded(false)
    }

    return(
        <div>
            <header>
                <h1>Add a pirate</h1>
                <Link to="/pirates" onClick={onReturnHome}>Crew Board</Link>
            </header>
            <div className="mainbody">
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="name">Name: </label>
                    <input name="name" type="text" onChange={onChangeHandler}/><br></br>
                    {
                        form.name.length < 3 && form.name.length !=0 ? <span>Name must be 3 or more characters</span> : ""
                    }
                    {errors.name && <span>{errors.name.message}</span>}<br></br>

                    <label htmlFor="image">Image URL: </label>
                    <input name="image" type="text" onChange={onChangeHandler}/><br></br>
                    {errors.image && <span>{errors.image.message}</span>}<br></br>

                    <label htmlFor="treasures">Treasures: </label>
                    <input name="treasures" type="number" placeholder="0" onChange={onChangeHandler}/><br></br>
                    {
                        form.treasures <=0 ? <span>You are one POOR pirate!</span> : ""
                    }
                    {errors.treasures && <span>{errors.treasures.message}</span>}<br></br>

                    <label htmlFor="catch_phrase">Catch Phrase: </label>
                    <input name="catch_phrase" type="text" onChange={onChangeHandler}/><br></br>
                    {
                        form.catch_phrase.length < 3 && form.catch_phrase.length !=0 ? <span>Catch phrase must be 3 or more characters</span> : ""
                    }
                    {errors.catch_phrase && <span>{errors.catch_phrase.message}</span>}<br></br>

                    <label htmlFor="position">Position: </label>
                    <select name="position" onChange={onChangeHandler}>
                        {
                            position_options.map((position, key)=>{
                                return <option value={position}>{position}</option>
                            })
                        }
                    </select><br></br>
                    {errors.position && <span>{errors.position.message}</span>}<br></br>

                    <label htmlFor="pegleg">Peg Leg: </label>
                    <input name="pegleg" type="checkbox" onChange={onPegHandler} defaultChecked/><br></br>

                    <label htmlFor="eyepatch">Eye Patch: </label>
                    <input name="eyepatch" type="checkbox" onChange={onEyeHandler} defaultChecked/><br></br>

                    <label htmlFor="hookhand">Hook Hand: </label>
                    <input name="hookhand" type="checkbox" onChange={onHookHandler} defaultChecked/><br></br>

                    <button type="submit">Add to Crew</button>
                </form>
            </div>
        </div>
    )
}
export default AddPirate;