export interface IBall {
	get color(): string;
	get mass(): number;
	get radius(): number;
	get x(): number;
	get y(): number;
	set x(value: number);
	set y(value: number);
	get velocityX(): number;
	get velocityY(): number;
	set velocityX(value: number);
	set velocityY(value: number);
	update(deltaTime: number): void;
}

export type Vector = {
	x: number;
	y: number;
};
