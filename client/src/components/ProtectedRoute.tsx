import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "./AuthForm";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!currentUser) {
    return <AuthForm />;
  }

  return <>{children}</>;
}
