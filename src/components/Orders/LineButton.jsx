import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import Line from './Line';

const LineButton = ({OrderId}) => {
    const [showContent, setShowContent] = useState(false);
    const [info, setInfo] = useState([]);
    
    useEffect(() => {
        fetch('http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/info/' + OrderId)
            .then((res) => res.json())
            .then((data) => {
                console.log("Info[0]", data.info[0]);
                setInfo(data.info[0])


            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    const handleClick = () => {
        setShowContent(!showContent);
    };

    // const showLine = () => {
    //     return (
    //         info.map((item) => {
    //             return (
    //                 <div>
    //                     <p>{item.name}</p>
    //                 </div>

    //             )
    //         }))
    // }

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
            {showContent && <div><Line info={info} /></div>}
        </div>
    );

}

export default LineButton