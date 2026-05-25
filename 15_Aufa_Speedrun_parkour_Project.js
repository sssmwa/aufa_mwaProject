(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"15_Aufa_Speedrun_parkour_Project_atlas_1", frames: [[0,0,1280,1280],[0,1282,1280,1280],[0,2564,1280,1280],[1282,0,1280,1280]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.player_arm = function() {
	this.initialize(ss["15_Aufa_Speedrun_parkour_Project_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.player_Body = function() {
	this.initialize(ss["15_Aufa_Speedrun_parkour_Project_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.player_Head = function() {
	this.initialize(ss["15_Aufa_Speedrun_parkour_Project_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.player_leg = function() {
	this.initialize(ss["15_Aufa_Speedrun_parkour_Project_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Win_Message = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00CC00").s().p("AgmDoQgSgRABgYQAAgXAQgRQAQgRAXAAQAYAAARARQAQAQABAYQgBAYgQARQgRAQgYABQgWgBgQgQgAgHBUQgCgogNg4IgThNQgQhFAAgeQAAgbAPgQQARgRAZAAQAZAAARARQARARAAAaQAAAagSBJIgSBNQgLAogEA4g");
	this.shape.setTransform(679.65,42.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC00").s().p("AgnDoQgRgRAAgYQAAgXARgRQARgRAXAAQAXAAARARQARAQAAAYQAAAYgRARQgRAQgXABQgXgBgRgQgAgGBUQgDgogNg4IgThNQgQhFgBgeQABgbAQgQQAQgRAZAAQAZAAARARQAQARABAaQAAAagSBJIgTBNQgKAogEA4g");
	this.shape_1.setTransform(655.65,42.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00CC00").s().p("AjvDuIAAgNIAQAAQAVAAALgGQALgHAFgLQADgHAAglIAAk5QAAgkgDgKQgEgJgMgGQgMgHgUAAIgQAAIAAgNIDWAAQBUAAA0AXQA/AcAiA6QAgA6AABHQAAAzgQAqQgQAqgaAcQgaAbghARQgiARgwAJQgWAEgsAAgAg5jSIAAFzQAAAdACAHQADAGAHAEQAJAFATAAQA5AAAfgoQAqg2AAhyQAAhbgdg2QgXgrgjgQQgYgKg2AAIgFAAg");
	this.shape_2.setTransform(616.6,42.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00CC00").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_3.setTransform(566.775,42.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00CC00").s().p("ABqDuIiZjZIgeAAIAACGQgBAmAFAKQAEAKANAGQALAGAiAAIAAANIj0AAIAAgNQAgAAANgGQALgGAFgKQAEgKAAgmIAAk1QAAgmgEgKQgFgLgMgFQgMgGggAAIAAgNIDdAAQBVAAAoALQAoAMAaAhQAZAgAAArQAAA1gmAiQgYAVgrALIByChQAXAgAJAHQAOALAUABIAAANgAhNgDIAUAAQAwAAAYgJQAYgJANgXQAPgYAAglQAAg3gagaQgagag3AAIglAAg");
	this.shape_4.setTransform(518.65,42.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00CC00").s().p("AAXDzIAAgNIAJAAQAcAAALgHQAIgGAAgLQAAgGgCgHIgLgaIgZg7IioAAIgUAuQgJAXAAAPQAAAUAQAKQAJAFAlADIAAANIieAAIAAgNQAagEAQgRQARgRAYg3ICpl7IAHAAICsGGQAZA3APAPQAMAKAWACIAAANgAhyBSICPAAIhGikg");
	this.shape_5.setTransform(465.525,41.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00CC00").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_6.setTransform(414.775,42.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#00CC00").s().p("AjcDuIAAgNIAQAAQAVAAANgHQAIgFAFgMQAFgIAAgkIAAk5QAAgkgFgKQgDgJgMgGQgMgHgUAAIgQAAIAAgNID+AAIAAANIgVAAQgUAAgMAHQgJAFgGAMQgEAIAAAkIAAEvQAAAkAFALQADAJANAFQAIAEAiAAIAnAAQAmAAAZgOQAZgNAUgdQARgdARg4IAOAAIgSCng");
	this.shape_7.setTransform(367.05,42.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00CC00").s().p("AhmDbQg6gfghg5Qggg6AAhAQAAhEAkg9QAjg9A9giQA8ghBEAAQAyAAA4AVQAgANAJAAQALAAAJgIQAIgIACgSIAOAAIAAClIgOAAQgPhBgrgiQgpgjg2AAQgsAAglAaQglAagSApQgVA1AABBQgBA/ARA1QAQA0AiAbQAiAbA2AAQAuAAAlgUQAlgTAqgwIAAApQgoAqgrATQgsASg6AAQhLAAg8geg");
	this.shape_8.setTransform(317.1,42.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#00CC00").s().p("AjcDuIAAgNIAQAAQAVAAANgHQAIgFAFgMQAFgIAAgkIAAk5QAAgkgFgKQgDgJgMgGQgMgHgUAAIgQAAIAAgNID9AAIAAANIgUAAQgUAAgNAHQgIAFgGAMQgEAIAAAkIAAEvQAAAkAFALQADAJANAFQAJAEAgAAIAoAAQAmAAAagOQAYgNAUgdQARgdARg4IAOAAIgSCng");
	this.shape_9.setTransform(249.05,42.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#00CC00").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_10.setTransform(200.775,42.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#00CC00").s().p("AgLD0Iikl6QgehFgKgMQgJgMgdgDIAAgNIDlAAIAAANIgHAAQggAAgLAIQgIAFAAAKQAAAHADAIIATAuIBlDtIBejTQAQgmAFgNQADgNAAgJQABgLgHgIQgFgIgLgEQgPgGgZAAIAAgNICdAAIAAANQgbAEgUAYQgPARgdBBIijFsg");
	this.shape_11.setTransform(151.55,42.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#00CC00").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_12.setTransform(100.775,42.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00CC00").s().p("AjcDuIAAgNIAQAAQAVAAANgHQAJgFAEgMQAFgIAAgkIAAk5QAAgkgFgKQgDgJgMgGQgMgHgUAAIgQAAIAAgNID+AAIAAANIgVAAQgUAAgMAHQgKAFgFAMQgEAIAAAkIAAEvQAAAkAEALQAFAJAMAFQAIAEAiAAIAnAAQAmAAAZgOQAagNASgdQASgdARg4IAOAAIgSCng");
	this.shape_13.setTransform(53.05,42.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgnDoQgRgRAAgYQABgXAQgRQAQgRAYAAQAXAAARARQAQAQAAAYQAAAYgQARQgRAQgXABQgXgBgRgQgAgGBUQgDgogOg4IgShNQgRhFAAgeQABgbAPgQQARgRAZAAQAZAAARARQAQARAAAaQAAAagRBJIgTBNQgKAogEA4g");
	this.shape_14.setTransform(671.6,42.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgmDoQgSgRABgYQAAgXAQgRQAQgRAXAAQAYAAARARQAQAQAAAYQAAAYgQARQgRAQgYABQgWgBgQgQgAgHBUQgCgogOg4IgShNQgQhFAAgeQAAgbAPgQQARgRAZAAQAZAAARARQAQARABAaQgBAagRBJIgSBNQgKAogFA4g");
	this.shape_15.setTransform(647.6,42.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AjvDuIAAgNIAQAAQAUAAAMgGQALgHAFgLQADgHAAglIAAk5QAAgkgDgKQgFgJgLgGQgMgHgUAAIgQAAIAAgNIDVAAQBVAAA0AXQBAAcAgA6QAhA6AABHQAAAzgQAqQgQAqgaAcQgZAbgiARQghARgxAJQgVAEguAAgAg5jSIAAFzQAAAdADAHQACAGAHAEQAJAFASAAQA6AAAfgoQArg2AAhyQAAhbgdg2QgYgrgjgQQgYgKg2AAIgFAAg");
	this.shape_16.setTransform(608.55,42.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_17.setTransform(558.725,42.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("ABqDuIiYjZIggAAIAACGQABAmAEAKQAFAKALAGQAMAGAhAAIAAANIj0AAIAAgNQAhAAAMgGQAMgGAFgKQAFgKAAgmIAAk1QAAgmgFgKQgFgLgMgFQgMgGghAAIAAgNIDeAAQBWAAAnALQApAMAZAhQAZAgAAArQAAA1gmAiQgYAVgsALIBzChQAWAgAKAHQAOALATABIAAANgAhOgDIAUAAQAxAAAXgJQAZgJAOgXQANgYAAglQABg3gagaQgagag3AAIgmAAg");
	this.shape_18.setTransform(510.6,42.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAXDzIAAgNIAJAAQAcAAALgHQAIgGAAgLQAAgGgCgHIgLgaIgZg7IioAAIgUAuQgJAXAAAPQAAAUAQAKQAJAFAlADIAAANIieAAIAAgNQAagEAQgRQARgRAYg3ICpl7IAHAAICsGGQAZA3APAPQAMAKAWACIAAANgAhyBSICPAAIhGikg");
	this.shape_19.setTransform(457.475,41.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_20.setTransform(406.725,42.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AjbDuIAAgNIAPAAQAVAAAMgHQAJgFAGgMQADgIAAgkIAAk5QAAgkgDgKQgEgJgMgGQgMgHgUAAIgPAAIAAgNID8AAIAAANIgUAAQgUAAgNAHQgJAFgFAMQgEAIAAAkIAAEvQAAAkAFALQAEAJAMAFQAJAEAgAAIAoAAQAmAAAagOQAYgNATgdQATgdAQg4IAPAAIgSCng");
	this.shape_21.setTransform(359,42.325);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhmDbQg6gfggg5Qghg6AAhAQAAhEAkg9QAjg9A9giQA9ghBDAAQAyAAA4AVQAgANAJAAQAMAAAIgIQAIgIACgSIAOAAIAAClIgOAAQgPhBgqgiQgrgjg1AAQgtAAgkAaQglAagRApQgXA1AABBQAAA/AQA1QARA0AjAbQAhAbA3AAQAsAAAngUQAlgTApgwIAAApQgoAqgsATQgrASg6AAQhLAAg8geg");
	this.shape_22.setTransform(309.05,42.325);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AjbDuIAAgNIAPAAQAVAAAMgHQAJgFAGgMQADgIAAgkIAAk5QAAgkgDgKQgEgJgMgGQgMgHgUAAIgPAAIAAgNID8AAIAAANIgUAAQgUAAgNAHQgJAFgFAMQgEAIAAAkIAAEvQAAAkAEALQAFAJAMAFQAIAEAhAAIAoAAQAmAAAZgOQAagNASgdQASgdARg4IAPAAIgSCng");
	this.shape_23.setTransform(241,42.325);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_24.setTransform(192.725,42.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgLD0Iikl6QgdhFgLgMQgKgMgbgDIAAgNIDkAAIAAANIgIAAQgeAAgMAIQgIAFAAAKQAAAHADAIIATAuIBkDtIBfjTQARgmADgNQAFgNAAgJQgBgLgGgIQgFgIgLgEQgPgGgZAAIAAgNICcAAIAAANQgZAEgVAYQgPARgdBBIijFsg");
	this.shape_25.setTransform(143.5,42.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AjYDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgggBgIQgEgMgJgHQgOgJgXAAIgQAAIAAgNIGOAAIAACNIgNAAQgKg0gTgXQgSgWgigLQgUgGg2AAIgwAAIAADCIAJAAQAtAAAUgcQAVgdAFg3IAOAAIAAD4IgOAAQgEgpgNgaQgOgagSgIQgRgKgiAAIAACHQAAAnADAJQAEAJAJAFQAJAGATAAIAdAAQBDAAAogfQAogfASg/IANAAIgWCXg");
	this.shape_26.setTransform(92.725,42.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AjcDuIAAgNIAQAAQAVAAAMgHQAKgFAEgMQAEgIAAgkIAAk5QAAgkgEgKQgDgJgMgGQgMgHgUAAIgQAAIAAgNID9AAIAAANIgUAAQgUAAgNAHQgIAFgGAMQgEAIAAAkIAAEvQAAAkAFALQADAJANAFQAJAEAgAAIAoAAQAmAAAagOQAZgNATgdQASgdAQg4IAOAAIgRCng");
	this.shape_27.setTransform(45,42.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Win_Message, new cjs.Rectangle(0,0,713.3,83.7), null);


(lib._void = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg+pAvPMAAAhedMB9TAAAMAAABedg");
	this.shape.setTransform(401.025,302.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._void, new cjs.Rectangle(0,0,802.1,604.6), null);


(lib.Title = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhVBwQgggqAAhIQAAhEAggpQAggpA1AAQAfAAAdAUQAdATAOAhQANAhACBGIiXAAQACBAAhAAQALAAAKgJQAJgIABgOIBNAAQgWBhhXAAQg2AAgggpgAgYhHQgHAOAAAfIBAAAQAAgegIgOQgHgPgRAAQgRAAgIAOg");
	this.shape.setTransform(752.075,114.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ABkCVIAAipQAAgpgbAAQgcAAAAAoIAACqIhaAAIAAiuQAAgQgHgKQgIgKgLAAQgMAAgIAKQgHAKAAARIAACtIhbAAIAAkfIBbAAIAAAkQAmguAoAAQAwAAAOAyQAVgaAUgMQASgMAaAAQA/AAAABZIAADQg");
	this.shape_1.setTransform(692.2,114.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhjBwQgZgqAAhHQAAhFAZgpQAZgpAoAAQAVAAAOALQAPAKARAYIABAAIAAgkIBbAAIAAEfIhaAAIAAgmIgCAAQgQAYgQAMQgOALgVAAQgpAAgYgpgAgjgBQAABKAkAAQAiAAAAhKQAAhHgjAAQgjAAAABHg");
	this.shape_2.setTransform(629.775,114.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhvCiQgpg5AAhqQAAhrApg3QAqg3BOAAQBaAAAoBfIhaAlQgLgUgKgKQgKgIgRgBQgbABgMAeQgMAdAABDQAAA/ANAeQAOAdAdAAQAvAAABhEIgrAAIAAhPICOAAIAABEQAABSgnAuQgnAvhFAAQhLgBgqg5g");
	this.shape_3.setTransform(573.65,108.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhVCUIAAkfIBWAAIAAAwIACAAQAgg4AkAAIAPACIAABZQgRgDgOAAQgyAAAABAIAACPg");
	this.shape_4.setTransform(482.075,114.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhYBzQgcgjAAg0IAAivIBbAAIAAC3QAAAPAHAKQAHAJALAAQAaAAAAgmIAAizIBaAAIAAClQAAA/gdAjQgeAgg4ABQg9gBgcghg");
	this.shape_5.setTransform(431.15,115.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhbByQgigpAAhHQAAhIAggpQAggqA9AAQA9AAAgAqQAhApAABIQAABJgiAoQgiAng6AAQg6AAghgogAgZg3QgJAPAAAoQAABIAiAAQARAAAJgQQAJgQAAgoQAAgngJgQQgJgQgRAAQgQAAgJAQg");
	this.shape_6.setTransform(377.775,114.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAbDcIhCiMIgCAAIAACMIhbAAIAAm3IBbAAIAAD+IACAAIA9hlIBtAAIhdCAIBfCeg");
	this.shape_7.setTransform(325.4,107.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhVCUIAAkfIBWAAIAAAwIACAAQAgg4AkAAIAPACIAABZQgRgDgOAAQgyAAAABAIAACPg");
	this.shape_8.setTransform(274.675,114.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhjBwQgZgqAAhHQAAhFAZgpQAZgpAoAAQAVAAAOALQAPAKARAYIABAAIAAgkIBbAAIAAEfIhaAAIAAgmIgCAAQgQAYgQAMQgOALgVAAQgpAAgYgpgAgjgBQAABKAkAAQAiAAAAhKQAAhHgjAAQgjAAAABHg");
	this.shape_9.setTransform(222.675,114.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Ah+DQIAAmfIB1AAQA9gBAmAkQAlAjAAA6QAAA8gmAjQgmAihCAAIgQAAIAACegAgfgdQAfgBAPgMQAPgLAAgZQAAgbgPgLQgPgLgfAAg");
	this.shape_10.setTransform(168.975,108.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAbCUIAAivQAAgPgHgKQgHgJgLAAQgcAAAAAlIAACsIhbAAIAAkeIBbAAIAAAnIACAAQAfgwAtgBQAeAAASAVQASATAAAjIAADdg");
	this.shape_11.setTransform(808.175,43.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhXByQgcgiAAgzIAAiwIBbAAIAAC3QgBAPAIAJQAGAKALAAQAaAAAAgmIAAizIBbAAIAAClQgBBAgdAhQgdAig4AAQg+AAgbgjg");
	this.shape_12.setTransform(754.05,44);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhVCUIAAkfIBWAAIAAAwIACAAQAgg4AkAAIAPACIAABZQgRgDgOAAQgyAAAABAIAACPg");
	this.shape_13.setTransform(705.125,43.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhjC4QgZgqAAhHQAAhFAZgpQAZgqApAAQAkAAAgArIAAi6IBaAAIAAG3IhbAAIAAgmIgBAAQgfAwglAAQgoAAgYgpgAgiBKQAAAiAKASQAJASAQAAQAPAAAKgUQAJgTAAgkQAAhFgjgBQgiABAABKg");
	this.shape_14.setTransform(653.125,36.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhVBwQgggqAAhIQAAhEAggpQAggpA1AAQAfAAAdAUQAdATAOAhQANAhACBGIiXAAQACBAAhAAQALAAAKgJQAJgIABgOIBNAAQgWBhhXAAQg2AAgggpgAgYhHQgHAOAAAfIBAAAQAAgegIgOQgHgPgRAAQgRAAgIAOg");
	this.shape_15.setTransform(601.175,43.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhVBwQgggqAAhIQAAhEAggpQAggpA1AAQAfAAAdAUQAdATAOAhQANAhACBGIiXAAQACBAAhAAQALAAAKgJQAJgIABgOIBNAAQgWBhhXAAQg2AAgggpgAgYhHQgHAOAAAfIBAAAQAAgegIgOQgHgPgRAAQgRAAgIAOg");
	this.shape_16.setTransform(549.925,43.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ah9DPIAAmVIBbAAIAAAkIACAAQAegsAlAAQApAAAZAqQAZAqAABGQAABDgaAqQgZAqgoAAQgpAAgagxIgCAAIAACdgAgig3QAABJAiAAQAjAAAAhJQAAhHgjAAQgiAAAABHg");
	this.shape_17.setTransform(497.875,49.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhiDJIAAhhQAtAaAfAAQASAAAKgKQAKgKAAgQQAAgMgIgLQgIgLgUgQQgxglgWggQgWggAAgoQAAg2AigiQAigiA1AAQAoAAAoARIAABeQgrgXgaAAQgSAAgJAIQgKAJAAAPQAAAaAuAhQAcATAdAiQAdAjAAAvQAAA2gmAjQglAkg5AAQgoAAgogTg");
	this.shape_18.setTransform(444.1,37.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhsB3IAghEQAuAcAVAAQAKAAAIgGQAHgGAAgIQAAgIgGgFQgGgEgogRQghgPgOgSQgOgUAAgdQAAgpAcgbQAdgbArAAQArAAA/AiIgjBBQgpgZgaAAQgVAAAAASQAAAJAIAGQAHAHAWAHQApAPATATQASAUAAAeQAAAsgdAcQgdAcgtAAQgxAAg5gig");
	this.shape_19.setTransform(353.875,43.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgeBRIgRhUIAAhNIBfAAIAABNIgOBUg");
	this.shape_20.setTransform(310.1,23.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhjBwQgZgqAAhHQAAhFAZgpQAZgpAoAAQAVAAAOALQAPAKARAYIABAAIAAgkIBbAAIAAEfIhaAAIAAgmIgCAAQgQAYgQAMQgOALgVAAQgpAAgYgpgAgjgBQAABKAkAAQAiAAAAhKQAAhHgjAAQgjAAAABHg");
	this.shape_21.setTransform(262.425,43.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgzDcIAAjUIgfAAIAAhKIAfAAIAAhDQAAgoAbgXQAZgXAuAAIAkAAIAABaIgWAAQgKAAgGAHQgGAHAAALIAAAmIAsAAIAABKIgsAAIAADUg");
	this.shape_22.setTransform(215.525,35.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhYByQgbgiAAgzIAAiwIBaAAIAAC3QAAAPAIAJQAGAKALAAQAaAAAAgmIAAizIBbAAIAAClQgBBAgdAhQgdAig5AAQg9AAgcgjg");
	this.shape_23.setTransform(167.25,44);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("ABBDQIgQhFIhjAAIgQBFIhhAAIBvmgIBpAAIBvGggAggBAIA/AAQgVhcgKhUIgBAAQgLBWgUBag");
	this.shape_24.setTransform(111.675,37.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,941.6,144.7);


(lib.Player_jump = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.player_Head();
	this.instance.setTransform(16.65,-254.4,0.1757,0.1789,24.4496);

	this.instance_1 = new lib.player_arm();
	this.instance_1.setTransform(-112.3,78.15,0.1278,0.1429,-59.9986);

	this.instance_2 = new lib.player_leg();
	this.instance_2.setTransform(-60,-58,0.1762,0.1824);

	this.instance_3 = new lib.player_leg();
	this.instance_3.setTransform(-65.3,-37,0.1762,0.1824,-10.4772);

	this.instance_4 = new lib.player_Body();
	this.instance_4.setTransform(-7,-118.3,0.1167,0.1617,25.4578);

	this.instance_5 = new lib.player_arm();
	this.instance_5.setTransform(-96,55.65,0.1278,0.1429,-59.9986);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5,p:{scaleY:0.1429,rotation:-59.9986,x:-96,y:55.65}},{t:this.instance_4,p:{rotation:25.4578,x:-7,y:-118.3}},{t:this.instance_3,p:{rotation:-10.4772,x:-65.3,y:-37}},{t:this.instance_2,p:{rotation:0,x:-60,y:-58}},{t:this.instance_1,p:{rotation:-59.9986,x:-112.3,y:78.15}},{t:this.instance,p:{rotation:24.4496,x:16.65,y:-254.4,scaleX:0.1757}}]}).to({state:[{t:this.instance_5,p:{scaleY:0.1428,rotation:53.2072,x:16.8,y:-121.65}},{t:this.instance_4,p:{rotation:63.6622,x:60.25,y:-137.55}},{t:this.instance_3,p:{rotation:27.7226,x:-37.35,y:-112.45}},{t:this.instance_2,p:{rotation:38.1995,x:-30.9,y:-132.6}},{t:this.instance_1,p:{rotation:58.184,x:-9.8,y:-121.5}},{t:this.instance,p:{rotation:107.6484,x:256.15,y:-118.9,scaleX:0.1757}}]},4).to({state:[{t:this.instance_5,p:{scaleY:0.1428,rotation:53.2072,x:16.8,y:-121.65}},{t:this.instance_4,p:{rotation:63.6622,x:60.25,y:-137.55}},{t:this.instance_3,p:{rotation:51.4158,x:-40.45,y:-78.3}},{t:this.instance_2,p:{rotation:53.1991,x:-41.35,y:-105.55}},{t:this.instance_1,p:{rotation:58.184,x:-51.05,y:-102.8}},{t:this.instance,p:{rotation:77.6493,x:200.75,y:-220,scaleX:0.1756}}]},5).wait(11));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228.3,-254.4,484.5,498);


(lib.Player_fullbody = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.player_Head();
	this.instance.setTransform(-111,-247,0.1757,0.179);

	this.instance_1 = new lib.player_arm();
	this.instance_1.setTransform(-79,-111,0.1278,0.1429);

	this.instance_2 = new lib.player_leg();
	this.instance_2.setTransform(-98,-22,0.1762,0.1824);

	this.instance_3 = new lib.player_leg();
	this.instance_3.setTransform(-95,-24,0.1762,0.1824);

	this.instance_4 = new lib.player_Body();
	this.instance_4.setTransform(-72,-111,0.1167,0.1617);

	this.instance_5 = new lib.player_arm();
	this.instance_5.setTransform(-76,-111,0.1278,0.1429);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5,p:{scaleY:0.1429,rotation:0,x:-76,y:-111}},{t:this.instance_4,p:{rotation:0,x:-72,y:-111}},{t:this.instance_3,p:{rotation:0,x:-95,y:-24,scaleY:0.1824,skewX:0}},{t:this.instance_2,p:{scaleY:0.1824,skewX:0,skewY:0,x:-98,y:-22,scaleX:0.1762,rotation:0}},{t:this.instance_1,p:{scaleY:0.1429,rotation:0,x:-79,y:-111}},{t:this.instance,p:{rotation:0,x:-111,y:-247,scaleY:0.179}}]}).to({state:[{t:this.instance_5,p:{scaleY:0.1428,rotation:29.9939,x:-27.55,y:-132.1}},{t:this.instance_4,p:{rotation:19.2145,x:-14.65,y:-129.85}},{t:this.instance_3,p:{rotation:-10.0202,x:-99.45,y:-7.25,scaleY:0.1824,skewX:0}},{t:this.instance_2,p:{scaleY:0.205,skewX:33.6439,skewY:6.5144,x:-42.7,y:-36.55,scaleX:0.1762,rotation:0}},{t:this.instance_1,p:{scaleY:0.1428,rotation:-34.4489,x:-75,y:-37.35}},{t:this.instance,p:{rotation:4.2443,x:-60.9,y:-257.1,scaleY:0.179}}]},4).to({state:[{t:this.instance_5,p:{scaleY:0.1429,rotation:59.9986,x:20.35,y:-136.3}},{t:this.instance_4,p:{rotation:19.2127,x:-14.65,y:-129.85}},{t:this.instance_3,p:{rotation:-14.9987,x:-107.3,y:4.45,scaleY:0.1824,skewX:0}},{t:this.instance_2,p:{scaleY:0.205,skewX:44.1043,skewY:16.9725,x:-38.5,y:-41.7,scaleX:0.1762,rotation:0}},{t:this.instance_1,p:{scaleY:0.1429,rotation:-70.9361,x:-55.3,y:18.35}},{t:this.instance,p:{rotation:12.2077,x:-25.3,y:-265.1,scaleY:0.179}}]},5).to({state:[{t:this.instance_5,p:{scaleY:0.1429,rotation:59.9955,x:20.35,y:-136.3}},{t:this.instance_4,p:{rotation:19.2145,x:-14.65,y:-129.85}},{t:this.instance_3,p:{rotation:-14.9987,x:-107.3,y:4.45,scaleY:0.1824,skewX:0}},{t:this.instance_2,p:{scaleY:0.205,skewX:44.1043,skewY:16.974,x:-38.5,y:-41.7,scaleX:0.1762,rotation:0}},{t:this.instance_1,p:{scaleY:0.1428,rotation:-70.9341,x:-55.3,y:18.35}},{t:this.instance,p:{rotation:12.2077,x:-25.3,y:-265.1,scaleY:0.179}}]},5).to({state:[{t:this.instance_5,p:{scaleY:0.1429,rotation:-29.7525,x:-95.6,y:-57.85}},{t:this.instance_4,p:{rotation:-9.4321,x:-95.6,y:-95.1}},{t:this.instance_3,p:{rotation:0,x:-88,y:-24,scaleY:0.1849,skewX:9.3846}},{t:this.instance_2,p:{scaleY:0.1824,skewX:0,skewY:0,x:-94.35,y:-8.25,scaleX:0.1709,rotation:-8.7469}},{t:this.instance_1,p:{scaleY:0.1428,rotation:25.4373,x:-69.2,y:-132.05}},{t:this.instance,p:{rotation:6.4632,x:-108.35,y:-260.95,scaleY:0.1789}}]},3).to({state:[{t:this.instance_5,p:{scaleY:0.1429,rotation:-54.2219,x:-86.6,y:-17.5}},{t:this.instance_4,p:{rotation:-9.4321,x:-95.6,y:-95.1}},{t:this.instance_3,p:{rotation:0,x:-68.15,y:-24,scaleY:0.2092,skewX:29.3095}},{t:this.instance_2,p:{scaleY:0.1824,skewX:0,skewY:0,x:-106.45,y:31.6,scaleX:0.1709,rotation:-29.9963}},{t:this.instance_1,p:{scaleY:0.1429,rotation:51.4912,x:-23,y:-135.35}},{t:this.instance,p:{rotation:0,x:-139,y:-249,scaleY:0.179}}]},5).to({state:[{t:this.instance_5,p:{scaleY:0.1429,rotation:-54.2219,x:-86.6,y:-17.5}},{t:this.instance_4,p:{rotation:-9.4321,x:-95.6,y:-95.1}},{t:this.instance_3,p:{rotation:0,x:-68.15,y:-24,scaleY:0.2092,skewX:29.3095}},{t:this.instance_2,p:{scaleY:0.1824,skewX:0,skewY:0,x:-106.45,y:31.6,scaleX:0.1709,rotation:-29.9963}},{t:this.instance_1,p:{scaleY:0.1429,rotation:51.4912,x:-23,y:-135.35}},{t:this.instance,p:{rotation:0,x:-139,y:-249,scaleY:0.179}}]},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221.1,-265.1,420.9,499);


(lib.mouth_tween = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhQB6QgugEg1gWQgfgNg9gfQgxgagWgTIgcgbQgRgTgMgIQgUgOgFgGQgNgOADgNQACgJAJgGQAJgFAKAAQAPABAUAOQANAKAUAWQAXAYAKAJQASAPAZAOQAOAHAgAPQA9AdAdAHQAmALAogCQA0gBA9gXQAngOBFgiIDThpQATgJAKACQAMADAGANQAFANgGALQgHAOgbAOIjSBlQhTAogwAQQg8AUg1AAIgYgBg");
	this.shape.setTransform(0.015,0.0081);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-43.5,-12.3,87.1,24.6);


(lib.lvl3_bg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape.setTransform(669.125,298.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_1.setTransform(643.625,169.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1b7MgFBgybQPFswEcRRMAMMAt6g");
	this.shape_2.setTransform(683.075,273.5062);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_3.setTransform(496.125,298.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_4.setTransform(484.625,203.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(102,153,153,0.498)").s().p("ArRaaMgEKgp3QJdn+Loi+MAJyA0zg");
	this.shape_5.setTransform(512.8,283.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_6.setTransform(260.125,298.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_7.setTransform(267.625,376.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(102,153,153,0.498)").s().p("AryS6IjH/TIYjmgMAFQAlzg");
	this.shape_8.setTransform(280.175,331.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_9.setTransform(87.575,298.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_10.setTransform(76.075,203.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1ZOMgFBgybIThEhMAMMAt6g");
	this.shape_11.setTransform(101.525,290.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_12.setTransform(1477.325,298.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_13.setTransform(1451.825,169.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1b7MgFBgybQPFswEcRRMAMMAt6g");
	this.shape_14.setTransform(1491.275,273.5062);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_15.setTransform(1304.325,298.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_16.setTransform(1292.825,203.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(102,153,153,0.498)").s().p("ArRaaMgEKgp3QJdn+Loi+MAJyA0zg");
	this.shape_17.setTransform(1321,283.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_18.setTransform(1068.325,298.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_19.setTransform(1075.825,376.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(102,153,153,0.498)").s().p("AryS6IjH/TIYjmgMAFQAlzg");
	this.shape_20.setTransform(1088.375,331.275);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_21.setTransform(895.775,298.275);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_22.setTransform(884.275,203.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1ZOMgFBgybIThEhMAMMAt6g");
	this.shape_23.setTransform(909.725,290.825);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_24.setTransform(5476.625,298.275);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_25.setTransform(5451.125,169.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1b7MgFBgybQPFswEcRRMAMMAt6g");
	this.shape_26.setTransform(5490.575,273.5062);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_27.setTransform(5303.625,298.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_28.setTransform(5292.125,203.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(102,153,153,0.498)").s().p("ArRaaMgEKgp3QJdn+Loi+MAJyA0zg");
	this.shape_29.setTransform(5320.3,283.275);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_30.setTransform(5067.625,298.275);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_31.setTransform(5075.125,376.25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(102,153,153,0.498)").s().p("AryS6IjH/TIYjmgMAFQAlzg");
	this.shape_32.setTransform(5087.675,331.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_33.setTransform(4895.075,298.275);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_34.setTransform(4883.575,203.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1ZOMgFBgybIThEhMAMMAt6g");
	this.shape_35.setTransform(4909.025,290.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_36.setTransform(4675.375,298.275);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_37.setTransform(4649.875,169.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1b7MgFBgybQPFswEcRRMAMMAt6g");
	this.shape_38.setTransform(4689.325,273.5062);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_39.setTransform(4502.375,298.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_40.setTransform(4490.875,203.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(102,153,153,0.498)").s().p("ArRaaMgEKgp3QJdn+Loi+MAJyA0zg");
	this.shape_41.setTransform(4519.05,283.275);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_42.setTransform(4266.375,298.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_43.setTransform(4273.875,376.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(102,153,153,0.498)").s().p("AryS6IjH/TIYjmgMAFQAlzg");
	this.shape_44.setTransform(4286.425,331.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_45.setTransform(4093.825,298.275);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_46.setTransform(4082.325,203.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1ZOMgFBgybIThEhMAMMAt6g");
	this.shape_47.setTransform(4107.775,290.825);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_48.setTransform(3874.125,289.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_49.setTransform(3848.625,160.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1b7MgFBgybQPFswEcRRMAMMAt6g");
	this.shape_50.setTransform(3888.075,264.5062);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_51.setTransform(3701.125,289.275);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_52.setTransform(3689.625,194.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(102,153,153,0.498)").s().p("ArRaaMgEKgp3QJdn+Loi+MAJyA0zg");
	this.shape_53.setTransform(3717.8,274.275);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_54.setTransform(3465.125,289.275);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_55.setTransform(3472.625,367.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("rgba(102,153,153,0.498)").s().p("AryS6IjH/TIYjmgMAFQAlzg");
	this.shape_56.setTransform(3485.175,322.275);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_57.setTransform(3292.575,289.275);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_58.setTransform(3281.075,194.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1ZOMgFBgybIThEhMAMMAt6g");
	this.shape_59.setTransform(3306.525,281.825);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_60.setTransform(2276.675,298.275);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_61.setTransform(2251.175,169.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1b7MgFBgybQPFswEcRRMAMMAt6g");
	this.shape_62.setTransform(2290.625,273.5062);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_63.setTransform(2103.675,298.275);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_64.setTransform(2092.175,203.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(102,153,153,0.498)").s().p("ArRaaMgEKgp3QJdn+Loi+MAJyA0zg");
	this.shape_65.setTransform(2120.35,283.275);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_66.setTransform(1867.675,298.275);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_67.setTransform(1875.175,376.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(102,153,153,0.498)").s().p("AryS6IjH/TIYjmgMAFQAlzg");
	this.shape_68.setTransform(1887.725,331.275);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_69.setTransform(1695.125,298.275);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_70.setTransform(1683.625,203.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1ZOMgFBgybIThEhMAMMAt6g");
	this.shape_71.setTransform(1709.075,290.825);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_72.setTransform(3072.875,284.025);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_73.setTransform(3047.375,155.05);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1b7MgFBgybQPFswEcRRMAMMAt6g");
	this.shape_74.setTransform(3086.825,259.2562);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_75.setTransform(2899.875,284.025);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_76.setTransform(2888.375,189.05);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(102,153,153,0.498)").s().p("ArRaaMgEKgp3QJdn+Loi+MAJyA0zg");
	this.shape_77.setTransform(2916.55,269.025);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_78.setTransform(2663.875,284.025);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_79.setTransform(2671.375,362);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(102,153,153,0.498)").s().p("AryS6IjH/TIYjmgMAFQAlzg");
	this.shape_80.setTransform(2683.925,317.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(255,255,0,0.498)").s().p("AmUDIIAAmPIMpAAIAAGPg");
	this.shape_81.setTransform(2491.325,284.025);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(255,255,0,0.498)").s().p("AmPD6IAAnzIMfAAIAAHzg");
	this.shape_82.setTransform(2479.825,189.05);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("rgba(102,153,153,0.498)").s().p("Aq1ZOMgFBgybIThEhMAMMAt6g");
	this.shape_83.setTransform(2505.275,276.575);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("rgba(177,99,223,0.498)").s().p("EEVCAj1Mg53gADIAAADI/YAAMAAAg17QUtqQKrZ2QRBuAJfONQQY3BO/CoQTW6eFTbEMALVA57Mgj+AARgECX1Aj1Mg53gADIAAADI/XAAMAAAg17QUtqQKqZ2QRCuAJeONQQY3BO/CoQTW6eFTbEMALVA57Mgj+AARgEAapAj1Mg52gADIAAADI/YAAMAAAg17QUtqQKrZ2QRBuAJfONQQW3BPACoQTW6eFSbEMALWA57Mgj+AARgEhijAj1Mg53gADIAAADI/XAAMAAAg17QUtqQKqZ2QRCuAJeONQQY3BO/CoQTW6eFTbEMALVA57Mgj+AARgEjfvAj1Mg53gADIAAADI/YAAMAAAg17QUtqQKrZ2QRBuAJfONQQY3BO/CoQTW6eFSbEMALWA57Mgj+AARgElc8Aj1Mg53gADIAAADI/XAAMAAAg17QUtqQKqZ2QRCuAJeONQQY3BO/CoQTW6eFTbEMALVA57Mgj+AARgEk4+Aj1gEGSNAjhMg54gACIAAACI/WAAMAAAg16QUsqQKqZ1QRCt/JfONQQX3BPACoQTV6fFTbEMALWA57Mgj+AARg");
	this.shape_84.setTransform(2804.3,231.0011);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,5608.6,462);


(lib.lv2_platform = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AJ+kbIBNAAIAAErQhnCHkWhWQkeGBmVkjQjhAziEjCIAAkrIBGAAIGaAAIGlAAIAAFQQjiDjjDjjIAAlQAJ+kbIAADnQg3APgkAFQglAGjGgDQgUArgYAeQgXAdiDBcQiCBbi8hlQi8hmg1gEQgYg7AbglQipgCghgDIAAjnAC7kbIHDAA");
	this.shape.setTransform(71.475,28.4303);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AjSBwIAAlQIGlAAIAAFQQhxBxhpAAQhqAAhhhxg");
	this.shape_1.setTransform(69.05,22.5375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#993300").s().p("AjIDBQi8hmg2gEQgXg8AbgkQipgCgigDIAAjnIGbAAIAAFQQDCDjDjjjIAAlQIHDAAIAADnQg3AOgkAFQglAGjGgDQgUAsgYAeQgXAdiDBcQg+ArhKAAQhTAAhjg1g");
	this.shape_2.setTransform(71.1,24.619);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AllCfQjhAziEjCIAAkrIBGAAIAADnQAhADCpACQgbAlAYA7QA1AEC8BmQC8BlCChbQCDhcAXgdQAYgeAUgrQDGADAlgGQAkgFA3gPIAAjnIBNAAIAAErQhnCHkWhWQijDbjIAAQiZAAivh9g");
	this.shape_3.setTransform(71.475,28.4303);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,147,60.9);


(lib.Lv2_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,153,51,0.498)").s().p("Aw4tEILAs9IUdtPIjySDIhXKBMAAAAuZIHdC/MghxABFg");
	this.shape.setTransform(2074.85,297.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,153,51,0.498)").s().p("Aw4tEILAs9IUdtPIjySDIhXKBMAAAAuZIHdC/MghxABFg");
	this.shape_1.setTransform(118.95,314.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,153,51,0.498)").s().p("Aw4tEILAs9IUdtPIjySDIhXKBMAAAAuZIHdC/MghxABFg");
	this.shape_2.setTransform(1098,329.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC871").s().p("EgY8Aj8MglfAAAMAAAg2OQFQ50YeMsQTbyMJqb9QEKlmDboZQPCU0HnmgQE9EIF9yWUA8PBKIhVNAAAQwIAA1WiqgEghXgMaQRKGYLmuVItHCrIgCAAQngAAoHFSg");
	this.shape_3.setTransform(2536.8977,310.4613);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFC871").s().p("EgWbArtMAAAg2OQQX50cfnXQunKBhLdCUALLAgRgCwAQFg");
	this.shape_4.setTransform(2101.25,279.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFB471").s().p("AwHGsIAAtXMAgPAAAIAANXg");
	this.shape_5.setTransform(2421.575,218.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFC871").s().p("EgY8Aj8MglfAAAMAAAg2OQFQ50YeMsQTbyMJqb9QEKlmDboZQPCU0HnmgQE9EIF9yWUA8PBKIhVNAAAQwIAA1WiqgEghXgMaQRKGYLmuVItHCrIgCAAQngAAoHFSg");
	this.shape_6.setTransform(579.1977,325.3112);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFC871").s().p("EgWbArtMAAAg2OQQX50cfnXQunKBhLdCUALLAgRgCwAQFg");
	this.shape_7.setTransform(143.55,294.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFB471").s().p("AwHGsIAAtXMAgPAAAIAANXg");
	this.shape_8.setTransform(463.875,233.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFC871").s().p("EgY8Aj8MglfAAAMAAAg2OQFQ50YeMsQTbyMJqb9QEKlmDboZQPCU0HnmgQE9EIF9yWUA8PBKIhVNAAAQwIAA1WiqgEghXgMaQRKGYLmuVItHCrIgCAAQngAAoHFSg");
	this.shape_9.setTransform(1558.0477,344.1613);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFC871").s().p("EgWbArtMAAAg2OQQX50cfnXQunKBhLdCUALLAgRgCwAQFg");
	this.shape_10.setTransform(1122.4,313.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFB471").s().p("AwHGsIAAtXMAgPAAAIAANXg");
	this.shape_11.setTransform(1442.725,252.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Lv2_background, new cjs.Rectangle(0,0,2936.6,593), null);


(lib.lv1_platform = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AG5i7IGoAAIAACTIhSAAIAADkI4VAAIAAjkIhaAAIAAiTIGoAAIAACTIAhAAIAAiTIGnAAIAACTImnAAAG5i7IAACTImpAAAAQi7IGpAAAm4goIlOAAAMPgoIlWAA");
	this.shape.setTransform(86.525,18.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#323232").s().p("AsKByIAAjjIFPAAIAgAAIGnAAIGpAAIFWAAIAADjg");
	this.shape_1.setTransform(86.9,26.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#993300").s().p("AMPBJIlWAAIAAiSIGoAAIAACSgAG5BJImpAAIAAiSIAACSImnAAIAAiSIGnAAIGpAAIAACSgAsGBJIhaAAIAAiSIGoAAIAACSg");
	this.shape_2.setTransform(86.525,7.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,177.1,41.6);


(lib.levveeeel3_plataform = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AI4jFQAHAPAAASIAABcAFXkBIBzAAQAxAAAiAbQATAPAIASAFXkBIAAA8IDhAAAo+hIIR1AAIAAB2IioAAIhTCAIiViAIhhAAIg8BYIhnidIjHEZIAAjUIiEBqIiWhqIAAh2IAAh9IAAg8IEFAAIAAA8AB2kBIgDA8IDkAAAhij2IgFAxIDaAAAo+jFIEFAAIDSAAAk5kBIGvAAIDhAA");
	this.shape.setTransform(57.5,25.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#993333").s().p("AkfgtIiEBoIiXhoIAAh3IR1AAIAAB3IioAAIhTB+IiVh+IhgAAIg9BXIhnieIjGEZg");
	this.shape_1.setTransform(57.075,35.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AI2BdIx0AAIAAh9IAAg8IEGAAIGvAAIDhAAIAAA9IAAg9IByAAQAwAAAiAcQATAOAJATIjgAAIjlAAIAEg9IgEA9IjZAAIAEgyIgEAyIDZAAIDlAAIDgAAQAHAOAAARIAABdgAk4gfIDSAAIjSAAIkGgBgAk4gfIAAg9gABzgfg");
	this.shape_2.setTransform(57.5,9.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,119,55.6);


(lib.L1_Background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,153,0,0.247)").s().p("EhTRAI2UgiggB1AAAgCnUAAAgCmAiggB1QZhhXM7pLQDJAdg9B1QUMB4iCF+QEIiagHgPQBigTBZgPQAdAOAbAHQAUAFAsAEQAmAeAWAQQAtAfAlAPQAlAPAuAHQAiAEAzABQBCACBugEQCKgDBIgGQAsgEApgGIAwAHIBXAMQALA9gZBOQA7hOArgvIABAAQBTAMA/AFQAAAVgBAaQAZgYAigUQAWAAAPgDQAjgHAZgXIANgOQG3iLT9C/QxAjKEAgYQCshHCQAzQIlloErgVIBSgFQAAAIADAJQADAKAHAJIANAPIAmAlQAbAbAOAGQAOAHAUAAQAJAAAagEQAYgCATAAQAYAAAMAFQANAFAdAaQAZAWARADQASADAZgQIACgBQANgBAKgHIAQgOQAyApAfAVQAzAkArAUQBBAdBmANQCYAUASAEQBMAQCtBGQCfBBBbAMQA/AJApgRQANgFAMgJQAzANA7AKQAzAJBnANQEmAmCfAJQBqAFC1ABQC0ABBwgEQChgGCCgTIDfgmQCHgXBYgGQAxgDBtAAQBnAAA3gEQDhgRDbhpQApgTAagSQAjgZAXgiQATgZALggQJFCfACEGUAAEAH/gihAB1UgigAB2gwzAAAUgwzAAAgiggB2gAtciFQgogPgugiIgUgPQApAEAZAIQAbAKA2AgQAjAUAXALQg7gFgogQgEAsmgIbIADACIAFAEIgFAEQgIAGgGADQAHgJAEgKgEAnsgKqIAHgBIAIAHQARAOAGAJQgUgLgSgSg");
	this.shape.setTransform(1235.8415,514.9375,1.5395,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(102,102,102,0.247)").s().p("AisCCQhIhIASgoQARgmBIhIQBIhIAnAZQCAiUAoDQQBZAAAABlQAABlhBAnQhAAohmAAQhkAAhIhIg");
	this.shape_1.setTransform(408.5346,229.366,3.6313,1.8258,0,-5.4585,-2.0507);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(102,102,102,0.247)").s().p("AisCCQhIhIASgoQARgmBIhIQBIhIAnAZQCAiUAoDQQBZAAAABlQAABlhBAnQhAAohmAAQhkAAhIhIg");
	this.shape_2.setTransform(209.6846,266.416,3.6313,1.8258,0,-5.4585,-2.0507);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(102,102,102,0.247)").s().p("AisCCQhIhIASgoQARgmBIhIQBIhIAnAZQCAiUAoDQQBZAAAABlQAABlhBAnQhAAohmAAQhkAAhIhIg");
	this.shape_3.setTransform(1802.2346,229.366,3.6313,1.8258,0,-5.4585,-2.0507);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(102,102,102,0.247)").s().p("AisCCQhIhIASgoQARgmBIhIQBIhIAnAZQCAiUAoDQQBZAAAABlQAABlhBAnQhAAohmAAQhkAAhIhIg");
	this.shape_4.setTransform(1596.2846,266.416,3.6313,1.8258,0,-5.4585,-2.0507);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(102,102,102,0.247)").s().p("AisCCQhIhIASgoQARgmBIhIQBIhIAnAZQCAiUAoDQQBZAAAABlQAABlhBAnQhAAohmAAQhkAAhIhIg");
	this.shape_5.setTransform(1101.2846,229.366,3.6313,1.8258,0,-5.4585,-2.0507);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(102,102,102,0.247)").s().p("AisCCQhIhIASgoQARgmBIhIQBIhIAnAZQCAiUAoDQQBZAAAABlQAABlhBAnQhAAohmAAQhkAAhIhIg");
	this.shape_6.setTransform(896.4346,266.416,3.6313,1.8258,0,-5.4585,-2.0507);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AoRGzQjbi0AAj/QAAj+Dbi0QDci1E1AAQE2AADcC1QDbC0AAD+QAAD/jbC0QjcC1k2AAQk1AAjci1g");
	this.shape_7.setTransform(677.05,105.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AooIpQjljlgBlEQABlDDljlQDljlFDgBQFEABDlDlQDlDlABFDQgBFEjlDlQjlDllEABQlDgBjljlg");
	this.shape_8.setTransform(584.2,184.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AmLFFQikiHAAi+QAAi+CkiHQCkiGDnAAQDoAACkCGQCkCHAAC+QAAC+ikCHQikCHjoAAQjnAAikiHg");
	this.shape_9.setTransform(565.95,79);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AvfPfQmbmaABpFQgBpEGbmbQGbmbJEAAQJFAAGbGbQGaGbAAJEQAAJFmaGaQmbGcpFAAQpEAAmbmcg");
	this.shape_10.setTransform(400.2,140.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AwRQRQmvmvAApiQAAphGvmwQGwmvJhAAQJiAAGvGvQGwGwAAJhQAAJimwGvQmvGwpiAAQphAAmwmwg");
	this.shape_11.setTransform(201.25,170.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AoRGzQjbi0AAj/QAAj+Dbi0QDci1E1AAQE2AADcC1QDbC0AAD+QAAD/jbC0QjcC1k2AAQk1AAjci1g");
	this.shape_12.setTransform(2072.95,105.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AooIpQjljlgBlEQABlDDljlQDljlFDgBQFEABDlDlQDlDlABFDQgBFEjlDlQjlDllEABQlDgBjljlg");
	this.shape_13.setTransform(1980.1,184.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AmLFFQikiHAAi+QAAi+CkiHQCkiGDnAAQDoAACkCGQCkCHAAC+QAAC+ikCHQikCHjoAAQjnAAikiHg");
	this.shape_14.setTransform(1961.85,79);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AvfPfQmbmaABpFQgBpEGbmbQGbmbJEAAQJFAAGbGbQGaGbAAJEQAAJFmaGaQmbGcpFAAQpEAAmbmcg");
	this.shape_15.setTransform(1796.1,140.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AwRQRQmvmvAApiQAAphGvmwQGwmvJhAAQJiAAGvGvQGwGwAAJhQAAJimwGvQmvGwpiAAQphAAmwmwg");
	this.shape_16.setTransform(1597.15,170.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AoRGzQjbi0AAj/QAAj+Dbi0QDci1E1AAQE2AADcC1QDbC0AAD+QAAD/jbC0QjcC1k2AAQk1AAjci1g");
	this.shape_17.setTransform(1375,105.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AooIpQjljlgBlEQABlDDljlQDljlFDgBQFEABDlDlQDlDlABFDQgBFEjlDlQjlDllEABQlDgBjljlg");
	this.shape_18.setTransform(1282.15,184.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AmLFFQikiHAAi+QAAi+CkiHQCkiGDnAAQDoAACkCGQCkCHAAC+QAAC+ikCHQikCHjoAAQjnAAikiHg");
	this.shape_19.setTransform(1263.9,79);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AvfPfQmbmaABpFQgBpEGbmbQGbmbJEAAQJFAAGbGbQGaGbAAJEQAAJFmaGaQmbGcpFAAQpEAAmbmcg");
	this.shape_20.setTransform(1098.15,140.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AwRQRQmvmvAApiQAAphGvmwQGwmvJhAAQJiAAGvGvQGwGwAAJhQAAJimwGvQmvGwpiAAQphAAmwmwg");
	this.shape_21.setTransform(899.2,170.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#006600").s().p("Ei7PAQkMAAAghHUBDSATdA5jgTdQX6G7WsCAQAgAMAeAIQA5APBGAGQA1AFBNABQBnACCpgEIBegCQE+AME5gDIBKAGQCfAPBwAFQA+ADAmgGQA3gGAmgXQAJgGAJgIQZUhaXroBICZArQAEAIAJAIIAVAPIA4AlQArAaAVAHQAXAHAegBQAOAAApgDQAkgDAdAAQAlABASAEQAUAGAtAZQAnAXAaACQAbADAkgOIDgA1QA8AZA0AQQBjAdCeANIAbACQFOBEFKA0QDVA2B+ALQBFAGAzgGQb8DfaIj1QCYgBBTgDQFagRFRhpQBAgTAngTQAygXAigeQHih3HXifMAAAAhHg");
	this.shape_22.setTransform(1198.425,550.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.L1_Background, new cjs.Rectangle(0,0,2396.9,657), null);


(lib.jumpscare_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		playSound("freesound_communityglitchsoundeffect96251wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(10));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADlAAYAAAAgBABAAACYgBABAAADgCADYgDAGgIAHgLAGYgMAFgPAFgRAEYgJACgKACgKACYgKABgKABgLACYgWABgYACgagBYgGAAgHAAgGAAYgHgBgFAAgHgBYgHAAgHAAgHgBYgGgBgHgBgHAAYgHgBgGgBgHgBYgHgCgHgBgHgBYgOgCgNgFgNgEYgGgBgIgEgHgCIgIgEIgJgEYgDgCgCgCgCgBYgDgCgBgCgCgBYgBgCgCgBAAgBYAAgBAAAAAAgBYAAAAAAAAAAAAIAAgBIAAAAIAAAAYAAgBgBAEAAAAIABgFIAAgBIABAAYAAAAAAAAAAAAYAAAAAAAAAAAAYAAAAAAAAABgBYAAAAABgBAAgBYACgCACgBACgCYACgCACgBADgCYADgBADgCADgCIAJgEYADgBAEgBADgBIAFgCIAAAAYAAAAACgBgCABIAAAAIABgBIADAAYAOgEAPgFANgCYAHgBAGgCAHgBYAHgBAHgBAHgBYAGAAAHgBAHgBYAHgBAGAAAHAAYAHgBAFAAAHgBYAFAAAIAAAGAAYAbgBAXACAWABYALACALABAKABYAKACAJACAJABYARAFAPAEAMAGYALAGAIAHADAGYACADAAADABABYAAACABAAAAAAADlAAYAAAAgBAAAAgCYAAgCAAgDgBgDYgCgHgHgKgLgIYgLgIgPgIgSgGYgJgDgJgDgKgEYgKgDgLgCgMgDYgWgEgagEgagBYgHAAgFgBgIAAYgHAAgGAAgHAAYgHAAgHAAgHAAYgHAAgIABgHAAYgHABgIAAgHABYgIABgHABgIABYgQACgNAFgPADIgDABIgBAAIgCABIgBAAIgFACYgEABgEABgEACIgLAFYgEACgEACgDACYgEACgEADgEACYgEADgEAEgDADYgCACgCACgBADYgBABgBABgBABYgBACgBACAAACYgBACgBABAAACIgBADIAAABIgBAGYAAAAgBAFABgDIAAABIAAABIAAADIABAFYAAADACADABADYACAGAEAEAEAFYADADAEAEAEADYAEACAEADADACYAEACAEACAEACIAMAFYAEACADAAAEACIAFACYADAAABABACAAYAPAEAPAFAPACYAIABAHABAIABYAHABAIAAAHABYAIAAAHABAHAAYAHAAAHAAAHAAYAHAAAFAAAHAAYAIAAAGgBAHAAYAagBAZgEAXgEYAMgDALgDAKgCYAKgEAJgDAJgDYASgHAPgIALgIYALgHAHgKACgHYACgEgBgCAAgCYAAgCABgBAAAA");
	this.shape.setTransform(104.7486,7.1933,1,0.2174);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("APxAAYAAAAABABgBACYgBACgCACgDACYgHAEgLADgOAEYgdAGgrAFg3AFYg3AFhCAEhNACYhNADhXACheAEYhfAAhmAAhsAAYgbAAgcABgbgBYgbAAgcgBgdgBYg5gBg6gBg7gBYh2gBh6gJh7gGYgfgBgfgBgfgDYgfgCgfgDgfgDYgfgDgfgEgfgFYgPgCgPgDgPgDYgHgCgHgBgGgCYgDgBgCgCgCgBYAAAAAAAAgBAAYABAAgBAAABAAYAAABABAAAAACYABABAAAAAAABYAAACABgCgBAFIAAgBYABgBgBADAAABYgBABgBABAAAAYAAABAAAAAAAAYgBABABAAgBAAYABgBAAAAAAAAYACgBACgBADgBYAGgDAHgCAHAAYAPgEAPgDAPgCYAfgFAfgEAfgDYAfgDAfgDAfgCYAHgBAJgBAHAAIAXgBYAQgBAPgBAQAAYB8gGB6gJB2gBYA7gBA6gBA4gBYAdgBAcgBAbAAYAbgBAcABAbAAYBsAABnAABeAAYBfAEBWACBNADYBNACBCAEA3AFYA3AFArAFAdAHYAOADALAEAHAEYADACACACABABYABACgBAAAAAAAPxAAYAAAAABAAgBgCYgBgBgCgDgDgCYgHgEgKgEgPgEYgcgIgrgIg3gHYg3gHhCgHhNgEYhNgFhXgGhegGYhfgChmgDhtgCYgbgBgbgBgcAAYgbAAgdAAgcABYg5AAg6AAg8ABYh2gBh6AIh8AFYgQAAgPABgQABIgXABYgJAAgHABgIABYgfACggACgfAEYggADgfADggAFYgQADgQADgQAEYgIACgIACgJADYgFACgEACgFADIgEADYgCACgBABgCACYgBABgBABAAABYgBAAgBADgBACYgBACgBAEAAAAIAAABYgBAHABgCAAADYABACAAACABABYABAEACACACACYABACACABABABYACABABABACABYAFADAEACAFACYAIADAJADAIACYAQAEAQACAQADYAgAFAfADAgAEYAfADAfACAgACYAfADAfABAfABYB9AFB7AIB2gBYA7ABA6AAA5AAYAcABAcAAAbAAYAdAAAbgBAbgBYBtgCBmgDBfgCYBegGBXgGBNgFYBMgEBDgHA3gHYA3gHArgHAcgIYAPgEAKgEAHgFYADgCACgCABgCYABgCgBgBAAAA");
	this.shape_1.setTransform(98.954,7.2206,1,0.2174);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AEfAAYAAAAAAAFgFAHYgFAHgLAGgPAFYgPAGgTAEgWADYgMACgLACgNACYgMABgNABgOABYgbACgeABgggBYgIAAgIAAgIAAYgHgBgIAAgIgBYgJAAgIAAgJgBYgIAAgJgBgIgBYgIgBgJgBgIgBYgJgBgJgBgIgCYgJgBgJgBgIgCYgJgCgIgCgJgCYgEgBgFAAgEgCYgEgBgFgBgEgBYgIgDgIgCgIgEYgHgDgIgDgFgEYgDgCgBgCgBgBYgBgBAAgBAAAAYAAAAAAAAAAAAIAAAAIAAAAIAAAAYAAgBAAADAAAAIAAgDYAAABAAAAAAAAYAAAAAAAAABgBYABgBACgCACgCYAFgEAIgEAHgDYAQgGARgFARgEYAJgCAIgCAJgBYAJgDAJAAAIgCYAJgBAIgBAJgBYAIgBAJgBAIgBYAJgBAIgBAJAAYAIgBAIAAAJAAYAIgBAIAAAHgBYAIAAAIAAAIAAYAggBAeABAbACYAOABANABANABYAMACAMACALABYAWAEATAEAPAGYAPAFALAGAFAHYAFAHAAAEAAAAAEfAAYAAAAABgEgEgIYgFgIgKgJgPgIYgPgHgTgIgWgGYgLgDgMgDgMgDYgNgCgNgDgOgCYgcgEgfgEgggBYgIAAgIgBgJAAYgHAAgJAAgIAAYgJAAgIAAgJAAYgJAAgIAAgJABYgJAAgJABgJAAYgJABgJABgKABYgJACgKAAgIACYgJACgJACgJABIgHACIgDAAIgDABIgCAAYgEABgFACgFABYgJADgJADgKAEYgJAEgKAEgKAHYgEAEgFAEgFAGYgCAEgCADgCAEYAAADgBADgBADIAAADYAAAAAAADAAgBIAAAAIAAACIABAEYAAACABACAAACYACAEACAEACADYAEAGAFAFAFAEYAKAHAKAEAJAEYAKAEAJADAJADYAFABAFABAEABYAFABAFABAEABYAKACAJACAJACYAJACAJAAAKABYAJACAJABAJABYAJAAAJABAJAAYAJABAJAAAIAAYAJAAAIAAAJAAYAIAAAJAAAHAAYAJAAAHgBAJAAYAggBAegEAdgEYAOgCANgDANgCYAMgDAMgEALgDYAWgFATgIAPgHYAPgIAKgJAFgIYAEgIgBgFAAAA");
	this.shape_2.setTransform(447.8519,7.2041,1,0.2174);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("APxAAYAAAAABABgBACYgBACgCACgDACYgHAEgLADgOAEYgdAGgrAFg3AFYg3AFhCAEhNACYhNADhXACheAEYhfAAhmAAhsAAYgbAAgcABgbgBYgbAAgcgBgdgBYg5gBg6gBg7gBYh2gBh6gJh7gGYgfgBgfgBgfgDYgfgCgfgDgfgDYgfgDgfgEgfgFYgPgCgPgDgPgDYgHgCgHgBgGgCYgDgBgCgCgCgBYAAAAAAAAgBAAYABAAgBAAABAAYAAABABAAAAACYABABAAAAAAABYAAACABgCgBAFIAAgBYABgBgBADAAABYgBABgBABAAAAYAAABAAAAAAAAYgBABABAAgBAAYABgBAAAAAAAAYACgBACgBADgBYAGgDAHgCAHAAYAPgEAPgDAPgCYAfgFAfgEAfgDYAfgDAfgDAfgCYAHgBAJgBAHAAIAXgBYAQgBAPgBAQAAYB8gGB6gJB2gBYA7gBA6gBA4gBYAdgBAcgBAbAAYAbgBAcABAbAAYBsAABnAABeAAYBfAEBWACBNADYBNACBCAEA3AFYA3AFArAFAdAHYAOADALAEAHAEYADACACACABABYABACgBAAAAAAAPxAAYAAAAABAAgBgCYgBgBgCgDgDgCYgHgEgKgEgPgEYgcgIgrgIg3gHYg3gHhCgHhNgEYhNgFhXgGhegGYhfgChmgDhtgCYgbgBgbgBgcAAYgbAAgdAAgcABYg5AAg6AAg8ABYh2gBh6AIh8AFYgQAAgPABgQABIgXABYgJAAgHABgIABYgfACggACgfAEYggADgfADggAFYgQADgQADgQAEYgIACgIACgJADYgFACgEACgFADIgEADYgCACgBABgCACYgBABgBABAAABYgBAAgBADgBACYgBACgBAEAAAAIAAABYgBAHABgCAAADYABACAAACABABYABAEACACACACYABACACABABABYACABABABACABYAFADAEACAFACYAIADAJADAIACYAQAEAQACAQADYAgAFAfADAgAEYAfADAfACAgACYAfADAfABAfABYB9AFB7AIB2gBYA7ABA6AAA5AAYAcABAcAAAbAAYAdAAAbgBAbgBYBtgCBmgDBfgCYBegGBXgGBNgFYBMgEBDgHA3gHYA3gHArgHAcgIYAPgEAKgEAHgFYADgCACgCABgCYABgCgBgBAAAA");
	this.shape_3.setTransform(443.704,7.2206,1,0.2174);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("A9qAyQhAgVAAgdQAAgcBAgVQBAgUBaAAQBbAABAAUQBAAVAAAcQAAAdhAAVQhAAUhbAAQhaAAhAgUgAXSAyQhRgUAAgeQAAgbBRgVQBSgUByAAQBzAABRAUQBRAVAAAbQAAAehRAUQhRAUhzAAQhyAAhSgUg");
	this.shape_4.setTransform(280.225,7.1935,1,0.2174);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AP5AzQklgVAAgeQAAgdElgVQElgVGeAAQGeAAEkAVQElAVAAAdQAAAeklAVQkkAVmeAAQmeAAklgVgAYhgxQhRAUAAAdQAAAcBRAUQBSAVByAAQBzAABRgVQBRgUAAgcQAAgdhRgUQhRgUhzAAQhyAAhSAUgEgl+AAzQkkgVAAgeQAAgdEkgVQElgVGeAAQGeAAElAVQElAVAAAdQAAAeklAVQklAVmeAAQmeAAklgVgA8bgyQhAAVAAAdQAAAcBAAUQBAAVBaAAQBbAABAgVQBAgUAAgcQAAgdhAgVQhAgVhbAAQhaAAhAAVg");
	this.shape_5.setTransform(272.325,7.2207,1,0.2174);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AGEAUYgTAAgSAAgTABIABAAIgFgBYgBgBgCAAgBgBYgCAAgBgBgBgBYgBgBgBgBgBgBIgBAAYgBgBgBAAgBAAYgTgBgTgBgTAAYgTgBgTAAgTAAIg5gBIgdAAIgOAAIgFAAIgCABYAAAAgBAAgBAAYgBABACgBgEACYgDABgDAEgBAEYgBADAAADACAEYABAEAEADADABYAEABAAAAAAAAIADABIAIAAIgCgfIhJAGYgGABgGAAgGAAIgRAAIgkABIhKgDIgSgBIgSgBIgkgCIgCAoYAOAAAOAAAOgBYAHAAAHAAAJgCYACAAACgBADAAIADgCYABAAAAAAABAAYABgBABAAABgBYABgBABAAABgBIAAgBYABAAAAgBABAAYABgCABgBABgCYADgGgBgGgDgGYAAgCgBgBgBgBIgBgBYgBgBAAgBgBAAYgBgBgBgBgBAAIgBgBYgBgBgCgBgBAAYgDgCgCAAgCgBYgIgBgHgCgHgCYgHgBgGgBgHgCYgOgCgOgDgNgCIgpgGIgogFIhRgMIgCAfYAzgGAzgGAygHYANgBANgCAMgCIAmgHYAZgEAZgFAZgFIAAAAYgZABgaABgZABIgmACYgNABgNABgMAAYgzACgzACgzADYgJAAgGAIAAAIYABAHAFAGAHACIABAAIBQAOIAUAEIAUAEIApAHYANACANADANADYAHABAGABAHACYAGABAGACAFACYACAAABABAAAAYABAAAAAAgBAAIAAAAYAAgBgBAAAAAAYgBgBAAAAAAgBIgBgBYAAAAgBgBgBgCYgCgFgBgFADgGYAAgBABgCABgBYABAAAAgBABAAIAAAAYABgBAAgBABAAYAAAAABgBABAAYAAAAAAAAAAAAYAAAAAAAAABAAYAAAAgBAAgCAAYgFABgGAAgHAAYgNABgNAAgOAAIgBAAYgLAAgJAJAAALYAAAKAJAJAKABIAmACIATABIATAAIBJABIAmgCIASgBYAHAAAGAAAGgBIBLgKIAAAAYAIgBAGgIgBgJYgBgIgHgFgIAAIgGAAYgBAAAAAAAAAAYAAAAAAAAAEABYACABAEADACAEYABAEAAACAAAEYgBAEgEAEgDABYgEACADgBgBAAYgBABgBAAAAAAYgBAAABAAAAAAIADAAIANgCIAdgCIA4gDIA5gFIA5gEIgEgCYACABACACACABYACABACABACAAYACABACAAABAAIAGABIAAAAYABAAAAAAAAAAYASgDASgDATgDIAAAA");
	this.shape_6.setTransform(61.5806,19.7157);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AADgFYAAAAgBAAgCgCYgBgBgDgBgCgBYgCgCgCAAgCgBYgBAAAAgBAAAAYAAAAgBgBABAAYAAAAAAAAAAAAIAAABIABAAIAAAAIAAAAYgCABAEgDAAAAIAAAAIAAAAIAAABYAAAAAAAAAAABYAAABAAADABACYABADABACAAADYABABABABAAAAIAAAAYAAAAABABABACYACACABACABACYACACACACABABYAAAAABAAAAAAIAAABIAAAAIAAAAYAAAAAEgDgCABIAAAAIAAAAIAAAAIABAAYABAAABgBABAAYAAgBABgBAAAAYAAgBABgBgBgBYAAgCgCgCgBgCYgCgCgCgBgBgCYgCgBgBgCAAAAIAAAA");
	this.shape_7.setTransform(104.7837,21.1501);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("APxABYAAAAAAABAAABYAAACgBADgBAEYgDAHgHAKgNAIYgZARgqAPg3ANYgbAHgfAGgiAFYgRADgRADgSACYgTADgSACgUACYgUADgUACgVACYgVADgVADgWABYgsADguADgwAEYgxACgyABg1ACYgNABgNAAgNABYgNAAgOAAgNAAYgbAAgcAAgbAAYgcAAgdABgcAAYgbgBgdgBgdAAYgegBgdgBgeAAYgegBgegCgegCYgegBgegCgfgCYgPAAgQgCgPgBYgPgCgQgBgPgCYgfgCgggDgfgDYgfgEgfgFgggEYg/gIg+gLg+gPYgfgHgfgJgcgLYgOgGgOgHgLgHYgFgEgFgFgDgEYgCgCgBgBgBgCYAAgBAAgBAAAAYAAgBAAAAAAgBIAAAAYAAAAAAgBgBACYABgCAAgCAAABYAAAAAAgBAAgBYABgCABgCACgCYADgEAFgEAFgEYAMgIANgHAPgFYAcgMAfgJAegHYAfgIAfgGAggGIAXgEIAMgCIALgCYAQgCAQgCAQgCYAfgEAggFAfgEYAfgDAfgDAfgDYAQgBAPgBAPgCYAQgBAPgCAPAAYAfgCAegCAfgBYAegCAegCAegBYAdAAAegBAdgBYAdAAAdgBAbgBYAcAAAdABAcAAYAcAAAbAAAbAAYAOAAANAAANAAYAOABANAAANABYA0ACAyABAxACYAwAEAuADAtADYAWABAVADAVADYAVACAUADATACYAUACATACASADYASACASADAQADYAiAGAfAGAbAGYA3AOAqAPAZARYANAIAHAKADAHYABAEABADAAACYAAABAAABAAAAAPxABYAAAAAAgBAAgCYAAgBAAgDgCgEYgCgIgHgKgMgJYgZgTgqgRg3gPYgbgIgfgHghgHYgRgEgSgDgSgEYgSgCgTgDgUgDYgTgDgUgDgVgDYgVgEgVgDgWgCYgtgEgugFgxgFYgwgDgzgDg0gDYgOgBgNgBgNAAYgNgBgOAAgNAAYgbgBgcgBgcAAYgcgBgcgBgdAAYgbAAgdAAgeAAYgdABgdAAgeAAYgeAAgeACgfABYgeACgfABgfABYgPABgQABgQABYgPACgQABgPABYggADgfACggADYggAEgfAEggAEYgPACgQADgQACIgNABIgMACIgYAEYgfAGggAHggAHYggAIggAJggANYgPAGgQAIgQAKYgHAGgIAGgHAJYgDAEgDAFgDAGYgCAFgCALABACYgBACABgBAAABIAAADYAAACAAABAAACYABADABADABADYACAGADAFAEAFYAHAIAHAHAIAFYAPALAQAHAQAHYAgANAgAIAfAIYBAAPBAALBAAIYAgAEAfAEAgAEYAgADAfACAfADYAQABAQABAPACYAQABAPABAQABYAfABAeABAfACYAeABAfACAeAAYAdAAAeAAAdABYAdAAAdAAAcAAYAdAAAcgBAcgBYAcAAAbgBAbgBYAOAAANAAAOgBYANAAANgBANgBYA1gDAygDAxgDYAxgFAugFAsgEYAXgCAVgDAVgEYAUgDAVgDATgDYAUgDATgCASgDYASgDASgEAQgDYAigHAfgIAbgHYA3gPAqgSAYgSYANgJAHgKACgIYACgEAAgDAAgBYAAgCAAgBAAAA");
	this.shape_8.setTransform(443.7005,7.3997);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AEfAAYAAAAgBAFgBAKYgCAFgBAGgDAHYgCADgCADgCAEYgCAEgCADgDAEYgLAOgRAPgXANYgGACgFAEgGADYgHADgGADgHADYgHACgGADgIACYgHACgHADgIACYgeAIgiAEglABYgJAAgJAAgJgBYgIAAgKAAgKgBYgSgCgTgCgTgFYgFgBgFgBgFgBYgEgBgFgCgFgBYgJgCgJgEgKgDYgSgIgSgIgRgMIgHgEIgFgEYgEgDgEgCgDgEYgEgDgDgDgEgEIgJgKYgKgPgGgQAAgSIABgOYABgDABgEABgEIAFgMIAIgLYAKgPAQgMAQgLIAMgIIAOgHYAFgDAEgBAFgCYAEgCAEgCAFgCYAJgDAJgEAKgCYAFgCAEgBAFgBYAFgBAFgBAEgBYAngIAmgDAkAAYAjABAjAEAeAIYAfAIAbALAWANYAXANARAOALAPYADAEACADACAEYACADACAEACADYADAHABAGACAEYABAKABAFAAAAAEfAAYAAAAAAgFAAgKYgCgKgCgQgKgQYgKgRgRgSgXgQYgWgQgbgOgggLYgggLgkgHgngDYgkgCgpABgqAHYgVADgVAGgVAHYgFACgGACgFACYgFACgGADgEACIgPAHIAAAAIgCABIgCACIgEACIgHAEYgTANgTAOgPAUYgEAGgDAFgEAGYgDAFgCAGgDAGYgCAHgBAHgCAHIAAAIIgBAJYAAAaAJAaAQAUIAMAOYAEAFAEAEAFAEYAEAEAGADAEAEIAIAFIAHAEYASAMAVAKAVAIYAKADALAEAKACYAGACAFABAFABYAFABAGABAFABYAVAEAUACAVABYAKAAAKAAAIAAYALAAAJgBAKAAYAmgDAkgHAggLYAIgDAIgDAHgDYAHgDAIgEAHgDYAGgEAGgEAHgDYAGgEAGgEAFgEYAXgPARgSAKgRYAKgRACgQACgKYAAgKAAgFAAAA");
	this.shape_9.setTransform(447.85,7.2199);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgGgDYAAAAgBABgBACYgBACgBACAAADYgCAFAAAEACABYAAAAABAAAAAAIABAAIAAAAIAAAAIAAAAYgCgCABACAAgBIAAAAIAAAAIAAAAYAAAAABAAAAAAYACgBACgBACgCYACgBABgCACgCYACgBABgBAAAAIAAAAYAAAAABgCABgCYABgBABgDABgCYABgDAAgCAAgCYAAAAAAgBAAAAIAAAAIAAAAIAAAAYAAgBACACgDgCIAAAAIAAAAIAAAAIAAgBYAAAAgBgBAAAAYgCgBgDACgEADYgBACgCACgCACYgBACgBABAAAAIAAAA");
	this.shape_10.setTransform(122.2655,-4.5831);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AnIBJIgPgFIAAAAIgagLYgEgCgEgCgEgCIgMgHYgEgCgEgDgEgCIgLgIYgCgBgCgCgCgBIgFgFIgKgJIAAAAYgFgEgFgDgEgEYgFgCgEgFgFgEYgEgEgEgEgDgFYgEgEgCgFgDgGYgBgCAAgDgBgDYgBgCAAgDAAgDYAAgDAAgCABgDYABgDABgCABgDYACgCABgCACgDYACgCACgCACgCYAEgEAEgDAFgEYABAAABgCAAgBIAAAAYgBgDAAgDAAgCYAAgDABgCABgDYABgCACgCABgCYACgCACgCACgCYACgBAAgDgBgBYAAgBgBgBgBAAYgEgBgFgBgEgBYgEgBgEgCgDgBYgBgBAAgBABADYgBACAAgBABAAYABgBACAAACgBYAEgBAFAAAEgBYARgCASAAASgBIA2gCIANAAIAEAAIADAAIAGAAIAbAAIBrACIA2ABYARAAASABASABIA2ADYASABARABASABIBqAJYASACARABASACIA1AGIAOACIANABIAaAEIA1AHYABAAAAAAABAAIAAAAIAAAAIgBAAIAHABIACAAIAAAAIAAAAYAAAAABAAgBAAIAAAAIAAAAIABAAIAEABIAPADIAfAHIAeAGYAKACALACAKACIA7AQIAeAHYAFABAFACAFACIAPAEIgBgBIAwAXIAMAHYACABACACABABIAGADYADADADADADADYACABABABACABIAEAEIAAAAYABABABABAAABYAFADAFADAEAEYAEADAEAEAEAEYACABABACACACYACACACACABACYACACABACABACYACACAAACABACYABACAAACABACYAAACABACgBABYAAACAAACgBACYAAABgBACgBACYgBABgBACgBACYgCABgBACgCACYgCABgBACgCACIgHAEYgFAEgCAGABAGIAAAAYAAACABACAAABYAAACgBABAAABYgBABAAABgBACYgBABgBABgCABIAAAAYgGAGgBAJAFAHYACACADACADABYAHABAGACAFABYABABABAAABAAYAAABAAAAAAAAYAAAAgBgBAAAAYAAAAgBgBAAgBYgBAAAAAAgBgCYgBgCAAgBAAgCYAAgBAAgDABgBYAAgCABgBABgBYAAgBAAAAABgBYABgBAAABABgBYAAAAAAAAAAAAYAAAAgBAAgBABYgKACgOABgMABYgNABgNAAgOABIgnABIgTABIgTAAIgngBIhPAAIgngBIgUAAIgKAAIgBAAIgDAAIgFAAIhOgEIgngCIgngDIhOgFIAAgBYgBAAAAAAAAAAIAAAAIAAAAIgqgDYgBAAgBAAgBAAIgfAAIAPAGYAAABABABAAAAIAAABIAAAAIAAABIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAgBYAAAAgBgBABAAYAAAAAAABAAAAYAAAAAAACAAgBYAAAAAAAAAAAAYAAgBAAAAAAgBIABgBYABgLgIgKgLgCYgDAAgCAAgDAAIgEgCYgBAAgBAAgBgBIgEgCYgBAAgBgBgBAAYgDgCgCgCgCgCIgDgCIgHgFYgDgBgCgCgCgCYgCgCgBgCgCgBYAAgBgBAAAAgBIgBgBYAAgBAAgBgBAAIgKAYYAJgDAIgEAIgFYAJgFAIgGAHgJYAEgEADgFADgFYABgDABgDABgDYABgDABgDAAgDYAAgEAAgDAAgDYAAgDAAgDgBgDYgBgFgCgGgCgFIAAAAIAAAAIgIgOYgCgFgCgEgCgFYgCgFgBgFgCgEYgBgDAAgCgBgDIgBgHIgQAXYAbgFAagEAbgGYANgDANgEAOgEYACgBAEgBADgBYAEgCADgBAEgCIAGgDYACgBACgBACgCYABgBABgBACgBYABgBABgBABgCYACgCABgBABgDYABgDABgDAAgEIAAAEIABgEIABgFYABgCAAgCABgBIABgDYABgDABgCABgCYAAgBABgBAAAAIABgBIAAgBIAAAAIAAAAYAAAAgCADABgCIAAAAIAAAAIABgBIACgCYAAAAAAABgBAAYAAAAAAAAAAABIgBAAYgEABADgBgBABIAAAAIAAAAIABgBIAAAAIABAAYAAAAABgBAAABYgBAAAAAAgBAAIAAAAIgBAAIAAAAIAAAAYABAAgCAAACAAIAAAAIADAAIAFAAIAUgCIApgCIAUgBIAKgBIAFAAIADAAIAAAAYACgBgEABgDgBYgEgBgFgEgCgEYgCgEAAgEAAgCIASATYABABACAAABAAYAAAAABAAAAABYABAAAAAAAAAAYAAAAAAAAAAAAYAAgBgBAAAAAAYAAgBgBAAAAgBYAAAAAAgBAAAAIAVARIBygJYAKAAAJgBAKgBIAcgBIA5gCIAAAAYALgBAJgJgBgLYAAgKgJgIgKgBIivgFIhYgDYgHAAgIAAgGgBYAAAAAAAAAAAAIABABYAGADgPgLAVAQYgCAxgFgegDALYgFABADAAgBAAYgCAAABAAAAAAIADAAIAFAAIALAAIAsABIBXABIAsABYAPAAAPAAAOABICvAJIABgoIh9ABIg/ABIggABIgQAAIgIABIgCAAIgBAAIgDAAYgDABgEABgDABYgKAEgEALADAJYADAHAGAFAHAAIADABIAoADIATABIAKABIADABYABAAAAAAgBAAIgBgBYAAAAgBAAgBgBIgCAAIAAgBIgCgBYgCgBgCgDgCgEYgBgEAAgFABgDYABgDACgDAAAAYAAgBABAAAAgBYACgCABgBACgBYABAAABgBAAAAIACAAYABgBAAAAABAAYABAAAAAAAAAAIgBAAIgBAAYgKABgJAJABAKYAAAJAHAIAIABIAgAHIAIACYADABADAAADAAIASADIgGgmYgCABgDABgDABYgBABgBAAgCABYgBABgCABgCABIgCACYgBABgCABgBABYgBAAgCADgBACYgBACAAAAgBADYgBACAAACAAACYAAAFACAEACAEYABACACACACABYACACAAAAACABYABABABAAABABYACAAACABABABYACAAACABABAAYADABACAAADABYAFABAFAAAFABIgDglYgDABgDAAgEACYgDABgEABgEACYgCABgCABgCABYgBABgBABgBABYgCAAgBABgBACIgDACIgBACYAAAAgBABAAABYgCADgBADAAAFYAAADAAACAAACYABACABACABABYAAACACABABACIACACYADADACABADABYACACACAAACABYAEACAEABADABYAIACAGABAHACIADgmIgUABYgHAAgHAAgHABIgLABYgEAAgEAAgEABYgCABgBAAgCABYgBAAgBAAgBABIgCABIgBABIgCABYgBABgBABgBABYgBABgEAHABAFYAAACAAADABACIABABIABABIABACYAAABABABABABIABABYACABABABAAAAIACABIABABIADAAYAFACADABAEABIACglIgEAAYgCAAgCABgCABYgBAAgBAAgBABYgCABgBABgBABIgCABYgBABgBABgBABYgBABgBADgBACYgBACgBACAAACYAAABAAACAAABIAAACYAAACABABAAACYAAABABABAAABIACADYAAABABABAAAAIADAEYACAEAEACAEABIABAAYAGABAHACAGABYADABADABADABYABAAACABABAAYABABACAAABABYACABADABABABYABAAABABAAAAYAAAAAAAAABAAYgBAAAAAAAAAAYAAAAAAgBgBgBYAAgBAAgBAAAAYAAgBABgBAAAAYAAAAAAAAAAAAYAAAAAAAAAAAAYAAAAgBABAAAAIgDAFYgFAIAEALAJAFYADABADABADAAIAxgDIgOgFIAHAHIAKgdYg3AMg3ALg2APYgbAHgbAIgbAKYgHACgHADgGACYgHADgHADgHADYgDACgDACgEABYgDACgEACgDACIgFAEIgFAEYgDACgEAEgDAEYgEAFgBAGACAFIAAABIANAgIAQgYIj0AGIACAAIgagCYgIgBgIgBgJgBIg0gGIg0gFIgagDIgMgCIgNgCIhmgUIhlgYIgCAbYAbgEAcgEAbgGYANgDAOgDAOgEYAGgCAHgDAHgDYAEgBADgCAEgCYADgCAEgDAEgEYACgCACgDABgEYABgEABgFgCgDYgCgIgFgEgDgDIgRgLYgLgIgKgIgIgJYgFgFgEgEgDgFYgDgFgDgFgBgFYgCgFAAgFABgFYABgEACgFAEgEIgKAEIHxgLIAAAAYACAAABgBAAAAYADgBACgBACgCYABAAABgBABgBYABgBABgBABgBYACgBABgCABgCYAAgDAAgEgBgCYAAgBgBgBgBgBYAAgBgBgBgBAAYgBgBgBgBgCgBYgFgCgEgCgEgBIgCAAIgCgBIgDAAIgGgCIgBAPIBCgHIgHgGYAAABAAABAAABIgBADIAAAAYAAAEACADAEABIABAAYADAAAEAAADABYACAAABABACAAYACABABAAACABIAEACIAFADIADABIABAAIAAAAIAAAAIAAABIAAAAIAAAAYAAAAgBgBAAAAIABAAIABABIACACIACACIAAgBIABABIAAAAIAAABIAJAFYACACACACADACYADACABADACACYABABABACABABIACAEIABgHIgIAIYgCADgCADgCADIgDAFYgBACgBACAAACIgCAFYAAACgBACAAACYAAAEgBADAAAEYABAEgBAEABADYABAEABAEABADIAEAKIAEgGIhLgBYgCAAgCABAAACYAAABAAABAAAAIAAAAIANAcYACACAAADABACIADAIIAFAPIADgEIgRABIgIAAIgEABIgDAAIgBAAYAAAAAAAAgBABYAAAAAAAAgBAAYABAAgCACABABIAAgCIgGAHYgDADgBADgCADYgCADgBADgBAEYgBABAAACAAACIgBAFIACgCYgNABgNACgNABYgGABgHABgGABYgEAAgDABgDABYgCAAgBAAgCABYgBAAgBAAAAABYgBAAAAAAgBAAIAAABYgBAAAAABAAAAIAAAAIAAABIAAAAIgBACIABAAYgCAEAAAEgCAEYgBAEgBAEgCAEYgBACgBACgBABYgBACgBACgCACIgCACYgBAAgBABgBAAYgBABAAAAgBAAIgDABIAAAAIghADIAAAAIAhgCIAAAAIADgBYABAAABAAABgBYABAAABgBABAAIACgDYACgBABgCABgCYABgCABgBABgCYACgEACgEABgEYACgEAAgFACgEIAAAAIAAgBIAAAAIAAgCIAAAAYAAAAAAAAAAAAIABAAYAAAAAAAAAAAAYABAAABgBABAAYABAAACgBABAAYAEAAADgBADAAYAGgBAHgBAGAAYANgCANgBANgBYABAAABgBAAgBIAAAAIABgFYAAgBAAgCABgBYABgDABgDACgDYACgCABgDADgCIAGgIIABgCYAAAAAAABAAABYgBAAAAAAAAAAYAAABAAAAAAAAYgBAAABAAAAAAIAAAAIACgBIAEAAIAIAAIARgBIAAAAYACAAABgBAAgCYAAAAAAgBAAAAIgFgPIgDgIYAAgCgBgDgBgDIgNgcIgDAFIBLACYADAAACgBAAgCYAAgBAAAAAAgBIgBAAIgDgKYgBgDAAgDgBgDYgBgEABgDgBgDYAAgDABgDAAgEYAAgBABgCAAgBIACgFYAAgBABgBABgCIACgEYACgDACgCACgDIAHgGIAAgBYACgBAAgDgBgCIgCgFYgBgBgBgCgCgCYgCgDgCgDgDgCYgDgDgCgCgDgCIgJgHIABABIAAAAIgBgBIgCgCIgDgBIgBgBIAAgBIgBAAIgBgBIgCgBIgFgDYgCgBAAAAgBgBIgDgBYgCgBgCAAgCgBYgCgBgDAAgCgBYgEgBgEAAgEAAIAGAIIABgFYAAgCAAgCAAgBYAAgEgDgCgEAAIAAAAIAAAAIhDAFYgEABgCADAAAEYAAADACADADABIABAAIAGABIADABIACAAIAAAAIABAAYAEABADACADABYABABAAAAAAAAYABAAAAAAAAAAYAAAAAAAAgBAAYAAAAAAgCAAAAYAAgBAAABAAAAYAAABgCABgBAAYgCABgCABgBABIADgBInxAEYgEAAgDACgCACYgFAHgEAIgCAIYgCAJAAAJACAIYACAJAEAGAEAHYAFAHAEAFAFAGYAKALALAIAMAJIAQALYABABABACAAgBYgBgBAAgBABgBYAAAAAAAAAAAAYgCACgGADgFACYgGACgGACgGACYgNAEgNADgNACYgaAGgbAEgbADIAAAAYgHABgGAHABAIYABAGAEAEAGABIBmAbIBmAVIANACIACABIABAAIACAAIADAAIAGABIAaADIA0AHIA0AGYAJABAJABAIABIAaADYABAAAAAAABAAIAAAAIDzgFYAKAAAIgIgBgJYAAgCAAgCgBgCIAAgBIgMgfIgCARYACgDAEgDAFgDYACgCADgBADgCYADgBACgCADgBYAGgDAGgDAHgCYAGgCAGgDAHgCYAZgJAbgIAagHYA2gOA2gMA2gLIABAAYAKgCAGgKgCgKYgBgCgBgDgDgCIgIgKYgEgDgFgCgFAAIAAAAIgxACIAPAfYABgCACgCACgDYABgBABgCAAgBYABgBABgCAAgBYABgEABgFgBgFYAAgFgDgEgCgDYgBgBgBgCgBgBYgBgBgBgBgBgBYgDgCgCgBgCgCYgEgDgEgBgEgCYgCgBgBAAgCgBYgCgBgCgBgCAAYgDgBgEgBgEgBYgHgCgHgCgHgBIALAHYAAAAAAgBAAAAYAAAAAAAAAAAAYAAAAAAAAAAAAYAAAAAAAAAAABYAAAAAAABAAABYABAAgBAAAAABYAAAAABABgBAAYAAACAAABgBABYAAACgBABgBABYAAABgBAAAAAAYAAABgBAAAAAAYAAABgBAAgBAAYAAAAAAAAAAAAYAAABgBAAABgBYAAAAAAAAABAAIADAAYAKgDAGgKgDgKYgBgHgGgFgHgCYgDgBgDAAgBgBYAAAAAAAAAAAAIABABYAAAAABAAAAABIABABYABAAABABAAABYABAAAAABAAAAIABABIAAACYABACABACAAACYAAAFgDAFgBABYgBABgBABgBABYAAAAAAABgBAAYAAAAgBAAAAABIgBAAIgBABYAAAAAAgBABAAYACAAADAAADgBIAJAAYAHgBAGAAAHAAIAUgBYALAAAIgJAAgLYgBgJgGgHgJgCIAAAAYgGgBgGgBgFgCYgDgBgCAAgDgBYAAgBgCAAAAAAYAAgBgBAAABABYAAAAAAAAABABYAAAAABABAAABYABABAAAAAAACYABABAAACAAABYgBAEAAABgBACIgBABIAAABYAAAAAAAAAAAAYgBABAAAAAAAAYAAgBAAAAABAAIACgBYACgBADgBADgBYACgBADgBADgBIAAAAYAKgDAGgLgDgKYgDgHgGgFgHgBYgEgBgFAAgEgBYgCAAgCgBgBAAYgBgBgBAAgBAAYAAAAgBAAAAAAYAAgBAAAAAAABYABAAgBAAABAAYABABABABABABYACADAAADABADYAAACgBACAAABYgBACAAAAAAABYgBACgBABAAAAYgBAAAAABAAAAIAAAAYAAgBABAAABAAYAAAAABgBABAAYABgBACgBACAAYAKgEAFgLgEgKYgDgHgGgFgGgBIgCAAIgOgCYgCAAgCAAgDgBIgHgCIgfgGIgEAmIACAAYABAAAAAAACAAYABgBABAAABAAIABgBYABAAABAAABgBYACgBABgBACgBYAAgBABgBAAgBYABAAABgCABgDYABgEAAgFgBgEYgCgEgCgCgCgCIgBgBIgBAAIgBgBIgBAAYgBgBgBAAgBgBIgBAAYgCAAAAAAgBgBIgGAAIgKgBIgUgCIgogEIAIAlYgBABAAABgBAAYgBAAAAAAAAAAIABAAIACAAIAHgBIAPAAIAggBIA+AAIB9gBIABAAYALAAAIgJAAgLYAAgLgIgIgKgBIixgJYgPgBgOAAgPAAIgsgBIhYgBIgsgBIgLAAIgGAAIgDAAYgBAAAAAAgCAAYgBABADgBgFABYgEALgFgegCAyYAWAPgPgLAFAEIACAAIABAAYAJABAHAAAHAAIBYADICwAFIAAgoIg6ADIgdABYgJAAgKABgKABIhzAJIAVARYAAgDAAgCgCgDYgBgDgBgCgCgDYgCgCgCgCgCgCYgCgBgCgCgCgBYgCgBgCAAgBgBYgCgBgCAAgCgBYgDgBgDAAgDAAIARATYAAgCgBgEgCgEYgDgEgFgEgEgBYgEgBgEABABAAIgBAAIgCAAIgGAAIgKABIgVABIgpADIgUABIgFABIgDAAIAAAAYACAAgBAAAAAAIAAAAIgBAAIgBAAIgBAAYgCAAgBAAgBABYgCAAAAAAAAAAIgBABIgBAAIgCABIgCABIgCABYgCABgCACgBABIgCACIgBABIAAAAIgBABIgBABIAAAAIgCADYgCADgBACgBACYgCAEgCAEgBAEIgDAGYAAACAAABgBACIgBAFIgCAGIAAAEYAAgCAAgCABgBYAAgBAAgBABAAYABgBgBAAAAAAYAAAAAAAAAAABIgCABIgDACYgDABgBABgDABYgDABgDABgDABYgLAEgNADgNADYgZAFgaAFgaAEIgBABYgKABgGAKABAJYAAABABAAAAABIACAJYABADAAADABADYACAFACAGACAGYADAFACAGADAEIAIAQIgBgBYABACABADABADYAAABAAABAAABYAAABAAABAAABYAAABAAABgBACYAAABAAABgBABYgBACgBACgCACYgHAJgOAHgOAGIgCABYgIADgEAKADAJYABAAAAABAAAAIAEAHIACADYABABAAABABABYADADADAFADACYAEADADADADACIAKAHIgDgCIAMAIYACACACABACABIAHADYACABADABACAAIAHACYAFABAFAAAFABIgRgYYgBACAAACgBADIAAAEYAAABAAADAAABIAAADYAAACAAgBABABIAAABIAAAAIAAABIAAABIABAAYABAEACADACADYAEAEAFACAFAAIAAAAIAfgBIgCAAIAsAEYABAAAAAAABAAIAAAAIgBAAIBOAFIAnADIAnACIBPADIAFAAIAFAAIAKAAIAUAAIAnAAIBPAAIAnAAIAKAAIAFAAIACAAIAEAAIATgBIAogCYANgBANAAANgBYANgBANgBAQgEYACAAACgBADgBYAAAAABgBABAAYABgBABAAACgCYABgBAAAAABgCYABgBABgCABgBYAAgCABgDgBgCYAAgCAAgCgBgCYgBgCAAAAgBgBYgBgBgBgBAAgBYgBAAgBgBgBgBYgCgBgBgBgBAAYgDgBgCgBgCgBYgHgCgHgBgGgCIAGAbYADgDADgDADgDYADgEACgEABgEYACgFAAgEABgEYAAgFgBgEgBgEIgGAQIAIgGYADgCACgCADgDYACgCADgDACgDYACgDACgDACgDYACgEACgDABgEYABgEAAgFABgEYAAgEgBgEAAgEYgCgEAAgEgCgDYgCgDgBgEgCgDYgCgDgCgDgCgCYgCgDgCgDgCgCYgDgCgCgDgCgCYgFgEgEgFgFgCYgFgEgFgEgFgEIACADIgFgGYgCgCgCgCgCgBYgEgDgEgEgEgDIgGgEYgCgCgCgBgCgCIgMgHIAAAAIgBgBIgBAAIAAAAIgCgBIgDgBIgHgDIgNgGIgagLYgBgBAAAAAAAAIgBAAIgPgEYgFgBgFgCgFgBIgegIIg9gOYgKgDgLgBgKgCIgegGIgfgGIgPgDIgEgBIgDAAIgCgBIgIAAIAAAAYAAgBAAAAgBAAIAAAAIABABIg1gHIgbgDIgNgBIgNgCIg2gFYgSgCgSgBgSgBIhqgHYgSgBgSgBgSAAIg1gCYgSgBgSgBgSAAIg2AAIhrABIgbAAIgGAAIgEAAIgEAAIgNABIg1ADYgSABgSABgSACYgFABgEABgFABYgCAAgCABgDABYgBABgBAAAAABYgBABgCABAAACYABAFACAAABABYAFADAEABAFACYAEABAFABAEABIgBgHYgDACgCACgCADYgDACgBADgCADYgBAEgBADAAADYAAAEAAADABADIABgDYgFADgFAEgEAEYgCADgCACgCACYgCADgCADgBADYgBACgCADAAAEYgBADgBADAAADYAAADABADAAAEYABACABAEACACYACAGADAFAEAFYAEAFAEAEAEAEYAFAFAEADAFADYAFAEAFADAFAEIgBAAIALAJIAGAEYABACACABACABIAMAIYAEACAEADAEACIAMAGYAFACAEACAEACIAaALIAAAAIAPAEIAAAA");
	this.shape_11.setTransform(100.4895,6.9993);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AN/B0QklgwAAhDQAAhDElgwQElgwGeABQGegBEkAwQElAwAABDQAABDklAwQkkAumeABQmegBklgugAWnhwQhRAuAABBQAABABRAuQBSAtByABQBzgBBRgtQBRguAAhAQAAhBhRguQhRgthzAAQhyAAhSAtgEgjfACeQhwgBgkgEQCrABj4gmQg4gJgwgIQC/gOBxgQQBeAbB7AWQBRAKBQAIIACAEQkHAHA3AAQhJAMhAAAIgKgBgA8HCJIAGgFIgFAFIgBAAIABAAIgFADIAEgDgA5Kh0IgKgCIgJgFQgNgGgPgBIABgIQCjgOBCAAQligJBUAAQDbAAC1ANQj2ACgFACQBbAHgSAAQAwAMAPABQgpAOA4AHQg+ASBIAOIgRABQhagah0gUgA8IiKIBZAJQAhAJgbANIhsACQAFgYAIgJg");
	this.shape_12.setTransform(284.525,7.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AZkBuQhRgtAAhBQAAhABRguQBRgtBzAAQByAABRAtQBSAuAABAQAABBhSAtQhRAuhyAAQhzAAhRgugA6/COIAfgBIAsAEIgEAAIgzAFQgPgCgFgGgA50CRIgsgEIBWgCIgEADIgEAAIgiADgA6/COIgCgEIAhADIgfABIAAAAgA7BCKIgBgFIABgIQgXAAgSgQQgXgOgHgPQA1gWAAggQAAgKgFgKQgSgggGgdQCWgZAAgUIABgDIgBADQAAAUiWAZQAGAdASAgQAFAKAAAKQAAAgg1AWQAHAPAXAOQASAQAXAAIgBAIIABAFQhRgIhQgLQh8gVhegbQDMgcg3giQhbg9AjguIGGgFIBsgCQAcgOghgIIBaALIhagLIgMgDIBCgGIhCAGIAMADIhagKQADgDAEgCIAGgBIBugHQAUACABAMIAAAIQAPAAAMAHIAJAFIAFAEIgFgEIAKABQB1AVBaAZQhLADAnAIQgRACALANQBNAPgZAaIAxgDIAIAIQkdA7gfAqIAMAgIieADIAFgFQAHgKAGgWIAAgCIAAgBQAAgEBNgHQAAgQASgTIAAAAQAAgBAhgBQgHgcgQgfIBLACQgHgRAAgOQAAgaAWgTQgGgPgWgOIgBAAIgBgBIABABIABAAQAWAOAGAPQgWATAAAaQAAAOAHARIhLgCQAQAfAHAcQghABAAABIAAAAQgSATAAAQQhNAHAAAEIAAABIAAACQgGAWgHAKIgFAFIhWACIghgDgA5KCLIAAAAg");
	this.shape_13.setTransform(265.6875,7.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(255,255,255,0)").s().p("AsnEaQgSgJgOgPQgPgPgGgTQgGgQAAgRIACgWIAEgVIAHgUQAEgKAGgJQAHgOALgLIAVgWIAIgHIACgEIAFgJQAMgRAOgNQAPgMANgNIAdgcIAlglQANgOARgJIAZgPIAagVQAMgKAOgIQARgKASgIIAmgQQAUgKAVgFIAWgGIAJgEIAJgEIAIgEIAJgEIALgFIAKgFIAMgEIAJgBIAIgCIAJgBIAIgBIAGgBIAGgCQBpgwB0AIQBDAEBCgBQB3gDB2AOQBBAIA9AZIBIAfQBiArBdA1IATAMQAUAIASALQASALAQANQAQAMAOAOQASAQAOATQANATAKAVQAJARADATQAMAYgBAcQgDAhgUAZQgXAcgiAHQgjAHgggRQgfgRgQgfQgLgVgCgXIgCgDIgHgHIgHgHIgHgHIgIgFIgIgEIgIgFIgJgDIgJgEIgHgEIgIgGIgIgGIgHgGQgNgIgOgHIgbgOIgegOQgPgGgOgHIgagQIgPgIIgigKIgggLIgfgMIgegMIgegIIgKgDQgpgDgpABIhfAAIhqAAIhYAAQgdgBgcACIgPAFIgRAGIgTAIIgSAHQgKADgLACIgUAEIgLABIgTAKIgUAJIgUAIIgVAHIgVAGIgLADIgJAEIgKADIgJAFIgJAFIgJAFIgIAFIgHAGIgHAGIgHAGIgHAGIgIAFIgJAGIgKAFIgJAGIgPAQIgPAPIgOAOIgOANIgPAOIgPAOIgCAEIgFAJIgHAIIgHAJIgHAHIgFAGIgGAFIgGAGQgEAUgLARQgMARgRALQgVAOgZACIgJABQgUAAgUgJg");
	this.shape_14.setTransform(257.008,313.9415);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("A6CBkQgtgIgdACQggACgpgCIhQgFQgmgCgnACQgoACgpgDQgIAAgGgHQgFgGAAgIIAAAAQABgJAGgFQAHgFAIAAQAmADAmgCQApgCAoACIABAAIAxADQgWgLgMgSQgHgLgEgMIgCgIQgDgVAOgPIADgCQgjgEgaAAQgcAAglAIIAAAAQgsALg2gRQgIgDgEgHQgCgEAAgFIABgGQACgIAIgEQAHgEAIADQAqANAjgIIAAAAQApgJAhAAQAhAAAuAGIAAAAQAnAFAigOIAAAAQAsgSA3APIAAAAQApALAagGQAIgCAHAEQAHAEACAGIAFABQADgIAHgEQAIgDAIADQAXAHApABIAAAAQAsACAqgGIAAAAQAwgGAxAMQApALAjgGIAAAAQArgHAbACQAJAAAFAHQAFAGAAAIIAAAAQgBAJgGAFQgGAFgJAAQgYgCgkAGIAAAAQgrAIgygNQgqgKgoAFQgfAEggABIAfAYIADAEIABABIABABIAAABIAAAAIABABQACAFgBAEQAAAFgEAFQgDAEgDACQgWALgeAVIAGAAQAvgDAeADQAIABAGAGQAEAFAAAHIAAADQAAAIgHAFQgGAFgIAAQgcgDgsADQgsACgnAJQgWAFgaAAQgXAAgagEgA7UAnIAAAAQAkAHAqAAIABAAIAqAAIAmAAQAfgBAfgXQgfAXgfABIgmAAIgqAAIgBAAQgqAAgkgHIAAAAQgkgGgggNIAAAAQgYgKgIgVIAAgCIABgDQAHgHAQgEQAxgLAdgKQAIgCADgIIACgFIAEAAQAEAHAHAEIACAAQAjAQAjAAIABAAIAAAAIAPgBIABAAIACAAIAbgCIAAAAIAAAAQAXAAAWAEQAgAFAKAGIgBAAIAbAUQgSALgWAPIAAAAIAAAAQAWgPASgLIgbgUIABAAQgKgGgggFQgWgEgXAAIAAAAIAAAAIgbACIgCAAIgBAAIgPABIAAAAIgBAAQgjAAgjgQIgCAAQgHgEgEgHIgEAAIgCAFQgDAIgIACQgdAKgxALQgQAEgHAHIgBADIAAACQAIAVAYAKIAAAAQAgANAkAGgA1mBTQgHgGgBgIIAAgCQAAgHAEgFQAFgHAIgBQAJgBAGAFQARALAggLQAvgRAwABIAAAAIBVABQApABAkACIABAAQAhACAwgRIAAAAQA4gTAlgCQAigBAZgFIAMgCIgOgDIABAAQgWgEgwgLQgsgKgkgDQgkgDgsABIAAAAQgvACghgCQgIgBgGgGQgFgGAAgIIAAgBQABgIAGgFQAHgGAIABQAfACAsgCIAAAAQAvgBAmADIAAAAQAnADAvALQAuALAVAEIABAAIBNAQQAIACAEAGIACAEIACACIACABQAHAFABAIQACAHgFAHQgFAGgIACIhUAQQgdAHglABQghACgxARIAAAAQg5AUgogDIAAAAQgjgCgogBIhWgBQgogBgpAPQgYAIgUAAQgZAAgRgOgAZyBVIAAAAIgQABIAAAAIhNAIQglADgvgHQgIgCgFgGQgEgGAAgHIABgCQABgJAHgEQAGgFAJABIAgAEQgMgHgNgIQgGgFgCgIQgBgJAFgGIACgDIACgCIAAAAIgDAAIgCgBQgIgCgEgGQgEgHABgIQACgIAHgEIAXgOQgeACgmgIQgIgCgEgHQgDgFgBgFIABgFQACgIAGgEQAHgFAJACQAsAJAggHIAAAAQAlgJAvgEQAigDAeADQAegDAeAGQAmAHAkgHIAAAAQAZgFAZAGQAngGAjAFIABAAQAlAGAjgDQApgEAsALQAIACAEAHQADAFAAAGIgBAEQgCAIgHAFQgHAEgIgCQgkgJgjADIgbABQANAEA9AeQAFADADAFIACAEIABAGIgBAEIgBAEIgBACIgEAFQgUAUgfAMQAVACANAAQAJAAAGAFQAGAGAAAIQAAAJgGAGQgFAGgJAAQgZAAgzgIQgmgGggADQgkAJgoACQgpADghAEIgTABQgeAAgngLgAbjAwIATgBIAKAAQAngDAngFQgnAFgnADIgKAAIgTABIAAAAIAAAAQgUAAgUgCIAAAAIgFgBIgCAAIgCAAQgRgCgTAAIgBAAIAAAAIgYABQgsgMglgCQgfgCgegWIgBAAQgEgDgGgBIgBAAIgBAAQAugbAcgKIAAAAIBHgUIAAAAIAUgFIATADIAAAAQAnAIAkACIACAAIAOAAIAAAAIABAAQAdAAAigHIAEgBIAEgBQALADALAGQAEADAFAAIAAAAIAAAAIAGgBQAIgCAEgHIACgFIADAAIAAABIABAFQACAIAHAEQAnAWALAEIAAAAQAIACAgAPQgPAHgSAFIAAAAIhQAWIAAAAIgHACIgIABIgBAAIABAAIAIgBIAHgCIAAAAIBQgWIAAAAQASgFAPgHQgggPgIgCIAAAAQgLgEgngWQgHgEgCgIIgBgFIAAgBIgDAAIgCAFQgEAHgIACIgGABIAAAAIAAAAQgFAAgEgDQgLgGgLgDIgEABIgEABQgiAHgdAAIgBAAIAAAAIgOAAIgCAAQgkgCgngIIAAAAIgTgDIgUAFIAAAAIhHAUIAAAAQgcAKguAbIABAAIABAAQAGABAEADIABAAQAeAWAfACQAlACAsAMIAYgBIAAAAIABAAQATAAARACIACAAIACAAIAFABIAAAAQAUACAUAAIAAAAIAAAAgEgiBABXIAAAAIhPgIQgjgCgiAIQgsALgygZQgkgRgfAHIAAAAQgqALgsgSQgkgOgggIIAAAAQgegIgsAGQgIABgHgFQgHgFgBgIQgBgIAFgGQAEgGAHgBIgBgFQgCgIAFgHQAFgHAIgBIBYgNQAmgGAzADQAvACAlgEIABAAQAngFArgCQAmgCAcgPQAngWA1APQAlAKAZgKQAIgDAIADQAHAEADAHIACAHQAAAEgCAFQgDAHgIADQgjAQg1gPQgkgKgaAOQgjATgwADQgpACgnAEQgoAFgzgCQgvgDgjAFIgUADIAEABIAAAAQAjAIAmAPQAfANAegIIABAAQArgLAyAYQAkASAggHQAogKApADIAAAAIBQAIQAoAFAngFQAIgBAHAGQAGAFABAIIAAACQAAAHgEAGQgFAGgIABQgWADgWAAQgWAAgWgDgAWUBYQgggMgnABIAAAAIhVACIhRAEQgsADgqgRIAAAAQghgNghAGIAAAAQgmAGgpACQgqACgxgJQgwgKgbgHIABAAQgdgIgNgTIgGgKIAAAAQgGgOADgLQABgFADgFQAHgMAVgHQAIgCAIAEQAHADACAIIABADQABAGgDAHQgEAHgIACIgDACQAGAIAOAEIAAAAQAaAHAtAJQAtAJAlgCIAAAAQAngCAjgGIABAAQAqgHAsARIAAAAQAiANAkgCIBSgEIAAAAIBVgCIABAAQAugBAmAOQAIADADAHQACAFAAAEIgBAHQgDAHgHAEQgEACgFAAIgGgBgEAgTABVQgHgEgDgIIgBgGQAAgFADgEQAEgIAHgCQAegKAzAEQAuADArgDQAqgCAfgLQAkgOAzgBQAzgCAiAKQAbAIAfgIIBTgUIAagFIAAAAQgegGghgDQgigDgqgGQgmgGgrADQgzADgogVIAAAAQgegPgeAGQgmAIg0AEQg5AFgagPQgHgEgDgIIgBgGQAAgFADgEQAEgHAHgDQAIgCAIAEQATAJAqgEQAxgEAkgHQAsgJAqAVIAAABQAgAPAngCQAvgDAqAGQAoAGAhADQAjADAhAHQAjAHAhASQAHAEACAIQACAHgEAHQgEAHgIADIgCAAIhVAWIhUAUQgpAKglgKQgdgJgsACQgsABgfALQgkANgwADQguADgwgDQgpgDgZAHIgGABQgEAAgFgCgA9hgBIABgHIACAIQAEAMAHALQgOgMAAgMgAXMAGIADAAIAAAAIgCACIgBgCgAM0gOQgIgCgEgIIgCgGQAAgFABgEQADgIAIgEQAhgQAxgIIAAAAQAvgHAngCQAngBAwgGQA1gGAoAHQAlAGAhgBIAAAAIBGgBIBWgDQAIAAAGAGQAHAFAAAJIAAAAQAAAIgFAGQgGAGgIAAIhXADIhHABIAAAAQgkABgogGQgkgGguAFQgzAGgnABQgmACgsAHQgqAGgdAOQgEACgFAAIgGgBg");
	this.shape_15.setTransform(272.857,7.9597,1,4.2817);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AWmBGQAAgFgCgEQgEgIgHgCQgmgOgvAAIAAAAIhVACIAAAAIhTAEQgjACgigNIgBAAQgrgQgrAHIAAAAQgkAGgmABIgBAAQglACgsgIQgugJgZgHIAAAAQgPgEgGgJIAEgBQAIgDAEgHQADgGgBgHIAEAAIACAGQAEAHAIADQAHACAIgDQAdgOAqgHQAsgHAlgBQAogCAygFQAvgFAkAFQAoAGAjAAIABAAIBHgBIBWgDQAJgBAFgGQAGgGAAgHIACAAQAAAFADAFQAFAHAIABQAmAIAegCIgXAOQgHAFgCAIQgCAIAFAHQAEAGAIACIACAAIABACIgDADQgFAHACAIQABAIAHAFQAMAJANAGIghgDQgIgCgHAFQgGAFgCAIIAAADIgCAAgA15BEQAAgHgFgFQgFgHgIgBQgegCgwACIgGABQAegVAWgMQAEgCADgDQADgFABgGQAAgEgCgEIAAgBIAAgBIgBgBIAAgBIgBgBIgDgDIgggZQAggBAggEQAogFApALQAyAMArgHIABAAQAkgGAYABQAIABAHgFQAGgGABgIIAAgBIACABQAAAHAFAGQAFAHAIAAQAhADAvgCIAAAAQAtgCAkADQAjAEAtAKQAvALAWAEIAAAAIANACIgLADQgaAEghACQgmABg3ATIgBABQgwAQghgCIAAAAQgkgCgpAAIhVgCIAAAAQgwAAgwARQgfALgRgLQgHgGgIACQgIAAgFAHQgFAGAAAHIgBAAIgBAAgAf+BEQgBgIgGgGQgGgGgIAAQgNAAgVgCQAegMAUgUIAFgFIABgCIABgEIAAgDIgBgHIgBgEQgDgFgGgCQg8gegNgEIAagCQAjgDAlAJQAIACAHgEQAHgEACgIIABgFIACAAIABAHQACAIAIAEQAaAOA5gEQAzgEAmgIQAfgGAeAPIgBAAQApAVAzgEQArgDAmAGQApAGAiADQAhADAeAGIABAAIgaAGIhUAUQgeAHgbgHQgigKg0ABQgzACgkANQgfALgqADQgrADgtgEQgzgEgeAKQgIADgEAHQgCAFAAAFIgCAAgEgggABEIAAgCQgBgJgGgFQgHgFgIABQgnAEgpgEIhPgIIgBAAQgogEgpAKQgfAHgkgRQgygZgsALIAAABQgeAHgggMQgmgQgjgIIAAABIgEgBIAVgDQAjgFAuACQAzADApgFQAmgFAqgCQAvgCAkgUQAagNAkAKQA0AOAkgPQAIgDADgIQACgEAAgEIADAAQgBAEADAFQAEAHAHACQA3ASArgLIABAAQAkgJAdAAQAaAAAiAEIgCADQgOAPADAVIgBAGQAAANANALQAMASAXAMIgygDIAAAAQgpgCgoACQgmACgngDQgIgBgGAGQgGAFgBAIIAAABIgBAAIgBAAgALHAAQgBgIAZgIQgDAMAHANIAAAAIAFAKQghgJAAgKg");
	this.shape_16.setTransform(273.7,7.746,1,4.2817);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,255,0.333)").s().p("AsnEaQgSgJgOgPQgPgPgGgTQgGgQAAgRIACgWQAHgfAEgKQAEgKAGgJQAHgOALgLIAVgWIAIgHIAHgNQAMgRAOgNQAPgMANgNIAdgcIAlglQANgOARgJIAZgPIAagVQAMgKAOgIQARgKASgIIAmgQQAUgKAVgFIAWgGIAJgEIAJgEIAIgEIAJgEIALgFIAKgFIAMgEIAJgBIAIgCIAJgBIAIgBIAGgBIAGgCQBpgwB0AIQBDAEBCgBQB3gDB2AOQBBAIA9AZIBIAfQBiArBdA1IATAMQAUAIASALQASALAQANQAQAMAOAOQASAQAOATQANATAKAVQAJARADATQAMAYgBAcQgDAhgUAZQgXAcgiAHQgjAHgggRQgfgRgQgfQgLgVgCgXIgJgKIgHgHIgHgHIgIgFIgIgEIgIgFIgJgDIgJgEIgHgEIgIgGIgIgGIgHgGQgNgIgOgHIgbgOIgegOQgPgGgOgHIgagQIgPgIIgigKIgggLIgfgMIgegMIgegIIgKgDQgpgDgpABIhfAAIhqAAIhYAAQgdgBgcACIgPAFIgRAGIgTAIIgSAHQgKADgLACIgUAEIgLABIgTAKIgUAJIgUAIIgVAHIgVAGIgLADIgJAEIgKADIgJAFIgJAFIgJAFIgIAFIgHAGIgHAGIgHAGIgHAGIgIAFIgJAGIgKAFIgJAGIgPAQIgPAPIgOAOIgOANIgPAOIgPAOIgCAEIgFAJIgHAIIgHAJIgHAHIgFAGIgGAFIgGAGQgEAUgLARQgMARgRALQgVAOgZACIgJABQgUAAgUgJg");
	this.shape_17.setTransform(257.008,313.9415);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AWLGEQgfgxgnACIhVAJQgqAGgnALQgsANgrhHQghg4ggAYQgnAcgpAGQgpAJgygnQgvgpgbggQgcgigOhRQghgpAAgrQgBglAZggQACgWADgTQAHg2AVgcQAXAWACAiIABAnIAAgcQAFAcAFARIgEgWIgCgZQAAgWABgTQADgiAIgPQAghFAygiQAuggAogGQAmgHAxgXQA0gaAoAeQAmAXAggCQAjAAAkgEQAkgEAygJQAUAvABAlIAAACQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAVADAWQAFAeAIAGQAmAiAegIIgXA8QgHATgCAiQgCAiAFAeQAEAdAIAJQAAAAABAAQAAAAAAAAQAAABAAAAQABAAAAABIABAJIgDAMQgFAcACAlQABAiAHAVQAMAlANAcQgQgFgRgKQgIgHgHAWQgGATgBAkIgBALIgDgdIABAdIgBAcQgDAggIAPQgEAIgEAAQgDAAgEgEgAf6D+IgDgOQgFgXgJAAQgNAAgVgJQAfgzAThWIACgEIADgVIABgFIABgNIAAgEIAAgTIgBgbIgBgRQgDgVgGgLQg8iBgNgRQANgCAOgEQAigNAlAnQAHAIAIgRQAHgSACggIAAgEIABgTIADAcQADAiAHARQAaA+A5gTQAzgRAmgiQAfgaAeBAQAoBaAzgPQArgNAmAaQApAaAiANIADAAQAXAKAXAQIAOAMIgMAOIgNANIhUBWQgeAggbggQgjgrgzAGQgzAHgjA5QggAwgpAKQgsANgtgPQg0gRgdArQgIALgEAgQgCATAAAVQgCgZgEgVgA15EsQAAgegFgVQgFgcgIgEQgegLgwALQgCAAgDACQAdhaAWgxQAEgJADgPQADgTABgUIAAgGQAAgUgCgTIAAgHIgBgEIAAgBIAAgBIgBgHIgDgPIgghpQAggEAggRQAogVApAtQAyA1AsggQAkgaAYAHQAIACAHgWIAAgBQAGgWABgkQAAgBAAAAQABgBAAAAQAAAAAAABQABAAAAABQAAAgAFAZQAFAcAIACQAiALAugJQAsgGAlANQAjAPAtArIADADIABABQAhAhAUARIANAKIgBAAIANALIgLAKQgaAXghAGIgBAAIgBABIgBAAQgSAEgXAWQgWAXgbAoQgrA/gfAAIgCAAIgGgBQgkgIgpgCIhVgHQgwgCgwBJQgXAjgTgWQgKgJgLgVQgIACgFAeQgEAXgBAeIgCAAgEggjAD/IgDgRIgBgBIAAgCIAAgBQgHgYgIAFQgnATgpgTQgpgUgmgPIgLgDIgLgBQgeAAgeAgQgfAegkhLQgyhpgsAwQgTAVgTgNQgMgIgMgUQgmhCgjgmQAAAAAAgBQgBAAAAAAQgBgBAAAAQgBAAAAAAIAAAAQAKgIAKgFQAigVAvALQA0AKAogVQAngTApgJQAvgLAkhTQAag6AkArQA1A+AjhCQAHgNAEggQACgUAAgRIAEAiIABAFQAEAeAHALQA3BKArgvIABAAIARgPQAZgVAVAAIACAAQAaAAAiARIgCALQgEAQgCARQgIA3ADBCIgBAbQAAA6ANAxQAMBNAXAxIgogKIgKgDIgFgBQgSgDgSAAQgTAAgSAEIgDAAQgmAJgngNQgIgCgGAXQgHAWAAAkQgCgZgDgSg");
	this.shape_18.setTransform(273.7,6.7376);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("A6CGrQgugigcAIQggALgpgLQgogIgogLQgmgJgnAJQgoAJgpgOQgJgBgFgcQgFgaAAgjIAAgBQABglAGgVQAHgYAIACQAmANAmgIIADgBQASgEATAAQASAAASAEIAFABIAKACIAoAKQgWgxgMhNQgOgxAAg5IABgcQgChBAIg3QACgSADgQIADgKQgjgSgaAAIgBAAQgWABgZAUIgRAQIAAAAQgsAug2hKQgIgLgEgeIAAgFQgCgQAAgRIABgcQACgjAIgOQA5AzAjgjQApgoAhAAQAhAAAuAaQAnAVAig8QAshNA3BAQApAxAagZQAIgLAHAUQAGAPADAbQAIggAHgPQAIgPAIANQAXAgApAFQAsAFAqgXQAvgbAyA1QApAtAjgaQAqgeAcAJQAJACAFAcQAFAaAAAiIAAACQgBAkgGAXIAAABQgHAVgIgCQgYgGgkAaQgrAfgyg1QgqgtgoAWQgfARggADIAfBqIADAPIACAHIAAABIAAAAIAAAFIABAGQACATgBAVIAAAFQgBAVgDASQgDAQgDAIQgXAygdBZQADgCADAAQAvgKAeAKQAIAFAGAbQAEAWAAAdIAAAMQgBAigGAXQgGAWgIgCQgcgMgsAMQgsAKgnAkQgWAYgaAAQgXAAgagTgA1mFiQgHgYgBgiIAAgJQAAgdAEgYQAFgeAIgCQALAVALAJQASAWAYgjQAvhIAwACIBVAGQApACAkAJIAGABIACAAQAfAAArg/QAbgpAXgWQAWgWASgFIABAAIABAAIABAAQAigHAZgWIAMgLIgOgLIABAAIgMgKQgUgRghggIgCgCIgDgDQgtgrgjgPQgkgNgsAHQgvAJghgLQgJgCgFgdQgFgZAAggQABgpAGgVQAHgYAIADQAfAKAsgIQAvgHAmANQAmAPAwAvQAuAvAVAPQAWARA4A1QAHAHAFAcIACARIACAHIACAEQAGAVACAiQABAigEAdQgFAdgIAIQg5ArgbAaQgdAcglAGQghAGgxBJIAAAAQg5BWgogNQgkgJgngCQgpgCgtgEQgpgCgoA+QgYAkgUAAQgZAAgRg+gAZyFrQgIAAgIAEQgrAVgiANQglANgvgeQgIgHgFgcQgEgZAAgcIABgKQABglAHgTQAGgVAJAGQARALAPAEQgNgcgMgkQgHgWgBgiQgBgkAFgdIACgMIgBgIQAAgBAAgBQAAAAgBAAQAAgBAAAAQAAAAgBAAQgIgIgEgdQgFgfACgiQACgiAHgTIAXg8QgeAJgmgjQgIgGgEgeQgEgVAAgWIABgVQABglAHgRQA8AcAgggQAlgkAvgSQAigNAeANQAdgPAfAaQAmAeAkgcQAZgVAZAXQAmgZAkAXQAlAaAkgPQApgSAsAwQAIAJAEAgQADAVAAAYIgBATIAAAEQgCAfgHASQgHASgIgJQglgngiANQgOAFgNACQANARA9CAQAFALADAVIACARIABAcIgBATIAAAEIgBANIAAAEIgEAVIgBAFQgUBVgfA0QAVAIANAAQAJAAAGAYIADANQADAVAAAZQAAAlgGAZQgGAbgIAAQgZACgzgjQgmgZggAKQglApgnAIQgqALggARQgJAFgJAAQgfAAgngvgEgiBAF1QgqgTglgPQgjgLgiAjQgsAvgyhqQgkhKgfAdQgqAwgshLQgkg+gggjQgegfgsAZQgJAFgGgWQgHgVgBgiQgBglAFgbQAEgZAHgFIgBgVQgCgkAFgcQAFgfAIgDQAzgnAlgUQAmgXAzALQAvALAlgUIABAAQAngVArgJQAmgGAchCQAmhcA2A9QAlArAZgoQAIgNAIANQAHAOADAhQACAPAAAPQAAAQgCAUQgDAggIANQgjBDg1g/QgkgqgaA5QgjBUgwALQgpAIgnATQgoAVgzgKQgvgLgjAVQgKAFgKAJIAAAAQABAAAAAAQAAAAABAAQAAAAABABQAAAAABABQAiAlAnBDQALAUAMAIQATAMAUgVQArgvAyBpQAkBLAggeQAeggAeAAIAKABIALADQAmAPAqATQAoATAngTQAIgEAHAXIAAABIABACIAAABIADARQADAQAAAVIAAAIQAAAfgEAXQgFAcgIAEQgWAKgWAAQgWAAgWgKgEAgTAFrQgHgSgDgiIgBgYQAAgVADgTQADggAIgLQAegrAzARQAtAPAsgNQApgKAggvQAjg6A0gGQAzgHAiArQAbAgAfggIBThWIANgMIANgPIgPgLQgXgRgXgJIgCgBQgjgNgpgZQgmgagrAMQgzAQgohaQgehBgeAaQgmAjg0AQQg5AUgag+QgHgSgDgiQgBgvADgRQADggAIgLQAIgKAIARQATAmAqgPQAxgRAkgeQArgmArBaQAfBEAogLQAvgNAqAcQAoAYAhANQAjANAhAeQAjAeAhBNQAHAQACAjQACAhgEAgQgEAegIALIgCACQgnAtguAyIhUBVQgqAogkgrQgdgjgsAGQgsAGgfAwQgkA1gwAPQguANgwgQQgpgMgZAeQgDAEgDAAQgFAAgEgIg");
	this.shape_19.setTransform(272.8673,7.9998);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,255,255,0.667)").s().p("AsnEaQgSgJgOgPQgPgPgGgTQgGgQAAgRIACgWQAHgfAEgKQAEgKAGgJQAHgOALgLIAVgWIAIgHIAHgNQAMgRAOgNQAPgMANgNIAdgcIAlglQANgOARgJIAZgPIAagVQAMgKAOgIQARgKASgIIAmgQQAUgKAVgFIAWgGIAJgEIAJgEIAIgEIAJgEIALgFIAKgFIAMgEIAJgBIAIgCIAJgBIAIgBIAGgBIAGgCQBpgwB0AIQBDAEBCgBQB3gDB2AOQBBAIA9AZIBIAfQBiArBdA1IATAMQAUAIASALQASALAQANQAQAMAOAOQASAQAOATQANATAKAVQAJARADATQAMAYgBAcQgDAhgUAZQgXAcgiAHQgjAHgggRQgfgRgQgfQgLgVgCgXIgJgKIgHgHIgHgHIgIgFIgIgEIgIgFIgJgDIgJgEIgHgEIgIgGIgIgGIgHgGQgNgIgOgHIgbgOIgegOQgPgGgOgHIgagQIgPgIIgigKIgggLIgfgMIgegMIgegIIgKgDQgpgDgpABIhfAAIhqAAIhYAAQgdgBgcACIgPAFIgRAGIgTAIIgSAHQgKADgLACIgUAEIgLABIgTAKIgUAJIgUAIIgVAHIgVAGIgLADIgJAEIgKADIgJAFIgJAFIgJAFIgIAFIgHAGIgHAGIgHAGIgHAGIgIAFIgJAGIgKAFIgJAGIgPAQIgPAPIgOAOIgOANIgPAOIgPAOIgCAEIgFAJIgHAIIgHAJIgHAHIgFAGIgGAFIgGAGQgEAUgLARQgMARgRALQgVAOgZACIgJABQgUAAgUgJg");
	this.shape_20.setTransform(257.008,313.9415);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AsnEaQgSgJgOgPQgPgPgGgTQgGgQAAgRIACgWIAEgVIAHgUQAEgKAGgJQAHgOALgLIAVgWIAIgHIACgEIAFgJQAMgRAOgNQAPgMANgNIAdgcIAlglQANgOARgJIAZgPIAagVQAMgKAOgIQARgKASgIIAmgQQAUgKAVgFIAWgGIAJgEIAJgEIAIgEIAJgEIALgFIAKgFIAMgEIAJgBIAIgCIAJgBIAIgBIAGgBIAGgCQBpgwB0AIQBDAEBCgBQB3gDB2AOQBBAIA9AZIBIAfQBiArBdA1IATAMQAUAIASALQASALAQANQAQAMAOAOQASAQAOATQANATAKAVQAJARADATQAMAYgBAcQgDAhgUAZQgXAcgiAHQgjAHgggRQgfgRgQgfQgLgVgCgXIgCgDIgHgHIgHgHIgHgHIgIgFIgIgEIgIgFIgJgDIgJgEIgHgEIgIgGIgIgGIgHgGQgNgIgOgHIgbgOIgegOQgPgGgOgHIgagQIgPgIIgigKIgggLIgfgMIgegMIgegIIgKgDQgpgDgpABIhfAAIhqAAIhYAAQgdgBgcACIgPAFIgRAGIgTAIIgSAHQgKADgLACIgUAEIgLABIgTAKIgUAJIgUAIIgVAHIgVAGIgLADIgJAEIgKADIgJAFIgJAFIgJAFIgIAFIgHAGIgHAGIgHAGIgHAGIgIAFIgJAGIgKAFIgJAGIgPAQIgPAPIgOAOIgOANIgPAOIgPAOIgCAEIgFAJIgHAIIgHAJIgHAHIgFAGIgGAFIgGAGQgEAUgLARQgMARgRALQgVAOgZACIgJABQgUAAgUgJg");
	this.shape_21.setTransform(257.008,313.9415);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5,p:{scaleY:0.2174,y:7.2207}},{t:this.shape_4,p:{scaleY:0.2174,y:7.1935}},{t:this.shape_3,p:{scaleY:0.2174,y:7.2206}},{t:this.shape_2,p:{scaleY:0.2174,y:7.2041}},{t:this.shape_1,p:{scaleY:0.2174,y:7.2206}},{t:this.shape,p:{scaleY:0.2174,y:7.1933}}]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_5,p:{scaleY:4.2817,y:7.535}},{t:this.shape_4,p:{scaleY:4.2817,y:6.9998}},{t:this.shape_3,p:{scaleY:4.2817,y:7.5344}},{t:this.shape_2,p:{scaleY:4.2817,y:7.2094}},{t:this.shape_1,p:{scaleY:4.2817,y:7.5344}},{t:this.shape,p:{scaleY:4.2817,y:6.997}}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14}]},4).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},1).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_20}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_21}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-30.2,548.7,373.2);


(lib.Instructions = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhRBZIAYgyQAjAUAPAAQAIAAAGgEQAFgEAAgHQAAgGgFgEIgigQQgYgLgLgNQgLgPAAgWQAAgfAWgUQAVgUAhAAQAgAAAuAZIgaAxQgegSgTAAQgQAAgBANQABAGAGAFQAFAFAQAGQAfALAOAOQAOAPAAAXQAAAhgWAVQgWAVghAAQgmAAgqgag");
	this.shape.setTransform(320.2,33.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAUBvIAAiEQAAgLgFgHQgFgHgIAAQgVAAAAAcIAACBIhEAAIAAjWIBEAAIAAAdIABAAQAXgkAiAAQAXAAANAPQANAPAAAZIAACmg");
	this.shape_1.setTransform(299.775,32.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhEBVQgZgeAAg1QAAg2AYgfQAYgfAtAAQAuAAAYAfQAYAfAAA2QAAA2gZAeQgZAdgsAAQgrAAgZgegAgTgpQgHALAAAeQAAA3AaAAQANAAAGgNQAHgMAAgeQAAgdgHgMQgGgMgNAAQgMAAgHAMg");
	this.shape_2.setTransform(277.525,33.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AghCeIAAjWIBDAAIAADWgAgYhgQgLgKAAgPQAAgPAKgLQALgKAOAAQAPAAALAKQAKALAAAPQAAAPgKAKQgLALgPAAQgOAAgKgLg");
	this.shape_3.setTransform(260.5,28.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AghCJIAAifIgaAAIAAg4IAaAAIAAg6IBDAAIAAA6IAaAAIAAA4IgbAAIAACfg");
	this.shape_4.setTransform(247.375,30.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgqBUQgWggAAg1QAAgyAXggQAWgfAjAAQAZAAAYARIAAA4QgOgHgLAAQgRAAgKANQgKAOAAAVQAAAXAKANQAKAOARAAQAKAAAOgIIAAA4QgYARgZAAQgjAAgWgfg");
	this.shape_5.setTransform(232.675,33.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhCBVQgUgaAAgmIAAiEIBEAAIAACKQAAALAFAHQAFAHAIAAQATAAAAgdIAAiGIBEAAIAAB8QAAAwgWAZQgWAagqgBQguAAgVgag");
	this.shape_6.setTransform(213.625,33.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag/BvIAAjXIBAAAIAAAkIABAAQAYgqAbAAIALABIAABDQgMgCgLAAQglAAAAAwIAABrg");
	this.shape_7.setTransform(194.975,32.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AghCJIAAifIgaAAIAAg4IAaAAIAAg6IBDAAIAAA6IAaAAIAAA4IgbAAIAACfg");
	this.shape_8.setTransform(179.025,30.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhQBZIAXgyQAjAUAPAAQAIAAAGgEQAFgEAAgHQAAgGgEgEIgjgQQgYgLgLgNQgKgPAAgWQgBgfAWgUQAVgUAgAAQAhAAAuAZIgaAxQgegSgTAAQgRAAABANQAAAGAGAFQAFAFAQAGQAfALAOAOQAOAPAAAXQAAAhgWAVQgWAVghAAQglAAgqgag");
	this.shape_9.setTransform(162.95,33.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAUBvIAAiEQAAgLgFgHQgFgHgIAAQgVAAAAAcIAACBIhEAAIAAjWIBEAAIAAAdIABAAQAXgkAiAAQAXAAANAPQANAPAAAZIAACmg");
	this.shape_10.setTransform(142.525,32.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgiCdIAAk5IBGAAIAAE5g");
	this.shape_11.setTransform(123.95,28.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,446.2,56);


(lib.end_text = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_600 = function() {
		/* Stop at This Frame
		Once it's done, the clip stops at the frame that is specified.'
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(600).call(this.frame_600).wait(1));

	// mask2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_1 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_2 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_3 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_4 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_5 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_6 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_7 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_8 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_9 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_10 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_11 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_12 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_13 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_14 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_15 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_16 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_17 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_18 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_19 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_20 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_21 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_22 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_23 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_24 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_25 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_26 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_27 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_28 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_29 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_30 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_31 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_32 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_33 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_34 = new cjs.Graphics().p("AvTETIAAolIenAAIAAIlg");
	var mask_graphics_74 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_75 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_76 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_77 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_78 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_79 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_80 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_81 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_82 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_83 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_84 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_85 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_86 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_87 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_88 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_89 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_90 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_91 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_92 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_93 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_94 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_95 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_96 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_97 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_98 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_99 = new cjs.Graphics().p("EgkyAIIIAAoIIXSAAIAAoHMAyTAAAIAAIHI0oAAIAAIIg");
	var mask_graphics_224 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_225 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_226 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_227 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_228 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_229 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_230 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_231 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_232 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_233 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_234 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_235 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_236 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_237 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_238 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_239 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_240 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_241 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_242 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_243 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_244 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_245 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_246 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_247 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_248 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_249 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_250 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_251 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_252 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_253 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_254 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_255 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_256 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_257 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_258 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_259 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_260 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_261 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_262 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_263 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_264 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_265 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_266 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_267 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_268 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_269 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_270 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_271 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_272 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy6AAIAAJ2g");
	var mask_graphics_273 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_274 = new cjs.Graphics().p("EgncAKZIAA0xMBO5AAAIAAK7Iy7AAIAAJ2g");
	var mask_graphics_299 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_300 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_301 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_302 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_303 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_304 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_305 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_306 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_307 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_308 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_309 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_310 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_311 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_312 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_313 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_314 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_315 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_316 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_317 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_318 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_319 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_320 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_321 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_322 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_323 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_324 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_325 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_326 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_327 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_328 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_329 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_449 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_450 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_451 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_452 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_453 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_454 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_455 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_456 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_457 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_458 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_459 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_460 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_461 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_462 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_463 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_464 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_465 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_466 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_467 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_468 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_469 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_470 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_471 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_472 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_473 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_474 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_475 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_476 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_477 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_478 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_479 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_480 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_481 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_482 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_483 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_484 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_485 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_486 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_487 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_488 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_489 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_490 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_491 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_492 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_493 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_494 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_495 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_496 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_497 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_498 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_499 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_500 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_501 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");
	var mask_graphics_502 = new cjs.Graphics().p("A9IZZMAAAgyxMA6RAAAMAAAAyxg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-3,y:27.5}).wait(1).to({graphics:mask_graphics_1,x:1.6,y:27.5}).wait(1).to({graphics:mask_graphics_2,x:6.2,y:27.5}).wait(1).to({graphics:mask_graphics_3,x:10.75,y:27.5}).wait(1).to({graphics:mask_graphics_4,x:15.35,y:27.5}).wait(1).to({graphics:mask_graphics_5,x:19.95,y:27.5}).wait(1).to({graphics:mask_graphics_6,x:24.55,y:27.5}).wait(1).to({graphics:mask_graphics_7,x:29.1,y:27.5}).wait(1).to({graphics:mask_graphics_8,x:33.7,y:27.5}).wait(1).to({graphics:mask_graphics_9,x:38.3,y:27.5}).wait(1).to({graphics:mask_graphics_10,x:42.9,y:27.5}).wait(1).to({graphics:mask_graphics_11,x:47.45,y:27.5}).wait(1).to({graphics:mask_graphics_12,x:52.05,y:27.5}).wait(1).to({graphics:mask_graphics_13,x:56.65,y:27.5}).wait(1).to({graphics:mask_graphics_14,x:61.25,y:27.5}).wait(1).to({graphics:mask_graphics_15,x:65.8,y:27.5}).wait(1).to({graphics:mask_graphics_16,x:70.4,y:27.5}).wait(1).to({graphics:mask_graphics_17,x:75,y:27.5}).wait(1).to({graphics:mask_graphics_18,x:79.6,y:27.5}).wait(1).to({graphics:mask_graphics_19,x:84.2,y:27.5}).wait(1).to({graphics:mask_graphics_20,x:88.75,y:27.5}).wait(1).to({graphics:mask_graphics_21,x:93.35,y:27.5}).wait(1).to({graphics:mask_graphics_22,x:97.95,y:27.5}).wait(1).to({graphics:mask_graphics_23,x:102.55,y:27.5}).wait(1).to({graphics:mask_graphics_24,x:107.1,y:27.5}).wait(1).to({graphics:mask_graphics_25,x:111.7,y:27.5}).wait(1).to({graphics:mask_graphics_26,x:116.3,y:27.5}).wait(1).to({graphics:mask_graphics_27,x:120.9,y:27.5}).wait(1).to({graphics:mask_graphics_28,x:125.45,y:27.5}).wait(1).to({graphics:mask_graphics_29,x:130.05,y:27.5}).wait(1).to({graphics:mask_graphics_30,x:134.65,y:27.5}).wait(1).to({graphics:mask_graphics_31,x:139.25,y:27.5}).wait(1).to({graphics:mask_graphics_32,x:143.8,y:27.5}).wait(1).to({graphics:mask_graphics_33,x:148.4,y:27.5}).wait(1).to({graphics:mask_graphics_34,x:153,y:27.5}).wait(40).to({graphics:mask_graphics_74,x:-226.45,y:57.025}).wait(1).to({graphics:mask_graphics_75,x:-213.45,y:57.025}).wait(1).to({graphics:mask_graphics_76,x:-200.45,y:57.025}).wait(1).to({graphics:mask_graphics_77,x:-187.45,y:57.025}).wait(1).to({graphics:mask_graphics_78,x:-174.45,y:57.025}).wait(1).to({graphics:mask_graphics_79,x:-161.45,y:57.025}).wait(1).to({graphics:mask_graphics_80,x:-148.45,y:57.025}).wait(1).to({graphics:mask_graphics_81,x:-135.45,y:57.025}).wait(1).to({graphics:mask_graphics_82,x:-122.45,y:57.025}).wait(1).to({graphics:mask_graphics_83,x:-109.45,y:57.025}).wait(1).to({graphics:mask_graphics_84,x:-96.45,y:57.025}).wait(1).to({graphics:mask_graphics_85,x:-83.45,y:57.025}).wait(1).to({graphics:mask_graphics_86,x:-70.5,y:57.025}).wait(1).to({graphics:mask_graphics_87,x:-57.45,y:57.025}).wait(1).to({graphics:mask_graphics_88,x:-44.5,y:57.025}).wait(1).to({graphics:mask_graphics_89,x:-31.5,y:57.025}).wait(1).to({graphics:mask_graphics_90,x:-18.5,y:57.025}).wait(1).to({graphics:mask_graphics_91,x:-5.5,y:57.025}).wait(1).to({graphics:mask_graphics_92,x:7.5,y:57.025}).wait(1).to({graphics:mask_graphics_93,x:20.5,y:57.025}).wait(1).to({graphics:mask_graphics_94,x:33.5,y:57.025}).wait(1).to({graphics:mask_graphics_95,x:46.5,y:57.025}).wait(1).to({graphics:mask_graphics_96,x:59.5,y:57.025}).wait(1).to({graphics:mask_graphics_97,x:72.5,y:57.025}).wait(1).to({graphics:mask_graphics_98,x:85.5,y:57.025}).wait(1).to({graphics:mask_graphics_99,x:98.5,y:57.025}).wait(50).to({graphics:null,x:0,y:0}).wait(75).to({graphics:mask_graphics_224,x:-264.55,y:44.525}).wait(1).to({graphics:mask_graphics_225,x:-255.4,y:44.525}).wait(1).to({graphics:mask_graphics_226,x:-246.25,y:44.525}).wait(1).to({graphics:mask_graphics_227,x:-237.05,y:44.525}).wait(1).to({graphics:mask_graphics_228,x:-227.9,y:44.525}).wait(1).to({graphics:mask_graphics_229,x:-218.75,y:44.525}).wait(1).to({graphics:mask_graphics_230,x:-209.6,y:44.525}).wait(1).to({graphics:mask_graphics_231,x:-200.45,y:44.525}).wait(1).to({graphics:mask_graphics_232,x:-191.25,y:44.525}).wait(1).to({graphics:mask_graphics_233,x:-182.1,y:44.525}).wait(1).to({graphics:mask_graphics_234,x:-172.95,y:44.525}).wait(1).to({graphics:mask_graphics_235,x:-163.8,y:44.525}).wait(1).to({graphics:mask_graphics_236,x:-154.65,y:44.525}).wait(1).to({graphics:mask_graphics_237,x:-145.45,y:44.525}).wait(1).to({graphics:mask_graphics_238,x:-136.3,y:44.525}).wait(1).to({graphics:mask_graphics_239,x:-127.15,y:44.525}).wait(1).to({graphics:mask_graphics_240,x:-118,y:44.525}).wait(1).to({graphics:mask_graphics_241,x:-108.85,y:44.525}).wait(1).to({graphics:mask_graphics_242,x:-99.65,y:44.525}).wait(1).to({graphics:mask_graphics_243,x:-90.5,y:44.525}).wait(1).to({graphics:mask_graphics_244,x:-81.35,y:44.525}).wait(1).to({graphics:mask_graphics_245,x:-72.2,y:44.525}).wait(1).to({graphics:mask_graphics_246,x:-63.05,y:44.525}).wait(1).to({graphics:mask_graphics_247,x:-53.85,y:44.525}).wait(1).to({graphics:mask_graphics_248,x:-44.7,y:44.525}).wait(1).to({graphics:mask_graphics_249,x:-35.55,y:44.525}).wait(1).to({graphics:mask_graphics_250,x:-26.4,y:44.525}).wait(1).to({graphics:mask_graphics_251,x:-17.25,y:44.525}).wait(1).to({graphics:mask_graphics_252,x:-8.05,y:44.525}).wait(1).to({graphics:mask_graphics_253,x:1.1,y:44.525}).wait(1).to({graphics:mask_graphics_254,x:10.25,y:44.525}).wait(1).to({graphics:mask_graphics_255,x:19.4,y:44.525}).wait(1).to({graphics:mask_graphics_256,x:28.55,y:44.525}).wait(1).to({graphics:mask_graphics_257,x:37.75,y:44.525}).wait(1).to({graphics:mask_graphics_258,x:46.9,y:44.525}).wait(1).to({graphics:mask_graphics_259,x:56.05,y:44.525}).wait(1).to({graphics:mask_graphics_260,x:65.2,y:44.525}).wait(1).to({graphics:mask_graphics_261,x:74.35,y:44.525}).wait(1).to({graphics:mask_graphics_262,x:83.55,y:44.525}).wait(1).to({graphics:mask_graphics_263,x:92.7,y:44.525}).wait(1).to({graphics:mask_graphics_264,x:101.85,y:44.525}).wait(1).to({graphics:mask_graphics_265,x:111,y:44.525}).wait(1).to({graphics:mask_graphics_266,x:120.15,y:44.525}).wait(1).to({graphics:mask_graphics_267,x:129.35,y:44.525}).wait(1).to({graphics:mask_graphics_268,x:138.5,y:44.525}).wait(1).to({graphics:mask_graphics_269,x:147.65,y:44.525}).wait(1).to({graphics:mask_graphics_270,x:156.8,y:44.525}).wait(1).to({graphics:mask_graphics_271,x:165.95,y:44.525}).wait(1).to({graphics:mask_graphics_272,x:175.15,y:44.525}).wait(1).to({graphics:mask_graphics_273,x:184.3,y:44.525}).wait(1).to({graphics:mask_graphics_274,x:193.45,y:44.525}).wait(25).to({graphics:mask_graphics_299,x:-197.475,y:161.525}).wait(1).to({graphics:mask_graphics_300,x:-185.925,y:161.575}).wait(1).to({graphics:mask_graphics_301,x:-174.325,y:161.575}).wait(1).to({graphics:mask_graphics_302,x:-162.775,y:161.625}).wait(1).to({graphics:mask_graphics_303,x:-151.225,y:161.675}).wait(1).to({graphics:mask_graphics_304,x:-139.625,y:161.675}).wait(1).to({graphics:mask_graphics_305,x:-128.075,y:161.725}).wait(1).to({graphics:mask_graphics_306,x:-116.525,y:161.725}).wait(1).to({graphics:mask_graphics_307,x:-104.925,y:161.775}).wait(1).to({graphics:mask_graphics_308,x:-93.375,y:161.825}).wait(1).to({graphics:mask_graphics_309,x:-81.825,y:161.825}).wait(1).to({graphics:mask_graphics_310,x:-70.225,y:161.875}).wait(1).to({graphics:mask_graphics_311,x:-58.675,y:161.925}).wait(1).to({graphics:mask_graphics_312,x:-47.125,y:161.925}).wait(1).to({graphics:mask_graphics_313,x:-35.525,y:161.975}).wait(1).to({graphics:mask_graphics_314,x:-23.975,y:162.025}).wait(1).to({graphics:mask_graphics_315,x:-12.425,y:162.025}).wait(1).to({graphics:mask_graphics_316,x:-0.825,y:162.075}).wait(1).to({graphics:mask_graphics_317,x:10.725,y:162.075}).wait(1).to({graphics:mask_graphics_318,x:22.275,y:162.125}).wait(1).to({graphics:mask_graphics_319,x:33.875,y:162.175}).wait(1).to({graphics:mask_graphics_320,x:45.425,y:162.175}).wait(1).to({graphics:mask_graphics_321,x:56.975,y:162.225}).wait(1).to({graphics:mask_graphics_322,x:68.575,y:162.275}).wait(1).to({graphics:mask_graphics_323,x:80.125,y:162.275}).wait(1).to({graphics:mask_graphics_324,x:91.675,y:162.325}).wait(1).to({graphics:mask_graphics_325,x:103.275,y:162.325}).wait(1).to({graphics:mask_graphics_326,x:114.825,y:162.375}).wait(1).to({graphics:mask_graphics_327,x:126.375,y:162.425}).wait(1).to({graphics:mask_graphics_328,x:137.975,y:162.425}).wait(1).to({graphics:mask_graphics_329,x:149.525,y:162.475}).wait(120).to({graphics:mask_graphics_449,x:-249.475,y:162.475}).wait(1).to({graphics:mask_graphics_450,x:-234.575,y:162.025}).wait(1).to({graphics:mask_graphics_451,x:-219.675,y:161.625}).wait(1).to({graphics:mask_graphics_452,x:-204.775,y:161.175}).wait(1).to({graphics:mask_graphics_453,x:-189.875,y:160.725}).wait(1).to({graphics:mask_graphics_454,x:-174.925,y:160.325}).wait(1).to({graphics:mask_graphics_455,x:-160.025,y:159.875}).wait(1).to({graphics:mask_graphics_456,x:-145.125,y:159.425}).wait(1).to({graphics:mask_graphics_457,x:-130.225,y:159.025}).wait(1).to({graphics:mask_graphics_458,x:-115.325,y:158.575}).wait(1).to({graphics:mask_graphics_459,x:-100.425,y:158.125}).wait(1).to({graphics:mask_graphics_460,x:-85.525,y:157.725}).wait(1).to({graphics:mask_graphics_461,x:-70.625,y:157.275}).wait(1).to({graphics:mask_graphics_462,x:-55.675,y:156.825}).wait(1).to({graphics:mask_graphics_463,x:-40.825,y:156.375}).wait(1).to({graphics:mask_graphics_464,x:-25.875,y:155.975}).wait(1).to({graphics:mask_graphics_465,x:-10.975,y:155.525}).wait(1).to({graphics:mask_graphics_466,x:3.925,y:155.075}).wait(1).to({graphics:mask_graphics_467,x:18.825,y:154.675}).wait(1).to({graphics:mask_graphics_468,x:33.725,y:154.225}).wait(1).to({graphics:mask_graphics_469,x:48.625,y:153.775}).wait(1).to({graphics:mask_graphics_470,x:63.525,y:153.375}).wait(1).to({graphics:mask_graphics_471,x:78.475,y:152.925}).wait(1).to({graphics:mask_graphics_472,x:93.375,y:152.475}).wait(1).to({graphics:mask_graphics_473,x:108.275,y:152.075}).wait(1).to({graphics:mask_graphics_474,x:123.175,y:151.625}).wait(1).to({graphics:mask_graphics_475,x:138.075,y:151.175}).wait(1).to({graphics:mask_graphics_476,x:152.975,y:150.775}).wait(1).to({graphics:mask_graphics_477,x:167.875,y:150.325}).wait(1).to({graphics:mask_graphics_478,x:182.775,y:149.875}).wait(1).to({graphics:mask_graphics_479,x:197.675,y:149.475}).wait(1).to({graphics:mask_graphics_480,x:212.575,y:149.025}).wait(1).to({graphics:mask_graphics_481,x:227.525,y:148.575}).wait(1).to({graphics:mask_graphics_482,x:242.425,y:148.175}).wait(1).to({graphics:mask_graphics_483,x:257.325,y:147.725}).wait(1).to({graphics:mask_graphics_484,x:272.225,y:147.275}).wait(1).to({graphics:mask_graphics_485,x:287.125,y:146.875}).wait(1).to({graphics:mask_graphics_486,x:302.025,y:146.425}).wait(1).to({graphics:mask_graphics_487,x:316.925,y:145.975}).wait(1).to({graphics:mask_graphics_488,x:331.875,y:145.575}).wait(1).to({graphics:mask_graphics_489,x:346.725,y:145.125}).wait(1).to({graphics:mask_graphics_490,x:361.675,y:144.675}).wait(1).to({graphics:mask_graphics_491,x:376.575,y:144.225}).wait(1).to({graphics:mask_graphics_492,x:391.475,y:143.825}).wait(1).to({graphics:mask_graphics_493,x:406.375,y:143.375}).wait(1).to({graphics:mask_graphics_494,x:421.275,y:142.925}).wait(1).to({graphics:mask_graphics_495,x:436.175,y:142.525}).wait(1).to({graphics:mask_graphics_496,x:451.075,y:142.075}).wait(1).to({graphics:mask_graphics_497,x:465.975,y:141.625}).wait(1).to({graphics:mask_graphics_498,x:480.925,y:141.225}).wait(1).to({graphics:mask_graphics_499,x:495.825,y:140.775}).wait(1).to({graphics:mask_graphics_500,x:510.725,y:140.325}).wait(1).to({graphics:mask_graphics_501,x:525.625,y:139.925}).wait(1).to({graphics:mask_graphics_502,x:540.525,y:139.475}).wait(99));

	// text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAHgHAIAAQAKAAAGAHQAHAHAAAIQAAAKgHAGQgGAHgKAAQgIAAgHgHg");
	this.shape.setTransform(172.55,37.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAGgHAJAAQAJAAAHAHQAHAHAAAIQAAAKgHAGQgHAHgJAAQgJAAgGgHg");
	this.shape_1.setTransform(162.05,37.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAHgHAIAAQAKAAAGAHQAHAHAAAIQAAAKgHAGQgGAHgKAAQgIAAgHgHg");
	this.shape_2.setTransform(151.55,37.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhDBhIAAgIQAOAAAIgEQAEgDADgIQABgDAAgQIAAhIQAAghgBgGQgCgHgEgCQgDgDgGAAQgGAAgIADIgCgIIA5gXIAIAAIAAArQAXgrAZAAQALAAAIAHQAHAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgFAAQgDAAgEAEQgKAJgJATIAABZQABAPADAIQACAGAHAEQAHADAMAAIAAAIg");
	this.shape_3.setTransform(174.55,78.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_4.setTransform(158.675,78.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhRCSIAAgIIAJAAQAIAAAHgEQAGgEADgHQACgHAAgUIAAh6IgkAAIAAgPIAkAAIAAgMQAAgdAJgTQAKgUASgLQASgNAXAAQAVAAASAOQAMAJAAAMQAAAGgFAGQgFAFgHAAQgEAAgFgDQgGgEgHgLQgIgLgGgEQgHgEgHAAQgKAAgGAFQgGAFgDALQgDAKAAAsIAAAOIAwAAIAAAPIgwAAIAAB6QAAAaAGAHQAHAJAMAAIARAAIAAAIg");
	this.shape_5.setTransform(144.575,73.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AglBeQgHgCgEAAQgEgBgDAGIgHAAIAAhDIAHAAQAFAcAQAPQAQAOAUAAQAOABAJgJQAJgIAAgMQAAgOgKgKQgKgJgdgPQgegNgJgMQgJgMAAgSQAAgXAQgQQAQgQAZAAQAKABAQAFIAOACQADABACgCQACgCADgFIAGAAIAABAIgGAAQgJgdgLgLQgNgLgSAAQgOAAgJAIQgJAHAAAJQAAALAHAJQAGAIATAKIAdAOQAqAUAAAgQAAAagTAQQgTAPgZAAQgQAAgWgFg");
	this.shape_6.setTransform(288.85,30.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgrCSIAAgIQAOAAAEgCQAFgDADgGQACgGAAgSIAAhIQABgfgCgIQgCgGgDgDQgDgCgGAAQgFAAgIADIgDgIIA4gXIAJAAIAACWQgBASADAGQADAGAFACQAEADAOAAIAAAIgAgNhtQgFgHAAgIQAAgJAFgGQAHgGAIAAQAIAAAGAGQAGAGAAAJQAAAIgGAHQgGAGgIAAQgIAAgHgGg");
	this.shape_7.setTransform(274.7,24.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAFAAQAMAAAGgEQAFgEACgHIAAgUIAAhCQAAgfgDgJQgDgJgHgFQgHgFgKAAQgKAAgJAGQgMAFgOAPIAABjQAAAUABAEQADAFAGADQAFADAOAAIAAAIIhcAAIAAgIQAMAAAHgEQAEgCADgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgGAAQgEAAgJADIgDgHIA4gXIAKAAIAACKQAWgZANgHQAMgIAOAAQAQAAAMAJQALAJAGATQADAMAAAjIAABCQAAASAEAHQACAFAEACQAFADANAAIAAAIg");
	this.shape_8.setTransform(258.25,24.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_9.setTransform(242.175,27.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_10.setTransform(220.025,27.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgsCSIAAgIQAOAAAFgCQAFgDACgGQAEgGAAgSIAAhIQAAgfgDgIQgBgGgDgDQgDgCgGAAQgFAAgJADIgCgIIA3gXIAJAAIAACWQAAASADAGQACAGAGACQAEADAOAAIAAAIgAgMhtQgHgHAAgIQAAgJAHgGQAFgGAJAAQAIAAAGAGQAGAGAAAJQAAAIgGAHQgGAGgIAAQgIAAgGgGg");
	this.shape_11.setTransform(208.25,24.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag2BKQgYgbgBgsQAAgwAagbQAYgbAlAAQAfAAAUAWQAVAUAAAjIiCAAQABAoAUAYQAVAZAaAAQATgBAOgJQANgLAJgYIAHADQgFAdgVAXQgUAWggAAQggAAgYgZgAgihHQgNANgDAYIBXAAQgBgSgDgHQgGgMgKgGQgKgHgKAAQgRAAgOANg");
	this.shape_12.setTransform(182.65,30.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAiCUIAAgaQgOAOgNAHQgNAFgPAAQgfAAgWgZQgYgaAAgoQABgpAZggQAZgiAoAAQAYAAARAQIAAgjQgBgfgBgIQgCgHgDgDQgEgDgEAAQgGAAgIAEIgDgIIA4gXIAJAAIAADZQAAAgACAIQABAHADADQAEADAEAAQAGAAAKgEIABAIIg3AWgAgqgUQgSAUAAAoQAAAqASAWQASAWAWAAQASAAASgSIAAhiQgCgMgGgMQgGgLgLgGQgJgGgJAAQgSAAgPARg");
	this.shape_13.setTransform(163.4,25.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_14.setTransform(143.525,29.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ABEBhIAAgIIAEAAQAMAAAHgEQAEgEACgHQABgDAAgRIAAhQQAAgWgFgKQgIgNgSAAQgLAAgLAGQgLAFgPAPIgBACIABAJIAABYQAAAUACAEQACAFAGADQAGADAOAAIAAAIIheAAIAAgIQAQAAAGgDQAGgEACgHQABgEAAgRIAAhQQAAgWgHgLQgJgNgQAAQgLAAgLAGQgRAJgJAMIAABjQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIQANAAAFgCQAFgDADgGQADgGAAgSIAAhGQAAgfgCgJQgBgHgEgDQgDgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoIAYgXQAJgIALgEQAKgFALAAQASAAALALQANAKAEATQAVgYAPgIQAOgIAQAAQAPAAAMAIQALAIAHARQAEAMAAAZIAABQQAAASADAGQACAFAGADQAFADANAAIAAAIg");
	this.shape_15.setTransform(117.275,29.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAnBhIAAgoQgYAagNAHQgLAHgPAAQgQAAgLgJQgMgJgFgPQgEgOAAgaIAAhTQAAgNgDgGQgDgFgFgCQgGgDgPAAIAAgIIBCAAIAAB9QAAAaAJAJQAKAIANAAQAHAAALgGQALgFAQgQIAAhpQAAgQgGgGQgGgGgSAAIAAgIIBAAAIAABxQAAAhABAHQACAHAEADQADADAEAAQAGAAAJgDIACAHIg4AXg");
	this.shape_16.setTransform(79.85,30.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArAAAaAhQAWAbAAAkQAAAZgMAaQgNAagVANQgVAMgZAAQgqABgZgigAgbhOQgLAGgHAQQgGARAAAZQAAAnAQAfQAQAdAaAAQAUAAANgQQANgRAAgnQAAgygWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_17.setTransform(58.825,30.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAFgGAKAAQAHAAALAFIALADQAGAAAIgGQAGgHAIgSIAOghIhEiMQgDgHgHgJQgFgHgEgDQgEgDgKgDIAAgHIBXAAIAAAHIgEAAQgKAAgEAFQgEADAAAGQAAAIAGAPIAtBeIAqhnQADgJABgIQgBgEgBgCIgFgDQgEgCgIAAIAAgHIA8AAIAAAHQgHABgEADQgFACgEAHIgHAQIhLC6QgMAcgRANQgSAOgRAAQgMAAgIgHg");
	this.shape_18.setTransform(37.85,34.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAGgHAJAAQAJAAAHAHQAHAHAAAIQAAAKgHAGQgHAHgJAAQgJAAgGgHg");
	this.shape_19.setTransform(181.9,37.725);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAEAAQAOAAAEgEQAFgEADgHIAAgUIAAhCQAAgfgCgJQgEgJgHgFQgHgFgJAAQgLAAgKAGQgKAFgPAPIAABjQAAAUACAEQABAFAHADQAFADAPAAIAAAIIhdAAIAAgIQAMAAAHgEQAFgCACgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgGAAQgEAAgJADIgEgHIA5gXIAKAAIAACKQAWgZANgHQANgIANAAQAQAAAMAJQALAJAFATQAFAMAAAjIAABCQAAASACAHQADAFAEACQAFADANAAIAAAIg");
	this.shape_20.setTransform(166.15,24.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("Ag2BKQgZgbAAgsQAAgwAZgbQAZgbAkAAQAgAAAUAWQAVAUgBAjIiAAAQAAAoAUAYQAVAZAaAAQASgBAPgJQANgLAJgYIAGADQgEAdgVAXQgUAWgfAAQghAAgYgZgAgihHQgNANgCAYIBVAAQgBgSgCgHQgGgMgKgGQgKgHgKAAQgRAAgOANg");
	this.shape_21.setTransform(146.5,30.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAFAAQAMAAAGgEQAFgEACgHIABgUIAAhCQgBgfgDgJQgDgJgHgFQgHgFgKAAQgKAAgJAGQgMAFgPAPIAABjQAAAUACAEQADAFAFADQAHADANAAIAAAIIhdAAIAAgIQANAAAHgEQAEgCADgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgFAAQgFAAgKADIgCgHIA4gXIAJAAIAACKQAXgZANgHQAMgIAOAAQAQAAALAJQAMAJAGATQADAMAAAjIAABCQAAASAEAHQACAFAEACQAFADANAAIAAAIg");
	this.shape_22.setTransform(126.5,24.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgTCLQgHgHAAgJQAAgLAHgGQAHgHAJAAQAJAAAGAHQAHAGAAALQAAAJgHAHQgHAGgIAAQgJAAgHgGgAgJBKQACgaAFgRQAEgRAQgdQAMgXAEgMQADgNAAgMQAAgagNgQQgOgPgTgBQgSAAgKAJQgLAJAAAJQAAAIAGALQAHALAAAFQAAAIgFAFQgFAFgHAAQgIAAgHgJQgHgIAAgPQAAgYAUgRQATgSAiAAQAqAAAUAZQAOASAAAVQAAAPgGARQgHAPgTAWQgdAggHAOQgHAOAAAZg");
	this.shape_23.setTransform(267.725,74.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAzBhIgvh3Ig2B3IgHAAIg8idQgHgPgFgFQgGgFgMgDIAAgIIBOAAIAAAIQgKABgDADQgEADAAAGQAAAGAEAJIAnBrIAphXIgLgcQgEgMgJgFQgEgCgNgBIAAgIIBZAAIAAAIQgPABgGAEQgEAEAAAHIACAIIAqBrIAohnQAEgLAAgHQAAgDgEgEQgEgDgMAAIAAgIIA8AAIAAAIQgTADgIAVIg+Chg");
	this.shape_24.setTransform(243.05,78.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AhEBCQgWgdAAgjQAAgZANgaQANgZAVgMQAVgMAWAAQArgBAaAhQAWAcAAAjQAAAZgMAZQgNAagVANQgVANgZABQgqgBgZghgAgbhOQgLAGgHAQQgGAQAAAZQAAApAQAeQAQAdAaAAQAUAAANgQQANgQAAgpQAAgwgWgeQgPgTgVAAQgLAAgLAHg");
	this.shape_25.setTransform(217.425,78.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_26.setTransform(196.475,78.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("Ag2BJQgZgaAAgtQAAguAZgbQAZgbAkAAQAgAAAUAUQAVAVgBAjIiAAAQAAApAUAYQAVAXAaAAQASABAPgLQANgKAJgZIAGAFQgEAbgVAYQgUAXgfAAQghAAgYgbgAgihGQgNANgCAXIBVAAQgBgSgCgIQgGgLgKgHQgKgGgKAAQgRAAgOAOg");
	this.shape_27.setTransform(166.3,78.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAABhIhDieQgFgLgEgEQgEgFgHgEIgNgDIAAgIIBYAAIAAAIIgGAAQgIAAgEAEQgEAEAAAGQAAAIAEAJIArBnIAshrQAFgLAAgGQAAgDgCgCQgCgDgEgBQgDgBgLAAIAAgIIA9AAIAAAIQgKABgEADQgIAGgFAPIhDCgg");
	this.shape_28.setTransform(146.275,78.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("Ag2BJQgZgaABgtQAAguAZgbQAYgbAlAAQAfAAAUAUQAUAVABAjIiCAAQAAApAVAYQAUAXAbAAQATABANgLQAOgKAJgZIAHAFQgFAbgUAYQgVAXgfAAQghAAgYgbgAghhGQgOANgDAXIBXAAQgBgSgEgIQgFgLgKgHQgKgGgKAAQgRAAgNAOg");
	this.shape_29.setTransform(126.65,78.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgrCSIAAgIQAOAAAEgCQAFgDADgGQACgGAAgSIAAhIQAAgfgBgIQgCgGgDgDQgDgCgGAAQgFAAgIADIgDgIIA4gXIAJAAIAACWQgBASADAGQADAGAEACQAFADAOAAIAAAIgAgNhtQgFgHAAgIQAAgJAFgGQAHgGAHAAQAJAAAGAGQAGAGAAAJQAAAIgGAHQgGAGgJAAQgHAAgHgGg");
	this.shape_30.setTransform(111.45,73.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("Ag2BJQgYgbAAgtQAAgsAagbQAagcAkAAQAcgBASAPQASAPAAAQQAAAHgFAFQgFAFgJAAQgMAAgHgHQgDgFgBgMQgBgMgHgGQgIgGgNgBQgTAAgMAPQgRAUAAAiQAAAgARAaQAQAaAbAAQAVAAAQgOQALgKAKgYIAGACQgIAmgVAUQgXAUgbAAQgegBgYgag");
	this.shape_31.setTransform(75.2,78.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("Ag2BKQgYgbAAgsQAAgwAYgbQAZgbAkAAQAgAAAUAWQAUAUAAAjIiAAAQgBAoAVAYQAUAZAbAAQASgBAOgJQAOgLAJgYIAGADQgEAdgUAXQgVAWgfAAQghAAgYgZgAghhHQgOANgCAYIBWAAQgCgSgDgHQgFgMgKgGQgKgHgKAAQgRAAgNANg");
	this.shape_32.setTransform(237.15,30.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AhDBhIAAgIQAOAAAIgEQAEgDADgIQABgDAAgQIAAhIQAAghgBgGQgCgHgEgCQgDgDgFAAQgHAAgIADIgCgIIA5gXIAIAAIAAArQAXgrAZAAQALAAAIAHQAHAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgFAAQgDAAgEAEQgKAJgJATIAABZQABAPADAIQACAGAHAEQAHADAMAAIAAAIg");
	this.shape_33.setTransform(220.9,29.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArAAAaAhQAWAbAAAkQAAAZgMAaQgNAagVANQgVAMgZAAQgqABgZgigAgbhOQgLAGgHAQQgGARAAAZQAAAnAQAfQAQAdAaAAQAUAAANgQQANgRAAgnQAAgygWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_34.setTransform(203.125,30.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AglBeQgGgCgFAAQgEgBgDAGIgHAAIAAhDIAHAAQAGAcAPAPQAQAOAUAAQAOABAJgJQAJgIAAgMQAAgOgKgKQgKgJgdgPQgegNgJgMQgJgMAAgSQAAgXAQgQQAQgQAZAAQAKABAQAFIAOACQADABACgCQACgCADgFIAGAAIAABAIgGAAQgJgdgMgLQgMgLgSAAQgOAAgJAIQgJAHAAAJQAAALAHAJQAGAIATAKIAdAOQAqAUAAAgQAAAagTAQQgTAPgYAAQgRAAgWgFg");
	this.shape_35.setTransform(141.6,30.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgEA8IgLg8QgFgZAAgJQAAgNAGgGQAFgGAJAAQAIAAAHAGQAGAGAAAKQAAAHgGAeIgLA8g");
	this.shape_36.setTransform(129.325,17);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhCQAAgfgCgJQgEgJgHgFQgHgFgJAAQgLAAgJAGQgLAFgPAPIAABjQAAAUACAEQABAFAHADQAFADAPAAIAAAIIhdAAIAAgIQAMAAAHgEQAFgCACgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgGAAQgEAAgJADIgEgHIA5gXIAKAAIAACKQAWgZANgHQANgIANAAQAQAAAMAJQALAJAGATQAEAMAAAjIAABCQAAASACAHQACAFAFACQAFADANAAIAAAIg");
	this.shape_37.setTransform(84.8,24.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("ABBCOIhAixIg+CxIgHAAIhTjmQgJgagCgEQgEgIgHgEQgIgEgMAAIAAgHIBnAAIAAAHIgFAAQgLAAgFAFQgGAFAAAHQAAAHAJAaIA3CbIAuiEIgIgXIgHgTQgEgKgGgIQgCgEgEgCIgKgGIgNgBIAAgHIBsAAIAAAHIgIAAQgLAAgGAFQgFAFAAAJQAAAKAJAaIA2CWIA1iYQAJgZAAgKQAAgFgDgEQgDgEgFgCQgIgDgMAAIAAgHIBTAAIAAAHQgLAAgHAEQgHAEgGALQgEAHgJAbIhNDfg");
	this.shape_38.setTransform(54.575,25.875);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAGgGAJAAQAHAAALAFIALADQAGAAAHgGQAIgHAHgSIANghIhDiMQgDgHgHgJQgFgHgDgDQgFgDgLgDIAAgHIBYAAIAAAHIgFAAQgIAAgFAFQgEADgBAGQABAIAGAPIAtBeIAqhnQADgJAAgIQABgEgCgCIgGgDQgDgCgJAAIAAgHIA+AAIAAAHQgIABgEADQgFACgEAHIgHAQIhMC6QgLAcgSANQgRAOgRAAQgMAAgIgHg");
	this.shape_39.setTransform(174.5,277.325);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AhEBCQgWgdAAgjQAAgZANgaQANgZAVgMQAVgMAWAAQArgBAaAhQAWAcAAAjQAAAZgMAaQgNAZgVANQgVAOgZAAQgqAAgZgigAgbhOQgLAGgHAQQgGAQAAAaQAAAoAQAeQAQAdAaAAQAUAAANgQQANgQAAgpQAAgxgWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_40.setTransform(153.475,272.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAFgGAKAAQAHAAAMAFIAKADQAGAAAHgGQAIgHAHgSIANghIhDiMQgDgHgHgJQgFgHgDgDQgFgDgLgDIAAgHIBYAAIAAAHIgFAAQgIAAgFAFQgFADAAAGQAAAIAHAPIAtBeIAqhnQAEgJgBgIQAAgEgBgCIgFgDQgEgCgJAAIAAgHIA9AAIAAAHQgHABgEADQgEACgFAHIgHAQIhMC6QgKAcgTANQgRAOgRAAQgNAAgHgHg");
	this.shape_41.setTransform(296.2,228.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AglBeQgGgDgFAAQgFAAgDAGIgGAAIAAhDIAGAAQAHAdAQAOQAQAPATAAQAOAAAJgJQAJgIAAgLQAAgPgKgKQgKgJgdgPQgdgOgKgMQgJgLAAgSQAAgXAQgQQAQgQAZAAQAKAAAQAGIAOACQADAAACgBQACgCADgFIAGAAIAABAIgGAAQgJgegMgKQgMgMgSAAQgOABgJAHQgJAIAAAJQAAAMAHAIQAGAIAUAJIAcAPQAqATAAAiQAAAagTAPQgTAPgYAAQgRAAgWgFg");
	this.shape_42.setTransform(234.65,224.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AhPB8QgPgKAAgLQAAgFADgFQADgHAKgOIAWgWQgLgGgEgFQgFgGAAgGQAAgHAGgJQAFgLAWgQQgSgJgJgOQgJgPAAgTQAAgbAWgVQAUgUAhAAQAaAAAUANIAnAAQAJAAABABIACABQACACAAAFIgBAIIgCABIgLAAIgYAAQAMAQAAAWQAAAbgVASQgTATgiAAQgOAAgOgEQgJAIgDAEQgDAGAAAFQAAADADADQAEAEAJABIAdABQApABANACQASADAMAMQALALAAAQQABAYgWAUQggAegzAAQgoAAgbgSgAg8BHQgEAJAAAHQAAALALAHQAUAMAnAAQAkAAASgNQASgNAAgOQAAgLgLgFQgKgEgggBQgtgBgZgEQgKALgFAJgAghh3QgKAMAAAZQAAAgAOATQALANAQAAQAOAAALgMQAJgLABgZQAAghgPgTQgKgNgQAAQgOAAgLAMg");
	this.shape_43.setTransform(186.8,228.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgsCSIAAgIQAOAAAFgCQAFgDADgGQACgGAAgSIAAhIQAAgfgCgIQgBgGgDgDQgDgCgFAAQgGAAgJADIgCgIIA4gXIAIAAIAACWQABASACAGQADAGAEACQAFADAOAAIAAAIgAgNhtQgFgHAAgIQAAgJAFgGQAGgGAIAAQAJAAAGAGQAGAGAAAJQAAAIgGAHQgGAGgJAAQgHAAgHgGg");
	this.shape_44.setTransform(149.35,219.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAFAAQAMAAAGgEQAEgEADgHIABgUIAAhCQAAgfgEgJQgDgJgHgFQgHgFgKAAQgKAAgKAGQgLAFgPAPIAABjQAAAUACAEQACAFAGADQAHADANAAIAAAIIhdAAIAAgIQANAAAHgEQAEgCADgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgFAAQgFAAgKADIgCgHIA4gXIAJAAIAACKQAXgZANgHQANgIANAAQAQAAALAJQAMAJAFATQAEAMAAAjIAABCQABASADAHQABAFAGACQAEADAOAAIAAAIg");
	this.shape_45.setTransform(132.9,219.075);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAGgGAJAAQAHAAALAFIALADQAGAAAHgGQAIgHAHgSIANghIhDiMQgDgHgHgJQgFgHgDgDQgFgDgLgDIAAgHIBYAAIAAAHIgFAAQgIAAgFAFQgEADgBAGQABAIAGAPIAtBeIAqhnQADgJAAgIQABgEgCgCIgGgDQgDgCgIAAIAAgHIA9AAIAAAHQgIABgEADQgEACgFAHIgHAQIhMC6QgLAcgSANQgRAOgRAAQgMAAgIgHg");
	this.shape_46.setTransform(100.25,228.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AhDBhIAAgIQAOAAAIgEQAEgDACgIQABgDAAgQIAAhIQAAghgBgGQgBgHgDgCQgEgDgFAAQgHAAgIADIgCgIIA5gXIAIAAIAAArQAXgrAZAAQALAAAIAHQAHAHAAAJQAAAIgFAGQgFAFgIAAQgHAAgJgHQgJgHgFAAQgDAAgFAEQgIAJgKATIAABZQAAAPAEAIQACAGAHAEQAHADANAAIAAAIg");
	this.shape_47.setTransform(83,223.975);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("Ag2BJQgYgaAAgtQAAguAYgcQAZgbAkAAQAgABAUAUQAUAVAAAjIiAAAQgBAoAVAZQAUAYAbAAQASAAAOgLQAOgKAJgYIAGAEQgEAbgUAYQgVAXgfgBQghAAgYgagAghhHQgOANgCAYIBWAAQgCgSgDgIQgFgLgKgHQgKgGgKAAQgRAAgNANg");
	this.shape_48.setTransform(66.6,224.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("Ag2BJQgYgagBgtQAAguAagcQAYgbAlAAQAfABAUAUQAVAVAAAjIiCAAQABAoAUAZQAVAYAaAAQATAAAOgLQANgKAJgYIAHAEQgFAbgVAYQgUAXgggBQggAAgYgagAgihHQgNANgDAYIBXAAQgBgSgDgIQgGgLgKgHQgKgGgKAAQgRAAgOANg");
	this.shape_49.setTransform(26.95,224.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_50.setTransform(312.175,172.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("Ag2BKQgZgbABgtQAAgvAZgaQAYgbAlAAQAfgBAUAVQAUAVABAjIiCAAQAAApAVAXQAUAYAbAAQATABANgLQAOgKAJgZIAHAFQgFAcgUAXQgVAWggABQggAAgYgagAghhGQgOANgDAXIBXAAQgBgSgEgIQgFgLgKgHQgKgGgKAAQgRAAgNAOg");
	this.shape_51.setTransform(278.3,175.7);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AhDBhIAAgIQAOAAAHgEQAFgDADgIQABgDAAgQIAAhIQAAghgBgGQgCgHgEgCQgDgDgGAAQgGAAgIADIgCgIIA5gXIAJAAIAAArQAWgrAZAAQALAAAHAHQAIAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgEAAQgEAAgEAEQgKAJgIATIAABZQAAAPADAIQACAGAHAEQAGADANAAIAAAIg");
	this.shape_52.setTransform(262.05,175.425);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_53.setTransform(249.225,172.775);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AhEBCQgWgdAAgjQAAgZANgaQANgZAVgMQAVgMAWAAQArgBAaAhQAWAcAAAjQAAAZgMAZQgNAagVANQgVANgZABQgqgBgZghgAgbhOQgLAGgHAQQgGAQAAAZQAAApAQAeQAQAdAaAAQAUAAANgQQANgQAAgpQAAgxgWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_54.setTransform(222.125,175.7);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_55.setTransform(206.075,172.775);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_56.setTransform(179.025,175.425);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("Ag2BKQgYgbgBgtQAAgvAZgaQAZgbAlAAQAfgBAUAVQAVAVAAAjIiCAAQABApAUAXQAVAYAaAAQATABAOgLQANgKAJgZIAHAFQgFAcgVAXQgUAWggABQggAAgYgagAgihGQgNANgDAXIBWAAQAAgSgDgIQgGgLgKgHQgKgGgKAAQgRAAgOAOg");
	this.shape_57.setTransform(159.35,175.7);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAABhIhDieQgFgLgEgEQgEgFgHgEIgNgDIAAgIIBYAAIAAAIIgGAAQgIAAgEAEQgEAEAAAGQAAAIAEAJIArBnIAshrQAFgLAAgGQAAgDgCgCQgCgDgEgBQgDgBgLAAIAAgIIA9AAIAAAIQgKABgEADQgIAGgFAPIhDCgg");
	this.shape_58.setTransform(139.325,175.975);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_59.setTransform(120.225,175.625);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAFAAQANAAAFgEQAEgEADgHIABgUIAAhCQAAgfgEgJQgDgJgHgFQgHgFgKAAQgKAAgKAGQgLAFgPAPIAABjQAAAUACAEQADAFAFADQAHADAOAAIAAAIIheAAIAAgIQANAAAHgEQAEgCADgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgFAAQgFAAgKADIgCgHIA4gXIAJAAIAACKQAXgZANgHQANgIANAAQAQAAALAJQAMAJAFATQAEAMABAjIAABCQAAASADAHQABAFAGACQAEADAOAAIAAAIg");
	this.shape_60.setTransform(99.7,170.525);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_61.setTransform(68.225,175.425);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAzBhIgvh3Ig1B3IgIAAIg8idQgGgPgGgFQgGgFgMgDIAAgIIBOAAIAAAIQgKABgDADQgEADAAAGQAAAGAEAJIAnBrIAphXIgLgcQgEgMgJgFQgEgCgNgBIAAgIIBZAAIAAAIQgPABgGAEQgEAEAAAHIACAIIAqBrIAohnQAEgLAAgHQAAgDgEgEQgEgDgMAAIAAgIIA8AAIAAAIQgTADgIAVIg+Chg");
	this.shape_62.setTransform(42.45,175.975);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AhEBCQgWgdAAgjQAAgZANgaQANgZAVgMQAVgMAWAAQArgBAaAhQAWAcAAAjQAAAZgMAZQgNAagVANQgVANgZABQgqgBgZghgAgbhOQgLAGgHAQQgGAQAAAZQAAApAQAeQAQAdAaAAQAUAAANgQQANgQAAgpQAAgxgWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_63.setTransform(16.825,175.7);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAFgGAKAAQAHAAALAFIALADQAGAAAIgGQAGgHAIgSIANghIhDiMQgDgHgHgJQgFgHgEgDQgEgDgKgDIAAgHIBXAAIAAAHIgEAAQgKAAgEAFQgEADgBAGQABAIAGAPIAtBeIAqhnQADgJABgIQgBgEgBgCIgGgDQgDgCgIAAIAAgHIA9AAIAAAHQgIABgEADQgFACgEAHIgHAQIhMC6QgLAcgRANQgTAOgQAAQgMAAgIgHg");
	this.shape_64.setTransform(300.3,131.675);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("ABEBhIAAgIIAEAAQAMAAAHgEQAEgEACgHQABgDAAgRIAAhQQAAgWgFgKQgIgNgSAAQgLAAgLAGQgLAFgPAPIgBACIABAJIAABYQAAAUACAEQACAFAGADQAGADAOAAIAAAIIheAAIAAgIQAQAAAGgDQAGgEACgHQABgEAAgRIAAhQQAAgWgHgLQgJgNgQAAQgLAAgLAGQgRAJgJAMIAABjQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIQANAAAFgCQAFgDADgGQADgGAAgSIAAhGQAAgfgCgJQgBgHgEgDQgDgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoIAYgXQAJgIALgEQAKgFALAAQASAAALALQANAKAEATQAVgYAPgIQAOgIAQAAQAPAAAMAIQALAIAHARQAEAMAAAZIAABQQAAASADAGQACAFAGADQAFADANAAIAAAIg");
	this.shape_65.setTransform(273.575,126.875);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgdAuQAUgHAMgOQALgPAAgQQAAgDgCgDIgDgCQgCAAgHAFIgIABQgJAAgGgGQgHgFABgLQgBgKAJgIQAHgGALAAQAMAAALALQALAMAAATQAAAVgPASQgPASgeALg");
	this.shape_66.setTransform(241.45,138);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AALBeIAAgHQAJAAAFgFQAEgDAAgEQAAgFgNgTIgagoIgeAoQgOATAAADQAAAFAEAEQAFAEAJABIAAAHIg9AAIAAgHQAHgBAGgFQAHgFATgZIAngzIgjg0QgQgWgIgGQgIgFgNAAIAAgIIBZAAIAAAIQgJAAgDACQgDADAAAFQAAAFAHALIAGAKIANAVIAPgVQAPgUAAgGQAAgEgEgDQgDgEgIABIAAgIIBAAAIAAAIQgKABgIAEQgKAHgRAYIgaAiIAvBCQARAZAIAFQAHAFAMABIAAAHg");
	this.shape_67.setTransform(225.675,127.15);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArABAaAgQAWAbAAAlQAAAYgMAaQgNAZgVAOQgVAMgZAAQgqABgZgigAgbhPQgLAHgHAQQgGARAAAZQAAAoAQAdQAQAeAaAAQAUAAANgQQANgQAAgoQAAgygWgcQgPgUgVAAQgLAAgLAGg");
	this.shape_68.setTransform(204.625,127.15);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgfCPQgRgGgRgMIAAjCQAAgfgCgIQgCgHgDgDQgDgDgFAAQgGAAgIAEIgDgHIA4gYIAJAAIAACIQAcglAegBQAdAAAWAZQAVAZAAAqQAAAyghAeQgdAagjAAQgPABgRgGgAgLgPQgIAEgNAMIAABwQALALALAEQAKAGAMAAQATAAAQgVQAQgUAAgnQAAgkgQgTQgQgTgVgBQgKABgLAFg");
	this.shape_69.setTransform(182.875,122.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAiCUIAAgaQgOAOgNAHQgNAFgPAAQgfAAgWgZQgYgZAAgpQABgoAZghQAZghAogBQAYAAARAQIAAgjQgBgfgBgIQgCgHgDgDQgEgDgEAAQgGAAgIAEIgDgHIA4gYIAJAAIAADYQAAAiACAHQABAHADADQAEADAEAAQAGAAAKgEIABAIIg3AWgAgqgVQgSAVAAAoQAAAqASAWQASAWAWAAQASAAASgSIAAhiQgCgMgGgMQgGgLgLgGQgJgGgJAAQgSAAgPAQg");
	this.shape_70.setTransform(163.4,122.25);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_71.setTransform(141.675,126.875);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_72.setTransform(122.525,127.075);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AglBeQgGgCgFgBQgFAAgDAGIgGAAIAAhDIAGAAQAHAcAQAPQAQAPATgBQAOABAJgJQAJgIAAgLQAAgPgKgKQgKgJgdgPQgdgOgKgLQgJgMAAgSQAAgXAQgQQAQgQAZAAQAKAAAQAGIAOACQADABACgCQACgBADgGIAGAAIAABAIgGAAQgJgdgMgLQgMgLgSAAQgOAAgJAHQgJAIAAAJQAAALAHAJQAGAIAUAJIAcAPQAqAUAAAgQAAAbgTAPQgTAPgYAAQgRAAgWgFg");
	this.shape_73.setTransform(104.6,127.15);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_74.setTransform(75.175,126.875);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAzBhIgvh3Ig1B3IgIAAIg9idQgGgPgFgFQgGgFgMgDIAAgIIBPAAIAAAIQgMABgDADQgDADAAAGQAAAGADAJIApBrIAohXIgLgcQgEgMgJgFQgEgCgMgBIAAgIIBYAAIAAAIQgPABgGAEQgEAEAAAHIACAIIAqBrIAnhnQAFgLAAgHQAAgDgEgEQgEgDgMAAIAAgIIA8AAIAAAIQgSADgJAVIg/Chg");
	this.shape_75.setTransform(49.4,127.425);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArABAaAgQAWAbAAAlQAAAYgMAaQgNAZgVAOQgVAMgZAAQgqABgZgigAgbhPQgLAHgHAQQgGARAAAZQAAAoAQAdQAQAeAaAAQAUAAANgQQANgQAAgoQAAgygWgcQgPgUgVAAQgLAAgLAGg");
	this.shape_76.setTransform(23.775,127.15);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAGgGAJAAQAHAAAMAFIAKADQAGAAAHgGQAIgHAHgSIAOghIhEiMQgDgHgHgJQgFgHgEgDQgEgDgLgDIAAgHIBYAAIAAAHIgEAAQgKAAgEAFQgFADABAGQgBAIAHAPIAtBeIAqhnQADgJAAgIQAAgEgBgCIgFgDQgEgCgJAAIAAgHIA9AAIAAAHQgHABgEADQgEACgFAHIgHAQIhLC6QgLAcgTANQgSAOgQAAQgNAAgHgHg");
	this.shape_77.setTransform(292.7,83.125);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("ABEBhIAAgIIAEAAQAMAAAHgEQAEgEACgHQABgDAAgRIAAhQQAAgWgFgKQgIgNgSAAQgLAAgLAGQgLAFgPAPIgBACIABAJIAABYQAAAUACAEQACAFAGADQAGADAOAAIAAAIIheAAIAAgIQAQAAAGgDQAGgEACgHQABgEAAgRIAAhQQAAgWgHgLQgJgNgQAAQgLAAgLAGQgRAJgJAMIAABjQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIQANAAAFgCQAFgDADgGQADgGAAgSIAAhGQAAgfgCgJQgBgHgEgDQgDgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoIAYgXQAJgIALgEQAKgFALAAQASAAALALQANAKAEATQAVgYAPgIQAOgIAQAAQAPAAAMAIQALAIAHARQAEAMAAAZIAABQQAAASADAGQACAFAGADQAFADANAAIAAAIg");
	this.shape_78.setTransform(265.975,78.325);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgeAvQAVgIALgOQAMgPAAgPQAAgEgCgDIgDgBQgCAAgHADIgHACQgKAAgHgFQgFgHgBgKQABgKAHgIQAIgHALAAQANABAKAMQAKALAAATQAAAVgOASQgOASggALg");
	this.shape_79.setTransform(233.85,89.45);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AhiCOIAAgIIAFAAQAMAAAIgEQAEgDACgEQACgGAAgUIAAixQAAgSgBgFQgCgFgEgCQgDgDgHAAQgEAAgIADIgCgGIA6gYIAHAAIAAAsQAPgZAOgKQAOgKARAAQAbAAAUAXQAWAbAAArQAAAwgbAfQgXAagjAAQgOAAgLgEQgJgDgKgJIAAA5QAAATACAGQADAFAGADQAGADAOAAIAAAIgAgGhqQgIAEgRASIAABGQAAAWACAHQADAMALAJQAMAJAQAAQAUAAAMgQQARgVAAglQAAgrgTgXQgNgQgSAAQgJAAgJAFg");
	this.shape_80.setTransform(217.25,82.825);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAnBhIAAgoQgYAagNAHQgLAHgPAAQgPAAgMgJQgMgJgFgPQgEgOAAgaIAAhTQAAgNgCgGQgDgFgGgCQgGgDgPAAIAAgIIBCAAIAAB9QAAAaAKAJQAIAIANAAQAIAAALgGQAMgFAPgQIAAhpQAAgQgGgGQgFgGgTAAIAAgIIBAAAIAABxQAAAhABAHQACAHAEADQADADAEAAQAHAAAHgDIAEAHIg5AXg");
	this.shape_81.setTransform(197.05,78.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("Ag0AQIAAgfIBpAAIAAAfg");
	this.shape_82.setTransform(179.55,78.6);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_83.setTransform(166.975,75.675);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("Ag2BJQgZgaABgtQAAguAZgbQAYgbAkAAQAgAAAUAUQAUAVAAAjIiBAAQAAApAVAYQAUAXAbAAQASABAOgLQAOgKAJgZIAGAFQgEAbgUAYQgVAXgfAAQghAAgYgbgAghhGQgOANgDAXIBXAAQgCgSgDgIQgFgLgKgHQgKgGgKAAQgRAAgNAOg");
	this.shape_84.setTransform(151.75,78.6);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AglBdQgGgCgFABQgFAAgDAFIgGAAIAAhDIAGAAQAGAcAQAPQARAPATAAQAOgBAJgHQAJgJAAgMQAAgOgKgJQgKgKgdgPQgegOgJgMQgJgLAAgSQAAgXAQgQQAQgPAZAAQAKAAAQAEIAOAEQADAAACgCQACgCACgEIAHAAIAABAIgHAAQgHgegMgMQgNgKgSgBQgOAAgJAJQgJAHAAAJQAAALAHAJQAGAIATAJIAeAPQApAUAAAhQAAAZgTAQQgUAQgYAAQgQAAgWgHg");
	this.shape_85.setTransform(134.35,78.6);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_86.setTransform(106.775,78.525);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AglBdQgHgCgEABQgEAAgDAFIgHAAIAAhDIAHAAQAFAcAQAPQAQAPAUAAQAOgBAJgHQAJgJAAgMQAAgOgKgJQgKgKgdgPQgdgOgKgMQgJgLAAgSQAAgXAQgQQAQgPAZAAQAKAAAQAEIAOAEQADAAACgCQACgCADgEIAGAAIAABAIgGAAQgJgegLgMQgNgKgSgBQgOAAgJAJQgJAHAAAJQAAALAHAJQAGAIATAJIAeAPQApAUAAAhQAAAZgTAQQgUAQgYAAQgQAAgWgHg");
	this.shape_87.setTransform(78.35,78.6);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_88.setTransform(61.275,78.525);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAzBhIgvh3Ig1B3IgJAAIg8idQgGgPgGgFQgFgFgNgDIAAgIIBQAAIAAAIQgMABgDADQgDADAAAGQAAAGADAJIApBrIAohXIgLgcQgFgMgHgFQgFgCgMgBIAAgIIBYAAIAAAIQgPABgGAEQgEAEAAAHIACAIIAqBrIAnhnQAFgLAAgHQAAgDgEgEQgEgDgMAAIAAgIIA7AAIAAAIQgSADgIAVIg/Chg");
	this.shape_89.setTransform(36,78.875);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAiCUIAAgaQgOAOgNAHQgMAFgQAAQgeAAgYgZQgWgaAAgoQgBgpAaggQAZgiAoAAQAYAAARAQIAAgjQAAgfgCgIQgCgHgDgDQgDgDgFAAQgFAAgKAEIgCgIIA4gXIAJAAIAADZQAAAgACAIQABAHADADQAEADAFAAQAFAAAKgEIACAIIg4AWgAgqgUQgSAUAAAoQAAAqASAWQASAWAWAAQASAAASgSIAAhiQgCgMgGgMQgGgLgKgGQgKgGgJAAQgSAAgPARg");
	this.shape_90.setTransform(300.45,25.15);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgrCSIAAgIQANAAAEgCQAFgDADgGQACgGAAgSIAAipQAAgggBgHQgBgIgEgCQgDgDgFAAQgFAAgIADIgEgHIA3gXIAJAAIAAD4QAAASADAGQADAFAFADQAFADAPAAIAAAIg");
	this.shape_91.setTransform(283.575,24.875);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AhDBhIAAgIQAPAAAGgEQAGgDACgIQAAgDAAgQIAAhIQAAghAAgGQgCgHgEgCQgDgDgGAAQgGAAgIADIgCgIIA5gXIAJAAIAAArQAWgrAZAAQAMAAAGAHQAIAHAAAJQAAAIgFAGQgGAFgHAAQgHAAgJgHQgJgHgEAAQgEAAgFAEQgJAJgIATIAABZQAAAPADAIQACAGAHAEQAGADAOAAIAAAIg");
	this.shape_92.setTransform(270.8,29.775);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("Ag2BKQgYgbgBgsQAAgwAagbQAYgbAlAAQAfAAAUAWQAVAUAAAjIiCAAQABAoAUAYQAVAZAaAAQATgBAOgJQANgLAJgYIAHADQgFAdgVAXQgUAWggAAQggAAgYgZgAgihHQgNANgDAYIBWAAQAAgSgDgHQgGgMgKgGQgKgHgKAAQgRAAgOANg");
	this.shape_93.setTransform(192.55,30.05);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgrCSIAAgIQANAAAEgCQAFgDADgGQACgGAAgSIAAipQAAgggBgHQgBgIgEgCQgDgDgFAAQgFAAgIADIgEgHIA3gXIAJAAIAAD4QAAASADAGQADAFAFADQAFADAPAAIAAAIg");
	this.shape_94.setTransform(177.425,24.875);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAFAAQANAAAFgEQAFgEACgHIAAgUIAAhCQAAgfgDgJQgDgJgHgFQgHgFgKAAQgKAAgJAGQgMAFgOAPIAABjQAAAUABAEQADAFAFADQAGADAOAAIAAAIIhcAAIAAgIQAMAAAHgEQAEgCADgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgGAAQgEAAgJADIgDgHIA4gXIAKAAIAACKQAWgZANgHQAMgIAOAAQAQAAAMAJQALAJAGATQADAMAAAjIAABCQAAASAEAHQACAFAEACQAFADANAAIAAAIg");
	this.shape_95.setTransform(139.9,24.875);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAzBhIgvh3Ig2B3IgIAAIg7idQgHgPgGgFQgFgFgNgDIAAgIIBPAAIAAAIQgLABgCADQgEADAAAGQAAAGAEAJIAnBrIAphXIgLgcQgFgMgHgFQgFgCgNgBIAAgIIBZAAIAAAIQgPABgGAEQgEAEAAAHIABAIIArBrIAnhnQAFgLAAgHQAAgDgEgEQgEgDgMAAIAAgIIA7AAIAAAIQgRADgJAVIg/Chg");
	this.shape_96.setTransform(114.15,30.325);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AglBeQgHgCgEAAQgEgBgEAGIgGAAIAAhDIAGAAQAHAcAQAPQAQAOATAAQAOABAJgJQAJgIAAgMQAAgOgKgKQgKgJgdgPQgdgNgKgMQgJgMAAgSQAAgXAQgQQAQgQAZAAQAKABAQAFIAOACQADABACgCQACgCACgFIAHAAIAABAIgHAAQgHgdgNgLQgMgLgSAAQgOAAgJAIQgJAHAAAJQAAALAHAJQAGAIAUAKIAcAOQAqAUAAAgQAAAagTAQQgTAPgYAAQgRAAgWgFg");
	this.shape_97.setTransform(80.65,30.05);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgsCSIAAgIQAOAAAFgCQAFgDACgGQAEgGAAgSIAAhIQAAgfgDgIQgBgGgDgDQgDgCgFAAQgGAAgJADIgCgIIA3gXIAJAAIAACWQAAASADAGQACAGAGACQAEADAOAAIAAAIgAgMhtQgHgHAAgIQAAgJAHgGQAFgGAJAAQAIAAAGAGQAGAGAAAJQAAAIgGAHQgGAGgIAAQgIAAgGgGg");
	this.shape_98.setTransform(66.5,24.875);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAEAAQAOAAAEgEQAFgEADgHIAAgUIAAhCQAAgfgCgJQgEgJgHgFQgHgFgJAAQgLAAgKAGQgKAFgPAPIAABjQAAAUACAEQABAFAHADQAFADAPAAIAAAIIhdAAIAAgIQAMAAAHgEQAFgCACgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgGAAQgEAAgJADIgEgHIA5gXIAKAAIAACKQAWgZANgHQANgIANAAQAQAAAMAJQALAJAFATQAFAMAAAjIAABCQAAASACAHQADAFAFACQAEADANAAIAAAIg");
	this.shape_99.setTransform(50.05,24.875);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("Ag7CLIAAgHIAKAAQASAAAHgLQAFgHAAgXIAAjTIgiAAQgTgBgIADQgLAEgIALQgHALgCATIgIAAIAEhBIDiAAIADBBIgIAAQgCgRgEgIQgGgLgLgGQgLgFgRAAIgnAAIAADTQAAAZAGAHQAHAIARABIAJAAIAAAHg");
	this.shape_100.setTransform(26.825,25.55);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("Ag2BJQgYgagBgsQAAgwAZgbQAZgbAlAAQAfAAAUAWQAVAUAAAjIiCAAQABAoAUAYQAVAZAaAAQATgBAOgJQANgLAJgYIAHADQgFAdgVAXQgUAWggAAQggAAgYgagAgihHQgNANgDAYIBWAAQgBgSgCgHQgGgMgKgGQgKgHgKAAQgRAAgOANg");
	this.shape_101.setTransform(287.6,127.15);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("Ag2BJQgZgaAAgsQAAgwAZgbQAZgbAkAAQAgAAAUAWQAVAUgBAjIiAAAQAAAoAUAYQAVAZAaAAQASgBAPgJQANgLAJgYIAGADQgEAdgVAXQgUAWgfAAQghAAgYgagAgihHQgNANgCAYIBVAAQgBgSgCgHQgGgMgKgGQgKgHgKAAQgRAAgOANg");
	this.shape_102.setTransform(229.3,127.15);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AglBeQgHgCgEgBQgFAAgDAGIgGAAIAAhDIAGAAQAGAcARAPQAQAPATgBQAOABAJgJQAJgIAAgLQAAgPgKgKQgKgJgdgPQgdgOgKgLQgJgMAAgSQAAgXAQgQQAQgQAZAAQAKAAAQAGIAOACQADABACgCQACgBACgGIAHAAIAABAIgHAAQgHgdgNgLQgMgLgSAAQgOAAgJAHQgJAIAAAJQAAALAHAJQAGAIAUAJIAdAPQApAUAAAgQAAAbgTAPQgUAPgXAAQgRAAgWgFg");
	this.shape_103.setTransform(168.75,127.15);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgdAuQAVgHAKgOQAMgPAAgQQAAgDgCgDIgDgCQgCAAgHAFIgIABQgKAAgGgGQgFgFAAgLQgBgKAJgIQAHgGALAAQAMAAALALQALAMAAATQAAAVgPASQgPASgeALg");
	this.shape_104.setTransform(144.6,138);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAiCUIAAgaQgOAOgNAHQgMAFgQAAQgfAAgWgZQgYgZAAgpQAAgoAaghQAZghAogBQAYAAARAQIAAgjQAAgfgCgIQgCgHgDgDQgEgDgEAAQgGAAgJAEIgCgHIA4gYIAJAAIAADYQAAAiACAHQABAHADADQAEADAEAAQAGAAAKgEIACAIIg4AWgAgqgVQgSAVAAAoQAAAqASAWQASAWAWAAQASAAASgSIAAhiQgCgMgGgMQgGgLgLgGQgJgGgJAAQgSAAgPAQg");
	this.shape_105.setTransform(129.55,122.25);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("Ag2BJQgYgagBgsQAAgwAagbQAYgbAlAAQAfAAAUAWQAVAUAAAjIiCAAQABAoAUAYQAVAZAaAAQATgBAOgJQANgLAJgYIAHADQgFAdgVAXQgUAWggAAQggAAgYgagAgihHQgNANgDAYIBWAAQAAgSgDgHQgGgMgKgGQgKgHgKAAQgRAAgOANg");
	this.shape_106.setTransform(88.15,127.15);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("Ag2BJQgYgagBgsQAAgwAZgbQAZgbAlAAQAfAAAUAWQAVAUAAAjIiCAAQABAoAUAYQAVAZAaAAQATgBAOgJQANgLAJgYIAHADQgFAdgVAXQgUAWggAAQggAAgYgagAgihHQgNANgDAYIBWAAQgBgSgCgHQgGgMgKgGQgKgHgKAAQgRAAgOANg");
	this.shape_107.setTransform(59,127.15);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAEAAQANAAAFgEQAGgEACgHIAAgUIAAhCQAAgfgCgJQgEgJgHgFQgHgFgKAAQgKAAgJAGQgLAFgPAPIAABjQAAAUABAEQACAFAHADQAFADAOAAIAAAIIhcAAIAAgIQAMAAAHgEQAFgCACgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgGAAQgEAAgJADIgEgHIA5gXIAKAAIAACKQAWgZANgHQANgIANAAQAQAAAMAJQALAJAGATQADAMAAAjIAABCQAAASADAHQADAFAEACQAFADANAAIAAAIg");
	this.shape_108.setTransform(39,121.975);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAiCVIAAgbQgOAOgOAGQgMAHgPAAQgegBgXgZQgYgZAAgpQAAgpAaggQAZghAoAAQAYAAARAPIAAgiQgBghgBgHQgCgIgDgCQgDgDgFAAQgGAAgIADIgDgHIA4gWIAJAAIAADXQAAAhACAIQABAHADADQAEADAEAAQAGAAAJgDIACAGIg4AYgAgpgVQgTAVAAApQAAApASAWQASAWAWAAQASAAASgTIAAhgQgCgNgGgLQgGgMgLgGQgJgGgJAAQgSAAgOAQg");
	this.shape_109.setTransform(284.65,73.7);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAKCSIAAgIIAEAAQAOAAAFgEQAEgEADgHIABgUIAAhCQAAgfgDgJQgEgJgHgFQgHgFgJAAQgLAAgKAGQgLAFgPAPIAABjQAAAUADAEQACAFAFADQAHADAOAAIAAAIIheAAIAAgIQANAAAHgEQAEgCADgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgFAAQgFAAgKADIgDgHIA5gXIAJAAIAACKQAXgZANgHQAMgIAOAAQAQAAALAJQAMAJAFATQAFAMAAAjIAABCQAAASADAHQABAFAGACQAEADAOAAIAAAIg");
	this.shape_110.setTransform(244.25,73.425);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("Ag3BJQgXgbAAgtQAAgsAbgbQAZgcAlAAQAbgBASAPQASAPAAAQQAAAHgFAFQgFAFgJAAQgMAAgHgHQgDgFgBgMQgBgMgHgGQgIgGgMgBQgUAAgNAPQgQAUAAAiQAAAgAQAaQARAaAbAAQAUAAAQgOQALgKALgYIAGACQgHAmgWAUQgXAUgbAAQgegBgZgag");
	this.shape_111.setTransform(224.45,78.6);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("Ag2BJQgZgaABgtQAAguAZgbQAYgbAkAAQAgAAAUAUQAUAVAAAjIiBAAQAAApAVAYQAUAXAbAAQASABAOgLQAOgKAJgZIAGAFQgEAbgUAYQgVAXgfAAQghAAgYgbgAghhGQgOANgDAXIBXAAQgCgSgDgIQgFgLgKgHQgKgGgKAAQgRAAgNAOg");
	this.shape_112.setTransform(187.3,78.6);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AhDBhIAAgIQAOAAAIgEQAFgDACgIQABgDAAgQIAAhIQAAghgBgGQgCgHgEgCQgDgDgGAAQgGAAgIADIgCgIIA5gXIAJAAIAAArQAWgrAZAAQALAAAIAHQAHAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgEAAQgEAAgEAEQgKAJgIATIAABZQAAAPADAIQACAGAHAEQAGADANAAIAAAIg");
	this.shape_113.setTransform(171.05,78.325);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAFgGAKAAQAHAAALAFIALADQAGAAAIgGQAGgHAIgSIANghIhDiMQgDgHgHgJQgFgHgEgDQgEgDgKgDIAAgHIBXAAIAAAHIgFAAQgJAAgEAFQgEADAAAGQAAAIAGAPIAtBeIAqhnQADgJABgIQgBgEgBgCIgGgDQgDgCgIAAIAAgHIA9AAIAAAHQgIABgEADQgFACgEAHIgHAQIhMC6QgLAcgRANQgTAOgQAAQgMAAgIgHg");
	this.shape_114.setTransform(142.8,83.125);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAiCVIAAgbQgOAOgNAGQgNAHgPAAQgfgBgWgZQgYgZAAgpQABgpAZggQAZghAoAAQAYAAARAPIAAgiQgBghgBgHQgCgIgDgCQgEgDgEAAQgGAAgIADIgDgHIA4gWIAJAAIAADXQAAAhACAIQABAHADADQAEADAEAAQAGAAAKgDIABAGIg3AYgAgqgVQgSAVAAApQAAApASAWQASAWAWAAQASAAASgTIAAhgQgCgNgGgLQgGgMgLgGQgJgGgJAAQgSAAgPAQg");
	this.shape_115.setTransform(122.55,73.7);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAnBhIAAgoQgYAagNAHQgMAHgOAAQgPAAgMgJQgMgJgEgPQgFgOAAgaIAAhTQAAgNgCgGQgDgFgGgCQgGgDgOAAIAAgIIBBAAIAAB9QAAAaAKAJQAJAIAMAAQAIAAAMgGQAKgFAQgQIAAhpQAAgQgGgGQgFgGgTAAIAAgIIBAAAIAABxQAAAhABAHQACAHADADQADADAFAAQAHAAAHgDIAEAHIg5AXg");
	this.shape_116.setTransform(205.8,30.325);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AhUCEQgIgHAAgJQAAgIAGgFQAGgGAJAAQAHAAAMAFIAKADQAGAAAHgGQAIgHAHgSIANghIhDiMQgDgHgHgJQgFgHgDgDQgFgDgLgDIAAgHIBYAAIAAAHIgFAAQgIAAgFAFQgFADAAAGQAAAIAHAPIAtBeIAqhnQAEgJgBgIQABgEgCgCIgGgDQgDgCgJAAIAAgHIA+AAIAAAHQgIABgEADQgFACgEAHIgHAQIhMC6QgKAcgTANQgRAOgRAAQgNAAgHgHg");
	this.shape_117.setTransform(163.8,34.575);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AAiCUIAAgaQgOAOgNAHQgMAFgQAAQgeAAgYgZQgWgaAAgoQgBgpAaggQAZgiApAAQAXAAARAQIAAgjQAAgfgCgIQgCgHgDgDQgDgDgFAAQgFAAgKAEIgCgIIA4gXIAJAAIAADZQAAAgACAIQABAHADADQAEADAFAAQAFAAAKgEIACAIIg4AWgAgqgUQgSAUAAAoQAAAqASAWQASAWAWAAQASAAASgSIAAhiQgCgMgGgMQgGgLgKgGQgKgGgJAAQgSAAgPARg");
	this.shape_118.setTransform(133.05,25.15);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgfCPQgRgGgRgMIAAjCQAAgfgCgIQgCgHgDgDQgDgDgFAAQgGAAgIAEIgDgIIA4gXIAJAAIAACJQAcgnAeAAQAdAAAWAZQAVAZAAAqQAAAyghAfQgdAZgjAAQgPABgRgGgAgLgPQgIAFgNAKIAABxQALALALAEQAKAGAMAAQATAAAQgUQAQgVAAgnQAAgkgQgTQgQgTgVAAQgKAAgLAFg");
	this.shape_119.setTransform(91.875,25.15);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArAAAaAhQAWAbAAAkQAAAZgMAaQgNAagVANQgVAMgZAAQgqABgZgigAgbhOQgLAGgHAQQgGARAAAZQAAAnAQAfQAQAdAaAAQAUAAANgQQANgRAAgnQAAgygWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_120.setTransform(40.125,30.05);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FF0000").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAGgHAJAAQAJAAAHAHQAHAHAAAIQAAAKgHAGQgHAHgJAAQgJAAgGgHg");
	this.shape_121.setTransform(219.2,86.275);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FF0000").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAHgHAIAAQAKAAAGAHQAHAHAAAIQAAAKgHAGQgGAHgKAAQgIAAgHgHg");
	this.shape_122.setTransform(208.7,86.275);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FF0000").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAHgHAIAAQAKAAAGAHQAHAHAAAIQAAAKgHAGQgGAHgKAAQgIAAgHgHg");
	this.shape_123.setTransform(198.2,86.275);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FF0000").s().p("AAKCSIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhCQAAgfgCgJQgEgJgHgFQgHgFgJAAQgLAAgJAGQgLAFgPAPIAABjQAAAUACAEQABAFAHADQAFADAPAAIAAAIIhdAAIAAgIQAMAAAHgEQAFgCACgFQACgGAAgSIAAipQAAgggBgHQgCgIgDgCQgDgDgGAAQgEAAgJADIgEgHIA5gXIAKAAIAACKQAWgZANgHQANgIANAAQAQAAAMAJQALAJAGATQADAMAAAjIAABCQAAASADAHQACAFAFACQAFADANAAIAAAIg");
	this.shape_124.setTransform(182.45,73.425);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FF0000").s().p("Ag2BJQgYgbAAgtQAAgsAbgbQAZgcAlAAQAbgBASAPQASAPAAAQQAAAHgFAFQgFAFgJAAQgNAAgFgHQgEgFgBgMQgBgMgIgGQgGgGgOgBQgTAAgNAPQgQAUAAAiQAAAgAQAaQARAaAbAAQAUAAAQgOQAMgKAKgYIAGACQgIAmgWAUQgVAUgbAAQgggBgXgag");
	this.shape_125.setTransform(162.65,78.6);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FF0000").s().p("AAnBhIAAgoQgYAagNAHQgMAHgOAAQgPAAgMgJQgMgJgEgPQgFgOAAgaIAAhTQAAgNgCgGQgDgFgGgCQgGgDgOAAIAAgIIBBAAIAAB9QAAAaAKAJQAJAIAMAAQAIAAAMgGQAKgFAQgQIAAhpQAAgQgGgGQgFgGgTAAIAAgIIBAAAIAABxQAAAhABAHQACAHADADQADADAFAAQAHAAAHgDIAEAHIg5AXg");
	this.shape_126.setTransform(142.8,78.875);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FF0000").s().p("ABEBhIAAgIIAEAAQAMAAAHgEQAEgEACgHQABgDAAgRIAAhQQAAgWgFgKQgIgNgSAAQgLAAgLAGQgLAFgPAPIgBACIABAJIAABYQAAAUACAEQACAFAGADQAGADAOAAIAAAIIheAAIAAgIQAQAAAGgDQAGgEACgHQABgEAAgRIAAhQQAAgWgHgLQgJgNgQAAQgLAAgLAGQgRAJgJAMIAABjQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIQANAAAFgCQAFgDADgGQADgGAAgSIAAhGQAAgfgCgJQgBgHgEgDQgDgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoIAYgXQAJgIALgEQAKgFALAAQASAAALALQANAKAEATQAVgYAPgIQAOgIAQAAQAPAAAMAIQALAIAHARQAEAMAAAZIAABQQAAASADAGQACAFAGADQAFADANAAIAAAIg");
	this.shape_127.setTransform(116.075,78.325);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FF0000").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArAAAaAhQAWAbAAAkQAAAZgMAaQgNAagVANQgVAMgZAAQgqABgZgigAgbhOQgLAGgHAQQgGARAAAZQAAAnAQAfQAQAdAaAAQAUAAANgQQANgRAAgnQAAgygWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_128.setTransform(271.725,30.05);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FF0000").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArAAAaAhQAWAbAAAkQAAAZgMAaQgNAagVANQgVAMgZAAQgqABgZgigAgbhOQgLAGgHAQQgGARAAAZQAAAnAQAfQAQAdAaAAQAUAAANgQQANgRAAgnQAAgygWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_129.setTransform(250.725,30.05);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FF0000").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_130.setTransform(234.675,27.125);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FF0000").s().p("AAzBhIgvh3Ig1B3IgIAAIg9idQgGgPgFgFQgGgFgMgDIAAgIIBPAAIAAAIQgMABgDADQgDADAAAGQAAAGADAJIApBrIAohXIgLgcQgEgMgJgFQgEgCgMgBIAAgIIBYAAIAAAIQgPABgGAEQgEAEAAAHIACAIIAqBrIAohnQAEgLAAgHQAAgDgEgEQgEgDgMAAIAAgIIA8AAIAAAIQgSADgJAVIg+Chg");
	this.shape_131.setTransform(202.85,30.325);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FF0000").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArAAAaAhQAWAbAAAkQAAAZgMAaQgNAagVANQgVAMgZAAQgqABgZgigAgbhOQgLAGgHAQQgGARAAAZQAAAnAQAfQAQAdAaAAQAUAAANgQQANgRAAgnQAAgygWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_132.setTransform(177.225,30.05);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FF0000").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_133.setTransform(156.275,29.775);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FF0000").s().p("AANCSIAAgIQAIAAADgCQADgCAAgEQgBgFgHgKIg6hKIAAA/QAAASAEAFQACAGAEADQAGACAPAAIAAAIIhgAAIAAgIQAPAAAHgDQAEgCACgFQADgHAAgQIAAirQAAgggBgHQgBgIgDgCQgEgDgFAAQgEAAgJADIgEgHIA4gXIAJAAIAAC6IAwgrQAPgNACgEQACgDAAgCQAAgEgEgDQgDgDgIgBIAAgGIBSAAIAAAGQgRABgLAFQgMAEgNAMIgvAsIAvA9QAVAZAGAHQAKAJAHADQAGACAMAAIAAAIg");
	this.shape_134.setTransform(135.55,24.875);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FF0000").s().p("AAnBhIAAgoQgYAagNAHQgMAHgOAAQgPAAgMgJQgMgJgEgPQgFgOAAgaIAAhTQAAgNgCgGQgDgFgGgCQgGgDgOAAIAAgIIBBAAIAAB9QAAAaAJAJQAJAIANAAQAIAAAMgGQAKgFAQgQIAAhpQAAgQgGgGQgGgGgSAAIAAgIIBAAAIAABxQAAAhACAHQABAHADADQADADAFAAQAHAAAIgDIADAHIg5AXg");
	this.shape_135.setTransform(103.75,30.325);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FF0000").s().p("AhEBCQgWgcAAgkQAAgZANgZQANgaAVgMQAVgNAWAAQArAAAaAhQAWAbAAAkQAAAZgMAaQgNAagVANQgVAMgZAAQgqABgZgigAgbhOQgLAGgHAQQgGARAAAZQAAAnAQAfQAQAdAaAAQAUAAANgQQANgRAAgnQAAgygWgdQgPgTgVAAQgLAAgLAHg");
	this.shape_136.setTransform(82.725,30.05);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FF0000").s().p("Ag6CLIAAgHIAKAAQARAAAIgLQAEgHAAgXIAAhCIhMh0QgOgUgEgFQgGgGgPgHQgEgBgIAAIAAgIIB3AAIAAAIIgGAAQgKgBgHAFQgIAEAAAKQAAAHAMATIA5BZIA3hVQAMgTAAgKQAAgFgDgFQgDgEgFgDQgGgDgLABIAAgIIBhAAIAAAIIgGAAQgFgBgLAFQgKAFgIAJQgIAJgMAUIhEBoIAABGQAAAZAGAHQAIAIARABIAJAAIAAAHg");
	this.shape_137.setTransform(56.95,25.55);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FF0000").s().p("AAzBhIgvh3Ig2B3IgHAAIg8idQgHgPgFgFQgGgFgMgDIAAgIIBOAAIAAAIQgKABgDADQgEADAAAGQAAAGAEAJIAnBrIAphXIgLgcQgEgMgJgFQgEgCgNgBIAAgIIBZAAIAAAIQgPABgGAEQgEAEAAAHIACAIIAqBrIAohnQAEgLAAgHQAAgDgEgEQgEgDgMAAIAAgIIA8AAIAAAIQgTADgIAVIg+Chg");
	this.shape_138.setTransform(200.75,30.325);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FF0000").s().p("AANCSIAAgIQAIAAADgCQADgCgBgEQABgFgJgKIg4hKIAAA/QAAASACAFQADAGAFADQAEACAQAAIAAAIIhfAAIAAgIQAOAAAHgDQAFgCACgFQACgHAAgQIAAirQABgggCgHQgBgIgEgCQgDgDgFAAQgFAAgIADIgDgHIA4gXIAJAAIAAC6IAugrQAPgNADgEQACgDAAgCQAAgEgEgDQgDgDgIgBIAAgGIBSAAIAAAGQgRABgLAFQgMAEgNAMIgvAsIAvA9QAUAZAHAHQAKAJAIADQAEACAOAAIAAAIg");
	this.shape_139.setTransform(133.45,24.875);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FF0000").s().p("AAnBhIAAgoQgYAagNAHQgLAHgPAAQgPAAgMgJQgMgJgFgPQgEgOAAgaIAAhTQAAgNgCgGQgDgFgGgCQgGgDgPAAIAAgIIBCAAIAAB9QAAAaAKAJQAIAIANAAQAIAAALgGQAMgFAPgQIAAhpQAAgQgGgGQgFgGgTAAIAAgIIBAAAIAABxQAAAhABAHQACAHAEADQADADAEAAQAHAAAHgDIAEAHIg5AXg");
	this.shape_140.setTransform(101.65,30.325);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FF0000").s().p("Ag7CLIAAgHIAKAAQASAAAIgLQAEgHAAgXIAAhCIhMh0QgOgUgEgFQgFgGgPgHQgFgBgIAAIAAgIIB4AAIAAAIIgHAAQgKgBgHAFQgJAEAAAKQABAHAMATIA5BZIA3hVQAMgTAAgKQAAgFgDgFQgDgEgGgDQgFgDgMABIAAgIIBiAAIAAAIIgGAAQgFgBgKAFQgKAFgJAJQgJAJgMAUIhCBoIAABGQgBAZAGAHQAIAIAQABIAJAAIAAAHg");
	this.shape_141.setTransform(59.05,25.55);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49,this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84,this.shape_85,this.shape_86,this.shape_87,this.shape_88,this.shape_89,this.shape_90,this.shape_91,this.shape_92,this.shape_93,this.shape_94,this.shape_95,this.shape_96,this.shape_97,this.shape_98,this.shape_99,this.shape_100,this.shape_101,this.shape_102,this.shape_103,this.shape_104,this.shape_105,this.shape_106,this.shape_107,this.shape_108,this.shape_109,this.shape_110,this.shape_111,this.shape_112,this.shape_113,this.shape_114,this.shape_115,this.shape_116,this.shape_117,this.shape_118,this.shape_119,this.shape_120,this.shape_121,this.shape_122,this.shape_123,this.shape_124,this.shape_125,this.shape_126,this.shape_127,this.shape_128,this.shape_129,this.shape_130,this.shape_131,this.shape_132,this.shape_133,this.shape_134,this.shape_135,this.shape_136,this.shape_137,this.shape_138,this.shape_139,this.shape_140,this.shape_141];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{x:162.05,y:37.725}},{t:this.shape,p:{x:172.55,y:37.725}}]}).to({state:[{t:this.shape_18},{t:this.shape_17,p:{x:58.825}},{t:this.shape_16},{t:this.shape_15,p:{x:117.275,y:29.775}},{t:this.shape_14,p:{x:143.525,y:29.975}},{t:this.shape_13},{t:this.shape_12,p:{x:182.65}},{t:this.shape_11},{t:this.shape_10,p:{x:220.025,y:27.125}},{t:this.shape_9,p:{x:242.175,y:27.125}},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{x:158.675,y:78.525}},{t:this.shape_3},{t:this.shape,p:{x:184.25,y:86.275}}]},74).to({state:[{t:this.shape_22,p:{x:126.5,y:24.875}},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{x:192.4,y:37.725}},{t:this.shape,p:{x:202.9,y:37.725}}]},75).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_14,p:{x:105.325,y:29.975}},{t:this.shape_10,p:{x:120.025,y:27.125}},{t:this.shape_36},{t:this.shape_35},{t:this.shape_15,p:{x:176.425,y:29.775}},{t:this.shape_34,p:{x:203.125}},{t:this.shape_33},{t:this.shape_32},{t:this.shape_9,p:{x:262.875,y:27.125}},{t:this.shape_17,p:{x:278.925}},{t:this.shape_4,p:{x:57.225,y:78.525}},{t:this.shape_31},{t:this.shape_22,p:{x:95,y:73.425}},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28,p:{x:146.275,y:78.875}},{t:this.shape_27,p:{x:166.3}},{t:this.shape_26,p:{x:196.475,y:78.325}},{t:this.shape_25},{t:this.shape_24,p:{x:243.05,y:78.875}},{t:this.shape_23}]},75).to({state:[{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_34,p:{x:160.875}},{t:this.shape_94,p:{x:177.425,y:24.875}},{t:this.shape_93},{t:this.shape_24,p:{x:227.3,y:30.325}},{t:this.shape_17,p:{x:253.025}},{t:this.shape_92},{t:this.shape_91,p:{x:283.575,y:24.875}},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88,p:{x:61.275,y:78.525}},{t:this.shape_87},{t:this.shape_86,p:{x:106.775,y:78.525}},{t:this.shape_85},{t:this.shape_84,p:{x:151.75}},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72,p:{x:122.525,y:127.075}},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68,p:{x:204.625}},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59,p:{x:120.225,y:175.625}},{t:this.shape_58,p:{x:139.325,y:175.975}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_14,p:{x:297.475,y:175.625}},{t:this.shape_50},{t:this.shape_49},{t:this.shape_28,p:{x:46.575,y:224.525}},{t:this.shape_48},{t:this.shape_47,p:{x:83,y:223.975}},{t:this.shape_46},{t:this.shape_10,p:{x:116.825,y:221.325}},{t:this.shape_45,p:{x:132.9,y:219.075}},{t:this.shape_44},{t:this.shape_26,p:{x:165.575,y:223.975}},{t:this.shape_43},{t:this.shape_4,p:{x:217.575,y:224.175}},{t:this.shape_42},{t:this.shape_15,p:{x:269.475,y:223.975}},{t:this.shape_41},{t:this.shape_9,p:{x:137.425,y:269.875}},{t:this.shape_40},{t:this.shape_39},{t:this.shape,p:{x:187.5,y:280.475}}]},75).to({state:[{t:this.shape_10,p:{x:24.075,y:27.125}},{t:this.shape_120},{t:this.shape_34,p:{x:61.125}},{t:this.shape_119},{t:this.shape_88,p:{x:113.175,y:29.975}},{t:this.shape_118},{t:this.shape_117},{t:this.shape_17,p:{x:184.775}},{t:this.shape_116},{t:this.shape_45,p:{x:237.3,y:24.875}},{t:this.shape_86,p:{x:257.825,y:29.975}},{t:this.shape_58,p:{x:276.925,y:30.325}},{t:this.shape_12,p:{x:296.95}},{t:this.shape_72,p:{x:39.725,y:78.525}},{t:this.shape_94,p:{x:54.375,y:73.425}},{t:this.shape_47,p:{x:67.25,y:78.325}},{t:this.shape_27,p:{x:83.5}},{t:this.shape_59,p:{x:102.675,y:78.525}},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_14,p:{x:206.475,y:78.525}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_84,p:{x:264.25}},{t:this.shape_109},{t:this.shape_9,p:{x:22.925,y:124.225}},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_26,p:{x:107.825,y:126.875}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_68,p:{x:187.125}},{t:this.shape_91,p:{x:214.175,y:121.975}},{t:this.shape_102},{t:this.shape_4,p:{x:248.475,y:127.075}},{t:this.shape_28,p:{x:267.575,y:127.425}},{t:this.shape_101},{t:this.shape_1,p:{x:302,y:134.825}}]},75).to({state:[{t:this.shape_137},{t:this.shape_136,p:{x:82.725}},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133,p:{x:156.275}},{t:this.shape_132,p:{x:177.225}},{t:this.shape_131},{t:this.shape_130,p:{x:234.675}},{t:this.shape_129,p:{x:250.725}},{t:this.shape_128,p:{x:271.725}},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121}]},75).to({state:[{t:this.shape_141},{t:this.shape_136,p:{x:80.625}},{t:this.shape_140},{t:this.shape_139},{t:this.shape_133,p:{x:154.175}},{t:this.shape_132,p:{x:175.125}},{t:this.shape_138},{t:this.shape_130,p:{x:232.575}},{t:this.shape_129,p:{x:248.625}},{t:this.shape_128,p:{x:269.625}},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121}]},151).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,324.2,293.3);


(lib.end_screentext = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAzDjIAAgpQgVAVgUAKQgTAKgYAAQguAAgjgoQgjgnAAg9QAAg+AngyQAngzA8AAQAlAAAZAYIAAg1QAAgxgCgLQgDgMgFgEQgFgEgIAAQgHAAgOAFIgEgLIBVgjIAPAAIAAFKQAAAzACALQACALAGAEQAFAFAGAAQAIAAAOgGIAEALIhVAkgAhAggQgcAgAAA+QAAA/AcAiQAbAhAiAAQAbAAAbgcIAAiUQgCgUgJgSQgKgRgPgJQgPgJgPAAQgbAAgWAZg");
	this.shape.setTransform(330.9,37.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAPCTIAAgLIAGAAQAUAAAIgGQAIgGADgMQACgFgBgYIAAh1QABgngLgRQgKgSgYAAQgkAAglApIAACWQAAAdADAHQAFAJAIAEQAHAEAXAAIAAALIiNAAIAAgLIAGAAQAWAAAIgLQAIgLgBgfIAAhqQAAgzgCgLQgDgMgEgEQgFgEgIAAQgJAAgMAFIgFgLIBXgjIANAAIAAA8QAyg8AtAAQAXAAARALQARAMAKAbQAHATAAAmIAAB6QAAAbAEAJQAEAIAIAFQAHAEAVAAIAAALg");
	this.shape_1.setTransform(297.8,44.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ai1DUIAAgMIAPAAQAPAAAOgHQAKgFAEgKQADgKAAgfIAAkSQAAgpgIgJQgLgMgbAAIgPAAIAAgMIFGAAIAFBdIgNAAQgGgigIgMQgIgNgQgGQgMgFggAAIhzAAIAACoIBcAAQAkAAANgLQAQgPACgkIALAAIAACTIgLAAQgFgfgEgJQgGgLgMgGQgNgHgbAAIhcAAIAACMQAAAcADAHQACAFAGAEQAHAEARAAIBHAAQAkAAAQgFQAQgFAPgPQAUgTAUgnIANAAIglBqg");
	this.shape_2.setTransform(262.125,37.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhTBwQglgoAAhFQAAhIAlgpQAmgpA4AAQAwAAAfAgQAfAfAAA2IjFAAQAAA/AfAkQAfAkApAAQAdAAAVgQQAUgPAPgmIAJAGQgHAsgfAjQgfAjgwAAQgzAAgkgogAg0hsQgUATgEAlICEAAQgCgcgFgMQgHgRgQgKQgPgKgQAAQgaAAgVAVg");
	this.shape_3.setTransform(212.75,44.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAPDeIAAgLIAHAAQAUAAAHgGQAJgGACgMQABgFAAgYIAAhmQABgvgFgNQgFgPgLgHQgLgIgPAAQgPAAgPAJQgRAIgXAXIAACYQAAAdAEAHQACAHAJAFQAKAFAVAAIAAALIiNAAIAAgLQASAAALgGQAGgDAEgJQAEgJAAgaIAAkCQAAgygCgLQgDgLgEgEQgFgEgJAAQgGAAgOAFIgFgLIBWgjIAOAAIAADRQAjgmAUgKQATgLAVAAQAYAAASANQARANAIAdQAHATgBA1IAABmQABAbAEAKQADAHAIAFQAHAEAUAAIAAALg");
	this.shape_4.setTransform(182.25,36.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhaDUIAAgMIAPAAQAbAAALgQQAHgKAAgkIAAlCIgzAAQgeAAgMAEQgRAGgLARQgMARgCAcIgMAAIAFhjIFZAAIAFBjIgMAAQgEgagFgLQgKgSgQgJQgQgIgbAAIg7AAIAAFCQAAAnAIAKQAMANAZAAIAOAAIAAAMg");
	this.shape_5.setTransform(146.875,37.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.end_screentext, new cjs.Rectangle(0,0,473,74.9), null);


(lib.dialogue_box = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgiA1QgIgFgCgIQgCgIAAgSIAAgzIgRAAIAAgUIAnAAIAABEIABARQAAAFAEACQADADAFAAQAPAAASgOIAAg9IgVAAIAAgUIAqAAIAABdIAUAAIAAAUIgpAAIAAgNQgUAPgRAAQgMAAgHgFg");
	this.shape.setTransform(131.65,22.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgpArQgSgRAAgaQAAgZASgRQARgRAYAAQAZAAARAQQASARAAAaQAAAbgSAQQgRARgZAAQgYAAgRgRgAgZgbQgKALAAAQQAAARAKAKQALALAOAAQAPAAALgLQAKgKAAgRQAAgQgKgLQgLgKgPAAQgPgBgKALg");
	this.shape_1.setTransform(111.825,22.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AggBRIAAgUIAVAAIAAg2IgwhDIgUAAIAAgVIBDAAIAAAVIgUAAIAjAyIAhgyIgVAAIAAgVIBBAAIAAAVIgWAAIgtBDIAAA2IAXAAIAAAUg");
	this.shape_2.setTransform(94.15,20.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(4,1,1).p("An8ibIP5AAQBBAAAtAtQAuAuAABAIAACcI0xAAIAAicQAAhAAuguQAtgtBBAAg");
	this.shape_3.setTransform(117.45,20.6809,1,1.3239);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,255,255,0.247)").s().p("AqYCcIAAicQAAg/AtgvQAvgtBAAAIP5AAQBBAAAtAtQAuAvAAA/IAACcg");
	this.shape_4.setTransform(117.45,20.6809,1,1.3239);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(4,1,1).p("EgtMgN+MBaZAAAQCmAAB1B1QB1B1AACmIAAPdQAACmh1B1Qh1B1imAAMhaZAAAQimAAh1h1Qh1h1AAimIAAvdQAAimB1h1QB1h1CmAAg");
	this.shape_5.setTransform(329.325,131.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,255,255,0.247)").s().p("EgtMAN/QimAAh1h1Qh1h1AAimIAAvdQAAimB1h1QB1h1CmAAMBaZAAAQCmAAB1B1QB1B1AACmIAAPdQAACmh1B1Qh1B1imAAg");
	this.shape_6.setTransform(329.325,131.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dialogue_box, new cjs.Rectangle(-2,-2,662.7,225), null);


(lib.Description = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgNBLQgFgGAAgIQAAgIAFgGQAGgFAHAAQAIAAAGAFQAFAGAAAIQAAAIgFAGQgGAFgIAAQgHAAgGgFgAgQAgIAAhvIAhAAIAABvg");
	this.shape.setTransform(509.625,365.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAKBTIgYg1IgBAAIAAA1IgiAAIAAilIAiAAIAABfIABAAIAWglIApAAIgjAvIAkA8g");
	this.shape_1.setTransform(500.775,364.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AglAqQgJgQAAgaQAAgaAJgPQAKgPAPAAQAIgBAFAFQAFAEAGAJIABAAIAAgOIAiAAIAABrIgiAAIAAgOIgBAAQgGAJgFAEQgFAEgIABQgQgBgJgPgAgMAAQAAAbAMAAQANAAAAgbQAAgbgNAAQgMAAAAAbg");
	this.shape_2.setTransform(488.525,367.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgfAqQgMgQAAgaQAAgZAMgQQAMgPATAAQALAAALAHQALAIAFAMQAFAMABAZIg4AAQABAZAMAAQAEAAADgEQAEgDAAgFIAdAAQgIAlghAAQgTgBgMgPgAgIgaQgDAFAAAMIAXAAQAAgMgDgFQgDgGgGABQgFgBgDAGg");
	this.shape_3.setTransform(478.075,367.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgfA4IAAhrIAgAAIAAASIAAAAQAMgWAOAAIAFABIAAAhIgMgBQgSAAAAAYIAAA2g");
	this.shape_4.setTransform(469.2,367.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgMBDIAAAAIAAAOIgiAAIAAikIAiAAIAABGIAAAAQAHgJAFgEQAEgEAJAAQAPAAAJAPQAKAPAAAbQAAAagKAQQgJAPgPAAQgOAAgLgRgAgMAZQAAAPAEAHQACAHAHAAQAMAAAAgcQAAgagNAAQgMAAAAAZg");
	this.shape_5.setTransform(459.3,364.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgQBTIAAilIAhAAIAAClg");
	this.shape_6.setTransform(444.3,364.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgQBTIAAilIAhAAIAAClg");
	this.shape_7.setTransform(438.1,364.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgLAfIgGggIAAgcIAjAAIAAAcIgGAgg");
	this.shape_8.setTransform(432.2,359.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgRBEIAAhOIgMAAIAAgdIAMAAIAAgcIAiAAIAAAcIANAAIAAAdIgOAAIAABOg");
	this.shape_9.setTransform(425.85,365.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgQBPIAAhrIAhAAIAABrgAgMgwQgFgFAAgHQAAgHAFgGQAFgFAHAAQAHAAAGAFQAFAGAAAHQAAAHgFAFQgGAGgHAAQgHAAgFgGg");
	this.shape_10.setTransform(419.3,364.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgfAqQgMgQAAgaQAAgZAMgQQAMgPATAAQALAAALAHQALAIAFAMQAFAMABAZIg4AAQABAZAMAAQAEAAADgEQAEgDAAgFIAdAAQgIAlghAAQgTgBgMgPgAgIgaQgDAFAAAMIAXAAQAAgMgDgFQgDgGgGABQgFgBgDAGg");
	this.shape_11.setTransform(405.225,367.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgoAsIAMgZQARALAIgBQADAAADgCQADgCAAgDQAAgDgDgCIgQgIQgMgGgGgFQgFgIAAgLQAAgPALgKQAKgLAQABQAQgBAYANIgOAZQgPgKgJAAQgIAAAAAHQAAADADADIAKAFQAQAGAHAGQAHAHAAAMQAAAQgLALQgLALgQAAQgTAAgVgOg");
	this.shape_12.setTransform(395.525,367.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgQBPIAAhrIAhAAIAABrgAgMgwQgFgFAAgHQAAgHAFgGQAFgFAHAAQAHAAAGAFQAFAGAAAHQAAAHgFAFQgGAGgHAAQgHAAgFgGg");
	this.shape_13.setTransform(387.8,364.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAPA2QgNgxgCgIIAAAAQAAAHgOAyIgZAAIghhrIAhAAIANA8IABAAIALg8IAdAAIALA7IAEgRIAKgqIAhAAIghBrg");
	this.shape_14.setTransform(377.15,367.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgfA4IAAhrIAgAAIAAASIAAAAQAMgWANAAIAGABIAAAhIgLgBQgTAAAAAYIAAA2g");
	this.shape_15.setTransform(365.85,367.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgfAqQgMgQAAgaQAAgZAMgQQAMgPATAAQALAAALAHQALAIAFAMQAFAMABAZIg4AAQABAZAMAAQAEAAADgEQAEgDAAgFIAdAAQgIAlghAAQgTgBgMgPgAgIgaQgDAFAAAMIAXAAQAAgMgDgFQgDgGgGABQgFgBgDAGg");
	this.shape_16.setTransform(356.275,367.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAKBTIAAhCQAAgHgDgDQgCgDgFAAQgJgBAAAOIAABCIgiAAIAAilIAiAAIAABHIAAAAQAMgRAQAAQAMAAAHAIQAGAHAAAOIAABSg");
	this.shape_17.setTransform(345.525,364.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgQBEIAAhOIgNAAIAAgdIANAAIAAgcIAhAAIAAAcIANAAIAAAdIgNAAIAABOg");
	this.shape_18.setTransform(336.35,365.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgiArQgMgQAAgaQAAgbAMgPQAMgQAWAAQAXAAAMAQQAMAPAAAbQAAAbgNAPQgMAPgWAAQgVAAgNgPgAgJgUQgDAFAAAPQAAAbAMAAQAGAAAEgGQADgGAAgPQAAgOgDgGQgEgGgGAAQgGAAgDAGg");
	this.shape_19.setTransform(327.475,367.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAKBTIgYg1IgBAAIAAA1IgiAAIAAilIAiAAIAABfIABAAIAWglIApAAIgjAvIAkA8g");
	this.shape_20.setTransform(310.925,364.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgUAqQgLgQAAgaQAAgZALgPQALgRARABQAMAAAMAIIAAAcQgGgEgGAAQgIAAgFAHQgFAGAAALQAAALAFAHQAFAGAIABQAFgBAHgDIAAAcQgMAJgMAAQgRAAgLgQg");
	this.shape_21.setTransform(300.725,367.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgQBPIAAhrIAhAAIAABrgAgMgwQgFgFAAgHQAAgHAFgGQAGgFAGAAQAIAAAEAFQAGAGAAAHQAAAHgGAFQgEAGgIAAQgGAAgGgGg");
	this.shape_22.setTransform(293.7,364.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgQBTIAAilIAhAAIAAClg");
	this.shape_23.setTransform(287.5,364.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgUAqQgLgQAAgaQAAgZALgPQALgRARABQAMAAAMAIIAAAcQgGgEgGAAQgIAAgFAHQgFAGAAALQAAALAFAHQAFAGAIABQAFgBAHgDIAAAcQgMAJgMAAQgRAAgLgQg");
	this.shape_24.setTransform(280.475,367.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAlA4IAAg/QAAgPgKAAQgKAAAAAPIAAA/IghAAIAAhBQAAgGgDgEQgDgDgEAAQgFAAgCADQgDAEAAAGIAABBIgiAAIAAhrIAiAAIAAANQAOgRAPAAQARAAAGATQAIgKAHgEQAHgFAJAAQAYAAAAAhIAABOg");
	this.shape_25.setTransform(262.325,367.175);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AglAqQgJgQAAgaQAAgaAJgPQAKgPAPAAQAIgBAFAFQAFAEAGAJIABAAIAAgOIAiAAIAABrIgiAAIAAgOIgBAAQgGAJgFAEQgFAEgIABQgQgBgJgPgAgMAAQAAAbAMAAQANAAAAgbQAAgbgNAAQgMAAAAAbg");
	this.shape_26.setTransform(247.925,367.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AguBOIAAiYIAiAAIAAAOIABAAQALgRANAAQAPAAAKAQQAJAQAAAaQAAAZgKAPQgJAQgPAAQgPAAgJgSIgBAAIAAA7gAgMgUQAAAbAMAAQANAAAAgbQAAgbgNAAQgMAAAAAbg");
	this.shape_27.setTransform(237.1,369.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgoAsIAMgZQARALAIgBQADAAADgCQADgCAAgDQAAgDgDgCIgQgIQgMgGgGgFQgFgIAAgLQAAgPALgKQAKgLAQABQAQgBAYANIgOAZQgPgKgJAAQgIAAAAAHQAAADADADIAKAFQAQAGAHAGQAHAHAAAMQAAAQgLALQgLALgQAAQgTAAgVgOg");
	this.shape_28.setTransform(226.525,367.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgRBEIAAhOIgMAAIAAgdIAMAAIAAgcIAiAAIAAAcIANAAIAAAdIgOAAIAABOg");
	this.shape_29.setTransform(212.55,365.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgiArQgMgQAAgaQAAgbAMgPQAMgQAWAAQAXAAAMAQQAMAPAAAbQAAAbgNAPQgMAPgWAAQgVAAgNgPgAgJgUQgDAFAAAPQAAAbAMAAQAGAAAEgGQADgGAAgPQAAgOgDgGQgEgGgGAAQgGAAgDAGg");
	this.shape_30.setTransform(203.675,367.375);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAKA4IAAhCQAAgFgDgEQgCgDgEAAQgKAAAAANIAABBIgiAAIAAhrIAiAAIAAAPIAAAAQALgTASAAQALAAAGAIQAHAHAAANIAABTg");
	this.shape_31.setTransform(192.625,367.175);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgiArQgMgQAAgaQAAgbAMgPQAMgQAWAAQAXAAAMAQQAMAPAAAbQAAAbgNAPQgMAPgWAAQgVAAgNgPgAgJgUQgDAFAAAPQAAAbAMAAQAGAAAEgGQADgGAAgPQAAgOgDgGQgEgGgGAAQgGAAgDAGg");
	this.shape_32.setTransform(175.575,367.375);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AglBFQgJgQAAgaQAAgaAKgPQAJgQAPAAQANAAAMAQIAAhFIAiAAIAACkIgiAAIAAgOIgBAAQgLARgNAAQgPAAgKgPgAgMAcQAAAMADAHQAEAHAFAAQAGAAAEgHQADgIAAgNQAAgagNAAQgMAAAAAcg");
	this.shape_33.setTransform(164.175,364.675);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgaAiIAVhDIAgAAIgeBDg");
	this.shape_34.setTransform(149.65,372.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgiArQgMgQAAgaQAAgbAMgPQAMgQAWAAQAXAAAMAQQAMAPAAAbQAAAbgNAPQgMAPgWAAQgVAAgNgPgAgJgUQgDAFAAAPQAAAbAMAAQAGAAAEgGQADgGAAgPQAAgOgDgGQgEgGgGAAQgGAAgDAGg");
	this.shape_35.setTransform(140.975,367.375);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgoAsIAMgZQARALAIgBQADAAADgCQADgCAAgDQAAgDgDgCIgQgIQgMgGgGgFQgFgIAAgLQAAgPALgKQAKgLAQABQAQgBAYANIgOAZQgPgKgJAAQgIAAAAAHQAAADADADIAKAFQAQAGAHAGQAHAHAAAMQAAAQgLALQgLALgQAAQgTAAgVgOg");
	this.shape_36.setTransform(130.975,367.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgQBTIAAilIAhAAIAAClg");
	this.shape_37.setTransform(123.25,364.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AglAqQgJgQAAgaQAAgaAJgPQAKgPAPAAQAIgBAFAFQAFAEAGAJIABAAIAAgOIAiAAIAABrIgiAAIAAgOIgBAAQgGAJgFAEQgFAEgIABQgQgBgJgPgAgMAAQAAAbAMAAQANAAAAgbQAAgbgNAAQgMAAAAAbg");
	this.shape_38.setTransform(114.175,367.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgdCiQgMgMAAgTQAAgQAMgNQAMgMARAAQARAAAMAMQANANAAAQQAAATgNAMQgMAMgRAAQgRAAgMgMgAgkBFIAAjyIBJAAIAADyg");
	this.shape_39.setTransform(398,322.4);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AAWB5IAAiPQAAgNgGgHQgFgIgJABQgXAAAAAdIAACNIhKAAIAAjpIBKAAIAAAfIABAAQAZgnAmABQAYgBAOARQAPAQAAAbIAAC1g");
	this.shape_40.setTransform(377.975,326.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhHBdQgXgcAAgqIAAiPIBKAAIAACVQAAAMAGAIQAFAIAJAAQAVAAAAggIAAiRIBKAAIAACGQAAA0gZAbQgYAcgtAAQgyAAgWgcg");
	this.shape_41.setTransform(353.525,327.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgpCzIAAisIgaAAIAAg9IAaAAIAAg2QAAggAVgTQAUgTAmAAIAeAAIAABJIgTAAQgIAAgFAGQgFAGAAAJIAAAeIAlAAIAAA9IglAAIAACsg");
	this.shape_42.setTransform(334.425,321);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhFBaQgaghAAg6QAAg4AaghQAaghArgBQAZABAYAQQAYAPAKAbQALAbACA4Ih6AAQABA0AaABQAKAAAHgIQAIgGABgMIA+AAQgRBQhIAAQgrAAgagjgAgTg5QgGAKAAAaIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGAMg");
	this.shape_43.setTransform(302.975,327.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgdB1IhIjpIBIAAIAdB+IAAAAIAdh+IBJAAIhIDpg");
	this.shape_44.setTransform(281.125,327.225);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhQBbQgVgjABg5QgBg4AVgiQATggAiAAQARAAALAIQAMAJAOATIABAAIAAgdIBJAAIAADpIhJAAIAAgfIgBAAQgOATgMAKQgLAKgRgBQgiAAgTghgAgcgBQAAA8AcAAQAcAAAAg8QAAg6gcAAQgcAAAAA6g");
	this.shape_45.setTransform(257.35,327.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAiCqIAAiNIhDAAIAACNIhNAAIAAlSIBNAAIAAB9IBDAAIAAh9IBNAAIAAFSg");
	this.shape_46.setTransform(230.95,321.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgcChQgNgMAAgRQAAgSANgLQALgNARAAQARAAAMANQANALAAASQAAARgNAMQgMANgRAAQgRAAgLgNgAgkBGIAAjzIBJAAIAADzg");
	this.shape_47.setTransform(569.1,205.8);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhFB4IAAjoIBGAAIAAAnIABAAQAaguAeAAIAMABIAABIQgOgBgLAAQgpgBAAA0IAAB0g");
	this.shape_48.setTransform(553.125,210.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhFBbQgagiAAg7QAAg3AaghQAagiArABQAZAAAYAPQAYARAKAaQALAbACA4Ih6AAQABA0AaAAQAKAAAHgGQAIgIABgKIA+AAQgRBOhIAAQgrAAgaghgAgTg6QgGAMAAAZIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGALg");
	this.shape_49.setTransform(532.275,210.6);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhQCVQgVgiAAg5QABg4AUgiQAUghAiAAQAcAAAaAjIAAiYIBJAAIAAFlIhJAAIAAgfIgBAAQgZAngeAAQggAAgUgigAgbA8QgBAbAIAPQAIAPANAAQAMAAAHgQQAIgQAAgdQAAg4gcAAQgbAAAAA8g");
	this.shape_50.setTransform(508.25,204.8);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhFB4IAAjoIBGAAIAAAnIABAAQAaguAeAAIAMABIAABIQgOgBgLAAQgpgBAAA0IAAB0g");
	this.shape_51.setTransform(488.475,210.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhRBaQgTghgBg6QABg4ATghQAVgiAgAAQASAAALAJQAMAJANATIACAAIAAgdIBKAAIAADpIhKAAIAAgfIgBAAQgOAUgMAJQgLAKgSAAQghAAgUgjgAgcAAQAAA7AdAAQAbAAAAg7QAAg6gcgBQgcABAAA6g");
	this.shape_52.setTransform(465.75,210.65);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AAWCzIAAiOQAAgOgGgIQgFgIgKAAQgWABAAAfIAACMIhKAAIAAllIBKAAIAACbIABAAQAbgmAjAAQAZAAAPARQAOAQAAAeIAACxg");
	this.shape_53.setTransform(441.925,204.4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgkCUIAAisIgcAAIAAg8IAcAAIAAg/IBIAAIAAA/IAdAAIAAA9IgdAAIAACrg");
	this.shape_54.setTransform(409.325,207.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhFBbQgagiAAg7QAAg3AaghQAagiArABQAZAAAYAPQAYARAKAaQALAbACA4Ih6AAQABA0AaAAQAKAAAHgGQAIgIABgKIA+AAQgRBOhIAAQgrAAgaghgAgTg6QgGAMAAAZIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGALg");
	this.shape_55.setTransform(390.775,210.6);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("Ag/CXQgcgRgIgnIBCAAQALARARAAQANAAAKgLQALgLgBgRIAAghQgVAggdAAQglAAgVgfQgVggAAg4QAAg4AVggQATggAkAAQAfAAAVAfIABAAIAAgYIBKAAIAADXQAAAegLAaQgKAbgbAPQgbAPgfAAQgfAAgcgRgAgVhbQgIANAAAZQAAA/AdAAQAcAAAAg6QABg5gdAAQgNAAgIAOg");
	this.shape_56.setTransform(366.7,215.075);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgkCzIAAllIBJAAIAAFlg");
	this.shape_57.setTransform(335.55,204.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgkCzIAAllIBJAAIAAFlg");
	this.shape_58.setTransform(322.15,204.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgkCsIAAjpIBJAAIAADpgAgahoQgMgLAAgQQAAgQALgMQAMgLAPAAQAQAAALALQAMAMAAAQQAAAQgMALQgLAMgQAAQgPAAgLgMg");
	this.shape_59.setTransform(308.75,205.15);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AAfB1QgchpgDgUIgBAAQgCARgcBsIg3AAIhIjpIBJAAQAZBvADATIABAAIAZiCIA+AAIAZCAIABAAIAIgmIAVhaIBJAAIhIDpg");
	this.shape_60.setTransform(285.725,210.625);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgkCzIAAllIBJAAIAAFlg");
	this.shape_61.setTransform(249.9,204.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhFBbQgagiAAg7QAAg3AaghQAagiArABQAZAAAYAPQAYARAKAaQALAbACA4Ih6AAQABA0AaAAQAKAAAHgGQAIgIABgKIA+AAQgRBOhIAAQgrAAgaghgAgTg6QgGAMAAAZIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGALg");
	this.shape_62.setTransform(232.125,210.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgdB1IhIjpIBIAAIAdB+IAAAAIAdh+IBJAAIhIDpg");
	this.shape_63.setTransform(210.275,210.625);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AhFBbQgagiAAg7QAAg3AaghQAagiArABQAZAAAYAPQAYARAKAaQALAbACA4Ih6AAQABA0AaAAQAKAAAHgGQAIgIABgKIA+AAQgRBOhIAAQgrAAgaghgAgTg6QgGAMAAAZIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGALg");
	this.shape_64.setTransform(188.375,210.6);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgkCzIAAllIBJAAIAAFlg");
	this.shape_65.setTransform(170.6,204.4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("Ag/ClIAehjIhLjmIBJAAIATA9QAJAgAHAfIABAAIAJgqIAZhSIBKAAIhkFJg");
	this.shape_66.setTransform(139.825,215.425);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhFB4IAAjoIBGAAIAAAnIABAAQAaguAeAAIAMABIAABIQgOgBgLAAQgpgBAAA0IAAB0g");
	this.shape_67.setTransform(120.325,210.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AhFBbQgagiAAg7QAAg3AaghQAagiArABQAZAAAYAPQAYARAKAaQALAbACA4Ih6AAQABA0AaAAQAKAAAHgGQAIgIABgKIA+AAQgRBOhIAAQgrAAgaghgAgTg6QgGAMAAAZIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGALg");
	this.shape_68.setTransform(99.475,210.6);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgdB1IhIjpIBIAAIAdB+IAAAAIAdh+IBJAAIhIDpg");
	this.shape_69.setTransform(77.625,210.625);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhNCqIAAlTICaAAIAABIIhNAAIAAA/IBDAAIAABFIhDAAIAAA+IBOAAIAABJg");
	this.shape_70.setTransform(56.55,205.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgdCiQgMgMAAgTQAAgQAMgNQANgMAQAAQARAAANAMQAMANAAAQQAAATgMAMQgNAMgRAAQgQAAgNgMgAglBFIAAjyIBKAAIAADyg");
	this.shape_71.setTransform(505,89.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgkCUIAAirIgcAAIAAg+IAcAAIAAg+IBIAAIAAA+IAdAAIAAA+IgdAAIAACrg");
	this.shape_72.setTransform(489.675,90.9);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgkCrIAAjoIBJAAIAADogAgahnQgMgMAAgQQAAgQAMgMQALgMAPAAQARAAALAMQALAMAAAQQAAAQgLAMQgLALgRAAQgPAAgLgLg");
	this.shape_73.setTransform(475.5,88.55);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhlCoIAAlJIBKAAIAAAeIABAAQAYgkAeAAQAiAAAUAiQAUAhAAA6QAAA3gUAhQgVAjghAAQghgBgVgmIgBAAIAAB+gAgbgsQAAA7AbAAQAcAAAAg7QAAg6gcAAQgbAAAAA6g");
	this.shape_74.setTransform(457.075,98.5);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AhFBaQgaghAAg6QAAg4AaghQAaghArgBQAZABAYAQQAYAPAKAbQALAbACA4Ih6AAQABA0AaABQAKAAAHgIQAIgHABgLIA+AAQgRBQhIAAQgrAAgagjgAgTg6QgGALAAAaIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGALg");
	this.shape_75.setTransform(420.225,94);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AAWCzIAAiPQAAgNgGgIQgFgHgKAAQgWAAAAAeIAACNIhKAAIAAllIBKAAIAACaIABAAQAbglAjAAQAZAAAPAQQAOARAAAdIAACyg");
	this.shape_76.setTransform(396.975,87.8);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgkCUIAAirIgcAAIAAg+IAcAAIAAg+IBIAAIAAA+IAdAAIAAA+IgdAAIAACrg");
	this.shape_77.setTransform(377.125,90.9);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AhFB4IAAjpIBGAAIAAAnIABAAQAagtAeAAIAMABIAABIQgOgCgLAAQgpABAAAzIAAB0g");
	this.shape_78.setTransform(348.775,93.7);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AhFBaQgaghAAg6QAAg4AaghQAaghArgBQAZABAYAQQAYAPAKAbQALAbACA4Ih6AAQABA0AaABQAKAAAHgIQAIgHABgLIA+AAQgRBQhIAAQgrAAgagjgAgTg6QgGALAAAaIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGALg");
	this.shape_79.setTransform(327.925,94);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgdB1IhIjpIBIAAIAdB+IAAAAIAdh+IBJAAIhIDpg");
	this.shape_80.setTransform(306.075,94.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AhKBcQgbghAAg5QAAg7AagiQAaghAxAAQAxAAAbAhQAaAiAAA7QAAA7gbAgQgcAggvAAQgvAAgbghgAgVgtQgHANAAAgQAAA7AcAAQAOAAAHgNQAHgOAAggQAAgggHgNQgHgNgOAAQgNAAgIANg");
	this.shape_81.setTransform(283.525,94.05);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AhlCoIAAlJIBKAAIAAAeIABAAQAYgkAeAAQAiAAAUAiQAUAhAAA6QAAA3gUAhQgVAjghAAQghgBgVgmIgBAAIAAB+gAgbgsQAAA7AbAAQAcAAAAg7QAAg6gcAAQgbAAAAA6g");
	this.shape_82.setTransform(247.325,98.5);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("ABQB5IAAiJQAAgigVAAQgXAAAAAhIAACKIhJAAIAAiNQABgNgHgJQgFgIgKAAQgJAAgGAIQgGAIgBAOIAACNIhKAAIAAjpIBKAAIAAAdQAgglAgAAQAmAAAMAoQASgVAPgJQAQgKAUAAQAzAAAABIIAACpg");
	this.shape_83.setTransform(216.25,93.625);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AhHBdQgXgcAAgqIAAiPIBKAAIAACVQAAAMAGAIQAFAIAJAAQAVAAAAggIAAiRIBKAAIAACGQAAA0gZAbQgYAcgtAAQgyAAgWgcg");
	this.shape_84.setTransform(185.925,94.425);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AgkDcIAAlJIBJAAIAAFJgAgaiXQgNgMAAgQQAAgQANgMQALgMAPAAQAQAAAMAMQALAMAAAQQAAAQgLAMQgMAMgQAAQgPAAgLgMg");
	this.shape_85.setTransform(167.15,93.325);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AhKBcQgbghAAg5QAAg7AagiQAaghAxAAQAxAAAbAhQAaAiAAA7QAAA7gbAgQgcAggvAAQgvAAgbghgAgVgtQgHANAAAgQAAA7AcAAQAOAAAHgNQAHgOAAggQAAgggHgNQgHgNgOAAQgNAAgIANg");
	this.shape_86.setTransform(135.925,94.05);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgkCUIAAirIgcAAIAAg+IAcAAIAAg+IBIAAIAAA+IAdAAIAAA+IgdAAIAACrg");
	this.shape_87.setTransform(116.725,90.9);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AhHBdQgXgcAAgqIAAiPIBKAAIAACVQAAAMAGAIQAFAIAJAAQAVAAAAggIAAiRIBKAAIAACGQAAA0gZAbQgYAcgtAAQgyAAgWgcg");
	this.shape_88.setTransform(589.575,36.125);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AhKBcQgbggAAg6QAAg7AaghQAagiAxAAQAxAAAbAiQAaAhAAA7QAAA7gbAgQgcAggvAAQgvAAgbghgAgVgtQgHANAAAgQAAA7AcAAQAOAAAHgNQAHgOAAggQAAgggHgMQgHgNgOgBQgNAAgIANg");
	this.shape_89.setTransform(565.725,35.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("Ag/ClIAehjIhLjmIBJAAIATA9QAJAgAHAfIABAAIAJgqIAZhSIBKAAIhkFJg");
	this.shape_90.setTransform(542.675,40.525);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AhFB4IAAjpIBGAAIAAAoIABAAQAaguAeAAIAMACIAABIQgOgCgLgBQgpAAAAA0IAAB0g");
	this.shape_91.setTransform(510.425,35.4);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AhKBcQgbggAAg6QAAg7AaghQAagiAxAAQAxAAAbAiQAaAhAAA7QAAA7gbAgQgcAggvAAQgvAAgbghgAgVgtQgHANAAAgQAAA7AcAAQAOAAAHgNQAHgOAAggQAAgggHgMQgHgNgOgBQgNAAgIANg");
	this.shape_92.setTransform(488.925,35.75);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgpCzIAAisIgaAAIAAg9IAaAAIAAg2QAAghAVgSQAUgTAmAAIAeAAIAABJIgTAAQgIAAgFAGQgFAGAAAJIAAAeIAlAAIAAA9IglAAIAACsg");
	this.shape_93.setTransform(470.225,29.5);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AAWB5IAAiPQAAgMgGgIQgFgIgJABQgXAAAAAdIAACNIhKAAIAAjpIBKAAIAAAfIABAAQAZgnAmABQAYgBAOARQAPAQAAAcIAAC0g");
	this.shape_94.setTransform(437.675,35.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AhKBcQgbggAAg6QAAg7AaghQAagiAxAAQAxAAAbAiQAaAhAAA7QAAA7gbAgQgcAggvAAQgvAAgbghgAgVgtQgHANAAAgQAAA7AcAAQAOAAAHgNQAHgOAAggQAAgggHgMQgHgNgOgBQgNAAgIANg");
	this.shape_95.setTransform(413.575,35.75);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgkCUIAAisIgcAAIAAg9IAcAAIAAg+IBIAAIAAA+IAdAAIAAA+IgdAAIAACrg");
	this.shape_96.setTransform(394.375,32.6);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AgkCUIAAisIgcAAIAAg9IAcAAIAAg+IBIAAIAAA+IAdAAIAAA+IgdAAIAACrg");
	this.shape_97.setTransform(379.425,32.6);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AhHBdQgXgcAAgqIAAiPIBKAAIAACVQAAAMAGAIQAFAIAJAAQAVAAAAggIAAiRIBKAAIAACGQAAA0gZAbQgYAcgtAAQgyAAgWgcg");
	this.shape_98.setTransform(359.875,36.125);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgaCRIgBAAIAAAeIhKAAIAAllIBKAAIAACYIABAAQAOgSAMgJQAKgIATAAQAfAAAVAgQAVAgAAA8QAAA4gUAiQgUAiggAAQggAAgYgmgAgbA3QAAAgAHAPQAHAPAOAAQAbAAAAg8QAAg5gcAAQgbAAAAA3g");
	this.shape_99.setTransform(336.075,29.9);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AhQBbQgVgjABg5QgBg4AVghQATgiAiABQARAAALAIQAMAJAOATIAAAAIAAgdIBKAAIAADpIhJAAIAAgfIgBAAQgOATgMAKQgLAKgRAAQgigBgTghgAgcAAQAAA7AcAAQAcAAAAg7QAAg7gcAAQgcAAAAA7g");
	this.shape_100.setTransform(297.4,35.75);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AhFBaQgaghAAg6QAAg4AaghQAagiArAAQAZAAAYAQQAYAQAKAbQALAbACA4Ih6AAQABA1AagBQAKABAHgIQAIgGABgMIA+AAQgRBPhIAAQgrABgagjgAgTg5QgGAKAAAaIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGAMg");
	this.shape_101.setTransform(261.925,35.7);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AgaCRIgBAAIAAAeIhKAAIAAllIBKAAIAACYIABAAQAOgSAMgJQAKgIATAAQAfAAAVAgQAVAgAAA8QAAA4gUAiQgUAiggAAQggAAgYgmgAgbA3QAAAgAHAPQAHAPAOAAQAbAAAAg8QAAg5gcAAQgbAAAAA3g");
	this.shape_102.setTransform(239.175,29.9);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AgkCzIAAllIBJAAIAAFlg");
	this.shape_103.setTransform(206.75,29.5);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgkCzIAAllIBJAAIAAFlg");
	this.shape_104.setTransform(193.35,29.5);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AgkCsIAAjpIBJAAIAADpgAgahoQgMgLAAgQQAAgRAMgLQALgMAPABQARgBAKAMQAMALAAARQAAAQgMALQgKAMgRAAQgPAAgLgMg");
	this.shape_105.setTransform(179.95,30.25);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AAfB1QgchpgDgUIgBAAQgCARgcBsIg3AAIhIjpIBJAAQAZBvADATIABAAIAZiCIA+AAIAZCAIABAAIAIgmIAVhaIBJAAIhIDpg");
	this.shape_106.setTransform(156.925,35.725);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AhFBaQgaghAAg6QAAg4AaghQAagiArAAQAZAAAYAQQAYAQAKAbQALAbACA4Ih6AAQABA1AagBQAKABAHgIQAIgGABgMIA+AAQgRBPhIAAQgrABgagjgAgTg5QgGAKAAAaIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGAMg");
	this.shape_107.setTransform(116.725,35.7);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AhFB4IAAjpIBGAAIAAAoIABAAQAaguAeAAIAMACIAABIQgOgCgLgBQgpAAAAA0IAAB0g");
	this.shape_108.setTransform(97.525,35.4);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AhFBaQgaghAAg6QAAg4AaghQAagiArAAQAZAAAYAQQAYAQAKAbQALAbACA4Ih6AAQABA1AagBQAKABAHgIQAIgGABgMIA+AAQgRBPhIAAQgrABgagjgAgTg5QgGAKAAAaIA0AAQgBgZgGgLQgGgMgNAAQgOAAgGAMg");
	this.shape_109.setTransform(76.675,35.7);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AAWCzIAAiPQAAgNgGgIQgFgHgKgBQgWAAAAAgIAACMIhKAAIAAllIBKAAIAACbIABAAQAbgmAjAAQAZAAAPAQQAOARAAAdIAACyg");
	this.shape_110.setTransform(53.425,29.5);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("AgmCqIAAkFIg1AAIAAhOIC3AAIAABOIg1AAIAAEFg");
	this.shape_111.setTransform(30.725,30.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,622.1,379.8);


(lib.dead_player = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AJvv0QAKAFAKAGAKpvOQAMAKAMAMQAQARANASAH8wOQAPAAAOACAMEtOQABACAAACAMNsuQAIAiAAAlQAAAigHAfALsuAQAHALAGAMADBpcQAYghAAhqQAAhHAdg7AMEqAQgVA6guAvQhUBXh2AAQgRAAgQgCIC0BnIi3CyIChiWIJqGxADBpcQBKDtDLhTApOgfIKVqHIB6BKAsCp7IicgyICfikICcAyApeskIJYDAIi6DAIr2jzIC6jAIACABAqDr+IhtBxAkJC9IAPgfIDYCiIlsLPIjYiiIFdqwIjiiBIBRBrIqjG4IigjUIKPmqIAUgNIBPBoARIAqIB/BaIiiCXIiAhaAQiEhIgCgBAPGCjIBvhnAG4iPIgBAAIAcgaAOgDGInolVInaHP");
	this.shape.setTransform(0.675,14.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ABmD9IgBAAQgUgCgYgKQgOgGgagOQjbhyjdhYIgLgEQgNgGAAgHQgBgDAJgKQADgDARghQAMgVAPgDIAPgBQAJAAAFgEQAEgDACgHIAFgMQAEgJALgFQALgFAKADQAegyAfABIAJABQAGABAEgBQAGgCALgKIAzg4QAXgZASADQANACAIAOQAHANgBAPIgBASIAAAAQACAFgDAFIAAABQgCASADALQAbgGAnAJIBBAOQAaAEAqgCICYgEQAVgBADALQACAHgIAHQgEAEgMAGQgGADgGAFQgLAKgMAPIgIAMQgZAngQAMQgPAKgDAGQgEAKAIAKQAHAJALAGQAUAJAcACIAyACQBSADBOAXQAIACAFAFQAHAFgCAHQgCAEgJAFIhkA1QhlA1g2ATQgrAPgdAAIgIAAgAkUh6IhvB8QDTBZDNBqQAcAOALAEQAXAJATABQAYAAAkgNQA0gSA9gfQAkgSBJgpQglgMhQgEQhPgFglgNQgVgHgFgLIgCgDQgCgNgDgFIgGgFIgJAJIgJALIgGAFQgFADgFAAQgGgBgDgEQgEgFAEgIQABgEAHgHIAGgGIAJgJQgEgIAEgKQACgFAEgEQAEgGAHgEQAHgEAQgFQAQgFAIgFQAOgIANgUIAUgfIACgDIgsACQhYAFg0gFIgRgBQgVgDgTgEIgSgFIgMgCQgSgEgNABIgRABIAABFQAAAMgDAFQgCAEgEACQgEADgEgCQgJgCAAgSIAAhdIAAgSIAAgCQAAgLAFgEIAAAAIAAgUIgBgbQgYASgVAVQgUASgSAWQgRAWgNgEQgKgFgFgBIgBAAQgIAAgLAMg");
	this.shape_1.setTransform(67.6721,-74.3918);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AAaF8IFdqvIAPgfIDXCiIlrLOgApchlIKOmrIAUgNIBPBpIBRBrIqiG3g");
	this.shape_2.setTransform(-63.4,64.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0066CC").s().p("AmNGqIgQAfIjiiBIhPhpIgUAMIKWqFIB5BKQBLDtDLhTICzBnIi2CxIgcAaIAAAAInaHQgAOMIsIAFgFICjiYIiAhZIgTARIhvBoIghAeIgEAFInplWIAAAAIAcgaICgiVIJqGwIi8CwgAEkB8gAxKmLIC6jAIACABIgFAFIifCkICcAyIASgSIBthxIAhghIAEgGIJYDBIi6DAg");
	this.shape_3.setTransform(15.45,-11.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("ABsDUQgTgBgXgJQgLgEgcgOQjNhqjThYIBvh9QAMgNAIABQAFABAKAFQANAEARgWQASgWAUgTIAFgCQAVgIAUgBIAAAUIAAAAQgFAEAAALIAAACIgdAQIAdACIAABdQAAASAJACQAEACAEgDQAEgCACgEQADgFAAgMIAAhFIARgBQANgBASAEIAMACIAUALIAmABIARABQA0AFBYgFIAoABIACAAIgUAfQgNAUgOAIQgIAFgQAFQgQAFgHAEQgHAEgEAFIgcAPIAMAWIgFAGQgHAHgBAEQgEAIAEAFQADAEAGABQAFAAAFgDIAGgFIABAEIAeACQAFALAVAHQAlANBPAFQBQAEAlAMQhJApgkASQg9Afg0ASQgjANgXAAIgCAAgABuDJQAHgfAAgiQAAglgIgiQAIAiAAAlQAAAigHAfgAAhhHQAQAQANASQgNgSgQgQQgMgMgMgLQAMALAMAMgADuhqQACAGgCAFQgDAHgLAEIgJADQAMgQALgJg");
	this.shape_4.setTransform(67.875,-73.0741);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC99").s().p("AMRHpIAhgfIBvhnIATgRIB/BZIiiCXgAAtk0QAYghAAhqQAAhHAdg7QDdBXDcBzQAaAOAOAGQAYAJAUACIAAAAQgUA6guAvQhUBXh2AAQgRAAgQgCQg0AVgsAAQh+AAg3ivgAwymFICfikICcAyIggAhIhtBxIgSASg");
	this.shape_5.setTransform(15.475,-14.6375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dead_player, new cjs.Rectangle(-125.9,-99.7,253.2,220.60000000000002), null);


(lib.clouds_logo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AvLOkQmTmCAAoiQAAohGTmCQGTmCI4AAQI6AAGSGCQGTGCAAIhQAAIimTGCQmSGCo6AAQo4AAmTmCg");
	this.shape.setTransform(932.5759,220.0191,1.3324,1.4833);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AvLOkQmTmCAAoiQAAohGTmCQGTmCI4AAQI6AAGSGCQGTGCAAIhQAAIimTGCQmSGCo6AAQo4AAmTmCg");
	this.shape_1.setTransform(649.5171,164.5728,1.1604,1.0871);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AvLOkQmTmCAAoiQAAohGTmCQGTmCI4AAQI6AAGSGCQGTGCAAIhQAAIimTGCQmSGCo6AAQo4AAmTmCg");
	this.shape_2.setTransform(378.8674,175.0728,1.1841,1.3285);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AvLOkQmTmCAAoiQAAohGTmCQGTmCI4AAQI6AAGSGCQGTGCAAIhQAAIimTGCQmSGCo6AAQo4AAmTmCg");
	this.shape_3.setTransform(183.2259,204.9191,1.3324,1.4833);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[]},9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1115.8,415.5);


(lib.Character_ViewTween = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AD5IjIAADiQAABehCBCQhCBCheAAQhdAAhDhCQhChCAAheQhas7BarOQAAheBChCQBDhCBdAAQBeAABCBCQBCBCAABeIAAUU");
	this.shape.setTransform(-97.4,110.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AgkDfQgGAAgUgIQgXgJgRgJQgPgIgbgVQgTgNgHgJQgNgPgHgUQgFgLACgHQgEgZgEgnIgJhIIgKg9QgFgjACgZQgFgDAAgGQAAgEAEgEQABgDAEgBQAGgCAJAAQA2gFAcgJIAhgLQAXgHAfgBIA2gBIBfgDQAwAAAkALQAEgGAHAAQAJACACAKIAAAEIABABQADAFgBAFQAAADgDADQAAAKADARQAFAUAAAJQABARgJAdIgFAUQADAEABADQACAFAAAEIAAAKQAAAEgCADIAAABIAAABIgBABIAAAAIAAABIAAACIgBAAIAAABIAAABIAAABIAAAAIAAABIgBABIAAAAIAAABIgBABIAAACIAAABIAAABIAAAAIgBABIAAABIAAABIAAAAIAEAbQAHBBgwBAQgOARgPANQgUAVgXAKQgXAMghAEQgTADgnAAQgSAAgJgCgAABB4IABAAIAAAAIAAAAIAAgCIAAABIAAAAIgBAAgABai5IAOAAIATAAIgQgBIgRABg");
	this.shape_1.setTransform(-95.9486,185.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AjkAiQgJgFACgJQADgKAVABQAhABAzgPQBFgVAPgDQAWgEAagCIAygBIBCABQAlACAdAHQAVAEAPAHIAIAGQAGAEAAAFQgBAFgEAEIgBAAQgEADgFAAIgEAAIgBgBIAAgEQgCgKgJgBQgHgBgEAGQgkgKgwAAIhfACIg2ABQgfACgXAGIghALQgcAJg2AEQgJAAgGADQgEABgBADIgBgBg");
	this.shape_2.setTransform(-95.6022,163.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#006699").s().p("AiJOkQhChCAAheQhas5BarOQAAheBChDQBChCBeAAQBeAABCBCQBCBDAABeIAAUSIgJgFQgPgIgUgEQgdgGglgCIhDgBIgxABQgbABgVAFQgPAChFAWQgzAQghgBQgVgBgDAKQgDAIAKAGIABABQgEADAAAFQAAAGAEADQgBAZAEAiIALA9IAIBJQAFAnADAZQgBAIAFAKQAGAUAOAPQAHAJATAOQAbAUAPAJQARAJAXAJQAUAHAGABQAIABASAAQAnAAAUgCQAggFAYgLQAWgKAVgVQAPgNAOgSQAwg/gHhBIgEgcIAAAAIAAgBIAAgCIABgBIAAAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIAAgCIAAAAIABgBIAAgBIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAgCQACgDAAgDIABgKQAAgFgDgEQAAgEgDgDIAFgUQAJgegBgRQAAgIgFgVQgEgRAAgKQAEgCAAgEQABgFgEgEIAFAAQAEAAAFgDIAADhQAABehCBCQhCBDheAAQheAAhChDgAAQNoIAAgBIAAAAIAAAAIABgBIAAACIgBAAIAAAAIAAAAgAB3I2IgOAAIAhAAIgTAAg");
	this.shape_3.setTransform(-97.4,110.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(4,1,1).p("AKf9TQAQAOAPAPQEjEjAAGbQAAGbkjEiQgEAFgFAEQA/BpAzHcIAAfGI5JAAQh9oqB97HQgQj3BHhcQj1kUAAl5QAAjKBGitEAAcghYQALAAAMAAQASABASACIADAAQAAAAABAAADP26IBuAAIAAI6IhuAAgAEmjBQgCAAgBABQAVA0AAA9QAAB6hXBXQhXBYh8AAQh6AAhXhYQhXhXAAh6QAAg5ATgxQj2hBjAjBQgYgYgWgYAEmjBQB+gzBggyQhpBBh1AkgAK1myQhUBShdA6QB1g8A8hQgAku3EIBaAAIAAJOIhaAAg");
	this.shape_4.setTransform(14,29.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF9966").s().p("AhXAlQgcgGgigNIg8gaQgGgDgEgFQgEgFACgFQADgEAJgBQATgBAYAMIApAUQBGAdBlgXQAcgGA4gRQA3gSAdgGQAGAAACAGQACAHgDAFQgEAIgPAFQhcAgg0ALQgtAJgoAAQggAAgcgFg");
	this.shape_5.setTransform(14.8454,12.9488);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#006699").s().p("AsFUjQh8orB87GQgPj4BHhcQAVAZAYAYQDBDAD1BCQgTAxAAA5QAAB7BXBXQBYBXB6AAQB7AABXhXQBXhXAAh7QAAg9gVg1IADgBQB1gjBphBQB1g9A8hQQA/BqAzHdIAAfFgAIhxcQhpBBh1AjQB+gzBggxg");
	this.shape_6.setTransform(11.0875,111.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC99").s().p("AjDRCQhXhXAAh7QAAg5ATgxQj1hCjBjAQgYgYgWgYQj0kUAAl5QgBjKBHisQASASAXAMIADACIADACIADACIADACIADABIABAAIAGAGIAOAMIALALIAQANIAQAKIADACIAGADIAEAEIAGACIAHADIAEABIAGAEIAEACIAEABIAFACIAFADIAEABIAEABIADAAIAIABIAIABIAHABIAHgBIALgBIAKgCIAKgEQAHgCAFgEIAEgCIACgDIADgCIADgBIADgDIAGgFIAJgJIAGgLIAHgOIAEgNIADgPIADgHIAEgKIAEgIIAtgeIAQAAIASAAIALgBQAIgBAIgDQAMgEAMgFIAEgBIAKgDIAKgDIAJgGIANgHIAGgCIAMgFIAOgGIANgHQAIgDAGgFIACABQAJAIAJAGQALAHAMAFIAeAPIAbAPQAOAKARAGIACACIADACIAEACIACABIAHADIAGADIADABIACABIADABIAEABIAFAEIAJAFIAKAGIAJAEIALAEIADACIADABIAEACIADABIADACIAFADIACABIADACIAFADIAHADIAFABIAIAGIALAFIACABIAFADIAIADIAJADIAPAEIARADQAMAEANACQAVACAVAAIAqgBQAYgBAXgIQAZgJAUgTIAGgFIALgJIAQgMIANgNIAMgMIAFgDIANgIIAMgIIAMgHIAQgJIADgCIAHgCIAHgDIAIgDIALgGIACgBIAEgBIADgCIAEAAIAPgCQAJgBAIgEIAQgFIASgIIAHgCIAWgGIAXgHQALgDANgCQANgCAMgEIAHgBQAGgBAFgCIAJgEIAJgDIAMgIIACADIACAEIABAEIACADIACAFIACACIABADIABADIABACIABADIACAFIADADIACAGQAPAgAdAUQAfAVAlgFIAEgBIAPANQAYASALgLIgBgsIACgCQATgSAHgZQAKghgMghIAAgDIgBgHIgBgHIgBgGIgCgHIgBgGIgBgJIgBgGIgBgFIgCgHIgEgIIgBgDIgCgKIgEgJIgGgNIgFgNIgFgKIgDgGIgDgGIgCgGIgEgGIgFgIIgCgDIgBgCIgCgCIgBgDIgCgDIgCgCIgCgEIgCgDIgCgCQgBgGgDgDIgGgKIgEgGIAfAdQEjEkgBGaQABGbkjEiIgJAIQg9BRh1A8QBeg6BUhTQhUBTheA6QhfAyh+AzIgEAAQAWA1AAA9QAAB7hXBXQhXBYh7AAQh6AAhYhYgAjIL4QgJABgEAEQgCAFAFAGQADAEAHADIA7AbQAiANAcAGQBBANBQgQQA0gLBcgiQAPgFAFgIQADgFgCgGQgDgHgGAAQgdAGg3ASQg3ASgdAGQhlAXhGgeIgpgUQgXgLgSAAIgBAAgAkuBJIBaAAIAApNIhaAAgADPA/IBuAAIAAo5IhuAAgAHFqgIABAAIACAAIgDAAgABayVIgBgBIACABgAAcyYIgBgBIAYABIgUABIgDgBg");
	this.shape_7.setTransform(14,-66.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AlxOaIAApOIBaAAIAAJOgACMOQIAAo6IBuAAIAAI6gAsTGbIgIgBIgHgBIgEAAIgEgBIgEgBIgFgDIgFgCIgDgBIgFgCIgFgEIgFgBIgGgDIgGgCIgFgEIgGgDIgCgCIgRgKIgQgNIgLgLIgOgMIgFgGIgCAAIgDgBIgDgCIgDgCIgDgCIgCgCQgYgMgSgSQgOgOgHgSQgGgRgBgTQAAgRAEgRQAFgQAJgPQAIgOAMgLIACgCIACgDIACgDIACgDIAFgKIADgGIADgFIAEgFIABAAQA7jzBfjqQB0kbCkj/QAVA0gGBHQgEAugTBQIhNE9QgRBJgGAkIgFAjQAMgKANgIIAhgSQARgJASgDQAMgDAMABQCWidCgikQBHhJAqghQBDg3BAgUQADATgHAWQgFAPgNAaIirFJIAEAAQASAAARACQARABAQAFQALADAKAFIADABIADABIADABIADABIAEABIADABIADACIACAAIAAABIADABIAUgBIAjACIADAAIABABIAAAAIApgeQBYg9AqgbQBKgvA/gcQA+gdB4gkQCUguBlgZQCIgjB1gQQADATgOATQgKAOgWARQkGDPjSEGIAHAGIASAOIASAQIAOAMIAIAHIAGAFIAFAFIAFAFIAGAIIAJAKIAGAJIABACIAEAGIAGAKQADADACAGIACACIABADIACAEIACACIACADIACADIABACIABACIACADIAFAIIAEAGIADAFIACAGIADAGIAFAKIAGANIAFANIAEAJIADAKIAAADIAEAIIACAHIABAFIABAGIACAJIAAAGIACAHIABAGIABAHIABAHIAAADQAMAhgJAhQgIAZgTASIgBACIABAsQgMALgYgSIgPgNIgDABQgmAFgfgVQgdgUgPggIgCgGIgCgDIgDgFIgBgDIgBgCIgBgDIgBgDIgBgCIgCgFIgCgDIgCgEIgCgEIgCgDIgLAIIgKADIgJAEQgFACgGABIgGABQgNAEgMACQgNACgMADIgWAHIgXAGIgHACIgSAIIgPAFQgJAEgJABIgPACIgDAAIgEACIgDABIgDABIgLAGIgHADIgHADIgHACIgEACIgPAJIgNAHIgMAIIgMAIIgGADIgMAMIgNANIgPAMIgMAJIgGAFQgTATgaAJQgXAIgYABIgpABQgVAAgWgCQgNgCgMgEIgRgDIgPgEIgIgDIgIgDIgGgDIgCgBIgKgFIgIgGIgGgBIgGgDIgGgDIgCgCIgDgBIgEgDIgEgCIgDgBIgDgCIgEgBIgDgCIgKgEIgKgEIgJgGIgJgFIgGgEIgDgBIgDgBIgDgBIgDgBIgGgDIgGgDIgDgBIgDgCIgDgCIgDgCQgQgGgPgKIgbgPIgegPQgMgFgLgHQgJgGgJgIIgBgBQgHAFgIADIgNAHIgOAGIgLAFIgHACIgMAHIgKAGIgJADIgKADIgFABQgLAFgNAEQgIADgIABIgLABIgSAAIgQAAIgtAeIgEAIIgEAKIgDAHIgDAPIgDANIgHAOIgHALIgJAJIgGAFIgDADIgDABIgCACIgDADIgDACQgGAEgHACIgKAEIgKACIgLABIgHABIgHgBgAGFCwIgCAAIAAAAIACAAg");
	this.shape_8.setTransform(20.6565,-151.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.3,-243.4,246.6,488.8);


(lib.character_dialogue = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("Arz0rQAngzAwgwQERkQGBAAQGAAAEQEQQADAEAEAEALQ08QA6BJApBPANEyBQBSCyAADTQAAGBkQEQQgFAEgDAEIh/b7IyKAAQgBgRAAgRIAAAiImpAAIAA7HIGpAAIAAAFQAAgYABgYQgJgIgIgJQkQkQAAmBQAAjsBmjBAqLhaIAAgBICtCEQhcg1hRhOgAqMgqIAAagAneApQG0EWHykWAKNgpIGpAAIAAbIImpAAgAJ+hjQhWBUhgA4g");
	this.shape.setTransform(107.8,209.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0066CC").s().p("AKNOBIAA7HIGpAAIAAbHgAKmKTQgFAGAAAIQgHAJAAAQQgBAOAFAXIAAAEIgBAeQAAAhABAJIACAJIABACIgDAdQgCARAGAIQAIAKAaAAQCAgCCzAAQAQAAAHgCQANgEAGgJQAFgIgBgRIAAhWQACgogEgUIAAgDQAHgDAEgFQAGgFAAgJQAAgIgGgGQgJgLgbAAQigABiggBQgaAAgKALgAqLN6IgBghIAA6gIAAagIAAAhImpAAIAA7HIGpAAIAAAGIABgwQBRBNBcA3QGzEWHzkWQBgg5BVhUIh+b6gAwcKMQgGAGABAIQgHAJAAAQQgBAOAEAXIAAAEIAAAeQAAAhABAJIACAJIABACIgEAdQAAARAFAIQAIAKAbAAQB/gCCzAAQAPAAAIgCQANgEAGgJQAFgIgBgRIABhWQAAgogDgUIAAgDQAIgDAEgFQAEgFAAgJQAAgIgEgGQgKgLgaAAQihABihgBQgaAAgJALg");
	this.shape_1.setTransform(107.8,289.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFCC").s().p("AKdYwQgGgIABgRIADgdIAAgCIgCgJQgBgJAAghIAAgeIAAgEQgEgXABgOQAAgQAHgJQgBgIAGgGQAJgLAaAAQChABCggBQAbAAAJALQAFAGAAAIQAAAJgFAFQgEAFgIADIABADQADAUgBAoIAABWQABARgFAIQgGAJgNAEQgIACgQAAQiyAAiAACQgaAAgIgKgAwlYpQgGgIABgRIADgdIAAgCIgCgJQgBgJAAghIAAgeIAAgEQgEgXABgOQAAgQAHgJQgBgIAGgGQAJgLAaAAQChABCggBQAbAAAJALQAFAGAAAIQAAAJgFAFQgEAFgIADIABADQADAUgBAoIAABWQABARgFAIQgGAJgNAEQgIACgQAAQiyAAiAACQgaAAgIgKgAnjgvIitiFIAAABIgRgRQkQkQAAmBQAAjsBmjBIABAEIFbkCQAjgaAUgLQAggRAegDQAegCAkANQAYAJAnAWICqBeQAhASASAHQAcAMAZACQAeADAmgMQASgGAvgVQAsgTAggJQArgLAlADQAkACArASQAaALAwAaIDfB7QA/AjAiAPQAWAKAWAIQBSCxAADUQAAGBkREQIgIAIIi1CNQj6CKjpAAQjpAAjaiKg");
	this.shape_2.setTransform(108.3222,218.7805);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AKKHQQgVgHgXgKQgigQg+giIjgh7QgwgbgagKQgqgSglgDQglgCgqALQggAIgsAUQgvAUgSAGQglAMgfgCQgZgCgdgMQgRgIghgSIirheQgmgVgYgJQgkgOgfADQgdACggASQgVALgjAaIlaEBIgCgEQgCgGAAgGQABgJAGgHQgvgpgMhNQgJg1AGhZQA4AJAtAjIATAOQALAGAKgBQAPgCARgWQB6ieBIhQQBwh/BshVQCAhkCJg1QCZg6CRAIQhfBHhQBVQDzgGEhgBQBxAABAADQBhAFBOAQQAUAEABALQAAAJgOAJQixB0jJBGQDUgHBvACQCzADCOAVQAgAFACARQABAPgaANQkUCEklBfQBGA0A4BFQA4BFAkBQQgcgFgfgLgAJ5GuIAXAMQgYg6gpgwQgagggfgaQA6BIApBQgAtWDEQgvAvgnAzQAngzAvgvQERkPGBAAQGAAAEQEPIAHAHIgHgHQkQkPmAAAQmBAAkREPg");
	this.shape_3.setTransform(126.3906,48.0269);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,0,236.9,381.3);


(lib.button_Start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag2CEQgHgHAAgKQAAgNAIgaIAniGIgjAAIACgKQAagHARgNQAQgPAVgiIAKAAIgSBAIAlAAIgEAPIglAAIgnCJQgGAWAAAHQAAAEABACQABAAAAABQABAAAAAAQABAAABABQAAAAABAAQAGAAAJgIQAFgFATgYIAIAGQgVAfgTANQgNAJgNAAQgKAAgHgGg");
	this.shape.setTransform(167.325,41.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhbBqIAriQQAHgaAAgKQAAgFgDgDQgFgDgHAAIgTACIgBgJIBQgNIghBxQAohGAhgbQATgQAMAAQAIAAAFAFQAEAEAAAIQAAAQgIAOQgGALgKAAQgFAAgEgDQgEgEgBgIQgBgEgBgBQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAQgEAAgDACQgGADgNAPQgTAXgWAjQgKAQgHATIgLAhIgIAdg");
	this.shape_1.setTransform(150.725,43.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAXBoQgFgFAAgKQAAgLAFgTIAFgSQgeAogaAQQgSAMgSAAQgRAAgNgOQgMgOAAgZQAAgmAXgoQAWgpAigZQAbgUAXAAQAOAAAKAIQAJAHAFARIAJgaIAlgGIguCeIgFAVIgBAGQAAADADADQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQAEAAAEgEQAKgGAPgWIAIAGQgQAYgSANQgRANgOAAQgKAAgFgFgAgHhSQgYAUgTAnQgSAnAAAfQAAAQAHAKQAIAJALAAQAZAAAdgmQAogxAAg1QAAgUgHgJQgIgJgNAAQgPAAgQAOg");
	this.shape_2.setTransform(128.325,44.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag2CEQgHgHAAgKQAAgNAIgaIAniGIgjAAIACgKQAagHARgNQAQgPAVgiIAKAAIgSBAIAlAAIgEAPIglAAIgnCJQgGAWAAAHQAAAEABACQABAAAAABQABAAAAAAQABAAABABQAAAAABAAQAGAAAJgIQAFgFATgYIAIAGQgVAfgTANQgNAJgNAAQgKAAgHgGg");
	this.shape_3.setTransform(111.275,41.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgrCjQgMgCgbgKQgJgEgGAAQgOAAgIATIgIAAIAah2IAIAAIgCAcQAAAhAVAUQAUAUAhAAQAeAAAQgTQAQgTAAgYQAAgQgIgNQgLgUgugwQgYgXgGgMQgLgTAAgVQAAghAZgYQAZgXAmAAQANAAAMACQAHACATAIIAPAFIAHABQAHAAAFgDQAFgEAHgLIAIAAIgYBpIgIAAIABgXQAAgcgTgSQgSgSgfAAQgZAAgOAOQgPAPAAASQAAARAKAPQAJAOAjAiQAiAhALATQAKASAAAWQAAAYgNAXQgMAWgYANQgYAMgcAAQgOAAgMgDg");
	this.shape_4.setTransform(92.325,38.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC33").s().p("AuqF7QidAAhvhvQhvhvAAidIAAAAQAAicBvhvQBvhvCdAAIdVAAQCdAABvBvQBvBvAACcIAAAAQAACdhvBvQhvBvidAAg");
	this.shape_5.setTransform(131.775,37.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("Ag2CEQgHgHAAgKQAAgNAIgaIAniGIgjAAIACgKQAagHARgNQAQgPAVgiIAKAAIgSBAIAlAAIgEAPIglAAIgnCJQgGAWAAAHQAAAEABACQABAAAAABQABAAAAAAQABAAABABQAAAAABAAQAGAAAJgIQAFgFATgYIAIAGQgVAfgTANQgNAJgNAAQgKAAgHgGg");
	this.shape_6.setTransform(167.325,41.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AhbBqIAriQQAHgaAAgKQAAgFgDgDQgFgDgHAAIgTACIgBgJIBQgNIghBxQAohGAhgbQATgQAMAAQAIAAAFAFQAEAEAAAIQAAAQgIAOQgGALgKAAQgFAAgEgDQgEgEgBgIQgBgEgBgBQgBgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAQgEAAgDACQgGADgNAPQgTAXgWAjQgKAQgHATIgLAhIgIAdg");
	this.shape_7.setTransform(150.725,43.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AAXBoQgFgFAAgKQAAgLAFgTIAFgSQgeAogaAQQgSAMgSAAQgRAAgNgOQgMgOAAgZQAAgmAXgoQAWgpAigZQAbgUAXAAQAOAAAKAIQAJAHAFARIAJgaIAlgGIguCeIgFAVIgBAGQAAADADADQAAABABAAQAAAAABABQAAAAABAAQABAAAAAAQAEAAAEgEQAKgGAPgWIAIAGQgQAYgSANQgRANgOAAQgKAAgFgFgAgHhSQgYAUgTAnQgSAnAAAfQAAAQAHAKQAIAJALAAQAZAAAdgmQAogxAAg1QAAgUgHgJQgIgJgNAAQgPAAgQAOg");
	this.shape_8.setTransform(128.325,44.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("Ag2CEQgHgHAAgKQAAgNAIgaIAniGIgjAAIACgKQAagHARgNQAQgPAVgiIAKAAIgSBAIAlAAIgEAPIglAAIgnCJQgGAWAAAHQAAAEABACQABAAAAABQABAAAAAAQABAAABABQAAAAABAAQAGAAAJgIQAFgFATgYIAIAGQgVAfgTANQgNAJgNAAQgKAAgHgGg");
	this.shape_9.setTransform(111.275,41.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AgrCjQgMgCgbgKQgJgEgGAAQgOAAgIATIgIAAIAah2IAIAAIgCAcQAAAhAVAUQAUAUAhAAQAeAAAQgTQAQgTAAgYQAAgQgIgNQgLgUgugwQgYgXgGgMQgLgTAAgVQAAghAZgYQAZgXAmAAQANAAAMACQAHACATAIIAPAFIAHABQAHAAAFgDQAFgEAHgLIAIAAIgYBpIgIAAIABgXQAAgcgTgSQgSgSgfAAQgZAAgOAOQgPAPAAASQAAARAKAPQAJAOAjAiQAiAhALATQAKASAAAWQAAAYgNAXQgMAWgYANQgYAMgcAAQgOAAgMgDg");
	this.shape_10.setTransform(92.325,38.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,263.6,75.9);


(lib.button_Social = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiKCfIACgIIAHAAQASAAAKgHQAGgDAGgLQAFgKALgiIBBjhIgTAAQgbAAgRAHQgRAHgKAOQgKANgHAZIgJAAIAXhVIDwAAIgaBVIgIAAQAEgTAAgPQAAgQgLgKQgIgGghAAIgZAAIg9DaQgNAqAAAJQAAAJAIAFQAHAHATAAIAKAAIgCAIg");
	this.shape.setTransform(87,36.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiKCfIADgIQAUgBAHgDQALgEAEgHQAJgLAIgcIAchcIgihuQgJgcgIgIQgHgGgUgCIADgJIB2AAIgEAJIgYADQgGACgDAEQgEAFAAAHQABAKAGAWIAaBXIA8hUQAXgiAAgJQAAgFgEgDQgGgEgXgBIACgJIBkAAIgCAJQgPABgFADQgJAEgIAHQgLAJgVAdIhNBrIgXBOQgIAeAAALQgBAIADADQADAEAGADQAJACATABIgDAIg");
	this.shape_1.setTransform(61.2,36.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(4,1,1).p("AmXlBIMvAAQCGAABeBeQBeBeAACFIAAAAQAACGheBeQheBeiGAAIsvAAQiGAAheheQheheAAiGIAAAAQAAiFBeheQBeheCGAAg");
	this.shape_2.setTransform(73.025,32.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC0000").s().p("AmXFCQiGAAheheQheheAAiGIAAAAQAAiFBeheQBeheCGAAIMvAAQCGAABeBeQBeBeAACFIAAAAQAACGheBeQheBeiGAAg");
	this.shape_3.setTransform(73.025,32.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AiKCfIACgIIAHAAQASAAAKgHQAGgDAGgLQAFgKALgiIBBjhIgTAAQgbAAgRAHQgRAHgKAOQgKANgHAZIgJAAIAXhVIDwAAIgaBVIgIAAQAEgTAAgPQAAgQgLgKQgIgGghAAIgZAAIg9DaQgNAqAAAJQAAAJAIAFQAHAHATAAIAKAAIgCAIg");
	this.shape_4.setTransform(87,36.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AiKCfIADgIQAUgBAHgDQALgEAEgHQAJgLAIgcIAchcIgihuQgJgcgIgIQgHgGgUgCIADgJIB2AAIgEAJIgYADQgGACgDAEQgEAFAAAHQABAKAGAWIAaBXIA8hUQAXgiAAgJQAAgFgEgDQgGgEgXgBIACgJIBkAAIgCAJQgPABgFADQgJAEgIAHQgLAJgVAdIhNBrIgXBOQgIAeAAALQgBAIADADQADAEAGADQAJACATABIgDAIg");
	this.shape_5.setTransform(61.2,36.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,150.1,68.5);


(lib.Button_School = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAPBFQgDgDAAgHQAAgHADgNIAEgLQgUAagRALQgMAIgMAAQgMAAgIgKQgIgJAAgRQAAgZAPgaQAPgcAXgRQARgNAPAAQAKAAAGAFQAHAFADAMIAGgSIAYgEIgeBpIgDAPIgBADQAAAAAAABQAAABABAAQAAABAAAAQAAABABAAQAAABAAAAQABAAAAAAQAAABABAAQAAAAABAAQACAAADgDQAGgEAKgPIAGAEQgLAQgMAJQgLAJgKAAQgGAAgEgEgAgEg2QgQANgNAaQgMAZAAAVQAAALAFAGQAFAGAHAAQARAAATgZQAbggAAgjQAAgOgFgGQgFgGgJAAQgKAAgKAKg");
	this.shape.setTransform(112.575,36.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag9BHIAdhgQAGgRgBgHQAAgDgCgCQgDgDgFAAIgMACIgCgGIA1gJIgVBLQAagtAXgTQAMgLAJAAQAEAAAEADQADADAAAGQgBALgFAJQgDAHgIAAQgDAAgDgCQgCgDgBgFQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAIgGACQgEACgHAKQgNAPgPAXQgGALgFANIgIAVIgEAUg");
	this.shape_1.setTransform(99.05,36.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgkBYQgEgFAAgGQAAgJAFgRIAahaIgYAAIACgGQARgFAMgJQAKgJAOgXIAHAAIgMArIAYAAIgCAJIgZAAIgaBbQgEAPAAAEQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAAAABQABAAAAAAQABAAAAAAQAEAAAGgGQADgDANgQIAFAEQgOAVgMAJQgJAGgIAAQgHAAgFgEg");
	this.shape_2.setTransform(88.775,34.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgyA8QgNgMAAgWQAAgXANgXQAOgXAWgOQAWgPAWAAQARAAAIAIQAJAHAAAKQAAAKgGAGQgFAGgGAAQgFAAgDgDQgDgDAAgFIABgGQABgCAEgEIAEgFIABgDQAAgDgDgCQgFgEgIAAQgPAAgPALQgOALgLAUQgNAXAAAYQAAAQAJAJQAJAJAQAAQALAAAMgFQAMgHAOgPIAFAEQgQATgRAJQgRAKgRAAQgWAAgMgNg");
	this.shape_3.setTransform(76.425,36.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgzA6QgMgOAAgSQAAgXAPgXQAOgZAWgNQAUgOAXAAQARAAAIAHQAIAHAAAJQAAANgKAMQgOAPgaAJQgRAGggAEIgBANQAAAOAKAKQAKAJAOAAQAKAAALgEQAKgFAVgQIADAFQglAlghAAQgXAAgLgPgAgHgvQgSARgJAgQAYgCANgGQATgIAKgMQAKgMAAgLQAAgHgEgEQgFgEgHAAQgQAAgRARg");
	this.shape_4.setTransform(62.325,36.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhdBpIADgGQAOAAAFgFQAFgEAGgUIAniIIAEgQQAAgEgDgDQgCgCgFAAIgNABIAAgGIA1gIIgLAkQARgUANgIQAOgIANAAQAOAAAKALQALALgBASQAAAigcAjQgbAkgmAAQgGAAgHgCQgFgCgIgEIgMAoQgDALAAAEQAAADACADQACADAEABIAQABIgBAGgAAOhHQgPAUgIAZIgOAuQAKAMAQAAQAIgBAIgEQAIgEAJgJQAHgJAHgLQAGgMAGgPQAEgQAAgQQAAgMgFgHQgGgHgHAAQgRAAgRAUg");
	this.shape_5.setTransform(44.75,39.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgcBtQgIgCgSgHQgGgCgEAAQgJAAgGANIgGAAIAShPIAFAAIgBATQAAAVAOAOQAOANAWAAQATAAALgMQAKgNAAgQQAAgLgFgJQgHgNgfgfQgPgQgFgIQgHgMAAgOQAAgWARgQQAQgQAZAAQAJAAAIACQAFABAMAFIAKAEIAFAAQAFAAADgCQADgCAFgIIAGAAIgRBGIgFAAIABgPQAAgTgNgMQgMgMgVAAQgQAAgJAKQgKAJAAANQAAALAGAKQAHAKAWAWQAXAVAHANQAHANAAAOQAAAQgIAPQgJAPgQAIQgQAJgSAAQgJAAgIgCg");
	this.shape_6.setTransform(31.725,33.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(4,1,1).p("AmPlaIMfAAQCQAABlBmQBmBlAACPIAAAAQAACQhmBlQhlBmiQAAIsfAAQiQAAhlhmQhmhlAAiQIAAAAQAAiPBmhlQBlhmCQAAg");
	this.shape_7.setTransform(74.675,34.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CC33FF").s().p("AmPFbQiQAAhlhmQhmhlAAiQIAAAAQAAiPBmhlQBlhmCQAAIMfAAQCQAABlBmQBmBlAACPIAAAAQAACQhmBlQhlBmiQAAg");
	this.shape_8.setTransform(74.675,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF33").s().p("AAPBFQgDgDAAgHQAAgHADgNIAEgLQgUAagRALQgMAIgMAAQgMAAgIgKQgIgJAAgRQAAgZAPgaQAPgcAXgRQARgNAPAAQAKAAAGAFQAHAFADAMIAGgSIAYgEIgeBpIgDAPIgBADQAAAAAAABQAAABABAAQAAABAAAAQAAABABAAQAAABAAAAQABAAAAAAQAAABABAAQAAAAABAAQACAAADgDQAGgEAKgPIAGAEQgLAQgMAJQgLAJgKAAQgGAAgEgEgAgEg2QgQANgNAaQgMAZAAAVQAAALAFAGQAFAGAHAAQARAAATgZQAbggAAgjQAAgOgFgGQgFgGgJAAQgKAAgKAKg");
	this.shape_9.setTransform(112.575,36.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF33").s().p("Ag9BHIAdhgQAGgRgBgHQAAgDgCgCQgDgDgFAAIgMACIgCgGIA1gJIgVBLQAagtAXgTQAMgLAJAAQAEAAAEADQADADAAAGQgBALgFAJQgDAHgIAAQgDAAgDgCQgCgDgBgFQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAIgGACQgEACgHAKQgNAPgPAXQgGALgFANIgIAVIgEAUg");
	this.shape_10.setTransform(99.05,36.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF33").s().p("AgkBYQgEgFAAgGQAAgJAFgRIAahaIgYAAIACgGQARgFAMgJQAKgJAOgXIAHAAIgMArIAYAAIgCAJIgZAAIgaBbQgEAPAAAEQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAAAABQABAAAAAAQABAAAAAAQAEAAAGgGQADgDANgQIAFAEQgOAVgMAJQgJAGgIAAQgHAAgFgEg");
	this.shape_11.setTransform(88.775,34.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF33").s().p("AgyA8QgNgMAAgWQAAgXANgXQAOgXAWgOQAWgPAWAAQARAAAIAIQAJAHAAAKQAAAKgGAGQgFAGgGAAQgFAAgDgDQgDgDAAgFIABgGQABgCAEgEIAEgFIABgDQAAgDgDgCQgFgEgIAAQgPAAgPALQgOALgLAUQgNAXAAAYQAAAQAJAJQAJAJAQAAQALAAAMgFQAMgHAOgPIAFAEQgQATgRAJQgRAKgRAAQgWAAgMgNg");
	this.shape_12.setTransform(76.425,36.725);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF33").s().p("AgzA6QgMgOAAgSQAAgXAPgXQAOgZAWgNQAUgOAXAAQARAAAIAHQAIAHAAAJQAAANgKAMQgOAPgaAJQgRAGggAEIgBANQAAAOAKAKQAKAJAOAAQAKAAALgEQAKgFAVgQIADAFQglAlghAAQgXAAgLgPgAgHgvQgSARgJAgQAYgCANgGQATgIAKgMQAKgMAAgLQAAgHgEgEQgFgEgHAAQgQAAgRARg");
	this.shape_13.setTransform(62.325,36.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF33").s().p("AhdBpIADgGQAOAAAFgFQAFgEAGgUIAniIIAEgQQAAgEgDgDQgCgCgFAAIgNABIAAgGIA1gIIgLAkQARgUANgIQAOgIANAAQAOAAAKALQALALgBASQAAAigcAjQgbAkgmAAQgGAAgHgCQgFgCgIgEIgMAoQgDALAAAEQAAADACADQACADAEABIAQABIgBAGgAAOhHQgPAUgIAZIgOAuQAKAMAQAAQAIgBAIgEQAIgEAJgJQAHgJAHgLQAGgMAGgPQAEgQAAgQQAAgMgFgHQgGgHgHAAQgRAAgRAUg");
	this.shape_14.setTransform(44.75,39.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF33").s().p("AgcBtQgIgCgSgHQgGgCgEAAQgJAAgGANIgGAAIAShPIAFAAIgBATQAAAVAOAOQAOANAWAAQATAAALgMQAKgNAAgQQAAgLgFgJQgHgNgfgfQgPgQgFgIQgHgMAAgOQAAgWARgQQAQgQAZAAQAJAAAIACQAFABAMAFIAKAEIAFAAQAFAAADgCQADgCAFgIIAGAAIgRBGIgFAAIABgPQAAgTgNgMQgMgMgVAAQgQAAgJAKQgKAJAAANQAAALAGAKQAHAKAWAWQAXAVAHANQAHANAAAOQAAAQgIAPQgJAPgQAIQgQAJgSAAQgJAAgIgCg");
	this.shape_15.setTransform(31.725,33.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,153.4,73.4);


(lib.button_return = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgTCLQgHgIAAgJQAAgKAHgGQAHgHAJAAQAJAAAGAHQAHAGAAAKQAAAJgHAIQgHAGgIAAQgJAAgHgGgAgJBKQACgaAFgRQAEgRAQgdQAMgXAEgMQADgNAAgMQAAgbgNgPQgOgPgTAAQgSgBgKAJQgLAJAAAJQAAAIAGALQAHALAAAFQAAAIgFAFQgFAFgHAAQgIAAgHgJQgHgIAAgPQAAgXAUgSQATgSAiAAQAqAAAUAZQAOASAAAVQAAAQgGAQQgHAPgTAVQgdAhgHAOQgHAOAAAZg");
	this.shape.setTransform(179.225,39.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_1.setTransform(159.325,43.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhDBhIAAgIQAOAAAIgEQAEgDACgIQACgDAAgQIAAhIQAAghgCgGQgBgHgDgCQgEgDgFAAQgHAAgIADIgCgIIA5gXIAIAAIAAArQAXgrAZAAQALAAAIAHQAHAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgFAAQgDAAgFAEQgIAJgKATIAABZQAAAPAEAIQACAGAHAEQAHADAMAAIAAAIg");
	this.shape_2.setTransform(142.05,43.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAnBhIAAgoQgYAagNAHQgMAHgOAAQgQAAgLgJQgMgJgFgPQgEgOAAgaIAAhTQAAgNgDgGQgDgFgFgCQgGgDgPAAIAAgIIBCAAIAAB9QAAAaAJAJQAKAIANAAQAHAAAMgGQALgFAPgQIAAhpQAAgQgGgGQgGgGgSAAIAAgIIBAAAIAABxQAAAhACAHQABAHADADQADADAFAAQAGAAAJgDIACAHIg4AXg");
	this.shape_3.setTransform(124.3,43.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_4.setTransform(108.225,40.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag2BJQgZgaAAgtQAAguAagbQAYgbAlAAQAfAAAUAUQAUAVABAjIiCAAQAAAoAVAZQAVAXAaAAQATAAANgKQAOgKAJgZIAHAFQgFAbgUAYQgVAXgggBQggABgYgbgAgihGQgNANgDAXIBXAAQgBgSgEgIQgFgLgKgHQgKgGgKAAQgRAAgOAOg");
	this.shape_5.setTransform(93,43.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("ABACLIhdiCIgRAAIgGAAIgGAAIAABRQAAAaAGAHQAHAIAQABIALAAIAAAHIh4AAIAAgHIALAAQASAAAHgMQAFgHAAgXIAAizQgBgagFgHQgIgIgQgBIgLAAIAAgHIBmAAQAsAAAVAGQAVAHAOASQAPARAAAXQgBAagQATQgRATgjAGIA5BQQAVAcANAJQAPAJAWADIAAAHgAg6h2IAABzIAGABIAGAAQAngBATgRQAVgRgBgbQAAgagPgQQgRgRgaAAQgMAAgUAFg");
	this.shape_6.setTransform(70.05,39.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AsumbYAAAABaACCfACYCeACDjADEOADYCIABCTABCcABYBOABBQAABSABYAKAAAKAAAKAAIAEAAYABAAABAAgBAAIACAAIAIABIAPAAIAQABIAOACIAPACIAHABIAHACYAoAIAlAQAiAVYAjAVAgAaAbAgYADAEAEAEADAEIAJANYAGAIAHAIAFAJIAIANYACAEADAFACAFIANAcYAQAmAIAqADAqYAAAKABALAAALIAAAHIAAACYAAACAAgBAAAAIgBAFIAAAQIgBARYgBAFgBAFAAAFIgCAQIgCAHIgBAIYgJAqgRAngXAkYgFAJgHAIgGAJIgKANIgLAMIgLAMIgFAFIgGAGYgIAHgJAIgIAHYggAbgmAVgpAOYgoAOgrAHgrAAYlrAAlqABlSACYiqABikAAicABYgUAAgTABgTAAIgHAAIgHAAIgOgBYgJgBgKABgJgCYgJgBgJgBgJgBYgIgCgJgCgJgCIgNgDIgNgFYgIgDgIgCgJgEYgPgHgRgHgOgKYgQgIgNgLgOgKYgHgFgGgGgGgGIgKgIIgEgFIgFgEYgLgNgNgMgJgNYgFgHgFgGgEgGYgFgHgEgHgEgHYgCgEgDgDgCgDIgFgLYgDgHgEgIgDgHYgMgdgJgegEgeYgBgHgBgIgBgHYgBgIAAgHAAgHYgBgPgBgOABgOYAAgHAAgIABgHYAAgEAAgDAAgEIABgKYACgOABgNAEgNYALg1AXgvAbgmYANgUAQgQAOgQYAIgIAIgHAIgHYAHgHAJgGAHgGYAEgDAEgDAEgDYAEgCAEgDAEgCYAIgFAHgFAIgEYAPgIAPgIAOgFYAHgDAHgCAHgDYAHgCAGgBAHgCYAGgCAGgBAGgCYAFgBAGAAAFgBYALgCAJgCAIAAYAIgBAHAAAFgBYALAAAGgBAAAAAsumbYAAAAgGABgLAAYgFAAgHAAgIAAYgIABgKABgKABYgFABgGABgGABYgGABgGABgGACYgHABgGACgHACYgHACgHACgHADYgPAEgPAIgQAHYgIAEgIAFgIAFYgEACgEADgFACYgEADgEADgEADYgIAGgIAGgIAHYgIAGgIAIgIAHYgQAQgQAQgOAUYgdAngZAvgNA3YgEAOgCAOgCAPIgBAKYgBAEAAAEAAADYgBAHAAAIAAAHYgBAPAAAOAAAPYABAIAAAIAAAIYABAHABAIABAIYADAgAKAfALAfYAOAfAPAfAWAbYAKAPAMAMAMANIAEAGIAFAEIAKAJYAHAGAGAHAHAFYAPALAOAMAQAJYAQALARAHARAJYAJAEAJADAJADIANAFIAOADYAKADAJACAJACYAKACAKABAKACYAKABAJAAAKABIAOABIAEAAIABAAIADAAIAHAAYATAAATAAAUAAYCcABCkABCqABYFSACFqAAFrAAYAvAAAwgHAtgQYAtgQApgXAmgfYAIgIAIgIAJgHIAGgGYAAAAACgCAAAAIACgCIADgDIALgNIAMgNIALgOYAHgJAIgKAFgKYAagnASgtAKguIACgIIABgJIACgSYABgGABgGAAgFIABgRIABgRIAAgEIAAgDIAAgCIAAgHYAAgLgBgMAAgLYgDgugJgugSgrIgPgfYgCgFgDgFgDgFIgJgOYgGgKgHgJgHgJIgKgOYgEgFgEgDgDgEYgdgigjgdgmgWYgmgXgqgRgrgIIgIgCIgIgBIgQgDIgQgCIgQAAIgPgBIgIAAIgCAAIgDAAIgEAAYgKAAgKAAgKAAYhSAAhQABhOAAYicACiTABiIABYkOADjjADieABYifADhaABAAAA");
	this.shape_7.setTransform(121.5171,41.1656);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AspGaQilAAh2h2Qh1h0AAimIAAgTQAAilB1h2QB2h1ClAAIZTAAQClAAB2B1QB1B2AAClIAAATQAACmh1B0Qh2B2ilAAg");
	this.shape_8.setTransform(121,41);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("AgTCLQgHgIAAgJQAAgKAHgGQAHgHAJAAQAJAAAGAHQAHAGAAAKQAAAJgHAIQgHAGgIAAQgJAAgHgGgAgJBKQACgaAFgRQAEgRAQgdQAMgXAEgMQADgNAAgMQAAgbgNgPQgOgPgTAAQgSgBgKAJQgLAJAAAJQAAAIAGALQAHALAAAFQAAAIgFAFQgFAFgHAAQgIAAgHgJQgHgIAAgPQAAgXAUgSQATgSAiAAQAqAAAUAZQAOASAAAVQAAAQgGAQQgHAPgTAVQgdAhgHAOQgHAOAAAZg");
	this.shape_9.setTransform(179.225,39.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF00").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_10.setTransform(159.325,43.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF00").s().p("AhDBhIAAgIQAOAAAIgEQAEgDACgIQACgDAAgQIAAhIQAAghgCgGQgBgHgDgCQgEgDgFAAQgHAAgIADIgCgIIA5gXIAIAAIAAArQAXgrAZAAQALAAAIAHQAHAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgFAAQgDAAgFAEQgIAJgKATIAABZQAAAPAEAIQACAGAHAEQAHADAMAAIAAAIg");
	this.shape_11.setTransform(142.05,43.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF00").s().p("AAnBhIAAgoQgYAagNAHQgMAHgOAAQgQAAgLgJQgMgJgFgPQgEgOAAgaIAAhTQAAgNgDgGQgDgFgFgCQgGgDgPAAIAAgIIBCAAIAAB9QAAAaAJAJQAKAIANAAQAHAAAMgGQALgFAPgQIAAhpQAAgQgGgGQgGgGgSAAIAAgIIBAAAIAABxQAAAhACAHQABAHADADQADADAFAAQAGAAAJgDIACAHIg4AXg");
	this.shape_12.setTransform(124.3,43.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF00").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_13.setTransform(108.225,40.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF00").s().p("Ag2BJQgZgaAAgtQAAguAagbQAYgbAlAAQAfAAAUAUQAUAVABAjIiCAAQAAAoAVAZQAVAXAaAAQATAAANgKQAOgKAJgZIAHAFQgFAbgUAYQgVAXgggBQggABgYgbgAgihGQgNANgDAXIBXAAQgBgSgEgIQgFgLgKgHQgKgGgKAAQgRAAgOAOg");
	this.shape_14.setTransform(93,43.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF00").s().p("ABACLIhdiCIgRAAIgGAAIgGAAIAABRQAAAaAGAHQAHAIAQABIALAAIAAAHIh4AAIAAgHIALAAQASAAAHgMQAFgHAAgXIAAizQgBgagFgHQgIgIgQgBIgLAAIAAgHIBmAAQAsAAAVAGQAVAHAOASQAPARAAAXQgBAagQATQgRATgjAGIA5BQQAVAcANAJQAPAJAWADIAAAHgAg6h2IAABzIAGABIAGAAQAngBATgRQAVgRgBgbQAAgagPgQQgRgRgaAAQgMAAgUAFg");
	this.shape_15.setTransform(70.05,39.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1.6,244.9,85.6);


(lib.button_quit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgIAKQgEgFAAgFQAAgFAEgDQAEgEAEAAQAGAAAEAEQADADAAAFQAAAFgDAFQgEADgGAAQgEAAgEgDg");
	this.shape.setTransform(140.5,47.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgUAtIgPgEIAAgUIAMAAIADAIIABACIACACIAIACIAJABIAIgBQAFgBADgDQADgDAAgFQAAgGgDgCQgEgDgHgDIgJgCIgJgDQgKgDgFgFQgFgHAAgIQAAgIAGgGQAFgGAIgEQAKgDAIgBIAPABIAMAEIAAAVIgMAAIgCgIIgBgDIgCgBIgGgCIgIgBQgHAAgEAEQgGADAAAFQABAGADAEQAEADAJACIAHADIAIADQALADAEAEQAGAFAAAJQgBAJgFAGQgGAHgJAEQgJAEgIAAQgKAAgIgDg");
	this.shape_1.setTransform(133.15,44);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgUAtIgPgEIAAgUIAMAAIADAIIAAACIACACIAIACIAJABIAJgBQAEgBAEgDQADgDAAgFQAAgGgDgCQgEgDgHgDIgIgCIgKgDQgKgDgFgFQgFgHAAgIQAAgIAFgGQAGgGAJgEQAIgDAKgBIANABIANAEIAAAVIgMAAIgCgIIgBgDIgCgBIgHgCIgHgBQgGAAgFAEQgFADgBAFQAAAGAEAEQAEADAJACIAHADIAIADQALADAFAEQAEAFAAAJQABAJgGAGQgGAHgJAEQgJAEgIAAQgKAAgIgDg");
	this.shape_2.setTransform(124,44);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AASAsQgFgEAAgIIgBAAQgFAHgFADQgFADgGABIgKABQgIAAgGgDQgGgEgDgGQgDgGgBgGQAAgJAFgGQAEgGAHgCQAHgEAHgCIAOgBIAEAAIAFABIAFAAIAAgLQAAgKgGgEQgEgDgHAAQgFAAgEABIgIAEIgIAEIgFAEIgEAAIAAgRIALgDIALgDIAOgBQAIAAAHACQAHACAFAGQAFAHAAAMIAAAtQAAADACACQADACADAAIAEgBIAEgCIACAAIAAAIIgFADIgGADIgGABQgJAAgDgDgAgIACQgJABgFAEQgGAEAAAIQABAGADAEQACADADABIAIACQAGAAAGgCQAHgDAEgFIAAgYQgMAAgIABg");
	this.shape_3.setTransform(114.4,43.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgvBDIAAgGIAKgFIADgBIAAgCIAAhjIgBgCIgCgCIgKgEIAAgHIAdgEIAAAOIABAAQADgEAFgEQAEgDAFgCQAFgCAHAAQALAAAIAFQAJAHAEAJQAEAKAAAMQAAAOgFALQgFALgKAHQgJAHgOAAQgHAAgFgDQgGgCgDgEIAAAEIAAAfQAAAAAAAAQAAABAAAAQAAAAAAABQABAAAAAAIACABIANAFIAAAGgAgJgyQgFADgCADIAAA3IAGADIAHABIAGABQAJgBAGgEQAGgFADgGQADgHAAgKQAAgKgDgIQgDgJgGgEQgGgFgJAAQgHAAgFADg");
	this.shape_4.setTransform(102.925,45.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgYBAIAAgHIAOgEIACgBIABgCIAAhhIgBgCIgCgCIgPgFIAAgHIAiAAIAABxIABACIACABIAOAEIAAAHg");
	this.shape_5.setTransform(88.7,42.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgYBAIAAgHIAOgEIACgBIABgCIAAhhIgBgCIgCgCIgPgFIAAgHIAiAAIAABxIABACIACABIANAEIAAAHg");
	this.shape_6.setTransform(82.5,42.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgDAbIgHgzIAAgCIAVAAIAAACIgGAzg");
	this.shape_7.setTransform(76.525,38.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgZA7IAAgHIAOgEIACgBIABgDIAAhXIgBgDIgCgBIgOgFIAAgGIAzAAIAAAGIgOAFIgCABIgBADIAABXIABADIACABIAOAEIAAAHg");
	this.shape_8.setTransform(70,42.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgPAVIAMgLQAEgGABgFIgHgFIgDgEQgCgDAAgDIACgFIADgEQADgCADAAQAIAAAEAFQADAGAAAIQAAAHgDAEQgDAGgEAFIgHAIIgHAGg");
	this.shape_9.setTransform(57.7,49.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAKBAIAAgHIAIgEIADgBIABgDIAAgoQAAgIgCgFQgBgFgFgDQgEgDgIAAIgLACQgGACgEAFIAAA4IABACIADABIAHAEIAAAHIgpAAIAAgHIAKgEIADgBIAAgCIAAhhIgBgCIgCgCIgLgFIAAgHIAfAAIAAAtIAAAFQAFgHAFgDQAFgDAEgBIAKgBQAIAAAGADQAHADAEAHQAEAGAAAKIAAAwIABADIACABIAJAEIAAAHg");
	this.shape_10.setTransform(49.225,42.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AASAsQgEgEgBgIIgBAAQgFAHgGADQgEADgGABIgKABQgIAAgGgDQgGgEgEgGQgCgGAAgGQgBgJAFgGQAEgGAHgCQAGgEAIgCIAPgBIACAAIAHABIADAAIAAgLQAAgKgEgEQgGgDgGAAQgFAAgEABIgIAEIgHAEIgGAEIgDAAIAAgRIAKgDIALgDIAPgBQAGAAAIACQAHACAFAGQAFAHAAAMIAAAtQAAADACACQADACADAAIAEgBIAEgCIABAAIAAAIIgEADIgGADIgHABQgHAAgEgDgAgIACQgJABgFAEQgGAEABAIQAAAGACAEQADADAEABIAIACQAFAAAGgCQAHgDADgFIAAgYQgLAAgIABg");
	this.shape_11.setTransform(38.65,43.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAiA8Ig9hYIgGgKIgCAAIAABRIABADIACABIANAFIAAAHIgsAAIAAgHIANgFIACgCIABgCIAAhXIgBgCIgCgCIgNgEIAAgHIAjAAIA5BRIAFAKIACAAIAAhMIgBgCIgCgBIgNgFIAAgHIAsAAIAAAHIgMAFIgDABIgBACIAABVIgCATg");
	this.shape_12.setTransform(25.625,42.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(4,1,1).p("AmXmGIMvAAQCjAAByByQBzByAACiQAACjhzByQhyBzijAAIsvAAQijAAhyhzQhzhyAAijQAAiiBzhyQByhyCjAAg");
	this.shape_13.setTransform(79.975,43.0504,1,1.0996);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("AmXGHQijAAhyhyQhzhzAAiiQAAihBzhzQByhyCjgBIMvAAQCjABByByQBzBzAAChQAACihzBzQhyByijAAg");
	this.shape_14.setTransform(79.975,43.0504,1,1.0996);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00FFFF").s().p("AgIAKQgEgFAAgFQAAgFAEgDQAEgEAEAAQAGAAAEAEQADADAAAFQAAAFgDAFQgEADgGAAQgEAAgEgDg");
	this.shape_15.setTransform(100,47.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#00FFFF").s().p("AgJAKQgDgFAAgFQAAgFADgDQAEgEAFAAQAFAAAEAEQAEADAAAFQAAAFgEAFQgEADgFAAQgFAAgEgDg");
	this.shape_16.setTransform(94.2,47.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#00FFFF").s().p("AgIAKQgEgFAAgFQAAgFAEgDQAEgEAEAAQAFAAAFAEQADADAAAFQAAAFgDAFQgFADgFAAQgEAAgEgDg");
	this.shape_17.setTransform(88.4,47.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#00FFFF").s().p("AAaAuIgWg5IgDgLIgBAAIgQAxIgJATIgLAAIgdhNIgCgDIgDgBIgGgDIAAgHIAoAAIAAAHIgNAEIARAtIAEAOIABAAIASgzIAIgTIAKAAIAVA4IAEAOIACAAIASg4IgLgHIAAgHIAiAAIAAAHIgHAFIgDACIgBACIgUA4IgJATg");
	this.shape_18.setTransform(77.35,44.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#00FFFF").s().p("AARAsQgEgEAAgIIgBAAQgFAHgFADQgFADgGABIgKABQgIAAgGgDQgGgEgDgGQgEgGAAgGQAAgJAFgGQAEgGAHgCQAHgEAHgCIAOgBIAEAAIAFABIAFAAIAAgLQAAgKgGgEQgEgDgHAAQgFAAgDABIgJAEIgIAEIgFAEIgEAAIAAgRIALgDIALgDIAOgBQAIAAAHACQAHACAFAGQAFAHAAAMIAAAtQAAADADACQACACADAAIAEgBIAEgCIACAAIAAAIIgFADIgHADIgFABQgIAAgFgDgAgJACQgIABgFAEQgGAEAAAIQAAAGAEAEQACADADABIAIACQAGAAAGgCQAHgDAEgFIAAgYQgMAAgJABg");
	this.shape_19.setTransform(64.35,43.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,164,90.1);


(lib.Button_LevelStart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgZBMQgFgFAAgHQAAgHAFgFQAFgGAHAAQAIAAAFAGQADAFAAAHQAAAHgDAFQgFAFgIAAQgHAAgFgFgAgNAaIANhlIABgFIAeAAIgBAFIgfBlg");
	this.shape.setTransform(133.425,43.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AghA5QgMgGgGgLQgGgLAAgQQAAgOAFgOQAFgOAIgLQAKgKAMgHQAMgFANAAQARAAAMAGQALAIAFALQAFAMAAANQAAAPgFAOQgFAOgJAKQgJALgLAFQgNAHgNAAQgPAAgLgHgAgIgtQgHAEgFAHQgEAHgDAJQgDAIgCAJIgBAPQAAAJADAJQACAIAGAGQAHAEAKAAQAHAAAHgDQAGgEAFgHIAIgPQADgIABgKIABgQQAAgKgCgIQgDgJgGgEQgGgGgKAAQgHABgHAEg");
	this.shape_1.setTransform(121.25,44.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgtBMQgPgIgIgOQgJgPAAgVQAAgUAHgTQAHgSAMgNQANgOAQgIQARgIAUAAQAQAAAMACIAVAFIAKACIgKAqIgPAAIADgYQABAAAAgBQgBAAAAgBQAAAAAAAAQgBgBgBAAIgEgDQgIgDgJgBQgKgCgHAAQgNAAgMAGQgNAGgHALQgJAKgFAPQgEAPAAARQAAARAFAMQAGANALAHQALAGAPAAQAKAAAHgCIAKgEIAJgmQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBIgCgBIgWgGIACgJIBEAAIgBAJIgQAGIgDACIgCADIgEASIgDASIgCAMQgOAEgOADQgPAEgQAAQgSAAgPgHg");
	this.shape_2.setTransform(105.75,42.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgfA8IgUgGIAAgbIAPAAIAEAKIABADIACACIAKAFQAGACAHAAQAGAAAHgCQAIgCAFgEQAFgFAAgIQAAgFgEgEQgEgEgIgDIgMgDIgLgFQgLgDgGgHQgGgIgBgJQAAgJAFgIQAFgGAHgGQAJgFAKgDQAKgCALAAQAJAAAIACIAQAEIAAAcIgPAAIgDgLIgCgDIgDgCQgEgCgEgBIgJgBQgMAAgHAFQgJAEABAKQgBAEADADIAHAGIALAFIARAGQANAFAGAFQAHAGAAAJQAAAKgGAIQgFAJgIAFQgJAFgKADQgKAEgKAAQgLgBgKgDg");
	this.shape_3.setTransform(82.9,44.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgSAlIAIhFIABgDIAcAAIgBADIgYBFg");
	this.shape_4.setTransform(74.825,37.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AggBKQgIgFAAgJIABgGIABgIIACgIIAPhDIgUAAIAAgLIAOgCQAFgCADgDQAEgEACgHIAEgRIAUgEIgIAlIAnAAIAAANIgqAAIADgNIgCAAIgCANIABAAIgNA/IgBAFIgBAHIgBAEQAAAEADADQAEADAEABIAHACIAGgBIAHgCIAFgCIAEAAIAAAKIgJAEIgOAFQgIADgGAAQgLgBgIgFgAAAgdIgBAAIACgNIACAAIgDANg");
	this.shape_5.setTransform(65.025,43.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgTA9QgIgCgIgGQgHgFgFgKQgFgKAAgPQAAgNAFgNQAFgOAJgLQAJgLANgHQALgGAQAAQAIAAAJACQAIADAHAGQAFAGAAALQAAAKgFAIQgGAHgJAFQgKAEgLABQgMACgKAAIgHAAIgIgBIgEAAIADgKIALAAIAGAAQARAAAKgGQALgGAAgPQAAgHgFgEQgEgDgGAAQgLAAgGAFQgJAGgFAJQgGAJgDAKIAAACIgDgBIAAALIAAAAIAAAGQAAALADAIQAEAJAIAFQAGAFAMAAQAIAAAJgEQAJgDAMgIIAGAAIAAAPIgTAJIgRAGQgJACgJAAQgFAAgIgCgAgdACIAAAAIAAgLIADABIgDAKIAAAAgAgPgIIgLAAIAAgCQADgKAGgJQAFgJAJgGQAGgFALAAQAGAAAEADQAFAEAAAHQAAAPgLAGQgKAGgRAAIgGAAgAgagIIAAAAg");
	this.shape_6.setTransform(52.9,44.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhEBPIACgJIASgGIADgCQAAAAABAAQAAgBAAAAQAAgBABAAQAAgBAAAAIAah1IAAgDIgDgCIgRgGIACgJIBBAAIgCAJIgSAGIgCACIgDADIgaB6IA6AAIADgBQABAAAAAAQAAgBABAAQAAAAAAgBQAAAAABgBIALghIAPAAIgMA0g");
	this.shape_7.setTransform(38.55,42.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(4,1,1).p("AoqkhIRVAAQB4AABVBVQBVBVAAB3QAAB4hVBUQhVBVh4AAIxVAAQh4AAhVhVQhUhUAAh4QAAh3BUhVQBVhVB4AAg");
	this.shape_8.setTransform(84.45,41.1412,1,1.4216);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF66").s().p("AoqEhQh4AAhVhUQhVhVAAh4QAAh3BVhVQBVhUB4AAIRVAAQB4AABVBUQBUBVAAB3QAAB4hUBVQhVBUh4AAg");
	this.shape_9.setTransform(84.45,41.1412,1,1.4216);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("AgPBMQgHgGAAgKQAAgJAHgGQAGgIAJABQAJgBAHAIQAGAGAAAJQAAAKgGAGQgHAHgJAAQgJAAgGgHgAgDAbQgBgCgBgEIAAgLIgDgKIgHgXQgFgPgCgFQgBgFAAgIQAAgKAHgIQAGgIALAAQAKAAAHAIQAGAIAAANIgBALIgFARQgFARgCAJQgDAJgBAKQAAAEgBACQgCACgDAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAgBAAg");
	this.shape_10.setTransform(132.4,37.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AAFBHIAEgDQABAAAAAAQABAAAAgBQAAAAABgBQAAAAAAgBQAEgEAAgLIAAhnQAAgHgCgDIgEgEIgFgCIAAgNQAMAAALAFQAKAEAJAKQAYAWAAApQAAApgXAXQgRARgaACgAgwBAQgWgXAAgpQAAgTAGgQQAGgRALgLQAJgKALgEQAKgFANAAIAAANQgGABgCAFQgDADAAAHIAABnQAAALADAEQACAEAGACIAAAMQgagCgSgRg");
	this.shape_11.setTransform(120.825,37.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("AAFBGIAGgCQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBAAAAQACgEABgFIAAgjQgBgFgCgCIgBgBIgFgBQgGgCAAgFQAAgDADgBQADgBAEAAIAFAAIAqAAQAFAAADABQACABAAADIgBAEIgDADIgDADQgBACAAADIAAAoIgMAKQgIAFgHACIgOAFIgOABgAgKBTIgIgDQgNgEgKgJQgKgIgGgMQgKgUAAgZQAAgYAIgUQAKgTAQgKQAKgHALgDIALgBIAAANQgLADAAAOIAABsQAAAFACAEQABADAFACIAAANIgGAAgAAzgWIgDgHQgBgGgGgIQgEgJgEgGQgFgFgGgDQgGgDgIAAIAAgNQASACAMAFIAHABIACAAIAEgFQACgDADAAQABAAABAAQABAAAAAAQABABAAAAQABAAAAABQABABABAEIAAAuQgBAJgGAAQgEAAgBgCg");
	this.shape_12.setTransform(105.6,37.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("AAABGQAJgCAFgFQAEgFAAgHQAAgIgHgGQgEgEgMgFIgUgJIgKgHQgWgPAAgaQAAgNAFgLQAGgMAJgGQAOgKAUgBIAAANQgHACgEAFQgDAEAAAGQAAAGADAEQADAFAHAEIAVAJIARAJQAFAEAGAFQANAOAAAUQAAAPgHANQgIAMgNAHQgHAEgIACQgJACgGAAgAgeBNIgGgCIgDgBIgEABIgDAEQgCACgDABQgGgBAAgJIAAgrQAAgEABgCQACgCADAAQABAAAAAAQABAAABAAQAAABAAAAQABAAAAAAIADAGQACAKAGAJQAFAIAGAHQAHAGAJACIAAANQgJAAgMgGgAAqgaIgCgDIgBgEIgFgMQgDgGgEgFQgJgKgMgDIAAgMIAMACIAOAEIAEABQABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAIACgDQACgDADAAQADAAABADQACABAAAGIAAAmQAAAEgCACQgCACgDAAIgEgBg");
	this.shape_13.setTransform(85.575,37.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("AgLAgIgFg/IAhAAIgGA/g");
	this.shape_14.setTransform(76.15,32.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF0000").s().p("AAaBQIgzAAIgEAAQgFAAgDgCQgDgBAAgDQAAgFAGgCIAFgBIACgBQACgDAAgFIAAiIIAzAAIAACIQAAAFACADIABABIAGABQAFACAAAFQAAACgDACQgCACgFAAgAA3gZQgCgDgBgDIgBgHQgCgKgFgJQgDgFgFgDIAAgOIAeAAIAAAwQAAAEgBACQgCABgDAAQgDAAgCgBgAg/gZQgCgCAAgEIAAgwIAeAAIAAAOQgFADgDAFQgFAJgCAKIgBAHQgBADgCADQgCABgDAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_15.setTransform(66.325,37.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF0000").s().p("AANBQIAAgNIANgDQAEgCAGgFQAFgEADgFQADgEACgHIADgGQAAAAABAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAAAAAQABAAABABQAAAAABAAQAAABAAAAQACACAAAFIAAApgAgxBQIgDAAQgEAAgCgCQgDgBAAgDQAAgFAFgCIAFgBIABgBQABgCAAgFIAAh0QAAgDgBgCIgBgCIgFgCQgFgBAAgFQAAgDADgCQACgBAEAAIADAAIAzAAIAACfgAAeAdIgDgGQgCgHgDgFQgEgEgGgCIAAgMQAHgEADgEQAEgEABgFIADgHQAAAAABgBQAAAAAAAAQABAAABAAQAAAAABgBQAEAAABADIABAHIAAAsIgBAIQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAgAAyggIgCgEQgEgNgJgIQgJgHgNgBIAAgOIAvAAIAAApQAAAEgBACQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAgBAAIgEgBg");
	this.shape_16.setTransform(52.225,37.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF0000").s().p("AAOBQIAAgNIAJgCIAHgEQAFgEAEgHQAEgHADgIQABgGACgCQABgBAAAAQABgBAAAAQABAAAAAAQABgBABAAQADAAABADIABAFIAAAwgAguBQIgDAAQgFAAgCgCQgCgBAAgDQAAgFAFgCIAEgBIABgBQACgCAAgFIAAh0QAAgDgCgCIgBgCIgEgCQgFgBAAgFQAAgDACgCQACgBAFAAIADAAIAzAAIAEAAQAFAAACABQADACAAAEQAAAFgFABIgGABIgBACQgCABAAAFIAACJg");
	this.shape_17.setTransform(39.175,37.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,172.9,86.3);


(lib.button_Jump = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ah+CjIAAgpIApAAIAAjzIgpAAIAAgpIB1AAQAyAAAaAHQAZAIASAaQARAZAAAjQAAAbgMAXQgLAVgRALQgRAKgUAEQgVAEgqAAIgWAAIAABTIApAAIAAApgAgjAAIAcAAQAvAAASgNQATgPAAgiQAAgWgKgPQgKgPgOgDQgPgEghAAIgeAAg");
	this.shape.setTransform(191.425,46.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgHClIhvkgIAADzIAkAAIAAApIh0AAIAAgpIAoAAIAAjzIgoAAIAAgpIBwAAIBWDfIBWjfIBwAAIAAApIgnAAIAADzIAnAAIAAApIh7AAIAAgpIAoAAIAAjzIhxEgg");
	this.shape_1.setTransform(150.8,46.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag5CdQgZgKgMgQQgNgQgEgSQgEgTAAglIAAilIgoAAIAAgoICAAAIAAAoIgnAAIAACiQAAAnAEAOQAEAOAPAKQAQALAYAAQAcAAAQgJQAPgJAFgOQAFgQAAglIAAilIglAAIAAgoIB/AAIAAAoIgpAAIAACpQAAAjgDAQQgDAPgNARQgMASgYAJQgXALgiAAQgkgBgYgIg");
	this.shape_2.setTransform(107.575,46.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhQDRIAAguQATAFARAAQAVAAAHgMQAGgLAAgkIAAkZIgpAAIAAgpICDAAIAAApIgpAAIAAEcQAAAlgFATQgGATgVANQgUAOgdAAQgUAAgSgFg");
	this.shape_3.setTransform(76.65,51.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00FFFF").s().p("Ap+HXIAAutINtAAQClAAB2B1QB1B1AACmIAACNQAACmh1B0Qh2B2ilAAg");
	this.shape_4.setTransform(194.9545,47.9551,1.0016,0.9233,0,0.4242,0);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00FFFF").s().p("Ap+HXIAAutINtAAQClAAB2B1QB1B1AACmIAACNQAACmh1B0Qh2B2ilAAg");
	this.shape_5.setTransform(65.483,47.9551,1.0238,0.9233,0,0.4242,180);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(4,1,1).p("At+naIb9AAQClAAB2B1QB1B1AACmIAACVQAACmh1B1Qh2B1ilAAI79AAQimAAh1h1Qh1h1AAimIAAiVQAAimB1h1QB1h1CmAAg");
	this.shape_6.setTransform(129.55,47.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("At+HbQimAAh1h2Qh1h0AAimIAAiVQAAimB1h1QB1h1CmAAIb9AAQClAAB2B1QB1B1AACmIAACVQAACmh1B0Qh2B2ilAAg");
	this.shape_7.setTransform(129.55,47.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("Ah+CjIAAgpIApAAIAAjzIgpAAIAAgpIB1AAQAyAAAaAHQAZAIASAaQARAZAAAjQAAAbgMAXQgLAVgRALQgRAKgUAEQgVAEgqAAIgWAAIAABTIApAAIAAApgAgjAAIAcAAQAvAAASgNQATgPAAgiQAAgWgKgPQgKgPgOgDQgPgEghAAIgeAAg");
	this.shape_8.setTransform(191.425,46.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("AgHClIhvkgIAADzIAkAAIAAApIh0AAIAAgpIAoAAIAAjzIgoAAIAAgpIBwAAIBWDfIBWjfIBwAAIAAApIgnAAIAADzIAnAAIAAApIh7AAIAAgpIAoAAIAAjzIhxEgg");
	this.shape_9.setTransform(150.8,46.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF00").s().p("Ag5CdQgZgKgMgQQgNgQgEgSQgEgTAAglIAAilIgoAAIAAgoICAAAIAAAoIgnAAIAACiQAAAnAEAOQAEAOAPAKQAQALAYAAQAcAAAQgJQAPgJAFgOQAFgQAAglIAAilIglAAIAAgoIB/AAIAAAoIgpAAIAACpQAAAjgDAQQgDAPgNARQgMASgYAJQgXALgiAAQgkgBgYgIg");
	this.shape_10.setTransform(107.575,46.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF00").s().p("AhQDRIAAguQATAFARAAQAVAAAHgMQAGgLAAgkIAAkZIgpAAIAAgpICDAAIAAApIgpAAIAAEcQAAAlgFATQgGATgVANQgUAOgdAAQgUAAgSgFg");
	this.shape_11.setTransform(76.65,51.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("Ah+CjIAAgpIApAAIAAjzIgpAAIAAgpIB1AAQAyAAAaAHQAZAIASAaQARAZAAAjQAAAbgMAXQgLAVgRALQgRAKgUAEQgVAEgqAAIgWAAIAABTIApAAIAAApgAgjAAIAcAAQAvAAASgNQATgPAAgiQAAgWgKgPQgKgPgOgDQgPgEghAAIgeAAg");
	this.shape_12.setTransform(191.425,46.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("AgHClIhvkgIAADzIAkAAIAAApIh0AAIAAgpIAoAAIAAjzIgoAAIAAgpIBwAAIBWDfIBWjfIBwAAIAAApIgnAAIAADzIAnAAIAAApIh7AAIAAgpIAoAAIAAjzIhxEgg");
	this.shape_13.setTransform(150.8,46.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("Ag5CdQgZgKgMgQQgNgQgEgSQgEgTAAglIAAilIgoAAIAAgoICAAAIAAAoIgnAAIAACiQAAAnAEAOQAEAOAPAKQAQALAYAAQAcAAAQgJQAPgJAFgOQAFgQAAglIAAilIglAAIAAgoIB/AAIAAAoIgpAAIAACpQAAAjgDAQQgDAPgNARQgMASgYAJQgXALgiAAQgkgBgYgIg");
	this.shape_14.setTransform(107.575,46.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF0000").s().p("AhQDRIAAguQATAFARAAQAVAAAHgMQAGgLAAgkIAAkZIgpAAIAAgpICDAAIAAApIgpAAIAAEcQAAAlgFATQgGATgVANQgUAOgdAAQgUAAgSgFg");
	this.shape_15.setTransform(76.65,51.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,-2,269.9,99);


(lib.button_end = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAGgHAJAAQAJAAAHAHQAHAHAAAIQAAAKgHAGQgHAHgJAAQgJAAgGgHg");
	this.shape.setTransform(159.4,37.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#990000").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAHgHAIAAQAKAAAGAHQAHAHAAAIQAAAKgHAGQgGAHgKAAQgIAAgHgHg");
	this.shape_1.setTransform(148.9,37.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#990000").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAGgHAJAAQAJAAAHAHQAHAHAAAIQAAAKgHAGQgHAHgJAAQgJAAgGgHg");
	this.shape_2.setTransform(138.4,37.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AAhCUIAAgaQgOAOgNAHQgMAFgPAAQgfAAgXgZQgWgaAAgoQAAgpAZggQAagiAoAAQAXAAAQAQIAAgjQAAgfgBgIQgCgHgDgDQgDgDgFAAQgFAAgKAEIgCgIIA4gXIAJAAIAADZQAAAgACAIQABAHAEADQADADAFAAQAFAAAJgEIADAIIg5AWgAgpgUQgTAUAAAoQAAAqASAWQASAWAWAAQASAAARgSIAAhiQgBgMgGgMQgGgLgKgGQgKgGgJAAQgSAAgOARg");
	this.shape_3.setTransform(123.4,25.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#990000").s().p("AAKBhIAAgIIAEAAQANAAAFgEQAFgEADgHIAAgUIAAhMQAAgZgGgMQgHgLgQAAQgXAAgYAaIAABiQAAATACAFQADAGAFADQAFACAPAAIAAAIIhdAAIAAgIIAEAAQAPAAAFgHQAFgHAAgVIAAhEQAAgigCgIQgBgHgDgDQgEgCgFAAQgGAAgIADIgDgIIA5gXIAJAAIAAAoQAhgoAdAAQAPAAALAIQALAIAHARQAEANAAAZIAABPQAAASADAGQACAGAFACQAFADAOAAIAAAIg");
	this.shape_4.setTransform(101.675,29.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#990000").s().p("Ag2BKQgZgbABgsQAAgwAZgbQAYgbAkAAQAgAAAUAWQAUAUAAAjIiBAAQAAAoAVAYQAUAZAbAAQASgBAOgJQAOgLAJgYIAGADQgEAdgUAXQgVAWgfAAQghAAgYgZgAghhHQgOANgDAYIBXAAQgCgSgDgHQgFgMgKgGQgKgHgKAAQgRAAgNANg");
	this.shape_5.setTransform(82,30.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,237.2,50.6);


(lib.button_dialogue = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgQBEIAAhOIgNAAIAAgdIANAAIAAgcIAhAAIAAAcIANAAIAAAdIgNAAIAABOg");
	this.shape.setTransform(73.65,23.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAQA2IgQgkIAAAAQAAAEgGAOIgJASIgmAAIAig1Igig2IAnAAQANAcABAHIAAAAQACgJANgaIAnAAIgjA1IAjA2g");
	this.shape_1.setTransform(64.575,25.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgfAqQgMgQAAgaQAAgaAMgPQAMgPATAAQALgBALAIQALAHAFANQAFAMABAaIg4AAQABAYAMAAQAEgBADgDQAEgDAAgFIAdAAQgIAkghAAQgTAAgMgPgAgIgaQgDAFAAAMIAXAAQAAgMgDgFQgDgGgGAAQgFAAgDAGg");
	this.shape_2.setTransform(53.875,25.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAVBOIgrhYIABATIAABFIgkAAIAAibIAkAAIAsBZIgBgQIAAhJIAkAAIAACbg");
	this.shape_3.setTransform(41.3,22.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(4,1,1).p("AlDjhIKHAAQBeAABCBCQBCBCAABdIAAAAQAABehCBCQhCBCheAAIqHAAQheAAhChCQhChCAAheIAAAAQAAhdBChCQBChCBeAAg");
	this.shape_4.setTransform(55,22.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AlDDiQheAAhChCQhChCAAheIAAAAQAAhdBChCQBChCBeAAIKHAAQBdAABCBCQBDBCAABdIAAAAQAABehDBCQhCBChdAAg");
	this.shape_5.setTransform(55,22.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AgQBEIAAhOIgNAAIAAgdIANAAIAAgcIAhAAIAAAcIANAAIAAAdIgNAAIAABOg");
	this.shape_6.setTransform(73.65,23.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AAQA2IgQgkIAAAAQAAAEgGAOIgJASIgmAAIAig1Igig2IAnAAQANAcABAHIAAAAQACgJANgaIAnAAIgjA1IAjA2g");
	this.shape_7.setTransform(64.575,25.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AgfAqQgMgQAAgaQAAgaAMgPQAMgPATAAQALgBALAIQALAHAFANQAFAMABAaIg4AAQABAYAMAAQAEgBADgDQAEgDAAgFIAdAAQgIAkghAAQgTAAgMgPgAgIgaQgDAFAAAMIAXAAQAAgMgDgFQgDgGgGAAQgFAAgDAGg");
	this.shape_8.setTransform(53.875,25.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AAVBOIgrhYIABATIAABFIgkAAIAAibIAkAAIAsBZIgBgQIAAhJIAkAAIAACbg");
	this.shape_9.setTransform(41.3,22.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,114,49.3);


(lib.button_credits = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AglBeQgGgCgFgBQgFAAgDAGIgGAAIAAhDIAGAAQAGAcAQAPQARAPATAAQAOAAAJgJQAJgIAAgLQAAgPgKgKQgKgJgdgPQgegOgJgLQgJgMAAgSQAAgXAQgQQAQgQAZAAQAKAAAQAGIAOACQADABACgCQACgBACgGIAHAAIAABAIgHAAQgHgdgMgLQgNgLgSAAQgOAAgJAHQgJAIAAAJQAAALAHAJQAGAIATAJIAeAPQApAUAAAhQAAAagTAPQgUAPgYAAQgQAAgWgFg");
	this.shape.setTransform(153.25,43);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_1.setTransform(139.225,40.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgrCSIAAgIQAOAAAEgCQAFgDADgGQADgGAAgSIAAhIQAAgfgCgIQgCgGgDgDQgDgCgGAAQgFAAgIADIgDgIIA4gXIAJAAIAACWQAAASACAGQADAGAFACQAEADAOAAIAAAIgAgNhtQgFgHgBgIQABgJAFgGQAHgGAIAAQAIAAAGAGQAGAGAAAJQAAAIgGAHQgGAGgIAAQgIAAgHgGg");
	this.shape_2.setTransform(127.45,37.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAiCUIAAgaQgOAOgNAHQgNAFgPAAQgfAAgWgZQgYgZAAgpQABgoAZghQAZghAogBQAYAAARAQIAAgjQgBgfgBgIQgCgHgDgDQgEgDgEAAQgGAAgIAEIgDgHIA4gYIAJAAIAADYQAAAiACAHQABAHADADQAEADAEAAQAGAAAKgDIABAHIg3AWgAgqgVQgSAVAAAoQAAAqASAWQASAWAWAAQASAAASgSIAAhiQgCgMgGgMQgGgLgLgGQgJgGgJAAQgSAAgPAQg");
	this.shape_3.setTransform(111.75,38.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag2BJQgYgaAAgsQAAgwAYgbQAZgbAkAAQAgAAAUAWQAUAUAAAjIiAAAQgBAoAVAZQAUAYAbAAQASgBAOgJQAOgLAJgYIAGADQgEAdgUAXQgVAWgfAAQghAAgYgagAghhHQgOANgCAYIBWAAQgCgSgDgHQgFgMgKgGQgKgHgKAAQgRAAgNANg");
	this.shape_4.setTransform(91.35,43);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhDBhIAAgIQAOAAAIgEQAEgDADgIQABgDAAgQIAAhIQAAghgBgGQgCgHgDgCQgEgDgFAAQgHAAgIADIgCgIIA5gXIAIAAIAAArQAXgrAZAAQALAAAIAHQAHAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgFAAQgDAAgEAEQgKAJgJATIAABZQABAPADAIQACAGAHAEQAHADAMAAIAAAIg");
	this.shape_5.setTransform(75.1,42.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhgBeQgcgmAAgzQAAgqATgiQASgjAhgTQAhgUAlAAQAfABAdAPQAJAEADAAQAGAAAEgEQAFgFACgLIAIAAIAGBfIgGAAQgNgqgYgTQgXgSghAAQgbgBgWAOQgXAPgMAeQgNAfAAAtQAAAmAMAbQAMAcAYAPQAYAOAfAAQAbABAUgMQAVgMAZgiIAGAEQgVAlgbARQgcARgnAAQhEAAgmgzg");
	this.shape_6.setTransform(53.875,38.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AvxlyID7AFID8ADIH2AFYFOADFPACFPABIgTgTIgBLjIAUgUYqeAAqdADqeAHIALAKIgFlxIgGlyAvxlyIgGFyIgEFxYAAAGAEAFAGAAIAAAAIAAAAYKeAHKdACKeAAYALAAAJgJAAgLIAAAAIgBrjIAAAAYAAgKgIgIgLAAIAAAAYlPABlPAClOADIn2AFIj8ADIj7AE");
	this.shape_7.setTransform(100.9821,37.0599);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AvsFyIAArjIfZAAIAALjg");
	this.shape_8.setTransform(100.5,37);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#666666").s().p("AglBeQgGgCgFgBQgFAAgDAGIgGAAIAAhDIAGAAQAGAcAQAPQARAPATAAQAOAAAJgJQAJgIAAgLQAAgPgKgKQgKgJgdgPQgegOgJgLQgJgMAAgSQAAgXAQgQQAQgQAZAAQAKAAAQAGIAOACQADABACgCQACgBACgGIAHAAIAABAIgHAAQgHgdgMgLQgNgLgSAAQgOAAgJAHQgJAIAAAJQAAALAHAJQAGAIATAJIAeAPQApAUAAAhQAAAagTAPQgUAPgYAAQgQAAgWgFg");
	this.shape_9.setTransform(153.25,43);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#666666").s().p("AgIB5QgJgFgFgKQgEgKAAgUIAAh9IgeAAIAAgHQAMgFAMgKQALgLAJgPQAFgIAIgUIAGAAIAAA9IAsAAIAAAPIgsAAIAAB5QAAASAFAGQAFAHAJAAQAGAAAHgFQAGgEAEgIIAIAAQgIAUgNAKQgNAKgOAAQgJAAgIgFg");
	this.shape_10.setTransform(139.225,40.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#666666").s().p("AgrCSIAAgIQAOAAAEgCQAFgDADgGQADgGAAgSIAAhIQAAgfgCgIQgCgGgDgDQgDgCgGAAQgFAAgIADIgDgIIA4gXIAJAAIAACWQAAASACAGQADAGAFACQAEADAOAAIAAAIgAgNhtQgFgHgBgIQABgJAFgGQAHgGAIAAQAIAAAGAGQAGAGAAAJQAAAIgGAHQgGAGgIAAQgIAAgHgGg");
	this.shape_11.setTransform(127.45,37.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#666666").s().p("AAiCUIAAgaQgOAOgNAHQgNAFgPAAQgfAAgWgZQgYgZAAgpQABgoAZghQAZghAogBQAYAAARAQIAAgjQgBgfgBgIQgCgHgDgDQgEgDgEAAQgGAAgIAEIgDgHIA4gYIAJAAIAADYQAAAiACAHQABAHADADQAEADAEAAQAGAAAKgDIABAHIg3AWgAgqgVQgSAVAAAoQAAAqASAWQASAWAWAAQASAAASgSIAAhiQgCgMgGgMQgGgLgLgGQgJgGgJAAQgSAAgPAQg");
	this.shape_12.setTransform(111.75,38.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#666666").s().p("Ag2BJQgYgaAAgsQAAgwAYgbQAZgbAkAAQAgAAAUAWQAUAUAAAjIiAAAQgBAoAVAZQAUAYAbAAQASgBAOgJQAOgLAJgYIAGADQgEAdgUAXQgVAWgfAAQghAAgYgagAghhHQgOANgCAYIBWAAQgCgSgDgHQgFgMgKgGQgKgHgKAAQgRAAgNANg");
	this.shape_13.setTransform(91.35,43);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#666666").s().p("AhDBhIAAgIQAOAAAIgEQAEgDADgIQABgDAAgQIAAhIQAAghgBgGQgCgHgDgCQgEgDgFAAQgHAAgIADIgCgIIA5gXIAIAAIAAArQAXgrAZAAQALAAAIAHQAHAHAAAJQAAAIgGAGQgEAFgIAAQgHAAgJgHQgJgHgFAAQgDAAgEAEQgKAJgJATIAABZQABAPADAIQACAGAHAEQAHADAMAAIAAAIg");
	this.shape_14.setTransform(75.1,42.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#666666").s().p("AhgBeQgcgmAAgzQAAgqATgiQASgjAhgTQAhgUAlAAQAfABAdAPQAJAEADAAQAGAAAEgEQAFgFACgLIAIAAIAGBfIgGAAQgNgqgYgTQgXgSghAAQgbgBgWAOQgXAPgMAeQgNAfAAAtQAAAmAMAbQAMAcAYAPQAYAOAfAAQAbABAUgMQAVgMAZgiIAGAEQgVAlgbARQgcARgnAAQhEAAgmgzg");
	this.shape_15.setTransform(53.875,38.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1.8,204,77.8);


(lib.button_continue = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEBIQgGgEgCgHQgBgHgBgRIAAg3IgOAAIAAgUIAOAAIAAgRIAWgVIAAAmIAVAAIAAAUIgVAAIAAA2QAAANACAEQAAADAHAAQAGAAAGgDIAAAVQgJADgIAAQgLAAgFgFg");
	this.shape.setTransform(95.6,26.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAIA5IAAgUIAQAAIgYgZIgUAZIAOAAIAAAUIg3AAIAAgUIAQAAIAjglIghgkIgPAAIAAgUIA1AAIAAAUIgOAAIATAWIAUgWIgMAAIAAgUIA2AAIAAAUIgTAAIgfAjIAjAmIAPAAIAAAUg");
	this.shape_1.setTransform(79.35,27.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgpAsQgSgQAAgcQAAgZASgRQASgRAXAAQAWAAATAQQASARABAgIheAAQACAPAKAKQAKAKAPAAQAYgBANgSIAUAIQgKAQgPAHQgPAHgRAAQgZAAgTgQgAgWghQgKAJgBAOIBGAAQgCgMgKgKQgLgJgOAAQgNAAgJAIg");
	this.shape_2.setTransform(60.05,27.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAYA5IAAhJQAAgMgEgFQgEgDgGAAQgNAAgTAOIAAA7IATAAIAAAUIg9AAIAAgUIAUAAIAAhIIgUAAIAAgUIAqAAIAAAOQAVgPARAAQALAAAHAEQAHAFADAJQACAHAAAPIAAA1IATAAIAAAUg");
	this.shape_3.setTransform(40.625,27.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().ls(["#000000","#000000"],[0,1],-64.8,0,64.8,0).ss(4,1,1).p("AlikQILFAAQBxAABQBQQBQBQAABwIAAAAQAABxhQBQQhQBQhxAAIrFAAQhxAAhQhQQhQhQAAhxIAAAAQAAhwBQhQQBQhQBxAAg");
	this.shape_4.setTransform(62.825,27.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AliERQhxAAhQhQQhQhQAAhxIAAAAQAAhwBQhQQBQhQBxAAILFAAQBxAABQBQQBQBQAABwIAAAAQAABxhQBQQhQBQhxAAg");
	this.shape_5.setTransform(62.825,27.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgEBIQgGgEgCgHQgBgHgBgRIAAg3IgOAAIAAgUIAOAAIAAgRIAWgVIAAAmIAVAAIAAAUIgVAAIAAA2QAAANACAEQAAADAHAAQAGAAAGgDIAAAVQgJADgIAAQgLAAgFgFg");
	this.shape_6.setTransform(95.6,26.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAIA5IAAgUIAQAAIgYgZIgUAZIAOAAIAAAUIg3AAIAAgUIAQAAIAjglIghgkIgPAAIAAgUIA1AAIAAAUIgOAAIATAWIAUgWIgMAAIAAgUIA2AAIAAAUIgTAAIgfAjIAjAmIAPAAIAAAUg");
	this.shape_7.setTransform(79.35,27.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgpAsQgSgQAAgcQAAgZASgRQASgRAXAAQAWAAATAQQASARABAgIheAAQACAPAKAKQAKAKAPAAQAYgBANgSIAUAIQgKAQgPAHQgPAHgRAAQgZAAgTgQgAgWghQgKAJgBAOIBGAAQgCgMgKgKQgLgJgOAAQgNAAgJAIg");
	this.shape_8.setTransform(60.05,27.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAYA5IAAhJQAAgMgEgFQgEgDgGAAQgNAAgTAOIAAA7IATAAIAAAUIg9AAIAAgUIAUAAIAAhIIgUAAIAAgUIAqAAIAAAOQAVgPARAAQALAAAHAEQAHAFADAJQACAHAAAPIAAA1IATAAIAAAUg");
	this.shape_9.setTransform(40.625,27.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("Ag2A+QgCgFAAgMIAAhZQAAgUALgCQAFgBAFAGQAEAFACAHQADgJAHgGQAIgGAJgBQAJgBAQAGQARAJAHAKQAJAOgBAaIAAAUQgBAMACAJIABAMQAAAHgCADQgFAFgHgCQgHgBgDgGQgGgIABgRIABgiQAAgQgDgGQgEgHgJgDQgIgEgHABQgaAnACAsQAAARgBADQgEAMgKAAQgJAAgEgLg");
	this.shape_10.setTransform(39.55,29.0433);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0000").s().p("AgEBIQgGgEgCgHQgBgHgBgRIAAg3IgOAAIAAgUIAOAAIAAgRIAWgVIAAAmIAVAAIAAAUIgVAAIAAA2QAAANACAEQAAADAHAAQAGAAAGgDIAAAVQgJADgIAAQgLAAgFgFg");
	this.shape_11.setTransform(95.6,26.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("AAIA5IAAgUIAQAAIgYgZIgUAZIAOAAIAAAUIg3AAIAAgUIAQAAIAjglIghgkIgPAAIAAgUIA1AAIAAAUIgOAAIATAWIAUgWIgMAAIAAgUIA2AAIAAAUIgTAAIgfAjIAjAmIAPAAIAAAUg");
	this.shape_12.setTransform(79.35,27.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("AgpAsQgSgQAAgcQAAgZASgRQASgRAXAAQAWAAATAQQASARABAgIheAAQACAPAKAKQAKAKAPAAQAYgBANgSIAUAIQgKAQgPAHQgPAHgRAAQgZAAgTgQgAgWghQgKAJgBAOIBGAAQgCgMgKgKQgLgJgOAAQgNAAgJAIg");
	this.shape_13.setTransform(60.05,27.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0000").s().p("AAYA5IAAhJQAAgMgEgFQgEgDgGAAQgNAAgTAOIAAA7IATAAIAAAUIg9AAIAAgUIAUAAIAAhIIgUAAIAAgUIAqAAIAAAOQAVgPARAAQALAAAHAEQAHAFADAJQACAHAAAPIAAA1IATAAIAAAUg");
	this.shape_14.setTransform(40.625,27.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_10},{t:this.shape_5},{t:this.shape_4},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_10},{t:this.shape_5},{t:this.shape_4},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,129.7,58.7);


(lib.button_back = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AANCSIAAgIQAIAAADgCQACgCAAgEQAAgFgIgKIg5hKIAAA/QAAASADAFQADAGAEADQAFACAQAAIAAAIIhfAAIAAgIQAOAAAHgDQAFgCACgFQACgHAAgQIAAirQABgggCgHQgBgIgDgCQgEgDgFAAQgFAAgIADIgDgHIA4gXIAIAAIAAC6IAvgrQAQgNACgEQACgDAAgCQAAgEgEgDQgDgDgIgBIAAgGIBSAAIAAAGQgRABgLAFQgMAEgNAMIgvAsIAvA9QAVAZAGAHQAKAJAIADQAEACANAAIAAAIg");
	this.shape.setTransform(166.4,41.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag2BJQgYgbAAguQAAgrAagcQAagcAkAAQAcABASAPQASAOAAAPQAAAIgFAGQgFAEgJAAQgMAAgHgIQgDgEgBgMQgBgMgHgHQgIgFgNAAQgTgBgMAPQgRAVAAAgQAAAiARAZQAQAaAbAAQAVAAAQgOQALgJAKgZIAGADQgIAlgVAUQgXATgbAAQgeAAgYgag");
	this.shape_1.setTransform(146.3,46.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_2.setTransform(128.325,46.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ah8CLIAAgHIALAAQARgBAIgKQAEgIAAgXIAAizQAAgagGgGQgIgJgPAAIgLAAIAAgIIB4AAQAhAAAUAFQAfAHAQATQAQASAAAZQAAAVgMAQQgNARgZAIQAdAFAOAOQAUATAAAbQAAAUgNAUQgNASgXAKQgXAIgvAAgAgeAEIgPABIAAByQAYAFAXAAQAkAAAUgQQAUgRgBgYQAAgRgIgPQgJgPgUgIQgUgJgcAAIgWABgAgth4IAABrIASADIAWAAQAcAAAQgHQAPgGAHgOQAJgNgBgPQAAgZgUgRQgUgSgkAAQgVAAgRAFg");
	this.shape_3.setTransform(103.5,42.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("AurmZIdXAAQClAAB1B1QB2B2AAClIAAATQAAClh2B2Qh1B1ilAAI9XAAQilAAh2h1Qh1h2AAilIAAgTQAAilB1h2QB2h1ClAAg");
	this.shape_4.setTransform(133.975,41);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AurGaQilAAh2h2Qh1h0AAimIAAgTQAAilB1h2QB2h1ClAAIdXAAQClAAB1B1QB2B2AAClIAAATQAACmh2B0Qh1B2ilAAg");
	this.shape_5.setTransform(133.975,41);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF00").s().p("AANCSIAAgIQAIAAADgCQACgCAAgEQAAgFgIgKIg5hKIAAA/QAAASADAFQADAGAEADQAFACAQAAIAAAIIhfAAIAAgIQAOAAAHgDQAFgCACgFQACgHAAgQIAAirQABgggCgHQgBgIgDgCQgEgDgFAAQgFAAgIADIgDgHIA4gXIAIAAIAAC6IAvgrQAQgNACgEQACgDAAgCQAAgEgEgDQgDgDgIgBIAAgGIBSAAIAAAGQgRABgLAFQgMAEgNAMIgvAsIAvA9QAVAZAGAHQAKAJAIADQAEACANAAIAAAIg");
	this.shape_6.setTransform(166.4,41.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF00").s().p("Ag2BJQgYgbAAguQAAgrAagcQAagcAkAAQAcABASAPQASAOAAAPQAAAIgFAGQgFAEgJAAQgMAAgHgIQgDgEgBgMQgBgMgHgHQgIgFgNAAQgTgBgMAPQgRAVAAAgQAAAiARAZQAQAaAbAAQAVAAAQgOQALgJAKgZIAGADQgIAlgVAUQgXATgbAAQgeAAgYgag");
	this.shape_7.setTransform(146.3,46.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("AhIBVQgMgNAAgWQAAgNAGgLQAIgNAVgNQAVgLAvgSIAAgHQAAgcgJgLQgJgKgQAAQgMAAgIAHQgIAHAAAJIABAMQAAAJgFAFQgFAFgIAAQgHAAgFgFQgFgFAAgJQAAgSASgPQASgPAhAAQAYAAAQAJQAMAGAFAOQAEAIAAAcIAAA/QAAAaABAHQABAGADACQACACADAAQADAAADgCQAEgCAMgNIAAAMQgXAegVAAQgKAAgGgHQgFgHgBgQQgcAWgHAEQgLAFgNAAQgTAAgNgOgAgUAAQgQAJgHAKQgHAKAAAMQAAAOAJAKQAJAKALAAQAQAAAYgVIAAhGQgeAMgJAEg");
	this.shape_8.setTransform(128.325,46.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("Ah8CLIAAgHIALAAQARgBAIgKQAEgIAAgXIAAizQAAgagGgGQgIgJgPAAIgLAAIAAgIIB4AAQAhAAAUAFQAfAHAQATQAQASAAAZQAAAVgMAQQgNARgZAIQAdAFAOAOQAUATAAAbQAAAUgNAUQgNASgXAKQgXAIgvAAgAgeAEIgPABIAAByQAYAFAXAAQAkAAAUgQQAUgRgBgYQAAgRgIgPQgJgPgUgIQgUgJgcAAIgWABgAgth4IAABrIASADIAWAAQAcAAAQgHQAPgGAHgOQAJgNgBgPQAAgZgUgRQgUgSgkAAQgVAAgRAFg");
	this.shape_9.setTransform(103.5,42.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,270,84);


(lib.lv2_platforms = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lv2_platform("synched",0);
	this.instance.setTransform(1829.05,122.3,2.7412,0.6605,0,0,0,71.6,28.4);

	this.instance_1 = new lib.lv2_platform("synched",0);
	this.instance_1.setTransform(1530.5,146.1,0.5688,0.5374,0,0,0,71.5,28.4);

	this.instance_2 = new lib.lv2_platform("synched",0);
	this.instance_2.setTransform(1388.55,195.6,0.5688,0.5374,0,0,0,71.5,28.4);

	this.instance_3 = new lib.lv2_platform("synched",0);
	this.instance_3.setTransform(1138.85,257,1.77,1,0,0,0,71.5,28.4);

	this.instance_4 = new lib.lv2_platform("synched",0);
	this.instance_4.setTransform(787.2,87.6,1.095,1,0,0,0,71.5,28.4);

	this.instance_5 = new lib.lv2_platform("synched",0);
	this.instance_5.setTransform(476.35,200.15,1.525,1,0,0,0,71.5,28.4);

	this.instance_6 = new lib.lv2_platform("synched",0);
	this.instance_6.setTransform(216.85,257,1,1,0,0,0,71.5,28.4);

	this.instance_7 = new lib.lv2_platform("synched",0);
	this.instance_7.setTransform(71.5,257,1,1,0,0,0,71.5,28.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,57.1,2030.6,231.20000000000002);


(lib.level1_platforms = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lv1_platform("synched",0);
	this.instance.setTransform(1442.05,56.35,1,1,0,0,0,86.5,18.8);

	this.instance_1 = new lib.lv1_platform("synched",0);
	this.instance_1.setTransform(1184.45,56.35,1,1,0,0,0,86.5,18.8);

	this.instance_2 = new lib.lv1_platform("synched",0);
	this.instance_2.setTransform(903.95,97.85,1,1,0,0,0,86.5,18.8);

	this.instance_3 = new lib.lv1_platform("synched",0);
	this.instance_3.setTransform(627.85,18.8,1,1,0,0,0,86.5,18.8);

	this.instance_4 = new lib.lv1_platform("synched",0);
	this.instance_4.setTransform(266.6,97.85,1,1,0,0,0,86.5,18.8);

	this.instance_5 = new lib.lv1_platform("synched",0);
	this.instance_5.setTransform(93.55,97.85,1,1,0,0,0,86.5,18.8);

	this.instance_6 = new lib.lv1_platform("synched",0);
	this.instance_6.setTransform(-82.4,97.85,1,1,0,0,0,86.5,18.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.9,-2,1701.5,120.6);


(lib.Level_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lv2_platforms("synched",0);
	this.instance.setTransform(1811.6,377.1,1,1,0,0,0,902.4,113.1);

	this.instance_1 = new lib.Lv2_background();
	this.instance_1.setTransform(1468.2,409.85,1,1,0,0,0,1468.2,296.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF99").s().p("EjlZA+XMAAAh8tMHKzAAAMAAAB8tg");
	this.shape.setTransform(1468.325,399.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Level_2, new cjs.Rectangle(0,0,2937.8,798.3), null);


(lib.Level_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.level1_platforms();
	this.instance.setTransform(1646.7,550.05,1,1,0,0,0,848.8,58.3);

	this.instance_1 = new lib.L1_Background();
	this.instance_1.setTransform(1198.4,328.4,1,1,0,0,0,1198.4,328.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Level_1, new cjs.Rectangle(0,0,2396.9,657), null);


(lib.leveeel3_platforms = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.levveeeel3_plataform("synched",0);
	this.instance.setTransform(3255,135.15,1,1,0,0,0,85.4,48.4);

	this.instance_1 = new lib.levveeeel3_plataform("synched",0);
	this.instance_1.setTransform(3151.4,135.15,1,1,0,0,0,85.4,48.4);

	this.instance_2 = new lib.levveeeel3_plataform("synched",0);
	this.instance_2.setTransform(3047.3,135.15,1,1,0,0,0,85.4,48.4);

	this.instance_3 = new lib.levveeeel3_plataform("synched",0);
	this.instance_3.setTransform(2940.95,135.15,1,1,0,0,0,85.4,48.4);

	this.instance_4 = new lib.levveeeel3_plataform("synched",0);
	this.instance_4.setTransform(2833.9,135.15,1,1,0,0,0,85.4,48.4);

	this.instance_5 = new lib.levveeeel3_plataform("synched",0);
	this.instance_5.setTransform(2481.6,178.65,1,1,0,0,0,85.4,48.4);

	this.instance_6 = new lib.levveeeel3_plataform("synched",0);
	this.instance_6.setTransform(2376.15,178.65,1,1,0,0,0,85.4,48.4);

	this.instance_7 = new lib.levveeeel3_plataform("synched",0);
	this.instance_7.setTransform(2132.1,178.65,1,1,0,0,0,85.4,48.4);

	this.instance_8 = new lib.levveeeel3_plataform("synched",0);
	this.instance_8.setTransform(2023.6,178.65,1,1,0,0,0,85.4,48.4);

	this.instance_9 = new lib.levveeeel3_plataform("synched",0);
	this.instance_9.setTransform(1922.35,128.15,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_10 = new lib.levveeeel3_plataform("synched",0);
	this.instance_10.setTransform(1863.65,128.15,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_11 = new lib.levveeeel3_plataform("synched",0);
	this.instance_11.setTransform(1807.4,128.15,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_12 = new lib.levveeeel3_plataform("synched",0);
	this.instance_12.setTransform(1750,128.15,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_13 = new lib.levveeeel3_plataform("synched",0);
	this.instance_13.setTransform(1604.55,84.65,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_14 = new lib.levveeeel3_plataform("synched",0);
	this.instance_14.setTransform(1452.5,33.1,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_15 = new lib.levveeeel3_plataform("synched",0);
	this.instance_15.setTransform(1251.9,33.1,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_16 = new lib.levveeeel3_plataform("synched",0);
	this.instance_16.setTransform(1063.65,33.1,0.5346,0.6825,0,0,0,85.4,48.5);

	this.instance_17 = new lib.levveeeel3_plataform("synched",0);
	this.instance_17.setTransform(877.1,48.4,1,1,0,0,0,85.4,48.4);

	this.instance_18 = new lib.levveeeel3_plataform("synched",0);
	this.instance_18.setTransform(770.4,48.4,1,1,0,0,0,85.4,48.4);

	this.instance_19 = new lib.levveeeel3_plataform("synched",0);
	this.instance_19.setTransform(552.05,127.1,1,1,0,0,0,85.4,48.4);

	this.instance_20 = new lib.levveeeel3_plataform("synched",0);
	this.instance_20.setTransform(442.8,127.1,1,1,0,0,0,85.4,48.4);

	this.instance_21 = new lib.levveeeel3_plataform("synched",0);
	this.instance_21.setTransform(196.15,178.65,1,1,0,0,0,85.4,48.4);

	this.instance_22 = new lib.levveeeel3_plataform("synched",0);
	this.instance_22.setTransform(85.4,178.65,1,1,0,0,0,85.4,48.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,3288.6,185.8);


(lib.character_titlescreen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mouth_tween("synched",0);
	this.instance.setTransform(134.75,220.1);

	this.instance_1 = new lib.Character_ViewTween("synched",0);
	this.instance_1.setTransform(122.3,243.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,0,246.6,488.8);


(lib.Level_33333333 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.leveeel3_platforms("synched",0);
	this.instance.setTransform(4043.95,469.75,1,1,0,0,0,1642.3,90.9);

	this.instance_1 = new lib.lvl3_bg("synched",0);
	this.instance_1.setTransform(2804.3,370.95,1,1,0,0,0,2804.3,231);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000066").s().p("Egu4Au5MAAAhdxMBdxAAAMAAABdxg");
	this.shape.setTransform(400.75,300.125,1.3348,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("Egu4Au5MAAAhdxMBdxAAAMAAABdxg");
	this.shape_1.setTransform(5208,300.125,1.3348,1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("Egu4Au5MAAAhdxMBdxAAAMAAABdxg");
	this.shape_2.setTransform(1201.95,300.125,1.3348,1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000066").s().p("Egu4Au5MAAAhdxMBdxAAAMAAABdxg");
	this.shape_3.setTransform(4406.8,300.125,1.3348,1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000066").s().p("Egu4Au5MAAAhdxMBdxAAAMAAABdxg");
	this.shape_4.setTransform(2003.15,300.125,1.3348,1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000066").s().p("Egu4Au5MAAAhdxMBdxAAAMAAABdxg");
	this.shape_5.setTransform(3605.6,300.125,1.3348,1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000066").s().p("Egu4Au5MAAAhdxMBdxAAAMAAABdxg");
	this.shape_6.setTransform(2804.35,300.125,1.3348,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Level_33333333, new cjs.Rectangle(0,0,5688.3,602), null);


(lib.level_3nerfed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.levveeeel3_plataform("synched",0);
	this.instance.setTransform(3734.3,404.9,1,1,0,0,0,57.5,25.8);

	this.instance_1 = new lib.levveeeel3_plataform("synched",0);
	this.instance_1.setTransform(3541.95,404.9,1,1,0,0,0,57.5,25.8);

	this.instance_2 = new lib.Level_33333333();
	this.instance_2.setTransform(2844.1,300.9,1,1,0,0,0,2844.1,300.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.level_3nerfed, new cjs.Rectangle(0,0,5688.3,602), null);


// stage content:
(lib._15_Aufa_Speedrun_parkour_Project = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {pit:274};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,24,49,50,130,242,274,275,298,383,424,425,446,486,805,815,824,835,844,845,1474,1476,1479,1481,1484];
	this.streamSoundSymbolsList[50] = [{id:"pixelpionsentinel455122wav",startFrame:50,endFrame:274,loop:1,offset:0}];
	this.streamSoundSymbolsList[275] = [{id:"djartmusicbestgameconsole301284wav",startFrame:275,endFrame:424,loop:1,offset:0}];
	this.streamSoundSymbolsList[425] = [{id:"djartmusicsohappywithmy8bitgame301275",startFrame:425,endFrame:794,loop:1,offset:0}];
	this.streamSoundSymbolsList[845] = [{id:"freesound_communityhorrorambient14590wav",startFrame:845,endFrame:1474,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Click to Go to Web Page
		This button will go to my YouTube channel. 
		It uses the URL that I put in and opens a new tab.
		*/
		
		this.button_Social.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			window.open("https://www.youtube.com/@Aufasans10", "_blank");
		}
		
		/* Click to Go to Web Page
		This button will open a tab to the school's website.
		It helps to show what the school has done.
		*/
		
		this.Button_School.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			window.open("https://www.spectra.edu.sg/", "_blank");
		}
	}
	this.frame_24 = function() {
		/* Stop at This Frame
		It will stop here to let the player see what is around the title
		screen.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		When the player clicks on button_start, it will send them to the
		instructions screen to explain how the game works.
		*/
		
		this.button_start.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_5()
		{
			this.gotoAndPlay(26);
		}
	}
	this.frame_49 = function() {
		/* Click to Go to Frame and Play
		There will be two buttons that is given to the player. The player
		can decide to quit or play through the 3 levels setted up.
		This button will send the player back to the start screen.
		*/
		
		this.button_quit.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(0);
		}
		/* Stop at This Frame
		Once everything is shown here, it will stop here to give the player
		their decision to play or not.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		If the player decides to continue, they are sent to the first
		level, being a tutorial to teach how the mechanic works.
		*/
		
		this.button_levelStart.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_8.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_8()
		{
			this.gotoAndPlay(51);
		}
	}
	this.frame_50 = function() {
		var soundInstance = playSound("pixelpionsentinel455122wav",0);
		this.InsertIntoSoundStreamData(soundInstance,50,274,1);
	}
	this.frame_130 = function() {
		/* Stop at This Frame
		Gives the player time to click jump.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Once clicked, it will change the animation into the player jumping to land
		on the platform.
		*/
		
		this.button_jump.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_27.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_27()
		{
			this.gotoAndPlay(132);
		}
	}
	this.frame_242 = function() {
		/* Stop at This Frame
		Stops here for playing to react.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Same thing at frame 131, it will change the animation to the jump
		animation.
		*/
		
		this.button_jump.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_28.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_28()
		{
			this.gotoAndPlay(244);
		}
	}
	this.frame_274 = function() {
		/* Stop at This Frame
		Once the level has finished, they have no way to quit except
		to continue playing through.
		*/
		
		this.stop();
		
		/* Fade In Movie Clip
		Once the level has stopped, the win message shows up, congratulating
		the player.
		*/
		
		var win_message_FadeInCbk = fl_FadeSymbolIn.bind(this);
		this.addEventListener('tick', win_message_FadeInCbk);
		this.win_message.alpha = 0;
		
		function fl_FadeSymbolIn()
		{
			this.win_message.alpha += 0.05;
			if(this.win_message.alpha >= 1)
			{
				this.removeEventListener('tick', win_message_FadeInCbk);
			}
		}
		
		
		/* Click to Go to Frame and Play
		There will be a button to continue to the next level, and they have
		to immediately get into it.
		*/
		
		this.button_continue.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_9.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_9()
		{
			this.gotoAndPlay(276);
		}
	}
	this.frame_275 = function() {
		var soundInstance = playSound("djartmusicbestgameconsole301284wav",0);
		this.InsertIntoSoundStreamData(soundInstance,275,424,1);
	}
	this.frame_298 = function() {
		/* Stop at This Frame
		Player needs to click the jump button.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Once clicked, Player jumps to platform.
		*/
		
		this.button_jump.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_29.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_29()
		{
			this.gotoAndPlay(300);
		}
	}
	this.frame_383 = function() {
		/* Stop at This Frame
		Player needs to react.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Once clicked, changes animation.
		*/
		
		this.button_jump.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_30.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_30()
		{
			this.gotoAndPlay(385);
		}
	}
	this.frame_424 = function() {
		/* Stop at This Frame
		Stops after the player reached the end.
		*/
		
		this.stop();
		
		/* Fade In Movie Clip
		When the player clears the level, it will fade in a win message.
		*/
		
		var win_message_FadeInCbk = fl_FadeSymbolIn_2.bind(this);
		this.addEventListener('tick', win_message_FadeInCbk);
		this.win_message.alpha = 0;
		
		function fl_FadeSymbolIn_2()
		{
			this.win_message.alpha += 0.01;
			if(this.win_message.alpha >= 1)
			{
				this.removeEventListener('tick', win_message_FadeInCbk);
			}
		}
		
		/* Click to Go to Frame and Play
		There will be a button to continue on to the next level.
		*/
		
		this.button_continue.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_10.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_10()
		{
			this.gotoAndPlay(426);
		}
	}
	this.frame_425 = function() {
		var soundInstance = playSound("djartmusicsohappywithmy8bitgame301275",0);
		this.InsertIntoSoundStreamData(soundInstance,425,794,1);
	}
	this.frame_446 = function() {
		/* Stop at This Frame
		Stops to let the player react.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Once clicked, changes to jump animation.
		*/
		
		this.button_jump.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_33.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_33()
		{
			this.gotoAndPlay(448);
		}
	}
	this.frame_486 = function() {
		/* Stop at This Frame
		Stops to let player react.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Once clicked, player jumps.
		*/
		
		this.button_jump.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_34.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_34()
		{
			this.gotoAndPlay(488);
		}
	}
	this.frame_805 = function() {
		/* Stop at This Frame
		Stops everything and starts dialogue.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		When button pressed, the level starts to break apart and it will keep doing it
		until it becomes black.
		*/
		
		this.button_dialogue.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_11.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_11()
		{
			this.gotoAndPlay(807);
		}
	}
	this.frame_815 = function() {
		/* Stop at This Frame
		Stops everything and wait for the players response.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Continues the dialogue if the player clicks the button.
		*/
		
		this.button_dialogue.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_13.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_13()
		{
			this.gotoAndPlay(817);
		}
	}
	this.frame_824 = function() {
		/* Stop at This Frame
		Stops and waits for the player to press the button.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		When button pressed, it executes the next ACT.
		*/
		
		this.button_dialogue.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_12.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_12()
		{
			this.gotoAndPlay(826);
		}
	}
	this.frame_835 = function() {
		/* Play a Movie Clip
		Plays the jumpscare.
		*/
		
		this.jumpscare_1.play();
	}
	this.frame_844 = function() {
		/* Stop at This Frame
		stops the animation and moves on to the execution.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		The text will be clickable and will proceed with the next execution.
		*/
		
		this.button_end.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_14.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_14()
		{
			this.gotoAndPlay(846);
		}
		
		
		/* Stop a Movie Clip
		Stops the jumpscare at frame 845
		*/
		
		this.jumpscare_1.stop();
	}
	this.frame_845 = function() {
		var soundInstance = playSound("freesound_communityhorrorambient14590wav",0);
		this.InsertIntoSoundStreamData(soundInstance,845,1474,1);
	}
	this.frame_1474 = function() {
		/* Stop at This Frame
		Indicates the end of the animation.
		*/
		
		this.stop();
		
		
		/* Click to Go to Frame and Play
		Restarts to the title screen.
		*/
		
		this.button_return.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_16.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_16()
		{
			this.gotoAndPlay(1);
		}
		
		
		/* Click to Go to Frame and Play
		Goes to the credits screen.
		*/
		
		this.button_credits.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_17.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_17()
		{
			this.gotoAndPlay(1476);
		}
		
		this.end_text.stop();
	}
	this.frame_1476 = function() {
		/* Click to Go to Frame and Play
		When clicked, returns back to the end screen but the credits button is gone.
		*/
		
		this.button_back.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_24.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_24()
		{
			this.gotoAndPlay(1482);
		}
	}
	this.frame_1479 = function() {
		/* Stop at This Frame
		Stops here for credits scene.
		*/
		
		this.stop();
	}
	this.frame_1481 = function() {
		/* Stop at This Frame
		Indicates the end of the animation.
		*/
		
		this.stop();
		
		
		/* Click to Go to Frame and Play
		Restarts to the title screen.
		*/
		
		this.button_return.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_16.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_16()
		{
			this.gotoAndPlay(1);
		}
		
		
		/* Click to Go to Frame and Play
		Goes to the credits screen.
		*/
		
		this.button_credits.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_17.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_17()
		{
			this.gotoAndPlay(1476);
		}
		
		this.end_text.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_return.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_25.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_25()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_1484 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.button_return.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_26.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_26()
		{
			this.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(24).call(this.frame_24).wait(25).call(this.frame_49).wait(1).call(this.frame_50).wait(80).call(this.frame_130).wait(112).call(this.frame_242).wait(32).call(this.frame_274).wait(1).call(this.frame_275).wait(23).call(this.frame_298).wait(85).call(this.frame_383).wait(41).call(this.frame_424).wait(1).call(this.frame_425).wait(21).call(this.frame_446).wait(40).call(this.frame_486).wait(319).call(this.frame_805).wait(10).call(this.frame_815).wait(9).call(this.frame_824).wait(11).call(this.frame_835).wait(9).call(this.frame_844).wait(1).call(this.frame_845).wait(629).call(this.frame_1474).wait(2).call(this.frame_1476).wait(3).call(this.frame_1479).wait(2).call(this.frame_1481).wait(3).call(this.frame_1484).wait(11));

	// Description
	this.instance = new lib.Description("synched",0);
	this.instance.setTransform(409,290.3,1,1,0,0,0,311.1,175.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(25).to({_off:false},0).wait(5).to({startPosition:0},0).to({alpha:1},19).to({_off:true},1).wait(1445));

	// Instructions_Header
	this.instance_1 = new lib.Instructions("synched",0);
	this.instance_1.setTransform(406.25,28,1,1,0,0,0,223.1,28);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25).to({_off:false},0).to({alpha:1},6).to({_off:true},19).wait(1445));

	// button_end
	this.button_end = new lib.button_end();
	this.button_end.name = "button_end";
	this.button_end.setTransform(393.65,532.05,1,1,0,0,0,118.6,25.2);
	this.button_end._off = true;
	new cjs.ButtonHelper(this.button_end, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_end).wait(844).to({_off:false},0).to({_off:true},1).wait(650));

	// end_text
	this.end_text = new lib.end_text();
	this.end_text.name = "end_text";
	this.end_text.setTransform(415.8,297.7,1,1,0,0,0,162.1,25.2);
	this.end_text._off = true;

	this.timeline.addTween(cjs.Tween.get(this.end_text).wait(845).to({_off:false},0).wait(629).to({_off:true},1).wait(20));

	// Jumpscare_1
	this.jumpscare_1 = new lib.jumpscare_1();
	this.jumpscare_1.name = "jumpscare_1";
	this.jumpscare_1.setTransform(411,120.75,1,1,0,0,0,272.3,7.2);
	this.jumpscare_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.jumpscare_1).wait(835).to({_off:false},0).wait(10).to({_off:true},1).wait(649));

	// dead_player
	this.instance_2 = new lib.dead_player();
	this.instance_2.setTransform(192.9,406.15,1.0847,1.0763,0,21.6985,-9.3648,0.7,13.4);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1474).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false,skewY:-9.3649},0).to({_off:true},4).wait(10));

	// button_return
	this.button_return = new lib.button_return();
	this.button_return.name = "button_return";
	this.button_return.setTransform(404,544,1,1,0,0,0,121,41);
	new cjs.ButtonHelper(this.button_return, 0, 1, 1);

	this.button_back = new lib.button_back();
	this.button_back.name = "button_back";
	this.button_back.setTransform(391.85,544,1,1,0,0,0,133.9,41);
	new cjs.ButtonHelper(this.button_back, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.button_return}]},1474).to({state:[{t:this.button_back}]},1).to({state:[{t:this.button_return}]},6).to({state:[]},4).wait(10));

	// credits_screen
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgMAOQgHgGAAgIQAAgHAHgGQAFgFAHgBQAIABAGAFQAGAGgBAHQABAIgGAGQgGAGgIgBQgHABgFgGg");
	this.shape.setTransform(582.1,447.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgMAOQgHgGAAgIQAAgHAHgGQAFgFAHgBQAIABAGAFQAGAGgBAHQABAIgGAGQgGAGgIgBQgHABgFgGg");
	this.shape_1.setTransform(573.1,447.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAOQgHgGAAgIQAAgHAHgGQAFgFAHgBQAIABAGAFQAGAGgBAHQABAIgGAGQgGAGgIgBQgHABgFgGg");
	this.shape_2.setTransform(564.1,447.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAJBTIAAgGIADAAQALgBAFgDQAEgDACgHQABgDAAgOIAAhAQAAgWgGgKQgGgKgNAAQgUAAgVAXIAABTQAAARACAEQACAFAFACQAEACANABIAAAGIhQAAIAAgGIAEAAQAMgBAFgFQAEgHAAgSIAAg6QAAgdgBgGQgCgHgCgCQgDgDgFAAQgFABgHADIgCgHIAwgUIAIAAIAAAjQAcgjAZAAQANAAAKAHQAJAHAGAPQAEAKAAAWIAABDQAAAQACAGQACAEAEACQAFADALAAIAAAGg");
	this.shape_3.setTransform(550.625,441.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AglB9IAAgGQAMgBAEgCQAEgCADgFQACgFAAgQIAAg+QAAgagCgGQgBgGgDgCQgCgDgFAAQgFABgHADIgCgHIAvgUIAIAAIAACAQAAAQACAFQACAFAFACQAEADALAAIAAAGgAgKhdQgFgGAAgHQAAgIAFgFQAFgFAGAAQAIAAAFAFQAFAFAAAIQAAAHgFAGQgFAEgIAAQgGAAgFgEg");
	this.shape_4.setTransform(536.675,436.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag9BJQgLgLAAgTQAAgMAFgIQAHgMASgLQASgJApgPIAAgHQAAgYgIgJQgIgJgOAAQgKAAgHAGQgGAGAAAIIAAAKQAAAIgFAFQgEAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAPgNQAQgNAcAAQAUAAAOAIQAKAFAGAMQACAHAAAYIAAA1QAAAXABAGQABAFACACQABAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgUAagRAAQgJAAgFgGQgGgGABgOQgYATgHADQgJAFgLAAQgRAAgKgMgAgRAAQgOAIgFAIQgHAJAAAKQABANAHAIQAHAIALAAQAMAAAWgRIAAg9QgaALgIADg");
	this.shape_5.setTransform(524.2,441.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhDBrQgNgJAAgKQAAgEACgEQACgHAKgLIASgTQgJgGgEgEQgEgEAAgGQAAgGAGgIQAEgIASgOQgPgIgHgMQgJgOAAgPQAAgYATgRQASgSAcAAQAWAAARAMIAiAAIAIAAIADACIABAFIgBAHIgCABIgJABIgVAAQAKAMAAAUQAAAWgSAQQgRAQgcAAQgMAAgMgDQgIAHgDAEQgCAFAAADQAAADACADQADADAJABIAYABQAkABAKACQARACAJAKQAKAKAAAOQAAAUgSARQgcAagrAAQgiAAgXgPgAgzA9QgEAIAAAGQAAAJAKAGQARALAhAAQAfAAAPgLQAPgLABgNQAAgJgKgEQgJgEgagBQgngBgWgDQgHAJgFAIgAgchmQgJALAAAVQAAAcANAPQAIAMAOAAQANAAAJgKQAIgKAAgWQAAgcgMgPQgJgMgNAAQgNAAgJAKg");
	this.shape_6.setTransform(506.8,444.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ag+BJQgKgLAAgTQAAgMAFgIQAIgMARgLQASgJApgPIAAgHQgBgYgHgJQgIgJgNAAQgLAAgHAGQgGAGgBAIIAAAKQAAAIgDAFQgFAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAPgNQAQgNAcAAQAUAAAOAIQAKAFAGAMQACAHAAAYIAAA1QAAAXABAGQABAFADACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgUAagSAAQgIAAgFgGQgFgGAAgOQgZATgFADQgKAFgLAAQgQAAgMgMgAgRAAQgOAIgGAIQgFAJgBAKQAAANAIAIQAHAIAKAAQANAAAWgRIAAg9QgaALgIADg");
	this.shape_7.setTransform(490.2,441.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAhBTIAAgiQgUAWgLAGQgKAGgNAAQgNAAgJgIQgLgHgEgNQgDgNAAgWIAAhGQAAgMgDgFQgDgEgEgCQgFgCgMgBIAAgGIA4AAIAABqQAAAXAIAIQAHAGAMAAQAGAAAKgEQAJgFANgNIAAhbQAAgNgEgFQgFgFgRgBIAAgGIA4AAIAABgQAAAcABAHQABAGADACQADADAEAAQAFAAAHgDIADAGIgxAUg");
	this.shape_8.setTransform(463.6,441.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("Ag7A4QgSgYAAgfQAAgVALgWQALgWASgJQASgMATAAQAlAAAWAcQATAYAAAfQAAAVgLAWQgKAWgSALQgSALgWAAQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAZQAOAaAWAAQARAAALgOQALgOAAgiQAAgqgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_9.setTransform(445.575,441.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhIBxQgGgGAAgHQAAgIAEgEQAFgFAJAAQAFAAALAEIAIADQAFAAAHgGQAGgFAGgQIALgcIg5h4IgJgOQgEgGgDgCQgEgDgJgCIAAgGIBLAAIAAAGIgDAAQgIAAgFAEQgEADABAFQgBAHAHAMIAmBRIAjhZQADgHAAgHIgBgFIgEgDIgKgBIAAgGIA0AAIAAAGQgHABgDACQgEACgEAGIgGANIhBCgQgJAYgPALQgQAMgOAAQgLAAgGgGg");
	this.shape_10.setTransform(427.6,445.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgXAfgBQAcAAAQASQASASAAAeIhuAAQAAAjARAVQASAUAWAAQAQAAAMgJQALgJAIgUIAGADQgEAYgRATQgSAVgbgBQgcAAgVgWgAgdg9QgLALgCAVIBKAAQgBgQgEgGQgDgJgKgHQgIgFgJAAQgOAAgMALg");
	this.shape_11.setTransform(401.75,441.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgXAfgBQAcAAAQASQASASAAAeIhuAAQgBAjASAVQASAUAWAAQARAAALgJQAMgJAIgUIAFADQgEAYgRATQgSAVgbgBQgcAAgVgWgAgdg9QgLALgCAVIBJAAQgBgQgCgGQgFgJgJgHQgIgFgJAAQgOAAgMALg");
	this.shape_12.setTransform(385.75,441.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AggBQIgJgBQgEgBgCAFIgGAAIAAg5IAGAAQAEAYAPANQAOAMAPAAQANAAAHgHQAIgHAAgKQAAgMgJgJQgIgIgYgMQgagMgIgLQgIgJAAgPQAAgVAOgNQANgOAWAAQAJAAANAFIAMACQABAAAAAAQABAAAAAAQABAAAAAAQABgBABAAIADgGIAGAAIAAA3IgGAAQgGgZgLgJQgLgKgPAAQgMAAgIAGQgHAHAAAIQAAAKAGAHQAFAHAQAIIAZANQAkAQAAAdQAAAVgRAOQgRANgUAAQgNABgUgGg");
	this.shape_13.setTransform(370.85,441.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Ag7A4QgSgYAAgfQAAgVALgWQALgWASgJQASgMATAAQAlAAAWAcQATAYAAAfQAAAVgLAWQgKAWgSALQgSALgWAAQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAZQAOAaAWAAQARAAALgOQALgOAAgiQAAgqgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_14.setTransform(345.575,441.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHBoQgIgFgDgIQgEgIAAgSIAAhrIgZAAIAAgGQAJgEAKgJQAKgJAJgNQAEgGAFgSIAGAAIAAA1IAlAAIAAAMIglAAIAABnQAAAQAEAGQAFAFAHAAQAGAAAGgEQAFgDADgHIAHAAQgHARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_15.setTransform(331.8,438.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgXAfgBQAbAAASASQARASAAAeIhuAAQgBAjASAVQASAUAXAAQAQAAALgJQAMgJAHgUIAGADQgDAYgTATQgRAVgbgBQgcAAgUgWgAgcg9QgMALgCAVIBKAAQgCgQgDgGQgEgJgIgHQgJgFgIAAQgPAAgLALg");
	this.shape_16.setTransform(309.75,441.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhTB5IAAgGIAEAAQAKAAAGgEQAEgCACgEQABgEAAgSIAAiXQAAgPgBgFQgBgEgDgCQgDgCgGgBQgEABgGACIgDgFIAygVIAHAAIAAAmQAMgVANgJQALgIAOgBQAYAAARATQATAYAAAlQAAApgXAbQgUAWgeAAQgMAAgKgDQgHgDgIgIIAAAxQAAARACAFQACADAFADQAFADAMAAIAAAGgAgFhaQgHADgOAQIAAA7QAAATABAGQADALAJAHQAKAIANAAQASAAALgOQAOgSAAgfQAAglgQgUQgLgOgQAAQgIAAgHAFg");
	this.shape_17.setTransform(291.925,444.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ag7A4QgSgYAAgfQAAgVALgWQALgWASgJQASgMATAAQAlAAAWAcQATAYAAAfQAAAVgLAWQgKAWgSALQgSALgWAAQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAZQAOAaAWAAQARAAALgOQALgOAAgiQAAgqgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_18.setTransform(274.575,441.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAJB9IAAgGIAEAAQALgBAEgDQAFgDABgHIAAgRIAAg4QAAgbgCgHQgDgIgGgEQgGgFgIAAQgJABgIAEQgKAFgNANIAABUQAAARACAEQACAEAFADQAFADAMAAIAAAGIhQAAIAAgGQAMgBAFgDQAEgBACgGQACgFABgPIAAiQQgBgcgBgGQgCgHgCgCQgCgCgGAAQgDAAgJADIgBgGIAvgUIAIAAIAAB2QAUgVALgGQALgHALAAQAOAAAKAIQAKAIAEAPQAEALAAAeIAAA4QAAAQACAGQACAEAEACQAFADAKAAIAAAGg");
	this.shape_19.setTransform(256.6,436.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgyB3IAAgGIAIAAQAPAAAHgJQAEgFAAgWIAAiZQAAgSgCgGQgCgEgGgDQgHgFgJAAIgIAAIAAgGIBlAAIAAAGIgIAAQgPAAgHAJQgEAGAAAVIAACZQAAASACAGQACAEAGAEQAHAEAJAAIAIAAIAAAGg");
	this.shape_20.setTransform(232.6,437.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgNB3QgFgGgBgIQABgIAFgGQAGgFAHgBQAIABAGAFQAFAGAAAIQAAAIgFAGQgGAFgIABQgHgBgGgFgAgCA4IgQiNIgBgOQAAgLAGgGQAGgIAHAAQAIAAAGAIQAGAGAAANIgBAMIgPCNg");
	this.shape_21.setTransform(708.1,395.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgYAfABQAcgBAQATQASARAAAeIhuAAQAAAjARAUQASAVAWAAQAQAAAMgJQALgJAIgVIAGAEQgEAYgRAUQgSATgbABQgcgBgVgWgAgdg9QgLAMgCAUIBKAAQgBgQgEgGQgDgKgJgFQgJgGgJAAQgOAAgMALg");
	this.shape_22.setTransform(694.25,399.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AA6BTIAAgHIAEAAQAKABAGgEQAEgDACgGIAAgRIAAhFQAAgUgEgHQgHgLgPAAQgKgBgJAFQgKAEgNANIAAACIAAAIIAABMQAAAQACAEQACAEAFADQAFACAMAAIAAAHIhQAAIAAgHQANAAAFgCQAFgEACgGQABgDAAgOIAAhFQAAgUgGgIQgHgLgOAAQgKAAgJAFQgPAHgIAKIAABWQAAAQADAEQACAFAEADQAEABAOAAIAAAHIhQAAIAAgHQALAAAEgBQAFgDACgFQACgFAAgPIAAg9QAAgbgBgHQgCgGgCgCQgDgDgEABQgFAAgHACIgDgGIAxgUIAHAAIAAAiIAVgTQAIgIAJgDQAJgEAJAAQAPAAAKAJQALAJAEAQQASgUAMgHQANgHANAAQANAAAKAHQAKAGAGAPQADAKAAAWIAABFQAAAPADAFQABAEAFADQAFACALAAIAAAHg");
	this.shape_23.setTransform(672.175,399.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("Ag9BJQgLgLAAgTQAAgMAFgIQAIgMARgLQASgJAogPIAAgHQABgYgIgJQgIgJgOAAQgLAAgGAGQgHAGAAAIIAAAKQAAAIgDAFQgEAEgHAAQgHAAgEgFQgEgEAAgIQAAgPAQgNQAPgNAcAAQAVAAANAIQALAFAEAMQADAHABAYIAAA1QAAAXABAGQAAAFACACQABAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgTAagTAAQgIAAgFgGQgGgGAAgOQgYATgFADQgKAFgLAAQgRAAgKgMgAgRAAQgNAIgHAIQgFAJAAAKQgBANAIAIQAIAIAJAAQAOAAAUgRIAAg9QgZALgIADg");
	this.shape_24.setTransform(650.7,399.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AhDBrQgOgJAAgKQAAgEACgEQAEgHAJgLIASgTQgJgGgEgEQgEgEAAgGQAAgGAFgIQAFgIASgOQgOgIgJgMQgHgOAAgPQAAgYASgRQASgSAcAAQAWAAARAMIAiAAIAJAAIABACIABAFIgBAHIgBABIgJABIgVAAQAKAMAAAUQAAAWgRAQQgSAQgbAAQgNAAgMgDQgIAHgCAEQgEAFAAADQABADADADQACADAJABIAZABQAjABAKACQARACAKAKQAKAKAAAOQAAAUgTARQgbAagsAAQghAAgYgPgAgzA9QgEAIAAAGQAAAJAKAGQASALAgAAQAgAAAPgLQAPgLAAgNQgBgJgIgEQgJgEgbgBQgngBgVgDQgJAJgEAIgAgchmQgIALgBAVQAAAcAMAPQAKAMAOAAQAMAAAIgKQAJgKAAgWQAAgcgMgPQgJgMgNAAQgNAAgJAKg");
	this.shape_25.setTransform(633.3,403.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgCQAEgEACgHQABgCAAgOIAAhCQAAgVgGgKQgGgKgNAAQgUAAgVAWIAABVQAAAQACAEQACAFAFADQAEABANAAIAAAHIhQAAIAAgHIAEAAQAMABAFgHQAEgGAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgDgFABQgFAAgHACIgCgGIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAPQAEALAAAWIAABEQAAAPACAFQACAFAEACQAFACALAAIAAAHg");
	this.shape_26.setTransform(606.125,399.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAiBTIAAgiQgWAXgKAFQgKAGgMAAQgOAAgKgIQgJgIgFgMQgEgNAAgWIAAhHQAAgLgCgEQgCgFgFgCQgFgCgNAAIAAgHIA5AAIAABrQAAAWAHAHQAIAIALAAQAHAAAJgGQAKgEAOgOIAAhaQgBgNgFgFQgEgFgQAAIAAgHIA3AAIAABhQgBAcACAGQABAGADACQADADADAAQAGAAAHgDIADAGIgwAUg");
	this.shape_27.setTransform(588.1,399.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AhFB9IAAgHIAHAAQAHAAAGgDQAGgEACgGQACgGAAgRIAAhpIgfAAIAAgMIAfAAIAAgLQAAgYAIgRQAHgQAQgKQAPgLAUAAQATAAAPAMQAKAIAAAKQAAAFgEAFQgFAEgFAAQgEAAgFgCQgEgDgHgKQgGgKgGgDQgFgDgHAAQgIAAgFAEQgFAEgDAKQgCAJAAAlIAAAMIAoAAIAAAMIgoAAIAABpQAAAXAFAGQAFAHALAAIAPAAIAAAHg");
	this.shape_28.setTransform(575.625,394.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgYAfABQAcgBAQATQASARAAAeIhuAAQAAAjARAUQASAVAWAAQAQAAAMgJQALgJAIgVIAGAEQgEAYgRAUQgSATgbABQgcgBgVgWgAgdg9QgLAMgCAUIBKAAQgBgQgEgGQgDgKgJgFQgJgGgJAAQgOAAgMALg");
	this.shape_29.setTransform(550.25,399.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AglB9IAAgHQALAAAEgBQAFgDABgFQADgFAAgPIAAiSQAAgbgCgGQgBgGgCgCQgDgDgEAAQgFAAgHADIgDgHIAvgTIAIAAIAADVQAAAPADAFQACAEAEADQAEACANAAIAAAHg");
	this.shape_30.setTransform(537.25,394.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgHBoQgIgFgEgIQgDgIAAgSIAAhrIgZAAIAAgGQAJgEAKgJQALgJAHgNQAEgGAGgSIAGAAIAAA1IAlAAIAAAMIglAAIAABnQAAAQAFAGQAEAFAHAAQAGAAAFgEQAFgDAEgHIAHAAQgHARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_31.setTransform(527.3,396.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgHBoQgIgFgEgIQgDgIAAgSIAAhrIgZAAIAAgGQAJgEAKgJQALgJAHgNQAEgGAGgSIAGAAIAAA1IAlAAIAAAMIglAAIAABnQAAAQAEAGQAFAFAHAAQAGAAAFgEQAFgDAEgHIAHAAQgHARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_32.setTransform(517.3,396.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgBQAEgDADgFQACgFAAgPIAAg+QAAgagCgIQgBgFgDgCQgCgDgFABQgFAAgHACIgCgGIAvgUIAIAAIAACBQAAAPACAFQACAFAFACQAEACALAAIAAAHgAgKheQgFgFAAgHQAAgHAFgFQAFgGAGAAQAIAAAFAGQAFAFAAAHQAAAHgFAFQgFAGgIAAQgGAAgFgGg");
	this.shape_33.setTransform(507.175,394.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAADgBQAFgDACgFQACgFAAgPIAAiSQAAgbgBgGQgBgGgDgCQgDgDgEAAQgFAAgHADIgDgHIAvgTIAIAAIAADVQAAAPACAFQADAEAEADQAFACAMAAIAAAHg");
	this.shape_34.setTransform(497.25,394.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgfBQIgKgBQgEAAgCAEIgGAAIAAg6IAGAAQAEAZAOAMQAOANAQAAQAMAAAJgHQAHgHAAgKQAAgNgIgHQgJgJgYgNQgagLgIgKQgIgLAAgPQAAgTAOgOQAOgNAVAAQAJgBANAFIAMADQABAAAAgBQABAAAAAAQABAAAAAAQABgBAAAAIAEgFIAGAAIAAA3IgGAAQgHgagKgJQgLgKgPAAQgMAAgIAHQgHAGAAAIQAAAKAFAHQAGAHARAIIAYAMQAkARAAAcQAAAXgQANQgSAOgUAAQgOgBgSgFg");
	this.shape_35.setTransform(476.35,399.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgBQAEgDADgFQACgFAAgPIAAg+QAAgagCgIQgBgFgDgCQgCgDgFABQgFAAgHACIgCgGIAvgUIAIAAIAACBQAAAPACAFQACAFAFACQAEACALAAIAAAHgAgKheQgFgFAAgHQAAgHAFgFQAFgGAGAAQAIAAAFAGQAFAFAAAHQAAAHgFAFQgFAGgIAAQgGAAgFgGg");
	this.shape_36.setTransform(464.175,394.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAJB9IAAgHIAEAAQALAAAEgCQAFgEABgHIAAgQIAAg6QAAgZgCgIQgDgIgGgFQgGgDgIAAQgJgBgIAFQgKAEgNANIAABWQAAAQACAEQACAEAFADQAFACAMAAIAAAHIhQAAIAAgHQAMAAAFgCQAEgCACgFQACgFABgPIAAiRQgBgbgBgHQgCgGgCgCQgCgDgGAAQgDAAgJADIgBgHIAvgTIAIAAIAAB2QAUgWALgFQALgHALAAQAOAAAKAIQAKAHAEARQAEAKAAAdIAAA6QAAAPACAFQACAFAEACQAFACAKAAIAAAHg");
	this.shape_37.setTransform(450.1,394.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgHBoQgIgFgEgIQgDgIAAgSIAAhrIgZAAIAAgGQAJgEAKgJQALgJAHgNQAEgGAGgSIAGAAIAAA1IAlAAIAAAMIglAAIAABnQAAAQAEAGQAFAFAHAAQAGAAAFgEQAFgDAEgHIAHAAQgHARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_38.setTransform(436.3,396.875);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AhDBrQgNgJAAgKQAAgEACgEQACgHAKgLIASgTQgJgGgEgEQgEgEAAgGQAAgGAGgIQAEgIATgOQgQgIgHgMQgJgOAAgPQAAgYATgRQASgSAcAAQAWAAARAMIAiAAIAIAAIADACIABAFIgBAHIgCABIgJABIgVAAQAKAMAAAUQAAAWgSAQQgRAQgcAAQgMAAgMgDQgIAHgDAEQgDAFAAADQAAADADADQAEADAIABIAYABQAkABALACQAQACAJAKQALAKAAAOQgBAUgSARQgcAagrAAQgiAAgXgPgAgzA9QgEAIAAAGQAAAJAKAGQARALAhAAQAfAAAPgLQAQgLgBgNQABgJgKgEQgJgEgbgBQgmgBgWgDQgHAJgFAIgAgchmQgJALABAVQAAAcAMAPQAJAMANAAQANAAAJgKQAIgKAAgWQAAgcgMgPQgJgMgNAAQgNAAgJAKg");
	this.shape_39.setTransform(413.3,403.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgCQAEgEACgHQABgCAAgOIAAhCQAAgVgGgKQgGgKgNAAQgUAAgVAWIAABVQAAAQACAEQACAFAFADQAEABANAAIAAAHIhQAAIAAgHIAEAAQAMABAFgHQAEgGAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgDgFABQgFAAgHACIgCgGIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAPQAEALAAAWIAABEQAAAPACAFQACAFAEACQAFACALAAIAAAHg");
	this.shape_40.setTransform(395.125,399.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgBQAEgDADgFQACgFAAgPIAAg+QAAgagCgIQgBgFgDgCQgCgDgFABQgFAAgHACIgCgGIAvgUIAIAAIAACBQAAAPACAFQACAFAFACQAEACALAAIAAAHgAgKheQgFgFAAgHQAAgHAFgFQAFgGAGAAQAIAAAFAGQAFAFAAAHQAAAHgFAFQgFAGgIAAQgGAAgFgGg");
	this.shape_41.setTransform(381.175,394.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AhIBxQgHgGABgHQAAgIAEgEQAFgFAJAAQAGAAAJAEIAJADQAFAAAHgGQAGgFAGgQIALgcIg5h4IgIgOQgFgGgDgCQgEgDgJgCIAAgGIBLAAIAAAGIgDAAQgIAAgFAEQgDADAAAFQAAAHAFAMIAnBRIAkhZQACgHAAgHIgBgFIgEgDIgLgBIAAgGIA1AAIAAAGQgHABgDACQgEACgEAGIgGANIhBCgQgJAYgPALQgPAMgPAAQgLAAgGgGg");
	this.shape_42.setTransform(367.1,403.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("Ag+BJQgKgLAAgTQAAgMAFgIQAIgMARgLQASgJApgPIAAgHQgBgYgHgJQgIgJgNAAQgLAAgHAGQgGAGgBAIIAAAKQAAAIgDAFQgFAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAPgNQAQgNAcAAQAUAAAOAIQAKAFAGAMQACAHAAAYIAAA1QAAAXABAGQABAFADACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgUAagSAAQgIAAgFgGQgFgGAAgOQgZATgFADQgKAFgLAAQgQAAgMgMgAgRAAQgOAIgGAIQgFAJgBAKQAAANAIAIQAHAIAKAAQANAAAWgRIAAg9QgaALgIADg");
	this.shape_43.setTransform(350.7,399.325);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAADgBQAFgDACgFQACgFAAgPIAAiSQAAgbgCgGQgBgGgCgCQgDgDgEAAQgFAAgHADIgDgHIAvgTIAIAAIAADVQAAAPADAFQACAEAEADQAEACANAAIAAAHg");
	this.shape_44.setTransform(337.25,394.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AhTB6IAAgHIAEAAQAKAAAGgDQAEgCACgFQABgEAAgSIAAiXQAAgQgBgEQgBgEgDgCQgDgDgGAAQgEAAgGADIgDgGIAygTIAHAAIAAAlQAMgVANgIQALgKAOABQAYgBARAUQATAXAAAlQAAApgXAbQgUAWgeABQgMAAgKgFQgHgCgIgIIAAAxQAAARACAEQACAFAFADQAFACAMAAIAAAHgAgFhbQgHADgOAQIAAA9QAAASABAGQADALAJAHQAKAIANAAQASAAALgOQAOgSAAggQAAgkgQgUQgLgOgQAAQgIAAgHAEg");
	this.shape_45.setTransform(322.425,403);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("Ag5BTIAAgHQAMAAAGgDQAEgDACgGQABgDAAgOIAAg9QAAgcgBgGQgBgGgDgCQgDgDgFABQgFAAgHACIgCgGIAxgUIAHAAIAAAkQATgkAWAAQAJAAAHAGQAGAGAAAIQAAAGgFAGQgEAEgHAAQgGAAgHgGQgIgGgEAAQgDAAgEADQgHAIgIAQIAABNQAAANADAHQACAEAGAEQAFACALAAIAAAHg");
	this.shape_46.setTransform(299.325,399.15);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("Ag7A5QgSgZAAgfQAAgVALgVQALgWASgLQASgLATABQAlAAAWAcQATAXAAAfQAAAVgLAWQgKAWgSALQgSAMgWAAQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAaQAOAZAWAAQARAAALgOQALgOAAgjQAAgqgSgYQgNgRgSAAQgKAAgJAGg");
	this.shape_47.setTransform(284.075,399.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AhFB9IAAgHIAHAAQAHAAAGgDQAGgEACgGQACgGAAgRIAAhpIgfAAIAAgMIAfAAIAAgLQAAgYAIgRQAHgQAQgKQAPgLAUAAQATAAAPAMQAKAIAAAKQAAAFgEAFQgFAEgFAAQgEAAgFgCQgEgDgHgKQgGgKgGgDQgFgDgHAAQgIAAgFAEQgFAEgDAKQgCAJAAAlIAAAMIAoAAIAAAMIgoAAIAABpQAAAXAFAGQAFAHALAAIAPAAIAAAHg");
	this.shape_48.setTransform(271.625,394.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAiBTIAAgiQgWAXgKAFQgKAGgNAAQgNAAgJgIQgKgIgFgMQgDgNAAgWIAAhHQgBgLgCgEQgCgFgFgCQgFgCgMAAIAAgHIA4AAIAABrQAAAWAIAHQAIAIAKAAQAHAAAJgGQAKgEAOgOIAAhaQgBgNgFgFQgEgFgQAAIAAgHIA3AAIAABhQgBAcACAGQABAGADACQADADADAAQAGAAAHgDIADAGIgxAUg");
	this.shape_49.setTransform(245.1,399.65);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("Ag7A5QgSgZAAgfQAAgVALgVQALgWASgLQASgLATABQAlAAAWAcQATAXAAAfQAAAVgLAWQgKAWgSALQgSAMgWAAQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAaQAOAZAWAAQARAAALgOQALgOAAgjQAAgqgSgYQgNgRgSAAQgKAAgJAGg");
	this.shape_50.setTransform(227.075,399.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AhIBxQgGgGgBgHQAAgIAGgEQAEgFAIAAQAGAAALAEIAIADQAGAAAGgGQAGgFAGgQIAMgcIg6h4IgJgOQgEgGgDgCQgEgDgJgCIAAgGIBLAAIAAAGIgEAAQgIAAgDAEQgFADAAAFQAAAHAHAMIAlBRIAkhZQADgHABgHIgCgFIgEgDIgKgBIAAgGIA0AAIAAAGQgGABgEACQgEACgEAGIgGANIhACgQgKAYgPALQgQAMgOAAQgKAAgHgGg");
	this.shape_51.setTransform(209.1,403.275);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAMB9IAAgHQAGAAADgBQACgCAAgEQAAgEgHgIIgwg/IAAA1QAAAQABAEQADAFAEADQAEABAOAAIAAAHIhSAAIAAgHQAMAAAGgCQADgCACgFQADgFAAgOIAAiSQAAgcgBgGQgBgGgDgCQgDgDgFAAQgDAAgIADIgCgHIAvgTIAJAAIAACfIAngkIAPgPIACgFQAAgDgDgCQgDgDgGgBIAAgFIBGAAIAAAFQgPABgKAEQgJAEgLALIgpAlIApA0QARAWAFAFQAJAJAHACQADABAMAAIAAAHg");
	this.shape_52.setTransform(182.35,394.95);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgCQAEgEACgHQABgCAAgOIAAhCQAAgVgGgKQgGgKgNAAQgUAAgVAWIAABVQAAAQACAEQACAFAFADQAEABANAAIAAAHIhQAAIAAgHIAEAAQAMABAFgHQAEgGAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgDgFABQgFAAgHACIgCgGIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAPQAEALAAAWIAABEQAAAPACAFQACAFAEACQAFACALAAIAAAHg");
	this.shape_53.setTransform(164.125,399.15);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("Ag9BJQgLgLAAgTQAAgMAFgIQAHgMASgLQASgJAogPIAAgHQABgYgIgJQgIgJgOAAQgLAAgGAGQgHAGAAAIIAAAKQAAAIgDAFQgEAEgHAAQgHAAgEgFQgEgEAAgIQAAgPAQgNQAPgNAcAAQAVAAANAIQALAFAEAMQAEAHAAAYIAAA1QAAAXABAGQAAAFACACQABAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgTAagSAAQgJAAgFgGQgGgGAAgOQgXATgGADQgKAFgLAAQgRAAgKgMgAgRAAQgNAIgHAIQgFAJAAAKQAAANAHAIQAIAIAKAAQANAAAUgRIAAg9QgZALgIADg");
	this.shape_54.setTransform(147.7,399.325);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAIB9IAAgHIAEAAQALAAAFgCQAEgEACgHIABgQIAAg6QgBgZgCgIQgDgIgGgFQgGgDgIAAQgJgBgIAFQgJAEgNANIAABWQAAAQACAEQABAEAGADQAEACAMAAIAAAHIhPAAIAAgHQAKAAAGgCQAEgCACgFQACgFAAgPIAAiRQAAgbgBgHQgCgGgCgCQgDgDgEAAQgEAAgIADIgDgHIAxgTIAIAAIAAB2QATgWALgFQALgHAMAAQANAAAKAIQAJAHAGARQADAKAAAdIAAA6QAAAPACAFQACAFAEACQAEACAMAAIAAAHg");
	this.shape_55.setTransform(130.1,394.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgzB3IAAgGIAJAAQAPAAAHgJQADgGAAgUIAAi1IgcAAQgRAAgHACQgJAEgHAJQgGAKgBAQIgHAAIACg4IDDAAIACA4IgHAAQgCgPgDgGQgFgKgKgFQgIgFgQAAIghAAIAAC1QAAAWAFAFQAHAIAOAAIAHAAIAAAGg");
	this.shape_56.setTransform(110.2,395.525);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgMAOQgHgGAAgIQAAgIAHgFQAFgGAHAAQAIAAAGAGQAGAGgBAHQABAIgGAGQgGAGgIAAQgHAAgFgGg");
	this.shape_57.setTransform(603.6,322.2);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgXAfAAQAbgBASATQARARAAAeIhuAAQgBAjASAUQASAVAXAAQAPAAAMgJQALgJAJgVIAFAEQgEAYgSATQgRAVgbAAQgcgBgUgWgAgcg9QgMAMgCAUIBJAAQgBgQgCgGQgFgKgIgFQgJgGgIAAQgPAAgLALg");
	this.shape_58.setTransform(591.25,315.6);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgvA+QgUgXAAgnQAAglAXgYQAWgXAfAAQAYAAAPAMQAPANAAANQAAAHgEAEQgEAEgIABQgLgBgFgGQgDgEgBgLQgBgKgGgFQgGgFgLgBQgRAAgKANQgOASAAAcQAAAcAOAWQAOAWAXAAQARAAAOgMQAKgIAJgVIAFACQgHAggTASQgTARgXAAQgaAAgVgYg");
	this.shape_59.setTransform(575.125,315.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("Ag+BJQgKgLAAgTQAAgMAFgIQAIgMARgLQASgJAogPIAAgHQAAgYgHgJQgIgJgNAAQgLAAgHAGQgHAGAAAIIAAAKQAAAIgDAFQgFAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAQgNQAPgNAcAAQAVAAANAIQALAFAEAMQADAHAAAYIAAA1QAAAXACAGQAAAFADACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgTAagTAAQgIAAgFgGQgFgGgBgOQgYATgFADQgKAFgLAAQgQAAgMgMgAgRAAQgNAIgHAIQgFAJAAAKQgBANAIAIQAIAIAJAAQAOAAAUgRIAAg9QgZALgIADg");
	this.shape_60.setTransform(559.7,315.525);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AglB9IAAgGQALAAAEgCQAFgDABgFQADgFAAgPIAAiSQAAgbgCgGQgBgGgCgCQgDgDgEAAQgFAAgHADIgDgGIAvgUIAIAAIAADVQAAAOADAGQACAEAEADQAEACANABIAAAGg");
	this.shape_61.setTransform(546.25,311.15);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AhaB3IAAgGIAJAAQAPAAAHgKQADgGAAgUIAAiZQAAgWgEgGQgHgIgOAAIgJAAIAAgGIBYAAQAfAAASAHQASAGANAQQANAPAAAWQAAAdgTASQgUASgjAAIgRgCIgWgDIAABFQAAAXAFAFQAHAIAMAAIAJAAIAAAGgAgWhlIAABkIARABIALABQASAAAOgNQANgOAAgXQAAgPgHgNQgGgOgMgGQgLgHgPAAQgIAAgOADg");
	this.shape_62.setTransform(530.775,311.725);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAMB9IAAgGQAGAAADgCQACgCAAgEQAAgEgHgIIgwg/IAAA1QAAAQACAFQACAEAEADQAEACANAAIAAAGIhSAAIAAgGQANAAAGgDQADgCACgEQADgGAAgOIAAiSQAAgcgBgGQgBgGgDgCQgDgDgEAAQgEAAgHADIgEgGIAxgUIAIAAIAACfIAngkIAQgPIABgFQAAgDgDgCQgDgDgGgBIAAgFIBFAAIAAAFQgOABgJAEQgKAEgMAKIgoAmIAoA0QASAWAGAFQAIAJAHACQADABALABIAAAGg");
	this.shape_63.setTransform(503.35,311.15);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("Ag5BTIAAgGQAMgBAGgDQAEgDACgGQABgDAAgOIAAg9QAAgcgBgGQgBgFgDgDQgDgDgFABQgFAAgHACIgCgGIAxgUIAHAAIAAAkQATgkAWAAQAJAAAHAGQAGAGAAAIQAAAGgFAGQgEAEgHAAQgGAAgHgGQgIgGgEAAQgDAAgEADQgHAIgIAQIAABMQAAANADAIQACAEAGAEQAFADALAAIAAAGg");
	this.shape_64.setTransform(488.325,315.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("Ag+BJQgKgLAAgTQAAgMAFgIQAHgMASgLQASgJApgPIAAgHQAAgYgIgJQgIgJgOAAQgKAAgHAGQgHAGABAIIAAAKQAAAIgFAFQgEAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAPgNQAQgNAcAAQAUAAAOAIQAKAFAGAMQACAHABAYIAAA1QAAAXAAAGQABAFACACQABAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgUAagRAAQgJAAgFgGQgGgGABgOQgYATgHADQgJAFgLAAQgRAAgLgMgAgRAAQgOAIgFAIQgHAJAAAKQABANAHAIQAHAIALAAQAMAAAWgRIAAg9QgaALgIADg");
	this.shape_65.setTransform(474.7,315.525);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("Ah3B3IAAgGIAJAAQAPAAAGgKQAEgGAAgUIAAiZQAAgWgFgGQgHgIgNAAIgJAAIAAgGIBhAAQA0AAAcAMQAcAMARAcQARAdAAAlQAAAxgeAhQgiAlhFAAgAgzhkIAADKQAWAFAPAAQAoAAAbgdQAbgcAAgxQAAgxgbgcQgbgdgpAAQgQAAgUAFg");
	this.shape_66.setTransform(452.725,311.725);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAgB6IAAgGQAOgBAFgEQAGgEgBgGQABgIgIgQIgOgjIhbAAIgQAmQgGAOAAAGQAAAGAFAEQAFAEARACIAAAGIhKAAIAAgGQAOgDAFgFQAIgIALgaIBUjDIAFAAIBTDGQAKAXAJAHQAIAHAPACIAAAGgAgzAdIBRAAIgnhfg");
	this.shape_67.setTransform(420.05,311.45);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgZAoQASgHAJgLQAKgNAAgNQAAgEgCgCIgCgCQgCABgGADIgGACQgJgBgFgFQgFgFAAgIQAAgKAGgFQAHgHAJAAQALABAKAJQAIALAAAQQAAARgNAQQgMAPgaAKg");
	this.shape_68.setTransform(395.65,324.9);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("Ah3B3IAAgGIAJAAQAPAAAGgKQAEgGAAgUIAAiZQAAgWgFgGQgHgIgNAAIgJAAIAAgGIBhAAQA0AAAcAMQAcAMARAcQARAdAAAlQAAAxgeAhQgiAlhFAAgAgzhkIAADKQAWAFAPAAQAoAAAbgdQAbgcAAgxQAAgxgbgcQgbgdgpAAQgQAAgUAFg");
	this.shape_69.setTransform(377.725,311.725);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AhlB3IAAgGIAIAAQAJAAAIgEQAFgDACgGQACgFAAgSIAAiaQAAgWgFgGQgGgHgPAAIgIAAIAAgGIC2AAIADA0IgHAAQgEgTgEgHQgEgHgJgDQgHgDgSAAIhAAAIAABeIAzAAQAUAAAHgGQAJgIACgVIAGAAIAABSIgGAAQgDgRgCgFQgEgGgGgEQgIgDgPAAIgzAAIAABPQAAAPABAEQACADADACQADACALAAIAnAAQAUAAAJgDQAJgCAJgJQALgLALgWIAHAAIgVA8g");
	this.shape_70.setTransform(354.05,311.725);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AA3B3IhQhvIgOAAIgFAAIgGAAIAABFQAAAXAFAFQAHAIANAAIAKAAIAAAGIhnAAIAAgGIAJAAQAPAAAHgKQAEgGAAgUIAAiZQAAgWgFgGQgHgIgOAAIgJAAIAAgGIBXAAQAlAAASAGQASAFANAPQAMAPAAAUQAAAWgOAQQgOARgeAFIAxBFQARAXAMAIQAMAIAUACIAAAGgAgyhlIAABjIAGAAIAEAAQAiAAARgPQARgPAAgWQAAgXgOgOQgOgOgWAAQgKAAgSAEg");
	this.shape_71.setTransform(331.575,311.725);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AAhB6IAAgGQANgBAGgEQAEgEAAgGQAAgIgGgQIgPgjIhbAAIgQAmQgGAOAAAGQAAAGAFAEQAFAEARACIAAAGIhLAAIAAgGQAQgDADgFQAKgIAKgaIBVjDIAEAAIBUDGQAJAXAJAHQAIAHAOACIAAAGgAgzAdIBRAAIgnhfg");
	this.shape_72.setTransform(306.05,311.45);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AhSBRQgYghAAgsQAAgjAQgeQAQgeAcgQQAcgRAgAAQAaAAAZANQAHAEAEAAQAEAAAEgDQAEgFACgJIAGAAIAGBRIgGAAQgKgkgVgQQgUgQgcAAQgXAAgTAMQgTAMgLAbQgLAaAAAmQAAAgAKAYQALAYAUANQAVAMAaAAQAXAAASgKQASgKAVgdIAFADQgSAggXAPQgYAPghAAQg6AAghgsg");
	this.shape_73.setTransform(281.125,311.725);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgOB7IgXgGQgRgGgFAAQgEAAgDADQgCACgBAJIgHAAIAAhSIAHAAQAEAaAIAMQAIANAQAJQAPAIASAAQAWAAANgMQANgLAAgQQAAgJgFgJQgFgJgKgHQgHgGgdgRQgfgQgNgKQgNgKgHgNQgGgMAAgPQAAgZATgTQAUgTAfAAQASAAAVAKQAKAEAEAAQAEAAADgCQADgDACgJIAGAAIAABTIgGAAQgDgYgIgOQgJgOgPgIQgPgIgPAAQgSAAgMALQgMALAAAOQAAALAHAJQALANAoAWQAiASAMAJQAMAJAHANQAGANAAAOQAAAcgVATQgVAUghAAQgJAAgJgCg");
	this.shape_74.setTransform(259.275,311.725);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AA0B3IAAgGIAIAAQAQAAAGgJQAEgGAAgUIAAieIhbDHIgGAAIhcjHIAACeQAAAWAFAFQAGAIAOAAIAJAAIAAAGIhTAAIAAgGIAIAAQAPAAAHgJQADgGAAgUIAAibQAAgQgDgHQgCgFgHgDQgHgEgOAAIAAgGIBDAAIBWC5IBVi5IBDAAIAAAGIgIAAQgPAAgHAKQgDAFAAAUIAACbQAAAWAEAFQAHAIAOAAIAIAAIAAAGg");
	this.shape_75.setTransform(233.025,311.725);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgyB3IAAgGIAIAAQAPAAAHgJQAEgFAAgWIAAiZQAAgSgCgGQgCgEgGgDQgHgFgJAAIgIAAIAAgGIBlAAIAAAGIgIAAQgPAAgHAJQgEAGAAAVIAACZQAAASACAGQACAEAGAEQAHAEAJAAIAIAAIAAAGg");
	this.shape_76.setTransform(211.1,311.725);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgZAnQASgFAJgNQAKgNAAgNQAAgDgCgCIgCgBQgCAAgGADIgGABQgJAAgFgEQgFgGAAgIQAAgKAGgGQAHgFAJAAQALAAAJAKQAJAJAAASQAAAQgMAQQgNAQgaAIg");
	this.shape_77.setTransform(740.15,283);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgCQAEgCADgFQACgGAAgOIAAg/QAAgZgCgIQgBgFgDgCQgCgCgFgBQgFAAgHAEIgCgHIAvgUIAIAAIAACBQAAAOACAGQACAFAFACQAEACALAAIAAAHgAgKhdQgFgGAAgHQAAgIAFgEQAFgGAGAAQAIAAAFAGQAFAEAAAIQAAAHgFAGQgFAEgIAAQgGAAgFgEg");
	this.shape_78.setTransform(730.675,269.25);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("Ag7A5QgSgZAAgeQAAgWALgVQALgXASgKQASgKATgBQAlAAAWAcQATAYAAAfQAAAUgLAXQgKAWgSALQgSALgWAAQgkAAgWgcgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAaQAOAZAWAAQARAAALgOQALgOAAgiQAAgqgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_79.setTransform(716.575,273.7);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AhqB3IAAgGIAJAAQAPAAAGgKQAEgGAAgUIAAiZQAAgWgFgGQgHgIgNAAIgJAAIAAgGIBnAAQAcAAARAEQAaAGAOARQAOAQAAAVQAAARgLAPQgLAOgVAHQAZAEAMALQARARAAAXQAAASgLAQQgLAQgUAIQgUAHgoAAgAgaADIgMABIAABiQAUAFATAAQAgAAARgOQAQgPAAgVQAAgOgHgNQgIgNgRgHQgRgHgYAAIgTAAgAgmhmIAABbIAPACIASABQAZAAANgGQANgFAHgMQAGgLAAgOQAAgVgRgPQgRgOgfAAQgSAAgOAEg");
	this.shape_80.setTransform(694.925,269.825);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("Ag7A5QgSgZAAgeQAAgWALgVQALgXASgKQASgKATgBQAlAAAWAcQATAYAAAfQAAAUgLAXQgKAWgSALQgSALgWAAQgkAAgWgcgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAaQAOAZAWAAQARAAALgOQALgOAAgiQAAgqgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_81.setTransform(665.575,273.7);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgHBoQgHgFgEgIQgEgIAAgSIAAhrIgaAAIAAgGQAKgEALgJQAJgJAJgNQADgGAHgSIAFAAIAAA1IAmAAIAAAMIgmAAIAABnQAAAQAFAGQAEAFAHAAQAGAAAFgEQAGgDACgHIAHAAQgFARgMAJQgLAIgMAAQgIAAgHgEg");
	this.shape_82.setTransform(651.8,271.175);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgHBoQgHgFgFgIQgDgIAAgSIAAhrIgaAAIAAgGQAKgEAKgJQALgJAHgNQAFgGAGgSIAFAAIAAA1IAlAAIAAAMIglAAIAABnQAAAQAFAGQAEAFAHAAQAGAAAFgEQAGgDACgHIAHAAQgGARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_83.setTransform(641.8,271.175);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("Ag9BJQgLgLAAgTQAAgMAFgIQAHgMASgLQASgJAogPIAAgHQABgYgIgJQgIgJgOAAQgLAAgGAGQgHAGAAAIIAAAKQAAAIgEAFQgDAEgHAAQgHAAgEgFQgEgEAAgIQAAgPAQgNQAPgNAcAAQAVAAANAIQALAFAEAMQAEAHAAAYIAAA1QAAAXABAGQAAAFACACQABAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgTAagSAAQgJAAgFgGQgGgGAAgOQgXATgHADQgJAFgLAAQgRAAgKgMgAgRAAQgNAIgHAIQgFAJAAAKQAAANAHAIQAIAIAKAAQANAAAUgRIAAg9QgZALgIADg");
	this.shape_84.setTransform(629.2,273.625);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AhSBRQgYghAAgsQAAgjAQgeQAQgeAcgQQAcgRAgAAQAaAAAZANQAHAEAEAAQAEAAAEgDQAEgFACgJIAGAAIAGBRIgGAAQgKgkgVgQQgUgQgcAAQgXAAgTAMQgTAMgLAbQgLAaAAAmQAAAgAKAYQALAYAUANQAVAMAaAAQAXAAASgKQASgKAVgdIAFADQgSAggXAPQgYAPghAAQg6AAghgsg");
	this.shape_85.setTransform(608.625,269.825);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAcABARARQARASAAAeIhuAAQgBAjASAVQASAUAXAAQAQAAALgJQAMgIAHgVIAGADQgDAYgTAUQgRATgbAAQgcABgUgXgAgcg8QgMAKgCAVIBKAAQgCgPgDgHQgEgJgIgHQgJgFgIAAQgPAAgLAMg");
	this.shape_86.setTransform(579.75,273.7);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAMB9IAAgHQAGAAADgCQACgBAAgDQAAgFgHgJIgwg/IAAA2QAAAQACAEQACAGAEABQAEACAOAAIAAAHIhTAAIAAgHQANAAAGgDQADgBACgFQADgFAAgPIAAiRQAAgcgBgGQgBgHgDgCQgDgCgFAAQgDAAgHADIgEgHIAxgTIAIAAIAACfIAngkIAQgPIABgEQAAgEgDgDQgDgCgGAAIAAgGIBFAAIAAAGQgOAAgJAEQgKAEgMALIgoAkIAoA1QASAWAFAFQAJAIAHADQADABALAAIAAAHg");
	this.shape_87.setTransform(562.85,269.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgCQAEgCADgFQACgGAAgOIAAg/QAAgZgCgIQgBgFgDgCQgCgCgFgBQgFAAgHAEIgCgHIAvgUIAIAAIAACBQAAAOACAGQACAFAFACQAEACALAAIAAAHgAgKhdQgFgGAAgHQAAgIAFgEQAFgGAGAAQAIAAAFAGQAFAEAAAIQAAAHgFAGQgFAEgIAAQgGAAgFgEg");
	this.shape_88.setTransform(548.675,269.25);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAADgCQAEgCADgFQACgGAAgOIAAiRQAAgcgBgGQgCgHgCgCQgDgCgEAAQgFAAgHADIgDgHIAvgTIAIAAIAADVQAAAPADAEQABAFAFADQAEACANAAIAAAHg");
	this.shape_89.setTransform(538.75,269.25);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgfBQIgKgCQgEAAgDAFIgFAAIAAg6IAFAAQAFAZAOANQAOAMARAAQALAAAJgHQAHgHAAgKQAAgMgIgIQgJgJgYgMQgagMgIgLQgIgKAAgPQAAgTAOgOQAOgOAVAAQAJABANAEIAMADQABAAAAgBQABAAAAAAQABAAAAAAQABgBAAAAIAEgGIAGAAIAAA3IgGAAQgHgagKgJQgLgJgPAAQgMAAgIAHQgHAGAAAIQAAAKAFAHQAGAHARAIIAZANQAjAQAAAdQAAAVgQAOQgSANgUAAQgOAAgSgFg");
	this.shape_90.setTransform(517.85,273.7);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgYAfAAQAcABAQARQASASAAAeIhuAAQgBAjASAVQASAUAWAAQARAAALgJQAMgIAIgVIAFADQgEAYgRAUQgSATgbAAQgcABgVgXgAgdg8QgLAKgCAVIBJAAQgBgPgCgHQgFgJgJgHQgIgFgJAAQgOAAgMAMg");
	this.shape_91.setTransform(502.75,273.7);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AA6BTIAAgHIAEAAQAKAAAGgDQAEgDACgGIAAgRIAAhFQAAgTgEgJQgHgLgPAAQgKABgJAEQgKAEgNANIAAACIAAAIIAABMQAAAQACAEQACAEAFADQAFACAMAAIAAAHIhQAAIAAgHQANAAAFgDQAFgCACgHQABgDAAgOIAAhFQAAgUgGgIQgHgLgOAAQgKAAgJAFQgPAIgIAJIAABWQAAAPADAFQACAFAEACQAEACAOAAIAAAHIhQAAIAAgHQALAAAEgCQAFgCACgFQACgGAAgOIAAg9QAAgbgBgHQgCgGgCgCQgDgCgEgBQgFAAgHAEIgDgHIAxgUIAHAAIAAAiIAVgUQAIgGAJgEQAJgEAJAAQAPAAAKAJQALAJAEAQQASgVAMgGQANgHANAAQANAAAKAHQAKAGAGAQQADAJAAAWIAABFQAAAPADAFQABAEAFADQAFACALAAIAAAHg");
	this.shape_92.setTransform(480.675,273.45);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("Ag9BJQgLgLAAgTQAAgMAFgIQAHgMASgLQASgJApgPIAAgHQAAgYgIgJQgIgJgOAAQgLAAgGAGQgHAGABAIIAAAKQgBAIgEAFQgDAEgHAAQgHAAgEgFQgEgEAAgIQAAgPAPgNQAQgNAcAAQAVAAANAIQALAFAEAMQAEAHAAAYIAAA1QAAAXABAGQAAAFACACQABAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgTAagSAAQgJAAgFgGQgGgGABgOQgYATgHADQgJAFgLAAQgQAAgLgMgAgRAAQgOAIgFAIQgHAJABAKQAAANAHAIQAIAIAKAAQANAAAVgRIAAg9QgaALgIADg");
	this.shape_93.setTransform(459.2,273.625);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AhDBrQgOgJAAgKQAAgEADgEQADgHAJgLIASgTQgJgGgEgEQgEgEAAgGQAAgGAGgIQAEgIASgOQgPgIgHgMQgJgOABgPQAAgYASgRQASgSAcAAQAWAAARAMIAiAAIAIAAIACACIABAFIgBAHIgBABIgJABIgVAAQAKAMAAAUQAAAWgSAQQgQAQgcAAQgMAAgNgDQgIAHgCAEQgDAFAAADQAAADADADQACADAJABIAYABQAkABAKACQARACAJAKQALAKgBAOQAAAUgSARQgbAagsAAQgiAAgXgPgAgzA9QgEAIAAAGQAAAJAKAGQASALAgAAQAgAAAOgLQAPgLABgNQgBgJgIgEQgKgEgagBQgngBgVgDQgJAJgEAIgAgchmQgJALAAAVQABAcAMAPQAIAMAOAAQANAAAJgKQAIgKAAgWQAAgcgMgPQgJgMgNAAQgNAAgJAKg");
	this.shape_94.setTransform(441.8,277.325);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("Ag5BTIAAgHQAMABAGgEQAEgDACgGQABgDAAgOIAAg+QAAgcgBgFQgBgGgDgCQgDgCgFgBQgFAAgHAEIgCgHIAxgUIAHAAIAAAlQATglAWAAQAJAAAHAGQAGAGAAAIQAAAHgFAEQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEAEQgHAHgIAQIAABNQAAANADAGQACAFAGADQAFADALAAIAAAHg");
	this.shape_95.setTransform(417.825,273.45);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("Ag7A5QgSgZAAgeQAAgWALgVQALgXASgKQASgKATgBQAlAAAWAcQATAYAAAfQAAAUgLAXQgKAWgSALQgSALgWAAQgkAAgWgcgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAaQAOAZAWAAQARAAALgOQALgOAAgiQAAgqgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_96.setTransform(402.575,273.7);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("Ag5BTIAAgHQAMABAGgEQAEgDACgGQABgDAAgOIAAg+QAAgcgBgFQgBgGgDgCQgDgCgFgBQgFAAgHAEIgCgHIAxgUIAHAAIAAAlQATglAWAAQAJAAAHAGQAGAGAAAIQAAAHgFAEQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEAEQgHAHgIAQIAABNQAAANADAGQACAFAGADQAFADALAAIAAAHg");
	this.shape_97.setTransform(387.825,273.45);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("Ag5BTIAAgHQAMABAGgEQAEgDACgGQABgDAAgOIAAg+QAAgcgBgFQgBgGgDgCQgDgCgFgBQgFAAgHAEIgCgHIAxgUIAHAAIAAAlQATglAWAAQAJAAAHAGQAGAGAAAIQAAAHgFAEQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEAEQgHAHgIAQIAABNQAAANADAGQACAFAGADQAFADALAAIAAAHg");
	this.shape_98.setTransform(375.825,273.45);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("Ag7A5QgSgZAAgeQAAgWALgVQALgXASgKQASgKATgBQAlAAAWAcQATAYAAAfQAAAUgLAXQgKAWgSALQgSALgWAAQgkAAgWgcgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAaQAOAZAWAAQARAAALgOQALgOAAgiQAAgqgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_99.setTransform(360.575,273.7);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAIB9IAAgHIAFAAQAKAAAFgDQAEgDACgHIAAgQIAAg5QAAgagCgIQgDgIgGgFQgGgEgIAAQgJABgIAEQgJAEgNAOIAABVQAAAQACAEQABAEAGADQAEACANAAIAAAHIhQAAIAAgHQAKAAAHgDQADgBACgGQACgEAAgPIAAiRQAAgcgBgGQgCgHgCgCQgDgCgFAAQgDAAgIADIgDgHIAxgTIAIAAIAAB2QATgVALgHQALgGAMAAQANAAAKAIQAJAIAGAPQADALAAAeIAAA5QAAAPADAFQABAFAEACQAEACAMAAIAAAHg");
	this.shape_100.setTransform(342.6,269.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAbABASARQARASAAAeIhuAAQgBAjASAVQASAUAXAAQAPAAAMgJQALgIAJgVIAFADQgEAYgSAUQgRATgbAAQgcABgUgXgAgcg8QgMAKgCAVIBJAAQgBgPgCgHQgFgJgIgHQgJgFgIAAQgPAAgLAMg");
	this.shape_101.setTransform(316.75,273.7);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgCQAEgCADgFQACgGAAgOIAAg/QAAgZgCgIQgBgFgDgCQgCgCgFgBQgFAAgHAEIgCgHIAvgUIAIAAIAACBQAAAOACAGQACAFAFACQAEACALAAIAAAHgAgKhdQgFgGAAgHQAAgIAFgEQAFgGAGAAQAIAAAFAGQAFAEAAAIQAAAHgFAGQgFAEgIAAQgGAAgFgEg");
	this.shape_102.setTransform(303.675,269.25);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAdB/IAAgWQgMALgMAGQgKAFgNAAQgaAAgUgVQgUgXAAgjQAAgiAXgcQAVgdAjAAQATAAAPAOIAAgeQAAgbgBgGQgCgHgDgCQgDgDgEAAQgFAAgHAEIgCgHIAvgTIAJAAIAAC4QgBAdACAGQABAHADACQADADAEAAQAEgBAJgDIACAHIgwATgAgkgRQgPARAAAjQAAAjAPAUQAQASASAAQAPAAAQgQIAAhTQgBgLgGgJQgFgLgJgEQgIgGgIAAQgQAAgMAPg");
	this.shape_103.setTransform(290.25,269.5);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgDQAEgDACgHQABgDAAgNIAAhBQAAgXgGgJQgGgKgNAAQgUAAgVAXIAABUQAAAQACAEQACAFAFACQAEACANAAIAAAHIhQAAIAAgHIAEAAQAMAAAFgFQAEgHAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgCgFgBQgFAAgHAEIgCgHIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAQQAEAKAAAWIAABEQAAAPACAFQACAFAEACQAFACALAAIAAAHg");
	this.shape_104.setTransform(271.625,273.45);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgyB3IAAgGIAJAAQAOAAAHgJQAEgFAAgWIAAiZQAAgSgCgGQgCgEgFgDQgIgFgIAAIgJAAIAAgGIBlAAIAAAGIgJAAQgOAAgHAJQgEAGAAAVIAACZQAAASACAGQACAEAGAEQAHAEAIAAIAJAAIAAAGg");
	this.shape_105.setTransform(256.6,269.825);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgNBQQgGgGAAgIQAAgIAGgGQAGgGAHAAQAIAAAGAGQAFAGAAAIQAAAIgFAGQgGAFgIAAQgHAAgGgFgAgNgzQgFgGAAgIQAAgIAFgFQAGgHAHAAQAIAAAGAHQAGAFAAAIQAAAIgGAGQgGAGgIgBQgHABgGgGg");
	this.shape_106.setTransform(236.675,273.7);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AhIBxQgGgGgBgHQAAgIAGgEQAEgFAIAAQAGAAALAEIAIADQAGAAAGgGQAGgFAGgQIAMgcIg6h4IgJgOQgEgGgDgCQgEgDgJgCIAAgGIBLAAIAAAGIgEAAQgIAAgDAEQgFADAAAFQAAAHAHAMIAlBRIAkhZQADgHABgHIgCgFIgEgDIgKgBIAAgGIA0AAIAAAGQgGABgEACQgEACgEAGIgGANIhACgQgKAYgPALQgQAMgOAAQgKAAgHgGg");
	this.shape_107.setTransform(222.6,277.575);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgaB7QgPgGgPgKIAAimQAAgbgBgGQgCgHgCgCQgDgDgEAAQgFAAgIAEIgCgHIAwgTIAIAAIAAB1QAYgiAaAAQAYAAATAWQASAVAAAkQAAArgcAaQgZAXgegBQgNAAgOgEgAgJgNQgHAEgLAJIAABhQAJAIAKAFQAIAFAKAAQAQAAAOgSQAOgSAAghQAAgfgOgPQgOgRgRAAQgJAAgJAEg");
	this.shape_108.setTransform(203.925,269.5);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAcB/IAAgWQgMALgKAGQgLAFgNAAQgaAAgUgVQgTgXAAgjQgBgiAWgcQAWgdAiAAQAVAAANAOIAAgeQAAgbgBgGQgBgHgDgCQgDgDgEAAQgEAAgIAEIgDgHIAxgTIAHAAIAAC4QAAAdACAGQABAHADACQADADAEAAQAFgBAHgDIACAHIgwATgAgkgRQgPARgBAjQAAAjAQAUQAQASATAAQAOAAAPgQIAAhTQgBgLgFgJQgFgLgJgEQgIgGgIAAQgQAAgMAPg");
	this.shape_109.setTransform(178.25,269.5);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgYAfAAQAcABAQARQASASAAAeIhuAAQgBAjASAVQASAUAWAAQARAAALgJQAMgIAIgVIAFADQgEAYgRAUQgSATgbAAQgcABgVgXgAgdg8QgLAKgCAVIBJAAQAAgPgDgHQgFgJgJgHQgIgFgJAAQgOAAgMAMg");
	this.shape_110.setTransform(160.75,273.7);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("Ag5BTIAAgHQAMABAGgEQAEgDACgGQABgDAAgOIAAg+QAAgcgBgFQgBgGgDgCQgDgCgFgBQgFAAgHAEIgCgHIAxgUIAHAAIAAAlQATglAWAAQAJAAAHAGQAGAGAAAIQAAAHgFAEQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEAEQgHAHgIAQIAABNQAAANADAGQACAFAGADQAFADALAAIAAAHg");
	this.shape_111.setTransform(146.825,273.45);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgCQAEgCADgFQACgGAAgOIAAg/QAAgZgCgIQgBgFgDgCQgCgCgFgBQgFAAgHAEIgCgHIAvgUIAIAAIAACBQAAAOACAGQACAFAFACQAEACALAAIAAAHgAgKhdQgFgGAAgHQAAgIAFgEQAFgGAGAAQAIAAAFAGQAFAEAAAIQAAAHgFAGQgFAEgIAAQgGAAgFgEg");
	this.shape_112.setTransform(135.675,269.25);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AhTB5IAAgGIAEAAQAKAAAGgEQAEgCACgEQABgEAAgSIAAiXQAAgPgBgFQgBgEgDgCQgDgDgGABQgEgBgGADIgDgGIAygUIAHAAIAAAmQAMgVANgJQALgJAOAAQAYABARASQATAYAAAlQAAApgXAbQgUAXgegBQgMAAgKgDQgHgDgIgIIAAAxQAAARACAEQACAFAFACQAFADAMAAIAAAGgAgFhbQgHADgOARIAAA7QAAATABAGQADAKAJAIQAKAIANAAQASAAALgOQAOgSAAgfQAAglgQgUQgLgOgQAAQgIAAgHAEg");
	this.shape_113.setTransform(120.925,277.3);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AggBQIgJgCQgEAAgDAFIgFAAIAAg6IAFAAQAGAZANANQAPAMAQAAQALAAAJgHQAHgHAAgKQAAgMgIgIQgJgJgZgMQgZgMgIgLQgIgKAAgPQAAgTAOgOQAOgOAVAAQAJABANAEIAMADQABAAAAgBQABAAAAAAQABAAAAAAQABgBAAAAIAEgGIAGAAIAAA3IgGAAQgGgagLgJQgKgJgQAAQgMAAgHAHQgIAGAAAIQAAAKAFAHQAGAHARAIIAZANQAjAQAAAdQAAAVgQAOQgRANgVAAQgOAAgTgFg");
	this.shape_114.setTransform(105.85,273.7);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgDQAEgDACgHQABgDAAgNIAAhBQAAgXgGgJQgGgKgNAAQgUAAgVAXIAABUQAAAQACAEQACAFAFACQAEACANAAIAAAHIhQAAIAAgHIAEAAQAMAAAFgFQAEgHAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgCgFgBQgFAAgHAEIgCgHIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAQQAEAKAAAWIAABEQAAAPACAFQACAFAEACQAFACALAAIAAAHg");
	this.shape_115.setTransform(89.625,273.45);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgyB3IAAgGIAJAAQAOAAAHgJQAEgFAAgWIAAiZQAAgSgCgGQgCgEgGgDQgHgFgIAAIgJAAIAAgGIBlAAIAAAGIgJAAQgOAAgHAJQgEAGAAAVIAACZQAAASACAGQACAEAFAEQAIAEAIAAIAJAAIAAAGg");
	this.shape_116.setTransform(74.6,269.825);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgNB3QgGgGAAgIQAAgIAGgGQAGgFAHAAQAIAAAGAFQAFAGABAIQgBAIgFAGQgGAFgIAAQgHAAgGgFgAgDA4IgPiNIgBgOQAAgLAGgHQAGgGAHgBQAJABAFAGQAGAHAAANIgBAMIgPCNg");
	this.shape_117.setTransform(619.1,186);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgNB3QgFgGAAgIQAAgIAFgGQAFgFAIAAQAIAAAGAFQAFAGAAAIQAAAIgFAGQgGAFgIAAQgIAAgFgFgAgCA4IgQiNIgBgOQAAgLAGgHQAGgGAHgBQAJABAFAGQAGAHAAANIgBAMIgQCNg");
	this.shape_118.setTransform(607.1,186);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAcABARARQARASAAAeIhuAAQgBAjASAVQASAUAXAAQAQAAALgJQAMgIAHgVIAGADQgDAYgTAUQgRATgbAAQgcABgUgXgAgcg8QgMAKgCAVIBKAAQgCgPgDgHQgEgJgIgHQgJgFgIAAQgPAAgLAMg");
	this.shape_119.setTransform(593.25,189.9);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AggBQIgJgCQgEABgDAEIgFAAIAAg6IAFAAQAGAZANAMQAOANARAAQALAAAIgHQAIgHAAgKQAAgNgIgHQgJgJgZgMQgZgMgIgKQgIgLAAgPQAAgTAOgOQAOgOAVAAQAIABAOAEIAMADQABAAAAgBQABAAAAAAQABAAAAAAQABgBAAAAIAEgGIAGAAIAAA3IgGAAQgGgZgLgKQgKgJgQAAQgMAAgHAHQgIAGAAAIQAAAKAFAHQAGAHARAIIAZAMQAjARAAAdQAAAVgQAOQgRAOgVgBQgOAAgTgFg");
	this.shape_120.setTransform(578.35,189.9);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgCQAEgEACgHQABgCAAgOIAAhBQAAgXgGgJQgGgKgNAAQgUAAgVAWIAABVQAAAQACAEQACAFAFACQAEACANAAIAAAHIhQAAIAAgHIAEAAQAMAAAFgFQAEgHAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgCgFgBQgFAAgHADIgCgGIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAQQAEAKAAAWIAABEQAAAPACAFQACAFAEACQAFADALgBIAAAHg");
	this.shape_121.setTransform(562.125,189.65);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAbABARARQASASAAAeIhuAAQAAAjARAVQASAUAXAAQAPAAAMgJQALgIAJgVIAFADQgEAYgSAUQgRATgbAAQgcABgUgXgAgcg8QgMAKgCAVIBJAAQgBgPgCgHQgEgJgKgHQgIgFgJAAQgOAAgLAMg");
	this.shape_122.setTransform(545.25,189.9);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgvA+QgUgWAAgoQAAglAXgXQAWgZAfAAQAYAAAPANQAPANAAANQAAAHgEAFQgEADgIABQgLAAgFgIQgDgDgBgKQgBgLgGgFQgGgGgLAAQgRAAgKAOQgOARAAAcQAAAcAOAWQAOAWAXAAQARAAAOgMQAKgIAJgVIAFADQgHAfgTARQgTARgXAAQgaAAgVgXg");
	this.shape_123.setTransform(529.125,189.9);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgCQAEgCADgFQACgGAAgOIAAg/QAAgZgCgIQgBgFgDgCQgCgCgFgBQgFAAgHADIgCgGIAvgUIAIAAIAACBQAAAOACAGQACAFAFACQAEADALgBIAAAHgAgKhdQgFgGAAgHQAAgIAFgEQAFgGAGAAQAIAAAFAGQAFAEAAAIQAAAHgFAGQgFAEgIAAQgGAAgFgEg");
	this.shape_124.setTransform(516.175,185.45);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AhmB3IAAgGIAJAAQAQAAAHgKQADgGAAgUIAAiZQAAgWgFgGQgHgIgOAAIgJAAIAAgGIBrAAIAAAGQgSAAgHAEQgIAEgDAFQgCAGAAAVIAACVQAAAOACAGQACAEAFABQAFACAWAAIARAAQAbAAALgEQAMgEAIgKQAJgLAKgWIAFACIgTBAg");
	this.shape_125.setTransform(500.05,186.025);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgHBoQgHgFgFgIQgDgIAAgSIAAhrIgaAAIAAgGQAKgEAKgJQALgJAHgNQAFgGAGgSIAFAAIAAA1IAlAAIAAAMIglAAIAABnQAAAQAFAGQAEAFAHAAQAGAAAFgEQAGgDACgHIAHAAQgGARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_126.setTransform(475.3,187.375);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgCQAEgEACgHQABgCAAgOIAAhBQAAgXgGgJQgGgKgNAAQgUAAgVAWIAABVQAAAQACAEQACAFAFACQAEACANAAIAAAHIhQAAIAAgHIAEAAQAMAAAFgFQAEgHAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgCgFgBQgFAAgHADIgCgGIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAQQAEAKAAAWIAABEQAAAPACAFQACAFAEACQAFADALgBIAAAHg");
	this.shape_127.setTransform(461.125,189.65);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgYAfAAQAcABAQARQASASAAAeIhuAAQgBAjASAVQASAUAWAAQARAAALgJQAMgIAIgVIAFADQgEAYgRAUQgSATgbAAQgcABgVgXgAgdg8QgLAKgCAVIBJAAQgBgPgCgHQgFgJgJgHQgIgFgJAAQgOAAgMAMg");
	this.shape_128.setTransform(444.25,189.9);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgHBoQgHgFgEgIQgEgIAAgSIAAhrIgaAAIAAgGQAKgEALgJQAJgJAJgNQADgGAHgSIAFAAIAAA1IAmAAIAAAMIgmAAIAABnQAAAQAFAGQAEAFAHAAQAGAAAFgEQAGgDACgHIAHAAQgGARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_129.setTransform(431.3,187.375);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAJBTIAAgHIADAAQALAAAFgCQAEgEACgHQABgCAAgOIAAhBQAAgXgGgJQgGgKgNAAQgUAAgVAWIAABVQAAAQACAEQACAFAFACQAEACANAAIAAAHIhQAAIAAgHIAEAAQAMAAAFgFQAEgHAAgRIAAg7QAAgdgBgHQgCgGgCgCQgDgCgFgBQgFAAgHADIgCgGIAwgUIAIAAIAAAiQAcgiAZAAQANAAAKAHQAJAGAGAQQAEAKAAAWIAABEQAAAPACAFQACAFAEACQAFADALgBIAAAHg");
	this.shape_130.setTransform(417.125,189.65);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("Ag7A5QgSgZAAgeQAAgWALgVQALgXASgKQASgLATAAQAlAAAWAcQATAYAAAfQAAAUgLAXQgKAWgSALQgSAMgWgBQgkAAgWgcgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAaQAOAZAWAAQARAAALgOQALgOAAgiQAAgrgSgYQgNgRgSAAQgKAAgJAGg");
	this.shape_131.setTransform(399.075,189.9);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AhSBRQgYghAAgsQAAgjAQgeQAQgeAcgQQAcgRAgAAQAaAAAZANQAHAEAEAAQAEAAAEgDQAEgFACgJIAGAAIAGBRIgGAAQgKgkgVgQQgUgQgcAAQgXAAgTAMQgTAMgLAbQgLAaAAAmQAAAgAKAYQALAYAUANQAVAMAaAAQAXAAASgKQASgKAVgdIAFADQgSAggXAPQgYAPghAAQg6AAghgsg");
	this.shape_132.setTransform(378.125,186.025);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AhIBxQgHgGAAgHQABgIAEgEQAFgFAIAAQAGAAAKAEIAJADQAFAAAGgGQAHgFAGgQIALgcIg5h4IgIgOQgFgGgDgCQgEgDgJgCIAAgGIBLAAIAAAGIgEAAQgIAAgEAEQgDADAAAFQAAAHAFAMIAnBRIAkhZQACgHAAgHIAAgFIgFgDIgLgBIAAgGIA1AAIAAAGQgGABgEACQgEACgEAGIgGANIhBCgQgJAYgPALQgPAMgPAAQgLAAgGgGg");
	this.shape_133.setTransform(348.1,193.775);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("Ag+BJQgKgLAAgTQAAgMAFgIQAHgMASgLQASgJApgPIAAgHQgBgYgHgJQgIgJgNAAQgLAAgHAGQgGAGAAAIIAAAKQAAAIgFAFQgEAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAPgNQAQgNAcAAQAUAAAOAIQAKAFAGAMQACAHAAAYIAAA1QAAAXABAGQABAFADACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgUAagRAAQgJAAgFgGQgFgGAAgOQgYATgHADQgJAFgLAAQgRAAgLgMgAgRAAQgOAIgFAIQgHAJAAAKQAAANAIAIQAHAIALAAQAMAAAWgRIAAg9QgaALgIADg");
	this.shape_134.setTransform(331.7,189.825);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgaB6QgPgFgPgKIAAimQAAgbgBgHQgCgGgCgCQgDgCgEgBQgFAAgIAEIgCgHIAwgTIAIAAIAAB1QAYgiAaAAQAYAAATAWQASAVAAAkQAAAqgcAbQgZAXgegBQgNABgOgGgAgJgNQgHAEgLAKIAABgQAJAIAKAFQAIAFAKAAQAQgBAOgRQAOgRAAgiQAAgfgOgPQgOgSgRABQgJAAgJAEg");
	this.shape_135.setTransform(313.425,185.7);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("Ag+BJQgKgLAAgTQAAgMAFgIQAIgMARgLQASgJAogPIAAgHQAAgYgHgJQgIgJgNAAQgLAAgHAGQgGAGgBAIIAAAKQAAAIgDAFQgFAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAQgNQAPgNAcAAQAUAAAOAIQALAFAEAMQADAHAAAYIAAA1QAAAXABAGQABAFADACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgTAagTAAQgIAAgFgGQgFgGgBgOQgYATgFADQgKAFgLAAQgQAAgMgMgAgRAAQgNAIgHAIQgFAJgBAKQAAANAIAIQAHAIAKAAQANAAAVgRIAAg9QgZALgIADg");
	this.shape_136.setTransform(297.7,189.825);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAKBQIAAgGQAHAAAFgEQAEgCAAgEQAAgEgMgQIgWgiIgaAiQgNAQAAACQAAAFAFADQAEAEAHAAIAAAGIg0AAIAAgGQAGgBAFgDQAHgGAPgUIAjgsIgggtQgNgSgHgFQgGgFgMAAIAAgGIBNAAIAAAGQgIAAgCADQgEACAAAEQAAAEAHAJIAGAJIAKASIANgSQANgSAAgEQAAgEgEgCQgDgDgGAAIAAgGIA2AAIAAAGQgIAAgGAFQgJAGgPAUIgWAdIAoA5QAPAVAGAEQAGAFAKAAIAAAGg");
	this.shape_137.setTransform(280.1,189.9);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AglB9IAAgHQAMAAAEgCQAEgCADgFQACgGAAgOIAAg/QAAgZgCgIQgBgFgDgCQgCgCgFgBQgFAAgHADIgCgGIAvgUIAIAAIAACBQAAAOACAGQACAFAFACQAEADALgBIAAAHgAgKhdQgFgGAAgHQAAgIAFgEQAFgGAGAAQAIAAAFAGQAFAEAAAIQAAAHgFAGQgFAEgIAAQgGAAgFgEg");
	this.shape_138.setTransform(266.175,185.45);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AhaB3IAAgGIAJAAQAPAAAHgKQADgGAAgUIAAiZQAAgWgEgGQgHgIgOAAIgJAAIAAgGIBYAAQAfAAASAHQASAGANAQQANAPAAAWQAAAdgTASQgUASgjAAIgRgCIgWgDIAABFQAAAXAFAFQAHAIAMAAIAJAAIAAAGgAgWhlIAABkIARABIALABQASAAAOgNQANgOAAgXQAAgPgHgNQgGgOgMgGQgLgHgPAAQgIAAgOADg");
	this.shape_139.setTransform(250.775,186.025);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAcABARARQARASAAAeIhuAAQgBAjASAVQASAUAXAAQAQAAALgJQAMgIAHgVIAGADQgDAYgTAUQgRATgbAAQgcABgUgXgAgcg8QgMAKgCAVIBKAAQgCgPgDgHQgEgJgIgHQgJgFgIAAQgPAAgLAMg");
	this.shape_140.setTransform(224.25,189.9);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AAJB9IAAgHIADAAQAMAAAEgCQAFgEABgHIAAgQIAAg5QAAgagCgIQgDgIgGgFQgGgDgIAAQgJAAgIAEQgKAEgNANIAABWQAAAQACAEQACAEAFADQAFADANgBIAAAHIhRAAIAAgHQAMAAAGgCQADgDACgFQACgEABgPIAAiRQgBgbgBgHQgCgGgCgCQgCgDgGAAQgDAAgJADIgBgHIAvgTIAIAAIAAB2QAUgVALgHQALgGALAAQAOAAAKAIQAKAHAEARQAEAKAAAeIAAA5QAAAPADAFQABAFAEACQAFADAKgBIAAAHg");
	this.shape_141.setTransform(207.1,185.45);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgHBoQgIgFgEgIQgDgIAAgSIAAhrIgZAAIAAgGQAJgEAKgJQALgJAHgNQAEgGAGgSIAGAAIAAA1IAlAAIAAAMIglAAIAABnQAAAQAEAGQAFAFAHAAQAGAAAFgEQAFgDAEgHIAHAAQgHARgLAJQgLAIgMAAQgIAAgHgEg");
	this.shape_142.setTransform(193.3,187.375);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("Ag5BTIAAgGQAMAAAGgEQAEgDACgGQABgDAAgOIAAg+QAAgbgBgGQgBgFgDgDQgDgCgFAAQgFAAgHADIgCgHIAxgUIAHAAIAAAkQATgkAWAAQAJAAAHAGQAGAGAAAIQAAAGgFAFQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEADQgHAIgIAQIAABMQAAAOADAGQACAGAGACQAFAEALAAIAAAGg");
	this.shape_143.setTransform(792.325,147.75);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgYAfAAQAcAAAQASQASASAAAeIhuAAQgBAjASAUQASAVAWAAQARAAALgJQALgIAJgWIAFAEQgEAYgRATQgSAVgbgBQgcAAgVgWgAgdg9QgLAMgCAUIBJAAQgBgQgCgGQgFgJgJgHQgIgFgJAAQgOAAgMALg");
	this.shape_144.setTransform(778.25,148);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAdB/IAAgWQgMAMgMAFQgKAGgNgBQgaABgUgXQgUgWAAgiQABgjAVgbQAWgdAjgBQAUAAAOAOIAAgdQgBgcgBgGQgBgHgDgCQgDgCgEAAQgFAAgHACIgCgGIAwgUIAIAAIAAC6QgBAcACAHQABAFADADQADACAEABQAEAAAJgDIACAFIgxAUgAgkgSQgPASAAAjQAAAjAPATQAQATASAAQAPAAAQgQIAAhTQgCgLgFgJQgFgKgJgGQgIgEgIAAQgPAAgNANg");
	this.shape_145.setTransform(761.75,143.8);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AAJBTIAAgGIADAAQALAAAFgEQAEgDACgHQABgDAAgOIAAhAQAAgXgGgJQgGgKgNAAQgUAAgVAXIAABTQAAARACAEQACAFAFACQAEADANAAIAAAGIhQAAIAAgGIAEAAQAMgBAFgFQAEgHAAgSIAAg6QAAgdgBgGQgCgHgCgCQgDgCgFAAQgFAAgHADIgCgHIAwgUIAIAAIAAAjQAcgjAZAAQANAAAKAHQAJAHAGAOQAEALAAAWIAABDQAAAQACAGQACAEAEACQAFADALAAIAAAGg");
	this.shape_146.setTransform(743.125,147.75);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAiBTIAAgiQgWAWgKAGQgKAGgMAAQgOAAgKgIQgKgIgDgMQgFgNAAgWIAAhHQABgLgDgFQgDgEgEgCQgFgCgNgBIAAgGIA5AAIAABqQAAAXAHAIQAJAGAKABQAHgBAJgFQAKgEAOgOIAAhaQAAgNgGgFQgFgFgQgBIAAgGIA3AAIAABgQABAcABAHQABAGADACQADADADAAQAGAAAHgDIACAGIgvAUg");
	this.shape_147.setTransform(725.1,148.25);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAbAAASASQARASAAAeIhuAAQgBAjASAUQASAVAXAAQAPAAAMgJQALgIAJgWIAFAEQgEAYgSATQgRAVgbgBQgcAAgUgWgAgcg9QgMAMgCAUIBJAAQgBgQgCgGQgFgJgIgHQgJgFgIAAQgPAAgLALg");
	this.shape_148.setTransform(699.25,148);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgfBQIgKgBQgEgBgDAFIgFAAIAAg5IAFAAQAFAYAOANQAOAMARAAQALAAAJgHQAHgHAAgKQAAgMgIgJQgJgIgYgNQgagLgIgLQgIgJAAgPQAAgVAOgNQAOgOAVAAQAJAAANAFIAMACQABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAIAEgGIAGAAIAAA4IgGAAQgHgbgKgIQgLgKgPAAQgMAAgIAGQgHAHAAAIQAAAKAFAHQAGAHARAIIAZANQAjAQAAAcQAAAXgQANQgSANgUAAQgOABgSgGg");
	this.shape_149.setTransform(684.35,148);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAiBTIAAgiQgWAWgKAGQgKAGgNAAQgNAAgJgIQgKgIgFgMQgDgNAAgWIAAhHQgBgLgCgFQgCgEgFgCQgFgCgMgBIAAgGIA4AAIAABqQAAAXAHAIQAJAGAKABQAHgBAJgFQAKgEAOgOIAAhaQgBgNgEgFQgFgFgQgBIAAgGIA3AAIAABgQgBAcACAHQABAGADACQADADADAAQAGAAAHgDIADAGIgxAUg");
	this.shape_150.setTransform(668.1,148.25);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("Ag5BTIAAgGQAMAAAGgEQAEgDACgGQABgDAAgOIAAg+QAAgbgBgGQgBgFgDgDQgDgCgFAAQgFAAgHADIgCgHIAxgUIAHAAIAAAkQATgkAWAAQAJAAAHAGQAGAGAAAIQAAAGgFAFQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEADQgHAIgIAQIAABMQAAAOADAGQACAGAGACQAFAEALAAIAAAGg");
	this.shape_151.setTransform(644.325,147.75);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("Ag7A4QgSgYAAgfQAAgVALgWQALgWASgJQASgMATAAQAlAAAWAdQATAXAAAfQAAAUgLAXQgKAWgSALQgSAMgWgBQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAZQAOAaAWAAQARAAALgOQALgOAAgjQAAgpgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_152.setTransform(629.075,148);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AhFB9IAAgHIAHAAQAHAAAGgDQAGgEACgGQACgGAAgRIAAhpIgfAAIAAgMIAfAAIAAgLQAAgYAIgRQAHgQAQgKQAPgLAUAAQATAAAPAMQAKAIAAAKQAAAFgEAFQgFAEgFAAQgEAAgFgCQgEgDgHgKQgGgKgGgDQgFgDgHAAQgIAAgFAEQgFAEgDAKQgCAJAAAlIAAAMIAoAAIAAAMIgoAAIAABpQAAAXAFAGQAFAHALAAIAPAAIAAAHg");
	this.shape_153.setTransform(616.625,143.575);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAbAAASASQARASAAAeIhuAAQgBAjASAUQASAVAXAAQAPAAAMgJQALgIAJgWIAFAEQgEAYgSATQgRAVgbgBQgcAAgUgWgAgcg9QgMAMgCAUIBJAAQgBgQgCgGQgFgJgIgHQgJgFgIAAQgPAAgLALg");
	this.shape_154.setTransform(591.25,148);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AguA/QgVgXAAgmQAAgoAVgXQAVgYAfAAQAcAAARASQARASAAAeIhuAAQgBAjASAUQASAVAXAAQAQAAALgJQAMgIAHgWIAGAEQgDAYgTATQgRAVgbgBQgcAAgUgWgAgcg9QgMAMgCAUIBKAAQgCgQgDgGQgEgJgIgHQgJgFgIAAQgPAAgLALg");
	this.shape_155.setTransform(575.25,148);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("Ag5BTIAAgGQAMAAAGgEQAEgDACgGQABgDAAgOIAAg+QAAgbgBgGQgBgFgDgDQgDgCgFAAQgFAAgHADIgCgHIAxgUIAHAAIAAAkQATgkAWAAQAJAAAHAGQAGAGAAAIQAAAGgFAFQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEADQgHAIgIAQIAABMQAAAOADAGQACAGAGACQAFAEALAAIAAAGg");
	this.shape_156.setTransform(561.325,147.75);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AhFB9IAAgHIAHAAQAHAAAGgDQAGgEACgGQACgGAAgRIAAhpIgfAAIAAgMIAfAAIAAgLQAAgYAIgRQAHgQAQgKQAPgLAUAAQATAAAPAMQAKAIAAAKQAAAFgEAFQgFAEgFAAQgEAAgFgCQgEgDgHgKQgGgKgGgDQgFgDgHAAQgIAAgFAEQgFAEgDAKQgCAJAAAlIAAAMIAoAAIAAAMIgoAAIAABpQAAAXAFAGQAFAHALAAIAPAAIAAAHg");
	this.shape_157.setTransform(551.625,143.575);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgvA/QgUgXAAgmQAAgoAVgXQAVgYAfAAQAcAAAQASQASASAAAeIhuAAQgBAjASAUQASAVAWAAQARAAALgJQALgIAJgWIAFAEQgEAYgRATQgSAVgbgBQgcAAgVgWgAgdg9QgLAMgCAUIBJAAQgBgQgCgGQgFgJgJgHQgIgFgJAAQgOAAgMALg");
	this.shape_158.setTransform(526.25,148);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("Ag5BTIAAgGQAMAAAGgEQAEgDACgGQABgDAAgOIAAg+QAAgbgBgGQgBgFgDgDQgDgCgFAAQgFAAgHADIgCgHIAxgUIAHAAIAAAkQATgkAWAAQAJAAAHAGQAGAGAAAIQAAAGgFAFQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEADQgHAIgIAQIAABMQAAAOADAGQACAGAGACQAFAEALAAIAAAGg");
	this.shape_159.setTransform(512.325,147.75);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("Ag9BJQgLgLAAgTQAAgMAFgIQAHgMASgLQASgJAogPIAAgHQABgYgIgJQgIgJgOAAQgLAAgGAGQgHAGAAAIIAAAKQAAAIgEAFQgDAEgHAAQgHAAgEgFQgEgEAAgIQAAgPAQgNQAPgNAcAAQAVAAANAIQALAFAEAMQAEAHAAAYIAAA1QAAAXABAGQAAAFACACQABAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgTAagSAAQgJAAgFgGQgGgGAAgOQgXATgGADQgKAFgLAAQgRAAgKgMgAgRAAQgNAIgHAIQgFAJAAAKQAAANAHAIQAIAIAKAAQANAAAUgRIAAg9QgZALgIADg");
	this.shape_160.setTransform(498.7,147.925);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgvA/QgUgYAAgnQAAglAXgYQAWgYAfAAQAYAAAPAOQAPAMAAAOQAAAGgEAEQgEAEgIAAQgLAAgFgGQgDgEgBgLQgBgKgGgFQgGgGgLABQgRgBgKANQgOASAAAcQAAAcAOAWQAOAWAXAAQARAAAOgMQAKgIAJgVIAFACQgHAggTASQgTAQgXAAQgaABgVgXg");
	this.shape_161.setTransform(473.125,148);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AglB9IAAgGQAMAAAEgDQAEgCADgFQACgFAAgQIAAg+QAAgZgCgHQgBgGgDgCQgCgCgFAAQgFAAgHADIgCgHIAvgUIAIAAIAACAQAAAQACAFQACAFAFACQAEADALAAIAAAGgAgKheQgFgFAAgHQAAgHAFgGQAFgFAGAAQAIAAAFAFQAFAGAAAHQAAAHgFAFQgFAFgIABQgGgBgFgFg");
	this.shape_162.setTransform(460.175,143.55);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgfBQIgKgBQgEgBgCAFIgGAAIAAg5IAGAAQAEAYAPANQAOAMAPAAQAMAAAJgHQAHgHAAgKQAAgMgJgJQgIgIgYgNQgagLgIgLQgIgJAAgPQAAgVAOgNQANgOAWAAQAJAAANAFIAMACQABAAAAAAQABAAAAAAQABAAAAAAQABgBABAAIADgGIAGAAIAAA4IgGAAQgHgbgKgIQgLgKgPAAQgMAAgIAGQgHAHAAAIQAAAKAFAHQAGAHAQAIIAZANQAkAQAAAcQAAAXgRANQgRANgUAAQgNABgTgGg");
	this.shape_163.setTransform(448.35,148);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AAhBTIAAgiQgUAWgLAGQgKAGgNAAQgNAAgJgIQgLgIgEgMQgDgNAAgWIAAhHQAAgLgDgFQgDgEgEgCQgFgCgMgBIAAgGIA4AAIAABqQAAAXAIAIQAHAGAMABQAGgBAKgFQAJgEANgOIAAhaQAAgNgEgFQgFgFgRgBIAAgGIA4AAIAABgQAAAcABAHQABAGADACQADADAEAAQAFAAAHgDIADAGIgxAUg");
	this.shape_164.setTransform(432.1,148.25);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AA6BTIAAgGIAEAAQAKAAAGgFQAEgCACgHIAAgRIAAhDQAAgVgEgHQgHgMgPAAQgKAAgJAFQgKAFgNANIAAABIAAAIIAABLQAAARACAEQACAEAFADQAFADAMAAIAAAGIhQAAIAAgGQANAAAFgEQAFgDACgGQABgDAAgPIAAhDQAAgUgGgJQgHgLgOAAQgKAAgJAFQgPAIgIAKIAABUQAAARADAEQACAFAEACQAEADAOAAIAAAGIhQAAIAAgGQALAAAEgDQAFgCACgFQACgFAAgQIAAg8QAAgagBgIQgCgGgCgCQgDgCgEAAQgFAAgHADIgDgHIAxgUIAHAAIAAAjIAVgUQAIgIAJgDQAJgEAJAAQAPAAAKAJQALAJAEARQASgVAMgHQANgHANAAQANAAAKAHQAKAHAGAOQADALAAAWIAABDQAAAPADAHQABADAFADQAFADALAAIAAAGg");
	this.shape_165.setTransform(409.175,147.75);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AAdB/IAAgWQgNAMgLAFQgKAGgNgBQgaABgUgXQgTgWgBgiQAAgjAXgbQAVgdAjgBQAUAAAOAOIAAgdQAAgcgBgGQgCgHgDgCQgDgCgEAAQgFAAgHACIgCgGIAvgUIAIAAIAAC6QABAcABAHQABAFADADQADACAEABQAEAAAJgDIABAFIgvAUgAgjgSQgRASABAjQAAAjAPATQAPATATAAQAQAAAPgQIAAhTQgCgLgFgJQgFgKgIgGQgJgEgIAAQgPAAgMANg");
	this.shape_166.setTransform(377.75,143.8);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AAJBTIAAgGIADAAQALAAAFgEQAEgDACgHQABgDAAgOIAAhAQAAgXgGgJQgGgKgNAAQgUAAgVAXIAABTQAAARACAEQACAFAFACQAEADANAAIAAAGIhQAAIAAgGIAEAAQAMgBAFgFQAEgHAAgSIAAg6QAAgdgBgGQgCgHgCgCQgDgCgFAAQgFAAgHADIgCgHIAwgUIAIAAIAAAjQAcgjAZAAQANAAAKAHQAJAHAGAOQAEALAAAWIAABDQAAAQACAGQACAEAEACQAFADALAAIAAAGg");
	this.shape_167.setTransform(359.125,147.75);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAhBTIAAgiQgUAWgLAGQgKAGgNAAQgNAAgJgIQgLgIgEgMQgDgNAAgWIAAhHQAAgLgDgFQgDgEgEgCQgFgCgMgBIAAgGIA4AAIAABqQAAAXAIAIQAHAGAMABQAGgBAKgFQAJgEANgOIAAhaQAAgNgEgFQgGgFgQgBIAAgGIA3AAIAABgQAAAcACAHQABAGADACQADADAEAAQAFAAAHgDIACAGIgwAUg");
	this.shape_168.setTransform(341.1,148.25);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("Ag7A4QgSgYAAgfQAAgVALgWQALgWASgJQASgMATAAQAlAAAWAdQATAXAAAfQAAAUgLAXQgKAWgSALQgSAMgWgBQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAZQAOAaAWAAQARAAALgOQALgOAAgjQAAgpgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_169.setTransform(323.075,148);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("Ag5BTIAAgGQAMAAAGgEQAEgDACgGQABgDAAgOIAAg+QAAgbgBgGQgBgFgDgDQgDgCgFAAQgFAAgHADIgCgHIAxgUIAHAAIAAAkQATgkAWAAQAJAAAHAGQAGAGAAAIQAAAGgFAFQgEAFgHAAQgGAAgHgGQgIgGgEAAQgDAAgEADQgHAIgIAQIAABMQAAAOADAGQACAGAGACQAFAEALAAIAAAGg");
	this.shape_170.setTransform(308.325,147.75);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AhDBrQgOgJAAgKQAAgEADgEQADgHAJgLIASgTQgJgGgEgEQgEgEAAgGQAAgGAGgIQAEgIASgOQgPgIgHgMQgJgOABgPQAAgYASgRQASgSAcAAQAWAAARAMIAiAAIAIAAIACACIABAFIgBAHIgBABIgJABIgVAAQAKAMAAAUQAAAWgSAQQgQAQgcAAQgMAAgNgDQgIAHgCAEQgDAFAAADQAAADADADQACADAJABIAYABQAkABAKACQARACAJAKQALAKgBAOQAAAUgSARQgbAagsAAQgiAAgXgPgAgzA9QgEAIAAAGQAAAJAKAGQARALAhAAQAgAAAOgLQAPgLABgNQgBgJgIgEQgKgEgagBQgngBgVgDQgJAJgEAIgAgchmQgJALAAAVQABAcAMAPQAIAMAOAAQANAAAJgKQAIgKAAgWQAAgcgMgPQgJgMgNAAQgNAAgJAKg");
	this.shape_171.setTransform(293.3,151.625);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AALB9IAAgGQAHAAACgDQADgBAAgDQAAgEgHgKIgxg/IAAA2QAAAPACAGQADAEAEACQAEADANAAIAAAGIhSAAIAAgGQANAAAGgEQADgBADgEQACgGAAgPIAAiRQAAgcgBgGQgCgGgCgDQgDgCgEAAQgEAAgIADIgDgGIAwgUIAIAAIAACfIApgkIAOgPIACgFQAAgDgDgDQgDgCgHgBIAAgFIBGAAIAAAFQgOABgKAEQgJAEgMAKIgoAlIAoA1QARAVAHAGQAIAIAGADQAEACAMAAIAAAGg");
	this.shape_172.setTransform(275.35,143.55);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgvA/QgUgYAAgnQAAglAXgYQAWgYAfAAQAYAAAPAOQAPAMAAAOQAAAGgEAEQgEAEgIAAQgLAAgFgGQgDgEgBgLQgBgKgGgFQgGgGgLABQgRgBgKANQgOASAAAcQAAAcAOAWQAOAWAXAAQARAAAOgMQAKgIAJgVIAFACQgHAggTASQgTAQgXAAQgaABgVgXg");
	this.shape_173.setTransform(258.125,148);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("Ag+BJQgKgLAAgTQAAgMAFgIQAIgMARgLQASgJAogPIAAgHQAAgYgHgJQgIgJgNAAQgLAAgHAGQgGAGgBAIIAAAKQABAIgEAFQgFAEgGAAQgHAAgEgFQgEgEAAgIQAAgPAPgNQAQgNAcAAQAUAAAOAIQAKAFAGAMQACAHAAAYIAAA1QAAAXABAGQABAFADACQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIAFgBIAOgNIAAAKQgUAagSAAQgIAAgFgGQgFgGgBgOQgYATgFADQgKAFgLAAQgQAAgMgMgAgRAAQgOAIgGAIQgFAJgBAKQAAANAIAIQAHAIAKAAQANAAAVgRIAAg9QgZALgIADg");
	this.shape_174.setTransform(242.7,147.925);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgaB7QgPgGgPgKIAAimQAAgbgBgGQgCgHgCgCQgDgCgEAAQgFAAgIACIgCgGIAwgUIAIAAIAAB1QAYggAagBQAYABATAVQASAVAAAkQAAAqgcAbQgZAWgeAAQgNAAgOgEgAgJgMQgHADgLAJIAABhQAJAIAKAFQAIAEAKAAQAQAAAOgRQAOgSAAghQAAgfgOgQQgOgQgRgBQgJAAgJAGg");
	this.shape_175.setTransform(224.425,143.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AAsB1QgPgIgRgTQgVAUgSAHQgRAIgTAAQgdAAgSgQQgRgPAAgWQAAgVAQgVQAPgVAqgWQgJgSgCgMQgDgMgBgKQABgeAWgQQARgNAWAAQAUAAANANQAOAMAAASQAAATgOAOQgMAOggARQAWAnAYAhQAfglAAgZQAAgIgFgGQgEgFgHgBIAAgGIBJAAIAAAGQgPACgHAFQgHAGgQAbQgQAcgTAYQAQASAMAHQANAIAMAAQAMAAAIgHQAJgHAEgMIAGAEQgHAZgOAMQgOAMgUAAQgOAAgPgIgAhQAZQgLAOABARQgBATAMAOQANAOAVAAQALAAAKgEQAKgEARgPQgWgfgJgPQgKgPgKgUQgVALgLAPgAgehkQgIALAAAKQAAAIADALQADALAIAUQAXgKAJgNQALgNAAgRQAAgMgIgIQgIgJgLAAQgPAAgHALg");
	this.shape_176.setTransform(193.2,144.125);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgfBQIgKgBQgEgBgDAFIgFAAIAAg5IAFAAQAFAYAOANQAOAMARAAQAMAAAIgHQAHgHAAgKQAAgMgIgJQgJgIgYgNQgagLgIgLQgIgJAAgPQAAgVAOgNQAOgOAVAAQAJAAANAFIAMACQABAAAAAAQABAAAAAAQABAAAAAAQABgBAAAAIAEgGIAGAAIAAA4IgGAAQgGgbgLgIQgLgKgPAAQgMAAgHAGQgIAHAAAIQAAAKAFAHQAGAHARAIIAZANQAjAQAAAcQAAAXgQANQgRANgVAAQgOABgSgGg");
	this.shape_177.setTransform(163.35,148);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AAcB/IAAgWQgMAMgKAFQgLAGgNgBQgaABgUgXQgTgWAAgiQAAgjAVgbQAWgdAigBQAUAAAOAOIAAgdQAAgcgBgGQgBgHgDgCQgDgCgEAAQgEAAgIACIgDgGIAxgUIAIAAIAAC6QAAAcABAHQABAFADADQADACAEABQAFAAAHgDIADAFIgxAUgAgkgSQgQASAAAjQAAAjAQATQAPATAUAAQAOAAAPgQIAAhTQAAgLgGgJQgFgKgJgGQgIgEgIAAQgPAAgNANg");
	this.shape_178.setTransform(147.75,143.8);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AAJBTIAAgGIADAAQALAAAFgEQAEgDACgHQABgDAAgOIAAhAQAAgXgGgJQgGgKgNAAQgUAAgVAXIAABTQAAARACAEQACAFAFACQAEADANAAIAAAGIhQAAIAAgGIAEAAQAMgBAFgFQAEgHAAgSIAAg6QAAgdgBgGQgCgHgCgCQgDgCgFAAQgFAAgHADIgCgHIAwgUIAIAAIAAAjQAcgjAZAAQANAAAKAHQAJAHAGAOQAEALAAAWIAABDQAAAQACAGQACAEAEACQAFADALAAIAAAGg");
	this.shape_179.setTransform(129.125,147.75);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AAiBTIAAgiQgWAWgKAGQgKAGgMAAQgOAAgJgIQgKgIgFgMQgDgNgBgWIAAhHQAAgLgCgFQgCgEgFgCQgFgCgMgBIAAgGIA4AAIAABqQAAAXAHAIQAIAGALABQAHgBAJgFQAKgEAOgOIAAhaQgBgNgFgFQgEgFgQgBIAAgGIA3AAIAABgQgBAcACAHQABAGADACQADADADAAQAGAAAHgDIADAGIgwAUg");
	this.shape_180.setTransform(111.1,148.25);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("Ag7A4QgSgYAAgfQAAgVALgWQALgWASgJQASgMATAAQAlAAAWAdQATAXAAAfQAAAUgLAXQgKAWgSALQgSAMgWgBQgkAAgWgdgAgXhDQgJAFgGAOQgGAOAAAWQAAAiAOAZQAOAaAWAAQARAAALgOQALgOAAgjQAAgpgSgZQgNgRgSAAQgKAAgJAGg");
	this.shape_181.setTransform(93.075,148);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AggBQIgJgBQgEgBgCAFIgGAAIAAg5IAGAAQAFAYAOANQAOAMAPAAQANAAAHgHQAIgHAAgKQAAgMgJgJQgIgIgZgNQgZgLgIgLQgIgJAAgPQAAgVAOgNQANgOAWAAQAIAAAOAFIAMACQABAAAAAAQABAAAAAAQABAAAAAAQABgBABAAIADgGIAGAAIAAA4IgGAAQgHgbgKgIQgKgKgQAAQgMAAgIAGQgHAHAAAIQAAAKAGAHQAFAHAQAIIAZANQAkAQAAAcQAAAXgRANQgRANgUAAQgOABgTgGg");
	this.shape_182.setTransform(77.35,148);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AglB9IAAgGQAMAAADgDQAFgCACgFQACgFAAgQIAAiRQAAgbgBgGQgBgGgDgDQgDgCgEAAQgFAAgHADIgDgGIAvgUIAIAAIAADUQAAAPACAGQADAFAEACQAFADAMAAIAAAGg");
	this.shape_183.setTransform(56.25,143.55);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AglB9IAAgGQAMAAAEgDQADgCADgFQACgFAAgQIAAiRQAAgbgBgGQgBgGgDgDQgDgCgEAAQgFAAgHADIgDgGIAvgUIAIAAIAADUQAAAPACAGQACAFAFACQAFADAMAAIAAAGg");
	this.shape_184.setTransform(46.25,143.55);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AAhB6IAAgGQAOgBAFgEQAEgFAAgFQAAgIgGgRIgPgiIhbAAIgQAmQgGANAAAHQAAAGAFAEQAFAFARABIAAAGIhLAAIAAgGQAPgDAEgEQAKgJAKgaIBVjDIAEAAIBUDFQAJAYAJAIQAIAGAOACIAAAGgAgzAdIBSAAIgohfg");
	this.shape_185.setTransform(28.05,143.85);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AgSBqQgHgHAAgLQAAgLAHgIQAIgHAKAAQALAAAHAHQAIAIAAALQAAALgIAHQgIAIgKAAQgKAAgIgIgAgRhEQgIgIAAgLQAAgLAIgHQAHgIAKAAQALAAAIAIQAHAHAAALQAAALgHAIQgIAHgLAAQgKAAgHgHg");
	this.shape_186.setTransform(467.425,76.325);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgrBrQgHgDgFAAQgGAAgDAHIgHAAIAAhNIAHAAQAHAhASAQQATARAWAAQAQAAAKgJQAKgKAAgNQAAgRgLgLQgLgLghgQQgigQgLgOQgKgNAAgVQAAgaASgSQASgSAdAAQAMAAASAGQAMADADAAQAEAAACgBIAFgIIAIAAIAABJIgIAAQgJgigNgNQgPgMgUAAQgQAAgLAJQgKAIAAALQAAANAIAJQAHAKAWALIAiAQQAvAXAAAmQAAAdgWASQgWASgcAAQgSAAgagHg");
	this.shape_187.setTransform(451.625,76.325);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgJCKQgLgGgFgLQgFgLAAgXIAAiQIgiAAIAAgHQANgFAOgNQANgMALgRQAFgJAJgXIAHAAIAABGIAyAAIAAAQIgyAAIAACLQAAAVAGAHQAGAHAJAAQAIAAAHgFQAIgFAEgJIAJAAQgIAXgPAMQgPALgQAAQgLAAgJgGg");
	this.shape_188.setTransform(435.525,72.975);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgxCnIAAgJQAPAAAGgDQAFgDADgHQADgHAAgUIAAhSQAAgjgCgKQgBgHgEgDQgDgDgGAAQgHAAgJADIgEgIIBAgaIAKAAIAACrQAAAUADAHQADAHAGADQAGADAPAAIAAAJgAgOh9QgHgHAAgKQAAgKAHgGQAHgIAJAAQAKAAAHAIQAHAGAAAKQAAAKgHAHQgHAHgKAAQgJAAgHgHg");
	this.shape_189.setTransform(422.025,70.375);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AAmCqIAAgeQgQAQgPAHQgNAHgSAAQgjAAgagdQgageAAguQgBguAdglQAdgmAvAAQAbgBASATIAAgpQAAgkgBgJQgDgIgDgDQgEgDgFAAQgHAAgKADIgCgIIBAgaIAKAAIAAD4QAAAlABAJQADAIAEADQADAEAFAAQAGgBALgEIADAIIhAAbgAgwgYQgUAYAAAuQgBAwAVAZQAUAaAagBQAUABAUgWIAAhvQgCgPgGgNQgIgNgLgHQgLgGgLAAQgUAAgRASg");
	this.shape_190.setTransform(404.1,70.7);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("Ag+BUQgcgeAAgzQAAg2AcgfQAdgfApAAQAkAAAYAYQAXAYAAAnIiUAAQAAAvAYAbQAXAcAfAAQAVAAAPgMQAQgMAKgcIAIAFQgFAggYAbQgYAagjAAQgmAAgbgegAgnhRQgPAPgDAbIBjAAQgBgVgEgIQgGgNgMgIQgLgHgMAAQgTAAgQAPg");
	this.shape_191.setTransform(380.825,76.325);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AhMBuIAAgIQAQAAAIgFQAGgEACgIQABgEAAgTIAAhSQAAgmgCgGQgBgIgEgDQgEgDgGgBQgHABgJADIgDgIIBBgaIAKAAIAAAwQAagwAcAAQANAAAIAIQAJAHAAALQAAAIgGAHQgGAGgJAAQgIABgKgJQgLgIgEAAQgEAAgGAFQgKAKgKAVIAABnQAAARAEAKQADAFAHAFQAIAEAOAAIAAAIg");
	this.shape_192.setTransform(362.25,76);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AhuBrQgggrAAg7QAAgvAVgoQAWgnAlgWQAlgWArAAQAjAAAiARQAJAFAEAAQAHAAAEgFQAHgGACgLIAIAAIAIBsIgIAAQgOgxgbgVQgbgVglAAQggAAgZAQQgaAQgOAjQgPAjAAAzQAAArAOAgQAOAgAcARQAbAQAjAAQAfAAAXgNQAZgNAcgnIAHAEQgYArggATQgfAUgtAAQhOAAgrg7g");
	this.shape_193.setTransform(338,71.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1475).to({state:[]},6).wait(14));

	// credits_button
	this.button_credits = new lib.button_credits();
	this.button_credits.name = "button_credits";
	this.button_credits.setTransform(677.5,544,1,1,0,0,0,100.5,37);
	this.button_credits._off = true;
	new cjs.ButtonHelper(this.button_credits, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_credits).wait(1474).to({_off:false},0).to({_off:true},1).wait(20));

	// End
	this.end_screentext = new lib.end_screentext();
	this.end_screentext.name = "end_screentext";
	this.end_screentext.setTransform(392.55,55.1,1,1,0,0,0,236.5,37.5);
	this.end_screentext._off = true;

	this.timeline.addTween(cjs.Tween.get(this.end_screentext).wait(1481).to({_off:false},0).to({_off:true},5).wait(9));

	// End
	this.end_screentext_1 = new lib.end_screentext();
	this.end_screentext_1.name = "end_screentext_1";
	this.end_screentext_1.setTransform(392.55,55.1,1,1,0,0,0,236.5,37.5);
	this.end_screentext_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.end_screentext_1).wait(1474).to({_off:false},0).to({_off:true},1).wait(20));

	// LevVEl_3_background
	this.instance_3 = new lib._void();
	this.instance_3.setTransform(401,303.15,1,1,0,0,0,401,302.3);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1481).to({_off:false},0).to({_off:true},1).wait(13));

	// Mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_794 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_795 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_796 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_797 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_798 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_799 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_800 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_801 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_802 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_803 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_804 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_805 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_806 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_807 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_808 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_809 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_810 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_811 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_812 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_813 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_814 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_815 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_816 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_817 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_818 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_819 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_820 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_821 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_822 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_823 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_824 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_825 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_826 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_827 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_828 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_829 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_830 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_831 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_832 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_833 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");
	var mask_1_graphics_834 = new cjs.Graphics().p("EgujANIIAA6PMBdHAAAIAAaPg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(794).to({graphics:mask_1_graphics_794,x:661,y:505.25}).wait(1).to({graphics:mask_1_graphics_795,x:645.5,y:505.25}).wait(1).to({graphics:mask_1_graphics_796,x:630,y:505.25}).wait(1).to({graphics:mask_1_graphics_797,x:614.45,y:505.25}).wait(1).to({graphics:mask_1_graphics_798,x:598.95,y:505.25}).wait(1).to({graphics:mask_1_graphics_799,x:583.45,y:505.25}).wait(1).to({graphics:mask_1_graphics_800,x:567.95,y:505.25}).wait(1).to({graphics:mask_1_graphics_801,x:552.45,y:505.25}).wait(1).to({graphics:mask_1_graphics_802,x:536.95,y:505.25}).wait(1).to({graphics:mask_1_graphics_803,x:521.4,y:505.25}).wait(1).to({graphics:mask_1_graphics_804,x:505.9,y:505.25}).wait(1).to({graphics:mask_1_graphics_805,x:490.4,y:505.25}).wait(1).to({graphics:mask_1_graphics_806,x:833.95,y:505.25}).wait(1).to({graphics:mask_1_graphics_807,x:795.8,y:505.25}).wait(1).to({graphics:mask_1_graphics_808,x:757.6,y:505.25}).wait(1).to({graphics:mask_1_graphics_809,x:719.45,y:505.25}).wait(1).to({graphics:mask_1_graphics_810,x:681.25,y:505.25}).wait(1).to({graphics:mask_1_graphics_811,x:643.1,y:505.25}).wait(1).to({graphics:mask_1_graphics_812,x:604.9,y:505.25}).wait(1).to({graphics:mask_1_graphics_813,x:566.75,y:505.25}).wait(1).to({graphics:mask_1_graphics_814,x:528.55,y:505.25}).wait(1).to({graphics:mask_1_graphics_815,x:490.4,y:505.25}).wait(1).to({graphics:mask_1_graphics_816,x:624.2,y:505.25}).wait(1).to({graphics:mask_1_graphics_817,x:607.5,y:505.25}).wait(1).to({graphics:mask_1_graphics_818,x:590.75,y:505.25}).wait(1).to({graphics:mask_1_graphics_819,x:574.05,y:505.25}).wait(1).to({graphics:mask_1_graphics_820,x:557.3,y:505.25}).wait(1).to({graphics:mask_1_graphics_821,x:540.6,y:505.25}).wait(1).to({graphics:mask_1_graphics_822,x:523.85,y:505.25}).wait(1).to({graphics:mask_1_graphics_823,x:507.15,y:505.25}).wait(1).to({graphics:mask_1_graphics_824,x:490.4,y:505.25}).wait(1).to({graphics:mask_1_graphics_825,x:298,y:262.1}).wait(1).to({graphics:mask_1_graphics_826,x:317.3,y:289.1}).wait(1).to({graphics:mask_1_graphics_827,x:336.6,y:316.15}).wait(1).to({graphics:mask_1_graphics_828,x:355.9,y:343.15}).wait(1).to({graphics:mask_1_graphics_829,x:375.2,y:370.15}).wait(1).to({graphics:mask_1_graphics_830,x:394.55,y:397.2}).wait(1).to({graphics:mask_1_graphics_831,x:413.85,y:424.2}).wait(1).to({graphics:mask_1_graphics_832,x:433.15,y:451.2}).wait(1).to({graphics:mask_1_graphics_833,x:452.45,y:478.25}).wait(1).to({graphics:mask_1_graphics_834,x:471.75,y:505.25}).wait(661));

	// text
	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#000000").s().p("AgdAJIAAgRIA8AAIAAARg");
	this.shape_194.setTransform(352.5,439.275);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#000000").s().p("AgfAqQgNgPAAgaQAAgbAOgPQAOgPAUAAQASAAAMAMQALAMAAATIhJAAQAAAYAMANQAMAOAOAAQALgBAIgFQAIgGAFgOIADACQgCAQgMANQgMAOgRAAQgTAAgOgPgAgTgoQgHAHgCAOIAxAAQgBgLgBgDQgDgIgGgDQgGgEgFAAQgKAAgIAIg");
	this.shape_195.setTransform(343.275,439.3);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#000000").s().p("AAFBTIAAgEIADAAQAIAAADgCQACgDABgEIABgLIAAgmQAAgSgCgEQgBgGgFgCQgEgDgFAAQgGAAgFADQgGADgJAIIAAA5QAAALACADQAAACAEACQADACAIAAIAAAEIg1AAIAAgEQAHAAAFgCQACgBABgEQACgDgBgKIAAhgIAAgXQgBgEgCgCQgCgBgDAAIgIACIgCgEIAhgNIAFAAIAABOQANgOAHgEQAHgEAIAAQAJAAAGAFQAHAFADALQACAGAAAUIAAAmQAAAKACAEQABADADABQADACAHAAIAAAEg");
	this.shape_196.setTransform(331.85,436.325);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_197.setTransform(322.675,437.625);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_198.setTransform(310.025,437.625);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#000000").s().p("AAPA0QgEgEAAgJQgPANgFACQgGACgHAAQgLAAgHgHQgIgIAAgMQAAgIAEgGQAFgIAMgHQALgGAbgKIAAgEQAAgQgFgGQgFgGgJAAQgHAAgFAEQgEAEAAAFIAAAHQAAAFgCADQgDADgFAAQgEAAgDgDQgDgDAAgFQAAgKALgJQAKgIATAAQANAAAJAFQAHADADAIQACAFAAAQIAAAjIABATIACAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAAAIADgBIAKgJIAAAHQgNARgMAAQgGAAgDgEgAgLAAQgJAFgEAGQgEAGAAAGQAAAJAFAFQAFAGAHAAQAJAAANgMIAAgoQgRAHgFACg");
	this.shape_199.setTransform(301.625,439.225);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#000000").s().p("AAFBTIAAgEIADAAQAHAAAEgCQACgDABgEIABgLIAAgmQAAgSgCgEQgBgGgFgCQgEgDgFAAQgGAAgFADQgHADgIAIIAAA5QAAALABADQACACADACQADACAIAAIAAAEIg1AAIAAgEQAHAAAFgCQACgBABgEQACgDgBgKIAAhgIAAgXQgBgEgCgCQgCgBgDAAIgIACIgCgEIAhgNIAFAAIAABOQANgOAHgEQAHgEAIAAQAJAAAGAFQAHAFADALQACAGAAAUIAAAmQAAAKACAEQABADADABQADACAHAAIAAAEg");
	this.shape_200.setTransform(289.9,436.325);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#000000").s().p("AAlBRIgkhkIgjBkIgEAAIgwiDIgGgRQgDgEgEgDQgEgCgHAAIAAgEIA7AAIAAAEIgDAAQgGAAgDADQgDADAAAEQAAAEAFAPIAfBYIAahLIgEgNIgEgLIgFgKIgEgEIgGgDIgHgBIAAgEIA9AAIAAAEIgEAAQgHAAgDADQgDADAAAFQAAAGAFAOIAfBWIAehXQAFgOAAgGQAAgDgCgCQgBgCgDgBQgEgCgIAAIAAgEIAwAAIAAAEQgGAAgEACQgEADgEAGIgHATIgsB/g");
	this.shape_201.setTransform(272.625,436.875);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQADgDAFAAQAFAAAEADQAEAFAAAEQAAAFgEAEQgEAEgFAAQgFAAgDgEg");
	this.shape_202.setTransform(252.7,443.7);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQAEgDAEAAQAGAAAEADQADAFAAAEQAAAFgDAEQgEAEgGAAQgEAAgEgEg");
	this.shape_203.setTransform(246.7,443.7);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQAEgDAEAAQAGAAADADQAEAFAAAEQAAAFgEAEQgDAEgGAAQgEAAgEgEg");
	this.shape_204.setTransform(240.7,443.7);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#000000").s().p("AgEBFQgFgDgDgFQgCgGAAgMIAAhHIgRAAIAAgEQAGgCAHgGQAHgHAFgIIAGgQIAEAAIAAAjIAZAAIAAAIIgZAAIAABFQAAAKADAEQADADAFAAQADAAAEgCQAEgCACgFIAEAAQgEALgHAGQgIAGgIAAQgFAAgEgDg");
	this.shape_205.setTransform(234.525,437.625);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEQgBgEgCgBQgCgCgCAAIgIACIgCgEIAfgNIAGAAIAABVQgBAKACADQACAEACABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAFAAADADQADAEABAEQgBAFgDAEQgDADgFAAQgEAAgDgDg");
	this.shape_206.setTransform(227.8,436.325);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#000000").s().p("AAPA0QgEgEAAgJQgPANgFACQgGACgHAAQgLAAgHgHQgIgIAAgMQAAgIAEgGQAFgIAMgHQALgGAbgKIAAgEQAAgQgFgGQgFgGgJAAQgHAAgFAEQgEAEAAAFIAAAHQAAAFgCADQgDADgFAAQgEAAgDgDQgDgDAAgFQAAgKALgJQAKgIATAAQANAAAJAFQAHADADAIQACAFAAAQIAAAjIABATIACAEQAAABABAAQAAAAAAAAQABABAAAAQABAAAAAAIADgBIAKgJIAAAHQgNARgMAAQgGAAgDgEgAgLAAQgJAFgEAGQgEAGAAAGQAAAJAFAFQAFAGAHAAQAJAAANgMIAAgoQgRAHgFACg");
	this.shape_207.setTransform(219.475,439.225);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#000000").s().p("AAlBRIgkhkIgjBkIgEAAIgwiDIgGgRQgDgEgEgDQgEgCgHAAIAAgEIA7AAIAAAEIgDAAQgGAAgDADQgDADAAAEQAAAEAFAPIAfBYIAahLIgEgNIgEgLIgFgKIgEgEIgGgDIgHgBIAAgEIA9AAIAAAEIgEAAQgHAAgDADQgDADAAAFQAAAGAFAOIAfBWIAehXQAFgOAAgGQAAgDgCgCQgBgCgDgBQgEgCgIAAIAAgEIAwAAIAAAEQgGAAgEACQgEADgEAGIgHATIgsB/g");
	this.shape_208.setTransform(204.375,436.875);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#000000").s().p("AgLBPQgDgEAAgFQAAgGADgDQAEgEAFAAQAFAAAEAEQADADABAGQgBAFgDAEQgEAEgFAAQgFAAgEgEgAgFAqQABgPADgJQACgKAJgQQAHgNACgHQACgHAAgIQAAgPgIgIQgHgJgLAAQgKAAgGAFQgGAEAAAGQAAAEAEAHQADAGAAADQAAAFgDACQgCADgEAAQgFAAgEgFQgEgEAAgJQAAgNALgLQALgKAUAAQAXAAALAOQAJALAAAMQAAAJgEAJQgEAJgLAMQgQASgEAIQgEAIAAAOg");
	this.shape_209.setTransform(521.65,436.675);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#000000").s().p("AAIBTIAAgEIAGgBQAAgBAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgCgFgGIgfgrIAagXIAKgLIABgCQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQgCgCgEAAIAAgEIAuAAIAAAEQgJAAgHADQgGACgIAHIgaAZIAaAiIAQATQAFAFAEACQADABAIAAIAAAEgAg7BTIAAgEQAIAAAFgCQACgBABgDQACgEAAgJIAAhhQAAgTgBgEIgCgGQgCgBgDAAIgIACIgCgEIAggNIAGAAIAABpIAAAkQAAALABADQABADADACIAMABIAAAEg");
	this.shape_210.setTransform(499.775,436.325);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#000000").s().p("AguBTIAAgEIAFAAQAEAAAEgCQAEgDACgEQABgEAAgLIAAhGIgUAAIAAgIIAUAAIAAgHQAAgQAGgLQAEgLALgHQAKgHANAAQAMAAALAIQAGAFAAAHQAAADgCADQgEADgEAAIgFgBQgDgCgEgHQgFgGgDgCQgEgDgEAAQgGAAgDADQgDADgCAGQgBAGgBAZIAAAIIAbAAIAAAIIgbAAIAABGQAAAPAEAEQADAFAIAAIAJAAIAAAEg");
	this.shape_211.setTransform(480.65,436.325);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_212.setTransform(441.125,439.3);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#000000").s().p("AAXA3IAAgWQgOAPgIAEQgGADgIAAQgJABgHgGQgGgFgDgJQgCgHAAgPIAAgwQAAgHgCgDQgCgDgDgBQgDgCgJAAIAAgFIAmAAIAABHQAAAPAFAFQAGAFAHAAQAEAAAGgEQAHgCAJgKIAAg7QAAgKgEgDQgDgDgLAAIAAgFIAlAAIAABAQAAAUABAEQABADACADQAAAAABAAQAAAAABABQAAAAABAAQABAAAAAAQAEAAAEgCIACAEIggANg");
	this.shape_213.setTransform(430.275,439.45);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#000000").s().p("AgaBqQgGgEAAgFQAAgEADgDQADgCAEAAQADgBADACIAIAGQAGAFACAAQADAAADgCQADgDABgFQABgEAAgRIAAhMQAAgSgBgEQgBgFgBgBQgCgBgDgBQgDAAgEACIgCgEIAfgNIAGAAIAABrQAAAbgMAOQgMANgSAAQgKAAgFgDgAAMhYQgEgEAAgEQAAgFAEgEQAEgEAEAAQAFAAAEAEQAEAEAAAFQAAAEgEAEQgEAEgFAAQgEAAgEgEg");
	this.shape_214.setTransform(419.075,438.9);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#000000").s().p("AgZBTIAAgEQAIAAACgBQADgCACgEQABgDABgKIAAhhQAAgSgBgEQgBgEgCgCQAAAAgBAAQgBgBAAAAQgBAAAAAAQgBAAAAAAIgJACIgBgEIAegNIAGAAIAACNQAAAKABADQACAEADABQADACAJAAIAAAEg");
	this.shape_215.setTransform(408.45,436.325);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#000000").s().p("AgZBTIAAgEQAIAAACgBQADgCACgEQABgDABgKIAAhhQAAgSgBgEQgBgEgCgCQAAAAgBAAQgBgBAAAAQgBAAAAAAQgBAAgBAAIgIACIgBgEIAegNIAGAAIAACNQAAAKABADQACAEADABQADACAIAAIAAAEg");
	this.shape_216.setTransform(401.8,436.325);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#000000").s().p("AAWBRIAAgEQAJgBAEgCQADgDAAgEQAAgFgFgLIgJgXIg9AAIgLAZQgEAJAAAFQAAAEAEACQADADAMABIAAAEIgyAAIAAgEQAKgCADgDQAFgFAIgSIA4iBIADAAIA3CDQAHAQAFAFQAGAEAJABIAAAEgAghATIA1AAIgag/g");
	this.shape_217.setTransform(389.625,436.525);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQADgDAFAAQAFAAAFADQADAFAAAEQAAAFgDAEQgFAEgFAAQgFAAgDgEg");
	this.shape_218.setTransform(367.3,443.7);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#000000").s().p("AATBVIAAgQQgIAIgHAFQgHADgIAAQgSAAgNgPQgNgOAAgYQAAgXAOgSQAPgTAXAAQANAAAJAJIAAgUQAAgTgBgDQgBgFgCgBQAAgBgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAIgIACIgCgEIAggNIAFAAIAAB7QAAATABAEQABAEACACQABAAAAABQABAAAAAAQABAAABAAQAAAAABAAIAIgBIABADIggAOgAgXgMQgLAMAAAXQAAAXAKANQALANAMAAQAKAAAKgLIAAg3QgBgHgDgGQgEgHgFgEQgGgDgFAAQgKAAgIAJg");
	this.shape_219.setTransform(358.725,436.5);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQABgDAAgKIAAhhQAAgSgBgEQAAgEgCgCQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBAAgBAAIgHACIgDgEIAggNIAFAAIAACNQAAAKACADQABAEADABQADACAIAAIAAAEg");
	this.shape_220.setTransform(349.1,436.325);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#000000").s().p("AgmA3IAAgEQAJAAADgDQAEgBABgFIAAgLIAAgoIAAgXQgBgDgDgCQgCgCgCAAQgEAAgFACIgBgEIAggNIAFAAIAAAYQANgYAOAAQAGAAAEAEQAFAEAAAFQAAAEgDADQgDAEgEAAQgFAAgEgEQgGgEgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAgBABQgFAFgFALIAAAyQABAJABAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_221.setTransform(341.8,439.125);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_222.setTransform(331.625,439.3);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#000000").s().p("AAdA3IgbhDIgeBDIgEAAIgjhZQgDgJgDgDQgEgDgHgBIAAgFIAtAAIAAAFQgGAAgCACQgCACAAADQAAAEACAFIAXA9IAXgxIgGgQQgDgHgEgDQgDgCgHAAIAAgFIAyAAIAAAFQgIAAgEADQgCACAAAEIABAFIAYA8IAXg6QACgHAAgDQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAgBgBAAQgCgCgHAAIAAgFIAiAAIAAAFQgKABgFANIgkBbg");
	this.shape_223.setTransform(316.925,439.45);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_224.setTransform(297.775,439.3);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCABgEQACgDAAgKIAAgpQAAgSgBgEQgBgEgCgBQgBgCgEAAIgHACIgCgEIAggNIAFAAIAABVQAAAKABADQABAEADABQADACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAFAAADADQADAEABAEQgBAFgDAEQgDADgFAAQgEAAgDgDg");
	this.shape_225.setTransform(289.7,436.325);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#000000").s().p("AAGBTIAAgEIACAAQAIAAACgCQADgDABgEIABgLIAAgmQAAgSgCgEQgCgGgDgCQgEgDgGAAQgGAAgFADQgHADgIAIIAAA5QAAALACADQABACADACQADACAJAAIAAAEIg2AAIAAgEQAIAAAEgCQACgBABgEQABgDAAgKIAAhgIAAgXQgBgEgCgCQgCgBgDAAIgIACIgCgEIAggNIAGAAIAABOQANgOAHgEQAHgEAIAAQAJAAAGAFQAHAFADALQADAGAAAUIAAAmQAAAKABAEQABADADABQADACAHAAIAAAEg");
	this.shape_226.setTransform(280.3,436.325);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_227.setTransform(257.125,439.3);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#000000").s().p("AgYBTIAAgEQAHAAADgBQADgCACgEQABgDAAgKIAAgpQAAgSgBgEQgBgEgCgBQgCgCgCAAIgIACIgCgEIAfgNIAGAAIAABVQgBAKACADQABAEAEABQACACAIAAIAAAEgAgGg+QgEgEAAgFQAAgEAEgEQADgDAEAAQAFAAADADQADAEAAAEQAAAFgDAEQgDADgFAAQgEAAgDgDg");
	this.shape_228.setTransform(249.05,436.325);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#000000").s().p("AgwBMQgEgEAAgGQAAgEADgDQADgDAGAAQAEAAAGACIAHACQADAAAEgEQAEgDAFgLIAHgSIgnhQQgBgEgEgFQgDgFgCgBQgDgCgGgBIAAgFIAzAAIAAAFIgDAAQgGAAgCACQgCACgBAEQAAAEAFAIIAZA2IAXg7QACgFAAgEIgBgDIgDgCIgHgBIAAgFIAjAAIAAAFIgGACIgFAFIgEAJIgrBqQgHAQgJAIQgLAIgKAAQgGAAgFgEg");
	this.shape_229.setTransform(233.65,441.875);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#000000").s().p("AAGBTIAAgEIACAAQAHAAADgCQAEgDABgEIAAgLIAAgmQAAgSgBgEQgCgGgFgCQgDgDgGAAQgGAAgFADQgGADgJAIIAAA5QAAALABADQACACADACQADACAJAAIAAAEIg2AAIAAgEQAIAAADgCQADgBABgEQABgDABgKIAAhgIgBgXQgBgEgCgCQgCgBgDAAIgIACIgBgEIAfgNIAGAAIAABOQANgOAHgEQAIgEAHAAQAJAAAHAFQAGAFAEALQACAGgBAUIAAAmQABAKABAEQACADACABQADACAIAAIAAAEg");
	this.shape_230.setTransform(221.65,436.325);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQAEgDAEAAQAFAAAFADQADAFAAAEQAAAFgDAEQgFAEgFAAQgEAAgEgEg");
	this.shape_231.setTransform(314.1,443.7);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#000000").s().p("AgvBMQgFgEAAgGQAAgEADgDQAEgDAFAAQAEAAAHACIAFACQAEAAAEgEQAEgDAEgLIAIgSIgmhQQgCgEgEgFQgDgFgCgBQgCgCgGgBIAAgFIAxAAIAAAFIgCAAQgFAAgDACQgCACAAAEQAAAEADAIIAaA2IAYg7QACgFAAgEIgBgDIgEgCIgGgBIAAgFIAjAAIAAAFIgHACIgFAFIgEAJIgrBqQgGAQgLAIQgKAIgJAAQgHAAgEgEg");
	this.shape_232.setTransform(300.65,441.875);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAFgDQADgBAAgFIABgLIAAgoIgBgXQAAgDgCgCQgDgCgDAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAFAEQAEAEAAAFQAAAEgDADQgDAEgEAAQgEAAgFgEQgFgEgDAAQAAAAgBAAQgBAAAAAAQgBABAAAAQgBAAAAABQgGAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_233.setTransform(290.8,439.125);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAFgDQACgBABgFIABgLIAAgoIgBgXQgBgDgBgCQgCgCgEAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAFAEQAEAEAAAFQAAAEgDADQgDAEgFAAQgEAAgEgEQgFgEgDAAQAAAAgBAAQgBAAAAAAQgBABAAAAQgBAAAAABQgGAFgFALIAAAyQABAJABAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_234.setTransform(282.8,439.125);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_235.setTransform(245.275,439.3);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#000000").s().p("AAnA3IAAgEIACAAQAHAAAEgDQADgCABgEIAAgLIAAgtQAAgNgDgGQgEgHgLAAQgGAAgGADQgGADgJAIIAAACIAAAFIAAAyQAAALABADQABACAEACQADACAIAAIAAAEIg1AAIAAgEQAJAAADgCQAEgCABgEIAAgMIAAgtQAAgNgDgGQgGgIgJAAQgGAAgGAEQgKAFgFAGIAAA5QAAALABADIAEAFQADABAJAAIAAAEIg1AAIAAgEQAHAAADgBQADgCACgEQABgDAAgKIAAgoQAAgSgBgFQgBgEgBgBQgCgCgDAAQgDAAgFACIgCgEIAhgNIAFAAIAAAXIANgOQAGgEAGgDQAGgCAGAAQAKAAAGAGQAIAFACAMQAMgOAIgFQAJgEAIAAQAJAAAHAEQAGAFAEAJQADAHAAAPIAAAtQAAAKABAEQABACAEACQADACAHAAIAAAEg");
	this.shape_236.setTransform(214.675,439.125);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#000000").s().p("AgCAiIgGgiIgDgTQAAgHADgEQADgDAFAAQAFAAADADQAEAEAAAFIgDAVIgHAig");
	this.shape_237.setTransform(203.125,431.825);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#000000").s().p("AghBQIAAgFIAFAAQALAAAEgGQADgEgBgOIAAhmQABgMgCgDQgBgDgEgCQgFgDgGAAIgFAAIAAgEIBDAAIAAAEIgFAAQgKAAgFAGQgDADAAAOIAABmQAAAMACAEIAEAGQAGACAGAAIAFAAIAAAFg");
	this.shape_238.setTransform(197,436.7);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#000000").s().p("AgvBMQgFgEAAgGQAAgEADgDQAEgDAFAAQAEAAAHACIAFACQAEAAAEgEQAEgDAEgLIAIgSIgmhQQgCgEgEgFQgDgFgCgBQgCgCgGgBIAAgFIAxAAIAAAFIgCAAQgFAAgDACQgCACAAAEQAAAEADAIIAZA2IAZg7QACgFAAgEIgBgDIgEgCIgGgBIAAgFIAjAAIAAAFIgHACIgFAFIgEAJIgrBqQgGAQgLAIQgKAIgJAAQgHAAgEgEg");
	this.shape_239.setTransform(702.95,441.875);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAFgDQACgBABgFIABgLIAAgoIgBgXQgBgDgBgCQgDgCgDAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAFAEQAEAEAAAFQAAAEgDADQgDAEgEAAQgEAAgFgEQgGgEgCAAQAAAAgBAAQgBAAAAAAQgBABAAAAQgBAAAAABQgGAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_240.setTransform(693.1,439.125);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAFgDQACgBABgFIABgLIAAgoIgBgXQgBgDgBgCQgCgCgEAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAFAEQAEAEAAAFQAAAEgDADQgDAEgFAAQgEAAgFgEQgEgEgDAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABQgGAFgFALIAAAyQABAJABAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_241.setTransform(685.1,439.125);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#000000").s().p("AghBQIAAgFIAFAAQALAAAEgGQACgEAAgOIAAhmQABgMgCgDQgBgDgEgCQgFgDgGAAIgFAAIAAgEIBDAAIAAAEIgFAAQgKAAgFAGQgDADAAAOIAABmQAAAMACAEIAEAGQAGACAGAAIAFAAIAAAFg");
	this.shape_242.setTransform(599.3,436.7);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQAEgDAEAAQAGAAAEADQADAFAAAEQAAAFgDAEQgEAEgGAAQgEAAgEgEg");
	this.shape_243.setTransform(586.3,443.7);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQADgDAFAAQAFAAAEADQAEAFAAAEQAAAFgEAEQgEAEgFAAQgFAAgDgEg");
	this.shape_244.setTransform(580.3,443.7);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQAEgDAEAAQAFAAAFADQADAFAAAEQAAAFgDAEQgFAEgFAAQgEAAgEgEg");
	this.shape_245.setTransform(574.3,443.7);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#000000").s().p("AgwBMQgEgEAAgGQAAgEADgDQADgDAGAAQAEAAAGACIAGACQAEAAAEgEQAEgDAFgLIAHgSIgnhQQgBgEgEgFQgDgFgCgBQgCgCgHgBIAAgFIAzAAIAAAFIgDAAQgGAAgCACQgDACAAAEQABAEAEAIIAZA2IAXg7QADgFAAgEIgBgDIgEgCIgHgBIAAgFIAjAAIAAAFIgGACIgFAFIgEAJIgrBqQgGAQgKAIQgLAIgJAAQgHAAgFgEg");
	this.shape_246.setTransform(566.85,441.875);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAEgDQAEgBABgFIAAgLIAAgoIAAgXQgBgDgCgCQgDgCgCAAQgEAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAEAEQAFAEAAAFQAAAEgDADQgDAEgEAAQgFAAgEgEQgFgEgDAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAgBABQgFAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_247.setTransform(557,439.125);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#000000").s().p("AgmA3IAAgEQAIAAAFgDQADgBAAgFIABgLIAAgoIgBgXQAAgDgCgCQgDgCgDAAQgDAAgFACIgBgEIAhgNIAEAAIAAAYQANgYAOAAQAGAAAEAEQAFAEAAAFQAAAEgDADQgDAEgEAAQgFAAgEgEQgFgEgDAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAgBABQgFAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_248.setTransform(549,439.125);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_249.setTransform(538.825,439.3);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_250.setTransform(511.475,439.3);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_251.setTransform(500.975,439.3);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#000000").s().p("AAnA3IAAgEIACAAQAHAAAEgDQADgCABgEIAAgLIAAgtQAAgNgDgGQgEgHgLAAQgGAAgGADQgGADgJAIIAAACIAAAFIAAAyQAAALABADQABACAEACQADACAIAAIAAAEIg1AAIAAgEQAJAAADgCQAEgCABgEIAAgMIAAgtQAAgNgDgGQgGgIgJAAQgGAAgGAEQgKAFgFAGIAAA5QAAALABADIAEAFQADABAJAAIAAAEIg1AAIAAgEQAHAAADgBQADgCACgEQABgDAAgKIAAgoQAAgSgBgFQgBgEgBgBQgCgCgDAAQgDAAgFACIgCgEIAhgNIAFAAIAAAXIANgOQAGgEAGgDQAGgCAGAAQAKAAAGAGQAIAFACAMQAMgOAIgFQAJgEAIAAQAJAAAHAEQAGAFAEAJQADAHAAAPIAAAtQAAAKABAEQABACAEACQADACAHAAIAAAEg");
	this.shape_252.setTransform(480.875,439.125);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#000000").s().p("AgCAiIgGgiIgDgTQAAgHADgEQADgDAFAAQAFAAADADQAEAEAAAFIgDAVIgHAig");
	this.shape_253.setTransform(469.325,431.825);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#000000").s().p("AghBQIAAgFIAGAAQAKAAAEgGQACgEABgOIAAhmQgBgMgBgDQgBgDgEgCQgFgDgFAAIgGAAIAAgEIBDAAIAAAEIgGAAQgJAAgFAGQgDADAAAOIAABmQAAAMACAEIAEAGQAFACAGAAIAGAAIAAAFg");
	this.shape_254.setTransform(463.2,436.7);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQADgDAFAAQAGAAADADQAEAFAAAEQAAAFgEAEQgDAEgGAAQgFAAgDgEg");
	this.shape_255.setTransform(444.2,443.7);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQADgDAFAAQAFAAAEADQAEAFAAAEQAAAFgEAEQgEAEgFAAQgFAAgDgEg");
	this.shape_256.setTransform(438.2,443.7);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#000000").s().p("AgmA3IAAgEQAJAAADgDQADgBACgFIAAgLIAAgoIAAgXQgCgDgCgCQgCgCgCAAQgEAAgFACIgBgEIAggNIAGAAIAAAYQAMgYAOAAQAHAAADAEQAFAEAAAFQAAAEgDADQgDAEgFAAQgDAAgGgEQgFgEgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAgBABQgFAFgEALIAAAyQAAAJABAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_257.setTransform(420.9,439.125);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#000000").s().p("AgmA3IAAgEQAJAAADgDQAEgBABgFIAAgLIAAgoIAAgXQgBgDgDgCQgCgCgCAAQgEAAgFACIgBgEIAggNIAFAAIAAAYQANgYAOAAQAGAAAEAEQAFAEAAAFQAAAEgDADQgDAEgEAAQgFAAgEgEQgGgEgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAgBABQgFAFgFALIAAAyQAAAJACAFQABADAEACQAEACAHAAIAAAEg");
	this.shape_258.setTransform(412.9,439.125);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_259.setTransform(402.725,439.3);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_260.setTransform(392.225,439.3);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_261.setTransform(375.375,439.3);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_262.setTransform(364.875,439.3);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#000000").s().p("AAnA3IAAgEIACAAQAHAAAEgDQADgCABgEIAAgLIAAgtQAAgNgDgGQgEgHgLAAQgGAAgGADQgGADgJAIIAAACIAAAFIAAAyQAAALABADQABACAEACQADACAIAAIAAAEIg1AAIAAgEQAJAAADgCQAEgCABgEIAAgMIAAgtQAAgNgDgGQgGgIgJAAQgGAAgGAEQgKAFgFAGIAAA5QAAALABADIAEAFQADABAJAAIAAAEIg1AAIAAgEQAHAAADgBQADgCACgEQABgDAAgKIAAgoQAAgSgBgFQgBgEgBgBQgCgCgDAAQgDAAgFACIgCgEIAhgNIAFAAIAAAXIANgOQAGgEAGgDQAGgCAGAAQAKAAAGAGQAIAFACAMQAMgOAIgFQAJgEAIAAQAJAAAHAEQAGAFAEAJQADAHAAAPIAAAtQAAAKABAEQABACAEACQADACAHAAIAAAEg");
	this.shape_263.setTransform(344.775,439.125);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#000000").s().p("AgCAiIgGgiIgDgTQAAgHADgEQADgDAFAAQAFAAADADQAEAEAAAFIgDAVIgHAig");
	this.shape_264.setTransform(333.225,431.825);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#000000").s().p("AghBQIAAgFIAGAAQAJAAAFgGQADgEAAgOIAAhmQAAgMgCgDQgBgDgDgCQgGgDgFAAIgGAAIAAgEIBDAAIAAAEIgGAAQgKAAgEAGQgDADAAAOIAABmQAAAMABAEIAGAGQAFACAFAAIAGAAIAAAFg");
	this.shape_265.setTransform(327.1,436.7);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQADgDAFAAQAFAAAEADQAEAFAAAEQAAAFgEAEQgEAEgFAAQgFAAgDgEg");
	this.shape_266.setTransform(320.1,443.7);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQAEgDAEAAQAFAAAFADQADAFAAAEQAAAFgDAEQgFAEgFAAQgEAAgEgEg");
	this.shape_267.setTransform(314.1,443.7);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#000000").s().p("AgIAJQgEgEAAgFQAAgEAEgFQAEgDAEAAQAGAAAEADQADAFAAAEQAAAFgDAEQgEAEgGAAQgEAAgEgEg");
	this.shape_268.setTransform(308.1,443.7);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_269.setTransform(272.625,439.3);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_270.setTransform(262.125,439.3);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#000000").s().p("AgnAmQgMgRAAgUQAAgOAIgPQAHgOAMgHQAMgHAMAAQAZAAAOASQANARAAAUQAAANgHAPQgHAPgMAHQgMAIgOAAQgYAAgPgTgAgPgsQgGADgEAJQgEAKAAAOQAAAXAKAQQAJARAOAAQALAAAIgJQAHgJAAgXQAAgbgMgRQgIgMgMAAQgHAAgGAFg");
	this.shape_271.setTransform(245.275,439.3);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#000000").s().p("AgVA2IgGgCQgDAAgBADIgEAAIAAgmIAEAAQADAQAJAIQAKAJAKAAQAIAAAFgFQAFgEAAgIQAAgHgFgGQgGgGgQgIQgRgHgFgHQgGgHAAgKQAAgNAKgJQAJgJAOAAQAFAAAJADIAIACIADgBIADgEIAEAAIAAAkIgEAAQgFgQgHgHQgHgGgJAAQgJAAgFAEQgFAEAAAGQAAAHAEAEQAEAFALAGIAQAIQAYAKAAATQAAAPgLAJQgLAJgOAAQgJAAgNgDg");
	this.shape_272.setTransform(234.775,439.3);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#000000").s().p("AAnA3IAAgEIACAAQAHAAAEgDQADgCABgEIAAgLIAAgtQAAgNgDgGQgEgHgLAAQgGAAgGADQgGADgJAIIAAACIAAAFIAAAyQAAALABADQABACAEACQADACAIAAIAAAEIg1AAIAAgEQAJAAADgCQAEgCABgEIAAgMIAAgtQAAgNgDgGQgGgIgJAAQgGAAgGAEQgKAFgFAGIAAA5QAAALABADIAEAFQADABAJAAIAAAEIg1AAIAAgEQAHAAADgBQADgCACgEQABgDAAgKIAAgoQAAgSgBgFQgBgEgBgBQgCgCgDAAQgDAAgFACIgCgEIAhgNIAFAAIAAAXIANgOQAGgEAGgDQAGgCAGAAQAKAAAGAGQAIAFACAMQAMgOAIgFQAJgEAIAAQAJAAAHAEQAGAFAEAJQADAHAAAPIAAAtQAAAKABAEQABACAEACQADACAHAAIAAAEg");
	this.shape_273.setTransform(214.675,439.125);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#000000").s().p("AgCAiIgGgiIgDgTQAAgHADgEQADgDAFAAQAFAAADADQAEAEAAAFIgDAVIgHAig");
	this.shape_274.setTransform(203.125,431.825);

	var maskedShapeInstanceList = [this.shape_194,this.shape_195,this.shape_196,this.shape_197,this.shape_198,this.shape_199,this.shape_200,this.shape_201,this.shape_202,this.shape_203,this.shape_204,this.shape_205,this.shape_206,this.shape_207,this.shape_208,this.shape_209,this.shape_210,this.shape_211,this.shape_212,this.shape_213,this.shape_214,this.shape_215,this.shape_216,this.shape_217,this.shape_218,this.shape_219,this.shape_220,this.shape_221,this.shape_222,this.shape_223,this.shape_224,this.shape_225,this.shape_226,this.shape_227,this.shape_228,this.shape_229,this.shape_230,this.shape_231,this.shape_232,this.shape_233,this.shape_234,this.shape_235,this.shape_236,this.shape_237,this.shape_238,this.shape_239,this.shape_240,this.shape_241,this.shape_242,this.shape_243,this.shape_244,this.shape_245,this.shape_246,this.shape_247,this.shape_248,this.shape_249,this.shape_250,this.shape_251,this.shape_252,this.shape_253,this.shape_254,this.shape_255,this.shape_256,this.shape_257,this.shape_258,this.shape_259,this.shape_260,this.shape_261,this.shape_262,this.shape_263,this.shape_264,this.shape_265,this.shape_266,this.shape_267,this.shape_268,this.shape_269,this.shape_270,this.shape_271,this.shape_272,this.shape_273,this.shape_274];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_208},{t:this.shape_207,p:{x:219.475}},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203,p:{x:246.7}},{t:this.shape_202,p:{x:252.7}},{t:this.shape_201,p:{x:272.625}},{t:this.shape_200},{t:this.shape_199,p:{x:301.625}},{t:this.shape_198,p:{x:310.025}},{t:this.shape_197,p:{x:322.675}},{t:this.shape_196},{t:this.shape_195,p:{x:343.275}},{t:this.shape_194}]},794).to({state:[{t:this.shape_208},{t:this.shape_207,p:{x:219.475}},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203,p:{x:246.7}},{t:this.shape_202,p:{x:252.7}},{t:this.shape_201,p:{x:272.625}},{t:this.shape_200},{t:this.shape_199,p:{x:301.625}},{t:this.shape_198,p:{x:310.025}},{t:this.shape_197,p:{x:322.675}},{t:this.shape_196},{t:this.shape_195,p:{x:343.275}},{t:this.shape_194}]},11).to({state:[{t:this.shape_201,p:{x:204.375}},{t:this.shape_230},{t:this.shape_229,p:{x:233.65}},{t:this.shape_228},{t:this.shape_227,p:{x:257.125}},{t:this.shape_198,p:{x:271.125}},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224,p:{x:297.775}},{t:this.shape_223},{t:this.shape_222,p:{x:331.625}},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218,p:{x:367.3}},{t:this.shape_202,p:{x:373.3}},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212,p:{x:441.125}},{t:this.shape_197,p:{x:449.125}},{t:this.shape_207,p:{x:464.025}},{t:this.shape_211},{t:this.shape_199,p:{x:488.675}},{t:this.shape_210},{t:this.shape_195,p:{x:511.025}},{t:this.shape_209}]},1).to({state:[{t:this.shape_201,p:{x:204.375}},{t:this.shape_230},{t:this.shape_229,p:{x:233.65}},{t:this.shape_228},{t:this.shape_227,p:{x:257.125}},{t:this.shape_198,p:{x:271.125}},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224,p:{x:297.775}},{t:this.shape_223},{t:this.shape_222,p:{x:331.625}},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218,p:{x:367.3}},{t:this.shape_202,p:{x:373.3}},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212,p:{x:441.125}},{t:this.shape_197,p:{x:449.125}},{t:this.shape_207,p:{x:464.025}},{t:this.shape_211},{t:this.shape_199,p:{x:488.675}},{t:this.shape_210},{t:this.shape_195,p:{x:511.025}},{t:this.shape_209}]},9).to({state:[{t:this.shape_238},{t:this.shape_237,p:{x:203.125}},{t:this.shape_236,p:{x:214.675}},{t:this.shape_224,p:{x:234.775}},{t:this.shape_235,p:{x:245.275}},{t:this.shape_212,p:{x:262.125}},{t:this.shape_222,p:{x:272.625}},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_203,p:{x:308.1}},{t:this.shape_231,p:{x:314.1}},{t:this.shape_202,p:{x:320.1}}]},1).to({state:[{t:this.shape_238},{t:this.shape_237,p:{x:203.125}},{t:this.shape_236,p:{x:214.675}},{t:this.shape_224,p:{x:234.775}},{t:this.shape_235,p:{x:245.275}},{t:this.shape_212,p:{x:262.125}},{t:this.shape_222,p:{x:272.625}},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_203,p:{x:308.1}},{t:this.shape_231,p:{x:314.1}},{t:this.shape_202,p:{x:320.1}}]},8).to({state:[{t:this.shape_238},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_229,p:{x:430.75}},{t:this.shape_256},{t:this.shape_255},{t:this.shape_218,p:{x:450.2}},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_227,p:{x:528.325}},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_237,p:{x:605.425}},{t:this.shape_236,p:{x:616.975}},{t:this.shape_224,p:{x:637.075}},{t:this.shape_235,p:{x:647.575}},{t:this.shape_212,p:{x:664.425}},{t:this.shape_222,p:{x:674.925}},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_203,p:{x:710.4}},{t:this.shape_231,p:{x:716.4}},{t:this.shape_202,p:{x:722.4}}]},1).to({state:[{t:this.shape_238},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_229,p:{x:430.75}},{t:this.shape_256},{t:this.shape_255},{t:this.shape_218,p:{x:450.2}},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_227,p:{x:528.325}},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_237,p:{x:605.425}},{t:this.shape_236,p:{x:616.975}},{t:this.shape_224,p:{x:637.075}},{t:this.shape_235,p:{x:647.575}},{t:this.shape_212,p:{x:664.425}},{t:this.shape_222,p:{x:674.925}},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_203,p:{x:710.4}},{t:this.shape_231,p:{x:716.4}},{t:this.shape_202,p:{x:722.4}}]},9).to({state:[]},1).wait(660));

	// Box
	this.instance_4 = new lib.dialogue_box();
	this.instance_4.setTransform(459.05,484.1,1,1,0,0,0,329.3,110.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(794).to({_off:false},0).wait(40).to({_off:true},1).wait(660));

	// face
	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#000000").s().p("AhMIEIgUgNQgYgOgjgEQgYgDgoABQgyACgyAEQgQACgLgCQgPgCgHgMQgIgLAGgLQAEgMANgDQAFgBAHABIAMABQAGAAAagCQAmgFBEABIAiABQA1AEArAcQANAIAFAJQAFAIgDAKQgDALgIAEQgFACgGAAQgGAAgHgCgABKEhQgQgJAGggIALg4QAeiTANg1QAShGAEggQAHg4gHhJQgCgUADgJQAEgRAOgDQAIgBAHAFQAHAEAEAHQAFAKABAWQAEBcgHAzQgFAegPA7QghCHgTB5QgEAYgHAJQgGAHgJAEIgHABQgFAAgEgDgAlQDVQgIgEgDgKQgEgMAEgWQAKg7AdhlIAPg2QAGgYAFgbIAnjGQAFgTAEgGQAIgOAOAAQAJABAHAIQAGAIABALQABAMgJAZQgJAcgJA6QgTBtgcBkIgVBMQgLAsgEAiQgCATgCAGQgHANgLACIgEABQgGAAgGgFgAFdkUQgIAAgQgLQgTgMgegPIiThIQgUgKgRgKIgPgIIgQgGQgKgFgBgMQgCgMAHgIQAMgMAVAGQAMADAUANQAPAKAgAPICrBVQASAJAHAGQAMALgCAPQgBAIgHAGQgHAGgHAAIgCAAgAlqmKQgIgIABgMQADgPAZgOIBNglQAlgSATgIQAkgOAYADQAMABAHAFQAKAHAAANQgBANgLAGQgEADgIABIgNABQgXACgbAMIguAWIggAQQgaAMgKAGQgNAJgJABIgDAAQgKAAgHgHg");
	this.shape_275.setTransform(132.517,373.3001);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#000000").s().p("AjWIQQgbAAgQgCQgXgEgQgLQgdgVgFgqQgDgcAMgsQAFgWALgMQAKgLAVgIQAmgQArgPQAXgJAOADQAKABAHAHQAFAFABAFQCDACBugBQBFAAAeAFQA3AHAlAaQAUAPAAAQIAAAFQAEADACAFQAFAJABAVQACAqgLAVQgQAggrAMQgXAHg2AAgAi4AjQgRgJAAgkIAAnTQAAgUAEgJQACgHAHgEQAGgFAHAAQAOACAGAPQADAIAAASIAAGeQAAApACAVQACATgEAIQgDAIgKAEIgJABQgFAAgFgCgADuAHQgMgBgFgHQgFgIAAgSQAChdAGhMQAFg0AAgbIgBgtQAAgbABgSIAIg3QAFgigBgWIgBgQQAAgJABgHQACgIAGgGQAGgHAHAAQAOgBAJAOQAFAJABARQABATgDAZIgFArIgLDPIgICpQgBAVgIAHQgGAGgKAAIgCAAg");
	this.shape_276.setTransform(104.7259,384.3467);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#00FFFF").s().p("AB/A8QgTgKgFgMQgGgLAEgRQACgHgCgDIgFgFQgJgJABgLQABgLALgHQAHgEAOAAIAcgBIAxgBIAigCQAdgBAKAKQAMALgEAVQgDAKgNASQgKANgFAEQgHAFgMAFIgUAJIgVALQgNAGgKABIgBAAQgPAAgWgMgAilA+QgNgHgHgCQgFgCgJAAIgPAAQgSgBgGgMIgEgLQgDgEgGgCIgKgCQgOgGgDgNQgCgGACgGQADgHAFgEQAGgEAAgDQABgCgCgFQgEgKAEgKQAFgKAKgDQAGgCASACIAZABIAHAAIAxABIAbAAQAPAAAIADQARAEAJARQAJAPgEATIgCAMQAAAGACALQAAAIgIAHIgNALIgLAKQgGAGgGACQgFADgRABQgYAAgLgFg");
	this.shape_277.setTransform(102.7774,382.4188);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#000000").s().p("AGoGUQgegCg5gNQg6gNgegCIgxgCQhWAAglAFIglAHQgWADgQABQgUAAgJgJQgIgHABgMQABgLAJgGQAFgEAJgBIAOgBQAYgCAvgJQAfgFA0AAIA2AAQAgAAAQACQAYACA4AOQAzAMAdABIASABQALACAGAFQAJAHgBANQgBANgKAGQgHAFgPAAIgGAAgAl2ASQgLgCgVgMQgXgNgJgKQgSgTgEghQgEgVAEglIACgQQADgcAIgRQAFgJAGgEQAGgEAHABQAIABAFAEQALAJgBARIgJApQgDATgBAYQAAAZAIAKQAEAGASAKIAOAGQAEADACgBQACAAADgCQALgJAKgTIAXgpQAIgOACgJIAEgZQACgPAFgIQAFgHAIgEQAIgEAIACQAIACAGAGQAGAHgBAJQAAAIgHAPIgCAUQgCASgPAZIgLAVQgUAigMAOQgYAbgcAAIgIgBgAF6lXQAAgSAFgHQAGgJAMgBQAMgBAHAJQAHAIAAAWIAAE7IgxACgAAigsIAAlDQAAgTAFgHQAFgIAKgCQALgBAHAGQALAJAAAcIAAE+g");
	this.shape_278.setTransform(79.8733,379.9677);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AC6BCQgSgRgPgaQgJgQgPggQAfgCBLgNIgJARQgHAQgDAPQgEATADAXQADAQAFALQAGAMAMANQgkgSgTgSgAIhBXQASgcADgfIAbAMQAUAKAJAOQgWAMgfAKIgeAIIAGgHgAi6AJQAFgUgBggIgCgYIBHA0IguAWIgeAOIADgMgAm7AVQhdgphVg4QA6AFBjgbIAMgDIgCAHIgFAUIgFAVQgEATAEASQAEASAMAOIAGAFIgBAAg");
	this.shape_279.setTransform(102.425,354.7375);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#000000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgACDgZQAPAgAJAQQAPAbASAQQATATAkASQgMgNgGgMQgFgMgDgQQgDgWAEgUQADgOAHgQIAJgRQhLANgfABgAIjBYIgGAHIAegIQAfgKAWgNQgJgNgUgKIgbgMQgDAegSAdgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAi0grQABAggFAVIgEAMIAfgPIAugVIhHg0IACAXgAm4AWIgGgGQgMgNgEgSQgEgTAEgTIAFgVIAFgUIACgGIgMADQhjAbg6gFQBVA3BdApIABABIAAAAg");
	this.shape_280.setTransform(102.2494,354.6742);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFE3E3").s().p("ADaBYIgPgJIgRgMQgJgJgIgJIgOgSIgBgDIgKgRIgOgaQgEgIgBgHIAPgCQAVgBAigFIA3gJQAJAEAAAEIgBAJIAAAOQgBAKADAKIABAJIAJAgIACAGIABAGQABAHgCAGIAAAMQgBANAFANQghgJgZgLgAHvBMIAAAAIgCAAIAAAAIAAAAIgCAAIAAAAIgBABQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAIAFgCIACAAIAXgFIAEgCIABAAIAAAAQAFgDADgDIAIgHIAIgJIArAGIAZAGIAGgBIACABIAAABIgIgBQgMAAgJABIgJgBIgIAAIgMABIghAJIgOACIgDADIgBABIgKADIgHACIgHgCgAmZAaIgJgCIgbgGQgjgLgkgQIghgRIgigVIgNgIIgLgHQgGgFgDgEIgFgDIgEgDIgCAAIAJgDQAQgBAHAAQAbABAigHQAbgEAjgJIAigGIADAAIALgBIAAAGIABARIABAHIABAWQABAIACAIQADALABALIAAAEIgBAHQAAAKACAJIACAIIADAFgAjzAJIAFgGIAHgCIACgCQAHgDAEgGQAGgEAEgHIAHgHIAMgUIARAFIARADIAOACIAHABIADgBQAAABAEADIABABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQgLABgNAFIglAOIgLAEIgaAHIgHABIgCACIgCABIgDABIgCACIgBABIgCABg");
	this.shape_281.setTransform(102.1333,354.7);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#1C0000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgADCgmQgiAGgVABIgPACQABAGAEAIIAOAaIAKARIABADIAOATQAIAJAJAIIARANIAPAJQAZALAhAIQgFgNABgNIAAgMQACgGgBgHIgBgGIgCgGIgJggIgBgIQgDgLABgKIAAgNIABgKQAAgEgJgDIg3AIgAHuBMIAHACIAHgCIAKgDIABgBIADgCIAOgDIAhgIIAMgCIAIABIAJAAQAJgBAMABIAIABIAAgCIgCgBIgGABIgZgGIgrgGIgIAJIgIAHQgDAEgFACIAAABIgBAAIgEACIgXAEIgCABIgFABQgBAAAAAAQgBAAAAAAQAAABgBAAQAAAAAAAAIABAAIAAAAIACgBIAAAAIACAAgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAprhQIgJADIACAAIAEADIAFADQADAFAGAEIALAIIANAIIAiAUIAhARQAkARAjAKIAbAHIAJABIABAAIgDgFIgCgHQgCgKAAgKIABgHIAAgEQgBgLgDgKQgCgIgBgJIgBgWIgBgGIgBgSIAAgGIgLABIgDAAIgiAGQgjAJgbAEQgiAHgbgBIgEAAIgTABgAjvAEIgFAFIAAAAIACgBIABgBIACgBIADgCIACgBIACgCIAHgBIAagHIALgEIAlgOQANgEALgCQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAIgBgBQgEgCAAgBIgDAAIgHAAIgOgDIgRgDIgRgFIgMAUIgHAIQgEAGgGAEQgEAHgHADIgCABIgHADg");
	this.shape_282.setTransform(102.2494,354.6742);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFC6C6").s().p("ADrBlQgLgDgJgFQgKgGgLgIQgNgJgKgJQgJgKgIgLIgCgEIgNgUIgQgfQgFgKAAgIIAAAAQAGgDAMAAQAYgBArgHQAmgGAdgDQAMADACAEIADALQABAHADAIQABALAIAMIAEAJQALARAHARIADAHIACAHQAAAIgEAHIgGAMQgHAPgCANQgogFghgJgAHPBOQgEAAgGgDIgKgKQgHgFABAAQAFgDAJgBQAVgCAegHIAwgJIARAAQAFABAGACIALAEQALABATAEIALAEIAGACQAAABAAAAQABABAAAAQAAABgBAAQAAAAAAABQgCACgHABIgiAAQggABgagCIgPAIIgNAHQgFADgJAAIgPABIgPgDgAl6AgIgLAAQgRgBgPgCQgqgHgrgUQgUgIgVgMIgogXIgPgJIgNgJQgGgGgCgGIgGgDIgFgEIgCgBQADgDAGgCQASgCAIAAQAfACApgIQAegGArgKQAWgEASgBIAEgBIANACIACAGIAFATIADAHIAIAZIAHARQAHAMAAALIgBAGIgDAHIgFAVIgBAHQgBACABAEIgBAAgAkkAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBIgDABIgDgBQABgEAEgEQAMgEAGgBQAQgCAUgFIAQgEIAzgRQATgFANAAQAEAAACACIADADIALAGQAEADgEACQgCACgHABIgUABQgNACgJgBQgNAAgLgCQgNAKgOAHIgNAFQgJADgLABQgGADgNgBIgIABIgEAAIgEAAg");
	this.shape_283.setTransform(102.125,354.575);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#390000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgADKgtQgrAHgYABQgMAAgGADIAAAAQAAAIAFAKIAQAfIANAUIACAEQAIALAJAKQAKAJANAJQALAIAKAGQAJAFALADQAhAJAoAFQACgNAHgPIAGgMQAEgHAAgIIgCgHIgDgHQgHgRgLgRIgEgJQgIgMgBgLQgDgIgBgHIgDgLQgCgEgMgDQgdADgmAGgAIlAlIgwAJQgeAHgVACQgJABgFADQgBAAAHAFIAKAKQAGADAEAAIAPADIAPgBQAJAAAFgDIANgHIAPgIQAaACAggBIAiAAQAHgBACgCQAAgBAAAAQABAAAAgBQAAAAgBgBQAAAAAAgBIgGgCIgLgEQgTgEgLgBIgLgEQgGgCgFgBIgIAAIgJAAgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAl6AfQgBgEABgCIABgHIAFgVIADgHIABgGQAAgLgHgMIgHgRIgIgZIgDgHIgFgTIgCgGIgNgCIgEABQgSABgWAEQgrAKgeAGQgpAIgfgCQgIAAgSACQgGACgDADIACABIAFAEIAGADQACAGAGAGIANAJIAPAJIAoAXQAVAMAUAIQArAUAqAHQAPACARABIALAAIABAAIAAAAgAklAAIAEAAIAEgBIAIgBQANACAGgEQALgBAJgDIANgFQAOgHANgKQALACANAAQAJABANgCIAUgBQAHgBACgCQAEgCgEgDIgLgGIgDgDQgCgCgEAAQgNAAgTAFIgzARIgQAEQgUAFgQACQgGABgMAEQgEAEgBAEIADABIADgBQgBABAAAAQABAAAAABQAAAAABAAQAAABABAAg");
	this.shape_284.setTransform(102.2494,354.6742);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFAAAA").s().p("AD8BzQgOgDgLgFIgagOQgQgKgLgLQgMgKgKgMIgCgEQgHgJgIgPIgUglQgGgMABgJQAHgEAOAAQAdAAAygJQAvgIAggDQAQAEADAEIAHAMQADAIAFAJQAEALANANIAHAKQARASAKATIAEAIQACAEAAAFQAAAJgIAHIgKANQgOAPgJANQgvAAgogHgAHKBdIgWgDQgMgEgIgEQgFgDgIgHIgOgRQgHgJACgCQAFgFAMAAQAagCAogIQApgIAVgCQANgBAJACQAHABAHAEIAOAHIAlAMIAQAHQAHADAEADQAEADgCAEQgCAEgKACIgpAFQgpAFgiABIgVAHIgTAGIgHAAIgMgBgAmOApQgwgFg0gWQgWgKgYgMIgvgbIgRgKIgPgLQgIgHAAgHIgHgDQgEgCgCgDIgBgBQABgEAHgEQAUgEAKABQAjADAwgKQAggGA0gNQAZgFAVABIAFAAQAHABAHACIAEAIIALAUIAEAIQAGAMAJAOQAFAJAGAJIAFAIQASgBAXgFIAUgFIBBgUQAYgFARACQAHABAEAEIAJAGQAFAFATALQAIAFgEAGQgDACgIADIgaAFQgSAEgLABQgQACgOAAQgTAIgWAEQgKACgKgBQgNACgQgDQgKABgTgFIgCACIgNAXIgEAIQgCACAAAEIgCAAIgMABIgWABIgQAAg");
	this.shape_285.setTransform(102.1558,354.3977);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#550000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgADSg0QgzAJgcAAQgOAAgHAEQgCAJAGAMIAUAlQAJAPAGAJIADAEQAJAMAMAKQALALARAKIAaAOQAKAFAOADQAoAHAwAAQAIgNAPgPIAKgNQAHgHABgJQAAgFgCgEIgEgIQgKgTgSgSIgHgJQgNgOgDgLQgGgJgCgIIgHgMQgDgEgQgEQghADguAIgAIRAQQgWACgpAIQgoAIgZACQgMAAgFAFQgDACAIAJIAOARQAHAHAGADQAIAEALAEIAWADQANACAHgBIATgGIAUgHQAjgBAogFIAqgFQAJgCADgEQACgEgFgDQgDgDgHgDIgQgHIgmgMIgNgHQgIgEgGgBIgOgBIgIAAgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAp+haQgHAEgBAEIACABQACADADACIAHADQABAHAHAHIAQALIARAKIAuAbQAZAMAWAKQAzAWAwAFQASABAUgCIANgBIABAAQAAgEACgCIAFgIIANgWIACgDQATAFAJgBQAQADANgCQALABAJgCQAWgDATgJQAPAAAQgCQALgBASgEIAZgFQAJgDACgCQAFgGgJgFQgSgLgGgFIgJgGQgEgEgGgBQgRgCgZAFIhBAUIgTAFQgYAFgRABIgFgIQgHgJgFgJQgJgOgFgMIgFgIIgKgUIgFgIQgHgCgGgBIgFAAQgVgBgaAFQgzANghAGQgwAKgjgDIgFAAQgJAAgQADg");
	this.shape_286.setTransform(102.2494,354.6742);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FF8E8E").s().p("AENB/QgRgCgMgFQgOgGgRgJQgUgLgNgLQgOgMgLgNIgDgFQgIgJgJgSIgYgpQgHgPADgKIAAAAQAHgFARAAQAgAAA7gKQA4gKAjgCQAUADAEAFIALANQAEAIAIAKQAGALASAQIAKAJIAIAIIAigHQA0gJAZgBQAQAAALACQAIACAJAFIAQAKIAuASIAUAKQAKAFAFAFQAHAFgCAGQgDAFgMAEIgyAKQgwAJgrACIgaAIIgZAEQgJAAgQgEIgBAAIgNgDIgEgCIgiAcQgYACgXAAQgdAAgagDgAl3AzQg2gBg8gZQgZgLgcgOIg0geIgUgMIgRgMQgIgIAAgJIgIgDQgEgDgCgDIgBgBQAAgGAHgFQAWgEAMABQAnAEA3gMQAjgHA8gPQAegFAXACIAFAAQAIACAIADIAGAIIAPAWIAHAJQAHAMANAQIBPgWQAegGAUAEQAJACAHAGIANAKQALAJAbARQANAHgFAIQgDAEgKAEIgfAJQgXAGgMACQgUAFgSAAQgZAKgeABQgMAAgMgCIgJALIgHAJQgEACgBAEIgCAAIgOADQgVAEgSAAIgFAAg");
	this.shape_287.setTransform(102.197,354.3122);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#710000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgABngsIgBABQgCAJAHAPIAXAqQAKARAHAKIAEAEQAKAOAPALQANALATALQARAKAOAGQAMAEARACQAwAFA3gEIAhgbIAEABIANAEIABAAQARAEAJgBIAYgEIAbgHQAqgCAxgJIAygKQAMgEACgGQACgFgGgGQgGgFgKgFIgUgJIgtgTIgRgJQgJgFgIgCQgKgDgQABQgaABg0AJIgiAGIgIgHIgJgJQgTgQgFgMQgIgKgFgIIgKgNQgFgEgTgEQgkACg3AKQg7ALghAAIgDAAQgOAAgGAEgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAqHhfQgIAFABAGIABAAQACAEAEACIAIAEQgBAIAIAJIASAMIATAMIA1AeQAcAOAZALQA8AYA2ABQAUABAXgEIAPgDIABAAQACgEADgDIAHgIIAKgLQAMACAMgBQAdgBAagJQARgBAUgEQANgBAWgIIAfgIQAKgEAEgEQAEgIgMgIQgcgRgKgIIgOgLQgHgFgJgDQgUgEgeAGIhOAWQgNgPgIgNIgGgIIgPgWIgHgIQgIgEgHgBIgGgBQgXgCgeAGQg7AOgkAHQg2AMgogEIgFAAQgKAAgSAEg");
	this.shape_288.setTransform(102.2494,354.6742);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FF7171").s().p("AEeCKQgUgBgPgFQgPgFgUgKQgXgNgPgLQgQgNgMgOIgEgFQgJgLgLgUIgagvQgJgRAEgKIABgBQAHgGATAAQAkABBDgNQBBgLAngBQAWADAHAFIAOAOIAQAUQAHAJAOAMIAAAAQArgHAZgDIABAAIALAAQASAAANADQAJADALAIIATALQAPAIAmARIAZAMQANAIAHAGQAJAIgCAHQgCAIgQAFQgdAIgdAGQg4AOgyAEIgiAGQgRAEgMgBIgRAKQgpAGgnAAIgkgBgAngAjQgcgLgggRIg6ggIgWgOQgOgHgFgGQgJgKABgKQgFgBgEgDQgEgCgCgEIgBgBQgCgIAJgGQAXgGANACQAsAFA+gOIBpgZQAigFAZADIAHABQAIACAJAEIAJAJIATAYIAIAJIACACIAogLQAkgHAXAGQAMAEAJAHIASAPQAPAMAmAXQAQAKgFALQgDAFgNAFIgkAMQgbAKgPADQgXAHgUABQgWAHgYABIgIAHIgHAHIgCAAIgRAEQgaAHgWABIgIAAQg6AAg/gag");
	this.shape_289.setTransform(102.2078,354.3209);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#8E0000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgABggwIgBAAQgEAKAJASIAaAvQALATAJALIAEAFQAMAPAQAMQAPAMAXAMQAUAKAPAGQAPAEAUABQA3AEA9gIIARgKQAMAAARgDIAigHQAygDA4gOQAdgGAdgJQAQgFACgIQACgHgJgHQgHgHgNgHIgZgNQgmgQgPgIIgTgMQgLgHgJgDQgNgEgSAAIgLABIgBAAQgaACgqAIIAAAAQgPgNgGgJIgQgUIgOgNQgHgFgWgEQgnABhBAMQhDAMgkAAQgTAAgHAGgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAqQhlQgJAHACAIIABAAQACAEAEADQAEADAFAAQgBALAJAJQAFAGAOAIIAWANIA6AhQAgARAcALQBEAbA9gCQAWgBAagGIARgEIACgBIAHgHIAIgGQAXgCAXgGQAUgBAXgHQAPgEAbgKIAkgLQANgFADgGQAFgKgQgLQgmgWgPgMIgSgPQgJgHgMgFQgXgFgkAGIgoALIgCgCIgIgIIgTgYIgJgJQgJgEgIgCIgHgBQgZgEgiAGIhpAYQg+AOgsgFIgGAAQgMAAgSAEg");
	this.shape_290.setTransform(102.2494,354.6742);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FF5555").s().p("AEvCVQgXAAgQgFQgRgFgXgLQgagOgRgMQgTgNgNgQIgFgGQgKgLgMgWIgeg0QgKgUAGgLIABgBQAHgHAWAAQAoABBLgOQBKgNAqgBQAaAEAIAFQAIAFAKAJIATAVQAegEATAAQAVAAAOAFQALAEAMAJIAWAPQARAKAtAUIAdAPQAQAKAJAIQAKAKgCAJQgCAJgSAHQghALghAIQhAASg7AFIgRADIgNAGQg7ALg3AAIgRAAgAnXAtQgfgMgjgTIhBgjIgYgPQgPgJgGgGQgKgLADgMQgGAAgEgEQgFgDgCgEIgBgBQgDgJAJgIQAagGAOABQAwAGBFgPIB0gcQAngGAbAFIAHABQAJADAKAFIALAKIALAMIAHgCQApgHAbAIQAOAFAMAJIAXATQAUAQAuAcQAUANgFANQgDAHgPAGIgpAQQggANgQAFQgcAJgXACIgPADIgGAFIgCABIgTAFQgdAJgZACIgVABQg6AAhAgag");
	this.shape_291.setTransform(102.2285,354.3752);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#AA0000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgABZg1IgBABQgGALAKAUIAeA0QAMAWAKALIAFAGQANAQATANQARAMAaAOQAXALARAFQAQAFAXAAQA+ACBFgNIANgFIARgEQA7gFBAgSQAhgIAhgLQASgHACgJQACgJgKgKQgJgIgQgKIgdgPQgtgUgRgKIgWgPQgMgJgLgEQgOgFgVAAQgTAAgeAEIgTgVQgKgJgIgFQgIgFgagEQgqABhKANQhLAOgogBIgDAAQgTAAgHAHgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAqahqQgJAIADAJIABABQACAEAFADQAEAEAGAAQgDAMAKALQAGAGAPAJIAYAPIBBAjQAjATAfAMQBMAeBDgFQAZgCAdgJIATgFIACgBIAGgFIAPgDQAXgCAcgJQAQgFAggNIApgPQAPgHADgHQAFgNgUgNQgugcgUgQIgXgTQgMgJgOgFQgbgIgpAHIgHACIgLgMIgLgKQgKgFgJgDIgHgBQgbgFgnAGIh0AcQhFAPgwgGIgGAAQgNAAgVAFg");
	this.shape_292.setTransform(102.2494,354.6742);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FF3939").s().p("AEUCcQgSgGgagLQgegPgSgNQgWgOgPgRIgFgGQgKgMgOgZIghg5QgLgXAHgMIAAAAQAJgJAYABQAsABBTgQQBTgPAsAAQAeAEAKAFQAKAFAMALIACACIAPAAIABAAQAZAAAQAGQAMAFAOAKIAZATQASANAzAXIAhASQATAMALAKQANALgCALQgCAMgVAHQglAPglAKQg+ATg6AIIgCAAIgBAAQhLARhEAAIgGAAQgWAAgQgEgAnOA3QghgNgngUIhHgoIgbgQQgRgJgGgHQgLgNAEgNQgGAAgFgDQgFgEgCgFIgBAAQgEgLAKgJQAbgIARACQAzAHBMgSQArgJBUgVQArgHAdAHIAIACQAKADALAGIAGAFQAdgCAVAHQARAHAOALQAKAGATAQQAYAUA4AiQAYAPgFAQQgEAIgRAHIgvAUQgkAQgSAGQgdAKgYAEIAAAAIgJADQggALgbADQgPACgPAAQg9AAhDgag");
	this.shape_293.setTransform(102.2435,354.4463);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#C60000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgABRg6IAAABQgHAMALAWIAhA5QAOAZAKANIAFAGQAPAQAWAPQASANAeAOQAaAMASAGQASAEAagBQBEAABLgQIABAAIACgBQA6gHA+gTQAlgLAlgOQAVgIACgLQACgLgNgLQgLgLgTgLIghgSQgzgYgSgNIgZgSQgOgLgMgEQgQgGgZAAIgBAAIgPAAIgCgCQgMgLgKgFQgKgGgegDQgsAAhTAPQhTAQgsgCIgDAAQgWAAgIAIgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAqjhvQgKAJAEALIABAAQACAGAFADQAFADAGABQgEANALAMQAGAHARAKIAbAQIBHAnQAnAVAhANQBUAgBKgIQAbgDAggLIAJgDIAAAAQAYgEAdgLQASgGAkgPIAvgUQARgHAEgIQAFgQgYgPQg4gjgYgTQgTgQgKgHQgOgLgRgHQgVgGgdACIgGgFQgLgHgKgDIgIgCQgdgGgrAHQhUAUgrAKQhMASgzgIIgIAAQgOAAgWAGg");
	this.shape_294.setTransform(102.2494,354.6742);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FF1C1C").s().p("AEgCnQgUgGgdgMQghgQgUgNQgYgQgQgSIgGgGQgMgOgPgbIgkg+QgMgZAIgNIABgBQAIgJAbABQAwABBbgRQBcgRAwABQAhADAMAGIAJAFQASACANAFQANAFAQAMIAbAWQAVAPA5AbIAlAVQAWAOANAMQAPANgCANQgCANgXAJQgqARgpANIgIADIgCABQg2ARg0AIIgSADQg6ALg4ACIgNAAQgUAAgPgDgAnFBAQglgNgqgXQgbgOgygdIgdgRQgTgLgGgHQgMgOAFgOQgGgBgGgDQgFgEgDgGIAAAAQgGgNALgKQAdgJASACQA4AJBSgUICKghQAwgHAfAIIAJACIAJAEQAQABANAEQAUAJARANIAhAaQAdAXBBApQAcASgGASQgDAJgTAJIg1AXQgoATgUAHIgFACQgVAIgUAFIgGABQgXAIgVACQgUADgUAAQg/AAhFgag");
	this.shape_295.setTransform(102.2527,354.5623);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#E30000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgABKg/IgBABQgIANANAZIAjA+QAQAbALAOIAGAGQAQASAYAQQAUANAhAQQAdAMAVAGQATAEAdgBQA3gCA6gLIASgDQA0gJA2gQIACgBIAIgDQApgNAqgRQAXgJADgNQACgNgPgNQgNgMgWgOIgmgUQg5gcgUgPIgbgWQgQgMgNgFQgOgFgSgCIgJgFQgMgGghgDQgvgBhcARQhcARgwgBIgFAAQgWAAgIAIgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgagAqth0QgKAKAGANIAAAAQACAGAGAEQAFADAHABQgFAOALAOQAHAHASALIAdARQAzAdAaAOQArAXAlANQBcAjBQgMQAUgDAXgHIAGgBQAUgFAWgIIAEgCQAVgHAogTIA0gXQAUgJADgJQAGgSgcgSQhBgpgegXIghgaQgRgNgTgJQgOgEgQgBIgJgEIgIgCQgggIgvAHIiKAhQhSAUg4gJIgIAAQgQAAgYAHg");
	this.shape_296.setTransform(102.2494,354.6742);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FF0000").s().p("AEtCyQgTgEgjgPQgkgQgWgOQgfgUgTgXQgNgOgRgeIgnhDQgOgdALgNQAJgLAdABQA0ACBkgTQBlgTAyACQAfABATAIQAPAGARAOIAeAYQAWARA/AhQA4AcAaAZQARAPgCAOQgCAPgaALQiqBJiWAHIgUABQgTAAgOgDgAm7BKQgogPgugYIhTguIgggTQgUgMgGgIQgNgPAGgQQgHAAgGgEQgGgEgCgGQgHgPALgLQAHgJAQgBQAIAAAUACQA8AKBZgWICVgjQA6gJAkANQATAHAXARIAmAfQAiAbBKAuQAgAUgGAVQgDAKgWALIg6AbQgsAVgXAJQgmAQggAFQgYAEgaAAQhBAAhHgag");
	this.shape_297.setTransform(102.2494,354.6742);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_275}]},794).to({state:[{t:this.shape_275}]},11).to({state:[{t:this.shape_276}]},1).to({state:[{t:this.shape_276}]},9).to({state:[{t:this.shape_278},{t:this.shape_277}]},1).to({state:[{t:this.shape_278},{t:this.shape_277}]},8).to({state:[{t:this.shape_280},{t:this.shape_279}]},1).to({state:[{t:this.shape_282},{t:this.shape_281}]},1).to({state:[{t:this.shape_284},{t:this.shape_283}]},1).to({state:[{t:this.shape_286},{t:this.shape_285}]},1).to({state:[{t:this.shape_288},{t:this.shape_287}]},1).to({state:[{t:this.shape_290},{t:this.shape_289}]},1).to({state:[{t:this.shape_292},{t:this.shape_291}]},1).to({state:[{t:this.shape_294},{t:this.shape_293}]},1).to({state:[{t:this.shape_296},{t:this.shape_295}]},1).to({state:[{t:this.shape_297}]},1).to({state:[]},1).wait(660));

	// Character
	this.instance_5 = new lib.character_dialogue("synched",0);
	this.instance_5.setTransform(110.7,413.35,1,1,0,0,0,116.4,190.7);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#0066CC").s().p("AKFhGQhWBThgA5gAqEg9IAAAAICtCDQhbg2hShNg");
	this.shape_298.setTransform(101.375,429.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_298},{t:this.instance_5}]},794).to({state:[{t:this.shape_298},{t:this.instance_5}]},40).to({state:[]},1).wait(660));

	// button_dialogue
	this.button_dialogue = new lib.button_dialogue();
	this.button_dialogue.name = "button_dialogue";
	this.button_dialogue.setTransform(711,388.6,1,1,0,0,0,55,22.6);
	this.button_dialogue._off = true;
	new cjs.ButtonHelper(this.button_dialogue, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_dialogue).wait(805).to({_off:false},0).to({_off:true},1).wait(9).to({_off:false},0).to({_off:true},1).wait(8).to({_off:false,x:700.85,y:389.2},0).to({_off:true},1).wait(670));

	// button_continue
	this.button_continue = new lib.button_continue();
	this.button_continue.name = "button_continue";
	this.button_continue.setTransform(713.1,553.6,1,1,0,0,0,62.8,27.3);
	this.button_continue._off = true;
	new cjs.ButtonHelper(this.button_continue, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.button_continue).wait(274).to({_off:false},0).to({_off:true},1).wait(149).to({_off:false},0).to({_off:true},1).wait(1070));

	// Jump_Button
	this.button_jump = new lib.button_Jump();
	this.button_jump.name = "button_jump";
	this.button_jump.setTransform(414.5,553.2,0.5312,0.6016,0,0,0,133.1,47.6);
	new cjs.ButtonHelper(this.button_jump, 0, 1, 2);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FF0000").s().p("AgQARQgHgHAAgKQAAgJAHgHQAHgHAJAAQAKAAAHAHQAHAHAAAJQAAAKgHAHQgHAHgKAAQgJAAgHgHg");
	this.shape_299.setTransform(634.05,96.725);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FF0000").s().p("AhSCCQgRgLABgLQgBgFADgGQADgIAMgOIAWgXQgLgHgFgFQgEgFAAgHQgBgHAHgKQAGgLAWgRQgSgJgKgPQgKgQABgUQgBgdAWgVQAWgVAjAAQAbAAAVAOIApAAQAKAAABABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAIABAHIgBAIIgCACIgMAAIgZAAQAMAQAAAYQAAAbgVAUQgVATgjAAQgPAAgOgEQgKAIgDAFQgEAGAAAFQABADADAEQADADAKACIAfABQArABANACQAUADAMAMQAMAMAAASQAAAYgXAVQgiAgg0AAQgpAAgdgTgAg+BKQgFAKgBAIQAAAKANAIQAWANAnAAQAnAAASgOQATgNAAgQQAAgLgLgFQgMgEghgBQgwgCgZgDQgLALgEAJgAgih9QgLANAAAaQAAAiAOATQAMAOARAAQAPAAALgMQAKgNAAgaQAAgigPgTQgLgPgPAAQgQAAgLANg");
	this.shape_300.setTransform(617.8,93.125);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FF0000").s().p("AAKBlIAAgHIAFAAQANAAAGgFQAFgEACgIQABgDAAgRIAAhQQAAgbgHgMQgHgMgQAAQgZAAgZAcIAABnQAAAUACAEQADAHAGADQAFADAQAAIAAAHIhhAAIAAgHIAEAAQAPAAAFgIQAFgIAAgVIAAhIQAAgkgBgHQgCgIgDgDQgDgDgGAAQgGAAgIADIgEgHIA8gYIAJAAIAAApQAigpAfAAQAQAAAMAIQALAIAHASQAFANAAAbIAABTQAAASADAHQACAGAFADQAGADAOAAIAAAHg");
	this.shape_301.setTransform(595.575,88.375);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FF0000").s().p("AgtCZIAAgIQAOAAAFgDQAFgDADgGQADgGAAgTIAAhMQAAgggCgIQgCgHgDgCQgDgDgGAAQgGAAgIADIgDgIIA6gYIAJAAIAACdQAAATADAGQADAGAFADQAFADAOAAIAAAIgAgNhzQgGgGAAgJQAAgJAGgGQAGgHAJAAQAJAAAGAHQAGAGAAAJQAAAJgGAGQgGAHgJAAQgIAAgHgHg");
	this.shape_302.setTransform(578.575,83.225);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FF0000").s().p("AhmCUIAAgIIAFAAQAMABAIgFQAEgCADgGQACgFAAgVIAAi6QAAgTgCgFQgCgFgDgDQgEgCgGAAQgGAAgIADIgCgHIA8gYIAJAAIAAAtQAPgaAPgKQAPgKARAAQAdAAAUAXQAYAcAAAuQAAAygdAhQgYAbglAAQgOAAgMgEQgJgDgKgKIAAA8QAAAUACAGQADAFAGADQAGADAPAAIAAAIgAgHhvQgIAEgRATIAABKQAAAWACAIQADAMALAKQAMAJARAAQAVAAAOgQQARgWAAgnQAAgtgUgYQgOgRgSAAQgLAAgJAFg");
	this.shape_303.setTransform(560.525,93.075);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FF0000").s().p("ABHBlIAAgHIAEAAQANAAAHgFQAFgEACgHQABgEAAgRIAAhUQAAgYgGgKQgIgOgTAAQgLAAgLAGQgMAGgQAPIgBADIABAJIAABdQgBAUADAFQACAFAGADQAGAEAPAAIAAAHIhiAAIAAgHQAQAAAHgEQAGgEACgIQABgEAAgRIAAhUQAAgYgHgKQgKgOgRAAQgLAAgLAGQgSAJgKAMIAABpQAAATADAGQACAGAGADQAFADAQAAIAAAHIhhAAIAAgHQANAAAGgDQAFgDADgHQADgGAAgSIAAhKQAAghgCgJQgBgHgEgDQgDgDgFAAQgHAAgIADIgDgHIA7gYIAJAAIAAAqIAZgZQAKgIAMgFQAKgEALAAQATAAANAKQANALAEAVQAXgaAPgIQAPgIAQAAQAPAAANAIQAMAIAHASQAEAMABAbIAABUQgBASADAHQACAFAGADQAGAEANAAIAAAHg");
	this.shape_304.setTransform(533.35,88.375);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FF0000").s().p("AApBlIAAgpQgaAcgNAGQgMAIgPgBQgQAAgNgJQgMgKgFgPQgEgPAAgbIAAhXQAAgOgEgFQgDgGgFgCQgGgDgQgBIAAgHIBGAAIAACCQAAAcAJAIQAKAJANAAQAJAAALgFQALgHARgQIAAhuQAAgRgGgGQgHgGgTgBIAAgHIBEAAIAAB2QgBAiACAIQACAHADAEQADACAFAAQAHAAAIgDIADAHIg6AYg");
	this.shape_305.setTransform(505.15,88.95);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FF0000").s().p("AgxDBQgKgHABgHQAAgIAEgFQAGgGAHAAQAGAAAFADQAEACALAJQAKAJAGAAQAFAAAFgEQAFgEACgJQADgJAAggIAAiLQAAgggDgJQgBgHgDgDQgDgDgGAAQgFAAgJADIgDgHIA7gYIAJAAIAADFQAAAygWAZQgVAYgiAAQgTAAgJgHgAAWiiQgGgGgBgJQABgKAGgGQAHgGAJAAQAJAAAGAGQAHAGgBAKQABAJgHAGQgGAHgJAAQgJAAgHgHg");
	this.shape_306.setTransform(484.55,87.975);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#FF0000").s().p("AhGBlIAAgHQAPAAAHgFQAFgEADgHQABgEAAgRIAAhLQAAgjgCgGQgBgHgEgDQgEgDgFAAQgHAAgIADIgCgHIA7gYIAJAAIAAAsQAYgsAaAAQAMAAAHAHQAIAHAAAKQAAAIgGAGQgFAFgIAAQgHAAgKgHQgJgHgFAAQgDAAgFAEQgKAJgJAUIAABdQAAARAEAIQACAGAHAEQAHAEANAAIAAAHg");
	this.shape_307.setTransform(463.925,88.375);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FF0000").s().p("AhIBFQgWgeAAglQAAgaAOgbQANgbAWgMQAWgNAXAAQAtAAAbAiQAXAdAAAlQAAAagNAbQgMAbgWAOQgXANgaAAQgtAAgagjgAgchTQgMAHgHARQgHARAAAbQAAAqARAfQARAfAbAAQAVAAAOgRQANgRAAgqQAAg0gXgeQgPgUgWAAQgMAAgLAGg");
	this.shape_308.setTransform(445.275,88.675);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#FF0000").s().p("AhVCYIAAgHIAJAAQAIAAAIgFQAHgEACgHQADgIAAgUIAAiBIgmAAIAAgPIAmAAIAAgNQAAgeAJgUQAKgUAUgNQASgMAZAAQAWAAATAOQAMAJAAANQAAAGgFAGQgGAGgGAAQgGAAgFgEQgGgEgHgLQgIgMgHgEQgHgEgHAAQgLAAgGAGQgHAEgCAMQgEAKAAAvIAAAOIAyAAIAAAPIgyAAIAACBQABAbAFAIQAIAJANAAIASAAIAAAHg");
	this.shape_309.setTransform(430.05,83.25);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FF0000").s().p("AAjCcIAAgcQgOAPgOAGQgNAHgQAAQggAAgYgbQgYgbAAgqQAAgrAbgiQAagjAqAAQAZAAARAQIAAgkQAAgigBgHQgCgIgEgDQgDgDgFAAQgGAAgJAEIgDgIIA7gYIAJAAIAADjQAAAiACAIQACAIADADQAEADAEAAQAGAAAKgEIACAHIg6AZgAgrgWQgUAWAAArQAAArATAXQATAXAXAAQATAAASgTIAAhmQgBgNgHgMQgGgMgLgHQgKgGgKAAQgSAAgPARg");
	this.shape_310.setTransform(398.425,83.525);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#FF0000").s().p("Ag5BNQgZgcAAguQAAgyAagcQAZgdAmABQAiAAAVAVQAVAXAAAkIiHAAQAAArAVAYQAWAZAcAAQATAAAPgKQAOgLAJgZIAHADQgEAegWAYQgWAYggAAQgjABgZgcgAgjhKQgPAOgCAYIBaAAQgBgSgDgJQgGgLgKgHQgLgHgLAAQgRAAgOAOg");
	this.shape_311.setTransform(377.075,88.65);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FF0000").s().p("Ag5BNQgZgcAAguQAAgyAagcQAZgdAmABQAiAAAVAVQAVAXAAAkIiHAAQAAArAVAYQAWAZAcAAQATAAAPgKQAOgLAJgZIAHADQgEAegWAYQgWAYggAAQgjABgZgcgAgjhKQgPAOgCAYIBaAAQgBgSgDgJQgGgLgKgHQgLgHgLAAQgRAAgOAOg");
	this.shape_312.setTransform(357.525,88.65);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#FF0000").s().p("AAKBlIAAgHIAFAAQANAAAGgFQAFgEACgIQABgDAAgRIAAhQQAAgbgHgMQgHgMgQAAQgZAAgZAcIAABnQAAAUACAEQADAHAGADQAFADAQAAIAAAHIhhAAIAAgHIAEAAQAPAAAFgIQAFgIAAgVIAAhIQAAgkgBgHQgCgIgDgDQgDgDgGAAQgGAAgIADIgEgHIA8gYIAJAAIAAApQAigpAfAAQAQAAAMAIQALAIAHASQAFANAAAbIAABTQAAASADAHQACAGAFADQAGADAOAAIAAAHg");
	this.shape_313.setTransform(336.575,88.375);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#FF0000").s().p("AhIBFQgWgeAAglQAAgaAOgbQANgbAWgMQAWgNAXAAQAtAAAbAiQAXAdAAAlQAAAagNAbQgMAbgWAOQgXANgaAAQgtAAgagjgAgchTQgMAHgHARQgHARAAAbQAAAqARAfQARAfAbAAQAVAAAOgRQANgRAAgqQAAg0gXgeQgPgUgWAAQgMAAgLAGg");
	this.shape_314.setTransform(303.525,88.675);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#FF0000").s().p("ABuCUIi/jpIAACyQAAAbAGAHQAIAIARABIAKAAIAAAHIhlAAIAAgHIAKAAQASAAAIgMQAFgGAAgZIAAjKQgNgPgGgEQgHgFgNgEQgGgCgNAAIAAgIIBQAAICxDZIAAimQAAgbgGgHQgIgJgSAAIgKAAIAAgIIBmAAIAAAIIgLAAQgSAAgIALQgEAHAAAZIAAD0g");
	this.shape_315.setTransform(276.025,84.15);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#FF0000").s().p("AgQARQgHgHAAgKQAAgJAHgHQAHgHAJAAQAKAAAHAHQAHAHAAAJQAAAKgHAHQgHAHgKAAQgJAAgHgHg");
	this.shape_316.setTransform(244.25,96.725);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#FF0000").s().p("AAjCcIAAgcQgOAPgOAGQgNAHgQAAQggAAgYgbQgYgbAAgqQAAgrAbgiQAagjAqAAQAZAAARAQIAAgkQAAgigBgHQgCgIgEgDQgDgDgFAAQgGAAgJAEIgDgIIA7gYIAJAAIAADjQAAAiACAIQACAIADADQAEADAEAAQAGAAAKgEIACAHIg6AZgAgrgWQgUAWAAArQAAArATAXQATAXAXAAQATAAASgTIAAhmQgBgNgHgMQgGgMgLgHQgKgGgKAAQgSAAgPARg");
	this.shape_317.setTransform(228.525,83.525);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#FF0000").s().p("AAaBgQgFgHAAgSQgeAXgIAEQgLAFgNAAQgVAAgNgOQgOgOAAgWQAAgPAHgKQAJgPAWgNQAWgMAygSIAAgIQAAgdgKgLQgJgLgSAAQgNAAgIAHQgIAHAAAKIAAAMQAAAKgEAGQgGAFgIAAQgHAAgFgGQgGgFAAgKQAAgSATgQQATgPAiAAQAaAAAQAIQANAHAGAOQADAKAAAcIAABCQAAAcACAHQABAGADACQACACADAAQAEAAACgBQAEgDANgNIAAAMQgYAggWAAQgKAAgHgHgAgUAAQgSAKgHAKQgHAKAAANQAAAPAJAKQAKAKAMAAQAQAAAagVIAAhKQggANgJAEg");
	this.shape_318.setTransform(207.7,88.575);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#FF0000").s().p("AggCWQgSgHgTgMIAAjLQAAgigBgHQgCgIgDgDQgEgDgFAAQgGAAgJAEIgDgIIA7gYIAKAAIAACPQAdgoAgAAQAeAAAWAaQAXAaAAAsQAAA0gjAgQgeAcgkAAQgRAAgRgGgAgLgQQgJAFgNAMIAAB1QALALAMAGQAKAFANAAQATAAARgVQARgWAAgpQAAgmgRgTQgRgUgVAAQgLAAgLAFg");
	this.shape_319.setTransform(185.375,83.525);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#FF0000").s().p("AhIBFQgWgeAAglQAAgaAOgbQANgbAWgMQAWgNAXAAQAtAAAbAiQAXAdAAAlQAAAagNAbQgMAbgWAOQgXANgaAAQgtAAgagjgAgchTQgMAHgHARQgHARAAAbQAAAqARAfQARAfAbAAQAVAAAOgRQANgRAAgqQAAg0gXgeQgPgUgWAAQgMAAgLAGg");
	this.shape_320.setTransform(153.175,88.675);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#FF0000").s().p("AhIBFQgWgeAAglQAAgaAOgbQANgbAWgMQAWgNAXAAQAtAAAbAiQAXAdAAAlQAAAagNAbQgMAbgWAOQgXANgaAAQgtAAgagjgAgchTQgMAHgHARQgHARAAAbQAAAqARAfQARAfAbAAQAVAAAOgRQANgRAAgqQAAg0gXgeQgPgUgWAAQgMAAgLAGg");
	this.shape_321.setTransform(131.175,88.675);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#FF0000").s().p("AgJB/QgJgFgFgLQgEgKAAgVIAAiEIgfAAIAAgHQALgEANgLQAMgMAKgPQAFgJAHgVIAHAAIAABAIAuAAIAAAPIguAAIAAB/QAAATAGAHQAFAHAJAAQAHAAAGgFQAHgEAEgJIAIAAQgHAVgOALQgOAKgOAAQgKAAgJgFg");
	this.shape_322.setTransform(114.375,85.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.button_jump,p:{x:414.5,y:553.2}}]},50).to({state:[]},224).to({state:[{t:this.button_jump,p:{x:422.2,y:552.65}}]},1).to({state:[]},149).to({state:[{t:this.button_jump,p:{x:422.2,y:552.65}}]},1).to({state:[{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299}]},105).to({state:[{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299}]},274).to({state:[]},1).wait(690));

	// Button_StartOrQuit
	this.button_quit = new lib.button_quit();
	this.button_quit.name = "button_quit";
	this.button_quit.setTransform(510,546.65,1,1,0,0,0,80,43.1);
	new cjs.ButtonHelper(this.button_quit, 0, 1, 1);

	this.button_levelStart = new lib.Button_LevelStart();
	this.button_levelStart.name = "button_levelStart";
	this.button_levelStart.setTransform(287.7,544.65,1,1,0,0,0,84.5,41.1);
	new cjs.ButtonHelper(this.button_levelStart, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.button_levelStart},{t:this.button_quit}]},49).to({state:[]},1).wait(1445));

	// Button_School
	this.Button_School = new lib.Button_School();
	this.Button_School.name = "Button_School";
	this.Button_School.setTransform(896.8,456.55,1,1,0,0,0,74.7,34.6);
	new cjs.ButtonHelper(this.Button_School, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Button_School).to({x:697.25,y:465.45},24).to({_off:true},1).wait(1470));

	// Button_Social
	this.button_Social = new lib.button_Social();
	this.button_Social.name = "button_Social";
	this.button_Social.setTransform(960.05,546.25,1,1,0,0,0,73,32.2);
	new cjs.ButtonHelper(this.button_Social, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_Social).to({x:693.95},24).to({_off:true},1).wait(1470));

	// Button_Start
	this.button_start = new lib.button_Start();
	this.button_start.name = "button_start";
	this.button_start.setTransform(401.05,540.55,1,1,0,0,0,131.8,37.9);
	this.button_start.alpha = 0;
	new cjs.ButtonHelper(this.button_start, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_start).wait(24).to({alpha:1},0).to({_off:true},1).wait(1470));

	// Player
	this.instance_6 = new lib.Player_fullbody("synched",0);
	this.instance_6.setTransform(37.7,429.45,0.4509,0.4395,0,0,0,9.8,-17.8);
	this.instance_6._off = true;

	this.instance_7 = new lib.Player_jump("synched",0);
	this.instance_7.setTransform(22.4,433.75,0.4761,0.523,0,0,0,54.4,-30.9);
	this.instance_7._off = true;

	this.player = new lib.Player_fullbody("synched",1);
	this.player.name = "player";
	this.player.setTransform(148.55,372.25,0.4423,0.4492,0,0,0,-10.7,-15.7);
	this.player._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(50).to({_off:false},0).to({_off:true},81).to({_off:false,x:204.5,y:350.9},18).wait(48).to({startPosition:18},0).to({x:274.25,startPosition:26},8).to({x:258.2,y:435.1,startPosition:6},10).wait(28).to({startPosition:4},0).to({_off:true},1).to({_off:false,x:372.05,y:394.2,startPosition:6},20).wait(10).to({regX:-10.7,regY:-15.7,scaleX:0.4557,scaleY:0.4317,x:372.25,y:390.95,startPosition:0},0).wait(1).to({regX:-10.6,regY:-15.6,scaleX:0.4622,scaleY:0.4194,x:180.6,y:355.15},0).to({_off:true},24).to({_off:false,x:227.1,y:244.55},18).wait(31).to({startPosition:1},0).to({x:287.25,y:414.6,startPosition:9},8).to({_off:true},28).to({_off:false,x:345.8,y:370.5},11).to({_off:true},5).to({_off:false,x:413.15,y:320.8},6).to({_off:true},6).to({_off:false,x:448.8,y:292.7},11).wait(1).to({regX:-10.7,regY:-15.7,scaleX:0.4423,scaleY:0.4492,x:430.3,y:279.5,startPosition:0},0).wait(1).to({x:44.35,y:421.95,startPosition:1},0).to({_off:true},22).wait(1048));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(131).to({_off:false},0).to({_off:true,regX:9.8,regY:-17.8,scaleX:0.4509,scaleY:0.4395,x:204.5,y:350.9},18).wait(95).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:270.55,y:438.55},0).to({_off:true,regX:9.8,regY:-17.8,scaleX:0.4509,scaleY:0.4395,x:372.05,y:394.2,startPosition:6},20).wait(35).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:198.4,y:360.75,startPosition:0},0).to({_off:true,regX:-10.6,regY:-15.6,scaleX:0.4622,scaleY:0.4194,x:227.1,y:244.55},18).wait(67).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:289.8,y:416.9},0).to({_off:true,regX:-10.6,regY:-15.6,scaleX:0.4622,scaleY:0.4194,x:345.8,y:370.5,startPosition:9},11).wait(5).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:349.15,y:367.95,startPosition:0},0).to({_off:true,regX:-10.6,regY:-15.6,scaleX:0.4622,scaleY:0.4194,x:413.15,y:320.8,startPosition:9},6).wait(6).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:411.7,y:319,startPosition:0},0).to({_off:true,regX:-10.6,regY:-15.6,scaleX:0.4622,scaleY:0.4194,x:448.8,y:292.7,startPosition:9},11).wait(24).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:58.1,y:428.9,startPosition:0},0).to({_off:true,regX:-10.7,regY:-15.7,scaleX:0.4423,scaleY:0.4492,x:148.55,y:372.25,startPosition:1},11).wait(29).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:155.85,y:380.75,startPosition:0},0).to({_off:true,regX:-10.7,regY:-15.7,scaleX:0.4423,scaleY:0.4492,x:204.7,y:293.7,startPosition:1},13).wait(30).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:201.55,y:302.2,startPosition:0},0).to({_off:true,regX:-10.7,regY:-15.7,scaleX:0.4423,scaleY:0.4492,x:260.15,y:293.7,startPosition:1},14).wait(167).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:277.7,y:432.1,startPosition:0},0).to({_off:true,regX:-10.7,regY:-15.7,scaleX:0.4423,scaleY:0.4492,x:368.95,y:425.15,startPosition:29},14).wait(26).to({_off:false,regX:54.6,regY:-30.8,scaleX:0.3968,scaleY:0.4584,x:365.1,y:432.1,startPosition:0},0).to({_off:true,regX:-10.7,regY:-15.7,scaleX:0.4423,scaleY:0.4492,x:534.1,y:386.65,startPosition:13},18).wait(726));
	this.timeline.addTween(cjs.Tween.get(this.player).wait(447).to({_off:false},11).to({_off:true},29).to({_off:false,x:204.7,y:293.7},13).to({_off:true},30).to({_off:false,x:260.15},14).wait(73).to({x:247.15,startPosition:14},0).to({x:265.55,y:345,startPosition:23},9).wait(7).to({startPosition:0},0).to({x:274.35,y:393.1,startPosition:13},13).wait(37).to({startPosition:20},0).to({x:263.9,y:425.15,startPosition:29},9).to({_off:true},19).to({_off:false,x:368.95},14).to({_off:true},26).to({_off:false,x:534.1,y:386.65,startPosition:13},18).wait(25).to({regX:-10.6,scaleX:0.5055,scaleY:0.5051,x:520.9,y:371,startPosition:0},0).to({regX:-10.5,scaleX:1.0059,x:520.95,startPosition:12},12).to({_off:true},1).wait(688));

	// Win_Message
	this.win_message = new lib.Win_Message();
	this.win_message.name = "win_message";
	this.win_message.setTransform(379.7,61.3,1,1,0,0,0,356.6,41.9);
	this.win_message.alpha = 0;
	this.win_message._off = true;

	this.timeline.addTween(cjs.Tween.get(this.win_message).wait(274).to({_off:false},0).to({_off:true},1).wait(149).to({_off:false,x:405.55,y:59.3},0).to({_off:true},1).wait(1070));

	// pit
	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f().ls(["#000000","#000000"],[0,1],-402.9,0,403,0).ss(4,1,1).p("Eg+ogDGUBA5AEUA8YgEUEA+pADHMh9RAAA");
	this.shape_323.setTransform(400.925,580.1);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f().ls(["#000000","#000000"],[0,1],-402.9,0,403,0).ss(4,1,1).p("EA+pADHIAAmNUg8YAEUhA5gEUIAAGNg");
	this.shape_324.setTransform(-400.925,580.1);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f().ls(["#000000","#000000"],[0,1],-402.9,0,403,0).ss(4,1,1).p("Eg+ogDGIAAGNMB9RAAAIAAmNUg8YAEUhA5gEUg");
	this.shape_325.setTransform(1202.775,580.1);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#000000").s().p("EA+pADHMh9RAAAIAAmNUBA5AEUA8YgEUIAAGNIAAmNUBA6AEUA8ZgEUIAAGNgEi77ADHIAAmNUBA6AEUA8ZgEUIAAGNgEg+ogDGg");
	this.shape_326.setTransform(400.925,580.1);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f().ls(["#000000","#000000"],[0,1],-402.9,0,403,0).ss(4,1,1).p("EA+pADHMh9RAAAIAAmNUBA5AEUA8YgEU");
	this.shape_327.setTransform(-404.525,580.1);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f().ls(["#000000","#000000"],[0,1],-2,0,803.9,0).ss(4,1,1).p("AAAjGUBA6AEUA8YgEUIAAGNMh9SAAAAAAjGIAAGNMh9SAAAIAAmNUBA6AEUA8YgEUg");
	this.shape_328.setTransform(798.25,580.1);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#000000").s().p("EA+pADHMh9RAAAIAAmNIAAGNMh9TAAAIAAmNUBA6AEUA8ZgEUUBA5AEUA8YgEUIAAGNIAAmNUBA6AEUA8ZgEUIAAGNg");
	this.shape_329.setTransform(397.325,580.1);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f().ls(["#000000","#000000"],[0,1],-2,0,803.9,0).ss(4,1,1).p("AAAjGUBA6AEUA8ZgEUIAAGNMh9TAAAAAAjGIAAGNMh9RAAAIAAmNUBA6AEUA8XgEUg");
	this.shape_330.setTransform(794.7,580.1);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f().ls(["#000000","#000000"],[0,1],-2,0,803.9,0).ss(4,1,1).p("AAAjGUBA6AEUA8ZgEUIAAGNMh9TAAAAAAjGIAAGNMh9SAAAIAAmNUBA6AEUA8YgEUg");
	this.shape_331.setTransform(791.1,580.1);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f().ls(["#000000","#000000"],[0,1],-2,0,803.9,0).ss(4,1,1).p("AAAjGUBA6AEUA8ZgEUIAAGNMh9TAAAAAAjGIAAGNMh9RAAAIAAmNUBA5AEUA8YgEUg");
	this.shape_332.setTransform(661.9,580.1);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f().ls(["#000000","#000000"],[0,1],-2,0,803.9,0).ss(4,1,1).p("AAAjGUBA6AEUA8YgEUIAAGNMh9SAAAAAAjGIAAGNMh9RAAAIAAmNUBA6AEUA8XgEUg");
	this.shape_333.setTransform(511.25,580.1);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f().ls(["#000000","#000000"],[0,1],-2,0,803.9,0).ss(4,1,1).p("AAAjGUBA6AEUA8YgEUIAAGNMh9SAAAAAAjGIAAGNMh9RAAAIAAmNUBA5AEUA8YgEUg");
	this.shape_334.setTransform(500.45,580.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_326,p:{x:400.925}},{t:this.shape_325,p:{x:1202.775}},{t:this.shape_324,p:{x:-400.925}},{t:this.shape_323,p:{x:400.925}}]},50).to({state:[{t:this.shape_329,p:{x:397.325}},{t:this.shape_328,p:{x:798.25}},{t:this.shape_327,p:{x:-404.525}}]},1).to({state:[{t:this.shape_329,p:{x:393.775}},{t:this.shape_330,p:{x:794.7}},{t:this.shape_327,p:{x:-408.075}}]},1).to({state:[{t:this.shape_329,p:{x:390.175}},{t:this.shape_331,p:{x:791.1}},{t:this.shape_327,p:{x:-411.675}}]},1).to({state:[{t:this.shape_329,p:{x:386.575}},{t:this.shape_328,p:{x:787.5}},{t:this.shape_327,p:{x:-415.275}}]},1).to({state:[{t:this.shape_329,p:{x:382.975}},{t:this.shape_331,p:{x:783.9}},{t:this.shape_327,p:{x:-418.875}}]},1).to({state:[{t:this.shape_329,p:{x:379.425}},{t:this.shape_331,p:{x:780.35}},{t:this.shape_327,p:{x:-422.425}}]},1).to({state:[{t:this.shape_329,p:{x:375.825}},{t:this.shape_328,p:{x:776.75}},{t:this.shape_327,p:{x:-426.025}}]},1).to({state:[{t:this.shape_329,p:{x:372.225}},{t:this.shape_331,p:{x:773.15}},{t:this.shape_327,p:{x:-429.625}}]},1).to({state:[{t:this.shape_329,p:{x:368.625}},{t:this.shape_331,p:{x:769.55}},{t:this.shape_327,p:{x:-433.225}}]},1).to({state:[{t:this.shape_329,p:{x:365.025}},{t:this.shape_330,p:{x:765.95}},{t:this.shape_327,p:{x:-436.825}}]},1).to({state:[{t:this.shape_329,p:{x:361.475}},{t:this.shape_331,p:{x:762.4}},{t:this.shape_327,p:{x:-440.375}}]},1).to({state:[{t:this.shape_329,p:{x:357.875}},{t:this.shape_331,p:{x:758.8}},{t:this.shape_327,p:{x:-443.975}}]},1).to({state:[{t:this.shape_329,p:{x:354.275}},{t:this.shape_330,p:{x:755.2}},{t:this.shape_327,p:{x:-447.575}}]},1).to({state:[{t:this.shape_329,p:{x:350.675}},{t:this.shape_331,p:{x:751.6}},{t:this.shape_327,p:{x:-451.175}}]},1).to({state:[{t:this.shape_329,p:{x:347.125}},{t:this.shape_331,p:{x:748.05}},{t:this.shape_327,p:{x:-454.725}}]},1).to({state:[{t:this.shape_329,p:{x:343.525}},{t:this.shape_330,p:{x:744.45}},{t:this.shape_327,p:{x:-458.325}}]},1).to({state:[{t:this.shape_329,p:{x:339.925}},{t:this.shape_331,p:{x:740.85}},{t:this.shape_327,p:{x:-461.925}}]},1).to({state:[{t:this.shape_329,p:{x:336.325}},{t:this.shape_328,p:{x:737.25}},{t:this.shape_327,p:{x:-465.525}}]},1).to({state:[{t:this.shape_329,p:{x:332.775}},{t:this.shape_330,p:{x:733.7}},{t:this.shape_327,p:{x:-469.075}}]},1).to({state:[{t:this.shape_329,p:{x:329.175}},{t:this.shape_331,p:{x:730.1}},{t:this.shape_327,p:{x:-472.675}}]},1).to({state:[{t:this.shape_329,p:{x:325.575}},{t:this.shape_328,p:{x:726.5}},{t:this.shape_327,p:{x:-476.275}}]},1).to({state:[{t:this.shape_329,p:{x:321.975}},{t:this.shape_331,p:{x:722.9}},{t:this.shape_327,p:{x:-479.875}}]},1).to({state:[{t:this.shape_329,p:{x:318.425}},{t:this.shape_331,p:{x:719.35}},{t:this.shape_327,p:{x:-483.425}}]},1).to({state:[{t:this.shape_329,p:{x:314.825}},{t:this.shape_328,p:{x:715.75}},{t:this.shape_327,p:{x:-487.025}}]},1).to({state:[{t:this.shape_329,p:{x:311.225}},{t:this.shape_331,p:{x:712.15}},{t:this.shape_327,p:{x:-490.625}}]},1).to({state:[{t:this.shape_329,p:{x:307.625}},{t:this.shape_331,p:{x:708.55}},{t:this.shape_327,p:{x:-494.225}}]},1).to({state:[{t:this.shape_329,p:{x:304.075}},{t:this.shape_328,p:{x:705}},{t:this.shape_327,p:{x:-497.775}}]},1).to({state:[{t:this.shape_329,p:{x:300.475}},{t:this.shape_331,p:{x:701.4}},{t:this.shape_327,p:{x:-501.375}}]},1).to({state:[{t:this.shape_329,p:{x:296.875}},{t:this.shape_331,p:{x:697.8}},{t:this.shape_327,p:{x:-504.975}}]},1).to({state:[{t:this.shape_329,p:{x:293.275}},{t:this.shape_330,p:{x:694.2}},{t:this.shape_327,p:{x:-508.575}}]},1).to({state:[{t:this.shape_329,p:{x:289.675}},{t:this.shape_331,p:{x:690.6}},{t:this.shape_327,p:{x:-512.175}}]},1).to({state:[{t:this.shape_329,p:{x:286.125}},{t:this.shape_331,p:{x:687.05}},{t:this.shape_327,p:{x:-515.725}}]},1).to({state:[{t:this.shape_329,p:{x:282.525}},{t:this.shape_330,p:{x:683.45}},{t:this.shape_327,p:{x:-519.325}}]},1).to({state:[{t:this.shape_329,p:{x:278.925}},{t:this.shape_331,p:{x:679.85}},{t:this.shape_327,p:{x:-522.925}}]},1).to({state:[{t:this.shape_329,p:{x:275.325}},{t:this.shape_328,p:{x:676.25}},{t:this.shape_327,p:{x:-526.525}}]},1).to({state:[{t:this.shape_329,p:{x:271.775}},{t:this.shape_330,p:{x:672.7}},{t:this.shape_327,p:{x:-530.075}}]},1).to({state:[{t:this.shape_329,p:{x:268.175}},{t:this.shape_331,p:{x:669.1}},{t:this.shape_327,p:{x:-533.675}}]},1).to({state:[{t:this.shape_329,p:{x:264.575}},{t:this.shape_328,p:{x:665.5}},{t:this.shape_327,p:{x:-537.275}}]},1).to({state:[{t:this.shape_329,p:{x:260.975}},{t:this.shape_332,p:{x:661.9}},{t:this.shape_327,p:{x:-540.875}}]},1).to({state:[{t:this.shape_329,p:{x:257.425}},{t:this.shape_331,p:{x:658.35}},{t:this.shape_327,p:{x:-544.425}}]},1).to({state:[{t:this.shape_329,p:{x:253.825}},{t:this.shape_328,p:{x:654.75}},{t:this.shape_327,p:{x:-548.025}}]},1).to({state:[{t:this.shape_329,p:{x:250.225}},{t:this.shape_332,p:{x:651.15}},{t:this.shape_327,p:{x:-551.625}}]},1).to({state:[{t:this.shape_329,p:{x:246.625}},{t:this.shape_331,p:{x:647.55}},{t:this.shape_327,p:{x:-555.225}}]},1).to({state:[{t:this.shape_329,p:{x:243.075}},{t:this.shape_328,p:{x:644}},{t:this.shape_327,p:{x:-558.775}}]},1).to({state:[{t:this.shape_329,p:{x:239.475}},{t:this.shape_332,p:{x:640.4}},{t:this.shape_327,p:{x:-562.375}}]},1).to({state:[{t:this.shape_329,p:{x:235.875}},{t:this.shape_331,p:{x:636.8}},{t:this.shape_327,p:{x:-565.975}}]},1).to({state:[{t:this.shape_329,p:{x:232.275}},{t:this.shape_330,p:{x:633.2}},{t:this.shape_327,p:{x:-569.575}}]},1).to({state:[{t:this.shape_329,p:{x:228.725}},{t:this.shape_332,p:{x:629.65}},{t:this.shape_327,p:{x:-573.125}}]},1).to({state:[{t:this.shape_329,p:{x:225.125}},{t:this.shape_331,p:{x:626.05}},{t:this.shape_327,p:{x:-576.725}}]},1).to({state:[{t:this.shape_329,p:{x:221.525}},{t:this.shape_330,p:{x:622.45}},{t:this.shape_327,p:{x:-580.325}}]},1).to({state:[{t:this.shape_329,p:{x:217.925}},{t:this.shape_331,p:{x:618.85}},{t:this.shape_327,p:{x:-583.925}}]},1).to({state:[{t:this.shape_329,p:{x:214.325}},{t:this.shape_328,p:{x:615.25}},{t:this.shape_327,p:{x:-587.525}}]},1).to({state:[{t:this.shape_329,p:{x:210.775}},{t:this.shape_330,p:{x:611.7}},{t:this.shape_327,p:{x:-591.075}}]},1).to({state:[{t:this.shape_329,p:{x:207.175}},{t:this.shape_331,p:{x:608.1}},{t:this.shape_327,p:{x:-594.675}}]},1).to({state:[{t:this.shape_329,p:{x:203.575}},{t:this.shape_328,p:{x:604.5}},{t:this.shape_327,p:{x:-598.275}}]},1).to({state:[{t:this.shape_329,p:{x:200.025}},{t:this.shape_330,p:{x:600.95}},{t:this.shape_327,p:{x:-601.825}}]},1).to({state:[{t:this.shape_329,p:{x:196.425}},{t:this.shape_331,p:{x:597.35}},{t:this.shape_327,p:{x:-605.425}}]},1).to({state:[{t:this.shape_329,p:{x:192.825}},{t:this.shape_328,p:{x:593.75}},{t:this.shape_327,p:{x:-609.025}}]},1).to({state:[{t:this.shape_329,p:{x:189.225}},{t:this.shape_332,p:{x:590.15}},{t:this.shape_327,p:{x:-612.625}}]},1).to({state:[{t:this.shape_329,p:{x:185.675}},{t:this.shape_331,p:{x:586.6}},{t:this.shape_327,p:{x:-616.175}}]},1).to({state:[{t:this.shape_329,p:{x:182.075}},{t:this.shape_328,p:{x:583}},{t:this.shape_327,p:{x:-619.775}}]},1).to({state:[{t:this.shape_329,p:{x:178.475}},{t:this.shape_332,p:{x:579.4}},{t:this.shape_327,p:{x:-623.375}}]},1).to({state:[{t:this.shape_329,p:{x:174.875}},{t:this.shape_331,p:{x:575.8}},{t:this.shape_327,p:{x:-626.975}}]},1).to({state:[{t:this.shape_329,p:{x:171.275}},{t:this.shape_330,p:{x:572.2}},{t:this.shape_327,p:{x:-630.575}}]},1).to({state:[{t:this.shape_329,p:{x:167.725}},{t:this.shape_332,p:{x:568.65}},{t:this.shape_327,p:{x:-634.125}}]},1).to({state:[{t:this.shape_329,p:{x:164.125}},{t:this.shape_331,p:{x:565.05}},{t:this.shape_327,p:{x:-637.725}}]},1).to({state:[{t:this.shape_329,p:{x:160.525}},{t:this.shape_330,p:{x:561.45}},{t:this.shape_327,p:{x:-641.325}}]},1).to({state:[{t:this.shape_329,p:{x:156.925}},{t:this.shape_331,p:{x:557.85}},{t:this.shape_327,p:{x:-644.925}}]},1).to({state:[{t:this.shape_329,p:{x:153.375}},{t:this.shape_331,p:{x:554.3}},{t:this.shape_327,p:{x:-648.475}}]},1).to({state:[{t:this.shape_329,p:{x:149.775}},{t:this.shape_330,p:{x:550.7}},{t:this.shape_327,p:{x:-652.075}}]},1).to({state:[{t:this.shape_329,p:{x:146.175}},{t:this.shape_331,p:{x:547.1}},{t:this.shape_327,p:{x:-655.675}}]},1).to({state:[{t:this.shape_329,p:{x:142.575}},{t:this.shape_328,p:{x:543.5}},{t:this.shape_327,p:{x:-659.275}}]},1).to({state:[{t:this.shape_329,p:{x:139.025}},{t:this.shape_328,p:{x:539.95}},{t:this.shape_327,p:{x:-662.825}}]},1).to({state:[{t:this.shape_329,p:{x:135.425}},{t:this.shape_331,p:{x:536.35}},{t:this.shape_327,p:{x:-666.425}}]},1).to({state:[{t:this.shape_329,p:{x:131.825}},{t:this.shape_328,p:{x:532.75}},{t:this.shape_327,p:{x:-670.025}}]},1).to({state:[{t:this.shape_329,p:{x:128.225}},{t:this.shape_332,p:{x:529.15}},{t:this.shape_327,p:{x:-673.625}}]},1).to({state:[{t:this.shape_329,p:{x:124.675}},{t:this.shape_331,p:{x:525.6}},{t:this.shape_327,p:{x:-677.175}}]},1).to({state:[{t:this.shape_329,p:{x:121.075}},{t:this.shape_328,p:{x:522}},{t:this.shape_327,p:{x:-680.775}}]},1).to({state:[{t:this.shape_329,p:{x:117.475}},{t:this.shape_332,p:{x:518.4}},{t:this.shape_327,p:{x:-684.375}}]},1).to({state:[{t:this.shape_329,p:{x:113.875}},{t:this.shape_331,p:{x:514.8}},{t:this.shape_327,p:{x:-687.975}}]},1).to({state:[{t:this.shape_329,p:{x:110.325}},{t:this.shape_333,p:{x:511.25}},{t:this.shape_327,p:{x:-691.525}}]},1).to({state:[{t:this.shape_329,p:{x:106.725}},{t:this.shape_332,p:{x:507.65}},{t:this.shape_327,p:{x:-695.125}}]},1).to({state:[{t:this.shape_329,p:{x:103.125}},{t:this.shape_331,p:{x:504.05}},{t:this.shape_327,p:{x:-698.725}}]},1).to({state:[{t:this.shape_329,p:{x:99.525}},{t:this.shape_334,p:{x:500.45}},{t:this.shape_327,p:{x:-702.325}}]},1).to({state:[{t:this.shape_329,p:{x:95.925}},{t:this.shape_331,p:{x:496.85}},{t:this.shape_327,p:{x:-705.925}}]},1).to({state:[{t:this.shape_329,p:{x:92.375}},{t:this.shape_331,p:{x:493.3}},{t:this.shape_327,p:{x:-709.475}}]},1).to({state:[{t:this.shape_329,p:{x:88.775}},{t:this.shape_334,p:{x:489.7}},{t:this.shape_327,p:{x:-713.075}}]},1).to({state:[{t:this.shape_329,p:{x:85.175}},{t:this.shape_331,p:{x:486.1}},{t:this.shape_327,p:{x:-716.675}}]},1).to({state:[{t:this.shape_329,p:{x:81.575}},{t:this.shape_333,p:{x:482.5}},{t:this.shape_327,p:{x:-720.275}}]},1).to({state:[{t:this.shape_329,p:{x:78.025}},{t:this.shape_334,p:{x:478.95}},{t:this.shape_327,p:{x:-723.825}}]},1).to({state:[{t:this.shape_329,p:{x:74.425}},{t:this.shape_331,p:{x:475.35}},{t:this.shape_327,p:{x:-727.425}}]},1).to({state:[{t:this.shape_329,p:{x:70.825}},{t:this.shape_333,p:{x:471.75}},{t:this.shape_327,p:{x:-731.025}}]},1).to({state:[{t:this.shape_329,p:{x:67.225}},{t:this.shape_332,p:{x:468.15}},{t:this.shape_327,p:{x:-734.625}}]},1).to({state:[{t:this.shape_329,p:{x:63.675}},{t:this.shape_331,p:{x:464.6}},{t:this.shape_327,p:{x:-738.175}}]},1).to({state:[{t:this.shape_329,p:{x:60.075}},{t:this.shape_333,p:{x:461}},{t:this.shape_327,p:{x:-741.775}}]},1).to({state:[{t:this.shape_329,p:{x:56.475}},{t:this.shape_332,p:{x:457.4}},{t:this.shape_327,p:{x:-745.375}}]},1).to({state:[{t:this.shape_329,p:{x:52.875}},{t:this.shape_331,p:{x:453.8}},{t:this.shape_327,p:{x:-748.975}}]},1).to({state:[{t:this.shape_329,p:{x:49.325}},{t:this.shape_333,p:{x:450.25}},{t:this.shape_327,p:{x:-752.525}}]},1).to({state:[{t:this.shape_329,p:{x:45.725}},{t:this.shape_332,p:{x:446.65}},{t:this.shape_327,p:{x:-756.125}}]},1).to({state:[{t:this.shape_329,p:{x:42.125}},{t:this.shape_331,p:{x:443.05}},{t:this.shape_327,p:{x:-759.725}}]},1).to({state:[{t:this.shape_329,p:{x:38.525}},{t:this.shape_334,p:{x:439.45}},{t:this.shape_327,p:{x:-763.325}}]},1).to({state:[{t:this.shape_329,p:{x:34.975}},{t:this.shape_332,p:{x:435.9}},{t:this.shape_327,p:{x:-766.875}}]},1).to({state:[{t:this.shape_329,p:{x:31.375}},{t:this.shape_331,p:{x:432.3}},{t:this.shape_327,p:{x:-770.475}}]},1).to({state:[{t:this.shape_329,p:{x:27.775}},{t:this.shape_334,p:{x:428.7}},{t:this.shape_327,p:{x:-774.075}}]},1).to({state:[{t:this.shape_329,p:{x:24.175}},{t:this.shape_331,p:{x:425.1}},{t:this.shape_327,p:{x:-777.675}}]},1).to({state:[{t:this.shape_329,p:{x:20.575}},{t:this.shape_333,p:{x:421.5}},{t:this.shape_327,p:{x:-781.275}}]},1).to({state:[{t:this.shape_329,p:{x:17.025}},{t:this.shape_334,p:{x:417.95}},{t:this.shape_327,p:{x:-784.825}}]},1).to({state:[{t:this.shape_329,p:{x:13.425}},{t:this.shape_331,p:{x:414.35}},{t:this.shape_327,p:{x:-788.425}}]},1).to({state:[{t:this.shape_329,p:{x:9.825}},{t:this.shape_333,p:{x:410.75}},{t:this.shape_327,p:{x:-792.025}}]},1).to({state:[{t:this.shape_329,p:{x:6.225}},{t:this.shape_332,p:{x:407.15}},{t:this.shape_327,p:{x:-795.625}}]},1).to({state:[{t:this.shape_329,p:{x:2.675}},{t:this.shape_331,p:{x:403.6}},{t:this.shape_327,p:{x:-799.175}}]},1).to({state:[{t:this.shape_329,p:{x:-0.925}},{t:this.shape_333,p:{x:400}},{t:this.shape_327,p:{x:-802.775}}]},1).to({state:[{t:this.shape_329,p:{x:-4.525}},{t:this.shape_332,p:{x:396.4}},{t:this.shape_327,p:{x:-806.375}}]},1).to({state:[{t:this.shape_329,p:{x:-8.075}},{t:this.shape_331,p:{x:392.85}},{t:this.shape_327,p:{x:-809.925}}]},1).to({state:[{t:this.shape_329,p:{x:-11.675}},{t:this.shape_333,p:{x:389.25}},{t:this.shape_327,p:{x:-813.525}}]},1).to({state:[{t:this.shape_329,p:{x:-15.275}},{t:this.shape_332,p:{x:385.65}},{t:this.shape_327,p:{x:-817.125}}]},1).to({state:[{t:this.shape_329,p:{x:-18.875}},{t:this.shape_331,p:{x:382.05}},{t:this.shape_327,p:{x:-820.725}}]},1).to({state:[{t:this.shape_329,p:{x:-22.425}},{t:this.shape_333,p:{x:378.5}},{t:this.shape_327,p:{x:-824.275}}]},1).to({state:[{t:this.shape_329,p:{x:-26.025}},{t:this.shape_332,p:{x:374.9}},{t:this.shape_327,p:{x:-827.875}}]},1).to({state:[{t:this.shape_329,p:{x:-29.625}},{t:this.shape_331,p:{x:371.3}},{t:this.shape_327,p:{x:-831.475}}]},1).to({state:[{t:this.shape_329,p:{x:-33.225}},{t:this.shape_334,p:{x:367.7}},{t:this.shape_327,p:{x:-835.075}}]},1).to({state:[{t:this.shape_329,p:{x:-36.825}},{t:this.shape_331,p:{x:364.1}},{t:this.shape_327,p:{x:-838.675}}]},1).to({state:[{t:this.shape_329,p:{x:-40.375}},{t:this.shape_331,p:{x:360.55}},{t:this.shape_327,p:{x:-842.225}}]},1).to({state:[{t:this.shape_329,p:{x:-43.975}},{t:this.shape_334,p:{x:356.95}},{t:this.shape_327,p:{x:-845.825}}]},1).to({state:[{t:this.shape_329,p:{x:-47.575}},{t:this.shape_331,p:{x:353.35}},{t:this.shape_327,p:{x:-849.425}}]},1).to({state:[{t:this.shape_329,p:{x:-51.175}},{t:this.shape_333,p:{x:349.75}},{t:this.shape_327,p:{x:-853.025}}]},1).to({state:[{t:this.shape_329,p:{x:-54.725}},{t:this.shape_334,p:{x:346.2}},{t:this.shape_327,p:{x:-856.575}}]},1).to({state:[{t:this.shape_329,p:{x:-58.325}},{t:this.shape_331,p:{x:342.6}},{t:this.shape_327,p:{x:-860.175}}]},1).to({state:[{t:this.shape_329,p:{x:-61.925}},{t:this.shape_333,p:{x:339}},{t:this.shape_327,p:{x:-863.775}}]},1).to({state:[{t:this.shape_329,p:{x:-65.525}},{t:this.shape_332,p:{x:335.4}},{t:this.shape_327,p:{x:-867.375}}]},1).to({state:[{t:this.shape_329,p:{x:-69.075}},{t:this.shape_331,p:{x:331.85}},{t:this.shape_327,p:{x:-870.925}}]},1).to({state:[{t:this.shape_329,p:{x:-72.675}},{t:this.shape_333,p:{x:328.25}},{t:this.shape_327,p:{x:-874.525}}]},1).to({state:[{t:this.shape_329,p:{x:-76.275}},{t:this.shape_332,p:{x:324.65}},{t:this.shape_327,p:{x:-878.125}}]},1).to({state:[{t:this.shape_329,p:{x:-79.875}},{t:this.shape_331,p:{x:321.05}},{t:this.shape_327,p:{x:-881.725}}]},1).to({state:[{t:this.shape_329,p:{x:-83.425}},{t:this.shape_333,p:{x:317.5}},{t:this.shape_327,p:{x:-885.275}}]},1).to({state:[{t:this.shape_329,p:{x:-87.025}},{t:this.shape_332,p:{x:313.9}},{t:this.shape_327,p:{x:-888.875}}]},1).to({state:[{t:this.shape_329,p:{x:-90.625}},{t:this.shape_331,p:{x:310.3}},{t:this.shape_327,p:{x:-892.475}}]},1).to({state:[{t:this.shape_329,p:{x:-94.225}},{t:this.shape_334,p:{x:306.7}},{t:this.shape_327,p:{x:-896.075}}]},1).to({state:[{t:this.shape_329,p:{x:-97.775}},{t:this.shape_332,p:{x:303.15}},{t:this.shape_327,p:{x:-899.625}}]},1).to({state:[{t:this.shape_329,p:{x:-101.375}},{t:this.shape_331,p:{x:299.55}},{t:this.shape_327,p:{x:-903.225}}]},1).to({state:[{t:this.shape_329,p:{x:-104.975}},{t:this.shape_334,p:{x:295.95}},{t:this.shape_327,p:{x:-906.825}}]},1).to({state:[{t:this.shape_329,p:{x:-108.575}},{t:this.shape_331,p:{x:292.35}},{t:this.shape_327,p:{x:-910.425}}]},1).to({state:[{t:this.shape_329,p:{x:-112.175}},{t:this.shape_333,p:{x:288.75}},{t:this.shape_327,p:{x:-914.025}}]},1).to({state:[{t:this.shape_329,p:{x:-115.725}},{t:this.shape_334,p:{x:285.2}},{t:this.shape_327,p:{x:-917.575}}]},1).to({state:[{t:this.shape_329,p:{x:-119.325}},{t:this.shape_331,p:{x:281.6}},{t:this.shape_327,p:{x:-921.175}}]},1).to({state:[{t:this.shape_329,p:{x:-122.925}},{t:this.shape_333,p:{x:278}},{t:this.shape_327,p:{x:-924.775}}]},1).to({state:[{t:this.shape_329,p:{x:-126.525}},{t:this.shape_331,p:{x:274.4}},{t:this.shape_327,p:{x:-928.375}}]},1).to({state:[{t:this.shape_329,p:{x:-130.075}},{t:this.shape_331,p:{x:270.85}},{t:this.shape_327,p:{x:-931.925}}]},1).to({state:[{t:this.shape_329,p:{x:-133.675}},{t:this.shape_333,p:{x:267.25}},{t:this.shape_327,p:{x:-935.525}}]},1).to({state:[{t:this.shape_329,p:{x:-137.275}},{t:this.shape_331,p:{x:263.65}},{t:this.shape_327,p:{x:-939.125}}]},1).to({state:[{t:this.shape_329,p:{x:-140.875}},{t:this.shape_331,p:{x:260.05}},{t:this.shape_327,p:{x:-942.725}}]},1).to({state:[{t:this.shape_329,p:{x:-144.425}},{t:this.shape_333,p:{x:256.5}},{t:this.shape_327,p:{x:-946.275}}]},1).to({state:[{t:this.shape_329,p:{x:-148.025}},{t:this.shape_331,p:{x:252.9}},{t:this.shape_327,p:{x:-949.875}}]},1).to({state:[{t:this.shape_329,p:{x:-151.625}},{t:this.shape_331,p:{x:249.3}},{t:this.shape_327,p:{x:-953.475}}]},1).to({state:[{t:this.shape_329,p:{x:-155.225}},{t:this.shape_334,p:{x:245.7}},{t:this.shape_327,p:{x:-957.075}}]},1).to({state:[{t:this.shape_329,p:{x:-158.775}},{t:this.shape_331,p:{x:242.15}},{t:this.shape_327,p:{x:-960.625}}]},1).to({state:[{t:this.shape_329,p:{x:-162.375}},{t:this.shape_331,p:{x:238.55}},{t:this.shape_327,p:{x:-964.225}}]},1).to({state:[{t:this.shape_329,p:{x:-165.975}},{t:this.shape_334,p:{x:234.95}},{t:this.shape_327,p:{x:-967.825}}]},1).to({state:[{t:this.shape_329,p:{x:-169.575}},{t:this.shape_331,p:{x:231.35}},{t:this.shape_327,p:{x:-971.425}}]},1).to({state:[{t:this.shape_329,p:{x:-173.125}},{t:this.shape_331,p:{x:227.8}},{t:this.shape_327,p:{x:-974.975}}]},1).to({state:[{t:this.shape_329,p:{x:-176.725}},{t:this.shape_334,p:{x:224.2}},{t:this.shape_327,p:{x:-978.575}}]},1).to({state:[{t:this.shape_329,p:{x:-180.325}},{t:this.shape_331,p:{x:220.6}},{t:this.shape_327,p:{x:-982.175}}]},1).to({state:[{t:this.shape_329,p:{x:-183.925}},{t:this.shape_331,p:{x:217}},{t:this.shape_327,p:{x:-985.775}}]},1).to({state:[{t:this.shape_329,p:{x:-187.525}},{t:this.shape_331,p:{x:213.4}},{t:this.shape_327,p:{x:-989.375}}]},1).to({state:[{t:this.shape_329,p:{x:-191.075}},{t:this.shape_331,p:{x:209.85}},{t:this.shape_327,p:{x:-992.925}}]},1).to({state:[{t:this.shape_329,p:{x:-194.675}},{t:this.shape_331,p:{x:206.25}},{t:this.shape_327,p:{x:-996.525}}]},1).to({state:[{t:this.shape_329,p:{x:-198.275}},{t:this.shape_331,p:{x:202.65}},{t:this.shape_327,p:{x:-1000.125}}]},1).to({state:[{t:this.shape_329,p:{x:-201.825}},{t:this.shape_331,p:{x:199.1}},{t:this.shape_327,p:{x:-1003.675}}]},1).to({state:[{t:this.shape_329,p:{x:-205.425}},{t:this.shape_331,p:{x:195.5}},{t:this.shape_327,p:{x:-1007.275}}]},1).to({state:[{t:this.shape_329,p:{x:-209.025}},{t:this.shape_331,p:{x:191.9}},{t:this.shape_327,p:{x:-1010.875}}]},1).to({state:[{t:this.shape_329,p:{x:-212.625}},{t:this.shape_334,p:{x:188.3}},{t:this.shape_327,p:{x:-1014.475}}]},1).to({state:[{t:this.shape_329,p:{x:-216.175}},{t:this.shape_331,p:{x:184.75}},{t:this.shape_327,p:{x:-1018.025}}]},1).to({state:[{t:this.shape_329,p:{x:-219.775}},{t:this.shape_331,p:{x:181.15}},{t:this.shape_327,p:{x:-1021.625}}]},1).to({state:[{t:this.shape_329,p:{x:-223.375}},{t:this.shape_334,p:{x:177.55}},{t:this.shape_327,p:{x:-1025.225}}]},1).to({state:[{t:this.shape_329,p:{x:-226.975}},{t:this.shape_334,p:{x:173.95}},{t:this.shape_327,p:{x:-1028.825}}]},1).to({state:[{t:this.shape_329,p:{x:-230.575}},{t:this.shape_331,p:{x:170.35}},{t:this.shape_327,p:{x:-1032.425}}]},1).to({state:[{t:this.shape_329,p:{x:-234.125}},{t:this.shape_334,p:{x:166.8}},{t:this.shape_327,p:{x:-1035.975}}]},1).to({state:[{t:this.shape_329,p:{x:-237.725}},{t:this.shape_334,p:{x:163.2}},{t:this.shape_327,p:{x:-1039.575}}]},1).to({state:[{t:this.shape_329,p:{x:-241.325}},{t:this.shape_331,p:{x:159.6}},{t:this.shape_327,p:{x:-1043.175}}]},1).to({state:[{t:this.shape_329,p:{x:-244.925}},{t:this.shape_331,p:{x:156}},{t:this.shape_327,p:{x:-1046.775}}]},1).to({state:[{t:this.shape_329,p:{x:-248.475}},{t:this.shape_334,p:{x:152.45}},{t:this.shape_327,p:{x:-1050.325}}]},1).to({state:[{t:this.shape_329,p:{x:-252.075}},{t:this.shape_331,p:{x:148.85}},{t:this.shape_327,p:{x:-1053.925}}]},1).to({state:[{t:this.shape_329,p:{x:-255.675}},{t:this.shape_331,p:{x:145.25}},{t:this.shape_327,p:{x:-1057.525}}]},1).to({state:[{t:this.shape_329,p:{x:-259.275}},{t:this.shape_331,p:{x:141.65}},{t:this.shape_327,p:{x:-1061.125}}]},1).to({state:[{t:this.shape_329,p:{x:-262.825}},{t:this.shape_331,p:{x:138.1}},{t:this.shape_327,p:{x:-1064.675}}]},1).to({state:[{t:this.shape_329,p:{x:-266.425}},{t:this.shape_331,p:{x:134.5}},{t:this.shape_327,p:{x:-1068.275}}]},1).to({state:[{t:this.shape_329,p:{x:-270.025}},{t:this.shape_331,p:{x:130.9}},{t:this.shape_327,p:{x:-1071.875}}]},1).to({state:[{t:this.shape_329,p:{x:-273.625}},{t:this.shape_334,p:{x:127.3}},{t:this.shape_327,p:{x:-1075.475}}]},1).to({state:[{t:this.shape_329,p:{x:-277.175}},{t:this.shape_331,p:{x:123.75}},{t:this.shape_327,p:{x:-1079.025}}]},1).to({state:[{t:this.shape_329,p:{x:-280.775}},{t:this.shape_331,p:{x:120.15}},{t:this.shape_327,p:{x:-1082.625}}]},1).to({state:[{t:this.shape_329,p:{x:-284.375}},{t:this.shape_334,p:{x:116.55}},{t:this.shape_327,p:{x:-1086.225}}]},1).to({state:[{t:this.shape_329,p:{x:-287.975}},{t:this.shape_334,p:{x:112.95}},{t:this.shape_327,p:{x:-1089.825}}]},1).to({state:[{t:this.shape_329,p:{x:-291.525}},{t:this.shape_331,p:{x:109.4}},{t:this.shape_327,p:{x:-1093.375}}]},1).to({state:[{t:this.shape_329,p:{x:-295.125}},{t:this.shape_334,p:{x:105.8}},{t:this.shape_327,p:{x:-1096.975}}]},1).to({state:[{t:this.shape_329,p:{x:-298.725}},{t:this.shape_334,p:{x:102.2}},{t:this.shape_327,p:{x:-1100.575}}]},1).to({state:[{t:this.shape_329,p:{x:-302.325}},{t:this.shape_331,p:{x:98.6}},{t:this.shape_327,p:{x:-1104.175}}]},1).to({state:[{t:this.shape_329,p:{x:-305.925}},{t:this.shape_331,p:{x:95}},{t:this.shape_327,p:{x:-1107.775}}]},1).to({state:[{t:this.shape_329,p:{x:-309.475}},{t:this.shape_334,p:{x:91.45}},{t:this.shape_327,p:{x:-1111.325}}]},1).to({state:[{t:this.shape_329,p:{x:-313.075}},{t:this.shape_331,p:{x:87.85}},{t:this.shape_327,p:{x:-1114.925}}]},1).to({state:[{t:this.shape_329,p:{x:-316.675}},{t:this.shape_331,p:{x:84.25}},{t:this.shape_327,p:{x:-1118.525}}]},1).to({state:[{t:this.shape_329,p:{x:-320.275}},{t:this.shape_331,p:{x:80.65}},{t:this.shape_327,p:{x:-1122.125}}]},1).to({state:[{t:this.shape_329,p:{x:-323.825}},{t:this.shape_331,p:{x:77.1}},{t:this.shape_327,p:{x:-1125.675}}]},1).to({state:[{t:this.shape_329,p:{x:-327.425}},{t:this.shape_331,p:{x:73.5}},{t:this.shape_327,p:{x:-1129.275}}]},1).to({state:[{t:this.shape_329,p:{x:-331.025}},{t:this.shape_331,p:{x:69.9}},{t:this.shape_327,p:{x:-1132.875}}]},1).to({state:[{t:this.shape_329,p:{x:-334.625}},{t:this.shape_334,p:{x:66.3}},{t:this.shape_327,p:{x:-1136.475}}]},1).to({state:[{t:this.shape_329,p:{x:-338.175}},{t:this.shape_331,p:{x:62.75}},{t:this.shape_327,p:{x:-1140.025}}]},1).to({state:[{t:this.shape_329,p:{x:-341.775}},{t:this.shape_331,p:{x:59.15}},{t:this.shape_327,p:{x:-1143.625}}]},1).to({state:[{t:this.shape_329,p:{x:-345.375}},{t:this.shape_334,p:{x:55.55}},{t:this.shape_327,p:{x:-1147.225}}]},1).to({state:[{t:this.shape_329,p:{x:-348.975}},{t:this.shape_334,p:{x:51.95}},{t:this.shape_327,p:{x:-1150.825}}]},1).to({state:[{t:this.shape_329,p:{x:-352.525}},{t:this.shape_331,p:{x:48.4}},{t:this.shape_327,p:{x:-1154.375}}]},1).to({state:[{t:this.shape_329,p:{x:-356.125}},{t:this.shape_334,p:{x:44.8}},{t:this.shape_327,p:{x:-1157.975}}]},1).to({state:[{t:this.shape_329,p:{x:-359.725}},{t:this.shape_334,p:{x:41.2}},{t:this.shape_327,p:{x:-1161.575}}]},1).to({state:[{t:this.shape_329,p:{x:-363.325}},{t:this.shape_331,p:{x:37.6}},{t:this.shape_327,p:{x:-1165.175}}]},1).to({state:[{t:this.shape_329,p:{x:-366.875}},{t:this.shape_334,p:{x:34.05}},{t:this.shape_327,p:{x:-1168.725}}]},1).to({state:[{t:this.shape_329,p:{x:-370.475}},{t:this.shape_334,p:{x:30.45}},{t:this.shape_327,p:{x:-1172.325}}]},1).to({state:[{t:this.shape_329,p:{x:-374.075}},{t:this.shape_331,p:{x:26.85}},{t:this.shape_327,p:{x:-1175.925}}]},1).to({state:[{t:this.shape_329,p:{x:-377.675}},{t:this.shape_331,p:{x:23.25}},{t:this.shape_327,p:{x:-1179.525}}]},1).to({state:[{t:this.shape_329,p:{x:-381.275}},{t:this.shape_331,p:{x:19.65}},{t:this.shape_327,p:{x:-1183.125}}]},1).to({state:[{t:this.shape_329,p:{x:-384.825}},{t:this.shape_331,p:{x:16.1}},{t:this.shape_327,p:{x:-1186.675}}]},1).to({state:[{t:this.shape_329,p:{x:-388.425}},{t:this.shape_331,p:{x:12.5}},{t:this.shape_327,p:{x:-1190.275}}]},1).to({state:[{t:this.shape_329,p:{x:-392.025}},{t:this.shape_331,p:{x:8.9}},{t:this.shape_327,p:{x:-1193.875}}]},1).to({state:[{t:this.shape_329,p:{x:-395.625}},{t:this.shape_334,p:{x:5.3}},{t:this.shape_327,p:{x:-1197.475}}]},1).to({state:[{t:this.shape_329,p:{x:-399.175}},{t:this.shape_331,p:{x:1.75}},{t:this.shape_327,p:{x:-1201.025}}]},1).to({state:[{t:this.shape_326,p:{x:-402.775}},{t:this.shape_325,p:{x:399.075}},{t:this.shape_324,p:{x:-1204.625}},{t:this.shape_323,p:{x:-402.775}}]},1).to({state:[{t:this.shape_326,p:{x:398.175}},{t:this.shape_325,p:{x:1200.025}},{t:this.shape_324,p:{x:-403.675}},{t:this.shape_323,p:{x:398.175}}]},1).to({state:[{t:this.shape_329,p:{x:392.775}},{t:this.shape_330,p:{x:793.7}},{t:this.shape_327,p:{x:-409.075}}]},1).to({state:[{t:this.shape_329,p:{x:387.425}},{t:this.shape_331,p:{x:788.35}},{t:this.shape_327,p:{x:-414.425}}]},1).to({state:[{t:this.shape_329,p:{x:382.025}},{t:this.shape_330,p:{x:782.95}},{t:this.shape_327,p:{x:-419.825}}]},1).to({state:[{t:this.shape_329,p:{x:376.675}},{t:this.shape_331,p:{x:777.6}},{t:this.shape_327,p:{x:-425.175}}]},1).to({state:[{t:this.shape_329,p:{x:371.275}},{t:this.shape_330,p:{x:772.2}},{t:this.shape_327,p:{x:-430.575}}]},1).to({state:[{t:this.shape_329,p:{x:365.925}},{t:this.shape_331,p:{x:766.85}},{t:this.shape_327,p:{x:-435.925}}]},1).to({state:[{t:this.shape_329,p:{x:360.525}},{t:this.shape_330,p:{x:761.45}},{t:this.shape_327,p:{x:-441.325}}]},1).to({state:[{t:this.shape_329,p:{x:355.175}},{t:this.shape_331,p:{x:756.1}},{t:this.shape_327,p:{x:-446.675}}]},1).to({state:[{t:this.shape_329,p:{x:349.775}},{t:this.shape_330,p:{x:750.7}},{t:this.shape_327,p:{x:-452.075}}]},1).to({state:[{t:this.shape_329,p:{x:344.425}},{t:this.shape_331,p:{x:745.35}},{t:this.shape_327,p:{x:-457.425}}]},1).to({state:[{t:this.shape_329,p:{x:339.025}},{t:this.shape_330,p:{x:739.95}},{t:this.shape_327,p:{x:-462.825}}]},1).to({state:[{t:this.shape_329,p:{x:333.675}},{t:this.shape_331,p:{x:734.6}},{t:this.shape_327,p:{x:-468.175}}]},1).to({state:[{t:this.shape_329,p:{x:328.275}},{t:this.shape_330,p:{x:729.2}},{t:this.shape_327,p:{x:-473.575}}]},1).to({state:[{t:this.shape_329,p:{x:322.925}},{t:this.shape_331,p:{x:723.85}},{t:this.shape_327,p:{x:-478.925}}]},1).to({state:[{t:this.shape_329,p:{x:317.525}},{t:this.shape_330,p:{x:718.45}},{t:this.shape_327,p:{x:-484.325}}]},1).to({state:[{t:this.shape_329,p:{x:312.175}},{t:this.shape_331,p:{x:713.1}},{t:this.shape_327,p:{x:-489.675}}]},1).to({state:[{t:this.shape_329,p:{x:306.775}},{t:this.shape_330,p:{x:707.7}},{t:this.shape_327,p:{x:-495.075}}]},1).to({state:[{t:this.shape_329,p:{x:301.425}},{t:this.shape_331,p:{x:702.35}},{t:this.shape_327,p:{x:-500.425}}]},1).to({state:[{t:this.shape_329,p:{x:296.025}},{t:this.shape_330,p:{x:696.95}},{t:this.shape_327,p:{x:-505.825}}]},1).to({state:[{t:this.shape_329,p:{x:290.675}},{t:this.shape_331,p:{x:691.6}},{t:this.shape_327,p:{x:-511.175}}]},1).to({state:[{t:this.shape_329,p:{x:285.275}},{t:this.shape_330,p:{x:686.2}},{t:this.shape_327,p:{x:-516.575}}]},1).to({state:[{t:this.shape_329,p:{x:279.925}},{t:this.shape_331,p:{x:680.85}},{t:this.shape_327,p:{x:-521.925}}]},1).to({state:[{t:this.shape_329,p:{x:274.525}},{t:this.shape_330,p:{x:675.45}},{t:this.shape_327,p:{x:-527.325}}]},1).to({state:[{t:this.shape_329,p:{x:269.175}},{t:this.shape_331,p:{x:670.1}},{t:this.shape_327,p:{x:-532.675}}]},1).to({state:[{t:this.shape_329,p:{x:263.775}},{t:this.shape_330,p:{x:664.7}},{t:this.shape_327,p:{x:-538.075}}]},1).to({state:[{t:this.shape_329,p:{x:258.425}},{t:this.shape_331,p:{x:659.35}},{t:this.shape_327,p:{x:-543.425}}]},1).to({state:[{t:this.shape_329,p:{x:253.025}},{t:this.shape_330,p:{x:653.95}},{t:this.shape_327,p:{x:-548.825}}]},1).to({state:[{t:this.shape_329,p:{x:247.675}},{t:this.shape_331,p:{x:648.6}},{t:this.shape_327,p:{x:-554.175}}]},1).to({state:[{t:this.shape_329,p:{x:242.275}},{t:this.shape_330,p:{x:643.2}},{t:this.shape_327,p:{x:-559.575}}]},1).to({state:[{t:this.shape_329,p:{x:236.925}},{t:this.shape_331,p:{x:637.85}},{t:this.shape_327,p:{x:-564.925}}]},1).to({state:[{t:this.shape_329,p:{x:231.525}},{t:this.shape_330,p:{x:632.45}},{t:this.shape_327,p:{x:-570.325}}]},1).to({state:[{t:this.shape_329,p:{x:226.175}},{t:this.shape_331,p:{x:627.1}},{t:this.shape_327,p:{x:-575.675}}]},1).to({state:[{t:this.shape_329,p:{x:220.775}},{t:this.shape_330,p:{x:621.7}},{t:this.shape_327,p:{x:-581.075}}]},1).to({state:[{t:this.shape_329,p:{x:215.425}},{t:this.shape_331,p:{x:616.35}},{t:this.shape_327,p:{x:-586.425}}]},1).to({state:[{t:this.shape_329,p:{x:210.025}},{t:this.shape_330,p:{x:610.95}},{t:this.shape_327,p:{x:-591.825}}]},1).to({state:[{t:this.shape_329,p:{x:204.675}},{t:this.shape_331,p:{x:605.6}},{t:this.shape_327,p:{x:-597.175}}]},1).to({state:[{t:this.shape_329,p:{x:199.275}},{t:this.shape_330,p:{x:600.2}},{t:this.shape_327,p:{x:-602.575}}]},1).to({state:[{t:this.shape_329,p:{x:193.925}},{t:this.shape_331,p:{x:594.85}},{t:this.shape_327,p:{x:-607.925}}]},1).to({state:[{t:this.shape_329,p:{x:188.525}},{t:this.shape_330,p:{x:589.45}},{t:this.shape_327,p:{x:-613.325}}]},1).to({state:[{t:this.shape_329,p:{x:183.125}},{t:this.shape_331,p:{x:584.05}},{t:this.shape_327,p:{x:-618.725}}]},1).to({state:[{t:this.shape_329,p:{x:177.775}},{t:this.shape_330,p:{x:578.7}},{t:this.shape_327,p:{x:-624.075}}]},1).to({state:[{t:this.shape_329,p:{x:172.425}},{t:this.shape_331,p:{x:573.35}},{t:this.shape_327,p:{x:-629.425}}]},1).to({state:[{t:this.shape_329,p:{x:167.025}},{t:this.shape_330,p:{x:567.95}},{t:this.shape_327,p:{x:-634.825}}]},1).to({state:[{t:this.shape_329,p:{x:161.675}},{t:this.shape_331,p:{x:562.6}},{t:this.shape_327,p:{x:-640.175}}]},1).to({state:[{t:this.shape_329,p:{x:156.275}},{t:this.shape_330,p:{x:557.2}},{t:this.shape_327,p:{x:-645.575}}]},1).to({state:[{t:this.shape_329,p:{x:150.875}},{t:this.shape_331,p:{x:551.8}},{t:this.shape_327,p:{x:-650.975}}]},1).to({state:[{t:this.shape_329,p:{x:145.525}},{t:this.shape_328,p:{x:546.45}},{t:this.shape_327,p:{x:-656.325}}]},1).to({state:[{t:this.shape_329,p:{x:140.175}},{t:this.shape_331,p:{x:541.1}},{t:this.shape_327,p:{x:-661.675}}]},1).to({state:[{t:this.shape_329,p:{x:134.775}},{t:this.shape_328,p:{x:535.7}},{t:this.shape_327,p:{x:-667.075}}]},1).to({state:[{t:this.shape_329,p:{x:129.375}},{t:this.shape_331,p:{x:530.3}},{t:this.shape_327,p:{x:-672.475}}]},1).to({state:[{t:this.shape_329,p:{x:124.025}},{t:this.shape_328,p:{x:524.95}},{t:this.shape_327,p:{x:-677.825}}]},1).to({state:[{t:this.shape_329,p:{x:118.625}},{t:this.shape_331,p:{x:519.55}},{t:this.shape_327,p:{x:-683.225}}]},1).to({state:[{t:this.shape_329,p:{x:113.275}},{t:this.shape_328,p:{x:514.2}},{t:this.shape_327,p:{x:-688.575}}]},1).to({state:[{t:this.shape_329,p:{x:107.925}},{t:this.shape_331,p:{x:508.85}},{t:this.shape_327,p:{x:-693.925}}]},1).to({state:[{t:this.shape_329,p:{x:102.525}},{t:this.shape_334,p:{x:503.45}},{t:this.shape_327,p:{x:-699.325}}]},1).to({state:[{t:this.shape_329,p:{x:97.125}},{t:this.shape_331,p:{x:498.05}},{t:this.shape_327,p:{x:-704.725}}]},1).to({state:[{t:this.shape_329,p:{x:91.775}},{t:this.shape_334,p:{x:492.7}},{t:this.shape_327,p:{x:-710.075}}]},1).to({state:[{t:this.shape_329,p:{x:86.375}},{t:this.shape_331,p:{x:487.3}},{t:this.shape_327,p:{x:-715.475}}]},1).to({state:[{t:this.shape_329,p:{x:81.025}},{t:this.shape_334,p:{x:481.95}},{t:this.shape_327,p:{x:-720.825}}]},1).to({state:[{t:this.shape_329,p:{x:75.625}},{t:this.shape_331,p:{x:476.55}},{t:this.shape_327,p:{x:-726.225}}]},1).to({state:[{t:this.shape_329,p:{x:70.275}},{t:this.shape_334,p:{x:471.2}},{t:this.shape_327,p:{x:-731.575}}]},1).to({state:[{t:this.shape_329,p:{x:64.875}},{t:this.shape_331,p:{x:465.8}},{t:this.shape_327,p:{x:-736.975}}]},1).to({state:[{t:this.shape_329,p:{x:59.525}},{t:this.shape_334,p:{x:460.45}},{t:this.shape_327,p:{x:-742.325}}]},1).to({state:[{t:this.shape_329,p:{x:54.125}},{t:this.shape_331,p:{x:455.05}},{t:this.shape_327,p:{x:-747.725}}]},1).to({state:[{t:this.shape_329,p:{x:48.775}},{t:this.shape_334,p:{x:449.7}},{t:this.shape_327,p:{x:-753.075}}]},1).to({state:[{t:this.shape_329,p:{x:43.375}},{t:this.shape_331,p:{x:444.3}},{t:this.shape_327,p:{x:-758.475}}]},1).to({state:[{t:this.shape_329,p:{x:38.025}},{t:this.shape_334,p:{x:438.95}},{t:this.shape_327,p:{x:-763.825}}]},1).to({state:[{t:this.shape_329,p:{x:32.625}},{t:this.shape_331,p:{x:433.55}},{t:this.shape_327,p:{x:-769.225}}]},1).to({state:[{t:this.shape_329,p:{x:27.275}},{t:this.shape_334,p:{x:428.2}},{t:this.shape_327,p:{x:-774.575}}]},1).to({state:[{t:this.shape_329,p:{x:21.875}},{t:this.shape_331,p:{x:422.8}},{t:this.shape_327,p:{x:-779.975}}]},1).to({state:[{t:this.shape_329,p:{x:16.525}},{t:this.shape_334,p:{x:417.45}},{t:this.shape_327,p:{x:-785.325}}]},1).to({state:[{t:this.shape_329,p:{x:11.125}},{t:this.shape_331,p:{x:412.05}},{t:this.shape_327,p:{x:-790.725}}]},1).to({state:[{t:this.shape_329,p:{x:5.775}},{t:this.shape_334,p:{x:406.7}},{t:this.shape_327,p:{x:-796.075}}]},1).to({state:[{t:this.shape_329,p:{x:0.375}},{t:this.shape_331,p:{x:401.3}},{t:this.shape_327,p:{x:-801.475}}]},1).to({state:[{t:this.shape_329,p:{x:-4.975}},{t:this.shape_334,p:{x:395.95}},{t:this.shape_327,p:{x:-806.825}}]},1).to({state:[{t:this.shape_329,p:{x:-10.375}},{t:this.shape_331,p:{x:390.55}},{t:this.shape_327,p:{x:-812.225}}]},1).to({state:[{t:this.shape_329,p:{x:-15.725}},{t:this.shape_334,p:{x:385.2}},{t:this.shape_327,p:{x:-817.575}}]},1).to({state:[{t:this.shape_329,p:{x:-21.125}},{t:this.shape_331,p:{x:379.8}},{t:this.shape_327,p:{x:-822.975}}]},1).to({state:[{t:this.shape_329,p:{x:-26.475}},{t:this.shape_334,p:{x:374.45}},{t:this.shape_327,p:{x:-828.325}}]},1).to({state:[{t:this.shape_329,p:{x:-31.875}},{t:this.shape_331,p:{x:369.05}},{t:this.shape_327,p:{x:-833.725}}]},1).to({state:[{t:this.shape_329,p:{x:-37.225}},{t:this.shape_334,p:{x:363.7}},{t:this.shape_327,p:{x:-839.075}}]},1).to({state:[{t:this.shape_329,p:{x:-42.625}},{t:this.shape_331,p:{x:358.3}},{t:this.shape_327,p:{x:-844.475}}]},1).to({state:[{t:this.shape_329,p:{x:-47.975}},{t:this.shape_334,p:{x:352.95}},{t:this.shape_327,p:{x:-849.825}}]},1).to({state:[{t:this.shape_329,p:{x:-53.375}},{t:this.shape_331,p:{x:347.55}},{t:this.shape_327,p:{x:-855.225}}]},1).to({state:[{t:this.shape_329,p:{x:-58.725}},{t:this.shape_334,p:{x:342.2}},{t:this.shape_327,p:{x:-860.575}}]},1).to({state:[{t:this.shape_329,p:{x:-64.125}},{t:this.shape_331,p:{x:336.8}},{t:this.shape_327,p:{x:-865.975}}]},1).to({state:[{t:this.shape_329,p:{x:-69.475}},{t:this.shape_334,p:{x:331.45}},{t:this.shape_327,p:{x:-871.325}}]},1).to({state:[{t:this.shape_329,p:{x:-74.875}},{t:this.shape_331,p:{x:326.05}},{t:this.shape_327,p:{x:-876.725}}]},1).to({state:[{t:this.shape_329,p:{x:-80.225}},{t:this.shape_334,p:{x:320.7}},{t:this.shape_327,p:{x:-882.075}}]},1).to({state:[{t:this.shape_329,p:{x:-85.625}},{t:this.shape_331,p:{x:315.3}},{t:this.shape_327,p:{x:-887.475}}]},1).to({state:[{t:this.shape_329,p:{x:-90.975}},{t:this.shape_334,p:{x:309.95}},{t:this.shape_327,p:{x:-892.825}}]},1).to({state:[{t:this.shape_329,p:{x:-96.375}},{t:this.shape_331,p:{x:304.55}},{t:this.shape_327,p:{x:-898.225}}]},1).to({state:[{t:this.shape_329,p:{x:-101.725}},{t:this.shape_334,p:{x:299.2}},{t:this.shape_327,p:{x:-903.575}}]},1).to({state:[{t:this.shape_329,p:{x:-107.125}},{t:this.shape_331,p:{x:293.8}},{t:this.shape_327,p:{x:-908.975}}]},1).to({state:[{t:this.shape_329,p:{x:-112.525}},{t:this.shape_331,p:{x:288.4}},{t:this.shape_327,p:{x:-914.375}}]},1).to({state:[{t:this.shape_329,p:{x:-117.875}},{t:this.shape_331,p:{x:283.05}},{t:this.shape_327,p:{x:-919.725}}]},1).to({state:[{t:this.shape_329,p:{x:-123.225}},{t:this.shape_334,p:{x:277.7}},{t:this.shape_327,p:{x:-925.075}}]},1).to({state:[{t:this.shape_329,p:{x:-128.625}},{t:this.shape_331,p:{x:272.3}},{t:this.shape_327,p:{x:-930.475}}]},1).to({state:[{t:this.shape_329,p:{x:-133.975}},{t:this.shape_334,p:{x:266.95}},{t:this.shape_327,p:{x:-935.825}}]},1).to({state:[{t:this.shape_329,p:{x:-139.375}},{t:this.shape_331,p:{x:261.55}},{t:this.shape_327,p:{x:-941.225}}]},1).to({state:[{t:this.shape_329,p:{x:-144.775}},{t:this.shape_331,p:{x:256.15}},{t:this.shape_327,p:{x:-946.625}}]},1).to({state:[{t:this.shape_329,p:{x:-150.125}},{t:this.shape_331,p:{x:250.8}},{t:this.shape_327,p:{x:-951.975}}]},1).to({state:[{t:this.shape_329,p:{x:-155.475}},{t:this.shape_334,p:{x:245.45}},{t:this.shape_327,p:{x:-957.325}}]},1).to({state:[{t:this.shape_329,p:{x:-160.875}},{t:this.shape_331,p:{x:240.05}},{t:this.shape_327,p:{x:-962.725}}]},1).to({state:[{t:this.shape_329,p:{x:-166.275}},{t:this.shape_331,p:{x:234.65}},{t:this.shape_327,p:{x:-968.125}}]},1).to({state:[{t:this.shape_329,p:{x:-171.625}},{t:this.shape_331,p:{x:229.3}},{t:this.shape_327,p:{x:-973.475}}]},1).to({state:[{t:this.shape_329,p:{x:-177.025}},{t:this.shape_331,p:{x:223.9}},{t:this.shape_327,p:{x:-978.875}}]},1).to({state:[{t:this.shape_329,p:{x:-182.375}},{t:this.shape_334,p:{x:218.55}},{t:this.shape_327,p:{x:-984.225}}]},1).to({state:[{t:this.shape_329,p:{x:-187.725}},{t:this.shape_334,p:{x:213.2}},{t:this.shape_327,p:{x:-989.575}}]},1).to({state:[{t:this.shape_329,p:{x:-193.125}},{t:this.shape_334,p:{x:207.8}},{t:this.shape_327,p:{x:-994.975}}]},1).to({state:[{t:this.shape_329,p:{x:-198.525}},{t:this.shape_331,p:{x:202.4}},{t:this.shape_327,p:{x:-1000.375}}]},1).to({state:[{t:this.shape_329,p:{x:-203.875}},{t:this.shape_334,p:{x:197.05}},{t:this.shape_327,p:{x:-1005.725}}]},1).to({state:[{t:this.shape_329,p:{x:-209.275}},{t:this.shape_331,p:{x:191.65}},{t:this.shape_327,p:{x:-1011.125}}]},1).to({state:[{t:this.shape_329,p:{x:-214.625}},{t:this.shape_334,p:{x:186.3}},{t:this.shape_327,p:{x:-1016.475}}]},1).to({state:[{t:this.shape_329,p:{x:-220.025}},{t:this.shape_331,p:{x:180.9}},{t:this.shape_327,p:{x:-1021.875}}]},1).to({state:[{t:this.shape_329,p:{x:-225.375}},{t:this.shape_334,p:{x:175.55}},{t:this.shape_327,p:{x:-1027.225}}]},1).to({state:[{t:this.shape_329,p:{x:-230.775}},{t:this.shape_331,p:{x:170.15}},{t:this.shape_327,p:{x:-1032.625}}]},1).to({state:[{t:this.shape_329,p:{x:-236.125}},{t:this.shape_334,p:{x:164.8}},{t:this.shape_327,p:{x:-1037.975}}]},1).to({state:[{t:this.shape_329,p:{x:-241.525}},{t:this.shape_331,p:{x:159.4}},{t:this.shape_327,p:{x:-1043.375}}]},1).to({state:[{t:this.shape_329,p:{x:-246.875}},{t:this.shape_334,p:{x:154.05}},{t:this.shape_327,p:{x:-1048.725}}]},1).to({state:[{t:this.shape_329,p:{x:-252.275}},{t:this.shape_331,p:{x:148.65}},{t:this.shape_327,p:{x:-1054.125}}]},1).to({state:[{t:this.shape_329,p:{x:-257.625}},{t:this.shape_334,p:{x:143.3}},{t:this.shape_327,p:{x:-1059.475}}]},1).to({state:[{t:this.shape_329,p:{x:-263.025}},{t:this.shape_331,p:{x:137.9}},{t:this.shape_327,p:{x:-1064.875}}]},1).to({state:[{t:this.shape_329,p:{x:-268.375}},{t:this.shape_334,p:{x:132.55}},{t:this.shape_327,p:{x:-1070.225}}]},1).to({state:[{t:this.shape_329,p:{x:-273.775}},{t:this.shape_331,p:{x:127.15}},{t:this.shape_327,p:{x:-1075.625}}]},1).to({state:[{t:this.shape_329,p:{x:-279.125}},{t:this.shape_334,p:{x:121.8}},{t:this.shape_327,p:{x:-1080.975}}]},1).to({state:[{t:this.shape_329,p:{x:-284.525}},{t:this.shape_331,p:{x:116.4}},{t:this.shape_327,p:{x:-1086.375}}]},1).to({state:[{t:this.shape_329,p:{x:-289.875}},{t:this.shape_334,p:{x:111.05}},{t:this.shape_327,p:{x:-1091.725}}]},1).to({state:[{t:this.shape_329,p:{x:-295.275}},{t:this.shape_331,p:{x:105.65}},{t:this.shape_327,p:{x:-1097.125}}]},1).to({state:[{t:this.shape_329,p:{x:-300.625}},{t:this.shape_334,p:{x:100.3}},{t:this.shape_327,p:{x:-1102.475}}]},1).to({state:[{t:this.shape_329,p:{x:-306.025}},{t:this.shape_331,p:{x:94.9}},{t:this.shape_327,p:{x:-1107.875}}]},1).to({state:[{t:this.shape_329,p:{x:-311.375}},{t:this.shape_334,p:{x:89.55}},{t:this.shape_327,p:{x:-1113.225}}]},1).to({state:[{t:this.shape_329,p:{x:-316.775}},{t:this.shape_331,p:{x:84.15}},{t:this.shape_327,p:{x:-1118.625}}]},1).to({state:[{t:this.shape_329,p:{x:-322.125}},{t:this.shape_334,p:{x:78.8}},{t:this.shape_327,p:{x:-1123.975}}]},1).to({state:[{t:this.shape_329,p:{x:-327.525}},{t:this.shape_331,p:{x:73.4}},{t:this.shape_327,p:{x:-1129.375}}]},1).to({state:[{t:this.shape_329,p:{x:-332.875}},{t:this.shape_334,p:{x:68.05}},{t:this.shape_327,p:{x:-1134.725}}]},1).to({state:[{t:this.shape_329,p:{x:-338.275}},{t:this.shape_331,p:{x:62.65}},{t:this.shape_327,p:{x:-1140.125}}]},1).to({state:[{t:this.shape_329,p:{x:-343.625}},{t:this.shape_334,p:{x:57.3}},{t:this.shape_327,p:{x:-1145.475}}]},1).to({state:[{t:this.shape_329,p:{x:-349.025}},{t:this.shape_331,p:{x:51.9}},{t:this.shape_327,p:{x:-1150.875}}]},1).to({state:[{t:this.shape_329,p:{x:-354.375}},{t:this.shape_334,p:{x:46.55}},{t:this.shape_327,p:{x:-1156.225}}]},1).to({state:[{t:this.shape_329,p:{x:-359.775}},{t:this.shape_331,p:{x:41.15}},{t:this.shape_327,p:{x:-1161.625}}]},1).to({state:[{t:this.shape_329,p:{x:-365.125}},{t:this.shape_334,p:{x:35.8}},{t:this.shape_327,p:{x:-1166.975}}]},1).to({state:[{t:this.shape_329,p:{x:-370.525}},{t:this.shape_331,p:{x:30.4}},{t:this.shape_327,p:{x:-1172.375}}]},1).to({state:[{t:this.shape_329,p:{x:-375.875}},{t:this.shape_334,p:{x:25.05}},{t:this.shape_327,p:{x:-1177.725}}]},1).to({state:[{t:this.shape_329,p:{x:-381.275}},{t:this.shape_331,p:{x:19.65}},{t:this.shape_327,p:{x:-1183.125}}]},1).to({state:[{t:this.shape_329,p:{x:-386.625}},{t:this.shape_334,p:{x:14.3}},{t:this.shape_327,p:{x:-1188.475}}]},1).to({state:[{t:this.shape_329,p:{x:-392.025}},{t:this.shape_331,p:{x:8.9}},{t:this.shape_327,p:{x:-1193.875}}]},1).to({state:[{t:this.shape_329,p:{x:-397.375}},{t:this.shape_334,p:{x:3.55}},{t:this.shape_327,p:{x:-1199.225}}]},1).to({state:[{t:this.shape_326,p:{x:-402.775}},{t:this.shape_325,p:{x:399.075}},{t:this.shape_324,p:{x:-1204.625}},{t:this.shape_323,p:{x:-402.775}}]},1).to({state:[]},1).wait(1070));

	// LevVEl_3_background
	this.instance_8 = new lib.level_3nerfed();
	this.instance_8.setTransform(444.95,300.9,1,1,0,0,0,2844.1,300.9);
	this.instance_8._off = true;

	this.instance_9 = new lib.lvl3_bg("synched",0);
	this.instance_9.setTransform(-2004.3,370.95,1,1,0,0,0,2804.3,231);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#000000").s().p("EhPNA1mMAAAhrLMCebAAAMAAABrLg");
	this.shape_335.setTransform(394.025,313.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},425).to({state:[{t:this.instance_8}]},369).to({state:[{t:this.instance_9}]},12).to({state:[{t:this.shape_335}]},10).to({state:[]},669).wait(10));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(425).to({_off:false},0).to({x:-1962.15,y:298.95},369).to({_off:true},12).wait(689));

	// Level_2
	this.instance_10 = new lib.Level_2();
	this.instance_10.setTransform(359.15,399.1,1,1,0,0,0,1468.2,399.1);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(275).to({_off:false},0).to({x:-668.35},149).to({_off:true},1).wait(1070));

	// Level_1
	this.instance_11 = new lib.Level_1();
	this.instance_11.setTransform(450.8,272.45,1,1,0,0,0,1248.7,328.4);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(50).to({_off:false},0).to({x:-348.45,y:271.45},224).to({_off:true},1).wait(1220));

	// character_view
	this.instance_12 = new lib.character_titlescreen("synched",0);
	this.instance_12.setTransform(110.3,854.3,1,1,0,0,0,121.3,244.4);
	this.instance_12.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({x:145.95,y:499.1,alpha:1},24).to({_off:true},1).wait(1470));

	// Title
	this.instance_13 = new lib.Title("synched",0,false);
	this.instance_13.setTransform(421.05,-74.4,1,1,0,0,0,470.8,72.4);
	this.instance_13.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({y:72.4,alpha:1},24).to({_off:true},1).wait(1470));

	// Text_Background
	this.instance_14 = new lib.clouds_logo("synched",0);
	this.instance_14.setTransform(634.55,91.45,1,1,0,0,0,557.9,207.8);
	this.instance_14.alpha = 0.25;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({x:435.55,alpha:1,startPosition:4,loop:false},24).to({_off:true},1).wait(1470));

	// Background
	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#009900").s().p("Egh+AZkQhchchLhjQl8DfnZAAQrEAAn1n1Qn1n1AArDQAArFH1n1QH1n0LEAAQLFAAH0H0QBcBcBMBkQF8jfHZAAQIiAAGlEpQB6loEikiQH1n1LEAAQLFAAH0H1QBMBMBBBRQBsgNBxAAQLEAAH1H1QH1H1AALDQAALFn1H0Qn1H1rEAAQrFAAn1n1QhMhMhAhQQhsAMhxAAQohAAmnkpQh6FokiEiQn0H1rEAAQrFAAn1n1g");
	this.shape_336.setTransform(427.525,518.175);

	this.timeline.addTween(cjs.Tween.get(this.shape_336).to({_off:true},25).wait(1470));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-4408.6,0,7697.700000000001,1098.7);
// library properties:
lib.properties = {
	id: '629492E045277D4AA08993F73EED5821',
	width: 800,
	height: 600,
	fps: 25,
	color: "#0099CC",
	opacity: 1.00,
	manifest: [
		{src:"images/15_Aufa_Speedrun_parkour_Project_atlas_1.png?1779155373236", id:"15_Aufa_Speedrun_parkour_Project_atlas_1"},
		{src:"sounds/djartmusicbestgameconsole301284wav.mp3?1779155378076", id:"djartmusicbestgameconsole301284wav"},
		{src:"sounds/djartmusicsohappywithmy8bitgame301275.mp3?1779155378076", id:"djartmusicsohappywithmy8bitgame301275"},
		{src:"sounds/freesound_communityglitchsoundeffect96251wav.mp3?1779155378076", id:"freesound_communityglitchsoundeffect96251wav"},
		{src:"sounds/freesound_communityhorrorambient14590wav.mp3?1779155378076", id:"freesound_communityhorrorambient14590wav"},
		{src:"sounds/pixelpionsentinel455122wav.mp3?1779155378076", id:"pixelpionsentinel455122wav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['629492E045277D4AA08993F73EED5821'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;