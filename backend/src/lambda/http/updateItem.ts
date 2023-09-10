import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { UpdateItemRequest } from "../../requests/UpdateItemRequest";
import { getUserId } from "../utils";
import { updateItem } from "../../logic/items";
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.itemId;
    const updatedItem: UpdateItemRequest = JSON.parse(event.body);
    const userId = getUserId(event);
    const item = await updateItem(userId, itemId, updatedItem);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item),
    };
  }
);
handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
