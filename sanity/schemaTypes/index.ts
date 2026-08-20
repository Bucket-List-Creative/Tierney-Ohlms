import type { SchemaTypeDefinition } from "sanity";
import { linkItem, cta, sectionHeader, seo, footerColumn, founder } from "./objects";
import { siteSettings, navigation, homePage, aboutPage} from "./singletons";
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
  founder,
  // singletons
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  // collections
  service,
  feature,
  processStep,
  highlight,
  stat,
  faq,
  page,
];
