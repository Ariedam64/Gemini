import truncate from 'lodash/truncate';

const DefaultPlayerNameTruncationLength = 12;

export function truncatePlayerName(
  name: string,
  length: number = DefaultPlayerNameTruncationLength
) {
  return truncate(name, { length });
}
