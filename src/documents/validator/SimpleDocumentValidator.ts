import { Validator } from "../../util/validator/Validator";
import SimpleDocument from "../model/SimpleDocument.type";
import { CreateSimpleDocumentRequest } from "../types/CreateSimpleDocument.type";
import { UpdateSimpleDocumentRequest } from "../types/UpdateSimpleDocument.type";

export class SimpleDocumentValidator implements Validator<SimpleDocument> {
  create(data: CreateSimpleDocumentRequest | undefined) {
    if (data === undefined) {
      return false;
    }
    const { title, content, owner_id } = data;

    if (
      title === undefined ||
      content === undefined ||
      owner_id === undefined ||
      title.length > 255
    ) {
      return false;
    }
    return true;
  }

  update(data: UpdateSimpleDocumentRequest | undefined) {
    if (data === undefined) {
      return false;
    }
    // validate data doesn't contains properties we don't want to update like _id and updated_at
    const { title, content, owner_id } = data;
    if (
      title === undefined ||
      content === undefined ||
      owner_id === undefined ||
      title.length > 255
    ) {
      return false;
    }
    return true;
  }
}

const simpleDocumentValidator = new SimpleDocumentValidator();

export default simpleDocumentValidator;
