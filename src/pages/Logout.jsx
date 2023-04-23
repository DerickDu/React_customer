import React from 'react'

const Logout = () => {
    localStorage.setItem('login', false)
    return (

        <div>Logout Successfully</div>
    )
}

export default Logout