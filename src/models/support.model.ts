import { SupportTypes } from '../types';
import mongoose, { model, Schema } from "mongoose";


const supportSchema = new Schema<SupportTypes>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });


supportSchema.index( { "expire": 1 }, { expireAfterSeconds: 864000 } );

const supportModelFunction = () => {
    return mongoose.models && mongoose.models.Support
      ? mongoose.models.Support as mongoose.Model<SupportTypes>
      : model<SupportTypes>("Support", supportSchema);
  };

const supportModel = supportModelFunction();

export { supportModel } ;