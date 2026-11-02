/**
 * OPTRAQ - Hardcoded Admin Security Configuration
 * 
 * Strict access control: Only users whose email is explicitly listed in
 * HARDCODED_ADMIN_EMAILS can access administrative routes or features.
 * Regular users can NEVER escalate to admin.
 */

export const HARDCODED_ADMIN_EMAILS = Object.freeze([
  'admin@optraq.ai',
  'akshat@optraq.ai',
  // You can add your personal administrative email below:
  'admin@gmail.com',
]);

/**
 * Checks whether the currently authenticated user has admin privileges.
 * @param {Object|null} user - The auth user object from AuthContext
 * @returns {boolean} True only if user email matches the hardcoded whitelist
 */
export function isUserAdmin(user) {
  if (!user || typeof user !== 'object') return false;
  const email = (user.email || '').toLowerCase().trim();
  if (!email) return false;
  return HARDCODED_ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase().trim() === email);
}

export default {
  HARDCODED_ADMIN_EMAILS,
  isUserAdmin,
};
