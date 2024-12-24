import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Progress,
} from "@material-tailwind/react";
import Link from "next/link";

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

  const showDescription = (content: string) => {
    if (detail) {
      return content;
    }
    return content.substring(0, 500);
  };

  return (
    <>
      <Card className="mt-6">
        <CardHeader color="blue-gray" className="relative h-72">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            #{index + 1} - {campaign[0]}
          </Typography>
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
              return (
                <>
                  <Card
                    key={index}
                    className="shadow-sm border border-gray-200 !rounded-lg"
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
                            50%
                          </Typography>
                        </div>
                        <Progress value={50} />
                      </div>
                    </CardBody>
                  </Card>
                </>
              );
            })}
          </CardFooter>
        )}
      </Card>
    </>
  );
}
