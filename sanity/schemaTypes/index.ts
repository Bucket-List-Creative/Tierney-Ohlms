import type { SchemaTypeDefinition } from "sanity";
import {
  linkItem,
  cta,
  sectionHeader,
  seo,
  footerColumn,
  founder,
  practiceExample,
} from "./objects";
import { siteSettings, navigation, homePage, aboutPage} from "./singletons";
import {
  service,
  feature,
  processStep,
  highlight,
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
  practiceExample,
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
  faq,
  page,
];
