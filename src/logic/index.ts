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

const getDeveloper = async (req: Request, res: Response) => {
  const id = req.params.id;

  const queryString = {
    text: "SELECT id FROM developers WHERE email = $1 JOIN COLUMN developers_info WHERE id = $1",
    values: [id],
  };
};

const createDeveloperInfo = async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;

  body.developerId = id;

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

  return res.status(201).json(queryResult.rows[0]);
};

export { createDeveloper, createDeveloperInfo, getDeveloper };
