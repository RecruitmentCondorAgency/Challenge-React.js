export type User = {
	id?: number;
	nombre?: string;
	email?: string;
	password?: string;
};

export type University = {
	id?: number;
	name?: string;
	description?: string;
	country?: string;
	city?: string;
	website?: string;
};

export type Favorite = {
	userId?: number;
	universityId?: number;
};


export type CountryData = {
	languages?: { [code: string]: string };
	currencies?: { [code: string]: { name: string; symbol: string } };
	population?: number;
}