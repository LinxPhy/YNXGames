-- CREATE TABLE genres (
--     id INT PRIMARY KEY,
--     name varchar(255),
--     slug varchar(255),
--     url varchar(255),
--     created_at DATETIME,
--     updated_at DATETIME
-- );

-- CREATE TABLE platforms (
--     id INT PRIMARY KEY,
--     name varchar(255),
--     alternative_name varchar(255),
--     slug varchar(255),
--     generation INT,
--     platform_logo INT,
--     url varchar(255),
--     created_at DATETIME,
--     updated_at DATETIME,
-- );

-- CREATE TABLE modes (
--     id INT PRIMARY KEY,
--     name varchar(255),
--     slug varchar(255),
--     url varchar(255),
--     created_at DATETIME,
--     updated_at DATETIME,
-- );

-- CREATE TABLE companies (
--     id INT PRIMARY KEY,
--     name varchar(255),
--     description TEXT,
--     logo INT,
--     slug varchar(255),
--     url varchar(255),
--     created_at DATETIME,
--     updated_at DATETIME,
-- );

-- CREATE TABLE company_logos (
--     id INT PRIMARY KEY,
--     animated BOOLEAN,
--     width INT,
--     height INT,
--     url varchar(255),
-- );

-- CREATE TABLE covers (
--     id INT PRIMARY KEY,
--     game INT,
--     animated BOOLEAN,
--     width INT,
--     height INT,
--     url varchar(255),
-- )

-- CREATE TABLE screenshots (
--     id INT PRIMARY KEY,
--     game INT,
--     animated BOOLEAN,
--     width INT,
--     height INT,
--     url varchar(255),
-- )

-- CREATE TABLE videos (
--     id INT PRIMARY KEY,
--     game INT,
--     name varchar(255),
--     video_id varchar(255),
-- )

-- CREATE TABLE themes (
--     id INT PRIMARY KEY,
--     name varchar(255),
--     slug varchar(255),
--     url varchar(255),
--     created_at DATETIME,
--     updated_at DATETIME,
--     url varchar(255),
-- );

-- CREATE TABLE collections (
--     id INT PRIMARY KEY,
--     name varchar(255),
--     slug varchar(255),
--     url varchar(255),
--     created_at DATETIME,
--     updated_at DATETIME
-- );

-- CREATE TABLE franchises (
--     id INT PRIMARY KEY,
--     name varchar(255),
--     slug varchar(255),
--     url varchar(255),
--     created_at DATETIME,
--     updated_at DATETIME
-- );

CREATE TABLE games (
    id INT PRIMARY KEY,
    name varchar(255),
    parent_game INT,
    slug varchar(255),
    cover INT,
    storyline TEXT,
    summary TEXT,
    hypes INT,
    first_release_date DATETIME, 
    rating FLOAT,
    rating_count INT,
    total_rating FLOAT,
    total_rating_count INT,
    url varchar(255),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE involved_companies (
    id INT,
    company INT
);

CREATE TABLE similar_games (
    id INT,
    similar_game INT
);

CREATE TABLE game_modes (
    id INT,
    mode INT
);

CREATE TABLE game_platforms (
    id INT,
    platform INT
);

CREATE TABLE game_genres (
    id INT,
    genre INT
);

CREATE TABLE game_themes (
    id INT,
    theme INT
);

CREATE TABLE game_screenshots (
    id INT,
    screenshot INT
);

CREATE TABLE game_videos (
    id INT,
    video INT
);

CREATE TABLE game_franchises (
    id INT,
    franchise INT
);

CREATE TABLE game_collections (
    id INT,
    collection INT
);


DELETE FROM involved_companies;
DELETE FROM similar_games;
DELETE FROM game_modes;
DELETE FROM game_platforms;
DELETE FROM game_genres;
DELETE FROM game_themes;
DELETE FROM game_screenshots;
DELETE FROM game_videos;
DELETE FROM game_franchises;
DELETE FROM game_collections;