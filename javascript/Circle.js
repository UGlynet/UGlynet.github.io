class Circle {
	constructor(U_SCALE, vertices_gap, x, y, r, name, default_strokeWgt, activated, c, onum) {
		this.U_SCALE = U_SCALE;
		this.vertices_gap = vertices_gap;

		this.center_x = x;
		this.center_y = y;
		this.radius = r;
		this.activated = activated;
		this.base_color = c;

		this.c = color('red');
		this.ticker = 0;
		this.random_h = 0;
		this.random_s = 0;
		this.random_b = 0;
		this.order_num = onum;

		this.strokeWeight = default_strokeWgt;
		this.default_strokeWgt = default_strokeWgt;

		// controller
		if(activated) {
			this.controller_options = {
				options: operations,
				val: 50
			}
			let controller_labeltexts = ["어떻게 바꿀까요?", "얼마나 바꿀까요?"];
			this.controller = createGui(window, name, "QuickSettings");
			this.controller.addObject(this.controller_options, controller_labeltexts);
			controller_options.push(this.controller_options);
			this.controller.setValue('options', Math.floor(Math.random()*operations.length));
			controllers.push(this.controller);
			this.controller.on = false;
		}

		this.refreshColor(onum);
	}

	display() {
		strokeWeight(this.strokeWeight);
		fill(this.c);

		beginShape();
	    var r = this.radius;
	    for (var a=0; a<TWO_PI;a+=PI/vertices_amount) {
			var x = this.center_x + r*sin(a);
			var y = this.center_y + r*cos(a)* 1.1;

			var new_x = x + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset
			                * sin(a)    ); // originally: sin(a) 곱해야 함

			var new_y = y + ( noise(((x_off+x)/NOISE_SCALE), ((y_off+y)/NOISE_SCALE), z_off)
			                * px_offset
			                * cos(a)    ); // originally: cos(a) 곱해야 함
			vertex(new_x,new_y);
	    }
	    endShape();
	}

	clicked(mX, mY) {
		if( sq((mX-this.center_x)*1.1) + sq(mY-this.center_y) <= sq(1.1*this.radius+0.2*this.U_SCALE) ) {
			if(this.activated && this.controller.on==false) {
				this.controller.setPosition(mouseX, mouseY);
				this.controller.show();
				this.controller.on = true;
			} else {
				this.controller.on = false; 
			}
			return true;
		}
	}

	hovered(mX, mY) {
		if( sq((mX-this.center_x)*1.1) + sq(mY-this.center_y) <= sq(1.1*this.radius+0.2*this.U_SCALE) ) {
			this.c = color('rgb(0,0,255)');
			this.strokeWeight = 12;
			return true;
		} else {
			this.refreshColor(this.order_num);
			this.strokeWeight = this.default_strokeWgt;
			return false;
		}
	}

	refreshColor(onum) {
		var animate_b = 0;
		var animate_s = 0;

		if(onum==this.order_num) {
			animate_b = 40;
			animate_s = -30;
		}

		this.ticker++;
		if(this.ticker >= 100) {
			this.random_h = random(-40, 40);
			this.random_s = random(-5, 20);
			this.random_b = random(-5,10);
			this.ticker = 0;
		}

		if(this.activated) {
			this.c = color(toHsbString(hue_palette[this.controller.getValue('options').index],
										100 + animate_s,
										this.controller_options.val*0.5+50 + animate_b));
		} else {
			this.c = color(toHsbString(max(hue(this.base_color)+floor(this.random_h), 10),
										15 + animate_s,
										60 + this.random_b + animate_b));
		}
	}
}