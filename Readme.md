# 3D Printing Materials Backend

This is a Node.js backend for managing 3D printing materials. It utilizes MongoDB to store information about various 3D printing materials and includes functionality for handling image uploads associated with each material.

## Features

- CRUD operations for 3D printing materials
- Image upload and storage
- Validation and error handling


## Prerequisites

- Node.js installed
- MongoDB installed and running

## Setup

1. Clone the repository
    ```bash
    git clone https://github.com/simran1002/3D-Materials.git
    cd 3d-printing-backend
    ```

2. Install dependencies
    ```bash
    npm install
    ```

4. Start the server
    ```bash
    npm start
    ```

## API Endpoints

### Get All Materials

- **URL**: `/api/materials`
- **Method**: `GET`
- **Description**: Fetch all materials from the database, excluding image data.

### Get Material by ID

- **URL**: `/api/materials/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific material by its ID, including its associated image.

### Create a New Material

- **URL**: `/api/materials`
- **Method**: `POST`
- **Description**: Add a new material to the database, including an image upload.
- **Form-Data**:
  - `name`: Name of the material (Text)
  - `technology`: Printing technology used (Text)
  - `colors`: Array of available colors (Text, e.g., `["Red", "Blue"]`)
  - `pricePerGram`: Price per gram of the material (Text)
  - `applicationTypes`: Array of application types (Text, e.g., `["Prototyping", "Mechanical Parts"]`)
  - `image`: Image file representing the material (File)

### Update a Material by ID

- **URL**: `/api/materials/:id`
- **Method**: `PUT`
- **Description**: Update an existing material's details, optionally updating its associated image.
- **Form-Data**: Same as the `POST` request.

### Delete a Material by ID

- **URL**: `/api/materials/:id`
- **Method**: `DELETE`
- **Description**: Remove a material from the database by its ID.
