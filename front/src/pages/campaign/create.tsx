import type { NextPage } from "next";

import { FormEvent, useCallback, useState } from "react";
import { Address, BaseError } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import Crowdfounding from "../../abi/Crowdfunding.json";
import { Header } from "../../components/Header";
import { Button } from "@material-tailwind/react";
import MilestoneForm from "../../components/MilestoneForm";

const CreateCampagn: NextPage = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      date: "",
      amount: "",
      description: "",
    },
  ]);

  const handleMilestoneChange = useCallback(
    (id: number, field: any, value: any) => {
      setMilestones((prev) =>
        prev.map((milestone, index) =>
          index === id ? { ...milestone, [field]: value } : milestone,
        ),
      );
    },
    [],
  );

  const account = useAccount();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  function addMilestone() {
    const values = [...milestones];
    values.push({
      date: "",
      amount: "",
      description: "",
    });
    setMilestones(values);
  }

  function removeMilestone(i: number) {
    if (milestones.length == 1) {
      return;
    }
    const values = [...milestones];
    values.splice(i, 1);
    setMilestones(values);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const owner = account.address;
    if (!owner) {
      console.log("Wallet not connected");
      return;
    }

    // Create our form data
    const formData = new FormData(event.currentTarget);

    // Extract the target date and formatted to timestamps
    const targetDate = new Date(formData.get("targetDate") as string);
    const targetDateFormatted = Math.floor(targetDate.getTime() / 1000);

    console.log(formData);

    let _milestones: any[] = [];
    milestones.map((milestone, index) => {
      const milestoneDate = new Date(milestone.date);
      const milestoneDateFormatted = Math.floor(milestoneDate.getTime() / 1000);

      _milestones.push({
        date: milestoneDateFormatted,
        amount: milestone.amount,
        description: milestone.description,
      });
    });

    console.log(owner);
    console.log(targetDateFormatted);
    console.log(formData.get("targetPrice"));
    console.log(formData.get("title"));
    console.log(formData.get("description"));
    console.log(_milestones);

    // Write to smart contract
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT as Address,
      abi: Crowdfounding.abi,
      functionName: "createCampaign",
      args: [
        targetDateFormatted,
        formData.get("targetPrice"),
        formData.get("title"),
        formData.get("description"),
        _milestones,
      ],
    });
  }

  return (
    <main>
      <Header />

      <form onSubmit={onSubmit}>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">
                Create a new Campaign
              </h2>
              <p className="text-gray-500 mb-6"></p>

              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Campaign Information</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-50"
                          placeholder="Description..."
                        ></textarea>
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="targetDate">Target Date</label>
                        <input
                          type="date"
                          name="targetDate"
                          id="targetDate"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="2022"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="targetPrice">Target Price (Neo)</label>
                        <input
                          type="number"
                          name="targetPrice"
                          id="targetPrice"
                          step="any"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="1000 Neo"
                        />
                      </div>

                      <div className="md:col-span-5 pt-5">
                        <h2 className="font-semibold text-xl text-gray-600 pb-3">
                          Project Milestone
                        </h2>

                        {milestones &&
                          milestones.map((milestone, index) => {
                            return (
                              <MilestoneForm
                                key="index"
                                id={index}
                                milestone={milestone}
                                onMilestoneChange={handleMilestoneChange}
                              />
                            );
                          })}

                        <Button onClick={addMilestone} size="lg">
                          Add milestone
                        </Button>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            disabled={isPending}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            {isPending ? "Confirming..." : "Submit"}
                          </button>
                        </div>
                      </div>

                      {hash && <div>Transaction Hash: {hash}</div>}
                      {isConfirming && <div>Waiting for confirmation...</div>}
                      {isConfirmed && <div>Transaction confirmed.</div>}
                      {error && (
                        <div>
                          Error:{" "}
                          {(error as BaseError).shortMessage || error.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateCampagn;
