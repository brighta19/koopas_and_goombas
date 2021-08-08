/* global ctx */

function Platform(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.collision = function(entity) {
    	var vX = (entity.x + ((entity.width * entity.scale) / 2)) - (this.x + (this.width / 2)),
    		vY = (entity.y + ((entity.height * entity.scale) / 2)) - (this.y + (this.height / 2)),
    		// add the half widths and half heights of the objects
    		hWidths = ((entity.width * entity.scale) / 2) + (this.width / 2),
    		hHeights = ((entity.height * entity.scale) / 2) + (this.height / 2);
    
    	// if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
    	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    		// figures out on which side we are colliding (top, bottom, left, or right)
    		var oX = hWidths - Math.abs(vX),
    			oY = hHeights - Math.abs(vY);
    		if (oX >= oY) {
    			if (vY > 0) {// entity colliding from bottom
    				entity.y += oY;
    			}
    			else // entity colliding from top
    				entity.y -= oY;
                    entity.vy *= 0;
                    entity.onGround = true;
    		}
    		else {
    			if (vX > 0) // Player colliding from right
    				entity.x += oX;
    			else // Player colliding from left
    				entity.x -= oX;
    		}
    	}
    };
    this.render = function () {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}
