// Plain hand-written types mirroring the User model in prisma/schema.prisma.
// Kept independent of @prisma/client on purpose so they don't break when the
// generated client is out of date.

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Sign-up payload (better-auth's POST /api/auth/sign-up/email).
// `password` is not a User column — better-auth hashes it onto Account.
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  image?: string;
}

// Only the profile fields are editable here. Email goes through
// /change-email, password through /change-password.
export interface UpdateUserDTO {
  name?: string;
  image?: string | null;
}
