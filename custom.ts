enum direction {
    //% block="forward"
    forward,
    //% block="backward"
    backward,
    //% block="left"
    left,
    //% block="right"
    right
}

/**
 * Custom blocks
 */
//% weight=100 color=#28dc91 icon=""
namespace motor {
    let i1:DigitalPin, i2:DigitalPin, i3:DigitalPin, i4:DigitalPin
    let en1:AnalogPin, en2:AnalogPin
    let driveFreq=50, driveSpeed=50
    /**
     * TODO: Define pins connected to L293D motor driver
     * @param lf: Micro bit pin connected to pin i2 on the L293D
     * @param lb: Micro bit pin connected to pin i1 on the L293D
     * @param rf: Micro bit pin connected to pin i3 on the L293D
     * @param rb: Micro bit pin connected to pin i4 on the L293D
     * @param ld: Micro bit pin connected to pin en1 on the L293D
     * @param rd: Micro bit pin connected to pin en2 on the L293D
     */
    //% block="Define Motor Pins:|left motor:|i1 $lb|i2 $lf|en1 $ld|right motor:|i3 $rf|i4 $rb|en2 $rd"
    //% lf.defl=DigitalPin.P6 lb.defl=DigitalPin.P7 rf.defl=DigitalPin.P8 rb.defl=DigitalPin.P9 ld.defl=AnalogPin.P3 rd.defl=AnalogPin.P4
    export function defineMotorPins(lf:DigitalPin, lb:DigitalPin, rf:DigitalPin, rb:DigitalPin, ld:AnalogPin, rd:AnalogPin): void {
        i2=lf
        i1=lb
        i3=rf
        i4=rb
        en1=ld
        en2=rd
        initDrive()
    }
    function initDrive ():void {
        pins.digitalWritePin(i1, 0)
        pins.digitalWritePin(i2, 0)
        pins.digitalWritePin(i3, 0)
        pins.digitalWritePin(i4, 0)
        pins.analogWritePin(en1, 0)
        pins.analogSetPeriod(en1, 1000000 / driveFreq)
        pins.analogWritePin(en2, 0)
        pins.analogSetPeriod(en2, 1000000 / driveFreq)
    }
    /**
     * TODO: set motor speed
     * @param speed: desired speed value between 0 and 100,
     * 0 denoting minimum and 100 denoting maximum speed
     */
    //% block="Set Motor Speed $speed"
    //% speed.min=0 speed.max=100 speed.defl=50
    export function setSpeed(speed:number):void {
        driveSpeed/=100
        driveSpeed*=1023
        driveSpeed=Math.ceil(driveSpeed)
    }
    /**
     * TODO: Start motors at user-defined speed
     */
    //% block="Start Motors"
    export function startMotors():void {
        pins.analogWritePin(en1, driveSpeed)
        pins.analogWritePin(en2, driveSpeed)
    }
    /**
     * TODO: Stop motors
     */
    //% block="Stop Motors"
    export function stopMotors():void {
        pins.analogWritePin(en1, 0)
        pins.analogWritePin(en2, 0)
    }
    /**
     * TODO: modify direction of rotation of drive motors
     * @param direction: desired direction of motion
     */
    //% block="Set Direction %direction"
    //% direction.defl=Direction.forward
    export function setDirectionForward(direc:direction):void {
        if(direc==direction.forward){
            pins.digitalWritePin(i2, 1) //6
            pins.digitalWritePin(i1, 0) //7
            pins.digitalWritePin(i3, 1) //8
            pins.digitalWritePin(i4, 0) //9
        }
        else if(direc==direction.backward){
            pins.digitalWritePin(i2, 0) //6
            pins.digitalWritePin(i1, 1) //7
            pins.digitalWritePin(i3, 0) //8
            pins.digitalWritePin(i4, 1) //9
        }
        else if(direc==direction.left){
            pins.digitalWritePin(i2, 0) //6
            pins.digitalWritePin(i1, 1) //7
            pins.digitalWritePin(i3, 1) //8
            pins.digitalWritePin(i4, 0) //9
        }
        else if(direc==direction.right){
            pins.digitalWritePin(i2, 1) //6
            pins.digitalWritePin(i1, 0) //7
            pins.digitalWritePin(i3, 0) //8
            pins.digitalWritePin(i4, 1) //9
        }
    }
}