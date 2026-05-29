
interface Genre {
    id: number;
    name: string;
    slug: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

interface Platform {
    id: number;
    name: string;
    alternative_name: string;
    slug: string;
    generation: number;
    platform_logo: number;
    url: string;
    created_at: Date;
    updated_at: Date;
}

interface Mode {
    id: number;
    name: string;
    slug: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

interface Company {
    id: number;
    name: string;
    description: string;
    logo: number;
    slug: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

interface CompanyLogo {
    id: number;
    animated: boolean;
    width: number;
    height: number;
    url: string;
}

interface Cover {
    id: number;
    game: number;
    animated: boolean;
    width: number;
    height: number;
    url: string;
}

interface Screenshot {
    id: number;
    game: number;
    animated: boolean;
    width: number;
    height: number;
    url: string;
}

interface Video {
    id: number;
    game: number;
    name: string;
    url: string;
}

interface Theme {
    id: number;
    name: string;
    slug: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

interface Collection {
    id: number;
    name: string;
    slug: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

interface Franchise {
    id: number;
    name: string;
    slug: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

interface Game {
    id: number;
    name: string;
    parent_game: number;
    slug: string;
    cover: number;
    storyline: string;
    summary: string;
    hypes: number;
    first_release_date: Date;
    rating: number;
    rating_count: number;
    total_rating: number;
    total_rating_count: number;
    url: string;
    created_at: Date;
    updated_at: Date;
    image: string;
    width: number;
    height: number;
    genre: string;
}

interface GameProps {
    game: Game[],
    themes: Theme[],
    covers: Cover[],
    genres: Genre[],
    platforms: Platform[],
    companies: Company[],
    modes: Mode[],
    videos: Video[],
    screenshots: Screenshot[],
    franchises: Franchise[],
    collections: Collection[],
}