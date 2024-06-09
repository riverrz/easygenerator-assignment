import { Spinner } from "@/components/ui/spinner";
import { useUser } from "../user/hooks/useUser";

export const HomePage = () => {
  const { isFetching, data } = useUser();

  return (
    <main>
      {isFetching ? (
        <div className="mt-8 flex justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <h1>Welcome to the application, {data?.name}!</h1>
      )}
    </main>
  );
};
