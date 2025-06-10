import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function History() {
    const [vists, setVisits] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getVisits();    
    },[])

    async function getVisits(){
        const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

        try{
            const response = await fetch('http://localhost:8080/visits',{
                method: "GET",
                headers:{
                    "Content-type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            );
            console.log(response.json)
            setVisits(response.json());
        }catch(err){
            console.error(err);
        }
        
    }
  return (
    <div>
        <h2>История посещений</h2>
    </div>
  )
}
