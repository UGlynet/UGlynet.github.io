class Latent {
	
	constructor(U_SCALE, vertices_gap, px_offset, x, y, r, default_strokeWgt) {
		this.U_SCALE = U_SCALE;
		this.vertices_gap = vertices_gap;

		this.center_x = x;
		this.center_y = y-0.3*U_SCALE;
		this.radius = r;
		this.px_offset = px_offset * 0.6;

		this.c = color(toHsbString(hue_palette[5], 100, 100));
		this.strokeWeight = default_strokeWgt;
		this.default_strokeWgt = default_strokeWgt;

		// controller
		this.controller_options = {
			options: operations,
			val: 50,
		}
		this.controller = createGui(window, "bottleneck layer", "QuickSettings");
		this.controller.addObject(this.controller_options);
		this.controller_options.options = random(operations);
		controllers.push(this.controller);
		this.controller.on = false;
	}	

	display() {
		this.c = color(toHsbString(hue_palette[ operations.indexOf(this.controller_options.options) ],
									100,
									this.controller_options.val*0.5+50));
		fill(this.c);

		beginShape();
		var r = this.radius;

		for (var a=0; a<TWO_PI;a+=PI/vertices_amount) {
			var x = this.center_x + r*sin(a)*1.5;
			var y = this.center_y + r*cos(a);

			var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * this.px_offset); // originally: sin(a) 곱해야 함

			var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * this.px_offset); // originally: cos(a) 곱해야 함
			vertex(new_x,new_y);
		}
		endShape();
	}

	clicked(mX, mY) {
		if( sq(mX-this.center_x) + sq((mY-this.center_y)*1.5) <= sq(1.5*this.radius+0.2*this.U_SCALE) ) {
			if(this.controller.on==false) {
				this.controller.setPosition(mouseX, mouseY);
				this.controller.show();
				this.controller.on = true;
			} else {
				this.controller.on = false;
			}
			return true;
		}
	}



	// hover_in(mX, mY) {
	// 	if( sq(mX-this.center_x) + sq((mY-this.center_y)*1.5) <= sq(1.5*this.radius+0.2*this.U_SCALE) ) {
	// 		this.strokeWeight = default_strokeWgt;
	// 		return true;
	// 	}
	// }

}