ExtTouch.gesture.Touch = ExtTouch.ExtTouchend(ExtTouch.gesture.Gesture, {
    handles: ['touchstart', 'touchmove', 'touchend', 'touchdown'],
    
    touchDownInterval: 500,
    
    onTouchStart: function(e, touch) {
        this.startX = this.previousX = touch.pageX;
        this.startY = this.previousY = touch.pageY;
        this.startTime = this.previousTime = e.timeStamp;

        this.fire('touchstart', e);
        this.lastEvent = e;
        
        if (this.listeners && this.listeners.touchdown) {
            this.touchDownIntervalId = setInterval(ExtTouch.createDelegate(this.touchDownHandler, this), this.touchDownInterval);
        }
    },
    
    onTouchMove: function(e, touch) {
        this.fire('touchmove', e, this.getInfo(touch));
        this.lastEvent = e;
    },
    
    onTouchEnd: function(e) {
        this.fire('touchend', e, this.lastInfo);
        clearInterval(this.touchDownIntervalId);
    },
    
    touchDownHandler : function() {
        this.fire('touchdown', this.lastEvent, this.lastInfo);
    },
    
    getInfo : function(touch) {
        var time = Date.now(),
            deltaX = touch.pageX - this.startX,
            deltaY = touch.pageY - this.startY,
            info = {
                startX: this.startX,
                startY: this.startY,
                previousX: this.previousX,
                previousY: this.previousY,
                pageX: touch.pageX,
                pageY: touch.pageY,
                deltaX: deltaX,
                deltaY: deltaY,
                absDeltaX: Math.abs(deltaX),
                absDeltaY: Math.abs(deltaY),
                previousDeltaX: touch.pageX - this.previousX,
                previousDeltaY: touch.pageY - this.previousY,
                time: time,
                startTime: this.startTime,
                previousTime: this.previousTime,
                deltaTime: time - this.startTime,
                previousDeltaTime: time - this.previousTime
            };
        
        this.previousTime = info.time;
        this.previousX = info.pageX;
        this.previousY = info.pageY;
        this.lastInfo = info;
        
        return info;
    }
});

ExtTouch.regGesture('touch', ExtTouch.gesture.Touch);