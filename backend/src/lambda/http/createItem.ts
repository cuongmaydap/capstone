import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";
import { CreateItemRequest } from "../../requests/CreateItemRequest";
import { getUserId } from "../utils";
import { createItem } from "../../logic/items";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newItem: CreateItemRequest = JSON.parse(event.body);
    const userId = getUserId(event);
    const item = await createItem(userId, newItem);
    return {
      statusCode: 201,
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
