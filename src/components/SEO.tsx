import { useEffect } from "react";
import { setCanonical, setJsonLd, upsertMeta } from "../lib/head";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  canonical?: string;
  noindex?: boolean;
  jsonLd?: object;
};

export default function SEO({
  title = "TECHIC — Where skill becomes art",
  description = "Producción creativa y dirección visual para marcas, artistas y creadores.",
  image,
  url,
  canonical,
  noindex,
  jsonLd
}: Props) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) upsertMeta("name", "description", description);
    if (noindex) upsertMeta("name", "robots", "noindex,nofollow");

    if (title) upsertMeta("property", "og:title", title);
    if (description) upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    if (url) upsertMeta("property", "og:url", url);
    if (image) upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", "summary_large_image");
    if (title) upsertMeta("name", "twitter:title", title);
    if (description) upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    if (canonical) setCanonical(canonical);
    if (jsonLd) setJsonLd(jsonLd);
  }, [title, description, image, url, canonical, noindex, jsonLd]);

  return null;
}
