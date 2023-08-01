import React from "react";

import { useGetGeographyQuery } from "@/lib/api";
import { Heading } from "@/components/heading";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "@/lib/geoData.js";

const Geography = () => {
  const { data } = useGetGeographyQuery();

  return (
    <div>
      <Heading
        title="Nostr Relay Location"
        icon="Globe"
        description="Visualize the location of current Nostr relays"
      />
      <div className="mt-4 h-[75vh] border-1 rounded-md">
        {data ? (
          <ResponsiveChoropleth
            data={data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: "#777777",
                  },
                },
                legend: {
                  text: {
                    fill: "#777777",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#777777",
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "#777777",
                  },
                },
              },
              legends: {
                text: {
                  fill: "#777777",
                },
              },
              tooltip: {
                container: {
                  color: "#999999",
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#777777",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#aaaaaa",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
};

export default Geography;
