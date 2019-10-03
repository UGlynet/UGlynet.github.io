class Decoder {
	constructor(U_SCALE, vertices_gap, x, y, default_strokeWgt) {
		this.U_SCALE = U_SCALE;
		this.vertices_gap = vertices_gap;

		this.radius_inner = 2*U_SCALE;
		this.radius_outer = 5*U_SCALE;

		this.x_right_end = x;
		this.x_right_inner = x - 3.6 * U_SCALE;
		this.y_upper_end = y + 2*U_SCALE;
		this.y_rect_bottom = y + 8*U_SCALE;
		this.x_corner_center = 0 + 0.1*this.U_SCALE;
		this.y_corner_center = 0 + 1.5*this.U_SCALE;

		this.strokeWeight = default_strokeWgt;

		// controller
		this.controller_options = {
			options: operations,
			val: 50
		}
		this.controller = createGui(window, "decoder", "QuickSettings");
		this.controller.addObject(this.controller_options);
		this.controller_options.options = random(operations);
		controllers.push(this.controller);
	}

	display() {
		this.c = color(toHsbString(hue_palette[ operations.indexOf(this.controller_options.options) ],
									100,
									this.controller_options.val*0.5+50));
		fill(this.c);

		beginShape();
		// 2-1. outer straight part
		for (var step=0; step < 6*this.U_SCALE; step += this.vertices_gap) {
			var x = this.x_right_end;
			var y = this.y_upper_end + step;

			var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset );

			var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset );

			vertex(new_x, new_y);
		}

		// 2-2. outer corner
		for (var a=HALF_PI; a > 0; a -= HALF_PI/vertices_amount) {
			var x = this.x_corner_center + this.radius_outer*sin(a)*1.2;
			var y = this.y_corner_center + this.radius_outer*cos(a);

			var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset ); // originally: sin(a) 곱해야 함

			var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset ); // originally: cos(a) 곱해야 함
			vertex(new_x,new_y);
		}

		// 2-3. inner corner
		for (var a=0; a < HALF_PI; a += HALF_PI/vertices_amount) {
			var x = this.x_corner_center + this.radius_inner*sin(a)*1.3;
			var y = this.y_corner_center + this.radius_inner*cos(a); //r*cos(a)*1.45;

			var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset ); // originally: sin(a) 곱해야 함

			var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset ); // originally: cos(a) 곱해야 함
			vertex(new_x,new_y);
		}

		// 2-4. inner straight part
		for (var step=0; step < 6*this.U_SCALE; step += this.vertices_gap) {
			var x = this.x_right_inner + 0.2*this.U_SCALE;
			var y = this.y_upper_end + 6*this.U_SCALE - step;

			var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset );

			var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset );

			vertex(new_x, new_y);
		}

		endShape(CLOSE);  		
	}

	clicked(mX, mY) {
		if(	(this.x_right_inner <= mX && mX <= this.x_right_end
				&& this.y_upper_end <= mY && mY <= this.y_rect_bottom)
			|| ( mX > this.x_corner_center && mY > this.y_corner_center
				&& (sq(mX-this.x_corner_center) + sq((mY-this.y_corner_center)*1.2) <= sq(this.radius_outer*1.2))
				&& (sq(mX-this.x_corner_center) + sq((mY-this.y_corner_center)*1.3) >= sq(this.radius_inner*1.3)) )) {
				// console.log("Decoder");
				this.controller.setPosition(mouseX, mouseY);
				this.controller.show();
				return true;
		   }
	}
}