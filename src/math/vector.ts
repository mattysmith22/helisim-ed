class Vector<T extends Vector<T>> {
    protected _data: number[];
    protected _constructor: (val: number[]) => T

    constructor(data: number[], constructor: (val: number[]) => T) {
        this._data = data;
        this._constructor = constructor;
    }

    add(other: T): T {
        return this._constructor(this._data.map((val, ind) => val + other._data[ind]));
    } 

    sub(other: T): T {
        return this._constructor(this._data.map((val, ind) => val - other._data[ind]));
    }

    mul(num: number): T {
        return this._constructor(this._data.map(val => val * num));
    }

    div(num: number): T {
        return this._constructor(this._data.map(val => val / num));
    }

    getIndex(index: number): number {
        return this._data[index];
    }

    setIndex(index: number, newVal: number): T{
        return this._constructor(this._data.map((val, i) => index === i ? newVal : val));
    }
}

type Size2 = {_type: "2"};

export class Vec2 extends Vector<Vec2> {
    constructor(x:number, y:number) {
        super([x,y], data => new Vec2(data[0], data[1]));
    }

    x(): number {return this.getIndex(0)}
    y(): number {return this.getIndex(1)}

    setX(val: number): Vec2 {return this.setIndex(0, val)};
    setY(val: number): Vec2 {return this.setIndex(1, val)};
}

export class Vec3 extends Vector<Vec3> {
    constructor(x:number, y:number, z:number) {
        super([x,y,z], data => new Vec3(data[0], data[1], data[2]));
    }

    x(): number {return this.getIndex(0)}
    y(): number {return this.getIndex(1)}
    z(): number {return this.getIndex(2)}

    setX(val: number): Vec3 {return this.setIndex(0, val)};
    setY(val: number): Vec3 {return this.setIndex(1, val)};
    setZ(val: number): Vec3 {return this.setIndex(2, val)};
}

export class Vec4 extends Vector<Vec4> {
    constructor(w:number, x:number, y:number, z:number) {
        super([w,x,y,z], data => new Vec4(data[0], data[1], data[2], data[3]));
    }

    w(): number {return this.getIndex(0)}
    x(): number {return this.getIndex(1)}
    y(): number {return this.getIndex(2)}
    z(): number {return this.getIndex(3)}

    Ixx(): number {return this.getIndex(0)}
    Iyy(): number {return this.getIndex(1)}
    Izz(): number {return this.getIndex(2)}
    Iyz(): number {return this.getIndex(3)}

    setW(val: number): Vec4 {return this.setIndex(0, val)};
    setX(val: number): Vec4 {return this.setIndex(1, val)};
    setY(val: number): Vec4 {return this.setIndex(2, val)};
    setZ(val: number): Vec4 {return this.setIndex(3, val)};

    setIxx(val: number): Vec4 {return this.setIndex(0, val)};
    setIyy(val: number): Vec4 {return this.setIndex(1, val)};
    setIzz(val: number): Vec4 {return this.setIndex(2, val)};
    setIyz(val: number): Vec4 {return this.setIndex(3, val)};
}