import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { cors, httpErrorHandler } from "middy/middlewares";
import * as middy from "middy";
import { deleteItem } from "../../logic/items";
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.itemId;
    const userId = getUserId(event);
    await deleteItem(userId, itemId);
    return {
      statusCode: 202,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({}),
    };
  }
);
handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
