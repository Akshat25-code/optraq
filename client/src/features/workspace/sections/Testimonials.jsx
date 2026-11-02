/* Testimonials render nothing until real quotes exist.
   See NEEDS.md: 3 quotes, each ≤3 lines with name + role + company.
   No invented quotes ship — ever. */
const DATA = [];

export default function Testimonials() {
  if (DATA.length === 0) return null;
  return (
    <section aria-label="Testimonials">
      <div className="sec">
        <p className="eyebrow">Loved by teams</p>
        <div>
          {DATA.map((t) => (
            <figure key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>{t.name}, {t.role}, {t.company}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
