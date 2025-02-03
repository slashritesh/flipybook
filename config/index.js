

export const appwrite = {
    key : process.env.NEXT_PUBLIC_APPWRITE_KEY,
    endpoint : process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId : process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseID : process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER,
    collectionID : process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PROJECTS,
    buckets : {
        pdfs : '679fa416003b1996fad5'
    }
}