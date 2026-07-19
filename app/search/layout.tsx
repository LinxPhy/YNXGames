import { Suspense } from "react";


export default async function SearchLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    )

}