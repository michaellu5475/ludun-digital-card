import { DigitalCard } from "./components/DigitalCard";
import { contacts } from "./lib/contact";

export const dynamic = "force-static";

export default function Home() {
  return <DigitalCard contact={contacts.mike} />;
}
