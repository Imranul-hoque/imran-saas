import { MAX_FREE_COUNTS } from "@/constants";
import { prismadb } from "./prismadb";
import { auth } from "@clerk/nextjs";
const increaseCounter = async () => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }
    const counter = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    if (counter) {
        await prismadb.userApiLimit.update({
            where: {
                userId : userId
            },
            data: { 
                count : counter.count + 1
             }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId: userId,
                count : 1
            }
        })
    }
}

const checkoutCounter = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }
   
    const apiCounter = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    if (!apiCounter || apiCounter.count < MAX_FREE_COUNTS) {
        return true
    } else {
        false
    }
}

const getApiLimit = async () => {
    const { userId } = auth()

    if (!userId) {
        return null
    }
    const counter = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    return counter?.count
}

export { increaseCounter, checkoutCounter, getApiLimit }