import type { DomBall } from "./DomBall";

export class DomStage {
	private _width: number;
	private _height: number;
	private _stage: HTMLDivElement;
	constructor(selectorID: string, width: number, height: number) {
		this._width = width;
		this._height = height;

		const _element: HTMLElement | null = document.getElementById(selectorID);
		if (!_element) {
			throw new Error(`ないですね: ${selectorID}`);
		}
		if (_element instanceof HTMLDivElement) {
			this._stage = _element;
		} else {
			throw new Error(`divだけでお願いします: ${selectorID}`);
		}
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}

	addChild(child: DomBall): void {
		if (child.dom) this._stage.appendChild(child.dom);
	}
}
