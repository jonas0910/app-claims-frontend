import ClaimForm from "@/modules/virtual-claim/components/claim-form"


const ReclamoVirtualPage = () => {

  return (
    <div className={`bg-[url("/bg.svg")] dark:bg-[url("/bgdark.svg")] flex-1 flexbg-[url("/bgdark.svg")]  flex-col`}>
      <ClaimForm/>
    </div>
  )
}

export default ReclamoVirtualPage
