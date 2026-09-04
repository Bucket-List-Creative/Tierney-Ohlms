/**
 * Renders a heading with one phrase wrapped in the gold gradient <em>.
 *
 * The emphasised phrase can't be derived — the homepage emphasises the last
 * two words in some sections and a middle word in others — so it's authored in
 * Sanity alongside the heading. The gradient class stays a caller decision
 * because it depends on the section's ground, not on the content.
 *
 * Degrades to plain text when `emphasis` is absent or isn't found in `text`,
 * so a heading edited in the Studio never renders broken.
 */
export function EmphasisText({
  text,
  emphasis,
  className = "gradient-text",
}: {
  text: string;
  emphasis?: string;
  className?: string;
}) {
  if (!emphasis) return <>{text}</>;

  const at = text.indexOf(emphasis);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <em className={className}>{emphasis}</em>
      {text.slice(at + emphasis.length)}
    </>
  );
}
