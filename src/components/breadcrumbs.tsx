import Link from "next/link";
import JsonLd from "@/components/json-ld";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/routes";
import { breadcrumbGraph } from "@/lib/structured-data";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus its BreadcrumbList schema. The last item is the current page. */
export default function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const trail = [{ name: ui[locale].breadcrumbs.home, path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbGraph(trail, locale)} />
      <nav className="breadcrumbs" aria-label={ui[locale].breadcrumbs.label}>
        <ol>
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.path}>
                {isLast ? <span aria-current="page">{crumb.name}</span> : <Link href={localizePath(crumb.path, locale)}>{crumb.name}</Link>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
