(function () {
    var ALPHA, AudioAnalyser, COLORS, MP3_PATH, NUM_BANDS, NUM_PARTICLES, Particle, SCALE, SIZE, SMOOTHING, SPEED, SPIN;
    NUM_PARTICLES = 150;
    NUM_BANDS = 128;
    SMOOTHING = 0.5;
    MP3_PATH = 'http://music.melatoninstudios.com/ListenToNewMusic-norealdrums.m4a';
    SCALE = {
        MIN: 5,
        MAX: 80
    };
    SPEED = {
        MIN: 0.2,
        MAX: 1
    };
    ALPHA = {
        MIN: 0.8,
        MAX: 0.9
    };
    SPIN = {
        MIN: 0.001,
        MAX: 0.005
    };
    SIZE = {
        MIN: 0.5,
        MAX: 1.25
    };
    COLORS = [
        '#060719',
        '#4C1B2F',
        '#9E332E',
        '#EBE54D',
        '#EB6528',
        '#FC9D1C',
        '#B59D1C',
        '#FF4E50',
        '#FC9D5D',
        '#1f6a83',
        '#FF006F'
    ];
    AudioAnalyser = function () {
        AudioAnalyser.AudioContext = self.AudioContext || self.webkitAudioContext;
        AudioAnalyser.enabled = AudioAnalyser.AudioContext != null;
        function AudioAnalyser(audio, numBands, smoothing) {
            var src;
            this.audio = audio != null ? audio : new Audio();
            this.numBands = numBands != null ? numBands : 256;
            this.smoothing = smoothing != null ? smoothing : 0.3;
            if (typeof this.audio === 'string') {
                src = this.audio;
                this.audio = new Audio();
                this.audio.controls = true;
                this.audio.src = src;
            }
            this.context = new AudioAnalyser.AudioContext();
            this.jsNode = this.context.createScriptProcessor(2048, 1, 1);
            this.analyser = this.context.createAnalyser();
            this.analyser.smoothingTimeConstant = this.smoothing;
            this.analyser.fftSize = this.numBands * 2;
            this.bands = new Uint8Array(this.analyser.frequencyBinCount);
            this.audio.addEventListener('canplay', function (_this) {
                return function () {
                    _this.source = _this.context.createMediaElementSource(_this.audio);
                    _this.source.connect(_this.analyser);
                    _this.analyser.connect(_this.jsNode);
                    _this.jsNode.connect(_this.context.destination);
                    _this.source.connect(_this.context.destination);
                    return _this.jsNode.onaudioprocess = function () {
                        _this.analyser.getByteFrequencyData(_this.bands);
                        if (!_this.audio.paused) {
                            return typeof _this.onUpdate === 'function' ? _this.onUpdate(_this.bands) : void 0;
                        }
                    };
                };
            }(this));
        }
        AudioAnalyser.prototype.start = function () {
            return this.audio.play();
        };
        AudioAnalyser.prototype.stop = function () {
            return this.audio.pause();
        };
        return AudioAnalyser;
    }();
    Particle = function () {
        function Particle(x1, y1) {
            this.x = x1 != null ? x1 : 0;
            this.y = y1 != null ? y1 : 0;
            this.reset();
        }
        Particle.prototype.reset = function () {
            this.level = 1 + floor(random(4));
            this.scale = random(SCALE.MIN, SCALE.MAX);
            this.alpha = random(ALPHA.MIN, ALPHA.MAX);
            this.speed = random(SPEED.MIN, SPEED.MAX);
            this.color = random(COLORS);
            this.size = random(SIZE.MIN, SIZE.MAX);
            this.spin = random(SPIN.MAX, SPIN.MAX);
            this.band = floor(random(NUM_BANDS));
            if (random() < 0.5) {
                this.spin = -this.spin;
            }
            this.smoothedScale = 0;
            this.smoothedAlpha = 0;
            this.decayScale = 0;
            this.decayAlpha = 0;
            this.rotation = random(TWO_PI);
            return this.energy = 0;
        };
        Particle.prototype.move = function () {
            this.rotation += this.spin;
            return this.y -= this.speed * this.level;
        };
        Particle.prototype.draw = function (ctx) {
            var alpha, power, scale;
            power = exp(this.energy);
            scale = this.scale * power;
            alpha = this.alpha * this.energy * 1.5;
            this.decayScale = max(this.decayScale, scale);
            this.decayAlpha = max(this.decayAlpha, alpha);
            this.smoothedScale += (this.decayScale - this.smoothedScale) * 1;
            this.smoothedAlpha += (this.decayAlpha - this.smoothedAlpha) * 1;
            this.decayScale *= 7;
            this.decayAlpha *= 0.975;
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x + cos(this.rotation * this.speed) * 250, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.smoothedScale * this.level, this.smoothedScale * this.level);
            ctx.moveTo(52.3, 41.3);
            ctx.lineTo(33.8, 44.6);
            ctx.lineTo(21.6, 30.3);
            ctx.lineTo(28, 12.6);
            ctx.lineTo(46.5, 9.2);
            ctx.lineTo(58.7, 23.6);
            ctx.lineTo(52.3, 41.3);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(96.7, 75.7);
            ctx.lineTo(71.7, 116.7);
            ctx.lineTo(23.7, 115.6);
            ctx.lineTo(0.6, 73.5);
            ctx.lineTo(25.6, 32.4);
            ctx.lineTo(73.6, 33.5);
            ctx.lineTo(96.7, 75.7);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(52.4, 23.3);
            ctx.lineTo(49.8, 9.6);
            ctx.lineTo(60.3, 0.6);
            ctx.lineTo(73.4, 5.1);
            ctx.lineTo(76, 18.8);
            ctx.lineTo(65.5, 27.9);
            ctx.lineTo(52.4, 23.3);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(108.7, 72.2);
            ctx.lineTo(85.6, 89);
            ctx.lineTo(59.4, 77.4);
            ctx.lineTo(56.4, 49);
            ctx.lineTo(79.5, 32.1);
            ctx.lineTo(105.7, 43.7);
            ctx.lineTo(108.7, 72.2);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(102, 9.2);
            ctx.lineTo(97.5, 12.7);
            ctx.lineTo(92.2, 10.6);
            ctx.lineTo(91.4, 4.9);
            ctx.lineTo(95.9, 1.3);
            ctx.lineTo(101.3, 3.5);
            ctx.lineTo(102, 9.2);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
            ctx.globalAlpha = this.smoothedAlpha / this.level;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            return ctx.restore();
        };
        return Particle;
    }();
    Sketch.create({
        particles: [],
        setup: function () {
            var analyser, error, i, intro, j, particle, ref, warning, x, y;
            for (i = j = 0, ref = NUM_PARTICLES - 1; j <= ref; i = j += 1) {
                if (window.CP.shouldStopExecution(1)) {
                    break;
                }
                x = random(this.width);
                y = random(this.height * 2);
                particle = new Particle(x, y);
                particle.energy = random(particle.band / 500);
                this.particles.push(particle);
            }
            window.CP.exitedLoop(1);
            if (AudioAnalyser.enabled) {
                try {
                    analyser = new AudioAnalyser(MP3_PATH, NUM_BANDS, SMOOTHING);
                    analyser.onUpdate = function (_this) {
                        return function (bands) {
                            var k, len, ref1, results;
                            ref1 = _this.particles;
                            results = [];
                            for (k = 0, len = ref1.length; k < len; k++) {
                                particle = ref1[k];
                                results.push(particle.energy = bands[particle.band] / 256);
                            }
                            return results;
                        };
                    }(this);
                    analyser.start();
                    document.body.appendChild(analyser.audio);
                    intro = document.getElementById('intro');
                    intro.style.display = 'none';
                    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
                        warning = document.getElementById('warning2');
                        return warning.style.display = 'block';
                    }
                } catch (_error) {
                    error = _error;
                }
            } else {
                warning = document.getElementById('warning1');
                return warning.style.display = 'block';
            }
        },
        draw: function () {
            var j, len, particle, ref, results;
            this.globalCompositeOperation = 'lighter';
            ref = this.particles;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                if (window.CP.shouldStopExecution(2)) {
                    break;
                }
                particle = ref[j];
                if (particle.y < -particle.size * particle.level * particle.scale * 2) {
                    particle.reset();
                    particle.x = random(this.width);
                    particle.y = this.height + particle.size * particle.scale * particle.level;
                }
                particle.move();
                results.push(particle.draw(this));
            }
            window.CP.exitedLoop(2);
            return results;
        }
    });
}.call(this));