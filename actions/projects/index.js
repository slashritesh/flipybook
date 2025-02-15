"use server";
import { appwrite } from "@/config";
import { createAdminClient } from "@/config/appwrite";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Query } from "node-appwrite";

export const getAllProjects = async () => {
  try {
    const { isAuthenticated,getUser } = getKindeServerSession();
    const { databases } = createAdminClient();
    const { collectionID, databaseID } = appwrite;

    const user = await getUser()

    if (!isAuthenticated) {
      return { error: "user not authenticated!" };
    }

    const res = await databases.listDocuments(databaseID, collectionID, [Query.equal('userid',[user.id])]);

    return res;
  } catch (error) {
    console.log(error);
  }
};
