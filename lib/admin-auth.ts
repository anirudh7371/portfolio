import { auth } from "@/lib/auth";

export async function getAdminSession() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  if (session.user.role !== "ADMIN") {
    return null;
  }

  return session;
}
