import DeepSearch from "./deepsearch"


export default async function DeepSearchPage() {

    const request = await fetch (
        `${process.env.NEXT_PUBLIC_SERVER_URL}/getdeepsearch`
    )

    const data = await request.json();
    
    return (
        <DeepSearch data={data} />
    )

}