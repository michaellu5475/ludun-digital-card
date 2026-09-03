import { DigitalCard } from "../components/DigitalCard";
import { contacts } from "../lib/contact";
import { contactMetadata } from "../lib/contact-metadata";

export const dynamic = "force-static";
export const metadata = contactMetadata(contacts.chloe, "/chloe");

export default function ChloeCard() {
  return <DigitalCard contact={contacts.chloe} />;
}
