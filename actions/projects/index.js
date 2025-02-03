'use server'
import { appwrite } from '@/config'
import { createAdminClient } from '@/config/appwrite'
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'


export const getAllProjects = async ()=>{
    try {
        const {isAuthenticated} = getKindeServerSession()
        const {databases} = createAdminClient()
        const {collectionID,databaseID} = appwrite

        if (!isAuthenticated) {
            return {error : 'user not authenticated!'}
        }

        const res = await databases.listDocuments(databaseID,collectionID,[])

        console.log(res);
        

    } catch (error) {
        console.log(error);
        
    }
}