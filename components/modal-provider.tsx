"use client";

import { useState, useEffect } from "react";
import { ProModal } from "./pro-modal";

const ModalProvider = () => {

    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted)
        return null

    return ( 
        <>
            <ProModal />
        </>
     );
}
 
export default ModalProvider;