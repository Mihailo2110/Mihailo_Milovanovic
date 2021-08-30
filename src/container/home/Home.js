import React from 'react'
import Profile from '../../components/home/Profile'

export default function Home(props) {
    return(
        <div>
            <Profile firstname={"Petar"} lastname={"Dulovic"} email={"petar.dulovic7@gmail.com"} />
        </div>
    )
}