FPS = 15;
window.onload=function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	setInterval(game,1000/FPS);
}

PlayerX = PlayerY = 10;
GridSize = tc = 20;
AppleX = AppleY = 15;
XVelocity = YVelocity = 0;
trail = [];
tail = 5;

function game() {
	PlayerX += XVelocity;
	PlayerY += YVelocity;
	if (PlayerX<0) {
		PlayerX= tc-1;
	}
	if (PlayerX>tc-1) {
		PlayerX= 0;
	}
	if (PlayerY<0) {
		PlayerY= tc-1;
	}
	if (PlayerY>tc-1) {
		PlayerY= 0;
	}
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);
 
	ctx.fillStyle="lime";
	for(var i=0;i<trail.length;i++) {
		ctx.fillRect(trail[i].x*GridSize,trail[i].y*GridSize,GridSize-2,GridSize-2);
		if (trail[i].x==PlayerX && trail[i].y==PlayerY) {
			tail = 5;trail=[];
			XVelocity=0;YVelocity=0;
			PlayerX=PlayerY=10;
		}
	}
	trail.push({x:PlayerX,y:PlayerY});
	while(trail.length>tail) {
	trail.shift();
	}
 
	if(AppleX==PlayerX && AppleY==PlayerY) {
		tail++;
		AppleX=Math.floor(Math.random()*tc);
		AppleY=Math.floor(Math.random()*tc);
	}
	ctx.fillStyle="red";
	ctx.fillRect(AppleX*GridSize,AppleY*GridSize,GridSize-2,GridSize-2);
}
function keyPush(evt) {
	switch(evt.keyCode) {
		case 37:	
			if (XVelocity!==1) {
				XVelocity=-1;YVelocity=0;
			}
			break;
		case 38:
			if (YVelocity!==1) {
				XVelocity=0;YVelocity=-1;
			}
			break;
		case 39:
			if (XVelocity!==-1) {
				XVelocity=1;YVelocity=0;
			}
			break;
		case 40:
			if (YVelocity!==-1) {
				XVelocity=0;YVelocity=1;
			}
			break;
	}
}