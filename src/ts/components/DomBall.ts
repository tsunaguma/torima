import type { IBall, Vector } from "../interfaces/IBall";

export class DomBall implements IBall {
	private _htmlElement: HTMLDivElement;
	private _style: CSSStyleDeclaration;
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
		this._htmlElement = document.createElement("div");
		this._style = this._htmlElement.style;
		this._position = { x, y };
		this._velocity = { x: vx, y: vy };
		this._radius = radius;
		this._mass = Math.PI * (this._radius * this._radius) * 1;
		this._color = color;
		this.init();
	}

	private init() {
		this._style.position = "absolute";
		this._style.transform = "translate(-50%,-50%)";
		this._style.width = `${this._radius * 2}px`;
		this._style.height = `${this._radius * 2}px`;
		this._style.backgroundColor = this._color;
		this._style.borderRadius = "9999px";

		this._domUpdate();
	}

	get dom(): HTMLElement {
		return this._htmlElement;
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

		this._domUpdate();
	}

	private _domUpdate() {
		this._style.left = `${this._position.x}px`;
		this._style.top = `${this._position.y}px`;
	}
}
