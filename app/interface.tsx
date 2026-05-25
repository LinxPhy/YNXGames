
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



// CREATE TABLE themes (
//     id INT PRIMARY KEY,
//     name varchar(255),
//     slug varchar(255),
//     url varchar(255),
//     created_at DATETIME,
//     updated_at DATETIME,, 
//     url varchar(255),
// );

// CREATE TABLE games (
//     id INT PRIMARY KEY,
//     name varchar(255),
//     parent_game INT,
//     slug varchar(255),
//     summary TEXT,
//     hypes INT,
//     released_date INT, -- loop through the release_dates table to get the release date 
//     rating INT,
//     rating_count INT,
//     url varchar(255),
// )

// CREATE TABLE similar_games (
//     game INT,
//     similar_game INT,
// )