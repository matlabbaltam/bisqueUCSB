ExtTouch.gesture.Tap = ExtTouch.ExtTouchend(ExtTouch.gesture.Gesture, {
    handles: [
        'tapstart',
        'tapcancel',
        'tap', 
        'doubletap', 
        'taphold',
        'singletap'
    ],
    
    cancelThreshold: 10,
    
    doubleTapThreshold: 800,

    singleTapThreshold: 400,

    holdThreshold: 1000,

    fireClickEvent: false,
    
    onTouchStart : function(e, touch) {
        var me = this;
        
        me.startX = touch.pageX;
        me.startY = touch.pageY;
        me.fire('tapstart', e, me.getInfo(touch));
        
        if (this.listeners.taphold) {    
            me.timeout = setTimeout(function() {
                me.fire('taphold', e, me.getInfo(touch));
                delete me.timeout;
            }, me.holdThreshold);            
        }
        
        me.lastTouch = touch;
    },
    
    onTouchMove : function(e, touch) {
        var me = this;
        if (me.isCancel(touch)) {
            me.fire('tapcancel', e, me.getInfo(touch));
            if (me.timeout) {
                clearTimeout(me.timeout);
                delete me.timeout;
            }
            me.stop();
        }
        
        me.lastTouch = touch;
    },
    
    onTouchEnd : function(e) {
        var me = this,
            info = me.getInfo(me.lastTouch);
        
        this.fireTapEvent(e, info);
        
        if (me.lastTapTime && e.timeStamp - me.lastTapTime <= me.doubleTapThreshold) {
            me.lastTapTime = null;
            e.preventDefault();
            me.fire('doubletap', e, info);
        }
        else {
            me.lastTapTime = e.timeStamp;
        }

        if (me.listeners && me.listeners.singletap && me.singleTapThreshold && !me.preventSingleTap) {
            me.fire('singletap', e, info);
            me.preventSingleTap = true;
            setTimeout(function() {
                me.preventSingleTap = false;
            }, me.singleTapThreshold);
        }
        
        if (me.timeout) {
            clearTimeout(me.timeout);
            delete me.timeout;
        }
    },

    fireTapEvent: function(e, info) {
        this.fire('tap', e, info);
        
        if (e.event)
            e = e.event;

        var target = (e.changedTouches ? e.changedTouches[0] : e).target;

        if (!target.disabled && this.fireClickEvent) {
            var clickEvent = document.createEvent("MouseEvent");
                clickEvent.initMouseEvent('click', e.bubbles, e.cancelable, document.defaultView, e.detail, e.screenX, e.screenY, e.clientX,
                                         e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.metaKey, e.button, e.relatedTarget);
                clickEvent.isSimulated = true;


            target.dispatchEvent(clickEvent);
        }
    },
    
    getInfo : function(touch) {
        var x = touch.pageX,
            y = touch.pageY;
            
        return {
            pageX: x,
            pageY: y,
            startX: x,
            startY: y
        };
    },
    
    isCancel : function(touch) {
        var me = this;
        return (
            Math.abs(touch.pageX - me.startX) >= me.cancelThreshold ||
            Math.abs(touch.pageY - me.startY) >= me.cancelThreshold
        );
    }
});
ExtTouch.regGesture('tap', ExtTouch.gesture.Tap);