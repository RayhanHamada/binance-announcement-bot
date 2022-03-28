import { createHash } from 'crypto';

export default function genSha256(data: string) {
  const hash = createHash('sha256');

  return hash.update(data).digest('hex');
}
