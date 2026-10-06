import { executeQuery } from "./utilities/dbClient";

async function main(prams: string) {
    const query = "SELECT * FROM `oc_customer` WHERE firstname = ?";
    const result = await executeQuery(query, [prams]);
    const size = result[0] as any[];
    console.log(size.length);
}

main("Ronak");