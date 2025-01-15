import { ApiResponse } from "../../types/ApiResponse.type";
import SimpleDocument from "../model/SimpleDocument.type";

export type UpdateSimpleDocumentRequest = Omit<SimpleDocument, "_id" | "created_at" | "updated_at">;
export type UpdateSimpleDocumentResponse = ApiResponse<SimpleDocument>;
