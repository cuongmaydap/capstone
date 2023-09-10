import { CreateItemRequest } from "../requests/CreateItemRequest";
import * as uuid from "uuid";
import { ItemAccess } from "../dataAccess/inventoryDB";
import { AttachmentUtils } from "../helpers/attachmentUtils";
import { UpdateItemRequest } from "../requests/UpdateItemRequest";

const attachmentUtils = new AttachmentUtils();
const itemAccess = new ItemAccess();

export const getItemsForUser = async (userId: string) => {
  return itemAccess.getItems(userId);
};

export const createItem = async (userId: string, item: CreateItemRequest) => {
  const itemId = uuid.v4();
  const attachmentUrl = attachmentUtils.getAttachmentUrl(itemId);
  return itemAccess.createItem({
    userId,
    itemId,
    createdAt: new Date().toISOString(),
    attachmentUrl,
    ...item,
  });
};

export const updateItem = async (
  userId: string,
  itemId: string,
  item: UpdateItemRequest
) => {
  return itemAccess.updateItem(userId, itemId, item);
};

export const deleteItem = async (userId: string, itemId: string) => {
  return itemAccess.deleteItem(userId, itemId);
};
