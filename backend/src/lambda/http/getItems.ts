import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cors } from "middy/middlewares";
import * as middy from "middy";
import { getItemsForUser } from "../../logic/items";
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event);
    const items = await getItemsForUser(userId);
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
