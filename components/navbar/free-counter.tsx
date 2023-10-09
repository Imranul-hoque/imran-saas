"use client"

import { MAX_FREE_COUNTS } from "@/constants";
import { FC, useEffect } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";


interface FreeCounterProps {
    count : number | null |undefined
}

const FreeCounter: FC<FreeCounterProps> = ({ count }) => {
    
    const proModal = useProModal();
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true)
    },[]);

    if (!hasMounted) {
        return null
    }

    return ( 
        <div className="px-2">
            <div className="py-6 bg-white/10 rounded-lg px-3">
                <p className="text-sm font-bold text-center">
                    {count}/{MAX_FREE_COUNTS} total free api request
                </p>
                <Progress
                    value={(count! / MAX_FREE_COUNTS) * 100}
                    className="h-2 mt-1"
                />
                <Button onClick={proModal.onOpen} variant={"premium"} className="mt-2 w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    upgrade
                </Button>
            </div>
        </div>
     );
}
 
export default FreeCounter;