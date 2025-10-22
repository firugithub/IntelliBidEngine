import { ProposalCard } from "../ProposalCard";

export default function ProposalCardExample() {
  return (
    <div className="p-6 max-w-md">
      <ProposalCard
        vendorName="TechVendor Pro"
        overallScore={87}
        technicalFit={92}
        deliveryRisk={25}
        cost="$150K - $180K"
        compliance={95}
        status="recommended"
        onViewDetails={() => console.log("View details clicked")}
      />
    </div>
  );
}
