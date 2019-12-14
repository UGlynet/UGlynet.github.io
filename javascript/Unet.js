class Unet {
	constructor(U_SCALE, vertices_gap, px_offset, unum) {
		// scales
		this.x_left_end = -6.1 * U_SCALE; // -5.9
		this.x_right_end = 6.1 * U_SCALE;
		this.x_left_inner = -2.5 * U_SCALE;
		this.x_right_inner = 2.5 * U_SCALE; // 2.1
		this.y_upper_end = -6.5 * U_SCALE;
		this.y_lower_end = 6.7*U_SCALE

		this.w = this.x_right_end - this.x_left_end;
		this.default_strokeWgt = 8;
		// this.h = 6.7*U_SCALE - y_upper_end;

		this.encoder_traits = [[-4.2*U_SCALE,-4.2*U_SCALE, 1.25*U_SCALE, "1st Layer of the Encoder", 8, true],
								  [-4.8*U_SCALE, -1.2*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [-4.62*U_SCALE, 0.7*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [-4.32*U_SCALE, 2.52*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [-3.28*U_SCALE, 3.96*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [0, 5*U_SCALE, 1.3*U_SCALE, "", 8, false]];

		this.decoder_traits = [[4.2*U_SCALE,-4.2*U_SCALE, 1.25*U_SCALE, "Last Layer of the Decoder", 8, true],
								  [4.8*U_SCALE, -1.2*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [4.62*U_SCALE, 0.7*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [4.32*U_SCALE, 2.52*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [3.28*U_SCALE, 3.96*U_SCALE, 0.25*U_SCALE, "", 8, false],
								  [0, 5*U_SCALE, 1.3*U_SCALE, "", 8, false]];

		this.latent = new Latent(U_SCALE, vertices_gap, px_offset,
								this.encoder_traits[5][0], this.encoder_traits[5][1],
								this.encoder_traits[5][2], this.default_strokeWgt); // 1.7
		this.skpCn = new SkpCon(U_SCALE, vertices_gap,
								this.x_left_inner, this.y_upper_end+2*U_SCALE,
								this.encoder_traits, this.decoder_traits);
		this.encoder_circles = [];
		this.decoder_circles = [];

		for(let i=0; i<5; i++) {
			this.encoder_circles.push(new Circle(U_SCALE, vertices_gap,
												this.encoder_traits[i][0], this.encoder_traits[i][1],
												this.encoder_traits[i][2], this.encoder_traits[i][3],
												this.encoder_traits[i][4], this.encoder_traits[i][5],
												color('hsb(100,0%,50%)'),10*unum+i));
			this.decoder_circles.push(new Circle(U_SCALE, vertices_gap,
												this.decoder_traits[i][0], this.decoder_traits[i][1],
												this.decoder_traits[i][2], this.decoder_traits[i][3],
												this.decoder_traits[i][4], this.decoder_traits[i][5],
												color('hsb(100,0%,50%)'), 10*unum+(5+4-i)));
		}
	}

	display() {
		this.skpCn.display();
		this.hovered();
		this.setCircleColor(this.encoder_circles);
		this.setCircleColor(this.decoder_circles);
		this.latent.refreshColor();

		strokeWeight(this.default_strokeWgt); // 4 or 24
		stroke(0);
		fill(color_x,255,255);
		strokeCap(ROUND);

		this.link();
		this.latent.display();

		for(let i=0; i<5; i++) {
			this.encoder_circles[i].display();
			this.decoder_circles[i].display();
		}
	}

	clicked(mX, mY) {
		if(this.x_left_end < mX && mX < this.x_right_end &&
			this.y_upper_end < mY && mY < this.y_lower_end) {
			return this.latent.clicked(mX, mY)
					|| this.encoder_circles[0].clicked(mX, mY)
					|| this.decoder_circles[0].clicked(mX, mY)
					|| this.skpCn.clicked(mX,mY);
		}
	}

	hovered(mX, mY) {
		if(this.x_left_end < mX && mX < this.x_right_end &&
			this.y_upper_end < mY && mY < this.y_lower_end) {
			return this.latent.hovered(mX, mY)
					|| this.encoder_circles[0].hovered(mX, mY)
					|| this.decoder_circles[0].hovered(mX, mY)
					|| this.skpCn.hovered(mX,mY);
		}
	}

	link() {
		noFill();
		stroke(0);

		beginShape();
		for (let i=0; i<6; i++) {
			var x = this.encoder_traits[i][0];
			var y = this.encoder_traits[i][1];

			vertex(x,y);
		}
		endShape();	
		beginShape();
		for (let i=0; i<6; i++) {
			var x = this.decoder_traits[i][0];
			var y = this.decoder_traits[i][1];

			vertex(x,y);
		}
		endShape();	
	}

	setCircleColor(circles) {
		circles[0].refreshColor(turn_num);
		var base_color = circles[0].c;

		for (let i=1; i<5; i++) {
			circles[i].base_color = base_color;
			circles[i].refreshColor(turn_num);
		}
	}

}
