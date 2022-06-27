/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

const OrderInfoContext = React.createContext({
    order: [],
    setOrder: () => {}
});

export default OrderInfoContext;