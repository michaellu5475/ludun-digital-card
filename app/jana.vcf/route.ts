import { contacts, createVCardResponse } from "../lib/contact";

export async function GET() {
  return createVCardResponse(contacts.jana);
}
