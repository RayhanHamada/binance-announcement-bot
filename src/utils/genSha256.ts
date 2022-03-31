import { createHash } from 'crypto';

export default function genSha256(data: string) {
  return createHash('sha256').update(data).digest('hex');
}
