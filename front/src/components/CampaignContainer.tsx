import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Progress,
  Input,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import { Address, formatEther, parseEther } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import Crowdfounding from "../abi/Crowdfunding.json";

export default function CampaignContainer({
  index,
  campaign,
  detail = false,
  milestones = [],
  campaignContribution,
}: {
  index: number;
  campaign: string[];
  detail?: boolean;
  milestones?: any[];
  campaignContribution?: number;
}) {
  const [inputAmount, setInputAmount] = useState(0);

  const { isConnected } = useAccount();

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const showDescription = (content: string) => {
    if (detail) {
      return content;
    }
    return content.substring(0, 500);
  };

  const contributeCall = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: Crowdfounding.abi,
      functionName: "donation",
      args: [index],
      value: parseEther(inputAmount.toString()),
    });
  };

  let allocation = campaignContribution
    ? BigInt(campaignContribution)
    : BigInt(0);

  return (
    <>
      <Card className="mt-20">
        <CardHeader color="blue-gray" className="relative h-72">
          <img
            src={`/images/project_${index}.jpg`}
            alt="card-image"
            className="w-full object-cover object-center"
          />
        </CardHeader>
        <CardBody>
          <div className="flex justify-between items-center">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              #{index + 1} - {campaign[0]}
            </Typography>
            <Typography color="blue-gray" variant="h6">
              Target {formatEther(BigInt(campaign[3]))} Neo
            </Typography>
          </div>
          <Typography>{showDescription(campaign[1])}</Typography>
        </CardBody>

        {!detail && (
          <CardFooter className="pt-0">
            <Link href={"/campaign/" + (index + 1)} title={campaign[0]}>
              <Button>Learn More</Button>
            </Link>
          </CardFooter>
        )}

        {detail && milestones && (
          <CardFooter className="pt-0">
            {milestones.map((milestone, index) => {
              let percent = 0;

              console.log(allocation);

              if (allocation >= milestone.amount) {
                percent = 100;
                allocation -= milestone.amount;
              } else if (allocation > 0) {
                percent = Number((allocation * BigInt(100)) / milestone.amount);
                console.log(percent);
                allocation = BigInt(0);
              } else {
                percent = 0;
              }

              return (
                <Card
                  key={index}
                  className="shadow-sm border border-gray-200 !rounded-lg mt-4"
                >
                  <CardBody className="p-4">
                    <div className="flex justify-between items-center">
                      <Typography className="!font-medium !text-s text-gray-600">
                        Milestone #{index + 1}
                      </Typography>
                    </div>
                    <div className="w-full">
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <Typography color="blue-gray" variant="h5">
                          Target {formatEther(milestone.amount)} Neo
                        </Typography>
                        <Typography color="blue-gray" variant="h6">
                          {percent}%
                        </Typography>
                      </div>
                      <Progress value={percent} />
                    </div>
                  </CardBody>
                </Card>
              );
            })}

            {isConnected && (
              <div className="mt-4 flex justify-end">
                <div className="w-72 mr-2">
                  <Input
                    label="Amount"
                    type="number"
                    crossOrigin={undefined}
                    min={0}
                    value={inputAmount}
                    onChange={(e) => setInputAmount(Number(e.target.value))}
                  />
                </div>
                <Button onClick={contributeCall} loading={isLoading}>
                  Contribute
                </Button>
              </div>
            )}
            {!isConnected && (
              <div className="mt-4 flex justify-end">
                Connect your wallet to contribute!
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </>
  );
}
