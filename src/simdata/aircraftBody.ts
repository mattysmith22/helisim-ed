import { Vec2, Vec3, Vec4 } from "../math/vector";

export type AircraftBody = {
    components: AircraftBodyComponent[],
    targetEmptyMass: number,
    density: number,
    referenceLength: number,
    actualLength: number,
    scalar: number,
    minCG: number,
    maxCG: number,
    refDatum: Vec3,
    centerOfGravity: Vec3,
    momOfInertia: Vec4,
};

export type AircraftBodyComponent = {
    name: string,
    pctDensity: number,
    mass: number,
    volume: number,
    centroid: Vec3,
    dimensions: Vec3,
    areaVisibility: Vec3,
    xCoords: Vec2;
    yCoords: Vec2;
    zCoords: Vec2;
    centerOfGravity: Vec3;
    momOfInertia: Vec4;
};

export const defaultAircraftBody:AircraftBody = {
    components: [],
    targetEmptyMass: 0,
    density: 0,
    referenceLength: 0,
    actualLength: 0,
    scalar: 0,
    minCG: 0,
    maxCG: 0,
    refDatum: new Vec3(0,0,0),
    centerOfGravity: new Vec3(0,0,0),
    momOfInertia: new Vec4(0,0,0,0),
}

export const defaultAircraftBodyComponent = {
    name: "",
    pctDensity: 1,
    mass: 0,
    volume: 0,
    centroid: new Vec3(0,0,0),
    dimensions: new Vec3(0,0,0),
    areaVisibility: new Vec3(0,0,0),
    xCoords: new Vec2(0,0),
    yCoords: new Vec2(0,0),
    zCoords: new Vec2(0,0),
    centerOfGravity: new Vec3(0,0,0),
    momOfInertia: new Vec4(0,0,0,0),
}

export function calculateScalar(simBody: AircraftBody) {
    var actualLength   = simBody.actualLength;
    var referenceLegth = simBody.referenceLength;
    
    simBody.scalar     = actualLength / referenceLegth;
}

export function calculateVolume(simBody: AircraftBody, index: number) {
    var scalar = simBody.scalar;
    
    var length = simBody.components[index].dimensions.x() * scalar;
    var width  = simBody.components[index].dimensions.y() * scalar;
    var height = simBody.components[index].dimensions.z() * scalar;

    var volume = length * width * height;

    simBody.components[index].volume = volume;
}

export function calculateMass(simBody: AircraftBody, index: number) {
    var scalar = simBody.scalar;

    var length = simBody.components[index].dimensions.x() * scalar;
    var width  = simBody.components[index].dimensions.y() * scalar;
    var height = simBody.components[index].dimensions.z() * scalar;

    var objDens = simBody.components[index].pctDensity;
    var mass    = simBody.components[index].volume * (simBody.density * objDens);

    simBody.components[index].mass = mass;
}

export function calculateCoordinates(simBody: AircraftBody, index: number) {
    var centroidX = simBody.components[index].centroid.x();
    var centroidY = simBody.components[index].centroid.y();
    var centroidZ = simBody.components[index].centroid.z();

    var length = simBody.components[index].dimensions.x();
    var width  = simBody.components[index].dimensions.y();
    var height = simBody.components[index].dimensions.z();
    
    var x1 = centroidX + (width / 2) + simBody.refDatum.x();
    var x2 = centroidX - (width / 2) + simBody.refDatum.x();
    simBody.components[index].xCoords.setX(x1); simBody.components[index].xCoords.setY(x2);
    
    var y1 = centroidY + (height / 2) + simBody.refDatum.y();
    var y2 = centroidY - (height / 2) + simBody.refDatum.y();
    simBody.components[index].yCoords.setX(y1); simBody.components[index].yCoords.setY(y2);

    var z1 = centroidZ + (length / 2) + simBody.refDatum.z();
    var z2 = centroidZ - (length / 2) + simBody.refDatum.z();
    simBody.components[index].zCoords.setX(z1); simBody.components[index].zCoords.setY(z2);
}

export function calculateComponentCenterOfGravity(simBody: AircraftBody, index: number) {
    var scalar = simBody.scalar;
    
    //Convert the centroid from mm to m
    var centroidX = simBody.components[index].centroid.x() * scalar;
    var centroidY = simBody.components[index].centroid.y() * scalar;
    var centroidZ = simBody.components[index].centroid.z() * scalar;

    //Calculate weight
    var weight    = simBody.components[index].mass * 9.806;

    simBody.components[index].centerOfGravity.setX(centroidX * weight);
    simBody.components[index].centerOfGravity.setY(centroidY * weight);
    simBody.components[index].centerOfGravity.setZ(centroidZ * weight);
}

export function calculateAircraftCenterOfGravity(simBody: AircraftBody) {
    var centerOfGravity = new Vec3(0,0,0);
    for (let i = 0; i < simBody.components.length; i++) {
        centerOfGravity.add(simBody.components[i].centerOfGravity);
    }
    simBody.centerOfGravity = centerOfGravity;
}

export function calculatObjectMomOfInertia(simBody: AircraftBody, index: number) {
    //First correct the position of object
}