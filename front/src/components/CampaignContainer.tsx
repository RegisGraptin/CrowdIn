import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export default function CampaignContainer({
  index,
  campaign,
}: {
  index: number;
  campaign: string[];
}) {
  console.log(campaign);

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
          <Typography>{campaign[1].substring(0, 500)}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link href={"/campaign/" + (index + 1)} title={campaign[0]}>
            <Button>Learn More</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
