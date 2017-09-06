FPS = 15;
window.onload = function () {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	setInterval(game, 1000 / FPS);
}

PlayerX = PlayerY = 10;
GridSize = tc = 20;
AppleX = AppleY = 15;
XVelocity = YVelocity = 0;
trail = [];
tail = 5;
ShuffleIndex = [0, 1, 2];
Direction = "Right";
ComputerList = [];

for (var i = 0; i < 50; ++i) {
	CompAdd = []
	CompAdd = Array.from({length: 24}, () => (Math.random() * 2 - 1));
	console.log(CompAdd);
	ComputerList.push(CompAdd);
}

	function game() {
		PlayerX += XVelocity;
		PlayerY += YVelocity;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canv.width, canv.height);

		ctx.fillStyle = "lime";
		for (var i = 0; i < trail.length; i++) {
			ctx.fillRect(trail[i].x * GridSize, trail[i].y * GridSize, GridSize - 2, GridSize - 2);
			if ((trail[i].x == PlayerX && trail[i].y == PlayerY) || (PlayerX == -1) || (PlayerX == tc) || (PlayerY == -1) || (PlayerY == tc)) {
				tail = 5; trail = [];
				XVelocity = 1; YVelocity = 0;
				PlayerX = PlayerY = 10;
				console.log("Snake Death");
			}
		}
		trail.push({ x: PlayerX, y: PlayerY });
		while (trail.length > tail) {
			trail.shift();
		}

		if (AppleX == PlayerX && AppleY == PlayerY) {
			tail++;
			AppleX = Math.floor(Math.random() * tc);
			AppleY = Math.floor(Math.random() * tc);
		}
		ctx.fillStyle = "red";
		ctx.fillRect(AppleX * GridSize, AppleY * GridSize, GridSize - 2, GridSize - 2);

		inputs = [];
		GetInputs(1, 0);
		GetInputs(0, 1);
		GetInputs(-1, 0);
		GetInputs(0, -1);
		console.log(inputs);
	}

	function GetInputs(ShiftX, ShiftY) {
		var HeadLeft = HeadRight = HeadUp = HeadDown = 0;
		FPlayerX = PlayerX + ShiftX;
		FPlayerY = PlayerY + ShiftY;
		for (var i = 1; i < trail.length; i++) {
			if ((trail[i].x == FPlayerX && trail[i].y == FPlayerY + 1) || (FPlayerX <= -1) || (FPlayerX == tc) || (FPlayerY + 1 <= -1) || (FPlayerY + 1 == tc)) {
				HeadDown = -1;
			}
			if ((trail[i].x == FPlayerX && trail[i].y == FPlayerY - 1) || (FPlayerX <= -1) || (FPlayerX == tc) || (FPlayerY - 1 <= -1) || (FPlayerY - 1 == tc)) {
				HeadUp = -1;
			}
			if ((trail[i].x == FPlayerX - 1 && trail[i].y == FPlayerY) || (FPlayerX - 1 <= -1) || (FPlayerX - 1 == tc) || (FPlayerY <= -1) || (FPlayerY == tc)) {
				HeadLeft = -1;
			}
			if ((trail[i].x == FPlayerX + 1 && trail[i].y == FPlayerY) || (FPlayerX + 1 <= -1) || (FPlayerX + 1 == tc) || (FPlayerY <= -1) || (FPlayerY == tc)) {
				HeadRight = -1;
			}
			if (AppleX == FPlayerX && AppleY == FPlayerY + 1) {
				HeadDown = 1;
			}
			if (AppleX == FPlayerX && AppleY == FPlayerY - 1) {
				HeadUp = 1;
			}
			if (AppleX == FPlayerX - 1 && AppleY == FPlayerY) {
				HeadLeft = 1;
			}
			if (AppleX == FPlayerX + 1 && AppleY == FPlayerY) {
				HeadRight = 1;
			}
		}
		inputs.push([Math.sqrt(Math.pow(FPlayerX - AppleX, 2) + Math.pow(FPlayerY - AppleY, 2)), HeadUp, HeadRight, HeadDown, HeadLeft]);
	}

	function keyPush(evt) {
		switch (evt.keyCode) {
			case 37:
				if (XVelocity !== 1) {
					XVelocity = -1; YVelocity = 0;
					Direction = "Left";
				}
				break;
			case 38:
				if (YVelocity !== 1) {
					XVelocity = 0; YVelocity = -1;
					Direction = "Up";
				}
				break;
			case 39:
				if (XVelocity !== -1) {
					XVelocity = 1; YVelocity = 0;
					Direction = "Right";
				}
				break;
			case 40:
				if (YVelocity !== -1) {
					XVelocity = 0; YVelocity = 1;
					Direction = "Down";
				}
				break;
		}
	}