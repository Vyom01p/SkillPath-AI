-- USERS TABLE
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    streak INTEGER DEFAULT 0,
    last_active DATE,
    created_at TIMESTAMP DEFAULT NOW()
);


-- ROADMAPS TABLE

CREATE TABLE IF NOT EXISTS roadmaps(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ,
    skill_name VARCHAR(150) NOT NULL,
    experience_level VARCHAR(50) NOT NULL,
    goal VARCHAR(100) NOT NULL,
    hours_per_week INTEGER NOT NULL,
    total_weeks INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);


--WEEKS TABLE

CREATE TABLE IF NOT EXISTS weeks(
    id SERIAL PRIMARY KEY,
    roadmap_id INTEGER REFERENCES roadmaps(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE
);


--TOPICS TABLE 

CREATE TABLE IF NOT EXISTS topics(
    id SERIAL PRIMARY KEY,
    week_id INTEGER REFERENCES weeks(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    resource_url VARCHAR(500),
    resource_type VARCHAR(20) DEFAULT 'article',
    is_completed BOOLEAN DEFAULT FALSE 
);

-- MINI PROJECTS TABLE 

CREATE TABLE IF NOT EXISTS mini_projects(
    id SERIAL PRIMARY KEY,
    week_id INTEGER REFERENCES weeks(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE

);


--PROGRESS TABLE 

CREATE TABLE IF NOT EXISTS progress(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    roadmap_id INTEGER REFERENCES roadmaps(id) ON DELETE CASCADE,
    completed_topics INTEGER DEFAULT 0,
    total_topics INTEGER DEFAULT 0,
    percentage NUMERIC(5,2) DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id,roadmap_id)
);


--EXPLORE TABLE

CREATE TABLE IF NOT EXISTS explore_roadmaps(
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    total_weeks INTEGER NOT NULL,
    icon_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);