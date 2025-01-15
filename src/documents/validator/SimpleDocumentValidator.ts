import { Validator } from "../../util/validator/Validator";
import SimpleDocument from "../model/SimpleDocument.type";
import { CreateSimpleDocumentRequest } from "../types/CreateSimpleDocument.type";

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

  update(data: SimpleDocument | undefined) {
    if (data === undefined) {
      return false;
    }
    return true;
  }
}

const simpleDocumentValidator = new SimpleDocumentValidator();

export default simpleDocumentValidator;
