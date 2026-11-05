import { useApp } from '../../context/useApp';
import type { SourceReference } from '../../types/sourceReference';
import es from './locales/es.json';
import va from './locales/va.json';
import en from './locales/en.json';

const dictionaries = { es, va, en };

export interface SourceMetadataProps {
  /** Absent for sources returned by a backend predating UT 924. */
  source?: SourceReference;
}

export function SourceMetadata({ source }: SourceMetadataProps) {
  const { lang } = useApp();
  if (!source) return null;
  const labels = dictionaries[lang];
  const parsedDate = source.date ? new Date(source.date) : null;
  const hasDate = parsedDate !== null && Number.isFinite(parsedDate.getTime());
  const formattedDate = hasDate
    ? new Intl.DateTimeFormat(lang === 'va' ? 'ca' : lang, { dateStyle: 'medium', timeZone: 'UTC' }).format(parsedDate)
    : null;

  return (
    <div className="mt-2 space-y-1 text-small break-words text-ink-2">
      <p className="font-semibold">{labels[source.scope]}</p>
      <p>{labels.provider}: {source.provider || labels.unknownProvider}</p>
      {formattedDate && (
        <p>{labels[source.dateType ?? 'date']}: <time dateTime={source.date!}>{formattedDate}</time></p>
      )}
      {source.version && <p>{labels.version}: {source.version}</p>}
      {!formattedDate && !source.version && <p>{labels.unknownDate}</p>}
    </div>
  );
}
