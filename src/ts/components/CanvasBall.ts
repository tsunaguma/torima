import type { IBall, Vector } from "../interfaces/IBall";

export class CanvasBall implements IBall {
	private _position: Vector;
	private _velocity: Vector;
	private _radius: number;
	private _mass: number;
	private _color: string;

	constructor(
		x: number = 0,
		y: number = 0,
		vx: number = 0,
		vy: number = 0,
		radius: number = 20,
		color: string = "#000000",
	) {
		this._position = { x, y };
		this._velocity = { x: vx, y: vy };
		this._radius = radius;
		this._mass = Math.PI * (this._radius * this._radius) * 1;
		this._color = color;
	}

	public get color(): string {
		return this._color;
	}

	public get mass(): number {
		return this._mass;
	}

	public get radius(): number {
		return this._radius;
	}

	get x(): number {
		return this._position.x;
	}

	get y(): number {
		return this._position.y;
	}

	set x(value: number) {
		this._position.x = value;
	}

	set y(value: number) {
		this._position.y = value;
	}

	get velocityX(): number {
		return this._velocity.x;
	}

	get velocityY(): number {
		return this._velocity.y;
	}

	set velocityX(value: number) {
		this._velocity.x = value;
	}

	set velocityY(value: number) {
		this._velocity.y = value;
	}

	public update(deltaTime: number) {
		this._position.x += this._velocity.x * deltaTime;
		this._position.y += this._velocity.y * deltaTime;
	}
}
