export type PageSnapshot = {
  url: string | null;
  title: string | null;
};

export type PageSnapshotProvider = () => PageSnapshot;

export function emptyPageSnapshot(): PageSnapshot {
  return {
    url: null,
    title: null,
  };
}

export function createPageSnapshot(
  url: string | null,
  title: string | null,
): PageSnapshot {
  return {
    url,
    title,
  };
}
