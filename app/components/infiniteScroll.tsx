import { useInView } from "react-intersection-observer"

interface InfiniteScrollContainerInterface extends React.PropsWithChildren {
    onBottomReached: () => void,
    isFetching?: boolean,
}

export default function InfiniteScrollContainer({ onBottomReached, children }: InfiniteScrollContainerInterface) {

    const { ref } = useInView({
        // rootMargin: "200px",
        onChange: (inView : boolean) => {
            if (inView) {
                onBottomReached()
            }
        }
    })

    return (
        <>
            {children}
            <div ref={ref}/>
        </>
    )
}