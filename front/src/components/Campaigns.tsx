import { Address } from "viem";
import { useReadContract, useReadContracts } from "wagmi";

import Crowdfounding from "../abi/Crowdfunding.json";
import CampaignContainer from "./CampaignContainer";

export default function Campaigns() {
  const { data: lastCampaignId, isLoading: lastCampaignIdLoading } =
    useReadContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: Crowdfounding.abi,
      functionName: "campaignId",
      args: [],
    });

  const { data: campaigns, isLoading: campaignsLoading } = useReadContracts({
    contracts: Array.from({ length: Number(lastCampaignId) }).map(
      (_, index) => ({
        address: process.env.NEXT_PUBLIC_CONTRACT as Address,
        abi: Crowdfounding.abi,
        functionName: "campaigns",
        args: [index],
      }),
    ),
  });

  console.log(campaigns);

  return (
    <>
      <section>
        <div className="container mx-auto pt-10">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-center">
            List of campaigns
          </h1>

          <div className="pt-5">
            {campaignsLoading && <p>Loading...</p>}

            {!campaignsLoading &&
              campaigns &&
              campaigns.map((campaign, index) => {
                return (
                  <CampaignContainer
                    key={index}
                    index={index}
                    campaign={campaign.result as string[]}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
