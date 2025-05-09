import type { CanvasBall } from "./CanvasBall";

export class CanvasStage {
	private _width: number;
	private _height: number;
	private _canvas!: HTMLCanvasElement;
	private _ctx!: CanvasRenderingContext2D;
	private _drawList: CanvasBall[] = [];

	constructor(canvasId: string, width: number, height: number) {
		this._width = width;
		this._height = height;
		const _element: HTMLElement | null = document.getElementById(canvasId);
		if (!_element) {
			throw new Error(`ないですね: ${canvasId}`);
		}
		if (_element instanceof HTMLCanvasElement) {
			this._canvas = _element;
			const _ctx = this._canvas.getContext("2d");
			if (this._canvas && _ctx) {
				this._ctx = _ctx;
			}
		} else {
			throw new Error(`canvasだけでお願いします: ${canvasId}`);
		}
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}

	public addChild(child: CanvasBall): void {
		this._drawList.push(child);
	}

	public update() {
		this._ctx.clearRect(0, 0, this._width, this._height);

		for (let _index = 0; _index < this._drawList.length; _index++) {
			const _currentBall: CanvasBall = this._drawList[_index];

			this._ctx.beginPath();
			this._ctx.arc(
				_currentBall.x,
				_currentBall.y,
				_currentBall.radius,
				0,
				Math.PI * 2,
			);
			this._ctx.fillStyle = _currentBall.color;
			this._ctx.fill();
		}
	}
}
