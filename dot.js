var canvasDots = function () {
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        colorBackground = '#000000',
        colorWhite = '#ffffff';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    ctx.fillStyle = colorBackground;
    ctx.lineWidth = .1;
    ctx.strokeStyle = colorWhite;


    // Get mouse positions 
    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };


    var dots = {
        nb: 100 + Math.max(canvas.width, canvas.height) * 0.3,
        distance: 80,
        d_radius: 250,
        array: []
    };

    // Draw the dots 
    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;
    }

    Dot.prototype = {
        create: function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = colorWhite;
            ctx.fill();
        },

        animate: function () {
            for (i = 0; i < dots.nb; i++) {

                var dot = dots.array[i];

                if (dot.y < 0 || dot.y > canvas.height) {
                    dot.vx = dot.vx;
                    dot.vy = -dot.vy;
                } else if (dot.x < 0 || dot.x > canvas.width) {
                    dot.vx = -dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        },


        // Creating the lines between the dots 
        line: function () {
            for (i = 0; i < dots.nb; i++) {
                for (j = 0; j < dots.nb; j++) {
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                        if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                            ctx.beginPath();
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    };


    // Function to create the dots 
    function createDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Background color
        ctx.beginPath();
        ctx.rect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = colorBackground;
        ctx.fill();
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
            dot = dots.array[i];
            dot.create();
        }
        dot.line();
        dot.animate();
    }

    window.onmousemove = function (parameter) {
        mousePosition.x = parameter.pageX;
        mousePosition.y = parameter.pageY;
    }

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    setInterval(createDots, 1000 / 30);
};

// Load functions when windows open 
window.onload = function () {
    canvasDots();
};

window.onresize = function () {
    var canvas = document.querySelector('canvas');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    window.location.reload();
    canvasDots();
}