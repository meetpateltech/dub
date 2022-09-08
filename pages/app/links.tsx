import AppLayout from "components/layout/app";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import LinkCard from "@/components/app/link-card";
import PlaceholderCard from "@/components/home/placeholder-card";
import { LinkProps } from "@/lib/api/types";

export default function Links() {
  const router = useRouter();

  const { data } = useSWR<LinkProps[]>(router.isReady && `/api/links`, fetcher);

  return (
    <AppLayout>
      <div className="my-10 grid grid-cols-1 gap-3">
        {data && data.length > 0
          ? data.map(({ key, url }) => (
              <LinkCard key={key} _key={key} url={url} projectLinks={false} />
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
      </div>
    </AppLayout>
  );
}
