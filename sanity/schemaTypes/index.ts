import type { SchemaTypeDefinition } from "sanity";
import { linkItem, cta, sectionHeader, seo, footerColumn } from "./objects";
import { siteSettings, navigation, homePage } from "./singletons";
import {
  service,
  feature,
  processStep,
  highlight,
  stat,
  faq,
  page,
} from "./collections";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  linkItem,
  cta,
  sectionHeader,
  seo,
  footerColumn,
  // singletons
  siteSettings,
  navigation,
  homePage,
  // collections
  service,
  feature,
  processStep,
  highlight,
  stat,
  faq,
  page,
];
