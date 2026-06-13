import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './page.module.css'

export default function Navigation({ currentPage, hasMore, nextPage }: { currentPage: number, hasMore: boolean, nextPage: number }) {

    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function HandleNavigation(value: number) {

        const params = new URLSearchParams(searchParams.toString());

        params.set('page', value.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className={styles.navigation}>
            {currentPage > 1 && (
                <button onClick={() => HandleNavigation(currentPage - 1)}>
                    <span>◀</span> Page {currentPage - 1}
                </button>
            )}


            {hasMore && (
                <button onClick={() => HandleNavigation(nextPage)}>
                    Page {currentPage + 1} <span>▶</span>
                </button>
            )}

        </div>
    )

}