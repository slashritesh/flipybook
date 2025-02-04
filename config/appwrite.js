import { Account, Client, Databases, Storage } from "node-appwrite";
import { appwrite as config } from "./index";

const createAdminClient = () => {
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.key);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

const createClientSideClient = () => {
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)


  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};



export { createAdminClient ,createClientSideClient};
