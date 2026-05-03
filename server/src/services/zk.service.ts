import client from "../config/zookeeper";

const COUNTER_PATH = "/url-counter";

export const initCounter = async () => {
  return new Promise<void>((resolve, reject) => {
    client.exists(COUNTER_PATH, (err, stat) => {
      if (err) return reject(err);

      if (stat) return resolve(); // already exists

      client.create(
        COUNTER_PATH,
        Buffer.from("0"),
        (err) => {
          if (err) return reject(err);
          console.log("Zookeeper counter initialized");
          resolve();
        }
      );
    });
  });
};

export const getAndIncrement = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      client.getData(COUNTER_PATH, (err, data, stat) => {
        if (err) return reject(err);

        const current = parseInt(data.toString(), 10);
        const next = current + 1;

        client.setData(
          COUNTER_PATH,
          Buffer.from(next.toString()),
          stat.version, // locking
          (err) => {
            if (err) {
              // retry if version conflict
              return attempt();
            }
            resolve(current);
          }
        );
      });
    };

    attempt();
  });
};