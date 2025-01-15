import express, { Request, Response } from "express";

import SimpleDocument from "./model/SimpleDocument.type";
import {
  CreateSimpleDocumentRequest,
  CreateSimpleDocumentResponse,
} from "./types/CreateSimpleDocument.type";
import simpleDocumentValidator from "./validator/SimpleDocumentValidator";
import { error } from "console";
import { getClient, getDB } from "../../database";
import { ObjectId } from "mongodb";
import { GetSimpleDocumentsResponse } from "./types/GetSimpleDocumentsResponse.type";
import { GetSimpleDocumentResponse } from "./types/GetSimpleDocumentResponse.type";
import { DeleteSimpleDocumentResponse } from "./types/DeleteSimpleDocument.type";
import {
  UpdateSimpleDocumentRequest,
  UpdateSimpleDocumentResponse,
} from "./types/UpdateSimpleDocument.type";

const documentRouter = express.Router();

documentRouter.post(
  "/",
  async (
    req: Request<
      unknown,
      CreateSimpleDocumentResponse,
      CreateSimpleDocumentRequest
    >,
    res: Response
  ) => {
    try {
      const { body: data } = req;

      const isValid = simpleDocumentValidator.create(data);
      if (!isValid) {
        res.status(400).send({
          error: "request data is not valid",
        });
        return;
      }

      const SimpleDocumentSchema = getDB().collection("documents");

      const documentData = {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const response = await SimpleDocumentSchema.insertOne(documentData);

      res.send({
        data: { _id: response.insertedId, documentData },
      });
    } catch (error) {
      console.error(error);
    }
  }
);

documentRouter.get(
  "/",
  async (req: Request<unknown, GetSimpleDocumentsResponse, unknown>, res) => {
    const SimpleDocumentSchema =
      getDB().collection<SimpleDocument>("documents");

    // TODO: add pagination and sorting
    const documents = await SimpleDocumentSchema.find({}).toArray();

    res.send({
      data: documents,
    });
  }
);

documentRouter.get(
  "/:id",
  async (
    req: Request<{ id: string }, GetSimpleDocumentResponse, unknown>,
    res
  ) => {
    try {
      const { params } = req;
      const { id } = params;
      if (id === undefined) {
        res.status(404).send({
          error: "Unable to locate resource.",
        });
        return;
      }
      const SimpleDocumentSchema =
        getDB().collection<SimpleDocument>("documents");

      // TODO: add pagination and sorting
      const document = await SimpleDocumentSchema.findOne({
        _id: new ObjectId(id),
      });

      if (document === null) {
        res.status(404).send({
          error: "Unable to locate resource.",
        });
        return;
      }

      res.send({
        data: document,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

documentRouter.put(
  "/:id",
  async (
    req: Request<
      { id: string },
      UpdateSimpleDocumentResponse,
      UpdateSimpleDocumentRequest
    >,
    res: Response
  ) => {
    const session = getClient().startSession();
    try {
      session.startTransaction();
      // validation

      const { body: data, params } = req;
      const { id } = params;
      const isValid = simpleDocumentValidator.update(data);
      if (!isValid) {
        res.status(400).send({
          error: "request data is not valid",
        });
        return;
      }

      const SimpleDocumentSchema =
        getDB().collection<SimpleDocument>("documents");

      const documentData = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      console.log("🚀 ~ documentData:", documentData);

      const response = await SimpleDocumentSchema.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: documentData},
        {
          session,
        }
      );

      console.log("🚀 ~ response:", response);
      res.send({
        data: response,
      });
      session.commitTransaction();
    } catch (error) {
      console.error(error);
      session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
);

documentRouter.delete(
  "/:id",
  async (
    req: Request<{ id: string }, DeleteSimpleDocumentResponse, unknown>,
    res
  ) => {
    try {
      const { params } = req;
      const { id } = params;
      if (id === undefined) {
        res.status(404).send({
          error: "Unable to locate resource.",
        });
        return;
      }
      const SimpleDocumentSchema =
        getDB().collection<SimpleDocument>("documents");

      await SimpleDocumentSchema.deleteOne({
        _id: new ObjectId(id),
      });

      res.send({ data: { success: true } });
    } catch (error) {
      console.error(error);
    }
  }
);

export default documentRouter;
