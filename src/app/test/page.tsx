import ClientComponent from "./ClientComponent";

// ** Types
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Test({ searchParams }: Props) {
  return (
    <div className="flex flex-col space-y-4">
      <span>
        <ClientComponent />
      </span>
      <span>{JSON.stringify(searchParams)}</span>
    </div>
  );
}
