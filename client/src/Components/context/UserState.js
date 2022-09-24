import UserDataContext from "./UserContext";
import React, { useState } from "react";

const UserState = (props) => {

    const [user, setuser] = useState({})

    return (
        <UserDataContext.Provider>
            {props.children}
        </UserDataContext.Provider>
    )
}

export default UserState
