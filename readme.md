## Structure

- controllers
    - Recieves http requests
    - Talks to service layer
    - Responds to the user
- database
    - Contains all things about the database
    /entities
        - These are objects that get used but dont need to be a node in the database.
    /nodes
        - These are all the nodes that are in the database.
    /relations
        - Relations between nodes.


# Workings

## Controllers

Each `route` that recieves DTO's needs to use the `ParseDTO(...dtos: (typeof DTO)[])` decorator to parse automatically parse the requested DTO's.

More specifcally:
```javascript
	@ParseDTO(...dtos: (typeof DTO)[])
	async route(
		@ResDecorator() res: Response,
		@ReqDecorator() req: Request,
		...dtos: (typeof DTO)[],
	) {}
```

The dtos will then be passed to the `route()` method in the **same order**.

After that you need to create the right **domain model** for each DTO.

### MusicianController

#### Create
1. The musician cannot already exist.
2. Generate its unique GUID.
3. Add them to the database.
4. Return the created musician.
5. Convert musician to DTO and return.