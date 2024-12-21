export default function MilestoneForm({
  id,
  milestone,
  onMilestoneChange,
}: {
  id: number;
  milestone: Milestone;
  onMilestoneChange: (
    id: number,
    field: "date" | "amount" | "description",
    value: string,
  ) => void;
}) {
  return (
    <>
      <div>
        <label>Date</label>
        <input
          type="date"
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={milestone.date}
          onChange={(e) => onMilestoneChange(id, "date", e.target.value)}
        />
      </div>

      <div>
        <label>Amount</label>
        <input
          type="number"
          step="any"
          value={milestone.amount}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          onChange={(e) => onMilestoneChange(id, "amount", e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          value={milestone.description}
          rows={4}
          className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-50"
          placeholder="Description..."
          onChange={(e) => onMilestoneChange(id, "description", e.target.value)}
        ></textarea>
      </div>
    </>
  );
}
