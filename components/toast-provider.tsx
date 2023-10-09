"use client"

import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";


const ToastProvider = () => {

    const [hasMounted, setHasmounted] = useState(false);
    useEffect(() => {
        setHasmounted(true)
    }, []);

    if (!hasMounted) {
        return null
    }

    return ( 
        <Toaster />
     );
}
 
export default ToastProvider;