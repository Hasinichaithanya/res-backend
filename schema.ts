import { Schema, model } from "mongoose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface phoneNumber {
  number: Number;
  request_id: String;
  created_at: Number;
  is_verified: Boolean;
}

interface Email {
  mail: string;
  request_id: String;
  created_at: Number;
  is_verified: Boolean;
}

const phoneNumberSchema = new Schema<phoneNumber>(
  {
    number: { type: Number, required: true },
    request_id: { type: String, required: true },
    is_verified: Boolean,
  },
  { timestamps: { createdAt: "created_at" } }
);

const mailSchema = new Schema<Email>(
  {
    mail: {
      type: String,
      required: true,
      validate: {
        validator: function (mail) {
          return mail.match(emailRegex);
        },
        message: "Please provide valid e-mail address",
      },
    },
    request_id: { type: String, required: true },
    is_verified: Boolean,
  },
  { timestamps: { createdAt: "created_at" } }
);

const PhoneNumber = model<phoneNumber>("PhoneNumber", phoneNumberSchema);
const Mail = model<Email>("Mail", mailSchema);

module.exports = {
  PhoneNumber: PhoneNumber,
  Mail: Mail,
};
