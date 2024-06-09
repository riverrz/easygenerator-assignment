import { Spinner } from "@/components/ui/spinner";
import { useUser } from "../user/hooks/useUser";
import { Button } from "@/components/ui/button";
import { logout } from "@/modules/auth/services/auth.service";

export const HomePage = () => {
  const { isFetching, data } = useUser();

  const handleLogout = () => {
    return logout();
  };

  return (
    <main className="flex justify-center p-8">
      {isFetching ? (
        <div>
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <div>
          <h1>Welcome to the application, {data?.name}!</h1>
          <div className="mt-4 text-center">
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};
