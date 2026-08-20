import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const SINGLETONS = ["siteSettings", "navigation", "homePage", "aboutPage"];

/**
 * Desk structure: singletons at the top (edit-in-place, not creatable as
 * lists), then the drag-orderable collections, then plain document lists.
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Navigation")
        .id("navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
      .title("Our Story page")
      .id("aboutPage")
      .child(S.document().schemaType("aboutPage").documentId("aboutPage")),

      S.divider(),
      orderableDocumentListDeskItem({
        type: "service",
        title: "Services",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "feature",
        title: "Features (Why us)",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "highlight",
        title: "Highlights",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "stat",
        title: "Statistics",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQ",
        S,
        context,
      }),
      S.documentTypeListItem("processStep").title("Process steps"),

      S.divider(),

      S.documentTypeListItem("page").title("Pages"),
    ]);

/** Keep singletons out of the global "create new" menu. */
export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = new Set(SINGLETONS);
