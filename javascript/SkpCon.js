class SkpCon {
	constructor(U_SCALE, vertices_gap, x, y, encoder_traits, decoder_traits) {
		this.U_SCALE = U_SCALE;
		this.vertices_gap = vertices_gap;

		this.x_left_end = x;
		this.y_upper_end = y;
		this.x_right_end = x + 5.2*U_SCALE;
		this.x_speed = 0.05 * U_SCALE;
		this.encoder_traits = encoder_traits;
		this.decoder_traits = decoder_traits;

		this.click_dist = 0.6*U_SCALE;
		// this.skp_gap = 2.5*U_SCALE;
		this.default_strokeWgt = 10;
		this.strokeWgt = 1;
		this.strokeWgt_outer = 6;

		// controller
		this.controller_options = {
			options: operations_skpcn,
			val: 100
		}
		this.controller = createGui(window, "skip connections", "QuickSettings");
		this.controller.addObject(this.controller_options);
		this.controller_options.options = random(operations_skpcn);
		controllers.push(this.controller);
		this.controller.on = false;
	}

	display() {
		// animation & cut off
		if(this.controller_options.options==="cut off") this.x_right_end = this.x_left_end + 2.6*this.U_SCALE;
		else {
			this.x_right_end += this.x_speed;
			if(this.x_right_end > this.x_left_end+5.2*U_SCALE) this.x_right_end = this.x_left_end;
		}

		// color
		var c = color(toHsbString( operations_skpcn.indexOf(this.controller_options.options) * 150,
									100,
									this.controller_options.val*0.5+50));
		noFill();

		// draw skip connections
	    for (var i=0; i<5; i++) {
	    	// outer glimpse
	    	stroke(c);
	    	strokeCap(SQUARE);
	    	strokeWeight(this.strokeWgt_outer);
			beginShape(LINES);
			for (let step=0; step <= this.decoder_traits[i][0]-this.encoder_traits[i][0]; step += this.vertices_gap) {
				let x = this.encoder_traits[i][0] + step;
				let y = this.encoder_traits[i][1] - 0.4*U_SCALE;

				let new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
				                  * px_offset );

				let new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
				                  * px_offset );

				vertex(new_x, new_y);
			}
			endShape();

			// inner core line
			stroke(0);
			strokeWeight(this.strokeWgt);
			beginShape(LINES);
			for (let step=0; step <= this.decoder_traits[i][0]-this.encoder_traits[i][0]; step += this.vertices_gap) {
				let x = this.encoder_traits[i][0] + step;
				let y = this.encoder_traits[i][1] - 0.4*U_SCALE;

				let new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
				                  * px_offset );

				let new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
				                  * px_offset );

				vertex(new_x, new_y);
			}
			endShape();
		}
	}

	clicked(mX, mY) {
		for (var i=0; i<5; i++) {
			var y = this.encoder_traits[i][1] - 0.4*U_SCALE;
			if(this.encoder_traits[i][0] <= mX && mX <= this.decoder_traits[i][0]
				&& y-this.click_dist <= mY && mY <= y+this.click_dist) {
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
	}
}