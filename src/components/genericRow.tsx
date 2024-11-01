import { igdb } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import DefaultCard from "./cards/defaultCard";
import GenericRowSkeleton from "./skeletons/genericRow";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface GenericRowProps {
  dataToFetch: "mostAnticipated" | "topRated" | "newReleases";
  fetchKey: string[];
  className?: string; // Optional className prop for theming
  id?: string; // Optional id for unique identification
}

const GenericRow = ({
  dataToFetch,
  fetchKey,
  className,
  id,
}: GenericRowProps) => {
  // Memoize the fetcher function to prevent unnecessary re-creations
  const fetcher = useCallback(async () => {
    const data = await igdb[dataToFetch]();
    return data;
  }, [dataToFetch]);

  const { data, isPending, error } = useQuery({
    queryKey: fetchKey,
    queryFn: fetcher,
  });

  const wantCountdown = useMemo(
    () => dataToFetch === "mostAnticipated",
    [dataToFetch]
  );

  if (isPending) return <GenericRowSkeleton />;
  if (error) return null;

  return (
    <Carousel
      className={className}
      id={id}
      opts={{
        skipSnaps: true,
      }}
    >
      <CarouselContent className="px-3">
        {!!data?.length &&
          data?.map((game) => (
            <CarouselItem
              key={game.id}
              className="
              basis-1/2
              sm:basis-1/3
              md:basis-1/4
              lg:basis-1/5
              xl:basis-[17.77%]
              2xl:basis-[13.5%]
              px-2
            "
              id={`carousel-item`}
            >
              <DefaultCard
                key={game.id}
                wantCountdown={wantCountdown}
                {...game}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};

export default GenericRow;
