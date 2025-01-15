import { ApiResponse } from "../../types/ApiResponse.type";
import SimpleDocument from "../model/SimpleDocument.type";

export type CreateSimpleDocumentRequest = Omit<SimpleDocument, "_id">;
export type CreateSimpleDocumentResponse = ApiResponse<SimpleDocument>;
