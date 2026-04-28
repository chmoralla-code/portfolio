/**
 * Server-side authentication utilities.
 * Supports demo credentials for local development and
 * environment-variable-based credentials for production.
 */

import bcryptjs from "bcryptjs";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD_HASH =
  "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"; // hash of 'admin1234'

/**
 * Get the configured admin username.
 */
export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
}

/**
 * Get the configured admin password hash.
 */
export function getAdminPasswordHash(): string {
  return process.env.ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;
}

/**
 * Verify admin credentials.
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const expectedUsername = getAdminUsername();
  const expectedHash = getAdminPasswordHash();

  if (username !== expectedUsername) {
    return false;
  }

  return bcryptjs.compare(password, expectedHash);
}

/**
 * Generate a simple token (base64 encoded payload with timestamp).
 * This is a lightweight JWT alternative suitable for single-admin apps.
 */
export function generateToken(): string {
  const payload = {
    role: "admin",
    iat: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

/**
 * Verify the token format and validity.
 */
export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const payload = JSON.parse(decoded) as { role: string; iat: number };
    return payload.role === "admin" && typeof payload.iat === "number";
  } catch {
    return false;
  }
}
