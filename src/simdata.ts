export type Aircraft = {
    body: AircraftBody,
};

export type AircraftBody = {
    components: AircraftBodyComponent[],
    targetEmptyMass: number,
    density: number,
    referenceLength: number,
    actualLength: number,
    minCG: number,
    maxCG: number,
};

export const defaultAircraftBody:AircraftBody = {
    components: [],
    targetEmptyMass: 0,
    density: 0,
    referenceLength: 0,
    actualLength: 0,
    minCG: 0,
    maxCG: 0
}

export type vec3 = {
    x: number,
    y: number,
    z: number,
};

export type AircraftBodyComponent = {
    name: string,
    density: number,
    mass: number,
    centroid: vec3,
    dimensions: vec3,
    areaVisibility: vec3,
};

export const defaultAircraftBodyComponent = {
    name: "",
    density: 1,
    mass: 0,
    centroid: {x: 0, y: 0, z: 0},
    dimensions: {x: 0, y: 0, z: 0},
    areaVisibility: {x: 0, y: 0, z: 0},
}