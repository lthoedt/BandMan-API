import { Nodes } from "../database/nodes/Nodes";
import { getSession } from "../database/dbl";
import { Image } from "../database/nodes/Image";

export async function imageExists(url: string): Promise<boolean> {
	try {
		const session = getSession();

		const result = await session.run(
			`MATCH (i:${Nodes.Image}) WHERE i.url="${url}" RETURN i`
		)

		session.close();
		return result.records.length != 0;
	} catch {
		return false;
	}
}

export async function createImage(image: Image): Promise<Image> {
	try {
		const session = getSession();

		const result = await session.run(`
			CREATE
                (lb:${Nodes.Image} {${image.toString()}})
		`)
		
		session.close();

		return image;
	} catch (err) {
		console.log(err)
	}
	return null;
}

export async function createImageIfNotExist(image: Image): Promise<Image> {
    return (await imageExists(image.url))
	? image
	: createImage(image);   
}