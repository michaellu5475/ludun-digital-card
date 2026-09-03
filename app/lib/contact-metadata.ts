import type { Metadata } from "next";
import type { Contact } from "./contact";

export function contactMetadata(contact: Contact, pathname: string): Metadata {
  const title = `${contact.name} | LUDUN Group Digital Business Card`;
  const description = `Call, email, find an office, or save ${contact.name}'s contact details.`;

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description,
      type: "profile",
      url: pathname,
      images: [],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [],
    },
  };
}
