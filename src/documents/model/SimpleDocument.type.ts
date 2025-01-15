import { ObjectId } from "mongodb";

export default interface SimpleDocument {
    _id: ObjectId
    title: string;
    content: string;
    owner_id: ObjectId;
    created_at: string;
    updated_at: string;
}