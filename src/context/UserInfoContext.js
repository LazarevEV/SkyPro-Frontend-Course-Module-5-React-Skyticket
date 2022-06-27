/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

const UserInfoContext = React.createContext({
    user: {
        email: null,
        phone: null,
        name: null,
    },
    setUser: () => {}
});

export default UserInfoContext;