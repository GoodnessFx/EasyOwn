import { createHash } from 'crypto';

export interface LedgerEntry {
  id: string;
  plan_id: string;
  amount: number;
  currency: string;
  type: 'payment' | 'refund';
  timestamp: string;
  previous_hash: string | null;
}

/**
 * Computes the SHA-256 hash of a ledger entry.
 * It strictly concatenates the previous hash with the canonical string representation
 * of the entry to ensure the chain is unbroken and tamper-evident.
 */
export function computeEntryHash(entry: LedgerEntry): string {
  const dataString = JSON.stringify({
    id: entry.id,
    plan_id: entry.plan_id,
    amount: entry.amount,
    currency: entry.currency,
    type: entry.type,
    timestamp: entry.timestamp,
  });

  const contentToHash = `${entry.previous_hash || 'genesis'}|${dataString}`;
  
  return createHash('sha256').update(contentToHash).digest('hex');
}

/**
 * Verifies an entire chain of ledger entries.
 * Returns true if the chain is valid, false if there's a mismatch.
 */
export function verifyHashChain(entries: LedgerEntry[], storedHashes: string[]): boolean {
  if (entries.length !== storedHashes.length) return false;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const expectedHash = storedHashes[i];
    const computedHash = computeEntryHash(entry);
    
    if (computedHash !== expectedHash) {
      return false;
    }
  }

  return true;
}
