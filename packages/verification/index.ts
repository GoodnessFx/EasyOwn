import crypto from 'crypto';

export function hashEntry(entryData: string, previousHash: string | null): string {
    const hash = crypto.createHash('sha256');
    hash.update(entryData);
    if (previousHash) {
        hash.update(previousHash);
    }
    return hash.digest('hex');
}

export async function anchorRootHash(rootHash: string): Promise<string> {
    // Stub for Base contract interaction
    console.log(`Anchoring root hash ${rootHash} to Base...`);
    return `tx_${Date.now()}_stub`;
}
