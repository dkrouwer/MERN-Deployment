import { Link, navigate } from '@reach/router';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

const AllPirates = (props) => {
    const [pirates, setPirates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates")
            .then(res=>{
                setPirates(res.data.pirates);
                props.setLoaded(true);
                setPirates(pirates.sort((a, b) => a.name.localeCompare(b.name)))
            })
            .catch(err=>console.log(err))
            
    }, [props.loaded])
    
    const onClickHandler = (_id) => {
        axios.delete(`http://localhost:8000/api/pirates/delete/${_id}`)
        .then(res=>{
            console.log(res)
            props.setLoaded(false)
            navigate("/pirates")
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <header>
                <h1>Pirate Crew</h1>
                <Link to="/pirate/new">Add Pirate</Link>
            </header>
            <div className="mainbody">
                {pirates.map((pirate, key)=>{
                    return <div className="onepirate">
                        <h3>{pirate.name}</h3>
                        <img src={pirate.image} alt="pirate"></img>
                        <Link to={`/pirates/${pirate._id}`}>View Pirate</Link>
                        <button onClick={()=>onClickHandler(pirate._id)}>Walk the Plank</button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default AllPirates;