/**
 * usePasswordStore
 *
 * Stores a memberId → password map in localStorage.
 * Kept completely separate from the Member data so the Member type stays clean.
 *
 * NOTE: Passwords are stored in plaintext here for demo purposes.
 * In production, use a proper auth backend (hashed passwords, JWTs, etc.).
 */
 
const KEY = 'fampiary_passwords';
 
function load(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
}
 
function save(map: Record<string, string>) {
  localStorage.setItem(KEY, JSON.stringify(map));
}
 
export const passwordStore = {
  /** Set a password for a member (called on signup) */
  set(memberId: string, password: string) {
    const map = load();
    map[memberId] = password;
    save(map);
  },
 
  /**
   * Verify a password.
   * Falls back to 'password' for existing seed members that have no stored password.
   */
  verify(memberId: string, password: string): boolean {
    const map = load();
    const stored = map[memberId];
    if (stored !== undefined) return stored === password;
    // Fallback for seed data: accept the default password 'password'
    return password === 'password';
  },
 
  /** Check if a member has a registered password */
  has(memberId: string): boolean {
    return load()[memberId] !== undefined;
  },
};