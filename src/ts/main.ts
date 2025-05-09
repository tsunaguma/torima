import { CanvasBall } from "./components/CanvasBall";
import { CanvasStage } from "./components/CanvasStage";
import { DomBall } from "./components/DomBall";
import { DomStage } from "./components/DomStage";
import type { IBall } from "./interfaces/IBall";

const FPS: number = 60;
const STAGE_WIDTH: number = 600;
const STAGE_HEIGHT: number = 400;
const _domBalls: IBall[] = [];
const _canvasBalls: IBall[] = [];

const _domStage: DomStage = new DomStage("domStage", STAGE_WIDTH, STAGE_HEIGHT);

const _canvasStage: CanvasStage = new CanvasStage(
	"canvasStage",
	STAGE_WIDTH,
	STAGE_HEIGHT,
);

_init();

function _init() {
	const _LENGTH: number = 20;
	for (let index = 0; index < _LENGTH; index++) {
		const _randomX: number = Math.random() * (STAGE_WIDTH - 50) + 50;
		const _randomY: number = Math.random() * (STAGE_HEIGHT - 50) + 50;
		const _randomVelocityX: number = Math.random() * 400 - 200;
		const _randomVelocityY: number = Math.random() * 400 - 200;
		const _randomRadius: number = Math.random() * 50;
		const _domBall: DomBall = new DomBall(
			_randomX,
			_randomY,
			_randomVelocityX,
			_randomVelocityY,
			_randomRadius,
			"#151515",
		);
		_domStage.addChild(_domBall);
		_domBalls.push(_domBall);
		const _canvasBall: CanvasBall = new CanvasBall(
			_randomX,
			_randomY,
			_randomVelocityX,
			_randomVelocityY,
			_randomRadius,
			"#EE00FF",
		);
		_canvasStage.addChild(_canvasBall);
		_canvasBalls.push(_canvasBall);
	}
	// 簡単なループ（例: 60FPSのシミュレーション）
	const _deltaTime: number = 1 / FPS;
	setInterval(() => _update(_deltaTime), 1000 / FPS);
}

/***
 *
 *
 * これ以下はInterfaceで動かす
 *
 */
function _update(deltaTime: number) {
	for (let i = 0; i < _domBalls.length; i++) {
		const _currentDomBall: IBall = _domBalls[i];
		_checkAndResolveCollisions(_currentDomBall, _domBalls);
		_checkWallCollision(_currentDomBall);
		_currentDomBall.update(deltaTime);

		const _currentCanvasBall: IBall = _canvasBalls[i];
		_checkAndResolveCollisions(_currentCanvasBall, _canvasBalls);
		_checkWallCollision(_currentCanvasBall);
		_currentCanvasBall.update(deltaTime);
		_canvasStage.update();
	}
}

function _checkWallCollision(currentBall: IBall) {
	if (currentBall.x + currentBall.radius >= STAGE_WIDTH) {
		currentBall.x = STAGE_WIDTH - currentBall.radius;
		currentBall.velocityX = -currentBall.velocityX;
	} else if (currentBall.x - currentBall.radius <= 0) {
		currentBall.x = currentBall.radius;
		currentBall.velocityX = -currentBall.velocityX;
	}

	if (currentBall.y + currentBall.radius >= STAGE_HEIGHT) {
		currentBall.y = STAGE_HEIGHT - currentBall.radius;
		currentBall.velocityY = -currentBall.velocityY;
	} else if (currentBall.y - currentBall.radius <= 0) {
		currentBall.y = currentBall.radius;
		currentBall.velocityY = -currentBall.velocityY;
	}
}

function _checkAndResolveCollisions(ball: IBall, ballList: IBall[]) {
	for (let i = 0; i < ballList.length; i++) {
		const _ballA = ball;
		const _ballB = ballList[i];

		if (_ballA !== _ballB) {
			const _deltaX = _ballB.x - _ballA.x;
			const _deltaY = _ballB.y - _ballA.y;
			const _distance = Math.sqrt(_deltaX * _deltaX + _deltaY * _deltaY);

			if (_distance < _ballA.radius + _ballB.radius) {
				// 衝突処理
				_resolveCollision(_ballA, _ballB, _deltaX, _deltaY, _distance);
			}
		}
	}
}

function _resolveCollision(
	ballA: IBall,
	ballB: IBall,
	deltX: number,
	deltY: number,
	distance: number,
) {
	//めり込みを直す
	const _minDistance = ballA.radius + ballB.radius; // 衝突が起こる最小距離
	const _overlap = _minDistance - distance; //めり込んでいる量
	const _correctionFactor = (_overlap + 2) / 2;
	const _correctionX = (deltX / distance) * _correctionFactor;
	const _correctionY = (deltY / distance) * _correctionFactor;

	ballA.x -= _correctionX;
	ballA.y -= _correctionY;
	ballB.x += _correctionX;
	ballB.y += _correctionY;

	// 衝突の法線方向を求める 単位ベクトルにする
	const _normalX: number = deltX / distance;
	const _normalY: number = deltY / distance;

	// 速度の法線方向成分を計算　内積
	const _velocityScalarA =
		ballA.velocityX * _normalX + ballA.velocityY * _normalY;
	const _velocityScalarB =
		ballB.velocityX * _normalX + ballB.velocityY * _normalY;

	// 弾性衝突の式を適用
	const _afterVelocityScalarA =
		((ballA.mass - ballB.mass) * _velocityScalarA +
			2 * ballB.mass * _velocityScalarB) /
		(ballA.mass + ballB.mass);
	const _afterVelocityScalarB =
		((ballB.mass - ballA.mass) * _velocityScalarB +
			2 * ballA.mass * _velocityScalarA) /
		(ballA.mass + ballB.mass);

	// 法線方向の速度を更新
	ballA.velocityX += (_afterVelocityScalarA - _velocityScalarA) * _normalX;
	ballA.velocityY += (_afterVelocityScalarA - _velocityScalarA) * _normalY;
	ballB.velocityX += (_afterVelocityScalarB - _velocityScalarB) * _normalX;
	ballB.velocityY += (_afterVelocityScalarB - _velocityScalarB) * _normalY;
}
