import { Address } from "viem";
import { useReadContract, useReadContracts } from "wagmi";

import Crowdfounding from "../abi/Crowdfunding.json";

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
      <h1>List of campaigns</h1>

      {campaignsLoading && <p>Loading...</p>}

      {!campaignsLoading &&
        campaigns &&
        campaigns.map((campaign, index) => {
          return <h1>Ok</h1>;
        })}
    </>
  );
}
