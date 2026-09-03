import { DigitalCard } from "../components/DigitalCard";
import { contacts } from "../lib/contact";
import { contactMetadata } from "../lib/contact-metadata";

export const dynamic = "force-static";
export const metadata = contactMetadata(contacts.jana, "/jana");

export default function JanaCard() {
  return <DigitalCard contact={contacts.jana} />;
}
