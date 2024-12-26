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
import { useAccount } from "wagmi";

export default function CampaignContainer({
  index,
  campaign,
  detail = false,
  milestones = [],
  campaignContribution,
}: {
  index: number;
  campaign: string[];
  detail: boolean;
  milestones: any[];
  campaignContribution: number;
}) {
  console.log("Campaign detial:", campaign);
  console.log("Campaign contribution:", campaignContribution);


  const { isConnected } = useAccount()
  
  const showDescription = (content: string) => {
    if (detail) {
      return content;
    }
    return content.substring(0, 500);
  };

  let allocation = campaignContribution;

  return (
    <>
      <Card className="mt-6">
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
              Target {"" + campaign[3]} Neo
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
            {milestones.map(
              (milestone, index) => {

                let percent = 0;
                if (allocation >= milestone.amount) {
                  percent = 100;
                  allocation -= milestone.amount;
                } else if (allocation > 0) {
                  percent = milestone.amount / allocation;
                  allocation = 0;
                } else {
                  percent = 0;
                }
                
                return(
                  <>
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
                              Target {"" + milestone.amount} Neo
                            </Typography>
                            <Typography color="blue-gray" variant="h6">
                              {percent}%
                            </Typography>
                          </div>
                          <Progress value={percent} />
                        </div>
                      </CardBody>
                    </Card>
                  </>,
                );
              }
            )}

            {isConnected && (
              <div className="mt-4 flex justify-end">
                <div className="w-72 mr-2">
                  <Input label="Amount" type="number" crossOrigin={undefined} />
                </div>
                <Button>Contribute</Button>
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
