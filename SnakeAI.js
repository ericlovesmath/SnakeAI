
FPS = 5;
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
ShuffleIndex = [0,1,2];
Direction = "Right"

function game() {
	PlayerX += XVelocity;
	PlayerY += YVelocity;
	if (PlayerX < 0) {
		PlayerX = tc - 1;
	}
	if (PlayerX > tc - 1) {
		PlayerX = 0;
	}
	if (PlayerY < 0) {
		PlayerY = tc - 1;
	}
	if (PlayerY > tc - 1) {
		PlayerY = 0;
	}
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canv.width, canv.height);

	ctx.fillStyle = "lime";
	for (var i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * GridSize, trail[i].y * GridSize, GridSize - 2, GridSize - 2);
		if (trail[i].x == PlayerX && trail[i].y == PlayerY) {
			tail = 5; trail = [];
			XVelocity = 0; YVelocity = 0;
			PlayerX = PlayerY = 10;
		}
	}
	trail.push({ x: PlayerX, y: PlayerY });
	while (trail.length > tail) {
		trail.shift();
	}

	if (AppleX == PlayerX && AppleY == PlayerY) {
		tail++ ;
		AppleX = Math.floor(Math.random() * tc);
		AppleY = Math.floor(Math.random() * tc);
	}
	ctx.fillStyle = "red";
	ctx.fillRect(AppleX * GridSize, AppleY * GridSize, GridSize - 2, GridSize - 2);


	AI();
}

function AI() {
	var HeadLeft = HeadRight = HeadUp = HeadDown = 1;
	for (var i = 1; i < trail.length; i++) {
		//console.log(trail[i].x,trail[i].y,PlayerX,PlayerY);
		if (trail[i].x == PlayerX && trail[i].y == PlayerY + 1) {
			console.log("Down");
			HeadDown = 0;
		}
		if (trail[i].x == PlayerX && trail[i].y == PlayerY - 1) {
			HeadUp = 0;
			console.log("Up");
		}
		if (trail[i].x == PlayerX - 1 && trail[i].y == PlayerY) {
			HeadLeft = 0;
			console.log("Left");
		}
		if (trail[i].x == PlayerX + 1 && trail[i].y == PlayerY) {
			HeadRight = 0;
			console.log("Right");
		}
	}
	console.log(HeadLeft,HeadRight,HeadUp,HeadDown);
	RandDir = [];
	if (HeadLeft == 1) {
		RandDir.push("Left");
	}
	if (HeadRight == 1) {
		RandDir.push("Right");
	}
	if (HeadUp == 1) {
		RandDir.push("Up");
	}
	if (HeadDown == 1) {
		RandDir.push("Down");
	}
	console.log(RandDir);
	shuffle(RandDir);
	if (RandDir[0] == "Left") {
		XVelocity = -1; YVelocity = 0;
	}
	if (RandDir[0] == "Right") {
		XVelocity = 1; YVelocity = 0;
	}
	if (RandDir[0] == "Up") {
		XVelocity = 0; YVelocity = -1;
	}
	if (RandDir[0] == "Down") {
		XVelocity = 0; YVelocity = 1;
	}
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
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}