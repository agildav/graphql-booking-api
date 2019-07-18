import { getDatabase } from "../../setup/db/db";

export function findShark() {
  return {
    id: "shark id",
    name: "shark name",
    bname: "shark bname",
    description: "shark description",
    image: "shark image"
  };
}

export function findAllSharks(): Promise<any> {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const sharks = db.select("*").from("sharks");

    if (sharks) {
      resolve(sharks);
    }
    reject();
  });
}
