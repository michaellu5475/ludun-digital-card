import { DigitalCard } from "./components/DigitalCard";
import { contacts } from "./lib/contact";

export default function Home() {
  return <DigitalCard contact={contacts.mike} />;
}
