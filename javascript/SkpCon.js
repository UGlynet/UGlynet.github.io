class SkpCon {
	constructor(U_SCALE, vertices_gap, x, y, encoder_traits, decoder_traits) {
		this.U_SCALE = U_SCALE;
		this.vertices_gap = vertices_gap;

		// this.x_left_end = x;
		// this.y_upper_end = y;
		// this.x_right_end = x + 5.2*U_SCALE;
		this.x_speed = 0.05 * U_SCALE;
		this.left_ends = encoder_traits;
		this.right_ends = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
		this.decoder_traits = decoder_traits;

		this.click_dist = 0.6*U_SCALE;
		// this.skp_gap = 2.5*U_SCALE;
		this.default_strokeWgt = 1;
		this.default_strokeWgt_outer = 6;
		this.strokeWgt = 1;
		this.strokeWgt_outer = 6;
		this.c = color("red");

		// controller
		this.controller_options = {
			options: operations_skpcn,
			val: 100
		}
		let controller_labeltexts = ["Which Operation?", "How Much?"];
		this.controller = createGui(window, "Skip Connection", "QuickSettings");
		this.controller.addObject(this.controller_options, controller_labeltexts);
		this.controller.setValue('options', Math.floor(Math.random()*operations_skpcn.length));
		controllers.push(this.controller);
		this.controller.on = false;

		this.refreshColorEdge();
	}

	display() {
		// color
		noFill();

		// draw skip connections
	    for (var i=0; i<5; i++) {
	    	// outer glimpse
	    	stroke(this.c);
	    	strokeCap(SQUARE);
	    	strokeWeight(this.strokeWgt_outer);
			beginShape(LINES);
			for (let step=0; step <= this.right_ends[i][0]-this.left_ends[i][0]; step += this.vertices_gap) {
				let x = this.left_ends[i][0] + step;
				let y = this.left_ends[i][1] - 0.4*U_SCALE;

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
			for (let step=0; step <= this.right_ends[i][0]-this.left_ends[i][0]; step += this.vertices_gap) {
				let x = this.left_ends[i][0] + step;
				let y = this.left_ends[i][1] - 0.4*U_SCALE;

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
			var y = this.left_ends[i][1];
			if(this.left_ends[i][0] <= mX && mX <= this.right_ends[i][0]
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

	hovered(mX, mY) {
		for (var i=0; i<5; i++) {
			var y = this.left_ends[i][1];
			if(this.left_ends[i][0] <= mX && mX <= this.right_ends[i][0]
				&& y-this.click_dist <= mY && mY <= y+this.click_dist) {
				this.c = color('rgb(0,0,255)');
				this.strokeWgt = 3;
				this.strokeWgt_outer = 8;
				return true;
			} else {
				this.refreshColorEdge();
				this.strokeWgt = this.default_strokeWgt;
				this.strokeWgt_outer = this.default_strokeWgt_outer;
			}
		}
		return false;
	}

	refreshColorEdge() {
		this.c = color(toHsbString( this.controller.getValue('options').index * 150,
									100,
									this.controller.getValue('val')+50));

		// animation & cut off
		if(this.controller.getValue('options').index===1) {
			for (let i=0; i<this.left_ends.length; i++) {
				this.right_ends[i][0] = this.left_ends[i][0] + (this.decoder_traits[i][0]-this.left_ends[i][0])/2;
			}
		} else {
			for (let i=0; i<this.left_ends.length; i++) {
				this.right_ends[i][0] = this.decoder_traits[i][0];
			}			
		}
	}
}