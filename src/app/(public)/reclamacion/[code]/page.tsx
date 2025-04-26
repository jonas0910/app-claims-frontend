import ClaimDetails from "@/modules/virtual-claim/components/claim-details";

const ReclamationPage = () => {
  return (
    <div className={`bg-[url("/bg.svg")] dark:bg-[url("/bgdark.svg")] flex-1 flexbg-[url("/bgdark.svg")]  flex-col`}>
      <ClaimDetails />
    </div>
  );
}

export default ReclamationPage