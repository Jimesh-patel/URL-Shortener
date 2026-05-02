import zookeeper from "node-zookeeper-client";

const client = zookeeper.createClient(process.env.ZK_URL || "localhost:2181");

export const connectZookeeper = () => {
  return new Promise<void>((resolve) => {
    client.once("connected", () => {
      console.log("Zookeeper connected");
      resolve();
    });

    client.connect();
  });
};

export default client;