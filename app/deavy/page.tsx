import { DigitalCard } from "../components/DigitalCard";
import { contacts } from "../lib/contact";
import { contactMetadata } from "../lib/contact-metadata";

export const metadata = contactMetadata(contacts.deavy, "/deavy");

export default function DeavyCard() {
  return <DigitalCard contact={contacts.deavy} />;
}
