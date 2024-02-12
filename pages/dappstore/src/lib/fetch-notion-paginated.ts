// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const fetchNotionPaginated = async <T>(
  fetcher: (cursor: string | undefined) => Promise<{
    results: T[];
    next_cursor: string | null;
  }>,
) => {
  const results = [];
  let nextCursor: string | undefined = undefined;

  do {
    const { results: newResults, next_cursor: newNextCursor } =
      await fetcher(nextCursor);
    results.push(...newResults);
    if (newNextCursor === nextCursor) {
      throw new Error("Notion API returned the same next_key");
    }

    nextCursor = newNextCursor ?? undefined;
  } while (nextCursor);
  return results;
};
