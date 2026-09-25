import { notFound } from "next/navigation";

/** With two root layouts there is no single global 404, so unmatched URLs land here and render this tree's not-found.tsx. */
export default function CatchAll() {
  notFound();
}
