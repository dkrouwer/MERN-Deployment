import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from '@reach/router';


const SinglePirate = (props) => {
    const [pirate, setPirate] = useState({});

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/pirates/${props.id}`)
        .then(res=>{
            setPirate(res.data.pirate);
            props.setLoaded(false)
        })
        .catch(err=>console.log(err))
    }, [props.id])

    return (
        <div>
            <header>
                <h1>{pirate.name}</h1>
                <Link to="/pirates">Crew Board</Link>
            </header>
            <div className="mainbody">
                <img src={pirate.image} alt="pirate"/>
                <h2>"{pirate.catch_phrase}"</h2>
                <div>
                    <h4>About</h4>
                    <p>Position: {pirate.position}</p>
                    <p>Treasures: {pirate.treasures}</p>
                    <p>Peg Leg: {pirate.pegleg ? "Yes" : "No"}</p>
                    <p>Eye Patch: {pirate.eyepatch ? "Yes" : "No"}</p>
                    <p>Hook Hand: {pirate.hookhand ? "Yes" : "No"}</p>
                </div>
            </div>
            
        </div>
    )
}

export default SinglePirate;