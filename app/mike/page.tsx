import { DigitalCard } from "../components/DigitalCard";
import { contactMetadata } from "../lib/contact-metadata";
import { contacts } from "../lib/contact";

export const dynamic = "force-static";
export const metadata = contactMetadata(contacts.mike, "/mike");

export default function MikePage() {
  return <DigitalCard contact={contacts.mike} />;
}
