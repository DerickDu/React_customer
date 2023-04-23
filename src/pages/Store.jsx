import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Stores/Card';
const Store = () => {
    const [store, setStore] = useState([])
    useEffect(() => {
        axios.get('http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/stores/')
            .then((res) => {
                setStore(res.data.data)
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    return (
        store.map((item) => {
            console.log('sample item', item)
            return (
                <Card raised={true} sx={{ bgcolor: "#E8E8E8" }} key={item.storeId} item={item} />
            )
        }))
}

export default Store