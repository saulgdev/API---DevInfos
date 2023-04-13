import { Request, Response } from "express";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const createDeveloper = async (req: Request, res: Response) => {
  const body = req.body;

  const queryString: string = format(
    `INSERT INTO
            developers(%I)
        VALUES
            (%L)
        RETURNING *;`,
    Object.keys(body),
    Object.values(body)
  );

  const queryResult: QueryResult = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const getDeveloperById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const queryResult: QueryResult = await client.query({
    text: "SELECT * FROM developers LEFT JOIN developer_infos ON developers.id = developer_infos.developer_id WHERE developers.id = $1",
    values: [id],
  });

  const { name, email, developerSince, preferredOS, developer_id } =
    queryResult.rows[0];

  const resposta = {
    developerId: developer_id,
    developerName: name,
    developerEmail: email,
    developerInfoDeveloperSince: developerSince,
    developerInfoPreferredOS: preferredOS,
  };

  return res.status(200).json(resposta);
};

const createDeveloperInfo = async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;
  console.log(body);

  body.developer_id = id;

  const queryString: string = format(
    `INSERT INTO
              developer_infos(%I)
          VALUES
              (%L)
          RETURNING *;`,
    Object.keys(body),
    Object.values(body)
  );

  const queryResult: QueryResult = await client.query(queryString);
  console.log(queryResult.rows[0]);

  return res.status(201).json(queryResult.rows[0]);
};

export { createDeveloper, createDeveloperInfo, getDeveloperById };
